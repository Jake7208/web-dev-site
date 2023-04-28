const express = require('express');
const router = express.Router();
//  connecting to the mailchimp api
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "5e8b6252140014270dcd74e4e79e61a5-us5",
  server: "us5",
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
                url: latestCampaign.long_archive_url
            } : null;
        };
    run().then((result) => {
        console.log(result);
        res.status(200).json(result)
    }); 
})

module.exports = router; // connecting to the router on the app.js file.
