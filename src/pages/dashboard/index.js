import Drawer from "../../components/Drawer";
import CardMedicals from "../../components/CardMedicals";
import CardSevice from "../../components/CardService";
import LatestConsultations from "../../components/latestConsultations";
import './style.css';
import React, { useState, useEffect } from 'react';
import calendarIcon from "./calendar.svg"
import arrowIcon from "./arrow.svg"
import searcIcon from "./searchIcon.svg"
import LogoImage from "../../components/CardService/logo.svg";
import TimeIcon from '../../components/CardService/timeIcon.svg'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import positiveIcon from './positiveIcon.svg'
import Modal from 'react-modal';
import { BackendClient } from '../../service/client'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [consultCard, setConsultCard] = useState()
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [history, setHistory] = useState(false);
  const [name, setName] = useState()
  const estiloModal = {
    content: {
      width: '50%',
      height: '95%',
      margin: 'auto',
      background: '#202125',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderStyle: 'hidden'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const [modalAberto, setModalAberto] = useState(false);

  const openModal = () => { console.log("s"); setModalAberto(true) };
  var [filteredConsultations, setFilteredConsultation] = useState(consultCard)
  const [doctor, setDoctor] = useState();

  const fetchUser = async (doctor_id) => {
    // try {
    var response = await BackendClient.get(`/api/doctors/${doctor_id}`)
    var response2 = await BackendClient.get(`/api/patientDoctorConsultation/searchByDoctor/${doctor_id}`)// ${doctor_id}
    setDoctor(response.data)
    setConsultCard(response2.data)
    // } catch (exception) {
    //   setErrorMessage(exception.response.data.message)
    //   console.log(exception.response.data.message)
    //   return
    // }
  }

  useEffect(() => {
    var doctor_id = localStorage.getItem("doctor_id");

    if (!doctor_id) {
      navigate("/")
    }
    else {
      fetchUser(doctor_id);
    }

    setData([consultCard, consultCard, consultCard, consultCard])
  }, [])

  const searchPatients = () => {
    filteredConsultations = consultCard.filter(patient => {

      if (patient.patientName?.toLowerCase() == name?.toLowerCase()) {
        return patient
      }
    });
    if (!name) {
      filteredConsultations = consultCard
    }
    setFilteredConsultation(filteredConsultations);
  }

  const handleTruehistory = () => {
    setHistory(true);
  };

  const handleFalsehistory = () => {
    setHistory(false);
  };

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  return (
    <div className="Dashboard">
      <Drawer doctor={doctor} isActive={history} active={handleTruehistory} desactive={handleFalsehistory} />

      <div className="schedule">
        {history ?
          <div className="headerHistoryColumn">
            <div className="headerHistory">
              <span className="title">Histórico de Consultas </span>
              <div className="ts" onMouseOver={showCalendar} onMouseOut={hideCalendar}>
                <div className="calendar" >
                  <div style={{ display: 'flex' }}>
                    <img src={calendarIcon} style={{ marginRight: '10px' }} /></div>
                  <div>
                    <span>{date.toString('pt-BR').slice(3, 15)}</span></div>
                  <div className="" style={{ display: 'flex' }} > <img src={arrowIcon} style={{ marginRight: '10px' }} /> {/*   */} </div>
                </div>
                <div style={{ position: 'absolute', zIndex: 2 }}>
                  {isCalendarVisible && <Calendar onChange={setDate} value={date} />}
                </div>
              </div>

            </div>
            <div className="inputStyle">
              <button type="button" className="buttonSearch" onClick={searchPatients}>
                <img src={searcIcon} />
              </button>
              <input
                id={name}
                name={name}
                placeholder="Busca por item"
                onChange={(e) => setName(e.target.value)}
              />

            </div>
            <div className="dash-cards">
              {filteredConsultations?.map((item, index) => (
                <CardSevice
                  appointment={consultCard}
                  name={item?.patientName}
                  age={'11/11/11'}
                  consultation_time={item?.patientDoctorConsultationResponse?.appointmentTime}
                  date_of_birth={'11/11/11'}
                  date_of_consult={item?.patientDoctorConsultationResponse?.appointmentDate}
                />
              ))}
            </div>
          </div>

          : (
            <div>
              <CardMedicals className="cardDoctor" />
              <div className="agendConsult" >
                <div className="title">Consultas Agendadas</div>
                <div className="ts" onMouseOver={showCalendar} onMouseOut={hideCalendar}>
                  <div className="calendar" >
                    <div style={{ display: 'flex' }}>
                      <img src={calendarIcon} style={{ marginRight: '10px' }} />
                    </div>
                    <div>
                      <span>{date.toString('pt-BR').slice(3, 15)}</span></div>
                    <div className="" style={{ display: 'flex' }} > <img src={arrowIcon} style={{ marginRight: '10px' }} /> {/*   */} </div>
                  </div>
                  <div style={{ position: 'absolute', zIndex: 2 }}>
                    {isCalendarVisible && <Calendar onChange={setDate} value={date} />}
                  </div>
                </div>
              </div>


              <div className="dash-cards"  >
                {
                  consultCard?.map((item, index) => (


                    <div style={{
                      display: 'flex',
                      flexDirection: 'row', position: 'relative', paddingBottom: "2%"
                    }}>
                      <CardSevice openModal={openModal} appointment={consultCard} name={item?.patientName} age={'11/11/11'}
                        consultation_time={item?.patientDoctorConsultationResponse?.appointmentTime}
                        date_of_birth={'11/11/11'} date_of_consult={item?.patientDoctorConsultationResponse?.appointmentDate} />

                    </div>
                  ))}
              </div>
            </div >)}


      </div >

      <LatestConsultations />
      <div>

        <Modal

          isOpen={modalAberto}
          onRequestClose={() => setModalAberto(false)}
          style={estiloModal}
        >
          <div className="atendaceModal">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="titleModal">Informações do paciente</span>
              <button className="closeModal" onClick={() => setModalAberto(false)} >X</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-start' }}>
              <img src={LogoImage} />
              <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                <span className='title' >jorge Silva</span>
                <span style={{ color: '#afb4b2' }}> 11/11/2023 - 42 anos - masculino </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <span className="titleModal">Queixas</span>
              <textarea className="textArea" rows="4" cols="50" type="text" placeholder="Paciente está sentindo dores no peito e falta de ar durante exercícios físicos..." />
            </div>
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <span className="titleModal">Outras Anotações</span>
              <textarea className="textArea" rows="4" cols="50" type="text" placeholder="Paciente está sentindo dores no peito e falta de ar durante exercícios físicos..." />
            </div>
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <span className="titleModal">Recomendações</span>
              <textarea wrap="hard" className="textArea" rows="4" cols="50" type="text" placeholder="Paciente está sentindo dores no peito e falta de ar durante exercícios físicos..." />
            </div>
          </div>
          <div className="" style={{ marginTop: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', background: '#' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                <img src={calendarIcon}></img>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>

                <span>11/11/2023</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <div>
                <img src={TimeIcon} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>

                <span>11:00</span>
              </div>
            </div>
            <button className='buttonServiceCompleted'>
              <img src={positiveIcon} alt="arrowButton" style={{ marginRight: '5%' }} />
              <span className='titleButton' style={{ marginRight: '10px' }}>
                Concluir atendimento
              </span>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}


export default Dashboard;
