import { useEffect } from "react";
// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return; // останавливаем действие эффекта, если попап закрыт

    const handleOverlay = (event) => {
      // если есть атрибут data-overlay, значит, кликнули на оверлей
      if (event.target.dataset.overlay) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    //  обязательно удаляем обработчики в `clean-up`- функции
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
  }, [isOpen, closePopup]);
}
