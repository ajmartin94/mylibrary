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
import Cookies from 'js-cookie';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {

  const [data,setData] = useState(null)
  const [searchData,setSearchData] = useState(null)
  const [libraryData,setLibraryData] = useState(null)
  const [currentUser,setCurrentUser] = useState(null)
  const [loginError,setLoginError] = useState(null)
  const [validUser,setValidUser] = useState(false)

  const history = useHistory();

  // useEffect(()=>{
  //   setLoginError(null)
  //   updateLibraryData()
  // },[currentUser])

  useEffect(()=> {
    const userData = {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('jwtoken')
    }
    
    axios.get('http://localhost:8000/api/tokencheck',{
      headers: {
        Authentication: 'Bearer '+userData.token
      }
    })
    .then(resp => {
      setCurrentUser(userData)
      setValidUser(true)
    })
    .catch(err => {
      console.log(err)
    })
    
  }, [validUser])

  const updateLibraryData = () => {
    if (currentUser) {
      axios({
        method: 'post',
        url: `http://localhost:8000/library/data`,
        data: {
          username: currentUser.username
        }
      })
      .then(resp => {
        setLibraryData(resp.data);
        console.log('setting library data')
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
      console.log(resp)
      setCurrentUser({
        username:userData.username,
        token:resp.data.access
      })
      localStorage.setItem('username',userData.username)
      localStorage.setItem('jwtoken',resp.data.access)
      history.goBack();
    })
    .catch(err => {
      setLoginError('Invalid username or password')
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleSignUp = async (userData) => {
    await axios({
      method: 'post',
      url:`http://localhost:8000/library/adduser`,
      data: userData,
    })
    .then(resp => {
      setCurrentUser(resp.data)
      setLoginError(null)
      history.go(-2);
    })
    .catch(err => alert(err))
  }

  const handleAddToLibrary = (key) => {
    const identifier = key.replace('/works/','');
    axios({
      method: 'post',
      url: `http://localhost:8000/library/select`,
      data: {
        key: identifier,
        libraryid: 3
      }
    })
    .then(resp => {
        updateLibraryData()
        history.push('/')
    })
  }

  return (
    <div>
      <Header user={currentUser} handleLogout={handleLogout}/>
      <Main>
        <Switch>
          <Route path='/results'>
            <SearchResults 
              searchData={searchData}
              handleAddToLibrary={handleAddToLibrary} 
            />
          </Route>
          <Route path='/library'>
            <SearchForm 
              setSearchData={setSearchData}  
            />
            <Library 
              libraryData={libraryData} 
            />
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
