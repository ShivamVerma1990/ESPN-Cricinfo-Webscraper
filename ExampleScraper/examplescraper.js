//step 1 go on that page where you get your data actual data
//let url='https://www.npmjs.com/package/cheerio'
let url='https://www.worldometers.info/coronavirus';
let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
const { data } = require("cheerio/lib/api/attributes");
request(url,cb)
function cb(error,response,html){
if(error){
console.log(error);

}else if(response.statusCode==404){

    console.log("page not found");
}else{

//console.log(html)
extractData(html);
}

}
function extractData(html){
let searchTool=cheerio.load(html);
let dataArray=searchTool("#maincounter-wrap");
for(let i=0;i<dataArray.length;i++){
    let data=searchTool(dataArray[i]).text();
console.log(data);

}


}



