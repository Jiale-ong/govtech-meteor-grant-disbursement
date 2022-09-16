function parse_date(date_num) {
    let date_str = date_num.toString();
    var d = date_str.substr(0,2),
        m = date_str.substr(2,2),
        y = date_str.substr(4,4);

    console.log("m= " + m)
    let to_parse = y.toString() + "/" + m.toString() + "/" + d.toString();
    console.log(to_parse);
    return new Date(to_parse)
}

function compute_date_diff(datetime_1, datetime_2, result_granularity = "year") {
    // assume datetime 2 is later than datetime 1
    if (result_granularity == "year") {
        console.log(datetime_1);
        console.log("y1 " + datetime_1.getFullYear());
        console.log("y2 " + datetime_2.getFullYear());
        console.log(datetime_2.getFullYear() - datetime_1.getFullYear());
        return datetime_2.getFullYear() - datetime_1.getFullYear();
    } else if (result_granularity == "month") {
        var d1Y = datetime_1.getFullYear();
        var d2Y = datetime_2.getFullYear();
        var d1M = datetime_1.getMonth();
        var d2M = datetime_2.getMonth(); 

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    } else {
        throw Error("Invalid result granularity in helper function compute date diff")
    }
}

module.exports = {
    "parse_date": parse_date,
    "compute_date_diff" : compute_date_diff
}