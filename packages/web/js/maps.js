let autocomplete;

var userPosition = 
    {
    lat: '',
    lon: ''};

if(navigator.geolocation)
  {
      navigator.geolocation.getCurrentPosition(function(position){
        userPosition.lat = position.coords.latitude;
        userPosition.lon = position.coords.longitude;

      });
  }
  else
  {
      alert("Geolocation not supported by your browser");
  }




function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const mapOptions = {
        center: new google.maps.LatLng("-23.5489", "-46.6388"),
        zoom: 12
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
    initAutoComplete();
}

function setCenter(){
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const mapOptions = {
    center: new google.maps.LatLng(autocomplete.getPlace().geometry.location.lat(),autocomplete.getPlace().geometry.location.lng()),
    zoom: 15
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);

  const img = 'img/pessoas2.png';
  new google.maps.Marker({
    position: {lat: autocomplete.getPlace().geometry.location.lat(), lng:autocomplete.getPlace().geometry.location.lng()},
    map,
    title: "Olha eu aqui",
    icon: img,
  });
}


async function calcRoute(end) {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    
    console.log(userPosition.lat)

    const mapOptions = {
        center: new google.maps.LatLng(userPosition.lat,userPosition.lon),
        zoom: 12
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);

    var request = {
      origin: new google.maps.LatLng(userPosition.lat,userPosition.lon),
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

function initAutoComplete(){
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('inputZip'),
      {
        componentRestrictions:{'country':['BR']},
      }
    )
  }

