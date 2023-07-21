import React from 'react'
import {useResumeContext} from "../../../../src/context/ResumeContext"
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function index({userDetails,leaveLetters}) {
  // const {letterBody, setLetterBody} = useResumeContext();
  // console.log(modules)
  const user = JSON.parse(userDetails);
  const letters = JSON.parse(leaveLetters);
  console.log("letters",letters);
  const router = useRouter()
  return (
    <div>
      Letters 
      {letters.leaveLetters?.map((letter,index)=>(
        <div>
        <div key={letter._id}>
          
          letters 
          {/* {letter.leaveLetters.map((letter,index)=>( */}
            <div >
              <p className='text-lg '>Pending</p>
                {!letter.hodApproved && (
                  <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-red-500' onClick={()=>{
                    router.push(`/profile/student/leave/${user._id}?index=${index}`)
                  }}>
                    {letter.date.slice(0,10)}
                  </div>
                )}
              <p className='text-lg'>Accepted</p> 
              {letter.hodApproved && (
                  <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-green-500' onClick={()=>{
                    router.push(`/profile/student/leave/${user._id}?index=${index}`)
                  }}>
                    {letter.date.slice(0,10)}
                  </div>
                )}
            </div>
          {/* ))} */}
        </div>
    
        </div>
      ))}
      
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const data = JSON.stringify(user)
  const leaveLetters = await axios.get(`http://localhost:3000/api/students/leave/studentDisplay?userId=${user?._id}`)
  // console.log("attendancce",leaveLetters)
  const leaveLetter = JSON.stringify(leaveLetters.data.data[0])

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (user.position !== "student") {
    return {
      redirect: {
        destination: `/profile/${user.position}`,
        permanent: false,
      },
    };
  }
return {
    props: {
    
      userDetails:data,
      leaveLetters : leaveLetter
      
    },
  };
};
