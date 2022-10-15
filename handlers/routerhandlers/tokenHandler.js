



const data = require('../../lib/data')
const {hash}= require('../../helpers/utilities')
const {environment}= require('../../helpers/environments')
const {parseJSON}= require('../../helpers/utilities')
const {createRandomstring}= require('../../helpers/utilities')



const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptMethods =['get','post','put','delete'];
    if(acceptMethods.indexOf(requestProperties.method)>-1){
        handler._token[requestProperties.method](requestProperties,callback)


    }
    else {
        callback(405)
    }
   
    };
handler._token = {};

handler._token.post=(requestProperties,callback)=>{
    const phone = typeof(requestProperties.body.phone) === 'string' ? requestProperties.body.phone : false ;
    const password = typeof(requestProperties.body.password) === 'string' ? requestProperties.body.password : false ;
    
    if(phone && password){
            data.read('users',phone,(err1,userdata)=>{
                let hashedpassword = hash(password);
                if(hashedpassword=== parseJSON(userdata).password){
                    let tokenId=createRandomstring(20);
                    let expires= Date.now()+60*60*1000;
                    let tokenObject = {
                         phone,
                        'id':tokenId,
                        expires,
                    }
                    data.create('tokens',tokenId,tokenObject,(err2)=>{
                        if(!err2){
                             callback(200,tokenObject)
                        }else{
                            callback(400,{
                                error: 'server side problem',
                            });
                        }
                            });
                        }
                    
    
                else{
                    callback(400,{
                        error: 'pass not valid',
                    });
                }
    })

    }

    else{
        callback(400,{
            error: 'you have a problem in your request!!!'
        });
    }

}



handler._token.get=(requestProperties,callback)=>{
    
   
}
handler._token.put=(requestProperties,callback)=>{
    
}
handler._token.delete=(requestProperties,callback)=>{
    
}



module.exports = handler;