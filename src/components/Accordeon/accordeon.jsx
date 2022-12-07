import s from './style.module.css';
import cn from 'classnames';
import { useState } from 'react';

export const Accordeon = ({ children, title }) => {
  const [selected, setSelected] = useState(false);

  function toggleAccordeonState() {
    setSelected(!selected);
  }

  return (
    <div className={cn(s.accordeon, { [s.active]: selected })}>
      <button className={s.accordeonButton} onClick={toggleAccordeonState}>
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
  );
};
