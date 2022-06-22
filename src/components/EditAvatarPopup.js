import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar})
  {

  const avatarRef = React.createRef()

  function handleSubmit(event) {
    event.preventDefault()
    onUpdateAvatar(avatarRef.current.value)
  }


  return (
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
            ref={avatarRef}
          />
          <span className="popup__inp-errmsg inperr-name popup__inp-errmsg_active"></span>
          <button className="popup__btn-save" type="submit">Сохранить</button> {/*popup__btn-save_blocked */}
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup
