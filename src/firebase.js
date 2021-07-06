// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
	apiKey: 'AIzaSyBqy1uEIRWMkuLSWrQ3HawaKXFCYdgzfic',
	authDomain: 'ecommerce-80d0b.firebaseapp.com',
	projectId: 'ecommerce-80d0b',
	storageBucket: 'ecommerce-80d0b.appspot.com',
	messagingSenderId: '1062379378572',
	appId: '1:1062379378572:web:59a3f95e078986043068a9',
}
// initialize firebase app
if (!firebase.apps.length) {
	firebase.initializeApp(config)
}
// export
// export default firebase;
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
