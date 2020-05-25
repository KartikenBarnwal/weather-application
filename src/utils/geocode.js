const request=require('request')

const geocode=(address,callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoia2FydGlrZW4iLCJhIjoiY2s5c2FodnZ1MDBlaDNtb2RmMG95Z2tnbCJ9.T5tK6-IS9zNBaSVyCzD0mQ&limit=1"

    request({url:url, json:true},(error,{body})=>{   //NOTE: ES6 Object shorthand property----> for objects having propery name and value same, we can simply write only once. (eg: {url,json:true})
        if(error)
        {
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
                
            })
        }
    })
}

module.exports=geocode