import Drawer from "../../components/Drawer";
import CardMedicals from "../../components/CardMedicals";
import CardSevice from "../../components/CardService";
import LatestConsultations from "../../components/latestConsultations";
import './style.css';
import React, { useState, useEffect } from 'react';
import calendarIcon from "./calendar.svg"
import arrowIcon from "./arrow.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const appointment = { 
    name: 'José silva', 
    birthDate: '11/12/23', 
    age: 40, 
    appointmentDate: '11/12/23', 
    appointmentTime: '12:43' 
  }
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [history, setHistory] = useState(false);
  const name = useState()
  const navigate = useNavigate()

  useEffect(() => {
    var doctor_id = localStorage.getItem("doctor_id");

    if (!doctor_id) {
      navigate("/")
    }

    setData([appointment, appointment, appointment, appointment])
  }, [])

  const searchPatients = (name) => {
    console.log('opa', name);
  }

  const handleTruehistory = () => {
    // Define minhaVariavel como true
    setHistory(true);
  };

  const handleFalsehistory = () => {
    // Define minhaVariavel como false
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
      <Drawer isActive={history} active={handleTruehistory} desactive={handleFalsehistory} />

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
            <div className="simple-input-block">
              <input
                id={name}
                name={name}
                placeholder="Busca por paciente"

              />
            </div>
            <div className="dash-cards">
              {data.map((item, index) => (
                <CardSevice key={index} appointment={item} />
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

            <div className="dash-cards">
              {data.map((item, index) => (
                <CardSevice key={index} appointment={item} />
              ))}
            </div>
          </div>
        )}        
      </div >

      <LatestConsultations />
    </div >
  );
}

export default Dashboard;
