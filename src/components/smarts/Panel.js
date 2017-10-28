import React from 'react';
import styled from 'styled-components';
import Level from '@components/dumbs/Level'
import Tone from 'tone';

const StyledLevel = styled(Level) `
    height: 200px;
    margin-right: 16px;
`;

const Root = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 8px;
`;

export default class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    onLevelChange(name, value) {
        if (this.props.onChange) {
            this.props.onChange({ name, value });
        }
    }

    render() {
        let controls = (this.props.controls || []).map((item, index) => {
            return (
                <StyledLevel
                    key={index}
                    name={item.name}
                    onChange={value => this.onLevelChange(item.name, value)}
                />
            );
        });

        return (
            <Root>
                {controls}
            </Root>
        );
    }
}