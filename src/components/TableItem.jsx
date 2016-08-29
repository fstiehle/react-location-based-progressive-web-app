/*
 *	Table Item
 *	===========
 */
import React from 'react';

import Rating from './TableItem/Rating.jsx'
import Location from './TableItem/Location.jsx'
import Hours from './TableItem/Hours.jsx'
import Website from './TableItem/Website.jsx'

export default class TableItem extends React.Component {
    
    renderList() {
        var list = [];
        
        if (this.props.data.hours && this.props.data.hours.status) {
            list.push(<Hours key="hours" hours={this.props.data.hours.status}/>);
        }
        if (this.props.data.url) {
            list.push(<Website key="website" url={this.props.data.url}/>);
        }
        if (this.props.data.rating) {
            list.push(<Rating key="rating" rating={this.props.data.rating}/>);
        }

        return list;
    }

    render() {
        
        //check for mandatory data
        if (!this.props.data.name || !this.props.data.location || !this.props.data.location.city
            || !this.props.data.location.address) {
            console.log("Entry missing mandatory data: " . this.props.data.id);
            return;
        }

        return <div className="item">
            <div className="list-item">
                <ul className="name">
                    <li>{this.props.data.name}</li>
                </ul>
                
                <Location city={this.props.data.location.city} address={this.props.data.location.address} 
                    distance={this.props.data.location.distance}/>

                {this.renderList()}
                    
            </div>    
        </div>;
    }
}
