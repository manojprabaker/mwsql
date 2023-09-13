// const auth=(req,res,next)=>{

//     const user=req.session.userid;
//     console.log("user",user)
//     if(user){
//     next()
//     }
//     else{
//     res.redirect("/signin");
//     }
//     }
    
    
//     module.exports=auth;
    
const auth=(req,res,next)=>{
    const user =req.session.userid;
    console.log("user",user);
    if(user)
    {
        next()
    }
    else{
        res.redirect("/signin")
    }
}
module.exports=auth;