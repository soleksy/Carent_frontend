import Form from "./Form";
import Field from "../input/Field";
import {emailValidator, nonEmptyValidator} from "../../helpers/Validators";
import {signIn} from "../../RestRequester";
import {getUserName, saveAuthData} from "../../Storage";
import {Context} from "../App";
import {useContext} from "react";
import {messages} from "../../helpers/Constats";

const SignInForm = () => {
    const [, dispatch] = useContext(Context);

    const name = "Sign in";
    const inputs = [
        {
            component: Field,
            name: "Email",
            type: "field",
            validate: emailValidator
        },
        {
            component: Field,
            name: "Password",
            type: "password",
            validate: nonEmptyValidator
        }
    ];

    const onSubmit = (event, inputData) => {
        event.preventDefault();
        dispatch({
            renderLoader: true
        });
        signIn(
            inputData["Email"].value,
            inputData["Password"].value
        ).then(response => {
            const authToken = response.data;
            saveAuthData(dispatch, authToken);
            dispatch({
                userName: getUserName(),
                modalContent: null,
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
        <Form name={name} inputs={inputs} onSubmit={onSubmit}/>
    );
}

export default SignInForm;