const express=require("express")
const app=express()
const port=process.env.PORT || 4000;
const path=require('path')
const hbs=require('hbs')
const bcrypt=require('bcryptjs')
const conn=require('./db/conn')
const PlayerSchema=require('./modules/player')

const templatePath=path.join(__dirname,'../views')
const staticPath=path.join(__dirname,'../public')
console.log(templatePath)

app.set('view engine','hbs')
app.set('views',templatePath)
app.use(express.static(staticPath))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',async(req,res)=>{
    
    try{
        let  hashpassword= await bcrypt.hash(req.body.password,10)
        const data = new PlayerSchema ({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword
        })
          console.log(req.body.name)
          console.log(req.body.email)
          console.log(req.body.password)
          console.log(data)

        let playerData= await data.save()
        res.status(200).send(playerData)
        console.log( playerData);
           
    }catch(e){
        res.status(404).send(e)
    }
   
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{
    try{

     const data=await PlayerSchema.findOne({email:req.body.email})
     console.log(data)
       if(data){
           if(bcrypt.compare(req.body.password,data.password)){
               console.log('successfully login ')
               res.status(200).send('login successfully')
           }else{
               res.status(400).send('invalid email or password')
           }
       }else{
        res.status(400).send('invalid email or password')
       }
    }catch(e){
        res.status(400).send('invalid email or password')
    }


})

app.get('/foodapi',(req,res)=>{
    res.render('foodapi')
})


app.listen(port,()=>{
    console.log("server run on port 4000")
})