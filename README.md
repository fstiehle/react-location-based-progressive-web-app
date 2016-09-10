# Location based progressive web app

Exemplary implementation of an offline capable, location based React app utilizing service-workers. Shows an app install banner on supported devices.

* Service workers are generated using Google's [sw-precache](https://github.com/GoogleChrome/sw-precache)
* Dynamic url calls are cached using Google's [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)

On a successful api call the location is backed up into local storage, if location data is unavailable, the backup from storage is used.

__More Importantly__: If the dynamic api call fails (Device is offline) the backed up location is used to repeat the call, thus receiving an already cached response. This enables a seamless online to offline experience. Ultimately displaying data from the last available location.

__Demo: [here](https://fstiehle.github.io/sushi-app/)__

Build the app with `gulp build`

Run the app for development with `gulp` (Server is included)
