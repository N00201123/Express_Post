const express = require('express');
const router = express.Router();

const { loginRequired } = require('../controllers/user.controller');

const { readData,
        readOne,
        createData,
        updateData,
        deleteData} = require('../controllers/tag.controller');

router.get('/', readData)
      .get('/:id',loginRequired, readOne)
      .post('/', loginRequired, createData)
      .put('/:id', loginRequired, updateData)
      .delete('/:id', loginRequired, deleteData);

module.exports = router;