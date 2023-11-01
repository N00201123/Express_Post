const Post = require('../models/post.model');

const readData = (req, res) => {

    Post.find({})
    .then((data) => {
        console.log(data);

        if(data.length > 0){
            res.status(200).json(data);
        }
        else{
            res.status(404).json('None found');
        }
    })
    .catch(err => {
        console.error(err);
        response.status(500).json(err);
    });
};

const readOne = (req, res) => {

    let id = req.params.id;

    Post.findById(id)
    .then(data => {

        if(!data) {
            res.status(404).json( {msg: `Post ${id} not found!`});
        }

        res.status(200).json(data);
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Post ${id} not found!`});
        }

        else{
        console.error(err);
        response.status(500).json(err);
        }

        //console.error(err);
        //res.status(500).json(err);
    });
};

const createData = (req, res) => {
    console.log(req.body);
    let inputData = req.body;

    Post.create(inputData)
    .then(data => {
        console.log(`New Post Created`, data);
        res.status(201).json(data);
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
        res.status(422).json(err);
    } 
    else {
        console.error(err);
         res.status(500).json(err);   
    }
    });
};

const updateData = (req, res) => {

    let id = req.params.id;
    let data = req.body;

    Post.findByIdAndUpdate(id, data, {
        new: true,
    })
    .then(newData => {
        res.status(201).json(newData);
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            res.status(422).json(err);
        } 
        else if(err.name === 'CastError'){
            res.status(404).json( {msg: `Post ${id} not found!`});
        }
        else {
            console.error(err);
             res.status(500).json(err);   
        }
    });
};

const deleteData = (req, res) => {

    let id = req.params.id;

    Post.findByIdAndDelete(id)
    .then(data =>{

        if(!data) {
            res.status(404).json( {msg: `Post ${id} not found!`});
        }

        res.status(200).json({msg: `Post ${id} deleted!`, });
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Post ${id} not found!`});
        }
        else{
            console.error(err);
            res.status(500).json(err)
        }
    })
};

module.exports = {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
}