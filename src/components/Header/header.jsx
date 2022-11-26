import Logo from '../Logo/Logo';
import Search from '../Search/search';
import './style.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
