import React from 'react'
import { render } from 'react-dom'
import ViewControl from './ViewControl'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'


/*
   This is where the theme gets applied to the application.We can use
   a different theme, but the default looks nice for now.

   Documentation for changing it is here.
   http://www.material-ui.com/#/customization/themes
*/

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <ViewControl baseUrl={'/'} />
  </MuiThemeProvider>
);

render((<App />), document.getElementById('app'))
