import React, { Component } from 'react'
import Menu from "../Menu"
import MessageList from '../chat/MessageList';
import ChatUserButton from './ChatUserButton';
const io = require('socket.io-client');
let socket = undefined;
const axios = require('axios');

export default class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            chatLines: [],
            chatUsers: [],
            currentRecipient: '',
            noConv: true,
        }
    }


    componentWillMount() {
        socket = io.connect('http://localhost:4000');
        if (this.props.location.aboutProps) {
            this.setState({
                currentRecipient: this.props.location.aboutProps.username,
                noConv: false
            })
        }
    }

    componentDidMount() {
        socket.on("chat message", ({from, message}) => {
            this.setState({ chatLines: [...this.state.chatLines,{ username:from, message}] })
        })
        axios('http://localhost:4000/getAllConversations', {
            method: "post",
            data: this.state.currentRecipient,
            withCredentials: true
        })
            .then((res) => {
                res.data.map(conv => {
                    return axios.get(`http://localhost:4000/users/${conv.user_id}`, { withCredentials: true })
                        .then((res) => {
                            return this.setState({ chatLines: [...this.state.chatLines, { username: res.data[0].username, message: conv.message }] })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        socket.off('chat message');
    }

    handleChange = e => this.setState({ text: e.target.value })

    handleSubmit = e => {
        e.preventDefault();
        // var today = new Date();
        // var date = today.getFullYear() + '-' + (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + today.getDate();
        // var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        // var dateTime = date + " -- " + time + " -- ";
        // this.setState({
        //     chatLines: [...this.state.chatLines,
        //     <div key={today.getFullYear() + today.getMonth() + today.getDate() + today.getMinutes() + today.getSeconds()} style={{ margin: 10 }}>
        //         <span>{dateTime}</span>
        //         <span style={{ color: 'yellow', fontWeight: 'bold', textTransform: 'uppercase' }}>
        //             {/* {this.props.USER_BY_ID.getUserById[0].username} */}
        //             Denis
        //         </span>
        //         <span>:{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>
        //         <span style={{ fontWeight: 'bold' }}>{this.state.text}</span>
        //     </div>],
        //     text: ''
        // })

    }

    sendMessage = (msg) => {
        let to = this.state.currentRecipient
        socket.emit('chat message', { to, message: msg });
    }

    displayChatUserButtons = () => {
        if (this.state.currentRecipient !== "" && this.state.chatUsers.length <= 0) {
            return <ChatUserButton username={this.state.currentRecipient} />
        } else if (this.state.chatUsers.length > 0) {
            this.state.chatUsers.map((user) => {
                return <ChatUserButton id={user.id} />
            })
        }
    }

    render() {
        return (
            <div>
                <Menu />
                <div style={{ marginTop: '2rem', maxWidth: '1440px', margin: '2rem auto' }}>
                    {!this.state.noConv ?
                        <div style={{ display: 'flex', backgroundColor: 'aliceblue', overflow: 'scroll' }}>
                            <div style={{ backgroundColor: 'bisque', flex: 2, minHeight: 700, minWidth: 200, overflow: 'scroll' }}>
                                {this.displayChatUserButtons()}

                            </div>
                            <div id={"chatContainer"} style={{ backgroundColor: 'chocolate', position: 'relative', flex: 7, minHeight: 700, minWidth: 400 }}>

                                <MessageList messages={this.state.chatLines} />

                                <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex' }}>
                                    <form style={{ width: '100%' }}
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            this.setState({ text: '' });
                                            this.sendMessage(this.state.text)
                                        }}
                                    >
                                        <input value={this.state.text} onChange={(e) => { this.handleChange(e) }} style={{ width: '90%', height: 40, padding: 10, color: '#3d3d3f' }}></input>
                                        <button style={{ width: '10%', height: 40, border: 'none' }}>Envoyer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        : <div style={{ "display": "flex", "justifyContent": "center", "alignContent": "center", "height": "100%", "width": "100%", "fontSize": "18px" }}>No conversation yet</div>}
                </div>
            </div>
        )
    }
}