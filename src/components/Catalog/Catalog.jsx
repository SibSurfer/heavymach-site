import getVehicles from "../../logic/requests"
import "./catalog.scss"
import Card from "../Card/Card"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicleOccupation } from "../../logic/requests"

const Catalog = () => {
    const navigate = useNavigate();

    const handleCardClick = (name, price) => {
    navigate("/form", { state: { name, price } }); 
  };


    const [vehicles, setVehicles] = useState([]); 
    const [availability, setAvailability] = useState({});

    useEffect(() => {
        const downloadVehicles = async () => {
            const data = await getVehicles();
            setVehicles(data);
      
            const availabilityData = {};
            const oneDay = 24 * 60 * 60 * 1000; 
            const now = new Date();
      
            for (const vehicle of data) {
              const occupation = await getVehicleOccupation(vehicle.subtype);
      
              // Sort ranges by start date
              const sortedRanges = occupation.sort((a, b) => a[0] - b[0]);
      
              let freeRange = null;
      
              if (sortedRanges.length === 0) {
                // Fully free
                freeRange = "Свободна";
              } else if (now < sortedRanges[0][0]) {
                // Now is before the first occupied range's start date
                const firstStart = sortedRanges[0][0];
                freeRange = `В ближайшее время свободна до ${new Date(firstStart.getTime() - oneDay).toLocaleDateString()}`;

              } else if (now > sortedRanges[sortedRanges.length - 1][1]) {
                //  Free after the last occupied range
                const lastEnd = sortedRanges[sortedRanges.length - 1][1];
                freeRange = `Свободна с ${new Date(lastEnd.getTime() + oneDay).toLocaleDateString()}`;

              } else {
                //  Free between occupied ranges
                for (let i = 0; i < sortedRanges.length - 1; i++) {
                  const currentEnd = sortedRanges[i][1];
                  const nextStart = sortedRanges[i + 1][0];
      
                  if (currentEnd.getTime() + oneDay < nextStart.getTime()) {
                    freeRange = `Ближайшее свободное окно с ${new Date(currentEnd.getTime() + oneDay).toLocaleDateString()} по ${new Date(nextStart.getTime()  - oneDay).toLocaleDateString()}`;
                    break;
                  }
                }
      
                // If no gaps found, check future availability
                if (!freeRange) {
                  const lastEnd = sortedRanges[sortedRanges.length - 1][1];
                  freeRange = `Свободна с ${new Date(lastEnd.getTime() + oneDay).toLocaleDateString()}`;
                }
              }
      
              availabilityData[vehicle.subtype] = freeRange;
            }
      
            setAvailability(availabilityData);
    };
    

    downloadVehicles(); 
    }, []);

    return (
        <main className="Catalog">
            
                <h1 className="title">Заказать технику</h1>
                {vehicles.length > 0 ? (
                <div className="container card__container catalog-con">
                    {vehicles.map((car, index) => (
                        <Card key={index} name={car.subtype} price={car.costPerDay} availability={availability[car.subtype]} onClick={() => handleCardClick(car.subtype, car.costPerDay)}/>
                    ))}

                </div>
                ) : (<p className="container">Loading...</p> 
                )}
            
        </main>
    )
};
  
   

export default Catalog;

