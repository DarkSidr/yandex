import React, { useEffect, useState, useRef } from "react";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerIngredients.module.css";
import { useSelector } from "react-redux";
import { getDataItems } from "../../utils/functions/getStoreFunctions";
import { TItemBurger } from "../BurgerConstructorItem/BurgerConstructorItem";

type TAcc<T> = Record<string, T[]>;

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

interface IntersectionObserverEntry {
  readonly target: Element;
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRect: DOMRectReadOnly;
  readonly intersectionRatio: number;
  readonly isIntersecting: boolean;
  readonly time: number;
}

const BurgerIngredients = () => {
  const data = useSelector(getDataItems);

  const sortData = data.reduce((acc: TAcc<TItemBurger>, obj: TItemBurger) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(0);

  const root = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<Array<HTMLDivElement>>([]);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  const { current: rootCurrent } = root;

  useEffect(() => {
    const handleScroll = () => {
      const callback: IntersectionObserverCallback = (entries): void => {
        entries.forEach((entry: IntersectionObserverEntry, index: number) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.2 &&
            entry.target === sectionsRef.current[index]
          ) {
            setActiveMenuIndex(index);
          }
        });
      };

      const options = {
        threshold: [0.5, 0.8, 1],
      };

      const observer = new IntersectionObserver(callback, options);

      sectionsRef.current.forEach((sectionRef) => {
        if (sectionRef) {
          observer.observe(sectionRef);
        }
      });
    };
    if (rootCurrent) {
      rootCurrent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (rootCurrent) {
        rootCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [rootCurrent]);

  const handleMenuItemClick = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    setActiveMenuIndex(index);
  };

  return (
    <section className="mt-10">
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className="mt-5 mb-10">
        <Tabs
          activeIndex={activeMenuIndex}
          menuItemsRef={menuItemsRef}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
      <div
        className={styles.burgerConstructor}
        id="burgerConstructor"
        ref={root}
      >
        {["bun", "sauce", "main"].map((type, index) => {
          return (
            <div
              className={`mb-10`}
              key={index}
              ref={(el) => (sectionsRef.current[index] = el)}
            >
              <h2 className="text text_type_main-medium mb-6">
                {type === "bun"
                  ? "Булки"
                  : type === "sauce"
                  ? "Соусы"
                  : "Начинки"}
              </h2>
              <ul className={`${styles.list} pl-4`}>
                {sortData[type].map((item: TItemBurger) => (
                  <BurgerIngredientsItem key={item._id} item={item} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BurgerIngredients;
