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
const DEFAULT_AVATAR_IMG = "https://t3.ftcdn.net/jpg/05/18/09/86/360_F_518098617_0PFa7dDxTysifBhhTGM3ccCbrLv43sNz.jpg"

function SecondSignup() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [avatar, setAvatar] = useState(null);
  const [isAvatarEmpty, setIsAvatarEmpty] = useState(false);
  const [selectedDays, setSelectedDays] = useState([])
  const [selectedPeriods, setSelectedPeriods] = useState([])
  const { register, handleSubmit, reset, clearErrors, formState: { errors }, watch, setError } = useForm()
  const { state } = useLocation();
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    if (!state) {
      navigate("/signup")
    }
  });

  const uploadImage = async () => {
    var uploadData = new FormData();
    uploadData.append('file', avatar)

    try {
      var response = await BackendClient.post('/api/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setErrorMessage("")
      return response.data.imageUrl;
    } catch (exception) {
      console.log("Erro ao salvar imagem")
      setErrorMessage("Erro ao salvar imagem")
    }
  }

  const formatDate = (inputDateString) => {
    // Parse the input date
    const [day, month, year] = inputDateString.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    return parsedDate;
  }

  const DaysOfWeek = {
    Domingo: 1 ,
    Segunda: 2,
    Terça: 3,
    Quarta: 4,
    Quinta: 5,
    Sexta: 6,
    Sabado: 7,
  };

  const handleSignup = async (data) => {
    if (avatar === null) {
      setIsAvatarEmpty(true)
      return
    }
    setIsAvatarEmpty(false)

    var id = null

    if (doctorId === null) {
      // Upload Doctor Image
      var fileURL = await uploadImage();
      // Save Doctor
      const doctorRequest = {
        "user": {
          "name": state.name,
          "birthDate": formatDate(state.birthDate),
          "cpf": state.cpf.replace(/\D/g, ''),
          "sex": state.sex.charAt(0),
          "address": state.zipCode.replace(/\D/g, ''),
          "number": state.number,
          "email": state.email,
          "password": state.password,
          "imageUrl": fileURL,
          "cellphoneUser": {
            "number": state.phone
          }
        },
        "crm": state.crm,
        "specialty": {
          "id": parseInt(state.specialty),
          "description": state.specialty
        }
      }

      try {
        var response = await BackendClient.post('/api/doctors', doctorRequest)
        id = response.data.id
        setDoctorId(response.data.id)
        setErrorMessage("")
      } catch (exception) {
        setErrorMessage(exception.response.data.message)
        console.log(exception.response.data.message)
        return
      } 
    }

    try {
      var scheduleRequest = []
      var filteredPeriods = getOnlyValidPeriods()
      Object.fromEntries(
        Object.entries(filteredPeriods).filter(([key, value]) => {
          console.log(key, value)
          var schedule = {
            "doctorId": {
              "id": doctorId == null ? id : doctorId
            },
            "scheduleLimit": parseInt(data.countPatients),
            "queryValue": parseFloat(data.price),
            "dayOfService": `${DaysOfWeek[key]}`,
            "period1": value[0] ? value[0] : '',
            "period2": value[1] ? value[1] : ''
          }
          scheduleRequest.push(schedule)
        })
      );

      var response = await BackendClient.post('/api/doctors/schedule', scheduleRequest)   
      console.log(response.data)
      setErrorMessage("")
      reset()
      navigate("/")
    } catch (exception) {
      setErrorMessage("Erro ao salvar agenda")
      return
    } 
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

            <Input
              name="countPatients"
              label="Quantidade de pacientes por período"
              placeholder="10"
              type="number"
              min="1"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            {errorMessage !== "" && (
              <div className="active">
                <span className="error">{errorMessage}</span>
              </div>
            )}

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

            {isAvatarEmpty && (
              <div className="active-img">
                <span className='upload-error'>Oops! Você esqueceu de adicionar sua foto!</span>
              </div>)}
          </div>
        </form>
      </main>
    </>
  );
}

export default SecondSignup;
