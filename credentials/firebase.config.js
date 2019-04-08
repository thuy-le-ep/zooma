import firebase from 'firebase/app'
import 'firebase/auth'
import clientCredentials from './client'

export default !firebase.apps.length ? firebase.initializeApp(clientCredentials) : firebase.app();