import React from 'react'
import {useResumeContext} from "../../../../src/context/ResumeContext"
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import axios from 'axios';
import { useRouter } from 'next/router';
import {FcCheckmark} from "react-icons/fc"
import {ImCross} from "react-icons/im"
import { AiTwotoneDelete } from 'react-icons/ai';

export default function Index({userDetails,leaveLetters}) {
  // const {letterBody, setLetterBody} = useResumeContext();
  // console.log(modules)
  const user = JSON.parse(userDetails);
  const letters = JSON.parse(leaveLetters);
  console.log("letters",letters);
  const router = useRouter()
  return (
    <div>
      Letters 

      Create 
      <div className=' border mx-5 h-[100mm] w-[70mm] relative'
      onClick={()=>{router.push(`/profile/student/leave/letter`)}}>
                <img className='' src='https://marketplace.canva.com/EAFhHrjw0Qk/1/0/1131w/canva-black-and-white-simple-classic-professional-cover-letter-G55SxrJRkKo.jpg' />
                <div className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-50"></div>
                <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase  font-serif top-5 px-14 py-32'>Leave letter </span>
                
            </div>
      {letters?.leaveLetters?. ((letter,index)=>(
        <div>
        <div key={letter._id}>
          {/* {letter.leaveLetters.map((letter,index)=>( */}
            <div >
                {!letter.hodApproved && (
                  
                  <div className='min-h-[50px] min-w-[50px] m-10 '>
              <p className='text-lg '>Pending</p>

                    {!letter.hodApproved && (
                <div className=' border mx-5 h-[100mm] w-[70mm] relative border-red-700 shadow-xl shadow-red-600' 
                onClick={()=>{
                  router.push(`/profile/student/leave/${user._id}?index=${index}`)
                }}>
                <img className='' src='https://marketplace.canva.com/EAFhHrjw0Qk/1/0/1131w/canva-black-and-white-simple-classic-professional-cover-letter-G55SxrJRkKo.jpg' />
                <div className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-50"></div>
                <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-0 px-14'>{letter.date.slice(0,10)} </span>
                {letter.mentorApproved && (
                      <div>
                     
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-5 px-14 py-32'> mentor : <FcCheckmark></FcCheckmark></span>
                      <span> </span>
                      </div>
                    )}
                    {!letter.mentorApproved && (
                      <div>
                    
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-5 px-14 py-32'> mentor : <ImCross></ImCross></span>
                      {/* <span> </span> */}
                      </div>
                    )}
                {letter.hodApproved && (
                      <div>
                     
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-7 px-14 '> HOD : <FcCheckmark></FcCheckmark></span>
                      <span> </span>
                      </div>
                    )}
                    {!letter.hodApproved && (
                      <div>
                    
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-7 px-14 '> HOD : <ImCross></ImCross></span>
                      {/* <span> </span> */}
                      </div>
                    )}
                
                {/* <span className=''>{letter.date.slice(0,10)} </span> */}
                
                {/* <div className='absolute top-2 right-1 px-2 cursor-pointer '><AiTwotoneDelete className='text-red-500 hover:text-red-600 text-lg'/></div> */}
            </div>
                  // <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-green-500' onClick={()=>{
                  //   router.push(`/profile/student/leave/${user._id}?index=${index}`)
                  // }}>
                  //   {letter.date.slice(0,10)}
                  //   {letter.mentorApproved && (
                  //     <div>
                  //     mentor : 
                  //     <span> <FcCheckmark></FcCheckmark></span>
                  //     </div>
                  //   )}
                  //   {!letter.mentorApproved && (
                  //     <div>
                  //     mentor : 
                  //     <span> <ImCross></ImCross></span>
                  //     </div>
                  //   )}
                  //   {letter.hodApproved && (
                  //     <div>
                  //     HOD : 
                  //     <span> <FcCheckmark></FcCheckmark></span>
                  //     </div>
                  //   )}
                  //   {!letter.hodApproved && (
                  //     <div>
                  //     HOD : 
                  //     <span> <ImCross></ImCross></span>
                  //     </div>
                  //   )}
                  // </div>
                )}
                  </div>
                )}
              {/* <p className='text-lg'>Accepted</p>  */}

              {letter.hodApproved && (
                <>
                <p className='text-lg'>Accepted</p>
                <div className=' border mx-5 h-[100mm] w-[70mm] relative border-green-700 shadow-xl shadow-green-600'
                onClick={()=>{router.push(`/profile/student/leave/${user._id}?index=${index}`)}}
                >
                  
                <img className='' src='https://marketplace.canva.com/EAFhHrjw0Qk/1/0/1131w/canva-black-and-white-simple-classic-professional-cover-letter-G55SxrJRkKo.jpg' />
                <div className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-50"></div>
                <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-0 px-14'>{letter.date.slice(0,10)} </span>
                {letter.mentorApproved && (
                      <div>
                     
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-5 px-14 py-32'> mentor : <FcCheckmark></FcCheckmark></span>
                      <span> </span>
                      </div>
                    )}
                    {!letter.mentorApproved && (
                      <div>
                    
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-5 px-14 py-32'> mentor : <ImCross></ImCross></span>
                      {/* <span> </span> */}
                      </div>
                    )}
                {letter.hodApproved && (
                      <div>
                     
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-7 px-14 '> HOD : <FcCheckmark></FcCheckmark></span>
                      <span> </span>
                      </div>
                    )}
                    {!letter.hodApproved && (
                      <div>
                    
                      <span className='absolute text-center font-bold text-2xl text-violet-950 cursor-pointer uppercase   top-7 px-14 '> HOD : <ImCross></ImCross></span>
                      {/* <span> </span> */}
                      </div>
                    )}
                
                {/* <span className=''>{letter.date.slice(0,10)} </span> */}
                
                {/* <div className='absolute top-2 right-1 px-2 cursor-pointer '><AiTwotoneDelete className='text-red-500 hover:text-red-600 text-lg'/></div> */}
            </div>
                </>
                  // <div className='min-h-[50px] min-w-[50px] m-10 border cursor-pointer border-green-500' onClick={()=>{
                  //   router.push(`/profile/student/leave/${user._id}?index=${index}`)
                  // }}>
                  //   {letter.date.slice(0,10)}
                  //   {letter.mentorApproved && (
                  //     <div>
                  //     mentor : 
                  //     <span> <FcCheckmark></FcCheckmark></span>
                  //     </div>
                  //   )}
                  //   {!letter.mentorApproved && (
                  //     <div>
                  //     mentor : 
                  //     <span> <ImCross></ImCross></span>
                  //     </div>
                  //   )}
                  //   {letter.hodApproved && (
                  //     <div>
                  //     HOD : 
                  //     <span> <FcCheckmark></FcCheckmark></span>
                  //     </div>
                  //   )}
                  //   {!letter.hodApproved && (
                  //     <div>
                  //     HOD : 
                  //     <span> <ImCross></ImCross></span>
                  //     </div>
                  //   )}
                  // </div>
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
  console.log("attendancce",leaveLetters.data.data[0])
  var leaveLetter
  if(leaveLetters.data.data[0]){
      leaveLetter = JSON.stringify(leaveLetters.data.data[0])
  }
  else{
      leaveLetter = JSON.stringify({"letters":false})
  }
    
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
