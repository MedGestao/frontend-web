import { useMemo, useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'

import { ViaCepClient } from '../../service/client'

import Input from '../../components/Input';
import InputWithMask from '../../components/InputWithMask';
import Header from "../../components/Header";
import Select from "../../components/Select";
import './styles.css';

const PHONE_PATTERN = /^(\(\d{2}\) )\d{5}-\d{4}$/
const ZIP_CODE_PATTERN = /^\d{5}-\d{3}$/

function Edit() {
  const navigate = useNavigate()
  const [address, setAddress] = useState({
    "cep": "",
    "logradouro": "",
    "bairro": "",
    "uf": ""
  })
  const { register, handleSubmit, watch, clearErrors, setError, reset, formState: { errors } } = useForm()
  const watchZipCode = watch('zipCode', '')

  useEffect(() => {
    if (watchZipCode.match(ZIP_CODE_PATTERN))
      getAddressByZipCode(watchZipCode)
  }, [watchZipCode]);

  const getAddressByZipCode = (zipCode) => {
    if (zipCode !== null) {
      const cleanZipCode = zipCode.replace(/\D/g, '');
      ViaCepClient.get(`/${cleanZipCode}/json`).then((response) => {
        if (response.data.erro === true) {
          setAddress({
            "cep": "",
            "logradouro": "",
            "bairro": "",
            "uf": ""
          })
          setError('zipCode', { type: 'custom', message: 'CEP inválido' })
          return
        }
        clearErrors('zipCode')
        setAddress(response.data);
      })
    }
  }

  const handleEdit = (data) => {

    /* localStorage.setItem("mykey","myvalue"); */

    navigate("/signup-second-step", {
      state: data
    })
  }

  return (
    <>
      <Header />
      <main className="register-container">
        <h1>Cadastro médico</h1>
        <form onSubmit={handleSubmit(handleEdit)}>
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

            <InputWithMask
              name="zipCode"
              label="CEP"
              mask="99999-999"
              placeholder="57304-467"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                pattern: ZIP_CODE_PATTERN
              }}
            />

            {address.logradouro !== '' && <div className="address-details">
              <p>{address.logradouro} - {address.bairro} - {address.localidade}/{address.uf} </p>
            </div>}

            <Input
              name="number"
              label="Número"
              placeholder="467"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />
          </div>

          <div className="second-column">
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
              name="crm"
              label="CRM"
              placeholder="13342"
              errors={errors}
              register={register}
              validationSchema={{ required: true }}
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              placeholder="********"
              errors={errors}
              register={register}
              validationSchema={{ required: true, maxLength: 8, minLength: 8 }}
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
                maxLength: 8,
                minLength: 8,
                validate: (value) => {
                  if (watch('password') !== value) {
                    return "As senhas que você escreveu não correspondem";
                  }
                }
              }}
            />

            <button type="submit">Próxima etapa</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Edit;
