import {useContext} from "react";
import {Context} from "./App";

const Modal = (props) => {
    const [globalState, dispatch] = useContext(Context);

    const renderErrorMessageIfNeeded = () => {
        if (globalState.modalErrorMessage) {
            return (
                <span className="modal-error">
                    {globalState.modalErrorMessage}
                </span>
            );
        }
        return null;
    }

    const renderModalIfNeeded = () => {
        if (globalState.modalContent) {
            return (
                <div className="modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={() => dispatch({modalContent: null})}>&times;</span>
                        {globalState.modalContent}
                        {renderErrorMessageIfNeeded()}
                    </div>
                </div>
            );
        }
        return null;
    }

    return renderModalIfNeeded();
}

export default Modal;