import React from 'react';
import ExcLogo from "../img/excavator-inside-the-gear-logo-free-vector.jpg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => (
  <header>
    <div className="container header__row">
      <div className="header__left">
        <a className="logo__link" href="/">
          <img
            className="logo__icon"
            src={ExcLogo}
            alt="logo of excavator"
          />
          <div className="logo__text">Heavy Machinery Market</div>
        </a>
      </div>
      <div className="header__right">
        <div className="menu__row">
          <a className="text__link" href="/catalog">
            Каталог
          </a>
        </div>
        <div className="header__phone">
          <a className="phone__link" href="tel:8 (800) 123-45-67">
            <span className="phone__link-icon">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#000"
                  d="M11.5874 9.42851L13.7774 11.6285C14.2274 12.0785 14.0574 12.8385 13.4674 13.0585L11.3574 13.8585C10.3774 14.2285 9.26738 13.9885 8.52738 13.2485L3.28738 8.00851C2.54738 7.26851 2.30738 6.15851 2.67738 5.16851L3.47738 3.05851C3.69738 2.46851 4.46738 2.29851 4.90738 2.74851L6.90738 4.74851C7.24738 5.08851 7.24738 5.63851 6.90738 5.97851L6.27738 6.62851C5.93738 6.96851 5.93738 7.51851 6.27738 7.85851L8.47738 10.0585C8.81738 10.3985 9.36738 10.3985 9.70738 10.0585L10.3574 9.42851C10.6974 9.08851 11.2474 9.08851 11.5874 9.42851Z"
                ></path>
              </svg>
            </span>
            <span className="phone__link-wrapper">
              <span className="phone__link-content">Служба поддержки</span>
              <span className="phone__link-content">8 (800) 123-45-67</span>
            </span>
          </a>
        </div>
        <div className="button__header">
            <Link to="/login" className="button">Войти</Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
