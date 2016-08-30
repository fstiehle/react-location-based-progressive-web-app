/*
 *	TableItem
 *	===========
 */
import React from 'react';

export default class Website extends React.Component {
    
    render() {
        return <div className="content">
            <ul>
                <li>
                    <i className="icon-link"></i>
                    <a target="_blank" href={this.props.url}>{this.props.url}</a>
                </li>
            </ul>
        </div>;
    }
}
