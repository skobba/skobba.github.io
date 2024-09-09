# Raspberry PI

## M.2 SSD w/ ext4 file system
1. Install Raspberry PI OS as normal on a sd-card and boot up
2. Insert M.2 SSD in the USB 3.0 port and make file system ext4 before installing Raspberry PI OS with "rpi-imager" on the PI.

## Startup scripts
After x-windows has been initialized:
```sh
# Path:
/etc/X11/Xsession.d/
```

### Sample script:
/etc/X11/Xsession.d/99chrome

Remember: chmod +x /etc/X11/Xsession.d/99chrome
```
export DISPLAY=:0

exec chromium-browser --app=https://aggr.trade/2j17 --window-size=500,700 --window-position=0,0 &
sleep 20
exec chromium-browser --app=https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73742/Norge/Oslo/Oslo/Grefsen%20stasjon --window-size=500,900 --window-position=0,0 &
sleep 20

# Get windows ids
btc_id=$(wmctrl -l | awk 'NR==2 {print $1}')
yr_id=$(wmctrl -l | awk 'NR==3 {print $1}')

# Move them by refrencing the class
xdotool windowmove "$yr_id" 0 1400
xdotool windowsize "$yr_id" 500 700
xdotool windowmove "$btc_id" 0 0

# Click on yr to get graph
sleep 10
xdotool mousemove 303 1528 click 1

```

## Settings
__Disable screensaver__

```
sudo raspi-config
```

Display options -> Screen blanking [Disable]

__Disable top menu__

Panel Settings

__Start chromium in fullscreen (kiosk mode)__


```sh
# Fullscreen
chromium-browser --app=https://nrk.no/nyheter --start-fullscreen

# Window size and position
xdotool search --onlyvisible --class chromium-browser windowmove 0 0
chromium-browser --app=https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73742/Norge/Oslo/Oslo/Grefsen%20stasjon --window-size=500,900 --window-position=0,0 &

xdotool search --onlyvisible --class chromium-browser windowmove 0 700
chromium-browser --app=https://aggr.trade/2j17 --window-size=500,700 --window-position=0,0 &

sleep 2
xdotool search --onlyvisible --class chromium-browser windowmove 0 0
xdotool search --onlyvisible --class chromium-browser windowmove 0 700

```

__Forward X windows display on ssh host__
ssh into host and:
```sh
# List displays
(cd /tmp/.X11-unix && for x in X*; do echo ":${x#X}"; done)

# Export display:
export DISPLAY=:0

# Start chromium-browser on host:
chromium-browser --app=https://nrk.no/nyheter
```
## Automating Windows
### Get windows
```sh
# List
wmctrl -l

# Save ids
yr_id=$(wmctrl -l | awk 'NR==2 {print $1}')
btc_id=$(wmctrl -l | awk 'NR==3 {print $1}')
```

### Get mouse position and automate clicks
```sh
watch -n 0.1 xdotool getmouselocation

xdotool mousemove 100 100 click 1
```

### Moved windows after they are started 
```sh
apt -y install xdotool wmctrl

# Open two windows
exec chromium-browser --app=https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-73742/Norge/Oslo/Oslo/Grefsen%20stasjon --window-size=500,900 --window-position=0,0 &
sleep 5
exec chromium-browser --app=https://aggr.trade/2j17 --window-size=500,700 --window-position=0,0 &
sleep 20

# Get windows ids
yr_id=$(wmctrl -l | awk 'NR==2 {print $1}')
btc_id=$(wmctrl -l | awk 'NR==3 {print $1}')

# Move them by refrencing the class
xdotool windowmove "$yr_id" 0 1400
xdotool windowsize "$yr_id" 500 700
xdotool windowmove "$btc_id" 0 0

# Click on yr to get graph
sleep 10
xdotool mousemove 303 1528 click 1

```
