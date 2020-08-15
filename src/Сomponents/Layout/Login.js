import React, {useState, useContext} from 'react'
import AuthContext from '../Context/authContext/authContext'
import Spinner2 from '../Layout/Spinner2'

const Login = () => {

  const authContext = useContext(AuthContext)

  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')

  const onLogin = (e) => {
    e.preventDefault()
    authContext.loginUser(login, pass)
    setLogin('')
    setPass('')
    console.log('login form submitted')
  }

  return (
    <div id="login">
      {authContext.loading && <Spinner2 /> }
      <h6>Авторизация пользователя</h6>
      <form onSubmit={onLogin}>
        <label htmlFor="login">Логин</label>
        <input 
          placeholder="Логин" 
          type="text" 
          className="validate"
          name='login'
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
          />
          <label htmlFor="pass">Пароль</label>
          <input 
          placeholder="Пароль" 
          type="text" 
          className="validate"
          name='pass'
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
          />
          <button 
            className="btn waves-effect waves-light" 
            type="submit">
            Войти
          </button> 
      </form>
    </div>
  )
}

export default Login
