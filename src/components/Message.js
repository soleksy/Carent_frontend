const Message = (props) => {
    if (props.value) {
        return (
            <span className={`${props.type}-message`}>
                {props.value}
            </span>
        );
    }
    return null;
};

export default Message;