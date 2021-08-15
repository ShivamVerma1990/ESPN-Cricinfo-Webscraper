
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard"
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

//here we are not treat this data as array becouse there only one data not so many
//let data =searchTool(".match-info.match-info-MATCH.match-info-MATCH-half-width").text();
//console.log("winningTeam",data);
//this is use to acess data from website in html form
//let htmlData=searchTool(data[0]).html();
//console.log("htmlData:",htmlData);
//->now we are acess name only of winner team
//in this way we are getting two element so thats why we are create loop
//note ->searchTool use to search whole element 
let teamArray =searchTool(".match-info.match-info-MATCH.match-info-MATCH-half-width .team");
for(let i=0;i<teamArray.length;i++){
    //that this element has this class or not
let hashClass=searchTool(teamArray[i]).hasClass("team-gray");
if(hashClass==false){

//here use to find element from particular element
    let team=searchTool(teamArray[i]).find(".name");
console.log(team.text());
}

}


}




