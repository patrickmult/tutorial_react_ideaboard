import React from 'react';
import './App.css';
import IdeasContainer from './components/ideas/IdeasContainer'

function App(props) {
  return(
      <div className="App">
        <div className="App-header">
          <h1>Idea Board</h1>
        </div>
        <IdeasContainer />
      </div>
  );
}

export default App;
