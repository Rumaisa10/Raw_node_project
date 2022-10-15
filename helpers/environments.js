const environments ={}

environments.staging ={
    port: 4000,
    envName : 'staging',
    secretKey : 'dshfhefu',
    twilio:{
        fromPhone :'+1500555006',
        accountSid : 'ACb32d411ad7fe886aac54c665d25e5c5d',
        authToken : '9455e3eb3109edc12e3d8c92768f7a67'
    }
};

environments.production ={
    port: 5000,
    envName : 'production',
    secretKey : 'hddsidf',
    twilio:{
        fromPhone :'+1500555006',
        accountSid : 'ACb32d411ad7fe886aac54c665d25e5c5d',
        authToken : '9455e3eb3109edc12e3d8c92768f7a67'
    }
};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV : 
'staging';

const environmentToExport =
typeof environments[currentEnvironment] === 'object'
? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;