//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const JSON = require("JSON");
var nodemailer = require('nodemailer');
var Base64 = require('js-base64').Base64;
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
// const newjs = require('./assets/js/new.setcountries')
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');



pdfMake.vfs = pdfFonts.pdfMake.vfs;
const app = express();
var medbody=[];
var order=[];
var orderdetails=[];
var stockupdate=[];
var ngrokapi= "https://owaismedplus.herokuapp.com/";
id=0;
username="";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.medplus@gmail.com',
    pass: 'Medplus1234'
  }
});

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla", "Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var countries2 = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla"];

const medlist=["Acetaminophen",
  "Adderall"       ,
  "Alprazolam",
  "Amitriptyline",
  "Amlodipine",
  "Amoxicillin",
  "Ativan",
  "Atorvastatin",
  "Azithromycin",
  "Ciprofloxacin",
  "Citalopram",
  "Clindamycin",
  "Clonazepam",
  "Codeine",
  "Cyclobenzaprine",
  "Cymbalta",
  "Doxycycline",
  "Gabapentin",
  "Hydrochlorothiazide " ,
  "Ibuprofen",
  "Lexapro",
  "Lisinopril",
  "Loratadine",
  "Lorazepam",
  "Losartan",
  "Lyrica",
  "Meloxicam",
  "Metformin",
  "Metoprolol",
  "Naproxen",
  "Omeprazole",
  "Oxycodone",
  "Pantoprazole",
  "Prednisone",
  "Tramadol",
  "Trazodone",
  "Viagra",
  "Wellbutrin",
  "Xanax",
"Zoloft"]
const creamlist=[
"Calcitriol",
"Calcium carbonate",
"Carafate",
"Carbamazepine",
"Carbidopa and levodopa",
"Cardizem",
"Carvedilol",
"Cefdinir",
"Ceftriaxone",
"Cefuroxime",
"Celebrex",
"Celecoxib",
"Celexa",
"Cephalexin",
"Cetirizine",
"Chlorthalidone",
"Cholecalciferol",
"Cialis",
"Cipro",
"Ciprofloxacin",
"Citalopram",
"Clarithromycin",
"Claritin",
"Clindamycin",
"Clonazepam",
"Clonidine",
"Clopidogrel",
"Clotrimazole",
"Clozapine",
"Codeine",
"Colace",
"Colchicine",
"Concerta",
"Coreg",
"Coumadin",
"Cozaar",
"Crestor",
"Cyanocobalamin",
"Cyclobenzaprine",
"Cymbalta"
]
// for(var i=0;i<creamlist.length;i++){
//   var options={
//     url:"https://owaismedplus.herokuapp.com/new_med",
//     method: "POST",
//     form:{
//     name:creamlist[i],
//     category:"creams",
//     cost:100,
//     quantity:20
//   }
//
//   };
//
//   request(options,function(err,res,body){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(res.statusCode);
//     }
//   });
// }


app.use("*/bootstrap",express.static("assets/bootstrap"));
app.use("*/fonts",express.static("assets/fonts"));
app.use("*/img",express.static("assets/img"));
app.use("*/js",express.static("assets/js"));
app.use("*/css",express.static("assets/css"));

function getmonth(a){
  if(a=="01"){
    return "Jan"
  }
  else if(a=="02"){
    return "Feb"
  }
  else if(a=="03"){
    return "March"
  }
  else if(a=="04"){
    return "April"
  }
  else if(a=="05"){
    return "May"
  }
  else if(a=="06"){
    return "June"
  }
  else if(a=="07"){
    return "July"
  }
  else if(a=="08"){
    return "Aug"
  }
  else if(a=="09"){
    return "Sept"
  }
  else if(a=="10"){
    return "Oct"
  }
  else if(a=="11"){
    return "Nov"
  }
  else if(a=="12"){
    return "Dec"
  }
}


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

orders=["soframycin","dolo","crocin"];
cost=[21,22,23];

app.get("/", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  // newjs.setcountries(["alabama"])

  var options={
    url:ngrokapi + "front_page",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){  
      console.log(err);
    }else{
      console.log(body);
      var somedata = JSON.parse(body)
      console.log(somedata)
      var total= somedata.topthree[0].total+somedata.topthree[1].total+somedata.topthree[2].total;
      var vari1= somedata.topthree[0].total/total;
      var vari2= somedata.topthree[1].total/total;
      var vari3= somedata.topthree[2].total/total;
      var month77=getmonth(somedata.eightmonths[0].startdate.slice(5,7));
      var month66=getmonth(somedata.eightmonths[1].startdate.slice(5,7));
     var  month55=getmonth(somedata.eightmonths[2].startdate.slice(5,7));
     var  month44=getmonth(somedata.eightmonths[3].startdate.slice(5,7));
     var  month33=getmonth(somedata.eightmonths[4].startdate.slice(5,7));
     var  month22=getmonth(somedata.eightmonths[5].startdate.slice(5,7));
     var  month11=getmonth(somedata.eightmonths[6].startdate.slice(5,7));
     var  month00=getmonth(somedata.eightmonths[7].startdate.slice(5,7));

      res.render("home", {monthlyearning:somedata.month, yearlyearning: somedata.year, orderstoday:somedata.counterorder , apporderstoday: somedata.apporder, category1: somedata.topthree[0].category,profit1 :vari1, category2: somedata.topthree[1].category , profit2: vari2, category3: somedata.topthree[2].category,  profit3:vari3, profitmonth0: somedata.eightmonths[7].total, profitmonth1:somedata.eightmonths[6].total, profitmonth2:somedata.eightmonths[5].total, profitmonth3:somedata.eightmonths[4].total,profitmonth4:somedata.eightmonths[3].total, profitmonth5:somedata.eightmonths[2].total, profitmonth6:somedata.eightmonths[1].total, profitmonth7:somedata.eightmonths[0].total,month0:month00,month1:month11,month2:month22,month3:month33,month4:month44,month5:month55,month6:month66,month7:month77});

    }
  });



});


app.get("/medarray",function(req,res){

  var options={
    url:"https://owaismedplus.herokuapp.com/all_meds",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      medbody= JSON.parse(body);
      var newmedarray=[];
      for(var i=0; i< medbody[1].length;i++){
        newmedarray.push(String(medbody[1][i].name))
      }
      res.send(newmedarray)
    }
  });


})
app.get("/placeorder", function(req, res){

  if( orderdetails.length > 0){



    var submitdetails=[];
    for(var i=0; i< orderdetails.length ; i++){
      submitdetails.push({
          name: orderdetails[i].name,
          quantity: Number(orderdetails[i].quantity)
        }
      )
    }
    var submitdetails2=[]
    submitdetails2.push(orderdetails.length)
    submitdetails2.push(submitdetails)
    console.log(submitdetails)
    var newsubmitdetails = JSON.stringify(submitdetails2)
    console.log(typeof(newsubmitdetails))
    var options={
      url:ngrokapi + "counter_order",
      method: "POST",
      form:{
        "data": newsubmitdetails,
        "payment-type":"Cash on Delivery"
      }
    };
    request(options,function(err,response,body){
  
      if(err){
        console.log(err);
      }else{
        console.log(response.statusCode)
      }
    });

    orderdetails=[]


    
  }

  var options={
    url:"https://owaismedplus.herokuapp.com/all_meds",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      medbody2= JSON.parse(body);
      var newmedlist=[]
      for (var i=0; i< medbody2[1].length  ; i++){
        newmedlist.push(String(medbody2[1][i].name))
      }
      console.log(newmedlist)
      order=[]
      res.render("newplaceorder",{items:orderdetails,countrylist:countries2});
    }
  });
});
app.post("/placeorder2",function(req,res){

  if(req.body.medq != 0 ){
    var newmed={
       name : req.body.myCountry,
       quantity : req.body.medq,
       price: 20,
       category : "creams"
     }
     orderdetails.push(newmed);
  }
    res.render("newplaceorder", {items:orderdetails})
})

app.post("/placeorder3",function(req,res){
  if(req.body.medq != 0){
  var newmed={
     name : req.body.myCountry,
     quantity : req.body.medq,
     price: 20,
     category : "creams"
   }
   orderdetails.push(newmed);
  }
   var options={
    url: ngrokapi+"presorders",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      var imaglalla= JSON.parse(body)
      var testig= imaglalla[1];
      res.render("apporders",{length:imaglalla[0] , prescriptionimage: testig,items:orderdetails})
    }
  });
})

app.get("/addmed", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  res.render("addmed");
});
app.get("/alerts", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  var options={
    url:"https://owaismedplus.herokuapp.com/all_meds",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      medbody= JSON.parse(body);
      res.render("alerts",{medlists:medbody});

    }
  });
});


app.get("/updatestock", function(req, res){
  // res.sendFile(__dirname+"/index.html");

  
  if( stockupdate.length > 0){



    var submitdetails=[];
    for(var i=0; i< stockupdate.length ; i++){
      submitdetails.push({
          name: stockupdate[i].name,
          quantity: Number(stockupdate[i].quantity),
          category: stockupdate[i].category,
          cost: Number(stockupdate[i].cost) 
        }
      )
    }
    var submitdetails2=[]
    submitdetails2.push(stockupdate.length)
    submitdetails2.push(submitdetails)
    console.log(submitdetails)
    var newsubmitdetails = JSON.stringify(submitdetails2)
    console.log(newsubmitdetails)
    var options={
      url:ngrokapi + "update",
      method: "POST",
      form:{
        "data": newsubmitdetails,
      }
    };
    request(options,function(err,response,body){
  
      if(err){
        console.log(err);
      }else{
        // console.log(response)
        console.log(response.statusCode)
      }
    });

    stockupdate=[]


    
  }


  res.render("newupdatestock", {items:stockupdate});
});

app.post("/updatestock2",function(req,res){

  var options={
    url:ngrokapi + "search",
    method: "POST",
    form:{
      "name": req.body.myCountry,
    }
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      console.log(body);
      var parsedbody = JSON.parse(body)
      var newmed={
        name : req.body.myCountry,
        quantity : req.body.medq,
        cost: parsedbody[1][0].cost,
        category : parsedbody[1][0].category
      }
      stockupdate.push(newmed);
     res.render("newupdatestock", {items:stockupdate})
    }
  });




})

app.get("/apporders",function(req,res){

  
  if( orderdetails.length > 0){



    var submitdetails=[];
    for(var i=0; i< orderdetails.length ; i++){
      submitdetails.push({
          name: orderdetails[i].name,
          quantity: Number(orderdetails[i].quantity)
        }
      )
    }
    var submitdetails2=[]
    submitdetails2.push(orderdetails.length)
    submitdetails2.push(submitdetails)
    console.log(submitdetails)
    var newsubmitdetails = JSON.stringify(submitdetails2)
    console.log(typeof(newsubmitdetails))
    var options={
      url:ngrokapi + "new_order",
      method: "POST",
      form:{
        "data": newsubmitdetails,
        "payment-type":"Cash on Delivery",
        "id":id,
        "username":username
      }
    }; request(options,function(err,response,body){
  
      if(err){
        console.log(err);
      }else{
        console.log(response.statusCode)
      }
    });
    console.log(username)


    var documentDefinition = {
      content: [
        {text: 'Tables', style: 'header'},
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              
            ]
          }
        },
      ]        
  };

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  console.log("reached here 1");
  pdfDoc.getBase64((data)=>{
      res.writeHead(200, 
      {

          'Content-Type': 'application/pdf',
          'Content-Disposition':'attachment;filename="filename.pdf"'
      });
      console.log("reached here 2");

      const download = Buffer.from(data.toString('utf-8'), 'base64');
      console.log("reached here 3");

      var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'malharmarathe26@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [
          {   // utf-8 string as an attachment
              filename: 'invoice.pdf',
              content: download,
              encoding: 'base64'
 
          }
        ]
      };
      console.log("reached here 4")
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


  });



    orderdetails=[];
    id=0;
    username=""


    
  }
  var options={
    url: ngrokapi+"presorders",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){
      console.log(err);
    }else{
      
      var imaglalla= JSON.parse(body)
      if(imaglalla[0] != 0){
      var testig= imaglalla[1];
      id=testig[0].id;
      username=testig[0].username;
      res.render("apporders",{length:imaglalla[0] , prescriptionimage: testig,items:orderdetails})
      }else{
        res.render("home")
      }
    }
   });
})

app.post("/searchmeds",function(req,res){
  console.log(req.body)
  var options={
    url:ngrokapi + "search",
    method: "POST",
    form:{
      name:req.body.medname3
    }
  };
  request(options,function(err,response,body){

    if(err){  
      console.log(err);
    }else{
      medbody= JSON.parse(body);
      console.log(medbody)
      res.render("searchedmeds",{medlists:medbody});

    }
  });
  


})


app.get("/allmeds",function(req,res){
  
  var options={
    url:"https://owaismedplus.herokuapp.com/all_meds",
    method: "POST",
  };
  request(options,function(err,response,body){

    if(err){  
      console.log(err);
    }else{
      medbody= JSON.parse(body);
      res.render("allmeds",{medlists:medbody});

    }
  });
  


})

app.post("/addmed",function(req,res){
  console.log(req.body);
  var x=Number(req.body.cost);
  var y=Number(req.body.stock)

  var options={
    url:"https://owaismedplus.herokuapp.com/new_med",
    method: "POST",
    form:{
    name:req.body.name,
    category:req.body.category,
    cost:x,
    quantity:y
  }

  };

  request(options,function(err,res,body){
    if(err){
      console.log(err);
    }else{
      console.log(res.statusCode);
    }
  });
  res.redirect("/");
});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
