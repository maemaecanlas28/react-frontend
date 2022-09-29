import { useState, useEffect } from "react"
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

  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetch("/boards")
      .then(data => data.json())
      .then(data => {
        const dataCopy = JSON.stringify(data);
        const hack = [...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy)];
        hack[2].category = "Movies";
        hack[3].category = "Movies";
        hack[4].category = "Animals";
        hack[5].category = "Animals";
        setBoards(hack)
      })
  }, [])

  return (
    <div className='background-purple'>
      <Header />
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home boards={boards} />} />
          <Route path='/completed' element={<Completed />} />
          <Route path="/create" element={<Create />} />
          <Route path='/leaders' element={<Leaders />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

