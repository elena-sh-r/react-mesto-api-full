import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name,
      link,
    });

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Новое место" name="element" buttonText="Создать" >
        <label className="popup__field">
          <input className="popup__input popup__input_type_title" name="name" type="text" placeholder="Название" id="title-input" minLength="2" maxLength="30" onChange={(e) => setName(e.target.value)} value={name} required/>
          <span className="title-input-error popup__input-error popup__input-error_type_title">Вы пропустили это поле</span>
        </label>
        <label className="popup__field">
          <input className="popup__input popup__input_type_image-link" name="link" type="url" placeholder="Ссылка на картинку" id="link-input" onChange={(e) => setLink(e.target.value)} value={link} required/>
          <span className="link-input-error popup__input-error popup__input-error_type_image-link">Введите адрес сайта</span>
        </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;