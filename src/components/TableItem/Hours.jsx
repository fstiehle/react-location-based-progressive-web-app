/*
 *	TableItem
 *	===========
 */
import React from 'react';

export default class Hours extends React.Component {
    
    render() {
        
        return <div className="content">
            <ul>
                <li><i className="icon-clock"></i>{this.props.hours}</li>
            </ul>
        </div>;
    }
}