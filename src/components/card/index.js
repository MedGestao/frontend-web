import './style.css';
import LogoImage from "./logo.svg";

function Card() {
    return (
        <div className="card">
            <img className="img" src={LogoImage} alt="MedGestão" />
            <div className="titles">
                <span className="nameMedic">Joana Maria</span>
                <span className="crmNumber">CRM: 0000</span>
            </div>
        </div>
    );
};

export default Card;
