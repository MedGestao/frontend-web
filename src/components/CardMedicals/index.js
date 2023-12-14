import LogoImage from "../CardMedicals/logomedical.svg";
import './style.css';

function CardMedicals(props) {
    return (

        <div className="cardMed" >

            <div className="posi">
                <span className="titleCardMed">
                    Hello  <b className="titleCardMedBold">
                        {props.name}
                    </b>
                </span>
                <span className="description">Seja bem vindo(a) ao MedGestão sua plataforma de gerenciamento de atendimentos.  </span>

            </div>
            <div>
                <img className="logoMedic" src={LogoImage} alt="MedGestão" />

            </div>

        </div>
    );
}
export default CardMedicals;
