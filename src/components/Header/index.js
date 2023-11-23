import './styles.css'
import { Link } from 'react-router-dom';
import LogoImage from "../../assets/logo.svg"

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={LogoImage} alt="MedGestão" />
      </Link>
    </header>
  );
};

export default Header;
