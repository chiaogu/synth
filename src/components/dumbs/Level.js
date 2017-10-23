import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background: #fff;
    border: 1px solid #000;
    position: relative;
    pointer: arrow;
`;

const Progress = styled.div`
    background: #000;
    position: absolute;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    height: ${props => (props.progress * 100) + '%'};
`;


export default class Level extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
            value: 0
        }
    }

    onMouseDown(e) {
        this.setState({ dragging: true });
    }

    onMouseUp(e) {
        this.setState({ dragging: false });
    }

    onMouseOut(e) {
        this.setState({ dragging: false });
    }

    onMouseMove(e) {
        if (!this.state.dragging) return;

        const rect = e.target.getBoundingClientRect();
        let x = (e.clientX - rect.x) / rect.width;
        let y = (e.clientY - rect.y) / rect.height;

        let value = 1 - y;

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <Background
                className={this.props.className}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                onMouseOut={this.onMouseOut.bind(this)}
            >
                <Progress progress={this.state.value} />
            </Background>
        );
    }
}
