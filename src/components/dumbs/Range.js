import React from 'react';
import styled from 'styled-components';
import Center from '@utils/Center';

const DRAG_RANGE = 200;

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    background: #fff;
    border: 1px solid #000;
    position: relative;
    cursor: arrow;
    flex: 1 1 auto;
    width: 30px;
`;

const Progress = styled.div`
    background: #000;
    position: absolute;
    bottom: 0;
    width: 30px;
    pointer-events: none;
`;

const Value = styled.div`
    color: #000;
    font-size: 12px;
`;

const Text = styled.div`
    color: #000;
`;


export default class Range extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            ratio: 0
        }

        this.dragFrom = {};
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
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
        
        let x = e.clientX;
        let y = e.clientY;
        let {max, min} = this.props.config;

        let ratio = this.state.ratio;
        ratio += (this.dragFrom.y - y) / DRAG_RANGE;
        ratio = Math.max(0, Math.min(1, ratio));

        let value = min + ratio * (max - min);

        this.dragFrom = { x, y };

        this.setState({ value, ratio });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <Root className={this.props.className}>
                <Text>{this.props.config.name}</Text>
                <Background onMouseDown={this.onMouseDown}>
                    <Progress style={{height: this.state.ratio * 100 + '%'}}/>
                </Background>
                <Value>{this.state.value.toFixed()}</Value>
            </Root>
        );
    }
}
