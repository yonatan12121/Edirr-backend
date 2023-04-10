const mongoose= require("mongoose");

const AdminNotificationScehma = new mongoose.Schema(
    {
  
      text:String,
      name:String,
      Creator:String,
      edirr:String,
    }
  )
  
const AdminScehma = new mongoose.Schema(
    {
      
      Notification:[AdminNotificationScehma],
     
      
    },
    {
        collection: "Admin",
  
    }
  
  );
  const Admin = mongoose.model("Admin", AdminScehma);
  module.exports = Admin;