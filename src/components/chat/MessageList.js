import React, { Component } from 'react'

export default class MessageList extends Component {
    constructor(props){
        super(props)
        this.state={
            username:''
        }
    }
    
    render() {
        return (
            <div>
                {this.props.messages.map((line, i) =>{
                    return <div key={i}>{line.username} : {line.message}</div>
                })}
            </div>
        )
    }
}
