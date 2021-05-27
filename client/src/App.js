import './App.css';
import Map from './components/Map'
import React, { useState } from 'react';
import ResultsPane from './components/ResultsPane'
import SearchBox from './components/SearchBox'

function App() {
  const [results, setResults] = useState({})
  const [activeItem, setActiveItem] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingError, setIsLoadingError] = useState(false)

  const searchAction = (searchTerm) => {
    setIsLoadingError(false)
    setIsLoading(true)
    fetch(`http://localhost:3001/api/v1/college/search?name=${searchTerm}`)
      .then(res => res.json())
      .then(
        (result) => {
          setResults(result)
          setIsLoading(false)
        },
        () => {
          setIsLoading(false)
          setIsLoadingError(true)
        }
      )
  }
  
  return (
    <div className="App" style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
      <div style={{flexDirection: 'column'}}>
        <SearchBox searchAction={searchAction}/>
        <ResultsPane 
          results={results}
          setActiveItem={setActiveItem} 
          activeItem={activeItem} 
          isLoadingError={isLoadingError}
          isLoading={isLoading}
        />
      </div>
      <Map results={results} activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>
  );
}

export default App;