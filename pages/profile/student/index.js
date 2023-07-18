import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { getLoginSession } from '../../../lib/auth';
import { findUser } from '../../../lib/user';
import crypto from "crypto";
import { HiOutlineNewspaper } from 'react-icons/hi';


export default function Index({userDetails}) {
    const user = JSON.parse(userDetails)
    
    console.log(user)
    console.log(user.rollNumber)
    const [position ,setPosition] = useState("Student")
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>
    <div className='flex mt-[11.1vh]'>
      <div className='w-[25%] bg-gray-800 h-screen'>
          <p className='bg-violet-800 text-white text-center py-3 tracking-widest'>STUDENT PROFILE</p>
          <div className='flex px-4 py-4'>
            <div>
              <img className='h-24 w-24 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            </div>
            <div className='text-white py-8 px-6'>
              <p className='text-xl tracking-wide'>{user.rollNumber.value}</p>
            </div>
          </div>
          <div className='px-5 py-3'>
            <div className='flex'>
              <div><HiOutlineNewspaper/></div>
              <div></div>
            </div>

          </div>
      </div>
      <div className='w-[70%]'>

      </div>
    </div>
    </div>
    </>
  )
}
export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    

    const data = JSON.stringify(user)
    if (!user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }


    if(user){
      const inputHash = crypto.pbkdf2Sync("Provast@123", user.salt, 1000, 64, "sha512").toString("hex");
    const passwordsMatch = user.hash === inputHash; 
    if (passwordsMatch) {
      // console.log(" first first first", user);
      return {
        redirect: {
          destination: "/auth/changePassword",
          permanent: false,
        },
      };
    }
    
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
      
        userDetails:data
  
      },
    };
};


