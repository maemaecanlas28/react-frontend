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
import { Message } from "semantic-ui-react"
import { ErrorContext } from "./Context/ErrorContext"


function App() {

  const [boards, setBoards] = useState([])
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorList, setErrorList] = useState([])

  useEffect(() => {
    fetch("/api/boards")
      .then(data => data.json())
      .then(data => {
        const dataCopy = JSON.stringify(data);
        setBoards(data)
      })
  }, [])

  function handleShowError () {
    setIsErrorShown(true)
    setTimeout(() => {
      setIsErrorShown(false)
    }, 5000)
  }

  return (
    <div className='background-purple'>
      <Header />
      <AuthProvider>
        <NavBar />
        <ErrorContext.Provider
          value={{ isErrorShown, errorList, handleShowError, setErrorList }}>
          {isErrorShown ? (<div
            className="error-message-container">
            <Message
              className="error-message"
              error
              header='There was some errors with your submission'
              list={errorList} />
          </div>) : null}
          <div className="app-content">
            <Routes>
              <Route path='/' element={<Home boards={boards} page="home" />} />
              <Route path='/completed' element={<Home boards={boards} page="completed" />} />
              <Route
                path="/create"
                element={
                  <RequireAuth>
                    <Create />
                  </RequireAuth>} />
              <Route path='/leaders' element={<Leaders />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path="/board/:id" element={<OneBoardOptions />} />
              <Route path='/login' element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </ErrorContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;

