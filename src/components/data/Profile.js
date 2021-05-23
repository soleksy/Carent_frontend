import DataFetcher from "./DataFetcher";
import {editProfile, getCurrentUserData} from "../../RestRequester";
import Field from "../input/Field";
import {dateBeforeCurrentValidator, emailValidator, nonEmptyValidator} from "../../helpers/Validators";
import Form from "../forms/Form";
import {getQueryParam} from "../../helpers/Common";
import {getUserName, saveAuthData} from "../../Storage";
import {useContext, useState} from "react";
import {Context} from "../App";
import Message from "../Message";
import {messages} from "../../helpers/Constats";

const Profile = () => {
    const [, dispatch] = useContext(Context);
    const [state, setState] = useState({
        serverResponse: null
    })
    const successfulResponseRenderingFunc = (data) => {
        let contents;
        if (getQueryParam("edit")) {
            const inputs = [
                {
                    component: Field,
                    name: "Email",
                    type: "Field",
                    value: data.email,
                    validate: emailValidator
                },
                {
                    component: Field,
                    name: "First name",
                    type: "field",
                    value: data.firstName,
                    validate: nonEmptyValidator
                },
                {
                    component: Field,
                    name: "Last name",
                    type: "field",
                    value: data.lastName,
                    validate: nonEmptyValidator
                },
                {
                    component: Field,
                    name: "Birthdate",
                    type: "date",
                    value: data.dateOfBirth.split("T")[0],
                    validate: dateBeforeCurrentValidator
                }
            ];
            const onSubmit = (event, inputData) => {
                event.preventDefault();
                dispatch({
                    renderLoader: true
                });
                editProfile(
                    inputData["Email"].value,
                    inputData["First name"].value,
                    inputData["Last name"].value,
                    inputData["Birthdate"].value
                ).then(response => {
                    const authToken = response.data;
                    saveAuthData(dispatch, authToken);
                    dispatch({
                        userName: getUserName(),
                        renderLoader: false
                    });
                    window.location.href = "/profile";
                }).catch(error => {
                    dispatch({
                        renderLoader: false
                    });
                    setState({
                        serverResponse: {
                            value: error.response?.data?.message || error.message || messages.serverError,
                            type: "error"
                        }
                    });
                });
            };
            contents = <Form inputs={inputs} onSubmit={onSubmit}/>
        } else {
            contents = (<div>
                <h2 style={{textAlign: "left"}}>{data.firstName} {data.lastName}</h2>
                <hr/>
                <h3>Email</h3>
                <span>{data.email}</span>
                <h3>Birthdate</h3>
                <span>{new Date(Date.parse(data.dateOfBirth)).toDateString()}</span>
                <hr/>
                <a className="button" href="/profile?edit=true">Edit</a>
            </div>);
        }
        return (
            <div className="profile-personal-info">
                {contents}
                <Message value={state.serverResponse?.value} type={state.serverResponse?.type}/>
            </div>
        );
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <DataFetcher fetchingFunc={getCurrentUserData}
                         successfulResponseRenderingFunc={successfulResponseRenderingFunc}/>
        </div>
    );
};

export default Profile;