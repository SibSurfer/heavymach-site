/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import FstImg from "../img/fstImg.jpg";
import ClockImg from "../img/clock_light.png";
import HelpImg from "../img/help.png";
import CakeImg from "../img/cake.png";
import EmojiImg from "../img/emoji_light.png";
import ManagerImg from "../img/thdImg.jpg";
import { Link } from "react-router-dom";
import "../index.css"

const HomePage = () => {

//   const navigate = useNavigate();

  return (
    <main>
        <section>
            <div className="container">
                <div className="section__title title__text">Экономим ваше время: аренда спецтехники без звонков и переговоров</div>
            </div>
            
            <div className="container section__descr">
                <div className="block__descr">
                    <div className="block1_text">Помощь в подборе и аренде спецтехники</div>
                    <div className="block_button">
                        <Link to="/catalog" className="regular_button">
                            Заполнить форму
                        </Link>
                    </div>
                    
                </div>
                <div className="block_img">
                    <img id="block1_pic" src={FstImg}/>
                </div>
            </div>
        </section>
        <section>
            <div className="container">
                <div className="section__title title__text">Когда мы нужны бизнесу</div>
            </div>
            <div className="container card__container">
                <div className="card">
                    <img src={ClockImg}/>
                    <div className="card__title">Нужно экономить время на поиск техники и переговоры</div>
                    <div className="card__descr">Алгоритм HMM подбирает технику под ваш запрос, вы не занимаетесь поиском и звонками</div>
                </div>
                <div className="card">
                    <img src={HelpImg}/>
                    <div className="card__title">Нужно быть уверенным что меня не подведут</div>
                    <div className="card__descr">Если что-то пойдёт не так, то наша служба поддержки придет на помощь</div>
                </div>
                <div className="card">
                    <img src={CakeImg}/>
                    <div className="card__title">Нужно заказывать все виды техники в одном месте</div>
                    <div className="card__descr">У нас собраны все самые популярные виды техники</div>
                </div>  
                <div className="card">
                    <img src={EmojiImg}/>
                    <div className="card__title">Нужна простота и удобство в аренде услуг спецтехники</div>
                    <div className="card__descr">HMM - это удобный и простой сервис аренды услуг строительной техники для вашего бизнеса</div>
                </div>  
            </div>
        </section>

        <section>
            <div className="container section__descr" >
                <div className="block__descr block3_right block" id="block4">
                    <div className="block4__title block">Нужна консультация менеджера?</div>
                    <div className="block4__descr">Напишите в чат поддержки и мы обсудим с вами все детали сделки </div>
                    <div className="block_button">
                        <Link to="/login" className="regular_button">Написать в поддержку</Link>
                    </div>
                </div>
                <div className="container block_img"/>
                    <img id="manager_img" src={ManagerImg}/>
                </div>
        </section>
    </main>
);
}

export default HomePage;
