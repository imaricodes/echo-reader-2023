import React from 'react'

const Card = (props) => {
  return (

    //tailwind css basic card

    <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
    <div className="overflow-hidden shadow-md">
  
        <div className="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase">
            What is Lorem Ipsum?
        </div>


        <div className="p-6 bg-white border-b border-gray-200">
  
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
        </div>

    
        <div className="p-6 bg-white border-gray-200 text-right">

            <a className="bg-blue-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-blue-400 rounded uppercase" 
                href="#">Click Me</a>
        </div>
    </div>
</div>
  )
}

export default Card