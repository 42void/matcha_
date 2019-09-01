import React, { Component } from 'react'

export default class ChatUserButton extends Component {
    render() {
        let backgroundColor = this.props.isCurrent ? 'rgb(140, 255, 150)' : '#fff';
        let fontWeight = this.props.isCurrent ? 'bold' : 'normal';
        return (
            <button onClick={this.props.changeCurrent} style={{border: 'gray 0.5px solid', width: '100%', height: 80, display: 'flex',padding: 0, alignItems: 'center', backgroundColor}}>
                <div style={photo}>photo</div>
                <div style={{ width: '70%', fontWeight}}>{this.props.username}</div>
            </button>
        )
    }
}

const photo = {
    display: "flex",
    width: "30%",
    backgroundColor: "cadetblue",
    justifyContent: "center",
    alignItems: "center",
    height:79,
}
    