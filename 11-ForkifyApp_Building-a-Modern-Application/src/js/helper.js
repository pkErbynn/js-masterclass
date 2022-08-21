import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await response.json();
    
        if(!response.ok) throw new Error(`${data.message} (${data.status})`);
    
        return data;
    } catch (error) {
        throw error;        
    }
}

export const postJSON = async function (url, newRecipe) {
  try {
      const response = await Promise.race([fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe)
      }), timeout(TIMEOUT_SEC)]);
      const data = await response.json();
  
      if(!response.ok) throw new Error(`${data.message} (${data.status})`);
  
      return data;
  } catch (error) {
      throw error;        
  }
}