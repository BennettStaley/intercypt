# install arpspoof (dsniff)
sudo port install dsniff
# this comes with arp! woot

sudo sysctl -w net.inet.ip.forwarding=1
sudo sysctl -w net.inet.ip.fw.enable=1

# for linux use:
# sudo apt install dnsiff arp-scan arpspoof
# (i think)

