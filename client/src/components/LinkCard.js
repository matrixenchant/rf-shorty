import React from "react"
import { CopyBtn } from "./CopyBtn"
import { format } from "date-fns"
const { ru } = require('date-fns/locale');

export const LinkCard = ({ link }) => {
    return (
        <ul className="collection with-header" style={{ marginTop: '5rem' }}>
            <li className="collection-header">
                <h4>{link.name}</h4>
            </li>
            <li className="collection-item" style={{ display: 'flex', alignItems: 'baseline' }}>
                Ссылка: 
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
                    <a target="_blank" href={link.to} rel="noreferrer"><span style={classLink}>{link.to}</span></a>
                    <CopyBtn small="true" text={ link.to } />
                </div>
            </li>
            <li className="collection-item">Источник: <a target="_blank" href={link.from} style={classLink} rel="noreferrer">{link.from}</a></li>
            <li className="collection-item">Количество кликов: <span style={{ fontWeight: 600 }}>{link.clicks}</span></li>
            <li className="collection-item">Дата создания: <span>{format(new Date(link.date), "do LLLL Y, HH:MM", {locale: ru})}</span></li>
        </ul>
    )
}

const classLink = {
    textDecoration: 'underline',
    color: '#448aff',
    marginRight: 15
}