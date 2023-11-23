import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from "../assets/logo.svg";
import Input from '../components/Input';
import './styles.css';

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]

function SecondRegister() {
  const [price, setPrice] = useState('')
  const [selectedDay, setSelectedDay] = useState('monday')
  /*   const [selectedDays, setSelectedDays] = useState([
      {
        "day": "",
        "periods": []
      }
    ]) */

  /*   const isDaySelected = (day) => {
      return selectedDays.forEach(sDay => {
        if (sDay === day) {
          return sDay.periods.length !== 0
        }
      })
    } */

  /*   const handleSelectedDays = (day, time) => {
      setSelectedDays(previous => {
        previous.map(p => {
          if (p.day == day) {
            p.periods.push(time)
          }
        })
      })
    } */

  return (
    <>
      <header>
        <img src={LogoImage} alt="MedGestão" />
      </header>
      <main className="second-register-container">
        <h1>Horários de atendimento</h1>
        <form>
          <div className="select-block">
            <label htmlFor="">Dias de atendimento</label>
            <div className="select-days-of-week">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className={`day ${(selectedDay === day) && "selected"}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <Input
            name="Valor"
            label="Valor da consulta"
            placeholder="R$ 200.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Link className="link" to="/dashboard">
            <button type="submit">Finalizar cadastro</button>
          </Link>
        </form>
      </main>
    </>
  );
}

export default SecondRegister;
