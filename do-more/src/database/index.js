const firebase = require('firebase');

let config = {
  apiKey: "AIzaSyC021C6kMFD7rgBY3Ibv6sLRyplwNunZW8",
  authDomain: "twitter-app-3b663.firebaseapp.com",
  databaseURL: "https://twitter-app-3b663.firebaseio.com",
  projectId: "twitter-app-3b663",
  storageBucket: "twitter-app-3b663.appspot.com",
  messagingSenderId: "63643362222"
};
firebase.initializeApp(config);

const db = firebase.database();

function updateUseCount (widget, increase) {
  db.ref(`widgets/${widget}/useCount`).transaction(currentCount => {
    return currentCount + 1;
  });
}

function postBackgroundImages (imageSources) {
  imageSources.forEach(source => {
    db.ref('backgrounds').push({
      source,
      useCount : 0
    })
  })
}

const sources = ['mountain', 'morning rain', 'mid-afternoon sleet', 'volcano'];

// postBackgroundImages(sources);

const getImages = () => {
  return db.ref('backgrounds').once('value')
    .then(bgState => {
      let backgrounds = bgState.val();
      backgrounds = Object.keys(backgrounds).map(key => {
        return Object.assign({}, backgrounds[key], {key})
      })
      return backgrounds;
    })
}

getImages().then(console.log);