import React from 'react'
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function index({circular}) {
    const circulars = JSON.parse(circular)
    // console.log("circulars",circulars)
    const router = useRouter()
  return (
    <div>
        <h1>Circulars</h1>
        {circulars.map((circular)=>(
            <div className='min-h-[100px] border border-red-500 w-[150px] cursor-pointer' onClick={()=>{
                router.push(`/circular/${circular.fileNumber}`)
              }}>
                {/* {console.log(circular)} */}
                <p>{circular.fileNumber}</p>
            </div>
        ))}
    </div>
  )
}


export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const data = JSON.stringify(user)
    const circular = await axios.get(`http://localhost:3000/api/circular?userId=${user?.hodId}`)
    // console.log("attendancce",leaveLetters)
    const circulars = JSON.stringify(circular.data.data)

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
        circular : circulars
        
      },
    };
};
