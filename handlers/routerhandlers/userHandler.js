



const data = require('../../lib/data')
const {hash}= require('../../helpers/utilities')
const {environment}= require('../../helpers/environments')
const {parseJSON}= require('../../helpers/utilities')


const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptMethods =['get','post','put','delete'];
    if(acceptMethods.indexOf(requestProperties.method)>-1){
        handler._users[requestProperties.method](requestProperties,callback)


    }
    else {
        callback(405)
    }
   
    };
handler._users = {};

handler._users.post=(requestProperties,callback)=>{
    const firstName = typeof(requestProperties.body.firstName) === 'string' ? requestProperties.body.firstName : false ;
    const lastName = typeof(requestProperties.body.lastName) === 'string' ? requestProperties.body.lastName : false ;
    const phone = typeof(requestProperties.body.phone) === 'string' ? requestProperties.body.phone : false ;
    const password = typeof(requestProperties.body.password) === 'string' ? requestProperties.body.password : false ;
    
    if(firstName && lastName && phone && password ){
         //make sure that the user doesnt already exists
         data.read('users',phone,(err1)=>{
            if(err1)
            {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password : hash(password),
                   
                }
                data.create('users',phone,userObject,(err2)=>{
                    if(!err2)
                    {
                       callback(200,{
                        message : 'user was created successfully'
                       })
                    }
                    else {
                        callback (500,
                            {'error':'could not create user'})
                    }
                })

            }
            else {
                callback(400,{
                    'error':'there was a problem in server side'
                })
            }
         })

    }
    else {
        callback(400,{
            error: 'you have a problem in your request!!!',
        });
    }
}



handler._users.get=(requestProperties,callback)=>{
    const phone = typeof(requestProperties.queryStringObject.phone) === 'string' ? requestProperties.queryStringObject.phone : false ;
     if(phone){
            data.read('users',phone,(err,u)=>{
                const user={... parseJSON(u)}
                if(!err & user){
                     delete user.password;
                     callback(200,user);
                }
                else{
                    callback(404,{
                        'error':'requested user was not found'
                    });

                }
            })
     }
     else{
        callback(404,{
            'error':'requested user was not found!!'
        });
     }
}
handler._users.put=(requestProperties,callback)=>{
    
}
handler._users.delete=(requestProperties,callback)=>{
    
}



module.exports = handler;