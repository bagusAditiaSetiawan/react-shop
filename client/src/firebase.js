import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBeXZhg4aD9228j7BOnI4hrj8u-eUwzxpw",
    authDomain: "saeshop-43bc0.firebaseapp.com",
    databaseURL: "https://saeshop-43bc0.firebaseio.com",
    projectId: "saeshop-43bc0",
    storageBucket: "saeshop-43bc0.appspot.com",
    messagingSenderId: "10002965804",
    appId: "1:10002965804:web:05d4ab5b6e126592b9f889"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
