'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        position => {
            console.log('works!');
            console.log(position.coords);
            const {latitude, longitude} = position.coords;
            const coordinates = [latitude, longitude];
            console.log(`my lat ${latitude}...log ${longitude}`);

            var map = L.map('map').setView(coordinates, 13);    // since library is loaded, the L class can be accessed in the browser console

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // adding marker pin on map click
            function onClick(mapEvent) { 
                const {lat: clickedLongitude, lng: clickedLatitude} = mapEvent.latlng;  // destructure
                const clickedCoordinate = [clickedLongitude, clickedLatitude]
                console.log('coo', clickedCoordinate);
                L.marker(clickedCoordinate).addTo(map)
                .bindPopup(
                    L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: 'running-popup'
                    })
                )
                .setPopupContent('Workout!')
                .openPopup();
            }

            map.on('click', onClick);
           
        }, 
        (err) => {
            alert('Could not get your location', err)
            console.log(err.message);
        }
    )
}
