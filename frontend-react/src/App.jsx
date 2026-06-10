import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {

  return (
    <Router>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your fitness exercises and progress</p>
      </header>

      <nav>
        <Link to="/">Exercises </Link>
        <Link to="/add-exercise">Add Exercise</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/add-exercise" element={<AddExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage />}></Route>
        </Routes>
      </main>

      <footer>
        <p>&copy; 2026 Lauren Bell. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;