import Drawer from "../components/Drawer";
import CardMedicals from "../components/CardMedicals";
import CardSevice from "../components/CardService";
import LatestConsultations from "../components/latestConsultations";
import './style.css';
import React, { useState } from 'react';
import calendarIcon from "./calendar.svg"
import arrowIcon from "./arrow.svg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const dados = [4, 3]
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  return (
    <body className="Dashboard">
      <Drawer />

      <div className="schedule" style={{ maxHeight: 'calc(100vh )', overflowY: 'auto' }}>
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

        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row', position: 'relative', zIndex: 1
          }} >
            {dados.map((item, index) => (
              <CardSevice key={index} dados={item} />
            ))}
          </div>
          <div style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row', position: 'relative', zIndex: 1
          }} >
            {dados.map((item, index) => (
              <CardSevice key={index} dados={item} />
            ))}
          </div>
        </div>
      </div>

      <LatestConsultations />


    </body>
  );
}

export default Dashboard;
