const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');


let employeeData = [
  { id: 1, firstName: "John", lastName: 'Doe', email: "john@gmail.com", experience: 'Fresher' },
  { id: 2, firstName: "Nisha", lastName: 'Sahu', email: "nisha@gmail.com", experience: 'Fresher' },
];

// create new express app and save it as "app"
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/employees', (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(employeeData));

});

app.post('/addEmployees', (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  data = {
    ...req.body,
    id: employeeData.length + 1
  }
  employeeData.push(data)
  res.send(employeeData);

});

app.post('/updateEmployee/:id', (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  console.log(req.params.id);
  console.log("update employee");
  employeeData=employeeData.map(emp =>{
    if(emp.id===req.params.id){
      console.log("inside emp");
      emp.firstName=req.body.firstName,
      emp.lastName=req.body.lastName,
      emp.email=req.body.email,
      emp.experience=req.body.experience
    }

    return emp;
  });

  console.log(employeeData);
  res.send(employeeData);

});

app.delete('/deleteEmployee/:id', (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  console.log(req.params.id);
  employeeData = employeeData.filter(emp => emp.id != id);
  console.log(employeeData);
  res.send(employeeData);

});


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});