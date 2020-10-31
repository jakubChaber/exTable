export var table             = document.querySelectorAll('#exTable');
export var tableWidth        = table[0].offsetWidth;
export var tableHeaderTH     = document.querySelectorAll('#exTable thead th');
console.log( tableHeaderTH );
export var tableStartPoint   = table[0].offsetLeft;
export var exTr              = document.querySelectorAll('#exTable tbody tr');
export var tableOfActiveObjs = [];