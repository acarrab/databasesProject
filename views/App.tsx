import React from 'react'
import { render } from 'react-dom'
import ViewControl from './ViewControl'



const App = () => (
  <ViewControl baseUrl={'/'} />
);

render((<App />), document.getElementById('app'))
