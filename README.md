# TAL presentation for meetup

This is a simple presentation made to present TAL on the Web App Devs meetup in Hamburg.

https://www.meetup.com/de-DE/Web-App-Devs-HH/

## Setup

* npm install
* npm run build
* npm start

## Usage

The app will start on http://localhost:1337 and can be navigated using your keyboard. Just use directional keys and enter, if you want to launch the meetup component press the F3 key.

You can change the device config by adding GET parameters (`brand` and `model`) to the URL:

* http://localhost:1337/?brand=amazon&model=firetv

This would start the app using the firetv config from node_module/tal/config/devices folder. Those files are named `brand`-`model`-default.json. Feel free to test this on different devices.
