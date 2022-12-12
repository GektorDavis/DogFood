import { forwardRef } from 'react';
import s from './style.module.css';

export const FormInput = forwardRef((props, ref) => {
  return <input ref={ref} type="text" className={s.input} {...props} />;
});
