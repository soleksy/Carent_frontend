
import {useRef, useState} from "react";
import {getRentals} from "../../RestRequester";
import Order from "./Order";
import DataFetcher from "./DataFetcher";

const OrdersContainer = () => {
    const doGetOrders = useRef(() => getRentals());
    const [state, setState] = useState(0);

    const successfulResponseRenderingFunc = (data) => {
        return data.map((rental, index) => <Order id={rental.id}
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
            <h2>Orders</h2>
            <div>
                <DataFetcher fetchingFunc={doGetOrders.current}
                             successfulResponseRenderingFunc={successfulResponseRenderingFunc}
                             rerenderCondition={state}/>
            </div>
        </div>
    )
}

export default OrdersContainer;

