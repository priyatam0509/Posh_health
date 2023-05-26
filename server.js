const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
const fs = require('fs');
const PDFDocument = require('pdfkit');
const {Registrationinvoice} =require("./Invoice/Registrationinvoice")

//const fs = require('fs');





const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Route
app.get("/", (req, res) => {
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
  console.log("req.body.",req.body.form)
  var doc=Registrationinvoice(req.body.form)
  try {
    const form = req.body.form;
    const send_to = req.body.to;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = req.body.to;
    const subject = req.body.subject;//"Registration In POSH HEALTH CLUB";
    const message =req.body.mailBody;
    const attachments= [
      {
          filename: "invoice.pdf",
          content:doc
      },
  ];
    
    await sendEmail(subject, message, send_to, sent_from, reply_to, attachments);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});


app.post("/api/sendemailWithAttchement", async (req, res) => {
  ///const { email,amount,subscription,renewStartDate,renewEndDate,userName } = req.body;
  console.log('req.body: ', req.body);


  try {
    const send_to = req.body.to;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = req.body.to;
    const subject = req.body.subject;//"Registration In POSH HEALTH CLUB";
    const message =req.body.mailBody
    const attachments= [
      {
          filename: "inovices_1.pdf", // the file name 
          path: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",// link your file
          contentType: "application/pdf", //type of file
      },
      {
          filename: "inovices_2.pdf",
          path: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
          contentType: "application/pdf",
      },
  ];
    var mailOption = {
      from: sent_from,
      to:  reply_to,
      subject: subject,
      
      html: req.body.mailBody,
      attachments: attachments
}

    await sendEmail(subject, message, send_to, sent_from, reply_to,attachments);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/sentmailTest",async (req,res)=>{

  const html = `<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1>Heading 1</h1>
    <h2 style="background-color: pink">Heading 2</h2>
    <h3>Heading 3</h3>
    <h4 class="my-heading4">Heading 4</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      and
      <a href="http://google.com">link</a>
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
          <td>Foobar</td>
        </tr>
        <tr>
          <td colspan="2">Foo</td>
          <td>Bar</td>
        </tr>
        <tr>
          <td>Some longer thing</td>
          <td>Even more content than before!</td>
          <td>Even more content than before!</td>
        </tr>
      </tbody>
    </table>
    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>
function myCode() {
  const foo = 'bar';
}
</pre>
  </body>
</html>
`;

let pdfDoc = new PDFDocument;
pdfDoc.text(html)
pdfDoc.end();

var doc=Registrationinvoice()
  try {
    const send_to = "threegrowingmusketeers@gmail.com";
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "threegrowingmusketeers@gmail.com";
    const subject = "Testmail";//"Registration In POSH HEALTH CLUB";
    const message ="<b>Testing</b>"
    const attachments= [
      {
          filename: "testing.pdf",
          content:doc

      },

  ];
    

    await sendEmail(subject, message, send_to, sent_from, reply_to,attachments);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }


})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});