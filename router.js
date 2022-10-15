const {sampleHandler}= require('./handlers/routerhandlers/sampleHandlers')
const {userHandler}=require('./handlers/routerhandlers/userHandler')
const {tokenHandler}=require('./handlers/routerhandlers/tokenHandler')
const {checkHandler}=require('./handlers/routerhandlers/checkHandler')

const routes ={
    'sample': sampleHandler,
    user : userHandler,
    token : tokenHandler,
    check : checkHandler
}
module.exports = routes;