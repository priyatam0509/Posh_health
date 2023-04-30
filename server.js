const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
// const path = require("path")

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.use(express.static(path.join(__dirname,'./Frontend/build')));
// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname,'./Frontend/build/index.html'));
// });

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/api/test", (req, res) => {
  res.send("Home Page");
});
var maillist = [
  'piyushpriya435e@gmail.com',
  'piyatam.official.piyush@gmail.com',
  'threegrowingmusketeers@gmail.com',
];

maillist.toString();
app.post("/api/sendemail", async (req, res) => {
  const { email,amount,subscription,renewStartDate,renewEndDate,userName } = req.body;
  console.log('req.body: ', req.body);
  

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Registration In POSH HEALTH CLUB";
    const message = `
        <h3>Hello ${userName}</h3>
        <p>You have sucessfully renew your subscription of ${subscription}</p>
        <p>Your have paid Rs.${amount}</p>
        <p>Your subscription expiry date is ${renewEndDate}</p>
    `;
    

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/api/sendemailnew", async (req, res) => {
  ///const { email,amount,subscription,renewStartDate,renewEndDate,userName } = req.body;
  console.log('req.body: ', req.body);


  try {
    const send_to = req.body.to;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = req.body.to;
    const subject = req.body.subject;//"Registration In POSH HEALTH CLUB";
    const message =req.body.mailBody
    

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});