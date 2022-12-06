import s from './style.module.css';
import cn from 'classnames';

function Header({ children, user, onUpdateUser }) {
  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({ name: 'Kamazyao', about: 'Writer' });
  // };

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        {/* {user?.email && <span className={cn(s.user)}>{user?.email}</span>}
        {user?.name && <span className={cn(s.user)}>{user?.name}</span>}

        <button
          className="btn btn_type_primary"
          onClick={handleClickButtonEdit}
        >
          Изменить
        </button> */}

        <div className={s.header__wrapper}>{children}</div>
      </div>
    </header>
  );
}

export default Header;
