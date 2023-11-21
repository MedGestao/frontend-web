import './styles.css';
import InputMask from "react-input-mask";

const InputWithMask = ({ label, name, mask, register, validationSchema, errors, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <InputMask  
        id={name} 
        name={name}
        mask={mask}
        className={`${errors[name] && "invalid-input"}`} 
        {...register(name, validationSchema)}
        {...rest} />
      <span className={`${errors[name] && "invalid-field"}`}>
        {errors[name]?.message ? errors[name].message : 'Campo inválido'}
      </span>
    </div>
  );
};

export default InputWithMask;
