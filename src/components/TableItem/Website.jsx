/*
 *	TableItem
 *	===========
 */
import React from 'react';

export default class Website extends React.Component {
    
    render() {
        return <div className="content">
            <ul>
                <li className="icon-link"></li>
            </ul>
            <ul>
                <li><a target="_blank" href={this.props.url}>{this.props.url}</a></li>
            </ul>
        </div>;
    }
}
