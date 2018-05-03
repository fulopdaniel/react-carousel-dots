This component provides a pagination method with dots for any amount of images/slides.

![Demo](https://i.imgur.com/TVIRA8z.gif)

# Quickstart

    npm install --save react-carousel-dots
The minimum amount of code to make it work:

    import Dots from 'react-carousel-dots';
    
    <Dots length={10} active={0} />

# Props

| Name | Default value | Description |
|--|--|--|
| length | - | Required. The amount of dots you want to use. |
| active | - | Required. The index of the currently active dot. |
| visible | 5 | Optional. The amount of dots visible on mount. |
| size | 16 | Optional. The width and height of a dot. |
| margin | 1 | Optional. The right- and left-margin of a dot. |
| className | - | Optional. This class will be added to the holder div. |



