const Platform = require('../models/platform.model');

const readData = (req, res) => {

    Platform.find({})
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

    Platform.findById(id)
    .then(data => {

        if(!data) {
            res.status(404).json( {msg: `Platform ${id} not found!`});
        }

        res.status(200).json(data);
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Platform ${id} not found!`});
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

    Platform.create(inputData)
    .then(data => {
        console.log(`New Platform Created`, data);
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

    Platform.findByIdAndUpdate(id, data, {
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
            res.status(404).json( {msg: `Platform ${id} not found!`});
        }
        else {
            console.error(err);
             res.status(500).json(err);   
        }
    });
};

const deleteData = (req, res) => {

    let id = req.params.id;

    Platform.findByIdAndDelete(id)
    .then(data =>{

        if(!data) {
            res.status(404).json( {msg: `Platform ${id} not found!`});
        }

        res.status(200).json({msg: `Platform ${id} deleted!`, });
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Platform ${id} not found!`});
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