import './style.css';
import LogoImage from "./logo.svg";
import timeIcon from "./timeIcon.svg"
import calendarIcon from "./calendarIcon.svg"
import arrow from './arrow.svg'

function CardSevice({ appointment }) {
    return (
        <div className="cardService">
            <div className="cadServiceMed1">
                <img className="imgMed" src={LogoImage} alt="MedGestão" />
                <div>
                    <div className='patientInformation' >
                        <span>{appointment.name}</span>
                    </div>
                    <div className='dateInformation'>
                        <span>{appointment.birthDate} - {appointment.age} anos</span>
                    </div>
                </div>
            </div>

            <div className="cadServiceMed2">
                <div className="agend">
                    <div className='dateInformation'>
                        <img src={calendarIcon} style={{ marginRight: '10px' }} /> <span>{appointment.appointmentDate}</span>

                    </div>
                    <div className="dateInformation">
                        <img src={timeIcon} style={{ marginRight: '10px' }} /> <span>{appointment.appointmentTime}</span>

                    </div>
                </div>
            </div>
            <button className='buttonService'>
                <span className='titleButton' style={{ marginRight: '10px' }}>
                    Iniciar atendimento
                </span>
                <img src={arrow} alt="arrowButton" />
            </button>

        </div >

    );
};

export default CardSevice;
