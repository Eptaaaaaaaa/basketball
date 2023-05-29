// Function.prototype.defer = function(ms) {
//     setTimeout(this, ms, a, b)
// }

function printNumbers(from, to) {
    let result = from;
    if (from < to) {
        setInterval(() => {
            if (result <= to) {
                console.log(result)
                result++;
            }
        }, 1000)
    } else {
        setInterval(() => {
            if (result <= to) {
                console.log(result)
                result--;
            }
        }, 1000)
    }
}