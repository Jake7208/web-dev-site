import { useRef, useEffect, useReducer } from "react";

function useFetch(url, options) {
  const cache = useRef({ current: {} });
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef(false);

  const initialState = {
    error: undefined,
    data: undefined,
    status: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return {
          ...initialState,
          data: action.payload?.data,
          status: action.payload?.status,
        };
      case "error":
        return {
          ...initialState,
          error: action.payload?.error,
          status: action.payload?.status,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      // If a cache exists for this url, return it
      if (!!cache.current[url]) {
        dispatch({
          type: "fetched",
          payload: cache.current[url],
        });
        return;
      }

      let response = undefined;

      try {
        response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        cache.current[url] = {
          data: data.data,
          status: response.status,
        };
        if (cancelRequest.current) return;

        if (data.status === "fail") {
          throw new Error(data.data);
        }

        dispatch({
          type: "fetched",
          payload: { data: data.data, status: response.status },
        });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({
          type: "error",
          payload: { error: error, status: response?.status },
        });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
