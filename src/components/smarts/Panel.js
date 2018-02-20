import React from 'react';
import styled from 'styled-components';
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Core from '@utils/Core';

const StyledMenu = styled(Menu) `
    height: 200px;
    margin-right: 16px;
`;

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

    onChange(name, value) {
    }

    render() {
        const { id, effect } = this.props;

        const controls = Core.getControls(effect).map((item, index) => {
            switch(item.type){
                case 'range':
                    return <StyledRange
                        key={index}
                        config={item}
                        onChange={value => this.onChange(item.name, value)}
                    />;
                case 'menu':
                    return <StyledMenu
                        key={index}
                        config={item}
                        onSelect={(choice, index) => this.onChange(item.name, choice.key)}
                    />;
            }
        });

        return (
            <Root className={this.props.className}>
                {controls}
                {id}
                {effect}
            </Root>
        );
    }
}