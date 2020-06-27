export const socketEvents = {
    updateAll: "UPDATE_ALL",
    updateLight: "UPDATE_LIGHT",
};

export const minDelay = 100;

const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("GET", "/env.json", false);
xmlHttpRequest.send();
const env = JSON.parse(xmlHttpRequest.responseText);

export const serverURL = `${window.location.protocol}//${env.hostname}:${env.port}`;


