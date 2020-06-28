const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("GET", "/conf.json", false);
xmlHttpRequest.send();
console.log(xmlHttpRequest.responseText);

type Config = {
    "endpoints": {
        "api": string,
        "socket-io": string
    }
}
export const conf: Config = JSON.parse(xmlHttpRequest.responseText);
