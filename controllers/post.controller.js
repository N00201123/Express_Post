const fs = require('fs');
const Post = require('../models/post.model');

const log = data => console.log(JSON.stringify(data,undefined,2))

(async function() {

    try {
  
      const conn = await mongoose.connect(uri,options);
  
      // Clean data
      await Promise.all(
        Object.entries(conn.models).map(([k,m]) => m.deleteMany() )
      );
  
      let [football,car] = ['football','car'].map(
        name => new Post({ name })
      );
  
      let [Andrew,William] = ['Andrew','William'].map(
        name => new Tag({ name })
      );
  
      // Add posts to tags
      [Andrew,William].forEach( tag => {
        tag.items.push(football);   // add football to tags
        football.tags.push(tag);  // add tags to football
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

  const deleteImage = (filename) => {
    let path = `public/uploads/${filename}`;

    fs.access(path, fs.constants.F_OK, (err) => {
        if(err) {
            console.log(err);
            return;
        }

        fs.unlink(path, (err) => {
            if(err) throw err;
            console.log(`${filename} was deleted!`);
        });
    });
};

const readData = (req, res) => {

    Post.find({}).populate('platform')
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
    });
};

const createData = (req, res) => {
    console.log(req.file);

    let postData = req.body;

    if(req.file) {
        postData.image_path = req.file.filename;
    }
    //include the following else if image is required
    else {
        return res.status(422).json({
            msg: "Image not uploaded!!"
        });
    }

    //console.log(inputData);

    Post.create(postData)
    .then(data => {
        console.log(`New Post Created`, data);
        //return
        res.status(201).json(data);
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            console.error('Validation Error!!', err);
            res.status(422).json({
                "msg": "Validation Error",
                "error" : err.message 
            });
        } 
        else {
            console.error(err);
            res.status(500).json(err);   
        }
    });
};

const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    if(req.file) {
        body.image_path = req.file.filename;
    }

    Post.findByIdAndUpdate(id, body, {
        new: false,
    })
    .then(data => {
        console.log(data);

            if(data){
                deleteImage(data.image_path);
                res.status(201).json(data);
            }
            else {
                deleteImage(body.image_path);
                res.status(404).json({
                    "message": `Post with id: ${id} not found`
                });
            }
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
        } 
        else if(err.name === 'CastError'){
            res.status(400).json({
                "message": `Bad request, ${id} is not a valid id`
            });
        }
        else {
            console.error(err);
             res.status(500).json(err);   
        }
    });
};

const deleteData = (req, res) => {

    let id = req.params.id;
    let imagePath = '';

    Post.findById(id)
    .then((data) =>{

        if(data){
            imagePath = data.image_path;
            return data.deleteOne();
            
        }
        else {
            
            res.status(404).json({
                "message": `Post with id: ${id} not found`
            });
        }
    })
    .then(() => {
        deleteImage(imagePath);

        res.status(200).json({
            "message": `Post with id: ${id} deleted successfully`
        });
    })
    .catch(err => {
        console.error(err);
        if(err.name === 'CastError') {
            res.status(400).json({
                "message": `Bad request, ${id} is not a valid id`
            });
        }
        else{
            //console.error(err);
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