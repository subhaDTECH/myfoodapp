const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/playerTable",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('conn success')
}).catch((e)=>{
    console.log(e)
})