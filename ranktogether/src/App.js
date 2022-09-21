import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import AuthProvider from './Components/AuthProvider';
import RequireAuth from './Components/RequireAuth';
import Signup from './Components/Signup';
import Login from "./Components/Login"
import { Route, Routes } from "react-router-dom"
import Create from './Components/Create';
import Completed from "./Components/Completed";
import Leaders from './Components/Leaders';
import Profile from './Components/Profile';

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/completed' element={<Completed />} />
            <Route path="/create" element={<Create />} />
            <Route path='/leaders' element={<Leaders />} />
            <Route path='/profile' elemet={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

