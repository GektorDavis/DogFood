import s from './style.module.css';
import cn from 'classnames';

export const FormButton = ({ children, color, ...props }) => {
  return (
    <button {...props} className={cn(s.btn, s[color])}>
      {children}
    </button>
  );
};
