const getPhone = function (grade) {
    return new Promise((resolve, reject) => {
        const newPhone = 'iphoneX';
        if(grade > 80){
            resolve(newPhone)
        } else {
            reject('nothing');
        }
    })
};


getPhone(90)
    .then((newPhone)=>{console.log('I got '+ newPhone)})
    .then(()=> getPhone(60))
    .catch((nothing) => {console.log('nothing')})
    .then(()=> getPhone(100))
    .then((newPhone) => {console.log('I got '+ newPhone)});



/*const grades = [100,90.,89, 69, 50];

grades.reduce((promise, grade) => {
    return promise
        .then(() => getPhone(grade))
        .then((newPhone) => {console.log('you got ' + newPhone)})
        .catch((nothing) => {console.log('you got ' + nothing)})
}, Promise.resolve());*/

