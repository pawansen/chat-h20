
/** get offset */
export const getOffset = (pageNo:number,limit:number): any =>{
    if(pageNo === 0){
        pageNo = 1;
    }
    let offsetVal: number = (pageNo - 1) * limit;
    return offsetVal;
}


export const randomNumber = function (length:number) {
	let text = "";
	let possible = "98765432101234567890123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return text;
};

export const getRandom = function (length:number) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
};


export const randomString = function (length:number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
};

export const getAge = function(birthDate: any) {
    var now = new Date();

    function isLeap(year: any) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    // days since the birthdate    
    var days = Math.floor((now.getTime() - new Date(birthDate).getTime()) / 1000 / 60 / 60 / 24);
    var months = Math.floor((now.getMonth() - new Date(birthDate).getMonth()));
    var age1 = 0;
    // iterate the years
    for (var y = new Date(birthDate).getFullYear(); y <= now.getFullYear(); y++) {
        var daysInYear = isLeap(y) ? 366 : 365;
        if (days >= daysInYear) {
            days -= daysInYear;
           // console.log('days', days)
            age1++;
            // increment the age only if there are available enough days for the year.
        }
    }
    var currentYear = now.getFullYear()
    var dobYear = new Date(birthDate).getFullYear()
    //get years
    var yearAge = currentYear - dobYear;
    var currentMonth = now.getMonth()

    var dobMonth = new Date(birthDate).getMonth()
    //get months
    if (currentMonth >= dobMonth)
        //get months when current month is greater
        var monthAge = currentMonth - dobMonth;
    else {
        yearAge--;
        var monthAge = 12 + currentMonth - dobMonth;
    }

    var age = {};
    var ageString = "";
    var currentDate = now.getDate()
    var dobDate = new Date(birthDate).getDate()
    //get days
    if (currentDate >= dobDate)
        //get days when the current date is greater
        var dateAge = currentDate - dobDate;
    else {
        monthAge--;
        var dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    //group the age in a single variable
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if ((yearAge > 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = yearAge + " y " + monthAge + " m " + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = dateAge + "d";
        //when current month and date is same as birth date and month
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge == 0)) {
        ageString = yearAge + " y";
    } else if ((yearAge > 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = yearAge + " y " + monthAge + " m.";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = monthAge + " m " + dateAge + " d";
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = yearAge + " y" + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = monthAge + "m";
        //when current date is same as dob(date of birth)
    } else { ageString = ""; }
    return ageString
}

export const getBirthAge = function(birthDate: any) {
    var now = new Date();

    function isLeap(year: any) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    // days since the birthdate    
    var days = Math.floor((now.getTime() - new Date(birthDate).getTime()) / 1000 / 60 / 60 / 24);
    var months = Math.floor((now.getMonth() - new Date(birthDate).getMonth()));
    var age1 = 0;
    // iterate the years
    for (var y = new Date(birthDate).getFullYear(); y <= now.getFullYear(); y++) {
        var daysInYear = isLeap(y) ? 366 : 365;
        if (days >= daysInYear) {
            days -= daysInYear;
           // console.log('days', days)
            age1++;
            // increment the age only if there are available enough days for the year.
        }
    }
    var currentYear = now.getFullYear()
    var dobYear = new Date(birthDate).getFullYear()
    //get years
    var yearAge = currentYear - dobYear;
    var currentMonth = now.getMonth()

    var dobMonth = new Date(birthDate).getMonth()
    //get months
    if (currentMonth >= dobMonth)
        //get months when current month is greater
        var monthAge = currentMonth - dobMonth;
    else {
        yearAge--;
        var monthAge = 12 + currentMonth - dobMonth;
    }

    var age = {};
    var ageString = "";
    var currentDate = now.getDate()
    var dobDate = new Date(birthDate).getDate()
    //get days
    if (currentDate >= dobDate)
        //get days when the current date is greater
        var dateAge = currentDate - dobDate;
    else {
        monthAge--;
        var dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    //group the age in a single variable
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if ((yearAge > 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = yearAge + " y " + monthAge + " m " + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = dateAge + "d";
        //when current month and date is same as birth date and month
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge == 0)) {
        ageString = yearAge + " y";
    } else if ((yearAge > 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = yearAge + " y " + monthAge + " m.";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = monthAge + " m " + dateAge + " d";
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = yearAge + " y" + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = monthAge + "m";
        //when current date is same as dob(date of birth)
    } else { ageString = ""; }
    return ageString
}

export const findAge = function(birthDate: any) {
    var now = new Date();

    function isLeap(year: any) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    // days since the birthdate    
    var days = Math.floor((now.getTime() - new Date(birthDate).getTime()) / 1000 / 60 / 60 / 24);
    var months = Math.floor((now.getMonth() - new Date(birthDate).getMonth()));
    var age1 = 0;
    // iterate the years
    for (var y = new Date(birthDate).getFullYear(); y <= now.getFullYear(); y++) {
        var daysInYear = isLeap(y) ? 366 : 365;
        if (days >= daysInYear) {
            days -= daysInYear;
           // console.log('days', days)
            age1++;
            // increment the age only if there are available enough days for the year.
        }
    }
    var currentYear = now.getFullYear()
    var dobYear = new Date(birthDate).getFullYear()
    //get years
    var yearAge = currentYear - dobYear;
    var currentMonth = now.getMonth()

    var dobMonth = new Date(birthDate).getMonth()
    //get months
    if (currentMonth >= dobMonth)
        //get months when current month is greater
        var monthAge = currentMonth - dobMonth;
    else {
        yearAge--;
        var monthAge = 12 + currentMonth - dobMonth;
    }

    var age = {};
    var ageString = "";
    var currentDate = now.getDate()
    var dobDate = new Date(birthDate).getDate()
    //get days
    if (currentDate >= dobDate)
        //get days when the current date is greater
        var dateAge = currentDate - dobDate;
    else {
        monthAge--;
        var dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    //group the age in a single variable
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if ((yearAge > 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = yearAge + " y " + monthAge + " m " + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = dateAge + "d";
        //when current month and date is same as birth date and month
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge == 0)) {
        ageString = yearAge + " y";
    } else if ((yearAge > 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = yearAge + " y " + monthAge + " m.";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge > 0)) {
        ageString = monthAge + " m " + dateAge + " d";
    } else if ((yearAge > 0) && (monthAge == 0) && (dateAge > 0)) {
        ageString = yearAge + " y" + dateAge + " d";
    } else if ((yearAge == 0) && (monthAge > 0) && (dateAge == 0)) {
        ageString = monthAge + "m";
        //when current date is same as dob(date of birth)
    } else { ageString = ""; }
    return age
}