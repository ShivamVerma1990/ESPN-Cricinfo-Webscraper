let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
let request=require("request");
let cheerio=require("cheerio");
request(url,cb);
function cb(error,response,html){
if(error){
    console.log(error);
}
else if(response.statusCode==404){
    
    console.log("page not found");
}
else{
dataExtract(html);

}
}

function dataExtract(html){
let searchTool=cheerio.load(html);
let data =searchTool(".match-comment-wrapper");
let res=searchTool(data[0]).text();
//this is use to acess data from website in html form
//let htmlData=searchTool(data[0]).html();
//console.log("htmlData:",htmlData);
console.log("last commentetory:",res);


}




