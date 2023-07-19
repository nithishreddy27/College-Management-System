import React from 'react'
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import crypto from "crypto";
import axios from 'axios';
import Navbar from '../../../../components/Navbar';

export default function index({userDetails,attendanceDetails}) {
    const user = JSON.parse(userDetails)
    // console.log("user",user)
    const attendance = JSON.parse(attendanceDetails).attendance;
    // console.log('a',attendance)
  return (
    <div>
        <Navbar/>
        <div className="mt-10">
        Subjects

        {attendance.studentSubjects.map((subject)=>(
            <div>
            {/* {console.log("sub",subject)} */}
            <p className='text-xl font-bold'>
                {subject.name}
                
            </p>
            {subject.subjectAttendance && (
                <>

                <div>Total number of classes attednded = {subject.subjectAttendance[subject.subjectAttendance.length-1]?.attendance}</div>
                
                </>
            )}
            {subject.totalSubjectClasses && (
              <>
                 <div>TOtal number of classes = {subject.totalSubjectClasses}</div>
                 <p>Attendance = {(subject.subjectAttendance[subject.subjectAttendance.length-1]?.attendance / subject.totalSubjectClasses )*100} %</p>
              </>
            )}
            
            {/* {subject.subjectAttendance?.map((s)=>{
                console.log(s)
            })} */}
            </div>
        ))}
        </div>

    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const data = JSON.stringify(user)
    const attendanceDetails = await axios.get(`http://localhost:3000/api/students/attendance?userId=${user?._id}`)
    // console.log("attendancce",attendanceDetails.data)
    const attendance = JSON.stringify(attendanceDetails.data)

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
      
        userDetails:data,
        attendanceDetails:attendance
        
      },
    };
};
