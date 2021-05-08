import DataFetcher from "./DataFetcher";
import {getCars} from "../../RestRequester";
import Car from "./Car";

const CarsContainer = (props) => {
    const successfulResponseRenderingFunc = (data) => {
        return data.map((car, index) => <Car brand={car.brand}
                                             model={car.model}
                                             gearbox={car.gearbox}
                                             mileageInLiter={car.mileageInLiter}
                                             airConditioning={car.airConditioning}
                                             amountOfDoors={car.amountOfDoors}
                                             amountOfSeats={car.amountOfSeats}
                                             pricePerDay={car.pricePerDay}
                                             key={index}
        />)
    };

    return (
        <div className="cars-container">
            <h2>{props.header}</h2>
            <div>
                <DataFetcher limit={props.limit} fetchingFunc={getCars}
                             successfulResponseRenderingFunc={successfulResponseRenderingFunc}/>
            </div>
        </div>
    );
};

export default CarsContainer;