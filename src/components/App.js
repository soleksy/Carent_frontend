import SignUpForm from "./forms/SignUpForm";
import SignInForm from "./forms/SignInForm";
import * as React from "react";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <SignUpForm/>
                <br/>
                <br/>
                <SignInForm/>
            </div>
        );
    }
}

export default App;
