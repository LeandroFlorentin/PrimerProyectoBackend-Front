import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList.js'
import TaskForm from './components/TaskForm.js'
import Navbar from './components/Navbar';
import { Container } from '@mui/material'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path='/' element={<TaskList />} />
          <Route exact path='/tasks/new' element={<TaskForm />} />
          <Route exact path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
