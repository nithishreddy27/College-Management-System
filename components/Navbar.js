import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "../lib/hooks";
import { useRouter } from "next/router";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const router = useRouter();

  return (
    <div>
      <div className="border-b border-gray-300 py-2 fixed top-[-8px] w-[100%] z-40 bg-slate-50">
        <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
          {/* <h1>Provast</h1> */}
          {/* <img
            src="https://www.provast.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdj7nomqfd%2Fimage%2Fupload%2Fv1652909540%2Fpvast_B_fpwhlu.png&w=2048&q=75"
            width={220}
            height={55}
          /> */}
          <FiMenu
            className="lg:hidden block h-6 w-6 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          {user && (
           <div className="navbar fixed top-0 z-50 py-4 px-10 font-serif bg-transparent backdrop-filter backdrop-blur-lg shadow-md w-full">
           <div className="relative grid grid-cols-2 items-center">
             <Link className="py-1 ml-5 mr-32 text-4xl " href="#">
               College Management System
             </Link>
             <div className="flex gap-2 mx-10 text-lg align-text-bottom">
               <Link
                 className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                 href="#"
               >
                 Home
               </Link>
               <Link
                 className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                 href="#"
               >
                 Choose
               </Link>
               <Link
                 className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                 href="/attendance"
               >
                 Attendance
               </Link>
               <Link
                 className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                 href="/api/auth/logout"
               >
                 Logout
               </Link>
               <Link
                 className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                 href="#"
               >
                 Pricing
               </Link>
             </div>
           </div>
         </div>
          )}
          {!user && (
            <div className="navbar fixed top-0 z-50 py-4 px-10 font-serif bg-transparent backdrop-filter backdrop-blur-lg shadow-md w-full">
            <div className="relative grid grid-cols-2 items-center">
              <Link className="py-1 ml-5 mr-32 text-4xl " href="#">
                College Management System
              </Link>
              <div className="flex gap-2 mx-10 text-lg align-text-bottom">
                <Link
                  className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                  href="#"
                >
                  Home
                </Link>
                <Link
                  className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                  href="#"
                >
                  Choose
                </Link>
                <Link
                  className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                  href="/auth/login"
                >
                  Login
                </Link>
                <Link
                  className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                  href="#"
                >
                  Pricing
                </Link>
                <Link
                  className="px-6 py-3 font-semibold hover:text-pink-700 hover:text-xl ease-in-out duration-300"
                  href="#"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
