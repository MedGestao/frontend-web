import './styles.css';

import LogoImage from "../../assets/logo.svg";

function Dashboard() {
  return (
    <main className="appointments-container">
      <div className="menu">
        <img src={LogoImage} alt="MedGestão" />

        <div className="navbar">
          <li className='selected'>Consultas</li>
          <li>Histórico</li>
        </div>

        <div className="user">
          
        </div>
      </div>

    </main>
  );
}

export default Dashboard;
