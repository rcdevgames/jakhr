import React from 'react';

function Footer() {
  return (
    <>
    <footer className="footer">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-6">
          <img src={process.env.PUBLIC_URL + '/assets/images/logo/logo-red.png'} alt="Avatar" />
        </div>
        <div className="col-6 text-end">
          <img src={process.env.PUBLIC_URL + '/assets/images/logo/logo-1.png'} alt="Avatar" />
        </div>
      </div>
    </div>
  </footer>
    </>
  );
}

export default Footer;