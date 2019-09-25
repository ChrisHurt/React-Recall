const router = require('express').Router();
let Guess = require('../models/guess.model');
let GuessSession = require('../models/guesssession.model');


// View all Guess Sessions
router.route('/').get((req,res)=>{
  DataCollection.find()
    .then(dataCollections => res.json(dataCollections))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// View Guess Session by id
router.route('/:id').get((req,res)=>{
  DataCollection.findById(req.params.id)
    .then(dataCollection => res.json(dataCollection))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Add a Guess Session
router.route('/add').post((req,res)=>{
  const collectionName  = req.body.collectionName;

  const newDataCollection = new GuessSession({collectionName});

  newDataCollection.save()
    .then(()=> res.json(`Data Collection '${collectionName}' added!`))
    .catch(err => res.status(400).json(`Error ${err}`))
});

// View all Data Points by Collection id
router.route('/:collection_id').get((req,res)=>{
  DataPoint.findById(req.params.collection_id)
    .then(dataPoints => res.json(dataPoints))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// View data point by data point id
router.route('/datapoints/:id').get((req,res)=>{
  DataPoint.findById(req.params.id)
    .then(dataPoint => res.json(dataPoint))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Add a data point to a collection by collection id
router.route('/:collection_id/add').post((req,res)=>{
  const memoryText  = req.body.memoryText;
  const imageUrl = req.body.imageUrl;
  const dataCollection_id = req.params.collection_id
  const newDataPoint = new DataPoint({memoryText, imageUrl, dataCollection: dataCollection_id});

  newDataPoint.save().then(()=>{
    DataCollection.findById(dataCollection_id).then(
      (dataCollection)=>{
        console.log(dataCollection)
        dataCollection.dataPoints = [...dataCollection.dataPoints,newDataPoint._id];
        dataCollection.save().then(()=> res.json(`Data Point with memory text '${memoryText}' added to data collection: '${dataCollection.collectionName}'`))
      })
  })
  .catch(err => res.status(400).json(`Error ${err}`))

});
module.exports = router;