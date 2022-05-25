'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// manually throw custom errors that mignt not be handled auto by promise
// example: - resource not found, property not found on data

const getPost = function () {
  fetch("https://my-json-server.typicode.com/typicode/demo/posts")
    .then((response) => {

        // handle before .json()
        if(!response.ok){
            throw new Error('custom error handling')
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        // const one = response[0].id;
        const one = response[8]?.id;    // not found id

        if(!one){
            throw new Error('no id found')
        }

        return fetch(`https://my-json-server.typicode.com/typicode/demo/posts/${one}`)   // error
    })
    .then(res => {
         // handle before .json()
         console.log(res);
         if(!res.ok){
             throw new Error('post not found')
         }
        return res.json()
    })
    .then(res => console.log(res))
    .catch(err => console.error(`${err} boom!!`))   // handles all err msg
    
};

getPost();



// manaul error handling
const getJson = function (url, message = 'Something went wrong') {
    return fetch(url)
            .then((response) => {
                // handle before .json() as it gets the body
                if(!response.ok) throw new Error(message)
                return response.json();
    })
}
const getPostData = function () {
    getJson("https://my-json-server.typicode.com/typicode/demo/posts", 
    "post not found")
    .then((response) => {
        // const one = response[1].id;
        const one = response[6]?.id;
        if(!one) throw new Error('no such post')

        return getJson(`https://my-json-server.typicode.com/typicode/demo/qposts/${one}`, "wrong url")
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(`${err} boom!!`))
    
};
  
getPostData();

// Go here for more: https://github.com/pkErbynn/complete-javascript-course/blob/8201b01f2fcd274fb276c1c8e11e55847c6d451e/16-Asynchronous/final/script.js#L146


///////////////
/// Building Promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lotter is happening...');
    
//     setTimeout(() => {
//         if (Math.random() >= 0.5) {
//             resolve('YOU WIN')
//         } else {
//             reject(new Error('You lost your money'))
//         }
//     }, 2000);
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err))


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/


const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`); // cheking ok status on the head
      return res.json();    // json to return the body message to the next chain
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);    // api not working
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
    return new Promise((resolve, reject) =>{
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img)
        })

        img.addEventListener('error', () => {
            reject(new Error('imge error'))
        })
    })
}

let currentImg;

createImage('img/img-1.jpg')
    .then(img => {
        currentImg = img
        console.log(img);
        console.log('img 1 loaded');

        return new Promise((resolve) => {
            setTimeout(resolve, 3000);  // resolve returns nothing
        })
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg')
    })
    .then(img => {
        currentImg = img;
        console.log('image 2 loaded');
    })


    /////// async / await
const whereAmIAsync = async () => {
    const res = await fetch("https://my-json-server.typicode.com/typicode/demo/posts");
    const data = await res.json(); // returns a promise thus 'await'
    console.log('RESS:', data);
    console.log('THIRD');
    console.log('FORTH');
}

console.log('FIRST');
whereAmIAsync();
console.log('SECOND');


///// return async
const whereAmIAsync2 = async () => {
    const res = await fetch("https://my-json-server.typicode.com/typicode/demo/posts");
    const data = await res.json(); // returns a promise thus 'await'
    console.log('RESS 2:', data);
    return 'SECOND2';
}

// calling async in async + checking order of execution
(async function (){
    const result = await whereAmIAsync2();  // need to be awaited in async fxn
    console.log('RESULT:', result);
})()  // IIFE


// canceling request if it took so long using .race()
// const mytimeout = function (sec) {
//     return new Promise((_, reject) => {
//         setTimeout(() => {
//             reject(new Error('Request took so long'))
//         }, sec * 1000);
//     })
// }
// //// timout after certain long request time
// Promise.race([fetch("https://my-json-server.typicode.com/typicode/demo/posts"), mytimeout(2)])
// .then(res => console.log(res))
// .catch(err => console.log(err))


/// load all images
const loadAll = async function (imageArr) {
    try {
        const images = imageArr.map(async image => await createImage(image))
        console.log('promisified images:', images);
        const imageResults = await Promise.all(images)   // again, all promise need to be awaited
        console.log('result images:', imageResults);
        imageResults.forEach(img => img.classList.add('parallel'))
    } catch (error) {
        alert('error occurred loading images')
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
