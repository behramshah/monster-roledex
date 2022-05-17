import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/cardList/CardList.component';
import SearchBox from './components/searchbox/SearchBox.component';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => setMonsters(users));
  }
  , []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  
  const onSearchChange = event => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);           
  };
  
  return (
    <div className="App">
      <h1 className='app-title'>Monsters Roledex</h1>
      <SearchBox
        className='search-box' 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
      />        
      <CardList monsters={filteredMonsters}/>                         
    </div>
  );
}

export default App;
