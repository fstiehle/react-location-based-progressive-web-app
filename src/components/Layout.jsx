import React from 'react';

import Header from './Header.jsx';
import Table from './Table.jsx';

import * as Util from '../Util.js';

/**
 * Default configuration for api call to foursquare
 */
const api = {
    key: "client_secret=1VNDHX2PDK0ZLPMRZZYWUQ43CWSJKKLVEGPYOWP5INIDCY1C",
    id: "client_id=I1LMGAMRCYTC2LKPA3G0WUIPV1S4L4HU4YIUIMML1KWOAUS2",
    url: "https://api.foursquare.com/v2/venues/explore",
    query: "query=sushi",
    limit: "limit=14",
    version: "v=20140806"
}

export default class Layout extends React.Component {
    
    constructor() {
        super();      
        
        this.state = {
            data: "",
            loading : true,
        }
    }
    
    componentWillMount() {
        this.geoLocation(this.handleLocation);
    }
    
    /**
     * Attempts to get location data from the navigator object,
     * prompts a modal
     *
     * @param function func Callback function to be called if location has been succesfully retrieved
     */
    geoLocation(func) {
        this.setState({loading : true});
        if (navigator.geolocation) {            
            return navigator.geolocation.getCurrentPosition(func.bind(this), this.handleError.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    
    /**
     * Builds string for location data to be used in API call to Foursquare.
     * Saves the location to storage
     *
     * @param position Position from geolocation.getCurrentPosition
     */
    handleLocation(position) {         
        let ll = "ll=" + position.coords.latitude + "," + position.coords.longitude;
        Util.saveToStorage("location", ll);
        this.getUrlFromLocation(ll);
    }
    
    /**
     * Geolocation error handling, only alerts critical ones.
     * Tries to retrieve location from storage if geolocation call failes
     *
     * @param error Error object
     */
    handleError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("Please grant access to your location.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable from Network.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
        // check if location is backed up to storage
        var location = Util.getFromStorage("location");
        if (location) {
            this.getUrlFromLocation(location);
        } else {
            alert("Location information is unavailable. No results shown.");
        }
    }
    
    /**
     * Builds the url to be called Utilizing genUrlwithParam. 
     *
     * @param ll Location in format "ll={latitude},{longitude}"
     */
    getUrlFromLocation(ll) {
        let url = Util.genUrlwithParam(api.url, 
            [api.id, api.key, ll, api.query, api.limit, api.version]);
        this.apiCall(url);
    }   
    
    /**
     * Calls a url via xmlhttp
     *
     * @param String url Url to be called
     */
    apiCall(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
        xmlhttp.onreadystatechange = this.handleRequest.bind(this, xmlhttp);
    }
    
    /**
     * Handles a xmlhttp request. Changes state to newly received data
     * Callback function
     *
     * @param xmlhttp xmlhttp object
     */
    handleRequest(xmlhttp) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);

            if (data.response.groups[0].items.length <= 0) {
                alert("No entries found");
            }
            
            // Set new state to received items
            this.setState({data : data.response.groups[0].items});            
        
        } else if (xmlhttp.status != 200) {
            alert("An error occured while trying to receive data from Foursquare");
        }

        this.setState({loading : false});
    }

    render() {

        return <div>
            <Header refresh={this.geoLocation.bind(this, this.handleLocation)} loading={this.state.loading}/> 
            <Table data={this.state.data}/> 
        </div>;
    }
}
