import LogoImage from "./logomedical.svg";
import arrow from "./icon.svg";
import './style.css';

const PatientsConsult = (props) => {
  return (
    <div className="patientsConsultsCard" >
      <div className="patientsConsultsCardText">
        <img className="patientImg" src={LogoImage} />

        <div>
          <span>{props.consult.name}</span>
          <br />
          <span className="titleAnotation">Anotações</span>
        </div>
      </div>
      <img src={arrow} />
    </div>
  );

}
export default PatientsConsult;