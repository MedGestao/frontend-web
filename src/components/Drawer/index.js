import LogoImage from "../Drawer/logo.svg";
import './style.css';
import Card from '../card';

function Drawer() {
  return (

    <div className="drawer" >

      <div>
        <img src={LogoImage} alt="MedGestão" />
      </div>
      <div className="options">
        <h3 className="op">Consultas</h3>
        <h3 className="op2">Histórico</h3>
      </div>

      <div className="center">
        <Card />
      </div>

    </div>
  );

}
export default Drawer;

