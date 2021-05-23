import {Fragment} from "react";
import DataFetcher from "./DataFetcher";
import {getCar} from "../../RestRequester";
import {useParams} from "react-router-dom";

const CarDetails = () => {
    const params = useParams();

    const successfulResponseRenderingFunc = (data) => {
        return (
            <Fragment>
                <h2 style={{textAlign: "left"}}>{data.brand} {data.model}</h2>
                <hr/>
                <h3>Gearbox</h3>
                {data.gearbox}
                <h3>Mileage</h3> {data.mileageInLiter}L
                <h3>Air conditioning</h3> {data.airConditioning ? "" : "not"} available
                <h3>Doors count</h3> {data.amountOfDoors}
                <h3>Seats count</h3> {data.amountOfSeats}
                <hr/>
                <input type="submit" value={`Order ($${data.pricePerDay})`}/>
            </Fragment>
        );
    };

    return (
        <div className="profile-container">
            <h2>Cars</h2>
            <div>
                <DataFetcher fetchingFunc={() => getCar(params.id)}
                             successfulResponseRenderingFunc={successfulResponseRenderingFunc}/>
            </div>
        </div>
    );
};

export default CarDetails;