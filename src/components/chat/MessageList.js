import React, { Component } from 'react'

export default class MessageList extends Component {
    constructor(props){
        super(props)
        this.state={
            username:''
        }
    }
    
    render() {
        function niceDate(str) {
            let date = new Date(str);
            let day =  (date.getDate() < 10 ? '0' : '' ) + date.getDate() + "-" + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getFullYear();
            let time = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return day + " - " + time + " -- ";
        }

        return (
            <div style={{padding:15}}>
                {this.props.messages.map((line, i) =>{
                    return <div style={{padding:3}} key={i}>{niceDate(line.date)} <span style={{fontWeight:'bold'}}>{line.fromUsername}</span> : {line.message}</div>
                })}
            </div>
        )
    }
}
