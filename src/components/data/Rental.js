const Rental = (props) => {
    return (
        <div className="car">
            <span className="description">
                Id: {props.id}<br/>
                User: {props.user.id}: {props.user.email}<br/>
                Car: {props.car.id}: {props.brand} {props.model}<br/>
                Start date: {props.startDate}<br/>
                End date: {props.endDate}
            </span>
            <button>Cancel</button>
        </div>
    )
}

export default Rental;
