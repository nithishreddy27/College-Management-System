import React from 'react'
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import axios from 'axios';
import { useRouter } from 'next/router';
import {FcCheckmark} from "react-icons/fc"
import {ImCross} from "react-icons/im"

export default function index({leaveLetters}) {
  const leaveLetter  = JSON.parse(leaveLetters)
  console.log("leave",leaveLetter)
  const router = useRouter()
  return (
    <div>index

      {leaveLetter.map((student)=>(
        <div key={student._id}>
          <h1>Student Id : {student.user}</h1>
          letters 
          {student.leaveLetters.map((letter,index)=>(
            <div >
              <p className='text-lg '>Pending</p>
                {!letter.mentorApproved && (
                  <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-red-500' onClick={()=>{
                    router.push(`/profile/student/leave/${student.user}?index=${index}`)
                  }}>
                    {letter.date.slice(0,10)}
                    {letter.mentorApproved && (
                      <div>
                      mentor : 
                      <span> <FcCheckmark></FcCheckmark></span>
                      </div>
                    )}
                    {!letter.mentorApproved && (
                      <div>
                      mentor : 
                      <span> <ImCross></ImCross></span>
                      </div>
                    )}
                    {letter.hodApproved && (
                      <div>
                      HOD : 
                      <span> <FcCheckmark></FcCheckmark></span>
                      </div>
                    )}
                    {!letter.hodApproved && (
                      <div>
                      HOD : 
                      <span> <ImCross></ImCross></span>
                      </div>
                    )}
                  </div>
                )}
              <p className='text-lg'>Accepted</p> 
              {letter.mentorApproved && (
                  <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-green-500' onClick={()=>{
                    router.push(`/profile/student/leave/${student.user}?index=${index}`)
                  }}>
                    {letter.date.slice(0,10)}
                    {letter.mentorApproved && (
                      <div>
                      mentor : 
                      <span> <FcCheckmark></FcCheckmark></span>
                      </div>
                    )}
                    {!letter.mentorApproved && (
                      <div>
                      mentor : 
                      <span> <ImCross></ImCross></span>
                      </div>
                    )}
                    {letter.hodApproved && (
                      <div>
                      HOD : 
                      <span> <FcCheckmark></FcCheckmark></span>
                      </div>
                    )}
                    {!letter.hodApproved && (
                      <div>
                      HOD : 
                      <span> <ImCross></ImCross></span>
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}


export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const data = JSON.stringify(user)
    const leaveLetters = await axios.get(`http://localhost:3000/api/students/leave?userId=${user?._id}`)
    // console.log("attendancce",leaveLetters)
    const leaveLetter = JSON.stringify(leaveLetters.data.data)

    if (!user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    if (user.position !== "faculty") {
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