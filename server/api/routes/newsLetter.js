const express = require('express');
const router = express.Router();
//  connecting to the mailchimp api
const client = require("@mailchimp/mailchimp_marketing");
const { count } = require('../../models/userModel');

require("dotenv").config();

client.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_LOCATION,
});

router.get('/getAll', async (req, res, next) => {
    const PAGE_SIZE = 30; // Number of items to return per page
    const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Get the current page number
    const offset = (page - 1) * PAGE_SIZE; // Calculate the starting index
    console.log('Offset:', offset);
  
    try {
      const response = await client.campaigns.list({
        offset, 
        count: PAGE_SIZE,
        folder_id: process.env.MAILCHIMP_FOLDER_ID,
        sort_field: 'create_time',
        sort_dir: 'DESC'
      })
      console.log(response);
        const newsletters = response.campaigns.map((n) => ({
          title: n.settings.title,
          url: n.archive_url
        }))
        // const response = await client.campaign.get(process.env.MAILCHIMP_FOLDER_ID)
       
        res.status(201).json({
          status: 'success',
          data: newsletters
        })
      }catch (error) {
      next(error);
    }
  });
  

  router.get('/getLatest', async (req, res, next) => {
    const PAGE_SIZE = 1; // Number of items to return per page
    const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Get the current page number
    const offset = (page - 1) * PAGE_SIZE; // Calculate the starting index
    console.log('Offset:', offset);
  
      try {
        const response = await client.campaigns.list({
          offset, 
          count: PAGE_SIZE,
          folder_id: process.env.MAILCHIMP_FOLDER_ID,
          sort_field: 'create_time',
          sort_dir: 'DESC'
        })
        console.log(response);
          const newsletters = response.campaigns.map((n) => ({
            title: n.settings.title,
            url: n.archive_url
          }))
  
      res.status(201).json({
        status: 'success',
        data: newsletters
      })
    } catch (error) {
      next(error);
    }
  });

  

module.exports = router; // connecting to the router on the app.js file.
