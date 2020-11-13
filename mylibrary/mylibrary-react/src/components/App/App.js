import './App.css';
import {useEffect, useState} from 'react';
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'
import SearchForm from '../Main/SearchForm'
import SearchResults from '../Main/SearchResults'
import Login from '../Main/Login'
import SignUp from '../Main/Signup'
import Library from '../Main/Library'
import styled from 'styled-components';
import {Switch,Route,useHistory} from 'react-router-dom';
import axios from 'axios';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const [libraryData,setLibraryData] = useState(null)
  const [currentUser,setCurrentUser] = useState(null)
  const [loginError,setLoginError] = useState(null)
  const [validUser,setValidUser] = useState(false)
  const [activeLibraryID,setActiveLibraryID] = useState(null)

  const history = useHistory();

  useEffect(()=>{
    setLoginError(null)
    updateLibraryData()
  },[currentUser])

  useEffect(()=> {
    const userData = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    }
    console.log(userData)
    if (userData.username) {
      handleLogin(userData)
      history.push('/')
    }
  }, [validUser])

  const updateLibraryData = () => {
    if (currentUser) {
      axios.get('http://localhost:8000/api/library',{
        headers: {
          Authorization: 'Bearer '+currentUser.token
        }
      })
      .then(resp => {
        setLibraryData(resp.data);
      })
    }
  }

  const handleLogin = (userData) => {
    axios({
      method:'post',
      url:`http://localhost:8000/api/token/`,
      data: userData
    })
    .then(resp => {
      setCurrentUser({
        username:userData.username,
        token:resp.data.access
      })
      localStorage.setItem('username',userData.username)
      localStorage.setItem('password',userData.password)
      setLoginError(null)
      history.goBack();
    })
    .catch(err => {
      setLoginError('Invalid username or password')
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    setLibraryData(null)
  }

  const handleSignUp = (userData) => {
    console.log(userData)
    axios({
      method: 'POST',
      url:`http://localhost:8000/api/users/`,
      data: userData,
    })
    .then(resp => {
      console.log(resp)
      setCurrentUser(resp.data)
      setLoginError(null)
      history.go(-2);
    })
    .catch(err => alert(err))
  }

  const handleAddToLibrary = (key) => {
    const identifier = key.replace('/works/','');
    axios({
      method: 'POST',
      url: `http://localhost:8000/api/books/`,
      data: {
        key: identifier,
        libraryid: activeLibraryID
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
        updateLibraryData()
        history.go(-1)
    })
  }

  const handleAddNewLibrary = (name) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/library/',
      data: {
          name: name
      },
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp => {
      updateLibraryData()
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  const handleDeleteLibrary = (id) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:8000/api/library/${id}`,
      headers: {
        Authorization: 'Bearer '+currentUser.token
      }
    })
    .then(resp=>{
      updateLibraryData()
    })
  }

  return (
    <div>
      <Header user={currentUser} handleLogout={handleLogout} />
      <Main>
        <Switch>
          <Route path='/'>
            {libraryData &&
              <Library 
                libraryData={libraryData} 
                activeLibraryID={activeLibraryID}
                setActiveLibraryID={setActiveLibraryID}
                handleAddNewLibrary={handleAddNewLibrary}
                handleDeleteLibrary={handleDeleteLibrary}
                handleAddToLibrary={handleAddToLibrary} 
              />
            } 
          </Route>
          <Route path='/signup'>
            <SignUp handleSignUp={handleSignUp} />
          </Route>
          <Route path='/login'>
            <Login handleLogin={handleLogin} loginError={loginError}/>
          </Route>
        </Switch>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
