import React from 'react';
import PropTypes from 'prop-types';
import './index.css';


class ReactCarouselDots extends React.Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    size: PropTypes.number,
    margin: PropTypes.number,
    visible: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
    dotStyle: PropTypes.object,
    activeStyle: PropTypes.object,
  }
  static defaultProps = {
    size: 16,
    margin: 1,
    visible: 5,
    className: '',
    onClick: null,
    dotStyle: null,
    activeStyle: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      direction: 'forwards',
      bigDots: this.getNewBigDots(props),
      changed: false,
      changeCount: 0,
      translate: 0,
    };
  }


  componentWillReceiveProps = (nextProps) => {
    let newBigDots = [];
    if (nextProps.active > this.props.active) { // Forwards
      if ((nextProps.length - 3) < nextProps.active) {
        this.setState({ translate: (nextProps.length - (nextProps.visible + 1)) * (nextProps.size + (2 * nextProps.margin)) });
      }
      if (this.state.direction === 'forwards') { // Dir doesnt change
        if (this.state.changed) { // If there was a recent change increment the counter
          if (this.state.changeCount >= nextProps.visible - 4 - (nextProps.visible % 2)) { // If we reached the limit, remove the changed
            newBigDots = this.getNewBigDots(nextProps, false);
            this.setState({
              bigDots: newBigDots, direction: 'forwards', changed: false, changeCount: 0,
            });
          } else { // Else increment the counter
            newBigDots = this.getNewBigDots(nextProps, true);
            this.setState({
              bigDots: newBigDots, direction: 'forwards', changed: true, changeCount: this.state.changeCount + 1,
            });
          }
        } else { // Simply set the direction and the transform
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ bigDots: newBigDots, translate: (nextProps.active - (nextProps.visible - 2)) * (nextProps.size + (2 * nextProps.margin)), direction: 'forwards' });
        }
      } else if (this.state.direction === 'backwards') { // Change happened in the direction
        if (nextProps.visible > 4) {
          newBigDots = this.getNewBigDots(nextProps, true);
          this.setState({
            bigDots: newBigDots, direction: 'forwards', changed: true, changeCount: this.state.changeCount + 1,
          });
        } else {
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ bigDots: newBigDots, direction: 'forwards' });
        }
      }
    } else if (nextProps.active < this.props.active) { // Backwards
      if ((nextProps.length - nextProps.visible) < nextProps.active) {
        this.setState({ bigDots: newBigDots, translate: (nextProps.length - (nextProps.visible + 1)) * (nextProps.size + (2 * nextProps.margin)) });
      }
      if (this.state.direction === 'backwards') { // Dir doesnt change
        if (this.state.changed) { // If there was a recent change increment the counter
          if (this.state.changeCount >= nextProps.visible - 4 - (nextProps.visible % 2)) { // If we reached the limit, remove the changed
            newBigDots = this.getNewBigDots(nextProps, false);
            this.setState({
              bigDots: newBigDots, direction: 'backwards', changed: false, changeCount: 0,
            });
          } else { // Else increment the counter
            newBigDots = this.getNewBigDots(nextProps, true);
            this.setState({
              bigDots: newBigDots, direction: 'backwards', changed: true, changeCount: this.state.changeCount + 1,
            });
          }
        } else { // Simply set the direction and the transform
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ bigDots: newBigDots, translate: (nextProps.active - 2) * (nextProps.size + (2 * nextProps.margin)), direction: 'backwards' });
        }
      } else if (this.state.direction === 'forwards') { // Change happened in the direction
        if (nextProps.visible > 4) {
          newBigDots = this.getNewBigDots(nextProps, true);
          this.setState({
            bigDots: newBigDots, direction: 'backwards', changed: true, changeCount: this.state.changeCount + 1,
          });
        } else {
          newBigDots = this.getNewBigDots(nextProps, false);
          this.setState({ direction: 'backwards', bigDots: newBigDots });
        }
      }
    }
  }

  getNewBigDots = (nextProps, changed) => {
    let newBigDots = [];
    if (nextProps.active >= this.props.active) {
      if (nextProps.visible % 2 === 1) {
        if (nextProps.active < (nextProps.visible - 2)) {
          for (let j = 0; j < nextProps.visible - 1; j += 1) {
            newBigDots.push(j);
          }
        } else if (nextProps.active === (nextProps.visible - 2)) {
          for (let j = 0; j < nextProps.visible; j += 1) {
            newBigDots.push(j);
          }
        } else if ((nextProps.length - 4) < nextProps.active) {
          for (let j = (nextProps.length - (nextProps.visible)); j < nextProps.length; j += 1) {
            newBigDots.push(j);
          }
        } else if (!changed) {
          for (let j = nextProps.active - ((nextProps.visible - 3)); j < nextProps.active + 2; j += 1) {
            newBigDots.push(j);
          }
        } else {
          newBigDots = this.state.bigDots;
        }
      } else if (nextProps.active < (nextProps.visible - 2)) {
        for (let j = 0; j < nextProps.visible - 1; j += 1) {
          newBigDots.push(j);
        }
      } else if (nextProps.active === (nextProps.visible - 2)) {
        for (let j = 0; j < nextProps.visible; j += 1) {
          newBigDots.push(j);
        }
      } else if ((nextProps.length - 4) < nextProps.active) {
        for (let j = (nextProps.length - (nextProps.visible)); j < nextProps.length; j += 1) {
          newBigDots.push(j);
        }
      } else if (!changed) {
        for (let j = nextProps.active - (nextProps.visible - 3); j < nextProps.active + 2; j += 1) {
          newBigDots.push(j);
        }
      } else {
        newBigDots = this.state.bigDots;
      }
    } else if (nextProps.visible % 2 === 1) {
      if (nextProps.active < (nextProps.visible - (nextProps.visible - 3))) {
        for (let j = 0; j < nextProps.visible - 1; j += 1) {
          newBigDots.push(j);
        }
      } else if ((nextProps.length - (nextProps.visible)) < nextProps.active) {
        for (let j = (nextProps.length - (nextProps.visible)); j < nextProps.length; j += 1) {
          newBigDots.push(j);
        }
      } else if (!changed) {
        for (let j = nextProps.active - 1; j < nextProps.active + ((nextProps.visible - 2)); j += 1) {
          newBigDots.push(j);
        }
      } else {
        newBigDots = this.state.bigDots;
      }
    } else if (nextProps.active < 3) {
      for (let j = 0; j < nextProps.visible - 1; j += 1) {
        newBigDots.push(j);
      }
    } else if ((nextProps.length - 4) < nextProps.active) {
      for (let j = (nextProps.length - (nextProps.visible)); j < nextProps.length; j += 1) {
        newBigDots.push(j);
      }
    } else if (!changed) {
      for (let j = nextProps.active - 1; j < nextProps.active + ((nextProps.visible - 2)); j += 1) {
        newBigDots.push(j);
      }
    } else {
      newBigDots = this.state.bigDots;
    }


    return newBigDots;
  }

  getDotStyle = () => {
    let style = {
      height: this.props.size,
      width: this.props.size,
      marginRight: this.props.margin,
      marginLeft: this.props.margin,
    };
    if (this.state.direction === 'forwards') {
      if (this.props.active < (this.props.visible - 2)) {
        style = {
          ...style,
        };
      } else if ((this.props.length - 3) < this.props.active) {
        style = {
          ...style,
          transform: `translateX(-${(this.props.length - (this.props.visible + 1)) * (this.props.size + (2 * this.props.margin))}px)`,
        };
      } else if (!this.state.changed) {
        style = {
          ...style,
          transform: `translateX(-${(this.props.active - (this.props.visible - 2)) * (this.props.size + (2 * this.props.margin))}px)`,
        };
      } else {
        style = {
          ...style,
          transform: `translateX(-${this.state.translate}px)`,
        };
      }
    } else if (this.props.active < (2)) {
      style = {
        ...style,
      };
    } else if ((this.props.length - this.props.visible) < this.props.active) {
      style = {
        ...style,
        transform: `translateX(-${(this.props.length - (this.props.visible + 1)) * (this.props.size + (2 * this.props.margin))}px)`,
      };
    } else if (!this.state.changed) {
      style = {
        ...style,
        transform: `translateX(-${(this.props.active - 2) * (this.props.size + (2 * this.props.margin))}px)`,
      };
    } else {
      style = {
        ...style,
        transform: `translateX(-${this.state.translate}px)`,
      };
    }
    return style;
  }

  getHolderStyle = () => {
    let style = {
      height: this.props.size,
    };
    if (this.state.direction === 'forwards') {
      if (this.props.active < (this.props.visible - 2)) {
        style = {
          ...style,
          width: (this.props.size * (this.props.visible)) + ((this.props.visible) * this.props.margin * 2),
        };
      } else {
        style = {
          ...style,
          width: (this.props.size * (this.props.visible + 1)) + ((this.props.visible + 1) * this.props.margin * 2),
        };
      }
    } else if (this.props.active < (3)) {
      style = {
        ...style,
        width: (this.props.size * (this.props.visible)) + ((this.props.visible) * this.props.margin * 2),
      };
    } else {
      style = {
        ...style,
        width: (this.props.size * (this.props.visible + 1)) + ((this.props.visible + 1) * this.props.margin * 2),
      };
    }

    return style;
  }

  getDotClassName = (index) => {
    if (this.state.bigDots.includes(index)) {
      return '';
    }
    return 'small';
  }

  getDots = () => {
    const dots = [];
    for (let i = 0; i < this.props.length; i += 1) {
      dots.push((
        <div
          key={i}
          style={this.getDotStyle()}
          className="dot-holder"
          onClick={() => this.props.onClick(i)}
          className="dot-holder"
          onKeyPress={() => this.props.onClick(i)}
          tabIndex={0}
        >
          <div
            key={`${i}-inner`}
            className={`react-carousel-dots-dot
                      ${this.getDotClassName(i)}
                      ${this.props.active === i ? 'active' : ''}`}
            style={{
              ...this.props.dotStyle,
              ...(this.props.active === i && {
                ...this.props.activeStyle
              }),
            }}
          />
        </div>
      ));
    }
    return dots;
  }

  render() {
    return (
      <div style={this.getHolderStyle()} className={`react-carousel-dots-holder ${this.props.className}`}>
        {this.getDots()}
      </div>
    );
  }
}
export default ReactCarouselDots;
