/**
 * Created by Jerome on 5/4/15.
 */
app.factory('tvFeedService', ['$http', function ($http) {
var $scope.errorFlash = "xxx";
    function convertDateToProperString(vDate) {
        var tempDate, fixedMonth, fixedDay, fixedMin, fixedSecs;
        if (angular.isDate(vDate)) {
            fixedMonth = vDate.getMonth() + 1;
            fixedMonth = addZero(fixedMonth);
            fixedDay = vDate.getDate();
            fixedDay = addZero(fixedDay);

            tempDate = vDate.getFullYear() + "-" + fixedMonth + "-" + fixedDay;
            tempDate = tempDate + "T" + vDate.getHours();

            fixedMin = vDate.getMinutes();
            fixedMin = addZero(fixedMin);
            tempDate = tempDate + ":" + fixedMin;

            fixedSecs = vDate.getSeconds();
            fixedSecs = addZero(fixedSecs);
            tempDate = tempDate + ":" + fixedSecs;
        }
        return tempDate;

    }

    function addZero(val) {
        var theVal;
        if (val < 10) {
            theVal = '0' + val;
        } else {
            theVal = val;
        }
        return theVal;
    }

    return {
        getFeed: function () {
            var curDateTimeStart, curDateTimeEnd, myUrl, dateSpan;
            curDateTimeStart = new Date();
            curDateTimeEnd = new Date();
            curDateTimeEnd.setDate(curDateTimeStart.getDate() + 1);

            myUrl = 'http://feed.entertainment.tv.theplatform.com/f/HNK2IC/prod_msnbc_listing';
            myUrl = myUrl + '?byEndTime=' + convertDateToProperString(curDateTimeStart) + "-04:00~" + convertDateToProperString(curDateTimeEnd) + "-04:00";

            return $http.get(myUrl + '&fields=pllisting:startTime,pllisting$program.pl$title,pllisting$program.pl$description,pllisting$program.plprogram$runtime&form=json&sort=pllisting:startTime');
        }
    }

}]);