import client from "../db/welspun_db.js";

import ExcelJS from "exceljs";
import moment from "moment";

import nodemailer from "nodemailer";
import * as dtUtil from "../../utility/dateUtility.js";
import fs from "fs";



export const getReportwelspun = async (req, res) => {
  try {
    
    console.log("getOneDayBackDate")
    let workbook = new ExcelJS.Workbook();

    let getOneDayBackDate=moment().subtract(1, "days").format("YYYY-MM-DD")
    console.log("getOneDayBackDate", getOneDayBackDate)
    // Query 1 - Get data for first sheet
    let query1 = `SELECT * FROM salesforce.custom_order__c where sfid is null and CAST(createddate AS DATE) = '${getOneDayBackDate}'`;
    let data1 = await client.query(query1);
    console.log("query1", query1)
    console.log(data1.rows[0])

    // Query 2 - Get data for second sheet
    let query2 = `SELECT * FROM salesforce.sauda__c where sfid is null and CAST(createddate AS DATE) = '${getOneDayBackDate}'`;
    let data2 = await client.query(query2);
    console.log("query2", query2)

    // Query 3 - Get data for third sheet
    let query3 = `SELECT * FROM salesforce.visits__c where sfid is null and CAST(createddate AS DATE) = '${getOneDayBackDate}'`;
    let data3 = await client.query(query3);
    console.log("query3", query3)

    // Query 4 - Get data for fourth sheet
    let query4 = `SELECT * FROM salesforce.lead__c where sfid is null and CAST(createddate AS DATE) = '${getOneDayBackDate}'`;
    let data4 = await client.query(query4);
    console.log("query4", query4)

    // Add data to the first sheet
    let sheet1 = workbook.addWorksheet('Order');
    sheet1.columns = Object.keys(data1.rows[0] || {}).map(key => ({ header: key, key }));
    sheet1.addRows(data1.rows);


    // Add data to the second sheet
    let sheet2 = workbook.addWorksheet('Sauda');
    sheet2.columns = Object.keys(data2.rows[0] || {}).map(key => ({ header: key, key }));
    sheet2.addRows(data2.rows);

    // Add data to the third sheet
    let sheet3 = workbook.addWorksheet('visit');
    sheet2.columns = Object.keys(data3.rows[0] || {}).map(key => ({ header: key, key }));
    sheet2.addRows(data3.rows);

    // Add data to the fourth sheet
    let sheet4 = workbook.addWorksheet('lead');
    sheet2.columns = Object.keys(data4.rows[0] || {}).map(key => ({ header: key, key }));
    sheet2.addRows(data4.rows);


    // const timestamp = new Date().toISOString().replace(/[-:T]/g, '_').split('.')[0]; // Format: YYYY_MM_DD_HH_MM_SS
    let timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    let fileName = `Report_${timestamp}.xlsx`;

    // Write to file
    await workbook.xlsx.writeFile(fileName);

    const sendEmailWithAttachment = async (fileName) => {
      var transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secureConnection: false,
        // service: 'outlook',
        tls: {
          ciphers: 'SSLv3'
        },
        auth: {
          user: 'developer@uniproworld.com',
          pass: 'ajayverma123@4',
        }
      });

      let mailOptions = {
        from: 'developer@uniproworld.com',
        to: 'hyshubh@gmail.com', // Change to recipient's email
        subject: 'Excel Report',
        text: 'Attached is the latest Excel report.',
        attachments: [
          {
            filename: fileName,
            path: `./${fileName}`
          }
        ]
      };

      try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };
    await sendEmailWithAttachment(fileName);
    fs.unlinkSync(fileName);
    console.log(`File created successfully: ${fileName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in Project A DB");
  }
};