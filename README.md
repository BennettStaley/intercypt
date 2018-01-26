# intercypt
## JavaScript Based Man In the Middle Attack
### This method is for MacOS and has not been adapted to linux (yet)
(because i really like js, and other demos are in python)

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

To install dependencies `yarn install`

To gather victims you can use `yarn gather`
to portForward you can use `yarn portForward`

### running the attack
```
yarn attack en0 192.168.1.1
```
param 1 is our interface, param 2 is the gateway to attack
you can find your interface by holding OPTION and clicking on wifi
or running `ifconfig` and finding your local ip

## running the proxy
```
yarn listen
```
no params are taken

## Disclaimer
While it is not explicitly illegal to store someone else http traffic or packets in the US, it is not particularly ethical to do so. 
Other countries especially in the EU have criminalized this and related activities due to privacy concerns.
User discretion is advised.