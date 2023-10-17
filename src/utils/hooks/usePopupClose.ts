import { useEffect } from "react";
import { GET_ORDER_FAILED } from "../../services/actions/order";
import { useAppDispatch } from "./useAppDispatch";
// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами

export function usePopupClose(
  isOpen: boolean,
  closePopup: (visible: boolean) => void
) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isOpen) return; // останавливаем действие эффекта, если попап закрыт

    const handleOverlay = (event: MouseEvent) => {
      // если есть атрибут data-overlay, значит, кликнули на оверлей
      if (event.target instanceof HTMLElement && event.target.dataset.overlay) {
        closePopup(false);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup(false);
        dispatch({
          type: GET_ORDER_FAILED,
        });
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
