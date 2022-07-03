import React from "react";
import { Link } from "react-router-dom";


function FormPattern({
  title,
  formName,
  buttonText,
  handleChange,
  handleSubmit,
  name,
  password
})
{

  return (
    <div className="form-pattern">
      <h2 className="form-pattern__title">{title}</h2>
      <form
        className="form-pattern__form"
        name={`form-pattern-${formName}`}
        id={`form-pattern-${formName}`}
        onSubmit={handleSubmit}
        //novalidate
      >
      <fieldset className="form-pattern__fieldset">
        <input
          className="form-pattern__inp"
          name="email"
          type="email"
          // defaultValue=""
          placeholder="Email"
          // minlength={2}
          // maxlength={30}
          required
          value={name || ''}
          onChange={handleChange}
        />
        {/* <span className="popup__inp-errmsg inperr-name"></span> */}
        <input
          className="form-pattern__inp"
          name="password"
          type="password"
          // defaultValue=""
          placeholder="Пароль"
          // minlength={3}
          required
          value={password || ''}
          onChange={handleChange}
        />
        {/* <span className="popup__inp-errmsg inperr-description"></span> */}
        {/* <button className="popup__btn-save" type="submit">Создать</button>           popup__btn-save_blocked */}
        <button className="form-pattern__btn-save" type="submit">{buttonText}</button>
      </fieldset>
      </form>
    </div>
  )
}

export default FormPattern

