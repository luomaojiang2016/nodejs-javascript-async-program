/*
async/await


*/
// async await 
function fn() {
    return new Promise((resove, reject) => {
        setTimeout(() => {
            resove(true);
        }, 1000);

    })
}

async function name() {
    try {
        const result = await fn();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

name();