const express = require('express');
const router = express.Router();
const Annotation = require('../models/annotations.js');

// CREATE a new annotation
router.post('/', async (req, res) => {
  const newAnnotation = new Annotation(req.body);
  try {
    const annotation = await newAnnotation.save();
    res.status(200).send(annotation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// READ all annotations for a specific moodboard
router.get('/:moodboardId', async (req, res) => {
  try {
    const annotations = await Annotation.find({moodboardId: req.params.moodboardId});
    res.status(200).send(annotations);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE a specific annotation
router.put('/:id', async (req, res) => {
  try {
    const annotation = await Annotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(annotation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a specific annotation
router.delete('/:id', async (req, res) => {
  try {
    const annotation = await Annotation.findByIdAndRemove(req.params.id);
    res.status(200).send(annotation);
  } catch (err) {
    res.status(500).send(err);
  }
});

//export router
module.exports = router;
