import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Обновить аватар" name="avatar" children={
      <>
        <label className="popup__field">
          <input ref={inputRef} className="popup__input popup__input_type_avatar" name="avatar" type="url" placeholder="Ссылка на аватар" id="avatar-input" required/>
          <span className="avatar-input-error popup__input-error popup__input-error_type_avatar">Введите ссылку на аватар</span>
        </label>
      </>
    }/>
  );
}

export default EditAvatarPopup;