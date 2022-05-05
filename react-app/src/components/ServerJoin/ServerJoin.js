import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneServer, joinServer } from '../../store/server'
import './ServerJoin.css'

export default function ServerJoin() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { serverId } = useParams()

  const server = useSelector(state => state.server[serverId])

  useEffect(() => {
    dispatch(getOneServer(serverId))
  }, [dispatch, serverId])

  const onJoin = () => {
    dispatch(joinServer(serverId))
    history.push(`/channels/${serverId}`)
  }

  const onCancel = () => {
    history.push('/channels/@me')
  }

  return (
    <div className='whole-page-div'>
      <div className='join-server-modal-container'>
        <div className='join-server-h1-container'>
          <h1>Join {`${server?.name}`}?</h1>
        </div>
        <div className='join-server-buttons-container'>
          <button className='join-server-button' onClick={onCancel}>Cancel</button>
          <button className='join-server-button' onClick={onJoin}>Join</button>
        </div>
      </div>
    </div>
  )
}
