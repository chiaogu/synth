import { injectGlobal } from 'styled-components'
import NovaRound from '@assets/fonts/NovaRound.ttf'
import UbuntuRegular from '@assets/fonts/UbuntuRegular.ttf'

injectGlobal`
  @font-face {
    font-family: 'Regular';
    src: url(${NovaRound});
  }
`