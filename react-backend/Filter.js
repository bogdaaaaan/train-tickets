
const filter_arr = (arr, obj) => {
    return arr.filter(el => {
        let flag = false;
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (el[key] !== obj[key]) flag = true;;
            }
        }
        if (!flag) return el;
    })
}

module.exports = filter_arr;