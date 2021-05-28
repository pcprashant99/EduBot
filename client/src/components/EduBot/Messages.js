import React from 'react';
import Linkify from 'react-linkify';

const componentDecorator = (href, text, key) => (
    <a className="linkify__text" href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
    </a>
);


const Message = (props) => {
    return (

        <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks==='EBot' &&
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
                    </div>
                    }
                    <div className="col s10">
                      <span className="black-text">
                        {
                            <Linkify componentDecorator={componentDecorator}>
                                {props.text}
                            </Linkify>
                        }
                      </span>
                    </div>
                    {props.speaks==='me' &&
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light blue">{props.speaks}</a>
                    </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Message;
