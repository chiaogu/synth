import React from 'react'
import styled from 'styled-components'
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
`

const StyledPanel = styled(Panel) `
  height: 100%;
  width: 100%;
`

const Module = styled.div`
  margin: 8px;
  transition: width .5s, height .5s;
  ${({isEditing}) => isEditing ? `
    width: 100px;
    height: 100px;
  ` : `
    width: calc(100% - 16px);
    height: 250px;
  `}
`

class Preset extends React.Component {
  componentDidMount() {
    this.loadModules(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const modulesChanged = this.props.modules.length !== nextProps.modules.length
    const isEditedChanged = this.state.edited !== nextState.edited
    return modulesChanged || isEditedChanged
  }

  componentWillReceiveProps(nextProps) {
    const presetChanged = this.props.preset.id !== nextProps.preset.id
    if(!presetChanged) return
    this.loadModules(nextProps)
  }

  loadModules(props) {
    const { loadModules, preset } = props
    loadModules(preset)
  }

  constructor(props) {
    super(props)
    this.state = { edited: false }
  }

  render() {
    const {
      preset = {},
      modules,
      loadPreset,
      loadModules
    } = this.props

    const panels = modules.map((module, index) => {
      return (
        <Module
          key={index}
          isEditing={this.state.edited}
          >
          <StyledPanel
            index={index}
            style={{ width: '0' }}
            module={module}/>
        </Module>
      )
    })

    return (
      <Root>
        <button onClick={e => this.setState({edited: !this.state.edited})}>
          {preset.id}{preset.name}{this.state.edited ? 'true':'false'}
        </button>
        {panels}
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModulesActions from '@state/modules/actions'
import * as Config from '@utils/Config'

export default connect(
  state => ({
    modules: state.modules.modules
  }),
  dispatch => {
    const {
      loadModules,
      loadModulesSuccess
    } = bindActionCreators(ModulesActions, dispatch)

    return {
      loadModules(preset) {
        loadModules(preset.id)
        const ids = preset.modules.map(module => module.id)
        Config.getModules(ids)
          .then(modules => modules.map((module, index) => ({
            params: preset.modules[index].params,
            config: module
          })))
          .then(modules => {
            loadModulesSuccess(modules)
          })
      }
    }
  }
)(Preset)