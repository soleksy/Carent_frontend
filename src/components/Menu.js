import {Fragment, useContext} from "react";
import {Context} from "./App";
import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";
import {clearAuthData, getUsername} from "../Storage";

const Menu = (props) => {
    const [globalState, dispatch] = useContext(Context)

    const renderAuthComponents = () => {
        if (getUsername() || globalState.username) {
            return (
                <li className="auth">
                    <p>
                        {getUsername()} [ <button>Profile</button> / <button onClick={() => {
                            clearAuthData();
                            dispatch({username: null});
                        }}>Sign out</button> ]
                    </p>
                </li>
            );
        } else {
            return (
                <Fragment>
                    <li className="sign-up auth">
                        <button onClick={() => dispatch({modalContent: <SignUpForm/>})}>Sign up</button>
                    </li>
                    <li className="sign-in auth">
                        <button onClick={() => dispatch({modalContent: <SignInForm/>})}>Sign in</button>
                    </li>
                </Fragment>
            );
        }
    };

    return (
        <ul>
            <li className="selected"><a href="/">Home</a></li>
            {renderAuthComponents()}
        </ul>
    );
}

export default Menu;