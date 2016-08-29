/*
 *	TableItem
 *	===========
 */
import React from 'react';

export default class Hours extends React.Component {
    
    render() {
        
        return <div className="content">
            <ul>
                <li className="icon-clock"></li>
            </ul>
            <ul>
                <li>{this.props.hours}</li>
            </ul>
        </div>;
    }
}