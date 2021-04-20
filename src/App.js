import React from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import ChatRoom from './components/ChatRoom'

firebase.initializeApp({
  apiKey: 'AIzaSyAi9TmQoo9YD3Rl6V7Ru1bThu_qh9kXoL0',
  authDomain: 'react-chat-f31b7.firebaseapp.com',
  projectId: 'react-chat-f31b7',
  storageBucket: 'react-chat-f31b7.appspot.com',
  messagingSenderId: '507984433860',
  appId: '1:507984433860:web:31a962f90ba6835c52ef91',
  measurementId: 'G-7K74BW23XH'

})

const auth = firebase.auth()
const firestore = firebase.firestore()

const App = () => {
  const [user] = useAuthState(auth)

  return (
    <div className='App'>
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut auth={auth} />
      </header>

      <section>
        {user
          ? <ChatRoom auth={auth} firebase={firebase} firestore={firestore} />
          : <SignIn firebase={firebase} auth={auth} />}
      </section>

    </div>
  )
}

export default App
