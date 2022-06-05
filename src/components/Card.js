import React from "react";

function Card({
  id,
  name,
  link,
  likes,
  onCardClick
}) {
  function handleClick() {
    onCardClick({ name, link })
  }
  return (
    <li className="place">
      <button className="place__btn-view" type="button" onClick={handleClick}>
        <img className="place__image" src={link} alt={name} />
      </button>
      <button className="place__btn-delit" type="button"></button> {/*place__btn-delit_off  убран*/}
      <div className="place__title">
        <h2 className="place__name">{name}</h2>
        <div className="place__likes-section">
          <button className="place__btn-like" type="button"></button>
          <h3 className="place__likes">{likes}</h3>
        </div>
      </div>
    </li>
  )
}

export default Card
