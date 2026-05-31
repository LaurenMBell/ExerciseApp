import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/add-exercise" element={ <AddExercisePage />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;