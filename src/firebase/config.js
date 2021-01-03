import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyAlWNM8fpZBV6TTb_qa3Po691sU59aWppU",
   authDomain: "lista-ai-2cc11.firebaseapp.com",
   projectId: "lista-ai-2cc11",
   storageBucket: "lista-ai-2cc11.appspot.com",
   messagingSenderId: "1019468433327",
   appId: "1:1019468433327:web:bf1e3db6092daea33e915a",
   measurementId: "G-TT9F2GK1F3"
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export {
   firebase
};