import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
} 