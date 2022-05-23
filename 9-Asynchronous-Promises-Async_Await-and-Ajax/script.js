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