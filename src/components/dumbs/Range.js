import React from 'react'
import styled from 'styled-components'
import Hammer from 'react-hammerjs'

const Root = styled.div`
  position: relative;
  box-shadow: 0px 2px 15px -5px rgba(0,0,0,0.6);
`;

const Background = styled(Hammer)`
  background: #fff;
  position: relative;
  cursor: arrow;
  flex: 1 1 auto;
  width: 36px;
  height: 100%;
  cursor: pointer;
`;

const Progress = styled.div`
  background: #000;
  position: absolute;
  bottom: 0;
  width: 36px;
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

  onPan(e) {
    const { max, min } = this.props.config;
    const acceleration = Math.max(0.1, Math.min(2, (e.deltaX + 100) / 100))

    let ratio = this.state.ratio
    ratio += (-e.velocityY) / 9 * acceleration
    ratio = Math.max(0, Math.min(1, ratio))

    const value = min + ratio * (max - min)

    this.setState({ value, ratio })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <Root className={this.props.className}>
        <Background direction={'DIRECTION_ALL'} onPan={e => this.onPan(e)}>
          <div>
            <Progress style={{ height: this.state.ratio * 100 + '%' }} />
            <Value>{this.state.value.toFixed()}</Value>
          </div>
        </Background>
      </Root>
    );
  }
}
