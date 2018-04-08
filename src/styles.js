import { injectGlobal } from 'styled-components'
import NovaRound from '@assets/fonts/NovaRound.ttf'
import UbuntuRegular from '@assets/fonts/UbuntuRegular.ttf'

injectGlobal`
  @font-face {
    font-family: 'Regular';
    src: url(${NovaRound});
  }

  body {
    position: absolute;
    width: 100vw;
    height: 100vh;
    margin: 0;
    background: #eee;
    font-family: 'Regular';
  }

  #app {
    height: 100%;
  }
`