const mongoose= require("mongoose");


const UserInfoSchema = new mongoose.Schema(
  {
        firstName:String,
        lastName:String,
        dateOfBirth:String,
        nation:String,
        gender:String,
        myFile:String,
        city:String,
        subCity:String,
        wereda:String,
        kebele:String,
        houseNumber:String,
        phoneNumber:String,
        level:String,
        position:String,
        institution:String,
        place:String,
        certificate:String,
        workId:String,
        certificateres:String,
        experienceres:String,
        title:String,
        partner:String,
        parent_po_no:String,
        parent_address:String,
        childName:String,
        childGender:String,
        childAge:String,
        emergency_contact:String,
        relationship:String,
        EmergencyPhoneNo:String,
        Emergencyaddress:String,


 
    
  },


);

const NotificationScehma = new mongoose.Schema(
    {
      text:String,
      name:String,
      edirr:String,
      type:String,
      Payment: String, 
      Date:String,
      
    }
  )
  const UserDetailsScehma = new mongoose.Schema(
    {
      userName: String,
      fullName: String,
      phoneNumber: String,
      email: String,
      password: String,
      cpassword: String,
      Notification:[NotificationScehma],
      UserInformation:[UserInfoSchema],
      role: String,
      verified:Boolean,
      
    },
    {
        collection: "Users",

    }

);
const User = mongoose.model("Users", UserDetailsScehma);
module.exports = User;