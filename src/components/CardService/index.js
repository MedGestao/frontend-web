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


    let dataObj = new Date(date_of_birth);
    let dataObj2 = new Date(date_of_consult)
    let date_of_birth_f = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    let date_of_birth_c = dataObj2.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const startAttendance = () => {

        openModal(appointment);
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
                        <span>{date_of_birth_f} - {age} anos</span>
                    </div>
                </div>
            </div>

            <div className="cadServiceMed2">
                <div className="agend">
                    <div className='dateInformation'>
                        <img src={calendarIcon} style={{ marginRight: '10px' }} /> <span>{date_of_birth_c}</span>

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
