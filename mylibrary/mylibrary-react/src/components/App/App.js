import './App.css';
import axios from 'axios';
import {useState} from 'react';
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'
import SearchForm from '../Main/SearchForm'
import SearchResults from '../Main/SearchResults'
import styled from 'styled-components';


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const [data,setData] = useState(null)
  const [searchData,setSearchData] = useState(null)

  return (
    <div>
      <Header />
      <Main>
        <SearchForm 
          setSearchData={setSearchData}  
        />
        {searchData && <SearchResults searchData={searchData} />}
      </Main>
      <Footer />
    </div>
  );
}

export default App;
