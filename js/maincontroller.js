app.controller('MainController', function($scope){
//angular változó létrehozása
$scope.szoveg = "Így működnek az Angularban a változók!";

$scope.emberek = [
    {nev: 'Wick', eletkor: 20, csajok: ['Bridget', 'Agnes']},
    {nev: 'Lucifer', eletkor: 10000, csajok: ['Detective', 'Milliók']},
    {nev: 'Ragnar', eletkor: 40, csajok: ['lagherta', 'Aslaug hercegnő']},
    {nev: 'Bulgasal', eletkor: 2000, csajok: ['Min Si-ho']}
];
});