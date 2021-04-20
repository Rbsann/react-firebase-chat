import React from 'react'

const SignOut = ({ auth }) => (
  auth?.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
)

export default SignOut
