import style from './Login.module.css';

import { useState, useEffect } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const { login, error: authError, loading } = useAuthentication();
  
    const handleSubmit =  async (e)=> {
      e.preventDefault();
      setError('');
  
      const user = {
        email,
        password
      }
  
      const res = await login(user);
  
      console.log(user);
    };
  
    useEffect(() => {
      if (authError) {
        setError(authError);
      }
    }, [authError])
  

  return (
    <div className={style.login}>
     <h1>Login de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input 
          type="email" 
          name="email" 
          required placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
          type="password" 
          name="password" 
          required placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && <button className="btn" disabled>Carregando...</button>}
        {/* Exibe mensagem de erro, se houver */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login