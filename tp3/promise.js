console.log("Programm Started");
let p = new Promise((resolve) => {
    setTimeout(() => { 
        console.log("Programm in progress");
        console.log("Programm in progress");
        resolve("Step 1 is completed");
    }, 3000); 
}
);
p.then((value) => {
    console.log(value);
});
return new Promise((resolve) => {
    setTimeout(() => { 
        console.log("Step 2 in progress");
    }, 3000); 
}
).then (() => {
    console.log(p.value);
    console.log("Step 2 is completed");
});