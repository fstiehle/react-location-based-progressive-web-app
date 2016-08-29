import React from 'react';
import ReactDOM from 'react-dom';

// import React Components
import Layout from './components/Layout.jsx';

// Register Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        var installingWorker = registration.installing;

        installingWorker.onstatechange = function() {
            if (installingWorker.state == 'installed') {
                
                if (navigator.serviceWorker.controller) {
                    /** At this point, the old content will have been purged and the fresh content will have been added to the cache. 
                    console.log('New or updated content is available.'); **/
                } else {
                    // At this point, everything has been precached
                    console.log('Content is now available offline!');
                }

            }
        };

    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

var app = document.getElementById('content');
ReactDOM.render(<Layout />, app);