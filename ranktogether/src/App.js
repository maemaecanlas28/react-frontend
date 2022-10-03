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
import Leaders from './Components/Leaders';
import Profile from './Components/Profile';
import OneBoardOptions from "./Components/OneBoardOptions";


function App() {

  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetch("/boards")
      .then(data => data.json())
      .then(data => {
        const dataCopy = JSON.stringify(data);
        // const hack = [...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy), ...JSON.parse(dataCopy)];
        // hack[2].category = "Movies";
        // hack[3].category = "Movies";
        // hack[4].category = "Animals";
        // hack[5].category = "Animals";
        setBoards(data)
      })
  }, [])

  return (
    <div className='background-purple'>
      <Header />
      <AuthProvider>
        <NavBar />
        <div className="app-content">
          <Routes>
            <Route path='/' element={<Home boards={boards} page="home" />} />
            <Route path='/completed' element={<Home boards={boards} page="completed"/>} />
            <Route path="/create" element={<Create />} />
            <Route path='/leaders' element={<Leaders />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path="/board/:id" element={<OneBoardOptions />} />
            <Route path='/login' element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;

