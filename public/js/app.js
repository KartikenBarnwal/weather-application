console.log('Client side js file loaded')

function main()
{
    var place=document.getElementById('place').value.toLowerCase()
    var msg=document.getElementById('msg')

    fetch('http://localhost:3000/weather?address='+place).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            msg.innerHTML=data.error
        }
        else
        {
            msg.innerHTML=data.location+"<br>"+data.forecastData.temp+"<sup>•</sup>C<br>(Feels-like: "+data.forecastData.feels_like+"<sup>•</sup>C)"


        }
        })
    }) 
}

function capitalize()
{
    var input=document.getElementById('place')
    input.value=input.value.toUpperCase()
}




