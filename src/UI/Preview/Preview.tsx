import { useEffect, useRef } from 'react';
import styles from './Preview.module.scss';

const elements = [
  { key: 'title', text: 'MobCon', className: styles.title },
  { key: 'subtitle', text: 'онлайн-конструктор', className: styles.subtitle },
  { key: 'description', text: 'Создаем мобильные приложения без написания кода.', className: styles.description },
  { key: 'card1', html: 'Преимущество <strong>1</strong>: экономим ваши деньги.', className: styles.card },
  { key: 'card2', html: 'Преимущество <strong>2</strong>: не нужно уметь программировать.', className: styles.card },
  { key: 'card3', html: 'Преимущество <strong>3</strong>: скорость и качество.', className: styles.card },
  { key: 'input', placeholder: 'Что вы хотите создать?', className: styles.input, type: 'input' },
  { key: 'button', text: 'Начать', className: styles.button, type: 'button' },
];

export default function Preview() {
  const refs = useRef<(HTMLDivElement | HTMLInputElement | HTMLButtonElement)[]>([]);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showCycle = async () => {
      refs.current.forEach(el => el?.classList.remove(styles.visible));
      tabRef.current?.classList.remove(styles.visible);

      for (let i = 0; i < refs.current.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        refs.current[i]?.classList.add(styles.visible);
      }

      await new Promise(r => setTimeout(r, 600));
      tabRef.current?.classList.add(styles.visible);

      await new Promise(r => setTimeout(r, 5000));

      refs.current.forEach(el => el?.classList.remove(styles.visible));
      tabRef.current?.classList.remove(styles.visible);

      await new Promise(r => setTimeout(r, 1500));
      showCycle();
    };

    showCycle();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.phoneFrame}>
        <div className={styles.notch}></div>
        <div className={styles.appContent}>
          {elements.map((el, idx) => {
            const refFn = (element: HTMLDivElement | HTMLInputElement | HTMLButtonElement | null) => {
              if (element) refs.current[idx] = element;
            };

            if (el.type === 'input') {
              return (
                <input
                  key={el.key}
                  ref={refFn}
                  className={`${styles.component} ${el.className}`}
                  placeholder={el.placeholder}
                />
              );
            }

            if (el.type === 'button') {
              return (
                <button
                  key={el.key}
                  ref={refFn}
                  className={`${styles.component} ${el.className}`}
                >
                  {el.text}
                </button>
              );
            }

            return (
              <div
                key={el.key}
                ref={refFn}
                className={`${styles.component} ${el.className}`}
                dangerouslySetInnerHTML={el.html ? { __html: el.html } : undefined}
              >
                {!el.html ? el.text : null}
              </div>
            );
          })}
        </div>
        <div className={styles.tabBar} ref={tabRef}>
          <span>🏠</span>
          <span>🔍</span>
          <span>➕</span>
          <span>⚙️</span>
        </div>
      </div>
    </div>
  );
}
