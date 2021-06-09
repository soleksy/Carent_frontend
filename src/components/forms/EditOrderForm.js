import {Context} from "../App";
import Field from "../input/Field";
import {dateTimeAfterValidator, dateTimeBeforeValidator} from "../../helpers/Validators";
import {editRental} from "../../RestRequester";
import {messages} from "../../helpers/Constats";
import Form from "./Form";
import {useContext} from "react";

const EditOrderForm = (props) => {
    const [, dispatch] = useContext(Context);

    const inputs = [
        {
            component: Field,
            name: "Start date",
            type: "date",
            validate: dateTimeAfterValidator
        },
        {
            component: Field,
            name: "End date",
            type: "date",
            dependsOn: "Start date",
            validate: dateTimeBeforeValidator
        }
    ];

    const onSubmit = (event, inputData) => {
        event.preventDefault();
        dispatch({
            renderLoader: true
        });
        editRental(
            props.orderId,
            props.userId,
            props.carId,
            inputData["Start date"].value,
            inputData["End date"].value
        ).then(() => {
            dispatch({
                modalContent: <span>Your order has been updated successfully</span>,
                renderLoader: false
            });
        }).catch(error => dispatch({
            modalMessage: {
                value: error.response?.data?.message || error.message || messages.serverError,
                type: "error"
            },
            renderLoader: false
        }));
    };

    return (
        <Form name="Order update" inputs={inputs} onSubmit={onSubmit}/>
    );
}

export default EditOrderForm;
