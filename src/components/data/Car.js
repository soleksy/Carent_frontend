

const Car = (props) => {
    return (
        <div className="car">
            <span className="header">{props.brand} {props.model}</span>
            <span className="description">
                Gearbox: {props.gearbox}<br/>
                Mileage: {props.mileageInLiter}L<br/>
                Air conditioning: {props.airConditioning ? "\u2713" : "\u2715"}<br/>
                Amount of doors: {props.amountOfDoors}<br/>
                Amount of seats: {props.amountOfSeats}<br/>
            </span>
            <input type="button" value={`Order ($${props.pricePerDay})`}/>
        </div>
    );
};

export default Car;