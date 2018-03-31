import React from 'react';
import styled from 'styled-components';

const DRAG_RANGE = 200;

const Root = styled.div`
  position: relative;
  box-shadow: 0px 2px 15px -5px rgba(0,0,0,0.6);
`;

const Background = styled.div`
  background: #fff;
  position: relative;
  cursor: arrow;
  flex: 1 1 auto;
  width: 30px;
  height: 100%;
`;

const Progress = styled.div`
  background: #000;
  position: absolute;
  bottom: 0;
  width: 30px;
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

export default class Range extends React.Component {

  constructor(props) {
    super(props);

    this.dragFrom = {};
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.state = { value: 0, ratio: 0 };
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  mapPropsToState(props) {
    const { value = 0, config } = props;
    const { max, min } = config;
    const ratio = (value - min) / (max - min);
    this.setState({ value, ratio });
  }

  onMouseDown(e) {
    this.dragFrom = {
      x: e.clientX,
      y: e.clientY
    };

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp(e) {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  onMouseMove(e) {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;
    const { max, min } = this.props.config;

    let ratio = this.state.ratio;
    ratio += (this.dragFrom.y - y) / DRAG_RANGE;
    ratio = Math.max(0, Math.min(1, ratio));

    const value = min + ratio * (max - min);

    this.dragFrom = { x, y };

    this.setState({ value, ratio });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <Root className={this.props.className}>
        <Background onMouseDown={this.onMouseDown}>
          <Progress style={{ height: this.state.ratio * 100 + '%' }} />
          <Value>{this.state.value.toFixed()}</Value>
        </Background>
      </Root>
    );
  }
}
