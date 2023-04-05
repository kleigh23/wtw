var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Watching = require('../models/watching');

// Get the Shows or Movies in the database
router.get('/', (req, res, next) => {
    Watching.find((error, data) =>{
        console.log(data);
        if (error) {
            return res.status(500).json({
                message: 'An error occured: ',
                error: error
            }).populate('group');
        } else {
            res.status(200).json(data);
        }
    });
 });

 // Create a new show or movie to add to the database
 router.post('/', (req, res, next) => {
    const maxWatchingId = sequenceGenerator.nextId("watchings");
  
    const watching = new Watching({
      id: maxWatchingId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });
  
    watching.save()
      .then(createdWatching => {
        res.status(201).json({
          message: 'show or movie added successfully',
          watching: createdWatching
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  // This will update the show or movie in the database
  router.put('/:id', (req, res, next) => {
    Watching.findOne({ id: req.params.id })
      .then(watching => {
        watching.name = req.body.name;
        watching.description = req.body.description;
        watching.url = req.body.url;
  
        Watching.updateOne({ id: req.params.id }, watching)
          .then(result => {
            res.status(204).json({
              message: 'show or movie updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'show or movie not found not found.',
          error: { watching: 'show or movie not found'}
        });
      });
  });

  // this will delete the show or movie selected
  router.delete("/:id", (req, res, next) => {
    Watching.findOne({ id: req.params.id })
      .then(watching => {
        Watching.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Show or movie deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'show or movie not found.',
          error: { watching: 'Show or movie not found'}
        });
      });
  });