const express = require('express');
const router = express.Router();
//  connecting to the mailchimp api
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "df09bcacec46d0ac6dae2a802f912102-us5",
  server: "us5",
});

const run = async () => {
    const response = await client.campaigns.list();
    console.log(response);
  };
  
  run();
// gets all the links for the newsletters.
// router.get('/getAll', (req, res, next) => {
   
//     const run = async () => {
//         const {campaigns} = await client.campaigns.list();
//         // console.log(response);
//         return campaigns.map(a => a.long_archive_url)
//     };
//     run().then((e) => {
//         console.log(e);
//         res.status(200).json(e)
//     });
    
// })

// router.get('/getById', (req, res, next) => {
   
//     const run = async () => {
//         const {campaigns} = await client.campaigns.get();
//         // console.log(response);
//         return campaigns.map(a => a.long_archive_url)
//     };
//     run().then((e) => {
//         console.log(e);
//         res.status(200).json(e)
//     });
    
// })
// router.post('/updateById', (req, res, next ) => {
//     res.status(201).json({
//         message: 'Handling POST request to /newsLetter',
//     });
// });


router.get('/getByNum/:newsLetterNum', (req, res, next) => {
        newsLetter.find(req.params.newsLetterNum).then((newsLetter) => {
            if (!newsLetter) {
                return res.status(404).send();
            }    
            res.send(newsLetter);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })



router.delete('/deleteById/:newsLetterId', (req, res, next) => {
    const id = req.params.newsLetterId
   if (id !== undefined) {
        res.status(200).json({
            message: `newsLetter id: ${id}; deleted`,
            newsLetterId: id
        })
    }
})



module.exports = router; // connecting to the router on the app.js file.
