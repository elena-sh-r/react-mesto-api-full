import React, {useContext, useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import api from '../utils/api';

function CardList(props) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getCards()
    .then((res) => {
      setCards(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.setOwnerInfo(name, about)
      .then((res) => {
        props.setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar(avatar)
      .then((res) => {
        props.setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res.data : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.setCard(name, link)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
      <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      <Footer />
    </>
  );
}

export default CardList;