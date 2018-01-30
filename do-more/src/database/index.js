const firebase = require('firebase');

// let config = {
//   apiKey: "AIzaSyDMqDVxZq28Oi44ZNm84POsHu7nvkttFX0",
//   authDomain: "team-undefined-productivity.firebaseapp.com",
//   databaseURL: "https://team-undefined-productivity.firebaseio.com",
//   projectId: "team-undefined-productivity",
//   storageBucket: "team-undefined-productivity.appspot.com",
//   messagingSenderId: "716837513754"
// };
// console.log(firebase.apps)
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }
const db = firebase.database();

// const widgets = ['twitterWidget', 'todoWidget', 'calendarWidget', 'emailWidget', 'newsWidget']

const createWidgetObject = (widget) => {
  db.ref(`widgets/${widget}/`).set({
    useCount: 0
  })
}

const increaseUseCount = (widget) => {
  db.ref(`widgets/${widget}/useCount`).transaction(currentCount => {
    return currentCount + 1;
  });
}

const decreaseUseCount = (widget) => {
  db.ref(`widgets/${widget}/useCount`).transaction(currentCount => {
    return currentCount - 1;
  });
}

const getWidgetsInfo = () => {
  return db.ref('widgets').once('value')
    .then(wgtState => {
      let widgets = wgtState.val();
      widgets = Object.keys(widgets).map(key => {
        return Object.assign({}, widgets[key], {key})
      })
      return widgets;
    })
}

const imageUrls = ['http://res.cloudinary.com/teamundefined/image/upload/q_100/v1516794822/2cqorg_ml5050_hm7vad.jpg', 
'http://res.cloudinary.com/teamundefined/image/upload/q_100/v1516794822/saint-coloman-3092260_1920_yz2ojw.jpg', 
'http://res.cloudinary.com/teamundefined/image/upload/v1516794822/peacock-3080897_1920_elwjrf.jpg', 
'http://res.cloudinary.com/teamundefined/image/upload/v1516794821/tlnvoe_jakstashoe_ftmmwt.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794821/l52a2f_kash_b0zezm.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794820/DSCF2114_lu8ov8.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794820/h6rcqc_bardhi_ylgany.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794820/nature-3082832_1920_ogo0y1.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794819/lf23e6_kash_ybrkwe.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794818/pexels-photo-454880_yehbuz.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794818/7owwvl_alex2411_bpqcvd.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794818/mt-fuji-sea-of-clouds-sunrise-46253_oahcqf.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794818/w2ju24_bardhi_axbl6f.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794817/q2c1iq_anthonybhora_egpgpo.jpg',
'http://res.cloudinary.com/teamundefined/image/upload/v1516794817/sunset-3092048_1920_j6l3go.jpg']

const seedImageInfo = (image) => {
  db.ref(`backgrounds/`).push({
    url: image,
    likeCount: 0
  })
}

// imageUrls.forEach(image => {
//   seedImageInfo(image)
// })

const getAllImagesInfo = () => {
  return db.ref('backgrounds').once('value')
    .then(bgState => {
      let backgrounds = bgState.val();
      backgrounds = Object.keys(backgrounds).map(key => {
        return Object.assign({}, backgrounds[key], {key})
      })
      return backgrounds;
    })
}

const getImageInfo = (imageKey) => {
  return db.ref(`backgrounds/${imageKey}`).once('value')
    .then(imageInfo => {
     return imageInfo.val();
    })
}

const increaseLikeCount = (imageKey) => {
  db.ref(`backgrounds/${imageKey}/likeCount`).transaction(currentCount => {
    return currentCount + 1;
  });
}

const decreaseLikeCount = (imageKey) => {
  db.ref(`backgrounds/${imageKey}/likeCount`).transaction(currentCount => {
    return currentCount - 1;
  });
}

const getRandomBackground = () => {
  return getAllImagesInfo().then(imagesArr => {
    return imagesArr[Math.floor(Math.random() * (imagesArr.length - 1))]
  })
}


export { 
  createWidgetObject,
  increaseUseCount,
  decreaseUseCount,
  getWidgetsInfo,
  imageUrls,
  seedImageInfo,
  getAllImagesInfo,
  getImageInfo,
  increaseLikeCount,
  decreaseLikeCount,
  getRandomBackground
};

