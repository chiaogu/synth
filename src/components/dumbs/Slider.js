import React from 'react'
import styled from 'styled-components'
import Hammer from 'react-hammerjs'

const DAFAULT_DRAG_RANGE = 60

const Root = styled.div`
  position: relative;
  box-shadow: 0px 2px 15px -5px rgba(0,0,0,0.6);
`;

const Background = styled(Hammer) `
  background: #fff;
  position: relative;
  cursor: arrow;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Progress = styled.div`
  background: #000;
  position: absolute;
  bottom: 0;
  width: 100%;
  pointer-events: none;
`;

const Value = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 12px;
  mix-blend-mode: difference;
`;


export default class Slider extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: 0, ratio: 0 };
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  mapPropsToState(props) {
    let { value, config } = props
    const { max, min } = config
    if (value !== undefined) {
      const ratio = (value - min) / (max - min)
      this.setState({ value, ratio })
    }
  }

  onPanStart(event) {
    const { deltaX, deltaY } = event
    this.previous = { x: deltaX, y: deltaY }
  }

  onPan(event) {
    const { max, min } = this.props.config

    const { deltaX, deltaY } = event
    const velocityY = deltaY - this.previous.y
    this.previous = { x: deltaX, y: deltaY }

    const xRange = window.innerWidth / 2
    const acceleration = 1 - Math.min(Math.abs(deltaX / xRange), 0.99)
    const deltaRatio = - (velocityY / DAFAULT_DRAG_RANGE * acceleration)

    let ratio = this.state.ratio + deltaRatio
    ratio = Math.max(0, Math.min(1, ratio))
    const value = min + ratio * (max - min)

    this.setState({ value, ratio })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const { style, className } = this.props
    const { ratio, value } = this.state

    return (
      <Root className={className} style={style} >
        <Background
          direction={'DIRECTION_ALL'}
          onPan={e => this.onPan(e)}
          onPanStart={e => this.onPanStart(e)}
        >
          <div>
            <Progress style={{ height: ratio * 100 + '%' }} />
            <Value>{value.toFixed()}</Value>
          </div>
        </Background>
      </Root>
    );
  }
}
