import React from 'react';
import styled from 'styled-components';
import Range from '@components/dumbs/Range'
import Tone from 'tone';

const StyledRange = styled(Range) `
    height: 200px;
    margin-right: 16px;
`;

const Root = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 8px;
    background: #fff;
`;

export default class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    onRangeChange(name, value) {
        if (this.props.onChange) {
            this.props.onChange({ name, value });
        }
    }

    render() {
        let controls = (this.props.controls || []).map((item, index) => {
            return (
                <StyledRange
                    key={index}
                    config={item}
                    onChange={value => this.onRangeChange(item.name, value)}
                />
            );
        });

        return (
            <Root className={this.props.className}>
                {controls}
            </Root>
        );
    }
}