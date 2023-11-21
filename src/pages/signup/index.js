import { useForm } from "react-hook-form";

import Input from '../../components/Input';
import './styles.css';
import InputWithMask from '../../components/InputWithMask';
import Header from "../../components/Header";
import Select from "../../components/Select";

function Signup() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleLogin = (data) => {
    console.log(data);
    /* localStorage.setItem("mykey","myvalue"); */
    reset()
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
              name="password"
              label="Senha"
              placeholder="********"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <Input
              name="verify-password"
              label="Confirmar senha"
              placeholder="********"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />
          </div>
          
          <div className="second-column">
            <Input
              name="crm"
              label="CRM"
              placeholder="13342"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <Select
              name="specialty"
              label="Especialidade"
              placeholder="Especialidade"
              values={["Ginecologista", "Cardiologista"]}
              errors={errors}
              register={register}
              validationSchema={{ required: "Selecione uma opção" }}
            />

            <InputWithMask
              name="phone"
              mask="(99) 99999-9999"
              label="Telefone"
              placeholder="Telefone"
              errors={errors}
              register={register}
              validationSchema={{ 
                required: true, 
                pattern: /^(\(\d{2}\) )\d{5}-\d{4}$/ 
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
