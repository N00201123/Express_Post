const faker = require('faker');
const Post = require('../models/post.model');
const Tag = require('./models/tag.model');

console.log('Seeding..');

let tag = new Tag({
   name: faker.name.findName() + " Tag"
});

tag.save((err) => {
   if (err) return;

   let post = new Post({
      name: faker.name.findName() + " Post"
   });
   post.tags.push(item);
   post.save((err) => {
      if (err) return;
   })
});