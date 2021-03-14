const mongoose=require('mongoose')
  const playerSchema= new mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      email:{
          type:String,
          required:true,
          unique:true
      },
      password:{
          type:String,
          required:true,
          unique:true
      }
  })


  const Player=new mongoose.model("Player",playerSchema)

  module.exports=Player;