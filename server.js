require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

let { students } = require('./exam-info')
// 1: in the home,list all the students who took the exam (list all the students)

app.get('/', (req, res)=>{
  res.render('home.hbs', { students } )
})
// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

app.get('/results', (req, res)=>{
  let newStudents = students.filter((e)=>{
    if (e.hasPassed===true){
      return e
    }
  }).sort((a, b) => {
    if (a.score > b.score){
      return -1
    } else if (a.score < b.score) {
      return 1
    } else {
      return 0
    }
  })
  res.render('results.hbs', { newStudents } )
})


app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);
