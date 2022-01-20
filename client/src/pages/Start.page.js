import React from "react"
import { Link } from "react-router-dom"

export const StartPage = () => {
    console.log('startPage')
    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: 72, fontWeight: 600, marginTop: '20%' }}>Shorty</h1>
            <h4 style={{ textAlign: 'center' }}>Сокращайте свои ссылки быстро и бесплатно!</h4>
            <Link to="auth">
                <div className="waves-effect waves-light btn-large orange" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, display: 'block', width: 'fit-content' }}>Начать!</div>
            </Link>
        </div>
    )
}