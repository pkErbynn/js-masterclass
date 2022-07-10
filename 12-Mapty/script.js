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

class App {
    #map;
    #mapEvent;
    
    constructor(){
        this._getPosition();    // get location from the onset

        // register events listeners in constructor
        form.addEventListener('submit', this._addNewWorkout.bind(this));    // bind re-point 'this' from 'form' (#L85) to 'app' object
        inputType.addEventListener('change', this._toggleElevationField);   // no bind cus handler doesn't use 'this' keyword in its block
    }

    _getPosition(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),   // re-point/bind 'this' from 'geolocation' (L# 41, since it's the method caller...pointed at L#58) to 'app' instance (in L#103)  
                (err) => {
                    alert('Could not get your location', err)
                    console.log(err.message);
                }
            )
        }
    }

    _loadMap(position){
        console.log('works!');
        console.log(position.coords);
        const {latitude, longitude} = position.coords;
        const coordinates = [latitude, longitude];
        console.log(`my lat ${latitude}...log ${longitude}`);

        this.#map = L.map('map').setView(coordinates, 13);    // since library is loaded, the L class can be accessed in the browser console

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        this.#map.on('click', this._showForm.bind(this));   // change 'this' from map object (since it's object calling the on() method) to app object using bind()
    }

    _showForm(mapE){
        this.#mapEvent = mapE;    // forward map event data to onSubmit event
        form.classList.remove('hidden'); // make form available
        inputDistance.focus();  // focus on the distance form input
    }

    _toggleElevationField(){
        // when type is changed, on each input form, traverse to the row(with label + input) and toggle a hidden class on it
        // since the elevation-form is hidden at init state, it will toggle alternatively with the other
        // thus, show only one form row on change event
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');   
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _addNewWorkout(e){  // adding marker pin on map click
        e.preventDefault(); // stops form from refreshing **
        inputDistance.value = inputDuration.value = inputCadence.value = '';    // clear forms

        const {lat: clickedLongitude, lng: clickedLatitude} = this.#mapEvent.latlng;  // destructure
        const clickedCoordinate = [clickedLongitude, clickedLatitude]
        console.log('coo', clickedCoordinate);
        L.marker(clickedCoordinate).addTo(this.#map)   // 'this' will point to the form in L#35, thus use bind() to bind to the app object
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
}

const app = new App();