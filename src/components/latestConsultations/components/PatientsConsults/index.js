import LogoImage from "./logomedical.svg";
import arrow from "./icon.svg";
import './style.css';

const PatientsConsult = (props) => {
  return (

    <div className="patientsConsultsCard" >
      <div >
        <img className="patientImg" src={LogoImage} />
      </div>
      <div>
        <span>{props.consult.name}</span>
        <br />
        <span className="titleAnotation">Anotações</span>
      </div>
      <div>
        <img src={arrow} />

      </div>
    </div>
  );

}
export default PatientsConsult;