// map.js

var map = L.map('map').setView([0.3349, 32.5684], 16);
var preview = document.querySelector('.Preview')

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 20,
}).addTo(map);
L.Control.geocoder().addTo(map);

var buildingsData;
var userLat;
var userLng;
var routeControl;
var userLocationCircle;

fetch('/api/hat/')
    .then(response => response.json())
    .then(data => {
        buildingsData = data;
        displayMarkers();
    })
    .catch(error => {
        console.error('Error fetching building data:', error);
        // Handle the error (e.g., display an error message to the user)
    });

function displayMarkers() {
    buildingsData.forEach(building => {
        var marker = L.marker([building.latitude, building.longitude]).addTo(map);

        marker.on('click', function () {
            // Zoom in to the maximum level at the clicked point
            map.setView(marker.getLatLng(), map.getMaxZoom());

            // Reset the icon of all markers to the default
            buildingsData.forEach(building => {
                building.marker.setIcon(getMarkerIcon('purple')); // Set the default color
            });

            // Change the clicked marker's color to red
            marker.setIcon(getMarkerIcon('red'));
        });

        marker.bindPopup(`<b>${building.name}</b><br>${building.description}`);
        building.marker = marker; // Store the marker object in the building object
    });
}

function getMarkerIcon(color) {
    return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color + '.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
}
// Function to show the user's current location on the map
function showUserLocation(lat, lng) {
    // Create a marker for the user's current location
    var userMarker = L.marker([lat, lng], { icon: getMarkerIcon('green') }).addTo(map);
    userMarker.bindPopup('You are here').openPopup();

     // Create a circle around the user's location
     userLocationCircle = L.circle([lat, lng], {
        color: 'green',     // Circle color
        fillColor: 'blue', // Fill color
        fillOpacity: 0.2,  // Fill opacity
        radius: 50,        // Circle radius in meters
    }).addTo(map);

    // Optionally, you can also center the map on the user's location
    map.setView([lat, lng], 16);
}

// Function to handle errors when getting user location
function handleLocationError(error) {
    console.error('Error getting user location:', error);

    // Optionally, you can show a default location on the map
    // Here, I'm setting it to Makerere University, Uganda
    showUserLocation(0.3141, 32.5761);
}

// Check if the user's browser supports Geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
             userLat = position.coords.latitude;
             userLng = position.coords.longitude;

            // Call the function to show user location on the map
            showUserLocation(userLat, userLng);
        },
        handleLocationError // Call the error handler function if getting location fails
    );
} else {
    // Geolocation is not supported in this browser, show a default location
    // Here, I'm setting it to Makerere University, Uganda
    showUserLocation(0.3141, 32.5761);
}
// Handle the "Search" button click event
document.getElementById('findButton').addEventListener('click', function () {
    var searchName = document.getElementById('searchInput').value;

    // Search for the entered building name in the fetched building data
    var matchingBuilding = buildingsData.find(building => building.name.toLowerCase() === searchName.toLowerCase());

    if (matchingBuilding) {
        // Draw a route between the user's current location and the searched building
        if (routeControl) {
            map.removeControl(routeControl);
        }

        
        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(userLat, userLng), // Current location
                L.latLng(matchingBuilding.latitude, matchingBuilding.longitude), // Searched building
            ],
        }).addTo(map);

        // Zoom in to the searched building's location
        map.setView([matchingBuilding.latitude, matchingBuilding.longitude], 20);
    } else {
        console.error('No matching building found for the given name:', searchName);
        // Handle the case when no matching building is found (e.g., display an error message to the user)
    }
});



