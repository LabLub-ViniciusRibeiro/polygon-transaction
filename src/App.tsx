import './App.css';
import History from './components/History';
import Intro from './components/Intro';
import { Transfer } from './components/Transfer';

function App() {
  return (
    <div className="App">
      <Intro />
      <Transfer />
      <History />
    </div>
  );
}

export default App;
