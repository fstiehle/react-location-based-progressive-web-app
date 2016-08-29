import React from 'react';

export default class Header extends React.Component {
    
    spinner() {
        if (this.props.loading == false) {
            return "idle";
        } else {
            return "spinning"; 
        }
    }
    
    render() {
        
        return <div id="header">
            <button className={this.spinner()} id="refresh" onClick={this.props.refresh}></button>
            <a target="_blank" href="https://foursquare.com/" id="attribution"><i className="icon-foursquare"></i></a>
        </div>;
    }
}
