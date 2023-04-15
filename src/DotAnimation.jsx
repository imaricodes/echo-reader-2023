import React from 'react'

const DotAnimation = () => {
  return (
    <div className='flex'>
        {/* <div className='dot-elastic-before'></div> */}
        <div className='dot-elastic  before:dot-elastic-before after:dot-elastic-after' />
    </div>
  )
}

export default DotAnimation