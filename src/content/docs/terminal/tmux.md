# tmux

## Command prefix
```
Ctrl + b
```
```Ctrl + b``` is the default prefix for tmux commands, press these keys together. After releasing ```Ctrl + b```, press the command key you want.

## Commands
```

"           -   Splitt window
↑           -   Move up
↓           -   Move down

# Not working on mac
Ctrl + ↑    -   Resize up
Ctrl + ↓    -   Resize down
Ctrl + ←    -   Resize left
Ctrl + →    -   Resize right
```

## Custom Key Bindings
Edit ```~/.tmux.conf```.

### Resize pane using Option + Arrow keys
```
bind -n M-Down resize-pane -D 5
bind -n M-Up resize-pane -U 5
bind -n M-Left resize-pane -L 5
bind -n M-Right resize-pane -R 5
```
