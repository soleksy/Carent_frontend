import {Context} from "../App";
import {useContext} from "react";
import {getDifferenceInDays} from "../../helpers/Common";
import {deleteRental} from "../../RestRequester";
import {messages} from "../../helpers/Constats";
import EditOrderForm from "../forms/EditOrderForm";


const Order = (props) => {
    const [, dispatch] = useContext(Context)

    const onDelete = () => {
        dispatch({
            renderLoader: true
        });
        deleteRental(props.id).then(() => {
            dispatch({
                modalContent: <span>Order {props.id} has been cancelled</span>,
                renderLoader: false
            });
            props.rerenderCallback();
        }).catch(error => dispatch({
            modalMessage: {
                value: error.response?.data?.message || error.message || messages.serverError,
                type: "error"
            },
            renderLoader: false
        }));
    };

    const startDate = new Date(Date.parse(props.startDate));
    const endDate = new Date(Date.parse(props.endDate));

    return (
        <div className="car">
            <span className="description">
                Id: {props.id}<br/>
                Car: {props.car.brand} {props.car.model} (${props.car.pricePerDay} per day)<br/>
                Start date: {startDate.toDateString()}<br/>
                End date: {endDate.toDateString()}<br/>
                Price: ${props.car.pricePerDay * (getDifferenceInDays(startDate, endDate) + 1)}
            </span>
            <input type="submit" value="Edit" onClick={() => dispatch({modalContent: <EditOrderForm carId={props.car.id} orderId={props.id} userId={props.user.id}/>})}/>
            <input type="submit" value="Cancel" onClick={onDelete}/>


        </div>
    )
}

export default Order;
