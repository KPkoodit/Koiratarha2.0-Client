import * as L from "leaflet";
import { Coordinates, PointOfInterest } from "../interfaces/Coordinates";

const map = L.map("map").setView([0, 0], 2);

// Use the leaflet.js library to show the location on the map (https://leafletjs.com/)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Groups for map
let layerGroup = L.layerGroup();
const markerGroup = L.layerGroup();

// Get the locations and show them on the map
document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://www.hel.fi/palvelukarttaws/rest/v4/unit/";

  const btnChoices: { [key: string]: string } = {
    enclosure: "317",
    trail: "318",
    toilet: "319",
    forest: "320",
    beach: "321",
    all: "317+318+319+320+321+322+323",
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  // Helper function to update map and markers
  function updateMap(pos: GeolocationPosition, btnChoice: string) {
    const crd = pos.coords;
    //console.log(crd);
    map.setView([crd.latitude, crd.longitude], 12);

    const ownLocation = addMarker(crd, "Olen tässä!");
    fetchLocations(API_URL, btnChoice).then((pointsOfInterest) => {
      addMarkers(pointsOfInterest);
      map.addLayer(markerGroup);
      ownLocation.openPopup();
    });
  }

  // Fetch locations from API
  async function fetchLocations(API_URL:string, btnChoice: string): Promise<PointOfInterest[]> {
    const apiUrl = `${API_URL}?ontologyword=${btnChoice}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  // Add markers to the map
  function addMarkers(pointsOfInterest: PointOfInterest[]) {
    pointsOfInterest.forEach((point) => {
      const { name_fi: placeName, latitude, longitude, street_address_fi, address_city_fi } = point;
      const marker = addMarker({ latitude, longitude }, placeName);

      marker.on("click", () => {
        updatePlaceDetails(placeName, street_address_fi, address_city_fi);
      });
    });
  }

  // Handle success for geolocation
  function success(pos: GeolocationPosition) {
    updateMap(pos, btnChoices.all);
  }

  // Handle success with different place choice
  function successWithChoice(pos: GeolocationPosition, btnChoice: string) {
    markerGroup.clearLayers();
    layerGroup.clearLayers();
    updateMap(pos, btnChoice);
  }

  // Geolocation error handler
  function handleError(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // Handle place selection and trigger geolocation based on selection
  function handlePlaceSelection() {
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[name="place"]');
    let selectedPlace = [...radioButtons].find((rb) => rb.checked)?.value;
    console.log("Selected place:", selectedPlace);
    const btnChoice = btnChoices[selectedPlace || "all"];
    console.log("Button choice:", btnChoice);

    // Trigger geolocation with the selected button choice
    navigator.geolocation.getCurrentPosition(
      (pos) => successWithChoice(pos, btnChoice),
      handleError,
      options
    );
  }

  // Add a marker to the map
function addMarker(crd: Coordinates, text: string): L.Marker {
  const customIcon = L.icon({
    iconUrl: "/images/target50.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  const m = L.marker([crd.latitude, crd.longitude], {icon: customIcon})
    .addTo(markerGroup)
    .bindPopup(text);
  markerGroup.addLayer(m);
  return m;
}

// Update UI elements with selected place details
function updatePlaceDetails(name: string, address: string, city: string) {
  document.querySelector("#name")!.innerHTML = name;
  document.querySelector("#address")!.innerHTML = address;
  document.querySelector("#city")!.innerHTML = city;
}

  // Add event listener to the submit button
  document.querySelector("#submitBtn")!.addEventListener("click", handlePlaceSelection);

  // Initialize geolocation on page load
  navigator.geolocation.getCurrentPosition(success, handleError, options);
});

