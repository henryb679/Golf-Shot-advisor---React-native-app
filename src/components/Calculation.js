// Totals up all the values in the respective par, hole value arrays
export const sumTotal = (value) => {
    var stringValue = (String(value).replace(/,/g, ''));
    let sum = 0;
    for(let i = 0; i < stringValue.length; i++){
        sum += Number(stringValue[i]);
    }
    if(Number(sum) === 0){
        sum = "0";
    }
    return sum;
}

export const checkValue = (currentValue, noHoles) => {
    var value = [];
    for (let i = 0; i < noHoles; i++) {
        // Default value set to 0 if the user leaves it blank
        if (currentValue[i] === undefined || currentValue[i] === "") {
            value[i] = 0;
        }
        else {
            value[i] = currentValue[i];
        }
    }

    return value;
}