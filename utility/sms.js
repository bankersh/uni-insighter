
require("dotenv").config();
var request = require("request"); 
let http = require('http');

var otpGenerator = require('otp-generator');

var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.



function sendOTPLogin(mobile,otp)
{
     //*********************************************************** twillio*/
// Send the text message.
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// var client = new twilio(accountSid,authToken);


//         client.messages.create({
//         to: '+91'+mobile,
//         from: '+18324302571',
//         body: "Your OTP for login is"+otp
//         }).then(message => console.log(message.sid)).catch(err=>{
//             console.log(err)
//         });
         //*********************************************************** textlocal*/
    // let options = {
    //     'apikey': `${process.env.TEXTLCL}`,
    //     'message':"This is a test message your one time password for activateing your Textlocal account is:",
    //     'sender': 'txtlcl',
    //     'numbers': mobile
    // }
    // return new Promise((resolve, reject) => {
    //     request.post({ url: 'https://api.textlocal.in/send/', form: options }, (error, response, body) => {
    //         if (error) {
    //             return reject(error);
    //         }
    //         console.log(body)
    //         resolve({ response, body });
    //     })
    // })
        //*********************************************************** msg91*/

    // let mobile = '9818508785';
    // let mobile = '8839592379';
    var options = {
        "method": "GET",
        "hostname": "2sms.in",
        "port": null,
        "path": `/api/sendhttp.php?authkey=363534ALJquGNDQ60dc4355P1&mobiles=${mobile}&message=Your%20one%20time%20password%20is%20${otp}.%20Please%20use%20this%20One%20Time%20Password%20(OTP)%20within%20the%20next%20five%20minutes%20to%20proceed.%20Jaideep%20Ispat%20and%20Alloys%20Pvt.%20Ltd.&sender=MoiraS&route=4&country=91&campaign=test&DLT_TE_ID=1307165907750446869`,
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "fcd92d9b-8da0-ffa0-0e0c-f0f592464f8c"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      
      req.end();
}

const generateOTP = (data) => { 
    return otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false});
};

function InfPointsAdd(mobile, influencer_name, points, cumulative_point_dealer, dealer_name) {
  try {
    // truncate long dealer name and remove (extra white spaces, tabs, lines)
    if(dealer_name){
      dealer_name = dealer_name.trim().replace(/\s+/g, ' ');
    }

    if(dealer_name && dealer_name.length > 30){
      dealer_name = dealer_name.slice(0 , 30) + '...';
    }

    var options = {
      "method": "GET",
      "hostname": "2sms.in",
      "port": null,
      "path": `/api/sendhttp.php?authkey=363534ALJquGNDQ60dc4355P1&mobiles=${encodeURIComponent(mobile)}&message=Dear%20${encodeURIComponent(influencer_name)},%20${encodeURIComponent(points)}%20Points%20added%20in%20Your%20Account.%20Total%20Points%20Till%20Date%20${encodeURIComponent(cumulative_point_dealer)}.%20Dealer%20Name%20-${encodeURIComponent(dealer_name)}.%20MoiraSariya.&sender=MoiraS&route=4&country=91&campaign=test&DLT_TE_ID=1307167585369932286`,
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "fcd92d9b-8da0-ffa0-0e0c-f0f592464f8c"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
  } catch (err) {
    console.log("error in SMS", err)
  }
}

function deleteInfPoints(mobile, influencer_name, points, cumulative_point_dealer, dealer_name) {
  try {
    if(dealer_name){
      dealer_name = dealer_name.trim().replace(/\s+/g, ' ');
    }

    if(dealer_name && dealer_name.length > 30){
      dealer_name = dealer_name.slice(0 , 30) + '...';
    }
    
    var options = {
      "method": "GET",
      "hostname": "2sms.in",
      "port": null,
      "path": `/api/sendhttp.php?authkey=363534ALJquGNDQ60dc4355P1&mobiles=${encodeURIComponent(mobile)}&message=Dear%20${encodeURIComponent(influencer_name)},%20${encodeURIComponent(points)}%20Points%20Deleted%20From%20Your%20Account.%20Total%20Points%20Till%20Date%20${encodeURIComponent(cumulative_point_dealer)}.%20Dealer%20Name%20-${encodeURIComponent(dealer_name)}.%20MoiraSariya.&sender=MoiraS&route=4&country=91&campaign=test&DLT_TE_ID=1307167585372806170`,
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "fcd92d9b-8da0-ffa0-0e0c-f0f592464f8c"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
  } catch (err) {
    console.log("error in SMS", err)
  }
}


  module.exports = {
    sendOTPLogin,
    generateOTP,
    InfPointsAdd,
    deleteInfPoints
};
