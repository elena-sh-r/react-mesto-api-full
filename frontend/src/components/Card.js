import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const card = props.card;
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  ); 

  const deleteButtonClassName = (
    `element__delete ${isOwner && 'element__delete_visible'}`
  ); 

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card._id);
  }

  return (
    <article className="element">
      <button className={deleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} name="like" type="button" onClick={handleLikeClick}></button>
          <p className="element__like-count">{card.likes ? card.likes.length : 0}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;