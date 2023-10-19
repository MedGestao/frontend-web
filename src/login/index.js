import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from "../assets/logo.svg";
import DoctorsImage from "../assets/login-image.svg";
import Input from '../components/Input';
import './styles.css';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <header>
          <img src={LogoImage} alt="MedGestão" />
        </header>
      <main className="login-container">
        <section className="form">
          <form>
            <h1>Fazer login</h1>

            <Input
              name="E-mail"
              label="E-mail"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              name="Senha"
              label="Senha"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Entrar</button>
        
          </form>

          <Link className="link" to="/register">
            Cadastre-se
          </Link>
        </section>

        <img src={DoctorsImage} alt="Médicos" />
      </main>
    </>
  );
}

export default Login;
