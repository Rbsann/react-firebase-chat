import React from 'react'

const ChatMessage = ({ message, auth }) => {
  const { value: text, uid, photoURL } = message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  )
}

export default ChatMessage
