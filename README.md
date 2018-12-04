# Demo: Music bot with spotify
This demo uses the experimental Web Speech API, which is currently only [supported](http://caniuse.com/#search=speech) by Blink-based browsers including Chrome 25+, Opera 27+, Samsung Internet, QQ Browser, and Baidu Browser.

This is how this web app works:

1. Using the Web Speech API’s `SpeechRecognition` interface to listen your voice from a microphone
2. Send your message to [API.ai](https://api.ai) (the natural language processing platform) as a text string
3. Once the AI from the API.ai returns the reply text back, use the `SpeechSynthesis` interface to give it a synthetic voice. Now it changes name to Dialogflow mainrained by Google https://console.dialogflow.com

## Installation
1. Need Node.js
2. MongoDB for database npm install mongodb
3. in root run node index.js

## Instruction
1. Login with Spotify account
2. Possible commands supported by the bot
  + Start: "Play a music", "play a song for me" ...
  + Search by category: "Play jazz songs", "I like rock", "Play a pop song" ...
  + Search by language: "I like Chinese songs", "Play a German songs" ...
  + Search by artist: "play Justin Bieber", "play a Rihanna song" ...
  + Search by features: "I need more energy", "I feel sad", "I want a song for dancing" ...
  + Skip: "Skip the song", "Next song", "next" ...
  + When skip three songs, system critiquing will be triggered, if you reply "yes", "ok" ... to accept this critiquing, or "no" for showing another critiquing candidate. Of note, generating critiquing may take some time 2-3 seconds
  
Have a fun~


