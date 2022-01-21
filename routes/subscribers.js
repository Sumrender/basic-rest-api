const express = require('express');
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Get all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Get one
router.get('/:id',getSubscriber, (req, res) => {
  res.send(res.subscriber);
});

// Create
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({message: err.message});
  }

});

// Update
router.patch('/:id',getSubscriber, async (req, res) => {
  if(req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if(req.body.subscriberToChannel != null) {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json({ message: updatedSubscriber.name })
  } catch (err) {
    res.status(400).json({message: err.message });
  }
});

// Remove
router.delete('/:id',getSubscriber ,async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "deleted subscriber "});
  } catch (err){
    res.status(500).json({message: err.message});

  }
});

// Helper function
async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if(subscriber == null) {
      return res.status(404).json({message: "Cannot find subscriber"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  res.subscriber = subscriber;
  next()
}

// Export statement
module.exports = router
