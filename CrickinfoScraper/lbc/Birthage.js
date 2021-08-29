let bowlersArr = [];
//*here we create count variable for verifying that our total data from site we almost got
let bowlersCount = 0;
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");

let fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
request(url, cb)
function cb(error, response, html) {
    if (error) {

        console.log(error);
    }
    else if (response.statusCode == 404) {
        console.log("page not found");

    }
    else {
        //console.log(html);
        dataExtract(html);
    }

}

function dataExtract(html) {
    //let htmlData="";
    let searchTool = cheerio.load(html);
    let bowlerData = searchTool(".table.bowler tbody tr");
//this loop is only to get bowler length
    for (let i = 0; i < bowlerData.length; i++) {

        let cols = searchTool(bowlerData[i]).find("td");
       
//*here those row which td length is 0 we will not count  
if(cols.length>1){

bowlersCount++;
}
    }
    // let data=searchTool(bowlerData[0]).html();
    //console.log(bowlerData); 
    // for(let i=0;i<bowlerData.length;i++){
    // //HERE WE USE HTML FUNCTION
    //     htmlData+=searchTool(bowlerData[i]).html();

    // }
    // //AND THIS HTML DATA STORE ON THAT FILE
    // fs.writeFileSync("bowler.html",htmlData);
    let pname = "";
    let hwt = 0;

    for (let i = 0; i < bowlerData.length; i++) {

        let cols = searchTool(bowlerData[i]).find("td");
        //here we finf ancher element 
//*here those row which td length is 0 we will not count  
if(cols.length>1){

    let aElem = searchTool(cols[0]).find("a");
    //here we get link through href element
    let link = aElem.attr("href");
    //here we convert half link into full link
    let fullLink = `https://www.espncricinfo.com${link}`
    //console.log(fullLink);
    //now again we request on that page link
   //its a async function so this code will run parallel
    request(fullLink, cb2);

}
    }
}
function cb2(error, response, html) {
    if (error) {

        console.log(error);
    }
    else if (response.statusCode == 404) {
        console.log("page not found");

    }
    else {
        //console.log(html);
        dataExtract2(html);
//*when your devise relise that you get almost all bowler data here is condition 
        if(bowlersArr.length==bowlersCount){
//*now print all bowlers data in table form
            console.table(bowlersArr);
sortPlayerAge(bowlersArr);
        }

    }

}
function dataExtract2(html) {
    let searchTool = cheerio.load(html);
    let data = searchTool(".player-card-description");
    let age = searchTool(data[2]).text();

    let name = searchTool(data[0]).text();
    //*for sorting this player on his age bases we push his data inside an array
    bowlersArr.push({name,age});






    console.log("```````````````````````````````````````````````````````````````");

    //console.log("birthAge:", birthAge + "." + "playerName:", playerNames);
}
function sortPlayerAge(bowlersArr){
//*here we use this map function to sort this playerage
    let newArray=bowlersArr.map(singleFn);
//*here obj basiclly bowlersArr refrence 
    function singleFn(obj){
let name=obj.name;
let age=obj.age;
//*now we split this age on space bases
let ageArr=obj.age.split(" ");
//*output will be ["23y","32d"];
//now here we remove y or d from ageArray
let years=ageArr[0].slice(0,ageArr[0].length-1);
let days=ageArr[1].slice(0,ageArr[1].length-1);
let ageInDay=Number(years)*365+Number(days);
return{
    name:name,
    ageInDay:ageInDay,
    age:age

}}
//console.log(newArray);
//now here we inbuild function to sort that newArray
let sortArray=newArray.sort(cb);
function cb(objA,objB){
return objA.ageInDay-objB.ageInDay;
}
//console.table(sortArray);
//now we remove ageinDay
let finalArray=sortArray.map(removeAgeInArray);
function removeAgeInArray(obj){
    return{
        name:obj.name
        ,age:obj.age
    }

}
console.table(finalArray);
}
