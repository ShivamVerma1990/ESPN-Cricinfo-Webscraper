let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
let request=require("request");
let cheerio=require("cheerio");

let fs=require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
request(url,cb)
function cb(error,response,html){
if(error){

    console.log(error);
}
else if(response.statusCode==404){
    console.log("page not found");
   
}
else {
//console.log(html);
    dataExtract(html);
}

}

 function dataExtract(html){
 //let htmlData="";
 let searchTool=cheerio.load(html);
 let bowlerData=searchTool(".table.bowler tbody tr");

 // let data=searchTool(bowlerData[0]).html();
 //console.log(bowlerData); 
// for(let i=0;i<bowlerData.length;i++){
// //HERE WE USE HTML FUNCTION
//     htmlData+=searchTool(bowlerData[i]).html();

// }
// //AND THIS HTML DATA STORE ON THAT FILE
// fs.writeFileSync("bowler.html",htmlData);
let pname="";
let hwt=0;
for(let i=0;i<bowlerData.length;i++){

    let cols=searchTool(bowlerData[i]).find("td");
//here we finf ancher element 
    let aElem=searchTool(cols[0]).find("a");
//here we get link through href element
    let link=aElem.attr("href");
    //here we convert half link into full link
let fullLink=`https://www.espncricinfo.com${link}`
//console.log(fullLink);
//now again we request on that page link
request(fullLink,cb2);
}
 }
 function cb2(error,response,html){
    if(error){
    
        console.log(error);
    }
    else if(response.statusCode==404){
        console.log("page not found");
       
    }
    else {
    //console.log(html);
        dataExtract2(html);
    }
    
    }
    function dataExtract2(html){
let searchTool=cheerio.load(html);
let data=searchTool(".player-card-description");
let birthAge=searchTool(data[2]).text();

let playerNames=searchTool(data[0]).text();

console.log("```````````````````````````````````````````````````````````````");

console.log("birthAge:",birthAge+"."+"playerName:",playerNames);
    }

