# adds port forwarding rules
echo "
rdr pass inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
rdr pass inet proto tcp from any to any port 443 -> 127.0.0.1 port 8080
" | sudo pfctl -ef -

# view your settings with:
# sudo pfctl -s nat
