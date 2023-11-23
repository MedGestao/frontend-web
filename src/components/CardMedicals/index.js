import LogoImage from "../CardMedicals/logomedical.svg";
import './style.css';

function CardMedicals() {
    return (

        <div className="cardMed" >

            <div className="posi">
                <span className="titleCardMed">
                    Hello  <b className="titleCardMedBold">
                        medico
                    </b>
                </span>
                <span className="description">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.  </span>

            </div>
            <div>
                <img className="logoMedic" src={LogoImage} alt="MedGestão" />

            </div>

        </div>
    );
}
export default CardMedicals;
