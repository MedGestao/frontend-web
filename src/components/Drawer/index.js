import LogoImage from "../Drawer/logo.svg";
import './style.css';
import Card from '../card';
import logoutImg from '../../assets/logoutIcon.svg'
import { Link, useNavigate } from 'react-router-dom'

function Drawer(props) {

  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear();
    navigate("/")
  }
  return (

    <div className="drawer" >
      <div style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '95%'
      }}>
        <div>
          <img src={LogoImage} alt="MedGestão" />
        </div>
        <div className="options">
          <h3 className={`op ${props.isActive === false ? 'active' : ''}`} onClick={props.desactive}>Consultas</h3>
          <h3 className={`op2 ${props.isActive === true ? 'active' : ''}`} onClick={props.active} >Histórico</h3>
        </div>

        <div className="center">
          <Card doctor={props.doctor} />
        </div>
      </div>
      <div className="cardLogout" onClick={logout}>
        Sair
        <img src={logoutImg} style={{ width: '20px', transform: 'rotate(180deg)' }} />
      </div>

    </div>
  );

}
export default Drawer;

