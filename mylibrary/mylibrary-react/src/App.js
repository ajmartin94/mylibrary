import './App.css';
import axios from 'axios';
import {useState} from 'react';

function App() {
  const [data,setData] = useState(null)

  const handleClick = () => {
    axios.get('http://localhost:8000/library/select/OL27448W')
    .then(resp => {
      setData(resp.data)
    })
  }

  return (
    <div className="App">
      <h1>Yooo</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default App;
