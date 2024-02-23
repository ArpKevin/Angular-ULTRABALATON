let app = angular.module('calculatorApp', []);
app.controller('CalculatorController', function($scope, $http){
    $http.get('stages.json')
    .then(function(response){
        $scope.stages = response.data;
        //console.log($scope.stages);
    });

    //a 10 sor megjelenítése
    $scope.teamMembers = [];
    for (let i = 0; i < 10; i++) {
        $scope.teamMembers.push(
            {
                firstName: '',
                lastName: '',
                speed:'',
                totalDistance: 0
            })        
    }

    //a futók nevének össze állítása a kiválasztásra
    $scope.updateRunners = function(){
       $scope.runners = [];
       angular.forEach($scope.teamMembers, function(member){
        let fullName = `${member.firstName} ${member.lastName}`;
        if($scope.runners.indexOf(fullName) === -1){
            $scope.runners.push(fullName);
        }
       });
       console.log($scope.runners);
    }

    //a beírt idő formázása
    $scope.formatTime = function(member){
       if (member.speed && member.speed.length === 4){
        member.speed = `${member.speed.slice(0, 2)}:${member.speed.slice(2)}`
       }
    }

    //kiválasztott futó sebessége
    $scope.getRunnerSpeed = function(runner){
        let selectedRunner = $scope.teamMembers.find(member => {
            return `${member.firstName} ${member.lastName}` == runner;
        });
        if (!selectedRunner || !selectedRunner.speed) return 0;
        let [minutes, seconds] = selectedRunner.speed.split(":");
        let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
        return totalSeconds;
    }

    //adott távon a futó sebessége
    $scope.calculateTime = function(distance, speed){
        if(isNaN(distance) || isNaN(speed) || speed <= 0) return '00:00:00';
        let timeInMinutes = (distance * speed) / 60;
        let hours = Math.floor(timeInMinutes / 60);
        let minutes = Math.floor(timeInMinutes % 60);
        let seconds = Math.floor(timeInMinutes % 1) * 60;

        let formattedTime = `${(hours < 10 ? "0": "")}${hours}:${(minutes < 10 ? "0": "")}${minutes}:${(seconds < 10 ? "0": "")}${seconds}`;
        return formattedTime;
    }

    $scope.runnerDistance = {};
    for (let i = 0; i < 10; i++) {
        $scope.runnerDistance['runner' + (i+1)] = 0;
    }

    $scope.calculateTotalDistance = function(distance, runner){
        console.log(`Futó: ${runner}, táv: ${distance}`);
        if(!runner) return 0;
        let totalDistance = 0;
        $scope.stages.forEach(stage => {
            if (stage.runner === runner) totalDistance += stage.distance;
        console.log(totalDistance);
        $scope.runnerDistance[runner] = totalDistance;
        });
    }

    

});