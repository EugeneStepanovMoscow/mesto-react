import React from 'react';

function Footer() {
  // данная конструкция с определением года не работает.Что я делаю не так?
  // const date = (`© ${new Date().getSeconds} Mesto Russia`)
     const date = (`© ${new Date().getFullYear()} Mesto Russia`)

  return (
    <footer className="footer">
      <p className="footer__info">{date}</p>
    </footer>
  )
}

export default Footer
