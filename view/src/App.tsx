import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import ViewControl from './ViewControl'




const App = () => (
  <div style={{ width: '100%' }} >
    <Router ref='router' basename='/'>
      <ViewControl />
    </Router>
  </div>
);

render((<App />), document.getElementById('app'))
