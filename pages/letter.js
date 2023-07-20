import React from 'react'
import LetterFormat from './letterFormat'
import LetterSidebar from './letterSidebar'
const Letter = () => {
  return (
    <div className='min-h-screen bg-white flex  '>
        <div className='w-[30%] bg-gray-800 h-screen fixed flex-none pr-4'><LetterSidebar className=""/></div>
        <div className='w-[80%] flex-auto pl-[35%] scale-[85%]'><LetterFormat className=""/></div>
    </div>
  )
}

export default Letter