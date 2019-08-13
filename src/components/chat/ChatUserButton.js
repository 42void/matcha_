import React, { Component } from 'react'

export default class ChatUserButton extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: 80, backgroundColor: 'honeydew', display: 'flex' }}>
                <div style={{ width: '30%', backgroundColor: 'cadetblue' }}>photo</div>
                <div style={{ width: '70%' }}>{this.props.username}</div>
            </div>
        )
    }
}


