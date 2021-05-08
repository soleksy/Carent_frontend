import Form from "./Form";
import Field from "../input/Field";
import {emailValidator, nonEmptyValidator} from "../../helpers/Validators";
import {signIn} from "../../RestRequester";
import jwtDecode from "jwt-decode";
import {saveAuthData} from "../../Storage";
import {Context} from "../App";
import {useContext} from "react";

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
            const {userId, firstName, lastName} = jwtDecode(authToken);
            const userName = `${lastName} ${firstName}`
            saveAuthData(userId, userName, authToken);
            dispatch({
                userName,
                modalContent: null,
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
        <Form name={name} inputs={inputs} onSubmit={onSubmit}/>
    );
}

export default SignInForm;