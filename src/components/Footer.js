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
          <p>Copyright © PT. Jakarta Propertindo - 2023</p>
          {/* <img src={process.env.PUBLIC_URL + '/assets/images/logo/Jakhr.png'} alt="Avatar" /> */}
        </div>
      </div>
    </div>
  </footer>
    </>
  );
}

export default Footer;