const Form = ({name, inputs}) => {
    return (
        <div className="form-container">
            <div className="form-header">{name}</div>
            <form>
                {inputs}
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Form;