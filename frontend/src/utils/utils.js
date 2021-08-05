// функция открытия попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// функция закрытия попапа по оверлею
export const  closePopupOnOverlay = (popup, evt) => {
  if(evt.target != popup) {
    return;
  }
  
  closePopup(popup);
}

// функция закрытия попапа
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// функция закрытия попапа по Esc
export const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}