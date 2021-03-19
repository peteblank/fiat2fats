import './App.css';
import main from './main.js'
function App() {
  return (
    <div className="App">
      <header className="App-header">
       Wallet address<input type="text"></input>
       <button onClick={main}>
       Click me
     </button>
      </header>
    </div>
  );
}

export default App;
