import DataFetcher from "./DataFetcher";
import {getRentals} from "../../RestRequester"
import Rental from "./Rental";
import {useState} from "react";

const RentalContainer = () => {
    const [state, setState] = useState(0);
    const successfulResponseRenderingFunc = (data) => {
        return data.map((rental, index) => <Rental id={rental.id}
                                                   user={rental.user}
                                                   car={rental.car}
                                                   startDate={rental.startDate}
                                                   endDate={rental.endDate}
                                                   key={index}
                                                   rerenderCallback={() => setState(oldState => oldState + 1)}/>
        )
    };

    return (
        <div className="cars-container">
            <h2>My orders</h2>
            <div>
                <DataFetcher fetchingFunc={getRentals}
                             successfulResponseRenderingFunc={successfulResponseRenderingFunc}
                             rerenderCondition={state}/>
            </div>
        </div>
    )
}

export default RentalContainer;
