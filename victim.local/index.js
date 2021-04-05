let express = require('express');
let app = express();
let port = 8080;

// victim page with CSP header for src restriction
app.get('/csp_src_victim.html', function(request, response) {
    response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 127.0.0.1:8000; script-src 'self'; img-src 'self'");
    response.sendFile(__dirname + '/victim.html');
});

// victim page with CSP header for frame restriction
app.get('/csp_frame_victim.html', function(request, response) {
    response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 127.0.0.1:8000; script-src 'self'; img-src 127.0.0.1:8000; frame-ancestors 'none'");
    response.sendFile(__dirname + '/victim.html');
});

// victim page with CSP header for only script restriction
app.get('/victim.html', function(request, response) {
    response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 127.0.0.1:8000; script-src 'self'; img-src 127.0.0.1:8000");
    response.sendFile(__dirname + '/victim.html');
});

app.listen(port, () => {
    console.log(`Victim server listening at port ${port}`);
});


