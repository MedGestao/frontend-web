import './styles.css'
import { Link } from 'react-router-dom';
import LogoImage from "../../assets/logo.svg"

const Header = () => {
  return (
    <header>
      <img src={LogoImage} alt="MedGestão" />
    </header>
  );
};

export default Header;
