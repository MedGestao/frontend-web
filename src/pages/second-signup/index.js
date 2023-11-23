import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios"

import { ViaCepClient } from '../../service/client'

import Input from '../../components/Input'
import SimpleInput from '../../components/SimpleInput'
import InputWithMask from '../../components/InputWithMask'
import DayButton from '../../components/DayButton'
import TimeButton from '../../components/TimeButton'

import './styles.css'
import Header from '../../components/Header'

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
const timeOfDay = ["09:00 - 12:00", "14:00 - 18:00"]

const zipCodePattern = /^\d{5}-\d{3}$/

function SecondSignup() {
  const navigate = useNavigate()
  const [address, setAddress] = useState({
    "cep": "",
    "logradouro": "",
    "bairro": "",
    "uf": ""
  })
  const [selectedDays, setSelectedDays] = useState([])
  const [selectedPeriods, setSelectedPeriods] = useState([])
  const { register, handleSubmit, reset, clearErrors, formState: { errors }, watch, setError } = useForm()
  const watchZipCode = watch('zipCode', '')

  useEffect(() => {
    if (watchZipCode.match(zipCodePattern))
      getAddressByZipCode(watchZipCode)
  }, [watchZipCode]);

  const handleLogin = (data) => {
    console.log(data)
    getAddressByZipCode(data.zipCode)
    /* localStorage.setItem("mykey","myvalue") */
    reset()
    navigate("/dashboard")
  }

  const getAddressByZipCode = (zipCode) => {
    if (zipCode !== null) {
      const cleanZipCode = zipCode.replace(/\D/g, '');
      ViaCepClient.get(`/${cleanZipCode}/json`).then((response) => {
        if (response.data.erro === true) {
          setAddress({
            "cep": "",
            "logradouro": "",
            "bairro": "",
            "uf": ""
          })
          setError('zipCode', { type: 'custom', message: 'CEP inválido' })
          return 
        }
        clearErrors('zipCode')
        setAddress(response.data);
      })
    }
  }

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
        <h1>Horários de atendimento</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="group-inputs">
            <h3>Seu endereço</h3>
            <InputWithMask
              name="zipCode"
              label="CEP"
              mask="99999-999"
              placeholder="57304-467"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true, 
                pattern: zipCodePattern
              }}
            />
            <SimpleInput
              name="street"
              label="Rua"
              value={address.logradouro}
              placeholder="Rua"
              readOnly="readonly"
            />
            <SimpleInput
              name="neighborhood"
              label="Bairro"
              value={address.bairro}
              placeholder="Bairro"
              readOnly="readonly"
            />
            <SimpleInput
              name="city"
              label="Cidade"
              placeholder="Cidade"
              value={address.localidade}
              readOnly="readonly"
            />
            <SimpleInput
              name="state"
              label="Estado"
              placeholder="Estado"
              readOnly="readonly"
              value={address.uf}
            />
            <Input
              name="number"
              label="Número"
              placeholder="467"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />
          </div>

          <aside>
            <div className="select-block">
              <h3>Selecione seus dias de atendimento</h3>
              <div className="select-days-of-week">
                {daysOfWeek.map((day, index) => (
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
                    {timeOfDay.map(time => 
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
        </form>
      </main>
    </>
  );
}

export default SecondSignup;
