#### **`react-weather` is an epic weather animator.**

It can be used to display the _weather_ in a visual style.

At the moment, this project is a cool test of what is possible with the react-framework. I also wanted to push for good practices from day 1.
I wanted to start my react journey using an idea I had for quite some time. What if the weather could be displayed in a better way?

So, inspired by the amazing visual weather apps I had seen on android, I set the goal of creating my own.

#### **Design**

The idea was to have each weather feature on a seperate layer, each controlled and painted (to a HTML5 anvas) by discreete components.

Each weather layer recieves props about the current conditions, and creates an animation based on that.

This project taught me a bunch about the [lifecycle methods](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) of React components, which I use to work out if the component needed to generate new features to paint.

#### **Data Source**

Currently, weather data is hard coded as properties of each weather feature layer

The data should really be fed using a data source like [DarkSky](https://darksky.net/dev).

#### **Dependancies**

This project uses [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components) for styling that is directly linked to components. This makes styles more maintainable.

This project also uses [`react-resize-detector`](https://www.npmjs.com/package/react-resize-detector) to update the props of each layer, leading to a change in HTML5 Canvas dimensions.
