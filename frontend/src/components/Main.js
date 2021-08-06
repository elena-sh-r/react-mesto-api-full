import React, {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile"> 
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" alt="Аватар" src={currentUser && currentUser.avatar}/>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{currentUser && currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
          <p className="profile__about">{currentUser && currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>
      
      <section className="elements">
        {
          cards && cards.length && cards.map((card) => (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>))
        }
      </section>
    </main>
  );
}

export default Main;