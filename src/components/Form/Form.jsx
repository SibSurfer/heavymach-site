import "./form.scss"
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { getVehicleOccupation, addVehicleOccupation, checkAvailability } from "../../logic/requests"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

const Form = () => {
  const location = useLocation();
  const { name, price } = location.state || {};
  const vehicleName = name
  console.log("top level",vehicleName)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysInRange, setDaysInRange] = useState(null);
const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedRange = [new Date(startDate), new Date(endDate)];

    try {
      const occupiedRanges = await getVehicleOccupation(vehicleName);

      const isAvailable = checkAvailability(selectedRange, occupiedRanges);

      if (isAvailable) {
        console.log(vehicleName, selectedRange[0], selectedRange[1])
        await addVehicleOccupation(vehicleName, selectedRange[0], selectedRange[1]);

        toast.success(`Ваше бронирование подтверждено\n
            Выбранные вами даты аренды с ${selectedRange[0].toLocaleDateString()} по ${selectedRange[1].toLocaleDateString()}\n
            Стоимость ${price*daysInRange} рублей`);
      } else {
        const occupiedMessage = occupiedRanges
          .map(
            (range, index) =>
              `${index + 1}: с ${range[0].toLocaleDateString()}, по ${range[1].toLocaleDateString()}`
          )
          .join("\n");

        toast.error(`Выбранные даты недоступны для типа техники ${vehicleName}. Уже заняты следующие даты:\n\n${occupiedMessage}`);
      }

    } catch (error) {
      console.error("Error processing your request:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);

    const start = new Date(startDate);
    const end = new Date(selectedEndDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    setDaysInRange(diffDays);
  };
  
    return ( 
    <main className='Form'>
    <h1 className="container" id="form_h1">Выберите нужную технику</h1>

    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

    <div className="form-item">
        <div className="label">Грузоподъемность</div>

        <div className="form_radio_btn">
            <input id="radio-1" type="radio" name="capacity" value="15"/>
            <label htmlFor="radio-1">15 тонн</label>
        </div>
        <div className="form_radio_btn">
            <input id="radio-2" type="radio" name="capacity" value="20"/>
            <label htmlFor="radio-2">20 тонн</label>
        </div>
        <div className="form_radio_btn">
            <input id="radio-3" type="radio" name="capacity" value="30"/>
            <label htmlFor="radio-3">30 тонн</label>
        </div>
    </div>

    <div className="form-item">
        <label htmlFor="description">Техническое задание</label>
        <textarea id="description" name="description" placeholder="Опишите вид работы? Глубина копания? Какой объем ковша необходим? Требуется ли пропуск на объект?" rows="4" cols="50"></textarea>
    </div>

    <div className="form-item">
        <label>
            Параметры
            <div className="label-decr">Отметьте параметры техники, которые необходимы для выполнения заказа</div>
        </label>
        <div className="form_check">
            <input type="checkbox" id="basket" name="features" value="Монтажная корзина"/>
            <label htmlFor="basket">Монтажная корзина</label>
        </div>    
        <div className="form_check">
            <input type="checkbox" id="drill" name="features" value="Ямобур"/>
            <label htmlFor="drill">Ямобур</label>
        </div>
        <div className="form_check">
            <input type="checkbox" id="hammer" name="features" value="Гидромолот"/>
            <label htmlFor="hammer">Гидромолот</label>
        </div>
        <div className="form_check">
            <input type="checkbox" id="crusher" name="features" value="Крашер"/>
            <label htmlFor="crusher">Крашер</label>
        </div>
        <div className="form_check">
            <input type="checkbox" id="cutter" name="features" value="Грунторез"/>
            <label htmlFor="cutter">Грунторез</label>
        </div>
        <div className="form_check">
            <input type="checkbox" id="pitchfork" name="features" value="Вилы"/>
            <label htmlFor="pitchfork">Вилы</label>
        </div>
    </div> 
    
        <div className="form-item">
    <label htmlFor="start-date">Начало срока аренды:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="end-date">Конец срока аренды:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          min={startDate} 
          onChange={handleEndDateChange}
          required
        />
      </div>

    <div className="form-item">
        <label htmlFor="name">Ваше ФИО</label>
        <input className='form-text' type="text" id="name" name="initials" />
    </div> 

    <div className="form-item">
        <label htmlFor="email">Ваш e-mail</label>
        <input type="email" id="email" name="email" placeholder="example@gmail.com" />
    </div> 

     <div className="form-item">
        <label htmlFor="phone">
            Ваш телефон
            <div className="label-decr">Пожалуйста, введите номер в формате 8-900-123-4567</div>
        </label>
        <input type="tel" id="phone" name="phone" placeholder="8-900-123-4567" pattern="[0-9]-[0-9]{3}-[0-9]{3}-[0-9]{4}" />
    </div> 

    <div className="form-item">
        <label htmlFor="tg">
            Ссылка на ваш телеграм
            <div className="label-decr">Для более быстрого общения вы можете оставить ссылку на ваш телеграм в формате https://t.me/username</div>
        </label>
        <input type="url" id="tg" name="tg" placeholder="https://t.me/username" pattern="https://t.me/.*"/>
    </div> 

    <input type="submit" value="Отправить"/>
</form>


{/* Toast Container */}
<ToastContainer 
        position="bottom-right"
        autoClose={false}  
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    
</main>
);
}
export default Form;