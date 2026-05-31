

function Interceptor(req,res,next){
   console.log("url : "+req.url+" "+"method : "+req.method);
    next();
}

export default Interceptor;