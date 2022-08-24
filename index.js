const express = require("express");
const cors=require('cors')
const app = express();
const port = 4000;
const db=require('./connection')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: '*'
}));

//=============================================================================================================
app.get("/", (req, res) => {
  
  res.send('connected! to backend');
});

app.get("/getData",async (req,res)=>{
 await db.query("SELECT * FROM stucor.forms",(err,result)=>{
    if (err) throw err
    res.send(result)
  })
})
app.post("/insert",async(req,res)=>{
  console.log(req.body);
  await db.query("insert into stucor.notifications (form_id,description) values (?,?)",[req.body.form_id,req.body.description],(err,result)=>{
    if (err) throw err
    console.log(result);
    res.send(result)
  })
})

//write api from here





//===========================================================================================================================
db.connect((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('connected');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});