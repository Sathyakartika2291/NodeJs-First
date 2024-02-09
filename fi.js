const fs=require("fs")
const request=require('request');
const express=require('express');
const app=express();
const port=2000;
const url='http://localhost:2000/employee';
const url1='http://localhost:2000/project';
app.get('/',(req,res)=>
{
    res.send('<h1>Welcome</h1>')
})
app.get('/employee',(req,res)=>
{
    
    fs.readFile('./employee.json',(err,result)=>
    {
        if(err){
        throw err;
        }
        else{
            res.send(JSON.parse(result))
        }
    })
})
app.get('/project',(req,res)=>
{
    
    fs.readFile('./project.json',(err,result)=>
    {
        if(err){
        throw err;
        }
        else{
            res.send(JSON.parse(result))
        }
    })
})
app.get('/employee/:id', (req, res) => {
    const employeeId = req.params.id;
    request(url, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        const output = JSON.parse(body);
        const employeeData =output.Employee[employeeId-1]; 
        res.send(employeeData);
      }
    });
  });
  app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
   
    request(url1, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        const output = JSON.parse(body);
        const ProjectData =output.Project[projectId-1]; 
        res.send(ProjectData);
      }
    });
  });



app.get('/getemployeedetails/:id', (req, res) => {
    const employeeId = req.params.id;
    console.log("pjctId",employeeId)
    request(url, (err, employeeResponse, employeeBody) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching employee details');
      } else {
        const employeeData = JSON.parse(employeeBody);

  console.log("employeeData",employeeData)
const empData =employeeData.Employee[employeeId-1]; 

console.log("Employee pjctid",empData.ProjectId);
    
       request(`http://localhost:2000/project`, (err, projectResponse, projectBody) => {
            const rprjctId = empData.ProjectId;
            console.log("rpjctId",empData.ProjectId)
          if (err) {
            console.log(err);
            res.status(500).send('Error fetching project details');
          } else {
            const projectData = JSON.parse(projectBody);
            const pData = projectData.Project.filter(Project => Project.ProjectId === rprjctId); 
           // const pData =projectData.Project[employeeId-1]; 
            console.log("Project data",pData);
          
            const combinedData = {
              Employee: empData,
              Project: pData
            };
  
            res.json(combinedData); 
          }
        });
      
    
    }
})
})
app.listen(port,(err)=>
{
    if (err) throw err;
    console.log("Server is starting on port " + port)
})