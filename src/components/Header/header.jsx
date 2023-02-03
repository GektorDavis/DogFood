import s from './style.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';
import { ReactComponent as CartIcon } from './img/cart.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as UserIcon } from './img/user.svg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ children }) {
  const favorites = useSelector((state) => state.products.favoriteProducts);
  const location = useLocation();

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to="/favorites">
              <FavoriteIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
            <Link className={s.favoritesLink} to={{ pathname: '/cart' }}>
              <CartIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
            <Link
              to="/login"
              state={{
                backgroundLocation: location,
                initialPath: location.pathname,
              }}
              className={s.iconsMenuItem}
            >
              <UserIcon />
              Войти
            </Link>
            <Link to="/profile" className={s.iconsMenuItem}>
              <ProfileIcon />
              Andrei
            </Link>
            <Link to="/" className={s.iconsMenuItem}>
              <LogoutIcon />
              Выйти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
