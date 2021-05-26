import Field from "../input/Field";
import {dateBeforeCurrentValidator, dateTimeAfterValidator, dateTimeBeforeValidator} from "../../helpers/Validators";
import {addRental} from "../../RestRequester";
import {getUserId} from "../../Storage";
import Form from "./Form";
import {Context} from "../App";
import {useContext} from "react";

const RentalForm = (props) => {
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
        addRental(
            getUserId(),
            props.car.id,
            inputData["Start date"].value,
            inputData["End date"].value
        ).then(() => {
            dispatch({
                modalContent: <span>Your order has been placed successfully</span>,
                renderLoader: false
            });
        }).catch(error => dispatch({
            modalMessage: {
                value: error.response ? error.response.data.message : error.message,
                type: "error"
            },
            renderLoader: false
        }));
    };

    return (
        <Form name="Order details" inputs={inputs} onSubmit={onSubmit}/>
    );
};

export default RentalForm;