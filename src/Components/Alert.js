import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div>
            <div class={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.msg}
            </div>
        </div>
    )
}
