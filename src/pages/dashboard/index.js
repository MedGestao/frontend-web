import Drawer from "../../components/Drawer";
import CardMedicals from "../../components/CardMedicals";
import CardSevice from "../../components/CardService";
import LatestConsultations from "../../components/latestConsultations";
import './style.css';
import React, { useState } from 'react';
import calendarIcon from "./calendar.svg"
import arrowIcon from "./arrow.svg"
import searcIcon from "./searchIcon.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [history, setHistory] = useState(false);
  const [name, setName] = useState('');
  const [consultCard, setConsultCard] = useState([{ name: "marcos", age: "25", date_of_birth: "00/00/0000", date_of_consult: "12/12/2024", consultation_time: "11:00" },
  { name: "Maria", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "marta", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "joana", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "Carlos", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" },
  { name: "Kevin", age: "16", date_of_birth: "08/12/2007", date_of_consult: "02/07/2024", consultation_time: "12:00" }
  ])
  var [filteredConsultations, setFilteredConsultation] = useState(consultCard)
  const searchPatients = () => {
    console.log('opa', name);
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
      <Drawer active={handleTruehistory} desactive={handleFalsehistory} />

      <div className="schedule" style={{ maxHeight: 'calc(100vh )', overflowY: 'auto' }}>
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

          </div>

          : <div>


            <CardMedicals className="cardDoctor" />

            <div className="agendConsult" >
              <div>Agenda</div>
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
          </div>
        }


        <div style={{ paddingTop: "2%" }} >
          {filteredConsultations.map((item, index) => (

            <React.Fragment key={item?.name}>
              {(index) % 2 === 0 && <div style={{
                display: 'flex',
                flexDirection: 'row', position: 'relative', zIndex: 1, paddingBottom: "2%"
              }}><CardSevice name={item?.name} age={item?.age} consultation_time={item?.consultation_time} date_of_birth={item?.date_of_birth} date_of_consult={item?.date_of_consult} />
                {filteredConsultations[index + 1] && (
                  <CardSevice
                    name={filteredConsultations[index + 1]?.name}
                    age={filteredConsultations[index + 1]?.age}
                    consultation_time={filteredConsultations[index + 1]?.consultation_time}
                    date_of_birth={filteredConsultations[index + 1]?.date_of_birth}
                    date_of_consult={filteredConsultations[index + 1]?.date_of_consult}
                  />
                )}     </div>}
            </React.Fragment>
          ))}


        </div>
      </div >

      <LatestConsultations />


    </div >
  );
}

export default Dashboard;
