import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace})
  {

  //стейт переменные названия места и ссылки привязанные к соответствующим инпутам
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  //обработчик инпута названия места
  function handleNameChange(event) {
    setName(event.target.value)
  }
  //обработчик инпута ссылкиn
  function handleLinkChange(event) {
    setLink(event.target.value)
  }
  //обработчик сабмита формы
  function handleSubmit(event) {
    event.preventDefault()
    onAddPlace({name, link})
  }

  //очищение значений привязанных переменных инпутов при монтировании
  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm
      name="PlaceAdd"
      title="Новое место"
      buttonText="Добавить"
      children={
        <>
          <input
            className="popup__inp"
            name="name"
            type="text"
            // defaultValue=""
            placeholder="Название"
            // minlength={2}
            // maxlength={30}
            required
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__inp-errmsg inperr-name"></span>
          <input
            className="popup__inp"
            name="description"
            type="url"
            // defaultValue=""
            placeholder="Ссылка на картинку"
            // minlength={3}
            required
            value={link || ''}
            onChange={handleLinkChange}
          />
          <span className="popup__inp-errmsg inperr-description"></span>
          {/* <button className="popup__btn-save" type="submit">Создать</button>           popup__btn-save_blocked */}
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default AddPlacePopup
