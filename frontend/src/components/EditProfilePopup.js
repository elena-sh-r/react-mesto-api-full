import React, {useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    setName(currentUser && currentUser.name);
    setDescription(currentUser && currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpened={props.isOpen} onClose={props.onClose} title="Редактировать профиль" name="profile" onSubmit={handleSubmit} children={
      <>
        <label className="popup__field">
          <input className="popup__input popup__input_type_name" name="name" type="text" id="name-input" minLength="2" maxLength="40" placeholder="Имя" value={name || ''} onChange={(e) => setName(e.target.value)} required/>
          <span className="name-input-error popup__input-error popup__input-error_type_name"></span>
        </label>
        <label className="popup__field">
          <input className="popup__input popup__input_type_about" name="about" type="text" id="about-input" minLength="2" maxLength="200" placeholder="Описание" value={description || ''} onChange={(e) => setDescription(e.target.value)} required/>
          <span className="about-input-error popup__input-error popup__input-error_type_about"></span>
        </label>
      </>
    }/>
  );
}

export default EditProfilePopup;