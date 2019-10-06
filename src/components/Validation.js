export const validation = (text) => {
    let newText = '';
    let numbers = '0123456';

    for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
        }
        else {
            alert("Numbers between 0-6 are allowed");
        }
    }
    return newText;
}