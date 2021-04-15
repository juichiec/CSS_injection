# CSS_injection

## Description
Implementation of attacker server, victim server and exploit_site for CSS injection attack.

## Setup
1. Startup a terminal and run ```python -m SimpleHTTPServer 8090``` to set up a local server that serves ```exploit_site.html```, ```exploit_site_frame.html``` and ```exploit_site_src.html``` at port 8090.
2. Startup a second terminal and navigate to attacker.local, then run ```node index.js``` to set up the attacker server at port 8000.
3. Startup a third terminal and navigate to victim.local, then run ```node index.js``` to set up the victim server at port 8080.
4. Open up your browser and try accessing ```http://127.0.0.1:8090/exploit_site.html```, ```http://127.0.0.1:8090/exploit_site_src.html```, ```http://127.0.0.1:8090/exploit_site_frame.html``` to see how they behave. Also, remember to check the console message on your browser to see how the mitigation method works.
