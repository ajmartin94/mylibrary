import './App.css';
import {useState} from 'react';
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

  const history = useHistory();

  const updateLibraryData = () => {
    
  }

  const handleLogin = (userData) => {
    axios({
      method:'post',
      url:`http://localhost:8000/library/authuser`,
      data: userData
    })
    .then(resp => {
      setCurrentUser(resp.data)
      setLoginError(null)
      history.goBack();
    })
    .catch(err => {
      setLoginError('Invalid username or password')
    })
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

  return (
    <div>
      <Header />
      <Main>
        <Switch>
          <Route path='/results'>
            <SearchResults searchData={searchData} />
          </Route>
          <Route path='/library'>
            <SearchForm 
              setSearchData={setSearchData}  
            />
            <Library libraryData={libraryData} />
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
