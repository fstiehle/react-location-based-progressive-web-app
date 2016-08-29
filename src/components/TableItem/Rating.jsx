/*
 *	Rating
 *	===========
 */
import React from 'react';

import Star from './Rating/Star.jsx';
import StarEmpty from './Rating/StarEmpty.jsx';

export default class Rating extends React.Component {
    
    renderRating() {
        let rating = Math.round(this.props.rating),
            empty = 10 - rating,
            i = 0;
        
        var list = [];
        
        for (i = 0; i < rating; i++) {
            list.push(<Star key={i}/>);       
        }        
        for (let j = 0; j < empty; j++) {
            list.push(<StarEmpty key={i + j}/>);       
        }
        
        return list;
    }
    
    render() {
            
        return <div className="content">
            
            <ul className="rating">
                {this.renderRating()}
            </ul>
            
        </div>;
    }
}
