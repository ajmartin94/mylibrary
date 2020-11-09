import './App.css';
import {useState} from 'react';
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'
import SearchForm from '../Main/SearchForm'
import SearchResults from '../Main/SearchResults'
import Login from '../Main/Login'
import SignUp from '../Main/Signup'
import styled from 'styled-components';
import {Switch,Route} from 'react-router-dom';
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

  const updateLibraryData = () => {
    
  }

  const handleSignUp = async (userData) => {
    let csrftoken;
    await axios.get('http://localhost:8000/library/gettoken')
    .then(token => {
      csrftoken = token.data
    })
    
    await axios({
      method: 'post',
      url:`http://localhost:8000/library/adduser`,
      data: userData,
      headers: {
        'X-CSRFTOKEN': csrftoken
      }
    })
    .then(resp => 
      console.log(resp)
    )
  }

  return (
    <div>
      <Header />
      <Main>
        <SearchForm 
          setSearchData={setSearchData}  
        />
        <Switch>
          <Route path='/results'>
            <SearchResults searchData={searchData} />
          </Route>
          {/* <Route path='/library'>
            <Library libraryData={libraryData} />
          </Route> */}
          <Route path='/signup'>
            <SignUp handleSignUp={handleSignUp} />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
