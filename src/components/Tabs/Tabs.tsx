import TabItem from "../TabItem/TabItem";
import styles from "./Tabs.module.css";

export type TMenuItemsRef = {
  menuItemsRef: React.MutableRefObject<HTMLDivElement[]>;
};

export type TItemTab = {
  id?: number;
  title: string;
  value: string;
};

type TTabs = {
  activeIndex: number;
  handleMenuItemClick: (index: number) => void;
} & TMenuItemsRef;

const tabItems: TItemTab[] = [
  {
    id: 1,
    title: "Булки",
    value: "bun",
  },
  {
    id: 2,
    title: "Соусы",
    value: "sauce",
  },
  {
    id: 3,
    title: "Начинки",
    value: "main",
  },
];

const Tabs = ({ activeIndex, menuItemsRef, handleMenuItemClick }: TTabs) => {
  return (
    <div className={styles.tabWrapepr}>
      {tabItems.map((tab, index) => {
        return (
          <TabItem
            key={tab.id}
            title={tab.title}
            value={tab.value}
            activeIndex={activeIndex}
            handleMenuItemClick={handleMenuItemClick}
            menuItemsRef={menuItemsRef}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Tabs;
