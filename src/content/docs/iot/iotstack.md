# IOTstack

## Setup on rpi
```
sudo apt update
sudo apt upgrade -y
```

```
sudo apt install -y curl
```

```
sudo apt-get install screen
```

```
cd /home/pi/
screen
curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash
```

Create docker group and add pi user
```
sudo groupadd docker
sudo usermod -G docker -a pi
```

Add docker-compose
```
sudo pip3 install docker-compose
```

Add docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
```

Start
```
docker-compose up -d --remove-orphans
```

## pigpiod
Raspberry PI GPIO interface running on port 8888.
