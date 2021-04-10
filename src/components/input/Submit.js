import * as React from "react";

class Submit extends React.Component {
    render() {
        return (
            <input type="submit" disabled={!this.props.valid}/>
        );
    }
}

export default Submit;