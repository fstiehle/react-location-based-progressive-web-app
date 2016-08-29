/*
 *	TableItem
 *	===========
 */
import React from 'react';

export default class Location extends React.Component {
    
    mToKm(m) {
        let km = m / 1000;
        return km + " KM";
    }
    
    render() {
        
        let mapsLink = "https://www.google.de/maps/place/" + this.props.address + "," + this.props.city;
        
        return <div className="content">
            <ul>
                <li className="icon-compass"></li>
            </ul>
            <ul className="address">
                <a target="_blank" href={mapsLink}><li>{this.props.city}</li>
                <li>{this.props.address}</li></a>
            </ul>
            <ul className="distance">
                <li>{this.mToKm(this.props.distance)}</li>
            </ul>
        </div>;
    }
}
