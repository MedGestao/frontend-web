import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'

import Input from '../../components/Input';
import InputWithMask from '../../components/InputWithMask';
import Header from "../../components/Header";
import Select from "../../components/Select";
import './styles.css';

const PHONE_PATTERN = /^(\(\d{2}\) )\d{5}-\d{4}$/

function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

  const handleLogin = (data) => {
    console.log(data);
    /* localStorage.setItem("mykey","myvalue"); */
    
    /* reset()
    navigate("/signup-second-step") */
  }

  return (
    <>
      <Header />
      <main className="register-container">
        <h1>Cadastro médico</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="first-column">
            <Input
              name="name"
              label="Nome Completo"
              placeholder="Fulano de tal"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <Input
              name="email"
              label="E-mail"
              placeholder="exemplo@gmail.com"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true,   
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
              }}
            />

            <Input
              name="crm"
              label="CRM"
              placeholder="13342"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <InputWithMask
              name="cpf"
              mask="999.999.999-99"
              label="CPF"
              placeholder="999.999.999-99"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true, 
                pattern: /^\d{3}.\d{3}.\d{3}-\d{2}$/
              }}
            />
          </div>
          
          <div className="second-column">
            <Select
              name="specialty"
              label="Especialidade"
              placeholder="Especialidade"
              values={["Ginecologista", "Cardiologista"]}
              errors={errors}
              register={register}
              validationSchema={{ required: "Selecione uma opção" }}
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

            <Input
              name="verifyPassword"
              label="Confirmar senha"
              type="password"
              placeholder="********"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true, 
                validate: (value) => {
                if (watch('password') !== value) {
                  return "As senhas que você escreveu não correspondem";
                }
              }}}
            />

            <InputWithMask
              name="phone"
              mask="(99) 99999-9999"
              label="Telefone"
              placeholder="(99) 99999-9999"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true, 
                pattern: PHONE_PATTERN
              }}
            />

            <button type="submit">Próxima etapa</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Signup;
