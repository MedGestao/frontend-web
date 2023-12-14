import LogoImage from "./peopleIcon.svg";
import listIcon from './listIcon.svg'
import './style.css';

const FollowUp = (props) => {
  let cor = ''
  let size = '15px'
  if (props.type === 'people') {
    cor = '#1BE29A';
  }
  else if (props.type === 'consult') {
    cor = '#FFFFFF'
    size = '12px'
  }
  else {
    cor = '#EB996E'
  }
  return (

    <div className="followUp" >
      <div className="followUpBox">
        <div>
          {props.type != 'consult' ? <img className="" src={LogoImage} alt='icon' /> : <img className="" src={listIcon} alt='icon' />}
        </div>
        <span style={{ color: cor, fontSize: size }} >{props.title}</span>
      </div>
      <span className="valueCard">{props.total ? props.total : 0}</span>
    </div>
  );

}
export default FollowUp;

