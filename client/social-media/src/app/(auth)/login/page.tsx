'use client'

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
// import AuthPage from '../layout';
import AuthInput from '../../../components/AuthInput';
import AuthButton from '../../../components/AuthButton';
import { makeRequest } from '../../../../axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter()

  const { setUser } = useContext(UserContext)

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    makeRequest
      .post('auth/login', { email, password })
      .then((res) => {
        router.push('/main')
        localStorage.setItem('rede-social:user', JSON.stringify(res.data.user))
        setSuccess(res.data.msg);
        setError('')
        setUser(res.data.user)
      }).catch((err) => {
        console.log(err);
        setError(err.response.data.msg)
        setSuccess('');
      })
  }

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);

  console.log(email, password);

  return (
    // <AuthPage> //O que era o Componente AuthPage, agora é o layout dentro da pasta (auth). Que considera auth como uma rota, 
    // ignorando a palavra na URL e utilizando o arquivo layout dentro da mesma como componente pai para englobar as rotas filhas
    <>
      <h1 className='font-bold text-2x text-gray-700 text-2xl font-mono'>Login</h1>
      <AuthInput label='Email' newState={setEmail}></AuthInput>
      <AuthInput label='Senha' newState={setPassword} isPassword autoComplete={false}></AuthInput>
      <AuthButton texto="Entrar" isFormValid={isFormValid} handleFunction={handleLogin} />
      <div className='text-center underline text-blue-500 mt-2 text-sm sm:text-blue-100'>
        <Link href="/register">Cadastrar-se</Link>
      </div>
      {error && <span className="text-red-700 mt-2">* {error}</span>}
      {success && <span className="text-green-700 mt-2">* {success}</span>}
    </>
    // </AuthPage >
  );
};

export default Login;
