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

// const run = async () => {
//     const response = await client.campaigns.list();
//     console.log(response);
//   };
  
//   run();
// gets all the links for the newsletters.
router.get('/getAll', async (req, res, next) => {
    const PAGE_SIZE = 10; // Number of items to return per page
    const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Get the current page number
    const offset = (page - 1) * PAGE_SIZE; // Calculate the starting index
    console.log('Offset:', offset);
  
    try {
      const response = await client.campaigns.list({ offset, count: PAGE_SIZE, sort_field: 'create_time', sort_dir: 'DESC' });
      console.log('Response:', response);
      const campaigns = response.campaigns.filter(campaign => campaign.long_archive_url.includes("web-mobile-development-newsletter-edition"));
      console.log('Campaigns:', campaigns);
      const urls = campaigns.map(campaign => campaign.long_archive_url);
  
      if (urls.length === 0) {
        throw new Error(`Page ${page} does not have any content`);
      }
  
      res.status(200).json(urls);
    } catch (error) {
      next(error);
    }
  });
  
  
  

router.get('/getLatest', (req, res, next) => {
const run = async () => {
    const { campaigns } = await client.campaigns.list();
        const latestCampaign = campaigns
            .filter(campaign => campaign.send_time)
            .sort((a, b) => new Date(b.send_time) - new Date(a.send_time))[0];
            return latestCampaign ? { 
                status: "success",
                data: latestCampaign.long_archive_url
            } : {
                status: "fail",
                data: new Error("Couldn't find latest newsletter")
            };
        };
    run().then((result) => {
        console.log(result);
        res.status(200).json(result)
    }); 
})

module.exports = router; // connecting to the router on the app.js file.
