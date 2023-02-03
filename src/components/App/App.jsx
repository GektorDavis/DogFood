import { useEffect, useState } from 'react';
import Header from '../Header/header';
import Logo from '../Logo/Logo';
import Search from '../Search/search';
import Footer from '../Footer/footer';
import './style.css';
import SearchInfo from '../SearchInfo/search-info';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { CatalogPage } from '../../Pages/CatalogPage/catalog-page';
import { ProductPage } from '../../Pages/ProductPage/product-page';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { NotFoundPage } from '../../Pages/NotFoundPage/not-found-page';
import { FaqPage } from '../../Pages/FaqPage/faq-page';
import { FavoritePage } from '../../Pages/FavoritePage/favorite-page';
import Modal from '../Modal/modal';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPass } from '../ResetPass/reset-pass';
import { HomePage } from '../../Pages/HomePage/home-page';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../storage/products/products-slice';
import { fetchUser } from '../../storage/user/user-slice';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 450);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  const dispatch = useDispatch();

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
    const userData = dispatch(fetchUser());
    userData.then(() => {
      dispatch(fetchProducts());
    });
  }, [dispatch]);

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

  return (
    <>
      <Header user={currentUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes>
            <Route
              path="/catalog"
              element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              }
            />
            <Route path="*" element={<></>} />
          </Routes>
        </>
      </Header>
      <main className="content">
        <SearchInfo searchText={searchQuery} />
        <Routes
          location={
            (backgroundLocation && {
              ...backgroundLocation,
              pathname: initialPath,
            }) ||
            location
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route
            path="/product/:productId"
            element={<ProductPage isLoading={isLoading} />}
          />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path="/login"
              element={
                <Modal>
                  <Login />
                </Modal>
              }
            />
            <Route
              path="/register"
              element={
                <Modal>
                  <Register />
                </Modal>
              }
            />
            <Route
              path="/reset-password"
              element={
                <Modal>
                  <ResetPass />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
