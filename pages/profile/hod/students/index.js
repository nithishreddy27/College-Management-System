import React, { useEffect, useState } from 'react'
import { getLoginSession } from '../../../../lib/auth';
import { findUser } from '../../../../lib/user';
import crypto from "crypto";
import { useStudents } from '../../../../src/hooks/useStudents';
import axios from 'axios';

export default function index({userDetails}) {
    const user = JSON.parse(userDetails);
    // console.log(user)
    // const students = useStudents(user)
    const [students, setStudents] = useState();
    const [faculty, setFaculty] = useState();


    async function getStudents(){
        const data = await axios.get(`../../../api/auth/user/details?collegeCode=${user.college.paraphrase}&branch=${user.department}`)
        // console.log("data",data.data.details);
        setStudents(data.data.details);
    }    


    async function getFaculty(){
        if(user){
            const data = await axios.get(`../../../api/auth/user/college?collegeCode=${user.college.paraphrase}&branch=${user.department}`)
            console.log("data",data.data.details);
            setFaculty(data.data.details);
        }
    } 

    // useEffect(()=>{
    //     getFaculty()
    // },[user])   
    

  return (
    <div>
        <button onClick={getStudents} className='mx-2'>Display students</button>
        <button onClick={getFaculty}>Display teachers</button>
        

        {students && (
            <>
                {students.map((student)=>(
                    <h1>
                        {student.email}
                    </h1> 
                ))}
            </>
        )}
        {faculty && (
            <>
                {faculty.map((fu)=>(
                    <h1>
                        {fu.email} {fu.rollNumber.value} {fu.profile.firstName}
                    </h1> 
                ))}
            </>
        )}
        <div className='mt-5'>
        {console.log("user",user)}
        <h1>Add Subject</h1>
        <form action="../../../api/students/subjects" method='POST'>
            <label htmlFor="collegeName" className='mx-4'>College Name </label>
            <input type="text" value={user?.college.paraphrase} onChange={()=>{}} name='collegeName'/>
            <label htmlFor="branchName" className='mx-4'>Branch Name </label>
            <input type="text" value={user?.department} onChange={()=>{}} name='branchName'/>
            <label htmlFor="name">Subject Name</label>
            <input type="text" name='subjectName' className='border mx-4'/>
            
            <label htmlFor="name">Faculty Roll number</label>
            <input type="text" className='border mx-4' name='rollNumber' />
            <div className="">
                        <select
                          name="faculty"
                          className="shadow cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500"
                        >
                            {faculty?.map((fac)=>(
                                <option value={fac._id} >{fac.profile.firstName}</option>
                            ))}
                          
                        </select>
                      </div>
            
            <button type="submit">submit</button>
        </form>
        </div>

    </div>
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
      const inputHash = crypto.pbkdf2Sync("test@123", user.salt, 1000, 64, "sha512").toString("hex");
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
    if (user.position !== "hod") {
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
