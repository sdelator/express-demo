
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //returns a piece of middleware

const courses = [
  {id:1, name:"course1"},
  {id:2, name:"course2"},
  {id:3, name:"course3"}
];
// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (req, res)=>{
    res.send('hello---');
});

app.get('/api/courses' ,(req, res)=>{
    res.send(courses);
});

app.post('/api/courses', (req, res)=>{
    const { error } = validateCourse(req.body);

    if(error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
  const course = {
    id:courses.length+1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res)=>{
    //look up course and if not exist then return 404
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given is was not found')
    } //404
    //validate, if invalid, return 404 bad request
    const { error } = validateCourse(req.body);
    if(error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    //update the course and return the updated course
    course.name =req.body.name;
    //return updated course to client
    res.send(course);
});

app.get('/api/courses/:id' ,(req, res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given is was not found')
    } //404
    res.send(course);
});

app.get('/api/posts/:year/:month' ,(req, res)=>{
    res.send(req.query);
});

app.delete('/api/courses/:id', (req, res)=>{
  //look up the course
  //not existing, return 404
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course){
      res.status(404).send('The course with the given is was not found')
  }

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
  //return the same course
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));
