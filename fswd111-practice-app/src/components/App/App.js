import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Dictionary from '../Dictionary/Dictionary';

function App() {
  return (
    <Router>
      <div className="App">
        <Link className='links' to='/'>
          HOME
        </Link>
        <Link className='links' to='/dictionary'>
          DICTIONARY
        </Link>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/dictionary' element={<Dictionary />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
