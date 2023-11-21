import './styles.css';

const Input = ({ label, name, register, validationSchema, errors, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input 
        id={name} 
        name={name}
        className={`${errors[name] && "invalid-input"}`} 
        {...register(name, validationSchema)}
        {...rest} />
      <span className={`${errors[name] && "invalid-field"}`}>
        {errors[name]?.message ? errors[name].message : 'Campo inválido'}
      </span>
    </div>
  );
};


export default Input;
