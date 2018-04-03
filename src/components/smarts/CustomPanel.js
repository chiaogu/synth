import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import { noteToFrequency } from '@utils/converter'

const Root = styled.div`
  background: #fff;
  overflow: hidden;
`

const Grid = styled.div`
  margin: 16px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, 64px);
  justify-content: center;
`

const Pad = styled(Button)`
  width: 64px;
  height: 64px;
`

const NOTES = [
  'C3', 'D3', 'E3', 'F3',
  'G3', 'A3', 'B3', 'C4',
  'D4', 'E4', 'F4', 'G4',
  'A4', 'B4', 'C5', 'D5',
  'E5', 'F5', 'G5', 'A5',
  'B5', 'C6', 'D6', 'E6'
]

export class CustomPanel extends React.Component {

  onChange(freq, pressed) {
    const { setParameter } = this.props
    if(pressed){
      setParameter(0, 'frequency.value', freq)
    }
    setParameter(1, 'trigger', pressed)
  }

  render() {
    return (
      <Root className={this.props.className}>
        <Grid>
          {NOTES
            .map(note => ({note, freq: noteToFrequency(note)}))
            .map(({note, freq}, index) => (
              <Pad
                key={index}
                config={{ defaultValue: false }}
                onToggle={pressed => this.onChange(freq, pressed)}
              />
          ))}
        </Grid>
      </Root>
    )
  }
}

import { connect } from 'react-redux'
import { setParameter } from '@flow/modules/actions'

export default connect(
  state => ({}),
  dispatch => ({
    setParameter(moduleIndex, controlName, value) {
      dispatch(setParameter(moduleIndex, controlName, value))
    }
  })
)(CustomPanel)