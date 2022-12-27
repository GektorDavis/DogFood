import cn from 'classnames';
import s from './style.module.css';

export const Banner = ({
  title,
  subtitle,
  background,
  price,
  extraClass,
  colorBg,
}) => {
  return (
    <div
      className={cn(s.banner, { [s[extraClass]]: !!extraClass })}
      style={{
        backgroundImage: `url(${background})`,
        backgroundColor: colorBg,
      }}
    >
      <h2 className={s.title}>{title}</h2>
      <h2 className={s.subtitle}>{subtitle}</h2>
      <span className={s.price}>{price}</span>
    </div>
  );
};
