import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { getLoginSession } from '../../../lib/auth';
import { findUser } from '../../../lib/user';
import crypto from "crypto";

export default function index({userDetails}) {
    const user = JSON.parse(userDetails)
    
    
    const [position ,setPosition] = useState("Student")
  return (
    <>
    <Navbar/>
    <div className='flex flex-col mt-24'>
            {console.log("user",user)}

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


