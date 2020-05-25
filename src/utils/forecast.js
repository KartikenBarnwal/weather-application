const request=require('request')


const forecast=(lat,lon,callback)=>
{
    const url="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&exclude=hourly,daily&appid=1f26147f64662ab2ed5bc3d843947e23"

    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather services')
        }
        else if(body.message)
        {
            callback('Wrong location coordinates provided to the weather services')
        }
        else
        {
            callback(undefined,{
                temp: body.current.temp,
                feels_like: body.current.feels_like,
            })
        }
    })
}

module.exports=forecast