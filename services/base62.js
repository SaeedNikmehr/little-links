const charset= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

exports.base62Encode = async(number)=>{
    if (number < 0) return '';
    number = parseInt(number);
    let str = [];
    while (number > 0) {
        str = [charset[number % 62], ...str];
        number = Math.floor(number / 62);
    }
    return str.join('');
}

exports.base62Decode = async(chars)=>{
    let counter = chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (charset.indexOf(curr) * (62 ** i)), 0)
    return counter
}
