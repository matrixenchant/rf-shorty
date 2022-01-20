import M from "materialize-css";
import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard'

export const CopyBtn = ({ text, style, small = false }) => {
    return (
        <CopyToClipboard
            text={text}
            onCopy={() => M.toast({ html: 'Скопировано' })}
            style={style}
            >
            <div className={`btn-floating ${small && 'btn-small'} orange`}><i className="material-icons white-text">content_copy</i></div>
        </CopyToClipboard>
    )
}