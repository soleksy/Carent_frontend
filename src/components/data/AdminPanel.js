import OrdersContainer from "./OrdersContainer";
import {getUserRole} from "../../Storage";


const AdminPanel = () => {

    if(getUserRole() !== 'admin') {
        return (
            <div>
                <h1 style={{textAlign: "center", color: "red"}}>You are not authorized</h1>
            </div>
        )
    }

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Admin Panel</h2>
            <OrdersContainer />

        </div>
    )
}

export default AdminPanel;
