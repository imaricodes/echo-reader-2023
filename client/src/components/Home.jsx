import {useContext} from 'react';
import { ReadingSessionContext } from '../contexts/ReadingSessionContext';
// import { connectNow } from '../socketIO/socket-service';


const Home = () => {

    const {setReadingSessionIsActive}= useContext(ReadingSessionContext)

const handleClick = () => {
    setReadingSessionIsActive(true)
}



  return (
    <div>
        <p>This is the home</p>
        <button onClick={handleClick}>Click here to begin a reading session</button>
        {/* <button onClick={connect}>Click here to connect socket io</button> */}
    
    </div>
    
  )
}

export default Home