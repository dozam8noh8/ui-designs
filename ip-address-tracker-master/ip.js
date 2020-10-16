/*
Owen Silver
Oct 2020
design from frontend mentors
TODO
- validate input with error messages
- make it obvious you search for your own ip if you dont enter one or add a "find my ip button"
*/
let map = document.getElementById('map');
var mymap = L.map('map').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(mymap);
let textBox = document.getElementById("ip-textbox");

let ipText = document.getElementById("ip");
let ispText = document.getElementById("isp");
let locationText = document.getElementById("location");
let timezoneText = document.getElementById("timezone");
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG96YW04bm9oOCIsImEiOiJja2djMm51cDEwMmYzMnZueTdhb3IybThzIn0._Y0MAw7yT8-Tg1EOg_rZJw'
}).addTo(mymap);

mymap.on('click', handleMapClick)
function handleMapClick(event) {
    marker
    .setLatLng(event.latlng)
}

function doSearch(){ 
    console.log("searching")
    let inputIP = textBox.value;
    console.log("searching for ip ", inputIP)
    let url = inputIP ? `https://geo.ipify.org/api/v1?apiKey=at_lyMVOBdeUHNevdV4PqMqCSw4kVQaV&ipAddress=${inputIP}` : "https://geo.ipify.org/api/v1?apiKey=at_lyMVOBdeUHNevdV4PqMqCSw4kVQaV"
    fetch(url, {

    })
    .then((data) => data.json())
    .then((data) => {
        console.log(data)
        if (data?.code === 422) return; // TODO, handle invalid api requests (maybe with form validation)
        let lat = data.location.lat;
        let lng = data.location.lng;
        let ip = data.ip;
        let isp = data.isp;
        let location = `${data.location.city}, ${data.location.region}, ${data.location.country} `
        let timezone = data.location.timezone;
        locationText.innerText = location;
        ipText.innerText = ip;
        ispText.innerText = isp;
        timezoneText.innerText = timezone;
        mymap.setView([lat, lng], 13);
        marker = L.marker([lat, lng]).addTo(mymap)
    });
}
