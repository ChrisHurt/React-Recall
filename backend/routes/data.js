const router = require('express').Router();
let User = require('../models/user.model');
let DataPoint = require('../models/datapoint.model');
let DataCollection = require('../models/datacollection.model');


// View all Data Collections by loggedin user
router.route('/').get((req,res)=>{
  let sess = req.session;
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
    DataCollection.find()
      .then(dataCollections => res.json(dataCollections))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
});

// View data collection by id
router.route('/:id').get((req,res)=>{
  let sess = req.session;
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
    DataCollection.findById(req.params.id)
      .then(dataCollection => res.json(dataCollection))
      .catch(err => res.status(400).json(`Error: ${err}`))
  }
})

// Add a data collection
router.route('/add').post((req,res)=>{
  let sess = req.session;
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
    const collectionName  = req.body.collectionName;
    const user_id = req.session.user_id
    const newDataCollection = new DataCollection({collectionName, user: user_id});
  
    newDataCollection.save()
      .then(()=> {
        User.findById(user_id).then((user)=>{
          user.dataCollections = [...user.dataCollections,newDataCollection._id]
          user.save().then(()=>res.json(`Data Collection '${collectionName}' added to user: '${user.username}'`))
        })
      })
      .catch(err => res.status(400).json(`Error ${err}`))
  }
});

// View all Data Points by Collection id
router.route('/:collection_id').get((req,res)=>{
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
    DataPoint.findById(req.params.collection_id)
      .then(dataPoints => res.json(dataPoints))
      .catch(err => res.status(400).json(`Error: ${err}`));
  }
});

// View data point by data point id
router.route('/datapoints/:id').get((req,res)=>{
  let sess = req.session;
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
    DataPoint.findById(req.params.id)
      .then(dataPoint => res.json(dataPoint))
      .catch(err => res.status(400).json(`Error: ${err}`))
  }
})

// Add a data point to a collection by collection id
router.route('/:collection_id/add').post((req,res)=>{
  let sess = req.session;
  if(!sess.user_id){
    res.status(404).json('You must be a valid user to add a collection.')
  } else {
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
  }

});
module.exports = router;