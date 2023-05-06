## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 10.16.0)
- Delete any `package-lock.json` and `node_modules` if you have them already

### Setup

Create a `.env` file in the root directory of the project and add the following:

```
NODE_ENV=development
PORT=3001
USERNAME=[your username]
DATABASE=[database link]
DATABASE_PASSWORD=[database password]
MAILCHIMP_API=[mailchimp api key]
MAILCHIMP_LOCATION=[mailchimp location]
MAILCHIMP_FOLDER_ID=[mailchimp folder id]
JWT_SECRET=[jwt secret]
JWT_EXPIRES_IN=10h
JWT_COOKIE_EXPIRES_IN=10
```

Create a `.env.development` file in the `/public` directory of the project and add the following:

```
REACT_APP_API_URL=http://localhost:3001/api/v1
```

Create a `.env.production` file in the `/public` directory of the project and add the following:

```
REACT_APP_API_URL=/api
```

Install dependencies:

```
npm run install:all
```

### Start Development Server

```
npm run dev
```

### Build for Production

```
npm run build
```
