# eureka-rn-components
A Libary of React Native Components


This library uses the [react-native-elements](https://github.com/react-native-community/react-native-elements/blob/master/Readme.MD) library. All these components can be used.


#### Installation

`npm i  https://github.com/EurekaLabs-Dev/eureka-rn-components --save`

Install react-native-vector-icons (if you do not already have it)

`npm i react-native-vector-icons --save && react-native link react-native-vector-icons`

*If you have any issues with icons not working or installation of React Native Vector Icons, check out their installation guide [here](https://github.com/oblador/react-native-vector-icons#installation)*

## Included
- [x] Avatar
- [ ] AvatarToggle
- [ ] ButtonSecond
- [ ] Circle
- [ ] ConnectionMessage
- [ ] Countdown
- [ ] DiaItem
- [ ] Form-Input
- [ ] Form
- [ ] HeaderBar
- [ ] LineCircle
- [ ] ListItem
- [ ] ListViewFull
- [ ] Login
- [ ] MonthLinePicker
- [ ] Separator
- [x] Timeline

# API


## Avatar
Take an image and description to show a circulated image with the description.

![Avatar](http://i.imgur.com/QGy9aqK.png)

```js
import { Avatar } from 'eureka-rn-components';
<Avatar
    image={{uri: 'http://natashavanzetti.com/wp-content/uploads/2015/08/Ther-1-person-thumbnail.png'}}
    size={60}
    description='Joana'
    />
```

#### Avatar PropTypes

| prop | default | type | description |
| ---- | ---- | ----| ---- |
| image | none | any (required)| A source from an image, the same for the Image component. |
| size | 40 | number | The size is the width and height of the Image Circle. |
| description | none | any | Can be a text or Component. This shows under the image. |
| style | none | object | This style is applied in the container. |

## Timeline
Take a array of items and show that in a simple timeline(circles over a line).

![Timeline](http://i.imgur.com/eEJGGIv.png)

The items in the array must be in this format:
```js
  {
    title: string,
    startDate: datetime,
    endDate: datetime,
    status: string (optional)
  }
```


```js
  import { Timeline } from 'eureka-rn-components';

  const itens = [{
    title: 'Jogo de Futebol',
    startDate: Date.now() + 200 * 3600 * 1000,
    end: Date.now(),
    status: 'Vai iniciar'
  }, {
    title: 'Acampamento',
    startDate: Date.now(),
    end: Date.now(),
    status: 'Em Andamento'
  }, {
    title: 'Jogo de boliche',
    startDate: Date.now() - 125 * 3600 * 1000,
    end: Date.now(),
    status: 'Em Andamento'
  }];

  <View style={{flex: 1, paddingTop: 20}}>
    <Timeline
      currentDayColor='orange'          
      itens={itens}/>
  </View>
```

#### Timeline PropTypes

| prop | default | type | description |
| ---- | ---- | ----| ---- |
| itens | none | array (required) | Items that will be shown in timeline.|
| currentDayColor | grey | string | Circle's background color of the day that matches the current date. |
| currentDayTextColor | white | string | Text's background color of the day that matches the current date. |
| lineColor | #c4c4c4 | string | Color of the line between the circles and circle's border. |
