# intercypt
## Javascript Based MITM attack demo
(because i really like js, and all the demos are in python :smileyface: )

yarn install (or just yarn) in package root.

### This method requires PORTS (macports) which can be found here:
https://www.macports.org/install.php

Alternatively if you are running linux:
```
apt-get -y install dsniff arp-scan arpspoof
```
will suffice (i think)

### You need to enable Firewall:
System Preferences -> Security & Privacy -> Firewall -> Turn On Firewall
(then reboot)

Then run 
```
./scrips/portForward
```
Then run 
```
./scripts/install.sh
```
Then run 
```
./scripts/gather.sh
```
### running the attack
```
./src/spoof.js en0 192.168.1.1
```
param 1 is our interface, param 2 is the gateway to attack

## running the proxy
```
./sripts/proxy.js
```