import LogoImage from "../cardDashboard/doctors.svg";
import './style.css';

function CardDashboard() {
    return (

        <div className="cardDoctor" >
            <div>
                <div className="">
                    <span>
                        Olá <b>Joana</b>
                    </span>
                </div>
                <div className="">
                    <span>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                    </span>
                </div>

            </div>
            <div>
                <img className="img" src={LogoImage} alt="MedGestão" />
            </div>

        </div>

    );
}

export default CardDashboard;
