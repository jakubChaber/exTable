export var table             = document.querySelectorAll('#exTable');
export var tableWidth        = table[0].offsetWidth;
export var tableHeaderTH     = document.querySelectorAll('#exTable thead th').length == 0? document.querySelectorAll('#exTable tr:first-of-type td'):document.querySelectorAll('#exTable thead th');
export var tableStartPoint   = table[0].offsetLeft;
export var exTr              = document.querySelectorAll('#exTable tbody tr');
export var tableOfActiveObjs = [];
