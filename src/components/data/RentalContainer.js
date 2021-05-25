import DataFetcher from "./DataFetcher";
import {getRentals} from "../../RestRequester"
import Rental from "./Rental";

const RentalContainer = (props) => {
    const successfulResponseRenderingFunc = (data) => {
        return data.map((rental, index) => <Rental id={rental.id}
                                                   user={rental.user}
                                                   car={rental.car}
                                                   startDate={rental.startDate}
                                                   endDate={rental.endDate}
                                                   key={index}/>
        )
    };

    return (
        <div className="cars-container">
            <div>
                <DataFetcher fetchingFunc={getRentals}
                             successfulResponseRenderingFunc={successfulResponseRenderingFunc} />
            </div>
        </div>
    )
}

export default RentalContainer;
