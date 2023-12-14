import './style.css';
import LogoImage from "./logo.svg";

function Card(props) {
    return (
        <div className="card">
            <img className="img" src={props.doctor?.user.imageUrl} alt="MedGestão" />
            <div className="titles">
                <span className="nameMedic">{props.doctor?.user.name}</span>
                <span className="crmNumber">CRM: {props.doctor?.crm}</span>
            </div>
        </div>
    );
};

export default Card;
