import { useState, useEffect } from "react"
import { BackendClient } from '../../service/client'

import './styles.css';

const SelectSpecialty = ({ label, name, register, validationSchema, errors, ...rest }) => {
  const [specialties, setSpecialties] = useState([])

  useEffect(() => {
    async function getSpecialties () {
      try {
        var response = await BackendClient.get('/api/specialties')
        setSpecialties(response.data)
      } catch (exception) {
        console.log("Erro ao buscar especialidades")
      }
    }
    
    getSpecialties()
  }, []);

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select 
        id={name} 
        name={name}
        defaultValue=""
        className={`${errors[name] && "invalid-select"}`} 
        {...register(name, validationSchema)}
        {...rest}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {specialties.map((item) => (
            <option key={item.id} value={item.id}>
              {item.description}
            </option>
          ))}
      </select>
      <span className={`${errors[name] && "invalid-field"}`}>
        {errors[name]?.message ? errors[name].message : 'Campo inválido'}
      </span>
    </div>
  );
};


export default SelectSpecialty;
