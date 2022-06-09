const http = require("http");
const WebSocketServer = require("websocket").server;

let connection = null;

const httpserver = http.createServer((req,res) => {
    console.log("We have received a request");
})


const websocket = new WebSocketServer({
    "httpServer": httpserver
})

websocket.on("request", request => {
    connection = request.accept(null,request.origin);
    connection.on("open", () => console.log("Opened"));
    connection.on("close",() => console.log("Closed"));
    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`);
    })

    sendFrequentMessage();
})


httpserver.listen(8080,()=>{
    console.log("My server is listening on port 8080");
})

let a = 1;

function sendFrequentMessage(){
    console.log("called");
    connection.send(`Message Hello to you ${new Date().toLocaleString()}`);
    a = a+1;
    setTimeout(sendFrequentMessage,5000)
}
