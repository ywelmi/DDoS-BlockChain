sudo iptables -A INPUT -i lo -p tcp --tcp-flags SYN,ACK SYN,ACK -j LOG --log-level 4
