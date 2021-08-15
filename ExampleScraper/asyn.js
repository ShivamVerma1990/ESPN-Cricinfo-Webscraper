let fs=require("fs");
console.log("Befor");
//not a asyn function
//let data=fs.readFileSync("js.txt");
//this one is a asyn function
fs.readFile("js.txt",cb);
function cb(error,data){
    if(error){
        console.log(error);
    }else{
        console.log("data"+data);
    }
}

console.log("After");
console.log("meanWhile");
//output Befor
//       After
//       meanWhile
//       datadadsfas