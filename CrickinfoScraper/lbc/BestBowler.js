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

    let dataFromRow=searchTool(bowlerData[i]).find("td");
let name=searchTool(dataFromRow[0]).text();
let wicket=searchTool(dataFromRow[4]).text();
console.log("name",name+":"+"wicket",wicket);
//now get highest wicket tacker
if(wicket>hwt){
    hwt=wicket;
    pname=name
}

}

console.log("````````````````````````````````````");
console.log("playerName:",pname+","+"HighestWicket:",hwt);

}

