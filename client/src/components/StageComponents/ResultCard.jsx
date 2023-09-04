import {useContext} from 'react'
import SocketContext from '../../socketIO/socketContext'

const ResultCard = () => {

  const {session_results} = useContext(SocketContext)
  return (
    <div>ResultCard

      {session_results}
    </div>
  )
}

export default ResultCard