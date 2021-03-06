function calculateDate(date1, date2) {
    var new1 = new Date(date1);
    var new2 = new Date(date2);

    var ts = Date.now();
    var date_ob = new Date(ts);
    
    //check if return date has passed
    if (new2.getTime() < date_ob) {
        //calc date till return date
        var timeDiff = Math.abs(new2.getTime() - new1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    //else calc date till now
    var timeDiff = Math.abs(date_ob - new1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

module.exports.calculateDate = calculateDate;