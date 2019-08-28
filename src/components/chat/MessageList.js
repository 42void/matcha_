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
            //console.log(str);
            let date = new Date(str);
            let day = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate();
            let time = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return day + " -- " + time + " -- ";
        }

        return (
            <div>
                {this.props.messages.map((line, i) =>{
                    return <div key={i}>{niceDate(line.date)} - {line.fromUsername} : {line.message}</div>
                })}
            </div>
        )
    }
}
