import './App.css';
import MenuExampleInvertedSegment from './Components/MenuBar';
import Routing from './Routing/Routing';

function App() {
  return (
    <div style={{ backgroundColor: 'black', height: '100vh', flex: 1, overflowY: 'auto'}}>
      <MenuExampleInvertedSegment/>
      <Routing/>
    </div>
  );
}

export default App;
