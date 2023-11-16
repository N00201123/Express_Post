const express = require('express');
const router = express.Router();

const imageUpload = require('../configs/imageUpload');

const { loginRequired } = require('../controllers/user.controller');

const { readData,
        readOne,
        createData,
        updateData,
        deleteData} = require('../controllers/post.controller');

router.get('/', readData)
      .get('/:id', readOne)
      .post('/', loginRequired, imageUpload.single('image'), createData)
      .put('/:id', loginRequired, imageUpload.single('image'), updateData)
      .delete('/:id', loginRequired, deleteData);

module.exports = router;