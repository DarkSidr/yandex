import React, { useEffect, useState, useRef } from "react";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_CURRENT_ITEM } from "../../services/actions/currentIngredient";

const BurgerIngredients = () => {
  const data = useSelector((store) => {
    return store.data.items;
  });

  const sortData = data.reduce((acc, obj) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  const itemModal = useSelector((store) => store.currentIngredient.currentItem);

  const isLoaded = useSelector((store) => store.currentIngredient.isLoaded);

  const dispatch = useDispatch();

  const getData = (item) => {
    dispatch({
      type: GET_CURRENT_ITEM,
      currentItem: item,
    });
  };

  const [openModal, setOpenModal] = React.useState(false);

  usePopupClose(openModal, setOpenModal);

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
                    <BurgerIngredientsItem
                      key={item._id}
                      item={item}
                      onChange={setOpenModal}
                      getData={getData}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      {openModal && itemModal && isLoaded && (
        <Modal title="Детали ингредиента" setState={setOpenModal}>
          <IngredientDetails {...itemModal} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
