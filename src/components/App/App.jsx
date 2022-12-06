import { useEffect, useState } from 'react';
import Header from '../Header/header';
import Logo from '../Logo/Logo';
import Search from '../Search/search';
import Footer from '../Footer/footer';
import './style.css';
import SearchInfo from '../SearchInfo/search-info';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/utilits';
import { CatalogPage } from '../../Pages/CatalogPage/catalog-page';
import { ProductPage } from '../../Pages/ProductPage/product-page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { NotFoundPage } from '../../Pages/NotFoundPage/not-found-page';
import { UserContext } from '../../Context/userContext';
import { CardContext } from '../../Context/cardContext';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 450);
  const navigate = useNavigate();

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        });
        setCards(newProducts);

        return updateCard;
      });
    },
    [currentUser]
  );

  return (
    <UserContext.Provider value={{ user: currentUser }}>
      <CardContext.Provider value={{ cards, handleLike: handleProductLike }}>
        <Header user={currentUser} onUpdateUser={handleUpdateUser}>
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Routes>
              <Route
                index
                element={
                  <Search
                    onSubmit={handleFormSubmit}
                    onInput={handleInputChange}
                  />
                }
              />
            </Routes>
          </>
        </Header>
        <main className="content container">
          <SearchInfo searchText={searchQuery} />
          <Routes>
            <Route index element={<CatalogPage isLoading={isLoading} />} />
          </Routes>
          <Routes>
            <Route
              path="/product/:productId"
              element={<ProductPage isLoading={isLoading} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
