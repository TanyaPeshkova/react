export const groupingBy = (items, key) => {
    return items.reduce((acc, value) => {
        // Group initialization
        if (!acc[value[key]]) {
            acc[value[key]] = [];
        }

        // Grouping
        acc[value[key]].push(value);

        return acc;
    }, {});
}

export const sortObject = (obj) => {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}