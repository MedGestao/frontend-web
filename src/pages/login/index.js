import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

import DoctorsImage from "../../assets/login-image.svg"
import Input from '../../components/Input'
import './styles.css'
import Header from '../../components/Header'
import { BackendClient } from '../../service/client'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [hasError, setHasError] = useState(false)

  const handleLogin = async (data) => {
    console.log(data)
    try {
      var response = await BackendClient.post('/api/doctors/login', data)
      console.log(response.data.message)

      localStorage.setItem("doctor_id", response.data.id);

      setHasError(false)
      reset()
      navigate("/dashboard")
    } catch (exception) {
      setHasError(true)
    }
  }

  return (
    <>
      <Header />
      <main className="login-container">
        <section className="form">
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Fazer login</h1>

            <Input
              name="email"
              label="E-mail"
              autoComplete="off"
              placeholder="exemplo@gmail.com"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  }}
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              placeholder="********"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            {hasError && <span className="error">E-mail ou Senha inválidos</span>}

            <button type="submit">Entrar</button>
          </form>

          <Link className="link" to="/signup">
            Cadastre-se
          </Link>
        </section>

        <img className='login-img' src={DoctorsImage} alt="Médicos" />
      </main>
    </>
  );
}

export default Login;
