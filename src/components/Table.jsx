/*
 *	Table View
 *	===========
 */
import React from 'react';

import TableItem from './TableItem.jsx'

export default class Table extends React.Component {
    
    renderItems() {
        var list = [];
        
        for (let i of this.props.data) {
            if (!i.venue || !i.venue.id) {
                console.log("Venue data not available");
                continue;
            }
            list.push(<TableItem key={i.venue.id} data={i.venue}/>);       
        }
        return list;
    }

    render() {
            
        return <div id="table">
            {this.renderItems()}
        </div>;
    }
}
