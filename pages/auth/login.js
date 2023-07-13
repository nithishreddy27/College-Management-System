import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../../lib/hooks'
import Form from '../../components/loginForm'
import Image from 'next/image'
import { getLoginSession } from '../../lib/auth'
import { findUser } from '../../lib/user'
import Link from 'next/link'


const Login = () => {
  useUser({ redirectTo: '/profile', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }
    console.log(body)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        console.log("status true")
        Router.push('/profile')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }


  async function handleRegister(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      position:"collegeAdmin"
    }
    console.log("body",body)

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)  
      return
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/auth/register/addCollegeDetails')
      } 
      else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }
  const [sign,setsign]=useState("signin")

  return (
    <div>
      <img
        src="http://res.cloudinary.com/dhqhq0szn/image/upload/v1683046360/my-uploads/zyhr7sirtmezl6qtfj6p.jpg"
        className="absolute top-0 bottom-0 left-0 right-0 h-[100%] w-[100%] object-cover "
      ></img>
      <div className="relative z-30  w-[45%] left-[55%] ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md w-[300px] mx-auto mt-28">
          <div className=" py-10 px-10 bg-white rounded-lg  shadow-md border-[0.3px] border-gray-300 shadow-gray-300  ">
            <div className="flex">
                <button className={`${sign=='signin' ? "shadow-lg":"shadow-none"} grow py-2  text-black`} onClick={()=>{setsign('signin')}}>sign in</button>
                <button className={`${sign=='signup' ? "shadow-lg":"shadow-none"} grow py-2  text-black`} onClick={()=>{setsign('signup')}}>sign up</button>
            </div>
            { sign=='signin' && (
                 <form className="signin" onSubmit={handleLogin}>
                 <h1 className="text-center font-bold text-2xl text-black mt-10">
                   Sign in to your account
                 </h1>
                 <div className="mb-4 mt-[30px] px-5">
                   <label
                     className="block text-gray-700 text-sm mb-2 font-semibold"
                     htmlFor="username"
                   >
                     Email address
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-600 "
                     id="username"
                     name="email"
                     type="email"
                   />
                 </div>
                 <div className="mb-4 mt-[10px] px-5">
                   <label
                     className="block text-gray-700 text-sm mb-2 font-semibold"
                     htmlFor="username"
                   >
                     Password
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-600 "
                     id="password"
                     name="password"
                     type="password"
                   />
                 </div>
                 <div className="flex gap-12 mt-3 px-5  ">
                   <div className="text-sm mt-1 hover:underline underline-offset-1">
                     <button onClick={()=>{setsign('signup')}} className="hover:underline">Are you a new user? </button>
                   </div>
                   <div className="text-sm mt-1 text-indigo-600 hover:text-indigo-500">
                     <Link href="/forgot">Forgot your password?</Link>
                   </div>
                 </div>
                 <p id="mess"></p>
                 <div className="text-center mt-5 px-5">
                   <input
                     type="submit"
                     value="Login"
                     className="bg-indigo-600 font-semibold cursor-pointer block w-[100%] text-white h-10 rounded-md hover:bg-indigo-700"
                   />
                 </div>
               </form>
            )}
            {sign=='signup' && (
                 <form onSubmit={handleRegister}>
                 <h1 className="text-center font-bold text-2xl text-black mt-10">
                   Sign up to your account
                 </h1>
                 <div className="mb-4 mt-[30px] px-5">
                   <label
                     className="block text-gray-700 text-sm mb-2 font-semibold"
                     htmlFor="username"
                   >
                     Email address
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-600 "
                     id="username"
                     name="email"
                     type="email"
                   />
                 </div>
                 <div className="mb-4 mt-[10px] px-5">
                   <label
                     className="block text-gray-700 text-sm mb-2 font-semibold"
                     htmlFor="username"
                   >
                     Password
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-600 "
                     id="password"
                     name="password"
                     type="password"
                   />
                 </div>
                 <div className="mb-4 mt-[10px] px-5">
                   <label
                     className="block text-gray-700 text-sm mb-2 font-semibold"
                     htmlFor="username"
                   >
                     Confirm Password
                   </label>
                   <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-600 "
                     id="rpassword"
                     name="rpassword"
                     type="password"
                   />
                 </div>
                 <div className="flex  mt-3 px-5  ">
                   <div className="text-sm mt-1 hover:underline underline-offset-1">
                     <button onClick={()=>setsign('signin')} className="hover:underline">Already has an account? login </button>
                   </div>
                   
                 </div>
                 <p id="mess"></p>
                 <div className="text-center mt-5 px-5">
                   <button
                     type="submit"
                     
                     className="bg-indigo-600 font-semibold cursor-pointer block w-[100%] text-white h-10 rounded-md hover:bg-indigo-700"
                    //  onClick={(e)=>handleRegister(e)}
                  >Sign In</button>
                 </div>
                 </form>
            )}
           
          </div>
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  
  console.log("req",user)
  // if (user) {
  //   // console.log("first...", user.email, user.hash, user.salt);
  //   return {
  //     redirect: {
  //       destination: `/dashboard/${user?.category}`,
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
};

export default Login
