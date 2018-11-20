const express = require('express');
const hbs = require('hbs') //Template engine HandelbarJS
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear',()=>{
    return '@'+new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set("view engine",'hbs');
app.use(express.static(__dirname+'/public'));
/*--------Express Middleware--------------------*/
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}'\n'`;
    fs.appendFile('server.log', log,(err)=>{
        if(err){
            console.log("Unable to write log");
        }
    });
    console.log(log);
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance'
//     });
// });
/*--------Express Middleware End------------------*/
app.get('/',(req, res)  =>{
    //res.send("<h1>Hello World</h1>");
    res.render('home.hbs',{
        pageTitle: 'World of NodeJS',
        welcomeMsg: "Welcome to world of nodeJS with express and handelbar Template engine..."
    });
});
app.get('/about',(req, res)=>{
    //res.send("This is about page");
    res.render("about.hbs",{
        pageTitle: 'About Us'
    });
});
app.get('/contact',(req,res)=>{
    res.render("contact.hbs",{
        pageTitle: 'Contact Us'
    })
});
app.listen(port,()=>{
    console.log(`Server is up on Port ${port}`);
});