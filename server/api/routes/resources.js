const express = require('express');
const Resource = require("../../models/resourceModel");
const router = express.Router();

// function getNextSequenceValue(announcementid){
//   var sequenceDocument = db.counters.findAndModify({
//      query:{_id: announcementid },
//      update: {$inc:{sequence_value:1}},
//      new:true
//   });
//   return sequenceDocument.sequence_value;
// }

router.post("/add", async (req, res) => {
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
            const ResourcesId = await Resource.findById(req.params.id);
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


    router.patch("/updateById/:id", async (req, res) => {
      try {
        const resourcesId = await Resource.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).json({
          status: 'success',
          data: {
            resources: resourcesId
          }
        })
      }catch (err) {
        res.status(400).json ({
          status: 'fail',
          message: err //'what do you mean by that🤨🤔🤨?'
        })
      }
    })
    
  router.delete('/deleteById/:id', async (req, res) => {
      try {
          await Resource.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null
      })
    }catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: 'Your data not gone guess its not deleted...🤨🤔🤨?'
      })
    }
  })
module.exports = router; // connecting to the router on the app.js file.
