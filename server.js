import express, { static } from "express";
import cors from "cors";
import { createTransport } from "nodemailer";
import { Form } from "multiparty";
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));

app.use("/public", static(process.cwd() + "/public"));

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

const transporter = createTransport({
  host: "Gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready . . .");
  }
});

app.post("/send", (req, res) => {
  let form = new Form();
  let data = {};
  form.parse(req, function (err, feilds) {
    console.log(feilds);
    object.keys(feilds).forEach(function (property) {
      data[property] = feilds[property].toString();
    });
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name}<${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipent");
      }
    });
  });
});
