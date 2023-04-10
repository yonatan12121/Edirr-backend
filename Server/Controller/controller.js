
const express = require('express');
const app = express();
app.use(express.json());
const chapa = require('chapa-nodejs');
const bcrypt = require("bcryptjs");


const cors = require("cors");
app.use(cors());
var User = require('../model/UserModel');
var Admin = require('../model/AdminModel');
var Edirs = require('../model/model');
var UserInfo = require('../model/UserInfoModel');
const jwt = require("jsonwebtoken");

const JWT_SECRET = "nhjndshnbhsiduy78q3ye3yhrewhriewopfew[fpe-fpe-pf[df[s;f[ds;f[ds;f[ds;f[ds;,fld,s.mdnshbgvcarfdtwygyqgygdhsabjbcnvgawqrr6t8siahjdvdgvds()!@#$%^&*";


// app.get('/', (req, res) => {
//     try {
//       Post.find({}).then(data => {
//         res.json(data)
//       }).catch(error => {
//         res.status(408).json({ error })
//       })
//     } catch (error) {
//       res.json({ error })
//     }
//   })

//   app.post("/uploads",
  
  exports.uploads = async (req, res) => {
    console.log("we are in upload");
    const body = req.body;
    try {
      const newImage = await Post.create(body)
      newImage.save();
      res.status(201).json({ msg: "New image uploaded...!" })
    } catch (error) {
      res.status(409).json({ message: error.message })
      console.log(error);
    }
  }
//   )
// app.get("/img",
  exports.img=async(req, res) => {
    console.log("we are fetching the images");
    Post.find((err, docs) => {
      if (!err) {
        res.render("post", {
          data: docs
        });
      } else {
        console.log('Failed to retrieve the Course List: ' + err);
      }
    });
  
  }
//   )
// app.get("/api/get/payli",
exports.payli=(req, res) => {
    const name = "werfa";
    const sqlGet = "SELECT * FROM werfano ";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  }
//   );
  
  
  
  
//   app.post("/register", 
  exports.register=async (req, res) => {
    const { userName, fullName, phoneNumber, email, password, cpassword } = req.body;
    const role = "user";
    // const Creator =email;
  
    const encreptedPassword = await bcrypt.hash(password, 10);
  
    console.log("hello");
  
    try {
      await User.create({
        userName,
        fullName,
        phoneNumber,
        email,
        password: encreptedPassword,
  
        role,
      });
      res.send({ status: "ok" });
      console.log("success");
      await UserInfo.create({
        email
      });
  
  
    } catch (error) {
      res.send({ status: "error" });
      console.log(error);
  
    }
  }
//   );
  
  
//   app.patch("/update", async (req, res) => {
  
  
//   });
  
  
  

  
//   app.post("/CreateEdir", 

  exports.CreateEdir = async (req, res) => {
    const {
      visiblty,
      NameOfeDirr,
      Location,
      eDirrType,
      Amount,
      Rqdate,
      PaymentDuration,
      PaymentDay,
      Description,
      Creator,
    } = req.body;
  
  
    console.log("eDirr created ");
  
    try {
      await Edirs.create({
        visiblty,
        NameOfeDirr,
        Location,
        eDirrType,
        Amount,
        Rqdate,
        PaymentDuration,
        PaymentDay,
        Description,
        Creator,
      })
      Admin.updateOne({ _id: "641b09fbc5dd296cf1c700a7" }, { $push: { Notification: [{   text: Creator+"have created " + NameOfeDirr, Creator:Creator,edirr: NameOfeDirr }] } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("NOtified")
       
  
  
  
  
  
      });
      res.send({ status: "ok" });
      console.log("eDirr created successfully");
  
  
    } catch (error) {
      res.send({ status: "error" });
      console.log(error);
  
    }
  }
//   );
  
  
  
  
  
  // app.post("/register1", async (req, res) => {
  //   const { userName,fullName,phoneNumber,email,password,cpassword } = req.body;
  //   const role= "admin";
  //     console.log("hello");
  
  //     try {
  //         await User.create({
  //           userName,
  //           fullName, 
  //           phoneNumber,
  //           email,
  //           password,
  //             role,
  //         });  
  //         res.send({ status: "ok" });
  //         console.log("success");
  
  
  //     } catch (error) {
  //         res.send({status: "error" });
  //         console.log("error");
  
  //     } 
  // });
  
  
//   app.get("/Getedirr", 
  exports.Getedirr=(req, res) => {
    console.log("ughyugh");
    Edirs.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
  
        console.log(data)
        res.status(200).send(data);
  
      }
    })
  
  }
//   )
//   app.get("/Getuser",
  exports.Getuser= async (req, res) => {
    UserInfo.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        console.log(data.length);
        res.status(200).send(data);
  
  
      }
    })
  
  }
//   )
  
  // Edirs.find({Members:[{Email:email}]}, 
  // Edirs.find({Members:[{Email:email}]},{$push:{Members:[{Email:email}]}},(err,doc)=>{
  //   if (err) return console.log(err);
  //   User.updateOne({email:email},{$push:{Notification:[{text:"you have joined "+ edirr,edirr:edirr}]}},(err,doc)=>{
  //     if (err) return console.log(err);
  //     console.log("NOtified")
  //   });
  //   res.json(doc)
  
  // });
  
  
  // ({Members:{$elemMatch: {"Email":email}}}
//   app.post("/Getedirrho", 
exports.Getedirrho = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    Edirs.find({ Members: { $elemMatch: { "Email": email } } }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).send(data);
  
  
      }
    })
  
  }


  exports.LeaveEdirr = async (req, res) => {
    const { id, } = req.body;
    console.log(id);
    Edirs.updateOne({ _id: id }, { $pull: { Members: { Email: email} } }, (err, doc) => {
      // if (err) return console.log(err);
      if (err) {
        res.status(500).send(err);
      }
      else {

        res.status(200).send(data);
  
  
      }
    })
  
  }


//   )
  
  
  
  
  
  
  
  
//   app.post("/Getnot", 
  exports.Getnot=async (req, res) => {
    const { email } = req.body;
    console.log(email);
    User.find({ email: email }, 'Notification',
  
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(200).send(data);
  
  
        }
      })
  
  }
//   )
  
//   app.get("/GetAdminnot", 
  exports.GetAdminnot=async (req, res) => {
    // const { email } = req.body;
    // console.log(email);
    Admin.find({ _id: "641b09fbc5dd296cf1c700a7" }, 'Notification',
  
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          console.log(data);
          res.status(200).send(data);
  
  
        }
      })
  
  }
//   )
  
//   app.post("/GetReqnot",
  exports.GetReqnot = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const u = Edirs.find({ $elemMatch: { "Creator": email } })
    Edirs.find({ Creator: email },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(200).send(data);
  
  
        }
      }
  
    )
    // const users = await Edirs.findOne({"Creator":email});
    // console.log(u);
    // Edirs.find({Creator:email}, 'Request',
  
    //   (err,data)=>{
    //   if(err){
    //     res.status(500).send(err);
    //   }
    //   else{
    //     res.status(200).send(data);
  
  
    //   }
    // })
  
  }
//   )
  
  
  
  
//   app.post("/Getmemb", 
  exports.Getmemb = async (req, res) => {
    const { email, edirrName } = req.body;
    console.log(edirrName);
    Edirs.findOne({ NameOfeDirr: edirrName }, 'Members',
  
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(200).send(data);
  
  
        }
      })
  
  }
//   )
  
  
  
  
  
  
  
  
//   app.post("/Getedirr", 
  exports.Getedirrs = async (req, res) => {
    const eDirr = await Edirs.findOne({});
    var NameOfeDirr = eDirr.NameOfeDirr;
    var Location = eDirr.Location;
    var eDirrType = eDirr.eDirrType;
    var Amount = eDirr.Amount;
    var Rqdate = eDirr.Rqdate;
    var PaymentDuration = eDirr.PaymentDuration;
    var PaymentDay = eDirr.PaymentDay;
    var Description = eDirr.Description;
    var Creator = eDirr.Creator;
    return res.json({
      status: "ok", NameOfeDirr,
      Location,
      eDirrType,
      Amount,
      Rqdate,
      PaymentDuration,
      PaymentDay,
      Description,
      Creator,
    });
  
  }
//   );
  
//   app.post("/profile", 
  exports.profile=async (req, res) => {
    
    // console.log(password);
    // console.log(email);
    // const user = await User.findOne({ email });
    const { email } = req.body;
    const info = await UserInfo.findOne({ email });
    var nation = info.nation;
    var firstName = info.firstName;
    var lastName = info.lastName;
    var dateOfBirth = info.dateOfBirth;
    var gender = info.gender;
    var image = info.myFile;
    var city = info.city;
    var subCity = info.subCity;
    var wereda = info.wereda;
    var kebele = info.kebele;
    var houseNumber = info.houseNumber;
    var phoneNumber = info.phoneNumber;
    var level = info.level;    var position = info.position;
    var institution = info.institution;
    var place = info.place;
    var certificate = info.certificate;
    var workId = info.workId;
    var title = info.title;
    var partner = info.partner;
    var parent_po_no = info.parent_po_no;
    var parent_address = info.parent_address;
    var childName = info.childName;
    var childGender = info.childGender;
    var childAge = info.childAge;
    var emergency_contact = info.emergency_contact;
    var relationship = info.relationship;
    var EmergencyPhoneNo = info.EmergencyPhoneNo;
    var Emergencyaddress = info.Emergencyaddress;
    // console.log("wewewe"+nation);
    return res.json({
      status: "ok", nation, email,
      firstName,
      lastName,
      dateOfBirth,
      nation,
      gender,
      image,
      city,
      subCity,
      wereda,
      kebele,
      houseNumber,
      phoneNumber,
      level,
      position,
      institution,
      place,
      certificate,
      workId,
      title,
      partner,
      parent_po_no,
      parent_address,
      childName,
      childGender,
      childAge,
      emergency_contact,
      relationship,
      EmergencyPhoneNo,
      Emergencyaddress,
    });
  
  }
//   );
  
  
//   app.post("/payment", 
  exports.payment=async (req, res) => {
    const { email, Amount, edirrName } = req.body;
    console.log(Amount + email);
    const ch = new chapa.Chapa(
      {
        secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
      }
    )
  
    const tx_ref = await ch.generateTransactionReference({
      prefix: 'Edir',
      size: 20
    });
  
    var options = {
      'method': 'POST',
      'url': 'https://api.chapa.co/v1/transaction/initialize',
      'headers': {
        'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": Amount,
        "currency": "ETB",
        "email": email,
        "first_name": "Yonatan",
        "last_name": "Mekonnen",
        "phone_number": "0912345678",
        "tx_ref": tx_ref,
        "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        "return_url": "http://localhost:3000/my-edirr",
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "You have paid your inital payment "
      })
  
    };
  
    request(options, function (error, response) {
      if (error) throw new Error(error);
      Edirs.updateOne({ "NameOfeDirr": edirrName }, { $set: { "Members.$[].Payment": "Payed" } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("payed")
        console.log("chapa said" + response.body);
        const respBody = JSON.parse(response.body);
  
        return res.json({ url: respBody.data.checkout_url });
        // console.log(respBody.data.checkout_url);
        // res=response.body;
        // return res.json(respBody);
      })
    });
    // if (err) return console.log(err);
    //       console.log("NOtified")
    //     });
    //     res.json(doc)
    //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
    // Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
    //   const users = await Edirs.findOne({Members:{$elemMatch: {"Email":email,"Payment":"Payed"}}});
  
  }
//   );
  
  
  
//   app.post("/checkmonthpayment", 
  exports.checkmonthpayment = async (req, res) => {
    const { email, edirrName, toDay } = req.body;
    console.log("the name is  " + edirrName);
    const user = await Edirs.findOne({ edirrName });
    console.log(toDay);
    // const cursor = db.collection('inventory').find({
    //   instock: { $elemMatch: { qty: 5, warehouse: 'A' } }
    // });
  
    // const u = JSON.parse(user.Members);
    // console.log(u);
    const users = await Edirs.findOne({ "NameOfeDirr": edirrName, "MonthlyPayment.Email": email, "MonthlyPayment.Date": toDay });
    // const users = await Edirs.find({MonthlyPayment:{Email:email}});
    // console.log(users);
    var check;
    console.log(users);
    if (!users && users === null) {
      check = "Not Payed";
    } else {
      check = "Payed";
    }
    console.log(check);
    return res.json({ check });
  
  }
//   );
  
  
  
  
  
  
  
//   app.post("/monthpayment", 
  exports.monthpayment = async (req, res) => {
    const { email, Amount, edirrName } = req.body;
    const now = new Date();
    const aa = String(now);
    var bb = aa.split(" ", 4);
    const today = bb.join();
    console.log(Amount + email);
    const ch = new chapa.Chapa(
      {
        secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
      }
    )
  
    const tx_ref = await ch.generateTransactionReference({
      prefix: 'Edir',
      size: 20
    });
  
    var options = {
      'method': 'POST',
      'url': 'https://api.chapa.co/v1/transaction/initialize',
      'headers': {
        'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": Amount,
        "currency": "ETB",
        "email": email,
        "first_name": "Yonatan",
        "last_name": "Mekonnen",
        "phone_number": "0912345678",
        "tx_ref": tx_ref,
        "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        "return_url": "http://localhost:3000/my-edirr",
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "You have paid your inital payment "
      })
  
    };
  
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // ({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
      // UserInfo.updateMany({email: email},{$set:{firstName:firstName,lastName:lastName,dateOfBirth:DOB,nation:nation,gender:gender,myFile:postImage}}
      // Edirs.updateMany({"NameOfeDirr": edirrName},{$push:{MonthlyPayment:{Email:email,Date:today,Amount:Amount}}.$[].Email":email,"MonthlyPayment.$[].Date":today,"MonthlyPayment.$[].Amount":Amount}}
      Edirs.updateMany({ "NameOfeDirr": edirrName }, { $push: { MonthlyPayment: { Email: email, Date: today, Amount: Amount } } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("payed")
        console.log("chapa said" + response.body);
        const respBody = JSON.parse(response.body);
  
        return res.json({ url: respBody.data.checkout_url });
        // console.log(respBody.data.checkout_url);
        // res=response.body;
        // return res.json(respBody);
      })
    });
    // if (err) return console.log(err);
    //       console.log("NOtified")
    //     });
    //     res.json(doc)
    //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
    // Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}}
    //   const users = await Edirs.findOne({Members:{$elemMatch: {"Email":email,"Payment":"Payed"}}});
  
  }
//   );
  
  
  
  
  
  
  
  
  
//   app.post("/Join", 
  exports.Join = async (req, res) => {
    const { email, NameOfeDirr, Creator } = req.body;
    console.log(email, NameOfeDirr, Creator);
    Edirs.updateOne({ NameOfeDirr: NameOfeDirr }, { $push: { Member: [{ Email: email }] } }, (err, doc) => {
      if (err) return console.log(err);
      User.updateOne({ email: Creator }, { $push: { Notification: [{ text: email + " wants to join your edirr", name: email, edirr: NameOfeDirr }] } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("NOtified")
      });
      res.json(doc)
  
    });
  
  
  
  }
//   );
  
  
  
//   app.post("/Accept1", 
  exports.Accept1=async (req, res) => {
    const { email, edirr, Creator } = req.body;
    console.log(Creator);
    Edirs.updateOne({ NameOfeDirr: edirr }, { $push: { Members: { Email: email, Payment: "Not Payed" } } }, (err, doc) => {
      if (err) return console.log(err);
      User.updateOne({ email: email }, { $push: { Notification: [{ text: "you have joined " + edirr, edirr: edirr }] } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("NOtified")
        User.updateOne(
          { email: Creator },
          { $pull: { Notification: { name: email } } }, (err, doc) => {
            if (err) return console.log(err);
            console.log("removed the notification")
  
  
  
          })
  
  
  
  
  
      });
      res.json(doc)
  
    });
  
  
  
  }
//   );
  
//   app.post("/RequestService", 
  exports.RequestService = async (req, res) => {
    const { email, edirrName, Reason, postImage, creator } = req.body;
    console.log(email);
    Edirs.updateOne({ NameOfeDirr: edirrName }, { $push: { Request: { Email: email, Reason: Reason, Evidence: postImage, Payment: "Not Paid", Edirr: edirrName } } }, (err, doc) => {
      if (err) return console.log(err);
      User.updateOne({ email: creator }, { $push: { Notification: [{ text: email + " wants to request your edirr for " + Reason, name: email, edirr: edirrName }] } }, (err, doc) => {
        if (err) return console.log(err);
        console.log("Notified")
      });
      res.json(doc)
  
    });
  
  }
//   );
  
  
//   app.post("/AcceptService", 
  exports.AcceptService=async (req, res) => {
    const { Email, Reason, Amount, Edirr } = req.body;
    const ch = new chapa.Chapa(
      {
        secretKey: "CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF"
      }
    )
  
    const tx_ref = await ch.generateTransactionReference({
      prefix: 'Edir',
      size: 20
    });
  
    var options = {
      'method': 'POST',
      'url': 'https://api.chapa.co/v1/transaction/initialize',
      'headers': {
        'Authorization': 'Bearer CHASECK_TEST-SLHPTDx9tbv7BkdaNmx45Lu4yLkcvLcF',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": Amount,
        "currency": "ETB",
        "email": Email,
        "first_name": "Yonatan",
        "last_name": "Mekonnen",
        "phone_number": "0912345678",
        "tx_ref": tx_ref,
        "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        "return_url": "http://localhost:3000/my-edirr",
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "You have paid your inital payment "
      })
  
    };
    //  Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}},(err,doc)=>{
    request(options, function (error, response) {
      if (error) throw new Error(error);
      Edirs.updateOne({ "NameOfeDirr": Edirr, "Request.$[].Email": Email }, { $set: { "Request.$[].Payment": "Payed" } }, (err, doc) => {
        if (err) return console.log(err);
        User.updateOne({ email: Email }, { $push: { Notification: [{ text: "you'r request have been accecpted for the reason  " + Reason }] } },
          (err, doc) => {
            if (err) return console.log(err);
            console.log("NOtified");
            // Edirs.updateOne(
            //   {email:Creator },
            //  {$pull : {Request:{name:email}}},(err,doc)=>{
            //    if (err) return console.log(err);
            //    console.log("removed the notification")
  
  
  
            //  })
  
          });
        console.log("payed")
        console.log("chapa said" + response.body);
        const respBody = JSON.parse(response.body);
  
        return res.json({ url: respBody.data.checkout_url });
  
        // console.log(respBody.data.checkout_url);
        // res=response.body;
        // return res.json(respBody);
      })
    });
  
  
  
  
  
  
  
  
  
  
  
    //   console.log(email);
    //   Edirs.updateOne({NameOfeDirr: edirr},{$push:{Members:{Email:email,Payment:"Not Payed"}}},(err,doc)=>{
    //     if (err) return console.log(err);
    // User.updateOne({email:email},{$push:{Notification:[{text:"you'r request have been accecpted from edirr "+edirr,edirr:edirr}]}},
    //     (err,doc)=>{
    //       if (err) return console.log(err);
    //       console.log("NOtified")
    //     });
    //     res.json(doc)
  
    //   });
  
  
  
  }
//   );
  
  
  
  
  
//   app.post("/checkpayment", 
  exports.checkpayment=async (req, res) => {
    const { email, edirrName } = req.body;
    console.log("the name is  " + edirrName);
    const user = await Edirs.findOne({ edirrName });
  
  
  
    // const u = JSON.parse(user.Members);
    // console.log(u);
    const users = await Edirs.findOne({ "NameOfeDirr": edirrName, "Members.Email": email, "Members.Payment": "Not Payed" });
    // console.log(users);
    var check;
    console.log(users);
    if (!users && users == null) {
      check = "Payed";
    } else {
      check = "Not Payed";
    }
    console.log(check);
    return res.json({ check });
  
  }
//   );
  
  
  
//   app.post("/login-user", 
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log("emaillll",email);
    const user = await User.findOne({ email });
    const info = await UserInfo.findOne({ email });
    console.log("emrgency address",info.Emergencyaddress);
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });
      var check;
      if (!info.Emergencyaddress && info.Emergencyaddress == null) {
        check = "notDone";
      } else {
        check = "Done";
      }
  
      if (res.status(201)) {
        const email = user.email;
        const password = user.password;
        console.log(email);
        const role = user.role;
        const fullName = user.fullName;
        if (role == "user") {
          return res.json({ status: "ok", role: "user", email, password, fullName, check, data: token });
        } if (role == "admin") {
          return res.json({ status: "ok", role: "admin", data: token });
        }
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  }
//   );
  
  
  // app.post("/uploads", async (req, res) => {
  //   console.log("we are in upload");
  //   const body = req.body;
  //   try{
  //       const newImage = await  Post.create(body)
  //       newImage.save();
  //       res.status(201).json({ msg : "New image uploaded...!"})
  //   }catch(error){
  //       res.status(409).json({ message : error.message })
  //       console.log(error);
  //   }
  // })
  
//   app.post("/UpdateBasic", 
  exports.UpdateBasic=async (req, res) => {
    const { email, firstName, lastName, DOB, nation, gender, postImage } = req.body;
    console.log(email, firstName, lastName, DOB, nation, gender);
    // console.log(postImage);
    UserInfo.updateMany({ email: email }, { $set: { firstName: firstName, lastName: lastName, dateOfBirth: DOB, nation: nation, gender: gender, myFile: postImage } }, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc)
    });
  
  }
//   );
//   app.post("/UpdateEmergency", 
  exports.UpdateEmergency=async (req, res) => {
    console.log("we in emrgency");
    const { email, emergency, relationship, EPN, EA } = req.body;
    UserInfo.updateMany({ email: email }, { $set: { emergency_contact: emergency, relationship: relationship, EmergencyPhoneNo: EPN, Emergencyaddress: EA } }, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc)
    });
  
  }
//   );
//   app.post("/UpdateAddress", 
  exports.UpdateAddress=async (req, res) => {
    console.log("we in emrgency");
    const { email, city, subCity, wereda, kebele, houseNumber, phoneNumber } = req.body;
    UserInfo.updateMany({ email: email }, { $set: { city: city, subCity: subCity, wereda: wereda, kebele: kebele, houseNumber: houseNumber, phoneNumber: phoneNumber } }, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc)
    });
  
  }
//   );
  
//   app.post("/UpdateEducation", 
  exports.UpdateEducation=async (req, res) => {
    console.log("we in emrgency");
    const { email, level, position, institution, place, certificate, workId, postcertificate, ostexperience } = req.body;
    UserInfo.updateMany({ email: email }, { $set: { level: level, position: position, institution: institution, place: place, certificate: certificate, workId: workId, certificateres: postcertificate, experienceres: postexperience } }, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc)
    });
  
  }
//   );
//   app.post("/UpdateMarital", 
  exports.UpdateMarital= async (req, res) => {
    console.log("we in marital");
    const { email, title, partner, PPN, PA, childName, childGender, childAge } = req.body;
    UserInfo.updateMany({ email: email }, { $set: { title: title, partner: partner, parent_po_no: PPN, parent_address: PA, childName: childName, childGender: childGender, childAge: childAge } }, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc)
    });
  
  }
//   );
  
  
  
  
//   app.post("/login-user1", 
  exports.loginUser1=async (req, res) => {
    const { email, password } = req.body;
    console.log(password);
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({}, JWT_SECRET);
      if (res.status(201)) {
        const role = user.role;
        if (role == "admin") {
          return res.json({ status: "ok", role: "admin", data: token });
        } if (role == "user") {
          return res.json({ status: "ok", role: "user", data: token });
        }
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  }
//   );