import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import ImagePopup from './ImagePopup'
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenStatus] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpenStatus] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  //стейт переменная массива информации о карточках
  const [cards, setCards] = React.useState([])


  // обработчик нажатия кнопки аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpenStatus(true)
  }
  // обработчик нажатия кнопки редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpenStatus(true)
  }
  // обработчик нажатия кнопки добавления места
  function handleAddPlaceClick() {
    setAddPlacePopupOpenStatus(true)
  }
  // обработчик попапов
  function closeAllPopups() {
    setEditAvatarPopupOpenStatus(false)
    setEditProfilePopupOpenStatus(false)
    setAddPlacePopupOpenStatus(false)
    setSelectedCard(null)
  }
  // обработчик клика на картинку
  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard)
  }
  //обработчик изменения профиля пользователя
  function handleUpdateUser({name, description}) {
    api.givePersonInfo(name, description) //отправляем изменения на сервер
      .then(res => {
        setCurrentUser(res) //ответ с сервера записываем в стейт переменную
      })
    closeAllPopups()
  }
  //обработчик добавления карточки
  function handleAddPlace({name, link}) {
    api.sendCard(name, link) //отправляем изменения на сервер
      .then(newCard => {
        setCards([{
          //приведение ключей объекта карточки к стандартному виду
          id: newCard._id,
          ownerId: newCard.owner._id,
          name: newCard.name,
          link: newCard.link,
          likes: newCard.likes
        }, ...cards])
      })
      closeAllPopups()
  }
  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    api.getAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res)
      })
    closeAllPopups()
  }
  //обработчик лайка карточки
  function handleCardLike(cardId, likes) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточк и меняем в стейт
    api.changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        // debugger
        setCards(cards.map((oldCard) => oldCard.id === cardId ? {
          id: newCard._id,
          ownerId: newCard.owner._id,
          name: newCard.name,
          link: newCard.link,
          likes: newCard.likes} : oldCard))
      })
  }
  //обработчик удаления карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter(card => card.id !== cardId)) //не включаем в стейт переменную карточку с удаленным Id
      })
  }

  //Запрос данных пользователя с сервера при старте
  useEffect(() => {
    api.getPersonInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  //Запрос данных карточек с сервера с записью в массив cards при старте
  React.useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res.map(card => ({
          id: card._id,
          ownerId: card.owner._id,
          name: card.name,
          link: card.link,
          likes: card.likes})))

      })
      .catch(err => {
        console.log(err)
      })
    }, [])




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <section className="popups">
          {/*попап редактирования аватара*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}

          />
          {/*попап редактирование профиля*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/*попап добавления карточки*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          {/* Просмотр карточки */}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
