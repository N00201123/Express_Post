const Tag = require('../models/tag.model');

const log = data => console.log(JSON.stringify(data,undefined,2))

(async function() {

  try {

    const conn = await mongoose.connect(uri,options);

    // Clean data
    await Promise.all(
      Object.entries(conn.models).map(([k,m]) => m.deleteMany() )
    );


    // Create some instances
    let [football,car] = ['football','car'].map(
      name => new Post({ name })
    );

    let [Andrew,William] = ['Andrew','William'].map(
      name => new Tag({ name })
    );

    // Add items to stores
    [Andrew,William].forEach( tag => {
      tag.items.push(football);   // add toothpaste to store
      football.tags.push(tag);  // add store to toothpaste
    });

    //
    Andrew.posts.push(car);
    car.tags.push(Andrew);

    // Save everything
    await Promise.all(
      [football,car,Andrew,William].map( m => m.save() )
    );

    // Show tag
    let tags = await Tag.find().populate('posts','-tags');
    log(tags);

    // Show items
    let posts = await Post.find().populate('tags','-posts');
    log(posts);

  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }

})();

const readData = (req, res) => {

    Tag.find({})
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

    Tag.findById(id)
    .then(data => {

        if(!data) {
            res.status(404).json( {msg: `Tag ${id} not found!`});
        }

        res.status(200).json(data);
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Tag ${id} not found!`});
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

    Tag.create(inputData)
    .then(data => {
        console.log(`New Tag Created`, data);
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

    Tag.findByIdAndUpdate(id, data, {
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
            res.status(404).json( {msg: `Tag ${id} not found!`});
        }
        else {
            console.error(err);
             res.status(500).json(err);   
        }
    });
};

const deleteData = (req, res) => {

    let id = req.params.id;

    Tag.findByIdAndDelete(id)
    .then(data =>{

        if(!data) {
            res.status(404).json( {msg: `Tag ${id} not found!`});
        }

        res.status(200).json({msg: `Tag ${id} deleted!`, });
    })
    .catch(err => {
        if(err.name === 'CastError'){
            res.status(404).json( {msg: `Tag ${id} not found!`});
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