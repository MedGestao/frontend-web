import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from "../assets/logo.svg";
import Input from '../components/Input';
import './styles.css';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [crm, setCrm] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')

  return (
    <>
      <header>
        <img src={LogoImage} alt="MedGestão" />
      </header>
      <main className="register-container">
        <h1>Cadastro médico</h1>
        <form>

          <div className="first-column">
            <Input
              name="Nome"
              label="Nome Completo"
              placeholder="Fulano de tal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <div className="group-inputs">
              <Input
                name="cep"
                label="CEP"
                placeholder="57304-467"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <Input
                name="number"
                label="Número"
                placeholder="467"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="second-column">
            <Input
              name="CRM"
              label="CRM"
              placeholder="13342"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
            />

            <Input
              name="Especialidade"
              label="Especialidade"
              placeholder="Especialidade"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />

            <Input
              name="Telefone"
              label="Telefone"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Link className="link" to="/register-second-step">
              <button type="submit">Próxima etapa</button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Register;
