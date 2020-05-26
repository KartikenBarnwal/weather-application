const request=require('request')
const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

 
const app=express()
const port=process.env.PORT || 3000

// define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views locan
app.set('view engine', 'hbs')  
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirPath))


 
app.get('',(req,res)=>{
    res.render(('index'),{
        title:"KRAB's Weather-app",
        name:'KARTIKEN BARNWAL'
    })
})

app.get('/about',(req,res)=>{ 
    res.render(('about'),{
        title:"KRAB's Weather-app",
        name:'KARTIKEN BARNWAL'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address!'
        })
    }

    const address=req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
     
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
             
           res.send({
               location,
               forecastData,
               address,
               latitude,
               longitude
           })
        })
    
    })

})


//wild card route... has to be at last for this purpose! 
app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:'ERROR 404 !',
        name:'KARTIKEN BARNWAL',
        errorMessage:'ABOUT articel not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'ERROR 404 !',
        name: 'KARTIKEN BARNWAL',
        errorMessage:'Page Not Found!'
    })
})

app.listen(port, ()=>{
    console.log('server is up on our port '+port)
})