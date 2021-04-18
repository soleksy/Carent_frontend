import {useContext} from "react";
import {Context} from "./App";

const Modal = (props) => {
    const [state, dispatch] = useContext(Context);

    return (
        <div className={`modal${state.modalContent ? "" : " hidden"}`}>
            <div className="modal-content">
                <span className="modal-close" onClick={() => dispatch({modalContent: null})}>&times;</span>
                {state.modalContent}
            </div>
        </div>
    );
}

export default Modal;