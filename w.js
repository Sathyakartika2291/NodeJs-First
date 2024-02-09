const express=require('express');
const request=require('request');
const app=express();
const port=2000;
const url='https://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees';

//setups

app.use(express.static(__dirname + "/public")) //css
app.set("views", "./src/views")//pages
app.set("view engine", "ejs")//choosing ejs template
app.get('/',(req,res)=>
{
    res.send('<h1>Welcome to employee App</h1>')
})
app.get('/employeeslist',(req,res)=>
{
    request(url,(err,response,body)=>
    {
        if(err)
        {
            console.log(err)

        }
        else{
            const output=JSON.parse(body)
            // res.send(output)
            res.render("main", { emplist:output, title: "EmployeeList" })
            console.log(output)
        }
    })
   
})
app.listen(port,(err)=>
{
    if (err) throw err;
    console.log("Server is starting on port " + port)
})