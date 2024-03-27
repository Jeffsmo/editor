
import {EditorBox} from '../editor/editorbox';

import "./styles.css"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1 className='App-title'>EDITOR</h1>

          <div className="Editor-box">
            <EditorBox />
          </div>
          <div>
            <button id='save-button' className='Save-button'>GUARDAR</button>
          </div>

          <pre className='Output' id='output'>

          </pre>

      </header>
    </div>
  );
}

export default App;
