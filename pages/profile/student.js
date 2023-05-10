import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useUser } from "../../lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import ResumeContext from "../../context/ResumeContext";

export default function Student() {
  const user = useUser();
  const [position, setPosition] = useState("profile");
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  return (
    <div>
      <Navbar/>
    </div>
  );
}
