import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { joinServer } from '../../store/server'

export default function ServerJoin() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { serverId } = useParams()

  const onJoin = () => {
    dispatch(joinServer(serverId))
    history.push(`/`)
  }
  return (
    <div>
      <h1>Join Server?</h1>
      <button onClick={onJoin}>Join</button>
      <button>Cancel</button>
    </div>
  )
}
