import { useMemo, useState, useEffect, useCallback } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios"

import { BackendClient } from '../../service/client'
import Input from '../../components/Input'
import SimpleInput from '../../components/SimpleInput'
import InputWithMask from '../../components/InputWithMask'
import DayButton from '../../components/DayButton'
import TimeButton from '../../components/TimeButton'
import Header from '../../components/Header'
import './styles.css'

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
const PERIODS = ["09:00 - 12:00", "14:00 - 18:00"]
/* const DEFAULT_AVATAR_IMG = "https://images.ctfassets.net/h8qzhh7m9m8u/5459snTalzWRmionEbuZYo/d50b7e5b7f65f70bb37e127c7e73b79e/Doctors_green.png"
 */
/* const DEFAULT_AVATAR_IMG = "https://img.freepik.com/free-psd/3d-healthcare-icon-with-medic_23-2150819694.jpg"
 */
const DEFAULT_AVATAR_IMG = "https://t3.ftcdn.net/jpg/05/18/09/86/360_F_518098617_0PFa7dDxTysifBhhTGM3ccCbrLv43sNz.jpg"
const ZIP_CODE_PATTERN = /^\d{5}-\d{3}$/

function SecondSignup() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState('');
  const [isAvatarEmpty, setIsAvatarEmpty] = useState(false);
  const [address, setAddress] = useState({
    "cep": "",
    "logradouro": "",
    "bairro": "",
    "uf": ""
  })
  const [selectedDays, setSelectedDays] = useState([])
  const [selectedPeriods, setSelectedPeriods] = useState([])
  const { register, handleSubmit, reset, clearErrors, formState: { errors }, watch, setError } = useForm()
  const { state } = useLocation();

  const handleSignup = async (data) => {
    console.log(state)

    console.log(data)

    const filteredPeriods = getOnlyValidPeriods()
    console.log(filteredPeriods)

    const doctorRequest = {
      "user": {
        "name": "Samara",
        "birthDate": "2000-04-12T00:00:00Z",
        "cpf": "13968049438",
        "sex": "F",
        "address": "rua A",
        "email": "test2@gmail.com",
        "password": "12344",
        "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg*",
        "cellphoneUser": {
          "number": "829299292"
        }
      },
      "crm": "123",
      "specialty": {
        "description": "Ginecologista"
      }
    }
  
    /* try {
      var response = await BackendClient.post('/api/doctors', doctorRequest)
      console.log(response.status)
      console.log(response.data.message)
    } catch (exception) {
      console.log(exception.response.data.message)
    } */
    
    /* localStorage.setItem("mykey","myvalue") */
    /* reset() */
    navigate("/dashboard")
  }

  const getOnlyValidPeriods = () => {
    return Object.fromEntries(
      Object.entries(selectedPeriods).filter(([key, value]) => {
        return value.length > 0 && selectedDays.indexOf(key) > -1
      })
    );
  }

  const preview = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : DEFAULT_AVATAR_IMG
  }, [avatar])

  const handleUploadAvatar = useCallback(
    (event) => {
      if (event.target.files) {
        console.log(event.target.files[0])
        setAvatar(event.target.files[0]);
      }
    },
    [],
  );

  const handleSelectedDays = (day) => {
    // Se dia já estiver selecionado, remove
    const dayIndex = selectedDays.indexOf(day)

    if (dayIndex > -1) {
      setSelectedDays(prev => prev.filter(item => item !== day))
    } else {
      // se não estiver selecionado, adiciona
      setSelectedDays(prev => [...prev, day])
    }
  }

  const isDaySelected = (day) => {
    return selectedDays.indexOf(day) > -1
  } 

  const isSelectedPeriod = (day, period) => {
    return selectedPeriods[day]?.length > 0 && selectedPeriods[day].indexOf(period) > -1
  } 


  const handleSelectedPeriods = (day, period) => {
    if (selectedPeriods[day]) {
      const dayIndex = selectedPeriods[day].indexOf(period)

      if (dayIndex > -1) {
        // Se periodo já estiver selecionado, remove
        const updatedValues = selectedPeriods[day].filter(value => value !== period)

        setSelectedPeriods(prev => ({...prev, [day]: updatedValues}))
      } else {
        // se periodo não estiver selecionado, adiciona
        setSelectedPeriods(prev => ({...prev, [day]: [...prev[day], period]}))
      }
    } else {
      setSelectedPeriods(prev => ({...prev, [day]: [period]}))
    }
  }

  return (
    <>
      <Header />
      <main className="second-register-container">
        <h1>Cadastro médico</h1>
        <form onSubmit={handleSubmit(handleSignup)}>
          <aside className="schedules-box">
            <div className="signup-select-block">
              <h3>Selecione seus dias de atendimento</h3>
              <div className="select-days-of-week">
                {DAYS_OF_WEEK.map((day, index) => (
                  <DayButton 
                    key={index} 
                    day={day} 
                    isDaySelected={isDaySelected} 
                    handleSelectedDays={handleSelectedDays} 
                  />
                ))}
              </div>
            </div>

            {selectedDays.length > 0 && <div className="periods">
                <h3>Selecione os horários para cada dia</h3>
                
                {selectedDays.map((day, index) => (
                  <div>
                    <strong className='day-title'>{day}</strong>
                    <div className="select-periods-of-day">
                      {PERIODS.map(time => 
                        <TimeButton 
                          key={time} 
                          period={time} 
                          day={day}
                          isSelected={isSelectedPeriod}
                          handleSelected={handleSelectedPeriods}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>}

            <Input
              name="price"
              label="Valor da consulta"
              placeholder="R$ 200"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <button className="btn-submit" type="submit">Finalizar cadastro</button>

          </aside>
          <div id="upload" className="signup-select-block upload">
            <h3>Sua melhor foto</h3>
            <div id="input-file">
              <input
                id="file"
                name="avatar"
                placeholder="Adicionar avatar"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleUploadAvatar}
              />
              <label 
                className="avatar-image upload-label" 
                htmlFor="file" 
                style={{ backgroundImage: `url(${preview})` }}>
                  <span>Selecionar foto</span>
              </label>
            </div>
            <span className={`upload-error ${isAvatarEmpty ? 'active' : ''}`}>Oops! Você esqueceu de adicionar sua foto!</span>
          </div>
        </form>
      </main>
    </>
  );
}

export default SecondSignup;
