

const crypto = require('crypto')
const utilities ={};
const environments= require('./environments')

utilities.parseJSON=(jsonString)=>{
    let output;

    try {
        output = JSON.parse(jsonString);
    }
    catch {
        output = {};
    }

    return output;

};

utilities.hash=(str)=>{
   if(typeof str === 'string' && str.length>0)
   {
    const hash = crypto
    .createHmac('sha256', environments.secretKey)
    .update(str)
    .digest('hex');

    return hash;
   }
   else return false;
    }

    utilities.createRandomstring=(strlength)=>{
        let length = strlength;
        length = typeof(strlength)==='number' && strlength > 0 ? strlength : false;
         if (length){
            let possiblecharaceters ='abcdefghijklmnop1234567890';
            let output = '';
            for (let i =1 ;i<length+1;i++)
            {
                let randomcharacter = possiblecharaceters.charAt(Math.floor(Math.random()*possiblecharaceters.length))
                output += randomcharacter;

            }
            return output;
              
         }
         else{
            return false;
         }
       return 'jdhf'
         }
     



module.exports = utilities;