import React from 'react';

function ImagePopup({card, onClose}) {

  return (
    <section className={`popup popup_type_image ${card && "popup_opened"}`} >
        <div className="popup__container popup__container_type_image">
          <img className="popup__image" src={card?.link} alt={card?.name}/>
          <h2 className="popup__caption">{card && card.name}</h2>
          <button className="popup__close-icon popup__close-icon_type_image" type="button" onClick={onClose} ></button>
        </div>
    </section>
  );
}

export default ImagePopup;