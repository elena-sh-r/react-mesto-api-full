import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpened && "popup_opened"}`}>
      <form className={`popup__container popup__container_type_${props.name} form`} name={props.name} onSubmit={(e) => { props.onSubmit(e); }}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className={`popup__save-button popup__save-button_type_${props.name}`} type="submit">{props.buttonText ?? "Сохранить"}</button>
        <button className={`popup__close-icon popup__close-icon_type_${props.name}`} type="button" onClick={props.onClose}></button>
      </form>
    </section>
  );
}

export default PopupWithForm;