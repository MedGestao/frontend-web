import './styles.css';

const Select = ({ label, name, values, register, validationSchema, errors, ...rest }) => {
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
          {values.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <span className={`${errors[name] && "invalid-field"}`}>
        {errors[name]?.message ? errors[name].message : 'Campo inválido'}
      </span>
    </div>
  );
};


export default Select;
