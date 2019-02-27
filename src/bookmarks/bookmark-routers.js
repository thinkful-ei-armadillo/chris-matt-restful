const express = require('express')
const BookmarksService = require('./bookmarksService');

const router = express.Router();

router.route('/bookmarks')
  .get((req, res, next) => {
    BookmarksService.getAll(req.app.get('db'))
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  })
  .post(express.json(), (req, res) => {
    const { title, url, description, rating } = req.body;

    const bookmark = {
      title,
      url,
      description,
      rating
    };

    BookmarksService.insert(req.app.get('db'), bookmark)
      .then(result => {
        res.status(204).location(`http://localhost:8000/bookmarks/${result.id}`).end();
      });

  });

router.route('/bookmarks/:id')
  .get((req, res) => {
    BookmarksService.getById(req.app.get('db'), req.params.id)
      .then(result => {
        if (result[0]) {
          res.json(result[0]);
        } else {
          res.status(404).send('Bookmark not found');
        }
      });
  })
  .delete((req, res, next) => {

    BookmarksService.delete(req.app.get('db'), Number(req.params.id))
      .then((results) => {
        console.log('id:', typeof(req.params.id));
        console.log('results:', results)
        if (results > 0)
          res.status(204).end()
        else
          res.status(404).send('Bookmark not found');
      })
      .catch(next)
  })
  .patch(express.json(),(req,res,next) => {
    BookmarksService.getById(req.app.get('db'), req.params.id)
      .then(results => {
  
        const {title: newTitle, description: newDes, url: newUrl, rating: newRating} = req.body;
        const {title, description, url, rating} = results;
        const bookmark = {
          title: newTitle || title,
          description: newDes || description,
          url: newUrl || url,
          rating: newRating || rating
        }

        BookmarksService.update(req.app.get('db'), req.params.id, bookmark)
        .then(results => {
          if(results > 0)
            res.status(204).end();
          else  
            res(400).send('User error');
        })
        .catch(next)
      })
      .catch(next)

   
  });

  module.exports = router;