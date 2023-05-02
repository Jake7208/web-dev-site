const express = require('express');
const router = express.Router();
//  connecting to the mailchimp api
const client = require("@mailchimp/mailchimp_marketing");
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
router.get('/getAll', (req, res, next) => {
   
    const run = async () => {
        const {campaigns} = await client.campaigns.list();
        // console.log(response);
        const urls = campaigns.filter(campaign => campaign.long_archive_url.includes("web-mobile-development-newsletter-edition"));
        return urls.map(a => a.long_archive_url);
    };
    run().then((e) => {
        console.log(e);
        res.status(200).json(e)
    });
    
})

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
