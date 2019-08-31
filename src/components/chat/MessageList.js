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
            let day =  date.getDate() + "-" + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getFullYear();
            let time = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return day + " -- " + time + " -- ";
        }

        return (
            <div>
                {this.props.messages.map((line, i) =>{
                    return <div key={i}>{niceDate(line.date)} {line.fromUsername.toUpperCase()} : {line.message}</div>
                })}
            </div>
        )
    }
}
