import Drawer from "../../components/Drawer";
import CardMedicals from "../../components/CardMedicals";
import CardSevice from "../../components/CardService";
import LatestConsultations from "../../components/latestConsultations";
import './style.css';
import React, { useState, useEffect } from 'react';
import calendarIcon from "./calendar.svg"
import arrowIcon from "./arrow.svg"
import searcIcon from "./searchIcon.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [consultCard, setConsultCard] = useState([{ name: "marcos", age: "25", date_of_birth: "00/00/0000", date_of_consult: "12/12/2024", consultation_time: "11:00" },
  { name: "Maria", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "marta", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "joana", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "Carlos", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "Kevin", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" }
  ])
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [history, setHistory] = useState(false);
  const [name, setName] = useState()

  var [filteredConsultations, setFilteredConsultation] = useState(consultCard)
  useEffect(() => {
    setData([consultCard, consultCard, consultCard, consultCard])
  }, [])

  const searchPatients = () => {
    filteredConsultations = consultCard.filter(paciente => {

      if (paciente.name.toLowerCase() == name.toLowerCase()) {
        return paciente
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
              {filteredConsultations.map((item, index) => (
                <CardSevice appointment={consultCard}
                  name={item?.name}
                  age={item?.age}
                  consultation_time={item?.consultation_time}
                  date_of_birth={item?.date_of_birth}
                  date_of_consult={item?.date_of_consult} />
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
                {consultCard.map((item, index) => (


                  <div style={{
                    display: 'flex',
                    flexDirection: 'row', position: 'relative', zIndex: 1, paddingBottom: "2%"
                  }}>
                    <CardSevice appointment={consultCard} name={item?.name} age={item?.age} consultation_time={item?.consultation_time} date_of_birth={item?.date_of_birth} date_of_consult={item?.date_of_consult} />


                  </div>
                ))}
              </div>
            </div >)}

      </div >
      <LatestConsultations />
    </div>
  )
}


export default Dashboard;
