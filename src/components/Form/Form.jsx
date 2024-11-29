import "./form.scss"
// import RentRangePicker from "../RentRangePicker"
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { getVehicleOccupation, addVehicleOccupation, checkAvailability } from "../../logic/requests"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify styles

const Form = () => {
  const location = useLocation();
//   console.log("Location state:", location.state); // Add this to see what is passed
  const { name, price } = location.state || {};
  const vehicleName = name
  console.log("top level",vehicleName)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysInRange, setDaysInRange] = useState(null);


//    useEffect(() => {
//   if (location.state) {
//     setLocalVehicleName(location.state.vehicleName);
//   }
// }, [location.state]);



//   occupiedDates = await getVehicleOccupation();

const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert input dates to Date objects
    const selectedRange = [new Date(startDate), new Date(endDate)];

    try {
      // Fetch the occupied dates for the vehicle
      const occupiedRanges = await getVehicleOccupation(vehicleName);

      // Check if the selected range is available
      const isAvailable = checkAvailability(selectedRange, occupiedRanges);

      if (isAvailable) {
        // If available, add the occupation to the database
        console.log(vehicleName, selectedRange[0], selectedRange[1])
        await addVehicleOccupation(vehicleName, selectedRange[0], selectedRange[1]);

        // Notify the user
        toast.success(`Ваше бронирование подтверждено\n
            Выбранные вами даты аренды с ${selectedRange[0].toLocaleDateString()} по ${selectedRange[1].toLocaleDateString()}\n
            Стоимость ${price*daysInRange} рублей`);
      } else {
        // If unavailable, show the occupied ranges
        const occupiedMessage = occupiedRanges
          .map(
            (range, index) =>
              `${index + 1}: Начало - ${range[0].toLocaleDateString()}, Конец - ${range[1].toLocaleDateString()}`
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

    // Calculate the number of days in range
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
  
     {/* <div className="form-item">
        <label htmlFor="category">Тип техники</label>
        <select id="category" name="category" required>
                <option value="">Выберите тип</option>
                <option value="Самосвал">Самосвал</option>
                <option value="Эскаватор">Эскаватор</option>
                <option value="Погрузчик">Погрузчик</option>
                <option value="Трактор">Трактор</option>
        </select>
    </div> */}

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
        
    {/* <div className="form-item">
        <label htmlFor="pdf">Можете также прикрепить ТЗ в формате .pdf</label>
        <input type="file" id="pdf" name="pdf" accept=".pdf"/>
    </div>  */}


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

    {/* <div className="form-item">
        <label htmlFor="manufacture_date">Дата</label>
        <input type="date" id="manufacture_date" name="manufacture_date" required/>
    </div> 

    <div className="form-item">
        <label htmlFor="rental_rate">Срок аренды</label>
        <input type="number" id="rental_rate" name="rental_rate" min="1" max="365" step="1" required/>
        <span className="days">дней</span>
    </div> */}
    {/* <div className="form-item">
        <label htmlFor="rental_rate">Срок аренды</label>
        <RentRangePicker initialDatesRange={datesRange} setDatesRange={handleSetDatesRange}/>
    </div> */}
    
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
          min={startDate} // Ensure the end date cannot be earlier than the start date
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

    {/* <input type="hidden" name="advance" value="50"> */}

    <input type="submit" value="Отправить"/>
</form>


{/* Toast Container */}
<ToastContainer 
        position="bottom-right"
        autoClose={false}  // Toast auto closes after 5 seconds
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