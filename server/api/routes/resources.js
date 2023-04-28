const express = require('express');
const Resource = require("../../models/resourceModel");
const router = express.Router();


router.post("/addResource", async (req, res) => {
    try {
      const newResources = await Resource.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          resources: newResources
        }
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: 'what do you mean by that🤨🤔🤨?', err
      })
    }
  });

router.get("/getAll", async (req, res, next) => {
    // getting the resourcesRoutes key from the app.js file.
    try {
        const allResources = await Resource.find(req.body)
        res.status(201).json({
          status: 'success',
          data: {
            resources: allResources
          }
        })
      } catch (err) {
        res.status(400).json ({
          status: 'fail',
          message: err
        })
      }
    });

    
    
    router.get("/getById/:id", async (req, res) => {
        try {
            const ResourcesId = await Resource.findOne({id: req.params.id});
            res.status(201).json({
                status: 'success',
                data: {
                    resources: ResourcesId
                }
            })
        } catch (err) {
            res.status(400).json ({
                status: 'fail',
                message:  'what do you mean by that🤨🤔🤨?'
            })
        }
    });


router.delete('/deleteById/:resourcesId', (req, res, next) => {
    const id = req.params.resourcesId
   if (id !== undefined) {
        res.status(200).json({
            message: `resources id: ${id}; deleted`,
            newsLetterId: id
        })
    }
})
module.exports = router; // connecting to the router on the app.js file.
