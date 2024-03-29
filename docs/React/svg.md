# SVG in React
* https://css-tricks.com/change-color-of-svg-on-hover/
* https://react.christmas/2018/18

## Static
The easiest way.

```
const App = () => <img src="/path/image.svg" alt="" />;
```

## React and D3 Versions
Using ***viewBox*** to set aspect ratio.
<iframe src="https://stackblitz.com/edit/react-m9jc7i?embed=1&file=src/App.js&hideDevTools=1&theme=light&view=preview"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"></iframe>

## Static w/ url-loader
Transforms an image into a Data URL.

```js
rules: [
    {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
        ],
    },
];

import image from 'path/image.svg';
const App = () => <img src={image} alt="" />;
```


## Interactive SVGs w/ react-svg-loader
To have full control of your SVGs from within your app, and how they respond to different interactions, inlining them is the way to go.
In theory, you don't necessarily need a loader for this, you could just copy the SVG code directly into a component.
There are a few reasons why this might not be the best way to go though. Say you were to change some part of the SVG through a visual editor,
such as Sketch or Adobe Illustrator. Wouldn't it be decidedly easier to just switch the SVG file. In order to avoid this, you can use react-svg-loader.

```js
rules: [
    {
        test: /\.inline.svg$/,
        loader: 'react-svg-loader',
    },
];

import Image from 'path/image.svg';
const App = () => <Image width={50} height={50} />;
```

## Change Colors
<iframe src="https://codesandbox.io/embed/react-using-svg-br42s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-using-svg"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
