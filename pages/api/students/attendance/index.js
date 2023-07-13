// import dbConnect from "../../../lib/dbConnect"
// import Register from "../../../model/Register"

import dbConnect from "../../../../lib/dbConnect";

export default async function(req, res){

    await dbConnect()
    switch (req.method) {
        case "GET":
            res.status(200).send(data)
            break;
        case "POST":
            const rollnumber = req.body 
            console.log("rollnumner",rollnumber)
            // const college = req.body.college; 
            // const studentClass = req.body.studentClass;
            // console.log("in api",studentClass,college)
            // const students = await Register.find({"college.code":college,"department.name":studentClass})
            // console.log("students",students.length)
            res.status(200).send("done")
        
      }


    
} 