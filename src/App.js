import './App.css';
import './pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import FormValidation from './pages/FormValidation';
import EditEmployee from './EditEmployee';
import Navbar from './Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/view' element={<Home/>}></Route>
          <Route path='/' element={<FormValidation/>}></Route>
          <Route path='/edit/:id' element={<EditEmployee/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
