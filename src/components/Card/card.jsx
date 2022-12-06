import cn from 'classnames';

import './style.css';
import { ReactComponent as Save } from './save.svg';
import { calcDiscountPrice, isLiked } from '../../utils/utilits';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import { CardContext } from '../../Context/cardContext';

const Card = ({
  name,
  price,
  _id,
  likes,
  discount,
  qty,
  description,
  pictures,
  tags,
}) => {
  const { user: currentUser } = useContext(UserContext);

  const { handleLike: onProductLike } = useContext(CardContext);

  const discount_price = calcDiscountPrice(price, discount);

  const liked = isLiked(likes, currentUser?._id);

  function handleLikeClick() {
    onProductLike({ _id, likes });
  }

  return (
    <div className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (
          <span className="card__discount">{`-${discount}%`}</span>
        )}
        {tags &&
          tags.map((tag) => (
            <span
              key={tag}
              className={cn('tag', {
                [`tag_type_${tag}`]: true,
              })}
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={cn('card__favorite', {
            'card__favorite_is-active': liked,
          })}
          onClick={handleLikeClick}
        >
          <Save className="card__favorite-icon" />
        </button>
      </div>
      <Link to={`/product/${_id}`} className="card__link">
        <img src={pictures} alt={description} className="card__image" />
        <div className="card__desc">
          <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {discount_price}&nbsp;₽
            </span>
          )}
          <span className="card__qty">{qty}</span>
          <p className="card__name">{name}</p>
        </div>
      </Link>
      <a href="#" className="card__cart btn btn_type_primary">
        В корзину
      </a>
    </div>
  );
};

export default Card;
