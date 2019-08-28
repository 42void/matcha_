import React, { Component } from 'react'

export default class ChatUserButton extends Component {
    render() {
        return (
            <button onClick={this.props.changeCurrent} style={{ width: '100%', height: 80, backgroundColor: this.props.isCurrent ? 'rgb(140, 255, 150)' : 'honeydew', display: 'flex' }}>
                <div style={{ width: '30%', backgroundColor: 'cadetblue' }}>photo</div>
                <div style={{ width: '70%', fontWeight: this.props.isCurrent ? 'bold' : 'normal' }}>{this.props.username}</div>
            </button>
        )
    }
}


