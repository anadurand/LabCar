//ejecuta la funcion cuando se carga la pagina
var map;
var tarifa = document.getElementById("tarifaResultado")
function initMap(){
      map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -10, lng: -76},
         zoom: 3
       });
    var latitud,longitud,miUbicacion;
    var funcionPosicion = function(posicion){
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
      miUbicacion = new google.maps.Marker({
        position:{lat:latitud, lng:longitud},
        map:map
      });
      map.setZoom(18);
      map.setCenter({lat:latitud, lng:longitud});
    }
    var funcionError = function(error){
      alert("Browser doesn't support Geolocation");
    }

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionPosicion, funcionError);
    }
    //input de partida y llegada
    var inputPartida = document.getElementById("partida");
    var inputDestino = document.getElementById("llegada");

    new google.maps.places.Autocomplete(inputPartida);
    new google.maps.places.Autocomplete(inputDestino);
    //direcciones
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var calculateRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputPartida.value,
        destination: inputDestino.value,
        travelMode: 'DRIVING'
      }, function(response, status){
            if(status ==='OK'){
              var km = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
              tarifa.classList.remove("hidden");
              var costo = km * 1.75;
              if(costo < 4){
                tarifa.innerHTML = "S/. 4";
              }else{
                tarifa.innerHTML = "S/." + parseInt(costo);
              }
              if(miUbicacion!==undefined){
                miUbicacion.setMap(null);
              }
              directionsDisplay.setDirections(response);
            }else{
              window.alert("No encontramos una ruta.");
            }
      });
    }

    directionsDisplay.setMap(map);
    var trazarRuta = function(e){
      // e.preventDefault();
      calculateRoute(directionsService,directionsDisplay);
    };
     document.getElementById("trazarRuta").addEventListener("click",trazarRuta)
};
