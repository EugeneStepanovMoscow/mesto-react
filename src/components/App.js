import React, {useState} from 'react';
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'



function App() {
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

  const [isEditProfilePopupOpen, setEditProfilePopupOpenStatus] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpenStatus] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  return (
      <div>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClick={handleCardClick}
        />
        <Footer />

        <section className="popups">
          {/*попап редактирования аватара*/}
          <PopupWithForm
            name="ProfileImgEdit"
            title="Обновить аватар"
            children={
              <>
                <input
                  className="popup__inp"
                  name="name"
                  type="url"
                  defaultValue=""
                  placeholder="Ссылка на картинку"
                  // minlength={3}
                  required
                />
                <span className="popup__inp-errmsg inperr-name popup__inp-errmsg_active"></span>
                <button className="popup__btn-save popup__btn-save_blocked" type="submit" disabled>Сохранить</button>
              </>
            }
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          {/*попап редактирование профиля*/}
          <PopupWithForm
            name="ProfileEdit"
            title="Редактировать профиль"
            children={
              <>
                <input
                  className="popup__inp"
                  name="name"
                  type="text"
                  defaultValue=""
                  placeholder="Введите имя"
                  // minlength={2}
                  // maxlength={40}
                  required
                />
                <span className="popup__inp-errmsg inperr-name"></span>
                <input
                  className="popup__inp"
                  name="description"
                  type="text"
                  defaultValue=""
                  placeholder="Укажите профессию"
                  // minlength={2}
                  // maxlength={200}
                  required
                />
                <span className="popup__inp-errmsg inperr-description"></span>
                <button className="popup__btn-save" type="submit">Сохранить</button>
              </>
            }
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          {/*попап добавления карточки*/}
          <PopupWithForm
            name="PlaceAdd"
            title="Новое место"
            children={
              <>
                <input
                  className="popup__inp"
                  name="name"
                  type="text"
                  defaultValue=""
                  placeholder="Название"
                  // minlength={2}
                  // maxlength={30}
                  required
                />
                <span className="popup__inp-errmsg inperr-name"></span>
                <input
                  className="popup__inp"
                  name="description"
                  type="url"
                  defaultValue=""
                  placeholder="Ссылка на картинку"
                  // minlength={3}
                  required
                />
                <span className="popup__inp-errmsg inperr-description"></span>
                <button className="popup__btn-save popup__btn-save_blocked" type="submit" disabled>Создать</button>
              </>
            }
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          {/* Просмотр карточки */}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

        </section>
      </div>

  );
}

export default App;
