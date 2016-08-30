import React from 'react';
import ReactDOM from 'react-dom';

// import React Components
import Layout from './components/Layout.jsx';

// Register Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);


        self.addEventListener('install', function(event) {
            self.skipWaiting();
            console.log('ServiceWorker Installed', event);
        });

        self.addEventListener('activate', function(event) {
            console.log('ServiceWorker Activated', event);
        });

    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
} else {
    console.log('Browser doesnt support Service Workers');
}

var app = document.getElementById('content');
ReactDOM.render(<Layout />, app);