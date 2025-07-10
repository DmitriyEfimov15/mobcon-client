import { FC } from 'react';
import * as classes from './Loader.module.scss';

interface LoaderProps {
  size?: number; // размер в пикселях
  color?: string; // кастомный цвет
}

const Loader: FC<LoaderProps> = ({ size = 16, color = '#fff' }) => {
  return (
    <div
      className={classes.loader}
      style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }}
    />
  );
};

export default Loader
