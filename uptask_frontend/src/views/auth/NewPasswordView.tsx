import NewPasswordToken from "@/componets/auth/NewPasswordToken"
import NewPasswordForm from "@/componets/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"
import { useMutation } from "@tanstack/react-query"

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <h1 className="text-3xl font-black text-black">Reestablecer Contraseña</h1>
      <p className="text-1xl font-light text-black mt-5">
        Ingresa el código que recibiste por email {''}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>   
      {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />: 
      <NewPasswordForm token={token}/>} 
    </>
  )
}
