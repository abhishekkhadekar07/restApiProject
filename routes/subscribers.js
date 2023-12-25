const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');


//getting all the subscirbers
router.get('/', async(req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
//getting one 
router.get('/:id',getSubscriber, (req, res) => {
  res.send(res.subsciber);
})
//create one
router.post('/', async (req, res) => {
  const subsciber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
    // subscribedDate: req.body.subscribedDate
  })

  try {
    const newsubscriber = await subsciber.save();
    res.status(201).json(newsubscriber)
  }
  catch (error) {
    res.status(400).json({message:error.message})
  }
})
//updating one 
router.patch('/:id',getSubscriber,async (req, res) => {
  if (req.body.name !== null) {
    res.subsciber.name=req.body.name
  }
  if (req.body.subscribedToChannel !== null) {
    res.subsciber.subscribedToChannel=req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subsciber.save();
    res.json(updatedSubscriber)

  } catch (error) {
    res.status(400).json({message:error.message})
  }
})
//deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subsciber.deleteOne()
    res.json({message:'deleted subscriber'})
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  
})

async function getSubscriber(req, res, next) {
let subsciber1
  try {
    subsciber1 = await Subscriber.findById(req.params.id)
    if (subsciber1 == null) {
      return res.status(404).json({message:'cannot find subscriber'})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  res.subsciber = subsciber1
  next()
 
}
module.exports=router