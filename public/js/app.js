
function main()
{
    var place=document.getElementById('place').value.toLowerCase()
    var msg=document.getElementById('msg')

    fetch('/weather?address='+place).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            msg.innerHTML=data.error
        }
        else
        {
            msg.innerHTML=data.location+"<br>"+data.forecastData.temp+"<sup>•</sup>C<br>(Feels-like: "+data.forecastData.feels_like+"<sup>•</sup>C)"
            var x=document.querySelectorAll(".ans")
            x[0].style.opacity="1"

            initMap()
            function initMap() {
                // The location of Uluru
                var uluru = {lat: data.latitude, lng: data.longitude};
                // The map, centered at Uluru
                var map = new google.maps.Map(
                    document.getElementById('map'), {zoom: 4, center: uluru});
                // The marker, positioned at Uluru
                var marker = new google.maps.Marker({position: uluru, map: map});
              }
    
        }
        })
    }) 
}

function capitalize()
{
    var input=document.getElementById('place')
    input.value=input.value.toUpperCase()
}





