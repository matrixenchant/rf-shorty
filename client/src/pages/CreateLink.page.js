import M from "materialize-css"
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CopyBtn } from "../components/CopyBtn"
import { AuthContext } from "../context/Auth.context"
import { useHttp } from "../hooks/http.hook"

export const CreateLinkPage = () => {
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [link, setLink] = useState('')
    const [created, setCreated] = useState(false)
    const [shortLink, setShortLink] = useState(null)

    const [name, setName] = useState('')
    const [inputClass, setInputClass] = useState('')

    const pressHandler = async () => {
        try {
            const Authorization = `Bearer ${auth.token}`
            const data = await request('/api/link/generate', 'POST', {from: link, name}, {Authorization})
            if (data.error === 'jwt expired') {
                auth.logout()
                M.toast({ html: 'Сеанс устарел, авторизуйтесь заново' })
                return
            }
            console.log(data)
            setCreated(true)
            setShortLink(data.link)
        } catch (e) {}
    }


    const changeHandler = (value) => {
        var res = value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
        if(res == null) {
            setInputClass('invalid')
            setLink(value)
        } else {
            setInputClass('valid')
            setLink(value)
        }
    }

    const autoName = async () => {
        try {
            const name = await request('http://textance.herokuapp.com/title/'+link, 'GET', null, {}, 'text')
            if (name) {
                setName(name)
                M.updateTextFields()
            }
            else throw new Error('Пустое имя')
        } catch (e) {
            console.log(e)
            M.toast({ html: 'Не удалось получить имя страницы' })
        }
    }

    return (
        <div className="row">
            <h1>Сократить ссылку</h1>
            <div className="col s12 m7">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <p>Введите вашу ссылку, чтобы получить ее укороченную версию</p>
                        </div>

                        {!created ?
                        (
                            <div className="card-action">
                                <div className="input-field">
                                    <input
                                        id="link"
                                        type="text" 
                                        className={"myInput "+ inputClass}
                                        name="link"
                                        value={link}
                                        onChange={e => changeHandler(e.target.value)}
                                        onKeyPress={e => { if (e.onKeyPress === "Enter") pressHandler() } }
                                        disabled={loading}
                                    />
                                    <label htmlFor="link">Ссылка</label>
                                    <span className="helper-text" data-error="Введите правильную ссылку"></span>
                                </div>
                                <div className="input-field">
                                    <input
                                        id="name" 
                                        type="text" 
                                        className="validate myInput"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        name="name"
                                        disabled={loading || (inputClass === 'invalid')}
                                    />
                                    <label htmlFor="name">Название</label>
                                </div>
                                <div style={{ display: 'flex', marginTop: 10 }}>
                                    <div 
                                        className="btn-flat"
                                        style={{ display: 'block', textAlign: 'center', border: '1px solid #ef6c00', color: '#ef6c00', width: '70%', marginRight: 5 }}
                                        onClick={pressHandler}
                                        disabled={loading || (inputClass === 'invalid') || !link}
                                    >
                                        Сократить
                                    </div>
                                    <div 
                                        className="btn-flat"
                                        style={{ display: 'block', textAlign: 'center', border: '1px solid #ef6c00', color: '#ef6c00', width: '30%' }}
                                        onClick={autoName}
                                        disabled={loading || (inputClass === 'invalid') || !link}
                                    >
                                        Авто-название
                                    </div>
                                </div>
                            </div>
                        ):
                        (
                            <div className="card-action">
                                <div>
                                    <p>Ваша ссылка:</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, marginRight: 10 }}>{shortLink?.to}</span>
                                        <CopyBtn text={shortLink?.to} />
                                        <Link to={'/detail/'+shortLink?._id}>
                                            <div style={{ marginLeft: 10 }} className="btn-floating pulse orange"><i className="material-icons white-text">info_outline</i></div>
                                        </Link>
                                    </div>
                                </div>

                                <div 
                                    className="btn-flat"
                                    style={{ display: 'block', textAlign: 'center', border: '1px solid #ef6c00', color: '#ef6c00', marginTop: 10 }}
                                    onClick={() => setCreated(false)}
                                >
                                    Сократить еще
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

