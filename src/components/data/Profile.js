import DataFetcher from "./DataFetcher";
import {getCurrentUserData} from "../../RestRequester";
import {getUserId} from "../../Storage";
import Field from "../input/Field";
import {dateBeforeCurrentValidator, emailValidator, nonEmptyValidator} from "../../helpers/Validators";
import Form from "../forms/Form";

const Profile = () => {
    const successfulResponseRenderingFunc = (data) => {
        const inputs = [
            {
                component: Field,
                name: "Email",
                type: "Field",
                disabled: true,
                value: data.email,
                validate: emailValidator
            },
            {
                component: Field,
                name: "First name",
                type: "field",
                disabled: true,
                value: data.firstName,
                validate: nonEmptyValidator
            },
            {
                component: Field,
                name: "Last name",
                type: "field",
                disabled: true,
                value: data.lastName,
                validate: nonEmptyValidator
            },
            {
                component: Field,
                name: "Birthdate",
                type: "date",
                disabled: true,
                value: data.dateOfBirth.split("T")[0],
                validate: dateBeforeCurrentValidator
            }
        ];

        return (
            <div className="profile-personal-info">
                <Form name="Personal info" inputs={inputs}/>
            </div>
        );
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <DataFetcher fetchingFunc={getCurrentUserData}
                         fetchConditionCheckerFunc={getUserId}
                         successfulResponseRenderingFunc={successfulResponseRenderingFunc}/>
        </div>
    );
};

export default Profile;