import React, {Component} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { v4 as uuid} from 'uuid';
import Message from "./Messages";
import Card from "./Card";
import QuickReplies from "./QuickReplies";


const  cookies  = new Cookies();

class EduBot extends Component{

    messagesEnd;
    talkInput;

    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this); //quick reply
        // Close Button
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.state={
            messages:[],
            showBot :true
        };
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), {path: '/'});
        }
        console.log(cookies.get('userID'));
        // throw cookies identity on console.
    }

    async df_text_query(text){
        let says ={
            speaks:'me',
            msg:{
                text:{
                    text:text
                }
            }

        };
        this.setState({messages:[...this.state.messages,says]});
        const res = await axios.post('/api/df_text_query',{text: text, userID: cookies.get('userID')});

        // look for messages using for loop
        for (let  msg of res.data.fulfillmentMessages){
            says = {
                speaks: 'EBot',
                msg:msg
            }
            this.setState({messages:[...this.state.messages,says]});


        }


    };



    async df_event_query(event){
        const res = await axios.post('/api/df_event_query', {event:event,  userID: cookies.get('userID')});

// Left Right Orientation solved here at speaks.
        for (let msg of res.data.fulfillmentMessages){
            let says={
                speaks:'EBot',
                msg:msg
            };
            this.setState({messages:[...this.state.messages,says]});
        }
    };

    componentDidMount() {
        this.df_event_query('welcome');
    };

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: true});
    };

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    };

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();
        this.df_text_query(text);
    }



    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light waves-yellow">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies
        ) {
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        }
    }



    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
            });
        } else {
            return null;
        }
    }

    // allowing EduBot to Take Input
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }


// Moved Headline to out of bot section to view permanent.
    render() {
        if (this.state.showBot) {
            return (
                <div style={{backgroundColor:'#808080', minHeight: 500, maxHeight: 500, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper" style={{backgroundColor:'#436091'}}>
                            <a href="/" className="brand-logo">EduBot</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>Close</a></li>
                            </ul>
                        </div>
                    </nav>

                    <div id="EduBot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto'}}>

                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                        style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>
                    <div className=" col s12" >
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%', backgroundColor:'#436091', fontWeight:'1000'}} ref={(input) => { this.talkInput = input; }} placeholder="Type your Query..."  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                    </div>

                </div>
            );
        } else {
            return (
                <div style={{ minHeight: 40, maxHeight: 500, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper" style={{backgroundColor:'#436091'}} >
                            <a href="/" className="brand-logo">EduBot</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                </div>
            );
        }
    }
}

//                     // Bug Solved here. Enter key was appearing Twice. // Bug Solved Here Above statement was repeated twice.
export default EduBot;