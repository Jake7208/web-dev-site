const express = require('express');
const router = express.Router();

router.get('/getAll', (req, res, next ) => { // getting the announcementRoutes key from the app.js file.
    const newsLetter = [
        {
                "id": "1",
                "title": "newsletter web and mobile",
                "number": 356,
                "indexHtml": "where html will go",
                "date": "2023-04-25"
              }
      ];
      
      const jsonNewsLetter = JSON.stringify(newsLetter);
      
      res.send(jsonNewsLetter);
    });


// get all the campaigns/newsletters

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "df09bcacec46d0ac6dae2a802f912102-us5",
  server: "us5",
});

// const run = async () => {
//     const response = await client.campaigns.list();
//     console.log(response);
//   };
  
//   run();
  

router.get('/getAll', (req, res, next) => {
   
    const run = async () => {
        const {campaigns} = await client.campaigns.list();
        // console.log(response);
        return campaigns.map(a => a.long_archive_url)
    };
    run().then((e) => {
        console.log(e);
        res.status(200).json(e)
    });
    
})

router.post('/updateById', (req, res, next ) => {
    res.status(201).json({
        message: 'Handling POST request to /newsLetter',
    });
});


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
