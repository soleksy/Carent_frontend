import {useContext} from "react";
import {Context} from "./App";
import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";

const Menu = (props) => {
    const [, dispatch] = useContext(Context)

    return (
        <ul>
            <li className="selected"><a href="/">Home</a></li>
            <li className="sign-up"><button onClick={() => dispatch({modalContent: <SignUpForm/>})}>Sign up</button></li>
            <li className="sign-in"><button onClick={() => dispatch({modalContent: <SignInForm/>})}>Sign in</button></li>
        </ul>
    );
}

export default Menu;