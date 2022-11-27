import { useEffect, useState } from 'react';
import CardList from '../CardList/card-list';
import Header from '../Header/header';
import Logo from '../Logo/Logo';
import Search from '../Search/search';
import Footer from '../Footer/footer';
import './style.css';
import data from '../../assets/data.json';
import SeachInfo from '../SearchInfo';

function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequest = () => {
    const filterCards = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards(filterCards);
  };

  useEffect(() => {
    handleRequest();
  }, [searchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  return (
    <>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        {/* <Sort /> */}
        <div className="contant__cards">
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
