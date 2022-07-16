let autocomplete;

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


function calcRoute(start,end) {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const mapOptions = {
        center: new google.maps.LatLng("-23.5489", "-46.6388"),
        zoom: 12
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);

    var request = {
      origin: start,
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