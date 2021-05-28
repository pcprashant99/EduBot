import React from 'react';


const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <a style={{ margin: 3}}  href="/" className="btn-floating btn-large waves-effect waves-green"
               onClick={(event) =>
                   props.click(
                       event,
                       props.reply.structValue.fields.payload.stringValue,
                       props.reply.structValue.fields.text.stringValue
                   )
               } target="_blank" rel="noopener noreferrer">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else {
        return (
            <a style={{ margin: 3}} href={props.reply.structValue.fields.link.stringValue}
                className="btn-floating btn-large waves-effect waves-green" target="_blank" rel="noopener noreferrer">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    }

};
// added  target={"_blank"}  to solve on click issues. prashant
export default QuickReply;