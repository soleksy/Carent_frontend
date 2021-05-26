import {Fragment, useContext} from "react";
import {Context} from "./App";
import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";
import {clearAuthData, getUserName} from "../Storage";
import {signOut} from "../RestRequester";

const Menu = (props) => {
    const [globalState, dispatch] = useContext(Context)

    const renderAuthComponents = () => {
        if (getUserName() || globalState.username) {
            return (
                <li className="auth">
                    <p>
                        {getUserName()} [ <button onClick={() => window.location.href = "/profile"}>Me</button> / <button
                        onClick={() => window.location.href = "/orders"}>My orders</button> / <button
                        onClick={() => {
                        dispatch({
                            renderLoader: true
                        });
                        signOut().then(() => {
                            clearAuthData();
                            dispatch({
                                username: null,
                                renderLoader: false
                            });
                        }).catch(() => {
                            clearAuthData();
                            dispatch({
                                username: null,
                                renderLoader: false
                            });
                        });
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
            <li><a href="/">Home</a></li>
            <li><a href="/cars">Cars</a></li>
            {renderAuthComponents()}
        </ul>
    );
}

export default Menu;