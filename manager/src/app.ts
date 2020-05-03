import {discover} from "./module/light/discover";
import {LightManager} from "./module/light/manager";
import {Light} from "./module/light/light";
import path from "path";
import {Server} from "socket.io";
import {urlencoded} from "body-parser";
import {socketEvents} from "./config/socket";
import {lightRouter} from "./server/LightRouter";

const app = require('express')();
const cors = require('cors')

app.use(urlencoded({extended: true}));
app.use(cors());
app.use("/light", lightRouter)
const server = require('http').Server(app);
const io: Server = require('socket.io')(server);
const lm = LightManager.instance;

discover();

lm.on(LightManager.events.updateLights, (lights: Light[]) => {
	console.log("Refresh lights NB=" + lights.length, lights.map(l => `${l.ip}: ${l.id}`).join("\n\t"));
	io.send(socketEvents.update, lights.map(l => l.json()));
})

server.listen(4000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "server", '/index.html'));
});

io.on('connection', (socket) => {
	//console.log(lm.get().map(l => l.json()))
	console.log("Connection", socket.client.conn.remoteAddress)
	socket.emit(socketEvents.update, lm.get().map(l => l.json()));

});
