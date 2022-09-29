import { useState, useEffect, useContext } from "react"
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
import { AuthContext } from "./Context/AuthContext";

function App() {

  const [boards, setBoards] = useState([])
  const auth = useContext(AuthContext);

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

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => auth.signin(user));
        }
      });
    }, []);

  return (
    <div className='background-purple'>
      <Header />
      <NavBar />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home boards={boards} />} />
          <Route path='/completed' element={<Completed />} />
          <Route path="/create" element={<Create />} />
          <Route path='/leaders' element={<Leaders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/users/:id' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

