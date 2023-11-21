import './styles.css';

const SimpleInput = ({ label, name, ...rest }) => {
  return (
    <div className="simple-input-block">
      <label htmlFor={name}>{label}</label>
      <input 
        id={name} 
        name={name}
        {...rest} />
    </div>
  )
}


export default SimpleInput
