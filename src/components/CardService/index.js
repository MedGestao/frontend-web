import './style.css';
import LogoImage from "./logo.svg";
import timeIcon from "./timeIcon.svg"
import calendarIcon from "./calendarIcon.svg"
import arrow from './arrow.svg'
import attendanceModal from '../attendanceModal'
import React, { useState } from 'react';
import Modal from 'react-modal';


function CardSevice({ appointment, name,
    age,
    consultation_time,
    date_of_birth,
    date_of_consult, openModal, ...props }) {


    const startAttendance = () => {

        openModal(); // call the prop function

    };

    return (
        <div className="cardService">
            <div className="cadServiceMed1">
                <img className="imgMed" src={LogoImage} alt="MedGestão" />
                <div>
                    <div className='patientInformation' >
                        <span>{name}</span>
                    </div>
                    <div className='dateInformation'>
                        <span>{date_of_birth} - {age} anos</span>
                    </div>
                </div>
            </div>

            <div className="cadServiceMed2">
                <div className="agend">
                    <div className='dateInformation'>
                        <img src={calendarIcon} style={{ marginRight: '10px' }} /> <span>{date_of_consult}</span>

                    </div>
                    <div className="dateInformation">
                        <img src={timeIcon} style={{ marginRight: '10px' }} /> <span>{consultation_time}</span>

                    </div>
                </div>
            </div>
            <button className='buttonService' onClick={startAttendance}>
                <span className='titleButton' style={{ marginRight: '10px' }}>
                    Iniciar atendimento
                </span>
                <img src={arrow} alt="arrowButton" />
            </button>
        </div >

    );
};

export default CardSevice;
