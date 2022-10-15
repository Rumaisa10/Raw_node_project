const https = require('https');
const querystring = require('querystring');
const {twilio}=require('./environments')


const notification = {};

notification.sendTwilionSms = (phone,msg,callback)=>{
   const userPhone = typeof(phone) ==='string' && phone.trim().length ===11? phone.trim(): false
   const usermsg=typeof(msg)==='string' && msg.trim().length>0 && msg.trim().length<1600? msg.trim() : false

   if(userPhone && usermsg)
   {
        const payload ={
            From : twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: usermsg,
        }
         const stringifyPayload=querystring.stringify(payload)
         const requestDetails = {
            hostname: 'api.twilio.com',
            method : 'POST' ,
            path : `/2010-04-01/Accounts/{AccountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers : {
                'Content-Type':'application/x-www-form-urlencoded'
            }
         }
         const req = https.request(requestDetails,(res)=>{
            const status = res.statusCode;
            if(status ===200 || status ===201 ){
                callback(false)
            }
            else{
                callback(`status code returned was ${status}`)
            }
         })
         req.on('error',(e)=>{
            callback(e)
         })
         req.write(stringifyPayload)
         req.end()
   }
   else{
    callback('given info were missing')
   }
}
module.export = notification;