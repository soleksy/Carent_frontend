import Form from "./Form";
import Field from "../input/Field";
import {
    dateBeforeCurrentValidator,
    emailValidator,
    equalityValidator,
    nonEmptyValidator,
    passwordValidator
} from "../../helpers/Validators";
import {signUp} from "../../RestRequester";
import {useContext} from "react";
import {Context} from "../App";
import SignInForm from "./SignInForm";
import {messages} from "../../helpers/Constats";

const SignUpForm = () => {
    const [, dispatch] = useContext(Context);

    const name = "Sign up";
    const inputs = [
        {
            component: Field,
            name: "Email",
            type: "field",
            validate: emailValidator
        },
        {
            component: Field,
            name: "First name",
            type: "field",
            validate: nonEmptyValidator
        },
        {
            component: Field,
            name: "Last name",
            type: "field",
            validate: nonEmptyValidator
        },
        {
            component: Field,
            name: "Birthdate",
            type: "date",
            validate: dateBeforeCurrentValidator
        },
        {
            component: Field,
            name: "Password",
            type: "password",
            validate: passwordValidator
        },
        {
            component: Field,
            name: "Repeat Password",
            type: "password",
            dependsOn: "Password",
            validate: equalityValidator
        }
    ];

    const onSubmit = (event, inputData) => {
        event.preventDefault();
        dispatch({
            renderLoader: true
        });
        signUp(
            inputData["Email"].value,
            inputData["First name"].value,
            inputData["Last name"].value,
            inputData["Birthdate"].value,
            inputData["Password"].value,
            inputData["Repeat Password"].value
        ).then(() => dispatch({
            modalContent: <SignInForm/>,
            modalMessage: {
                value: "Signed up successfully. You can now sign in.",
                type: "info"
            },
            renderLoader: false
        })).catch(error => dispatch({
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

export default SignUpForm;