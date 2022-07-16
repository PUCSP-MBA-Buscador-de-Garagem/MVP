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

function listaEnd(){
  for(let i = 0; i < lista.length; i++){
    let obj = lista[i];
    end_place = Geo(obj["address"])
    let dist = checkDist(end_place)
    console.log(dist);
  }
}


function checkDist(end)
{
  var origem = new google.maps.LatLng("-23.5489", "-46.6388");
  var destino = end;
  var service = new google.maps.DistanceMatrixService();
  var dist;
service.getDistanceMatrix(
  { 
    origins: [origem],
    destinations: [destino],
    travelMode: 'DRIVING'
    // transitOptions: TransitOptions,
    // drivingOptions: DrivingOptions,
    // unitSystem: UnitSystem,
    // avoidHighways: Boolean,
    // avoidTolls: Boolean,
  }, callback);

  function callback(response, status) {
    if(status == 'OK'){
      results = response.rows[0].elements;
      element = results[0];
      dist = element.distance.value;
      console.log(dist);
      return dist
    }
  }
  return dist;
}

function Geo(addr){
  var locat;
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': addr}, function(results, status) {
    if (status == 'OK') {
      locat = results[0].geometry.location[0];
      console.log(typeof locat)
      console.log(locat)
      return locat
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}