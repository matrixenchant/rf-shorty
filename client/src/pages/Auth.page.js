import M from 'materialize-css'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { loading, request } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
      console.log('Data: ', data)

      if (Array.isArray(data.message))
      data.message?.map( e => M.toast({ html: e }) )
      else
      M.toast({ html: data.message })
    } catch (e) {
      console.log(e.message)
      M.toast({ html: 'Произошла ошибка, попробуйте еще раз' })
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
      console.log('Data: ', data)

      auth.login(data.token, data.userId)

      if (Array.isArray(data.message))
      data.message?.map( e => M.toast({ html: e }) )
      else
      M.toast({ html: data.message })
    } catch (e) {
      console.log(e.message)
      M.toast({ html: 'Произошла ошибка, попробуйте еще раз' })
    }
  }

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Вход в систему</h3>
      <div className='row'>
      <form className="card col s5" style={{ padding: '15px', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', float: 'initial', marginTop: 50 }}>

        <div className="input-field">
          <input 
            id="email" 
            type="email" 
            className="validate myInput" 
            name="email"
            value={form.email}
            onChange={changeHandler}
          />
          <label htmlFor="email">Электронная почта</label>
        </div>

        <div className="input-field">
          <input 
            id="password" 
            type="password" 
            className="validate myInput"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
          <label htmlFor="password">Пароль</label>
        </div>

        <div 
          className="btn orange"
          style={{ display: 'block', boxShadow: 'none' }}
          onClick={loginHandler}
          disabled={loading}
        >
          Войти
        </div>
        <div 
          className="btn-flat"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #ef6c00', color: '#ef6c00', marginTop: 10 }}
          onClick={registerHandler}
          disabled={loading}
        >
          Новый пользователь
        </div>
        
      </form>
      </div>
    </>
  )
}