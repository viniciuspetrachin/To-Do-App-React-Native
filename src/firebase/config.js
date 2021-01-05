//import * as firebase from 'firebase'
//import '@firebase/auth'
//import '@firebase/firestore'

import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyAlWNM8fpZBV6TTb_qa3Po691sU59aWppU",
   authDomain: "lista-ai-2cc11.firebaseapp.com",
   projectId: "lista-ai-2cc11",
   storageBucket: "lista-ai-2cc11.appspot.com",
   messagingSenderId: "1019468433327",
   appId: "1:1019468433327:android:6f9df5072b2cb3f53e915a",
};

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase