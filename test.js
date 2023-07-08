let hehe = 1

const promise = new Promise(res => res(2));
promise.then(v => {
    hehe = "first"
    console.log(hehe);
    return v * 2;
})
    .then(v => {

        hehe = "second"
        console.log(hehe);

        return v * 2;
    })
    .finally(v => {
        hehe = "finally"
        console.log(hehe);
        return v * 2;
    })
    .then(v => {
        hehe = "third";
        console.log(hehe);

        // console.log("return undefined");
        return v * 2;

    });

console.log(promise);