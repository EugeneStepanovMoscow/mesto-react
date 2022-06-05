import React from 'react';
import api from '../utils/Api';
import penImg from '../images/Pen.svg'
import plusImg from '../images/Plus.svg'
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onClick }) {
  const [userName, setUserName] = React.useState('Имя')
  const [userDescription, setUserDescription] = React.useState('Профессия')
  const [userAvatar, setUserAvatar] = React.useState('../images/Cousto.jpg')
  const [cards, setCards] = React.useState([])


  //Запрос данных пользователя с сервера
  React.useEffect(() => {
    api.getPersonInfo()
      .then(res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  //Запрос данных карточек
  React.useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res.map(card => ({
          id: card._id,
          name: card.name,
          link: card.link,
          likes: card.likes.length
        })))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          {/* Аватар пользователя */}
          <div className="profile__avatar">
            <img className="profile__image" src={userAvatar} alt="Аватар" />
            <button className="profile__avatar-btn-edit" type="button" onClick={onEditAvatar}>
              <img className="profile__avatar-btn-edit-img" src={penImg} alt="Карандаш" />
            </button>
          </div>
          {/* информация о пользователе */}
          <div className="profile__info">
            <h1 className="profile__person-name">{userName}</h1>
            <button className="profile__btn-edit" type="button" onClick={onEditProfile}>
              <img className="profile__btn-edit-img" src={penImg} alt="Карандаш" />
            </button>
            <p className="profile__person-description">{userDescription}</p>
          </div>
        </div>
        {/* кнопка добавления места */}
        <button className="profile__btn-add" type="button" onClick={onAddPlace}>
          <img className="profile__btn-add-img" src={plusImg} alt="Плюс" />
        </button>
      </section>
      <section className="places">
        {/* Контейнер для карточек */}
        <ul className="places__table">
          {cards.map(({ id, name, link, likes }) =>
            <Card
              key={id}
              name={name}
              link={link}
              likes={likes}
              onCardClick={onClick}
            />)
          }
        </ul>
      </section>
    </main>
  )
}

export default Main
