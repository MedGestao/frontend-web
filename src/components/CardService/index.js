import './style.css';
import LogoImage from "./logo.svg";
import timeIcon from "./timeIcon.svg"
import calendarIcon from "./calendarIcon.svg"
import arrow from './arrow.svg'

function CardSevice() {
    return (
        <div className="cardService">
            <div className="cadServiceMed1">
                <div style={{ marginRight: '15px' }}>
                    <img className="imgMed" src={LogoImage} alt="MedGestão" />
                </div>
                <div style={{ marginRight: '45px' }}>
                    <div className='patientInformation' >
                        <span>José silva</span>
                    </div>
                    <div className='dateInformation'>
                        <span>11/12/23 - 40 anos</span>
                    </div>
                </div>
            </div>
            <div className="cadServiceMed2">
                <div className="agend">
                    <div className='dateInformation'>
                        <img src={calendarIcon} style={{ marginRight: '10px' }} /> <span>11/12/23</span>

                    </div>
                    <div className="dateInformation">
                        <img src={timeIcon} style={{ marginRight: '10px' }} /> <span>12:43</span>

                    </div>
                </div>
                <div>
                    <button className='buttonService'>
                        <span className='titleButton' style={{ marginRight: '10px' }}>
                            Iniciar atendimento
                        </span>
                        <img src={arrow} alt="arrowButton" />
                    </button>
                </div>
            </div>

        </div >

    );
};

export default CardSevice;
