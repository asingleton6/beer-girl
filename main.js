const brewurl = new Request('http://localhost:7000/breweries.json');

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

fetch(brewurl, {
    mode: 'cors'
  })
  .then(function(resp) {
    return resp.json();
  }) // Transform the data into json
  .then(function(data) {
    let breweries = data;
    let count = 0;

    for (let b in breweries) {
      let div = createNode('div'); //create div for each brewery
      count += 1; //number each brewery

      div.innerHTML = "<br />" + "(" + count + ")" + "<br />" + " " + breweries[b]['name'] + "<br />" + "Street: " + breweries[b]['street'] + "<br />" + "City: " + breweries[b]['city']; //add content to div
      document.body.appendChild(div); //append the elements
    }
  }) //Print breweries to the screen
  .catch(function(error) {
    console.log(error);
  }); // Catch any errors here

/**
 * Initialize Google map, called from HTML.
 */
var map;
var geocoder;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.751650,
      lng: -84.399328
    },
    zoom: 11
  });

  // var marker = new google.maps.Marker({
  //   position: {
  //     lat: 33.751650,
  //     lng: -84.399328
  //   },
  //   map: map,
  //   title: 'Hello World!',
  //   // icon: 'pin.png',
  //   // animation: google.maps.Animation.BOUNCE,
  //   // draggable: true
  // });
}

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
  var address = "5600 Roswell Road";
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}