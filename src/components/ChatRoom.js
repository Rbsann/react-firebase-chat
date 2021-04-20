import React, { useRef, useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'

const ChatRoom = ({ firestore, firebase, auth }) => {
  const [usersLists, setUsers] = useState([])
  const [messages, setUserMessages] = useState('')

  useEffect(() => {
    getUsers()
  } , [])

  const getUsers = async () => {
    const user = await firestore.collection('users').get()
    console.log(user.docs)
    setUsers(user.docs)
  }

  const setMessages = (userId) => {
    console.log(userId)
    firestore.collection('users').doc(userId).collection('messages').get().then(message => {
      message.forEach(msg => {
        console.log(msg.data().message)
        setUserMessages(msg.data().message)
      })
      // console.log(userMessage)
    })
  }

  useEffect(() => {
    console.log(usersLists)
    usersLists.forEach(user => console.log(user))
  },[usersLists])

  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const [formValue, setFormValue] = useState('')


  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main>
        <button onClick={() => setUserMessages('')}>Clean message list </button>
        {usersLists && usersLists.map(users => {
          return (
            <div key={users.id}>
              <button onClick={() => setMessages(users.id)}>{users.data().name}</button>
            </div>
          )
        })}
        {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something nice'
        />
        <button type='submit' disabled={!formValue}>🕊️</button>
      </form>

    </>
  )
}

export default ChatRoom
