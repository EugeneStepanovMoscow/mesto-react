import React from 'react';

function Footer() {
  // данная конструкция с определением года не работает.Что я делаю не так?
  // const date = (`© ${new Date().getSeconds} Mesto Russia`)
  return (
    <footer className="footer">
      <p className="footer__info">{`© 2022 Mesto Russia`}</p>
    </footer>
  )
}

export default Footer
