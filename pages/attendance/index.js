import React, { useEffect, useState } from 'react'
import crypto from "crypto";
import { getLoginSession } from '../../lib/auth';
import { findUser } from '../../lib/user';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function index({userDetails}) {

  const user = JSON.parse(userDetails)
  const subjects = user.facultySubjects;
  const [college, setcollege] = useState();
  const [students, setstudents] = useState();
 const [dropdown,setdropdown]=useState(false)
  console.log("user",subjects);
  const router = useRouter();

  async function changeClass(cls){
    // await fetch("")
    console.log("class",cls);
    setcollege(cls)
    const res = await axios.post("../api/students",{college:user.college.code,studentClass:cls})
    
    
    console.log(res.data.students)
    setstudents(res.data.students)
  }


  async function present(rollnumber){
    axios.post("../api/students/attendance",{rollnumber:rollnumber})
  }
  async function absent(rollnumber){
    axios.post("../api/students/attendance",{rollnumber:rollnumber})
  }

  return (
    <div>
      
      <Navbar/>
      add subject and class
      {subjects && (
        <div>
          {subjects.map((subject)=>(
            <div className='mt-16 bg-red-300 p-3'>
              <h1 onClick={()=>{
                  changeClass(subject.class)
              }} className='cursor-pointer'>
                      {subject.class}
                      
              </h1>
            </div>
          ))}

          {students && (
            <div className=''>
            <div class="container mx-auto px-4 py-8">
             <h1 class="text-2xl font-bold mb-4">Student attendance</h1>
             
         
     
         <div class="grid grid-cols-2 gap-6">
         <div>
             <div className=''>
                 <span class="font-medium mr-2">Faculty Name:</span>
                 <span>{user?.profile.firstName}</span>
             </div>
             <div>
                 <span class="font-medium mr-2">Branch:</span>
                 <span>{college}</span>
             </div>
         </div>
         <div>
             <div>
                 <span class="font-medium">Total Present:</span>
                 <span>15</span>
             </div>
             <div>
                 <span class="font-medium">Total Absent:</span>
                 <span>3</span>
             </div>
         </div>
     </div>
     
              </div> 
              <table class="min-w-full divide-y divide-gray-200">
         <thead>
             <tr>
                 <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Name
                 </th>
                 <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Roll No.
                 </th>
                 <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Present
                 </th>
                 <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Absent
                 </th>
                 <th scope="col" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Status
                 </th>
             </tr>
         </thead>
         <tbody class="bg-white divide-y divide-gray-200">
          {students.map((student)=>(
            <tr>
              {console.log("student",student)}
            <td class="px-6 py-4 whitespace-nowrap">
                {student.profile.firstName}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                {student.rollNumber.value}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{present(student.rollNumber.value)}}>
                    Present
                </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{absent(student.rollNumber.value)}}>
                    Absent
                </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-green-500">&#10004;</span>
            </td>
        </tr>
       
          ))}
             
             
         </tbody>
         {/* <tfoot>
             <tr>
                 <th colspan="4" class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Status
                 </th>
                 <th class="px-6 py-3 bg-gray-50 whitespace-nowrap">
                     
                 </th>
             </tr>
         </tfoot> */}
     </table>
     
         </div>
          )}
        </div>
      )}

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
    
      userDetails:data

    },
  };
};