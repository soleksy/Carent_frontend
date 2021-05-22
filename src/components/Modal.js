import {useContext} from "react";
import {Context} from "./App";
import Message from "./Message";

const Modal = () => {
    const [globalState, dispatch] = useContext(Context);
    if (globalState.modalContent) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="modal-close" onClick={() => dispatch({modalContent: null})}>&times;</span>
                    {globalState.modalContent}
                    <Message value={globalState.modalMessage?.value} type={globalState.modalMessage?.type}/>
                </div>
            </div>
        );
    }
    return null;
}

export default Modal;