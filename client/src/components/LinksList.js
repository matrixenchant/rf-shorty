import React from "react"
import { CopyBtn } from "./CopyBtn"
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
    if (!links.length) return (
        <>
            <h3 style={{ marginTop: '5rem', textAlign: 'center' }}>У вас пока нету сохранненых ссылок</h3>
            <Link to='/create'>
                <div style={{ display: 'block', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', marginTop: '3rem' }} className="btn-large waves-effect waves-light orange"><i className="material-icons right">control_point</i>Создать</div>
            </Link>
        </>
    )

    return (
        <table style={{ marginTop: '2rem' }}>
        <thead>
          <tr>
              <th>Название</th>
              <th>Сокращенная ссылка</th>
              <th>Кол-во кликов</th>
              <th>Подробнее</th>
          </tr>
        </thead>

        <tbody>
        {links.map(link =>
            (
            <tr key={link._id.toString()}>
                <td>{link.name}</td>
                <td>
                    <a target="_blank" href={link.to} style={classLink} rel="noreferrer">{link.to}</a>
                    <CopyBtn small="true" text={link.to} />
                </td>
                <td>{link.clicks}</td>
                <td>
                    <Link to={'/detail/'+link._id}>
                        <div className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">open_in_new</i></div>
                    </Link>
                </td>
            </tr>
            )    
        )}
        </tbody>
      </table>
    )
}

const classLink = {
    textDecoration: 'underline',
    color: '#448aff',
    marginRight: 8
}
