import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

import DoctorsImage from "../../assets/login-image.svg"
import Input from '../../components/Input'
import './styles.css'
import Header from '../../components/Header'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleLogin = (data) => {
    console.log(data)
    /* localStorage.setItem("mykey","myvalue"); */

    reset()
    navigate("/dashboard")
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
