console.log("Programm Started ");

function makePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; 
            if (success) {
                console.log("Programm in Progress ...");
                resolve("Promise pending!");
            } else {
                reject("Promise rejected!");
            }
        }, 3000);
    }
    );
}