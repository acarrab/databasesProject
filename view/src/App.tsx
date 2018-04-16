import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import Control from './Control'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'


const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={{ width: '100%' }} >
            <Router basename='/~acarrab/'>
                <Control />
            </Router>
        </div>
    </MuiThemeProvider>
);

render((<App />), document.getElementById('app'))
