import React from 'react';
import styled from 'styled-components';

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
    height: ${props => (props.progress * 100) + '%'};
`;

const Value = styled.div`
    color: #000;
    font-size: 12px;
`;

const Text = styled.div`
    color: #000;
`;


export default class Level extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
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

        let value = this.state.value;
        value += (this.dragFrom.y - y) / DRAG_RANGE;
        value = Math.max(0, Math.min(1, value));
        this.dragFrom = { x, y };

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <Root className={this.props.className}>
                <Text>{this.props.name}</Text>
                <Background onMouseDown={this.onMouseDown}>
                    <Progress progress={this.state.value} />
                </Background>
                <Value>{(this.state.value * 100).toFixed()}%</Value>
            </Root>
        );
    }
}
