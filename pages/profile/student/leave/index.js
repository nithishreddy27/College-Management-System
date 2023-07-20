import React from 'react'
import {useResumeContext} from "../../../../src/context/ResumeContext"
export default function index() {
  const {letterBody, setLetterBody} = useResumeContext();
  // console.log(modules)
  return (
    <div>

      <input type="text" value={letterBody} onChange={(e)=>{setLetterBody(e.target.value)}} />
      body : {letterBody}
    </div>
  )
}
