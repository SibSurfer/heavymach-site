import getVehicles from "../../logic/requests"
import "./catalog.scss"
import Card from "../Card/Card"
import DumptruckImg from "../../img/cake.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
    const navigate = useNavigate();

    const handleCardClick = (name, price) => {
    navigate("/form", { state: { name, price } }); // Pass data to the form route
  };
    // const vehicles = [
    //     {
    //         costPerDay: 40000,
    //         subtype: "Самосвал",
    //         type: "cargo",
    //         image: DumptruckImg,
    //     },
    //     {
    //         costPerDay: 40000,
    //         subtype: "Самосвал",
    //         type: "cargo",
    //         image: DumptruckImg,
    //     },
    //     {
    //         costPerDay: 40000,
    //         subtype: "Самосвал",
    //         type: "cargo",
    //         image: DumptruckImg,
    //     },
    //     {
    //         costPerDay: 40000,
    //         subtype: "Самосвал",
    //         type: "cargo",
    //         image: DumptruckImg,
    //     },
    //   ];
      


    const [vehicles, setVehicles] = useState([]); // Initialize state for vehicles

    useEffect(() => {
        const downloadVehicles = async () => {
        const data = await getVehicles();
        setVehicles(data); // Update state with fetched data
    };

    downloadVehicles(); // Fetch data when the component mounts
    }, []); // Empty dependency array ensures it runs only once

    return (
        <main className="Catalog">
            
                <h1 className="title">Заказать технику</h1>
                {vehicles.length > 0 ? (
                <div className="container card__container catalog-con">
                    {vehicles.map((car, index) => (
                        <Card key={index} name={car.subtype} image={car.image} price={car.costPerDay} onClick={() => handleCardClick(car.subtype, car.costPerDay)}/>
                    ))}

                </div>
                ) : (<p className="container">Loading...</p> // Show a loading message until vehicles are fetched
                )}
            
        </main>
    )
}

export default Catalog;

