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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  //стейт переменная массива информации о карточках
  const [cards, setCards] = React.useState([])


  // обработчик нажатия кнопки аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  // обработчик нажатия кнопки редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  // обработчик нажатия кнопки добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  // обработчик попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
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
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
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
          }, ...cards
        ])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    api.getAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
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
          likes: newCard.likes} : oldCard
        ))
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //обработчик удаления карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c.id !== cardId ))
        // setCards(cards.filter(card => card.id !== cardId)) //не включаем в стейт переменную карточку с удаленным Id
      })
      .catch(err => {
        console.log(err)
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
