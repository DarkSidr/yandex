import React, { useEffect, useState, useRef } from "react";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerIngredients.module.css";
import { useSelector } from "react-redux";
import { getDataItems } from "../../utils/functions/getStoreFunctions";

const BurgerIngredients = () => {
  const data = useSelector(getDataItems);

  const sortData = data.reduce((acc, obj) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const root = useRef(null);
  const menuItemsRef = useRef([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const callback = (entries) => {
        entries.forEach((entry, index) => {
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
        observer.observe(sectionRef);
      });
    };

    root.current.addEventListener("scroll", handleScroll);
    return () => {
      if (root.current) {
        root.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleMenuItemClick = (index) => {
    const section = sectionsRef.current[index];
    section.scrollIntoView({ block: "start", behavior: "smooth" });
    setActiveMenuIndex(index);
  };

  return (
    <>
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
                  {sortData[type].map((item) => (
                    <BurgerIngredientsItem key={item._id} item={item} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
