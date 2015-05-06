/**
 * Created by Jerome on 5/4/15.
 */
app.controller('tvFeedController', ['$scope', 'tvFeedService', '$interval', '$log', function ($scope, tvFeedService, $interval, $log) {
    var runningListRequest, $scope.errorFlash="";

    function getSchedule() {
        var myfeedListPromise = tvFeedService.getFeed();

        myfeedListPromise.then(
            function (response) {
                $scope.feedList = response.data.entries;
            },
            function (error) {
                $log.error(error);
                $scope.errorFlash = 'Having trouble receiving the schedule.  Please check later.'
            }
        );
    };

    //page-load, get the schedule without wait
    getSchedule();

    runningListRequest = $interval(
        getSchedule,
        30000
    );

    $scope.$on('$destroy', function () {
        $interval.stop(runningListRequest);
    });

}]);