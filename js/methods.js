import {
    table,
    exTr,
    tableOfActiveObjs,
    tableWidth,
    tableStartPoint
} from "./vars.js";
var getActive = () => {
    return document.querySelectorAll('.exTr_ac').length;
}

var compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const rowIndexA = a.rowIndex;
    const rowIndexB = b.rowIndex;

    let comparison = 0;
    if (rowIndexA > rowIndexB) {
        comparison = 1;
    } else if (rowIndexA < rowIndexB) {
        comparison = -1;
    }
    return comparison;
}
var setCounter = () => {
    let tmp = document.querySelector('#exTabCounter');
    tmp.innerText = `${tableOfActiveObjs.length}/${exTr.length}`;
}
var color = (arg, key) => {

    arg.obj.classList.add('exTr_ac');
    tableOfActiveObjs.push(arg);

    tableOfActiveObjs.sort(compare);
    // arg.obj.style.top = `${ (getActive()*getHeight())-getHeight() }px`;
    setPosition();
    setCounter();
}
var setPosition = () => {
    for (const key in tableOfActiveObjs) {
        if (tableOfActiveObjs.hasOwnProperty(key)) {
            const element = tableOfActiveObjs[key];
            // console.log('element.height l54', element.height);
            // console.log('parseInt(key+1) l54', parseInt(key) + 1);
            element.obj.style.top = `${((parseInt(key)+1)*element.height) - element.height }px`;
            // console.log('element.obj.style.top', element.obj.style.top);
        }
    }

}
var appendCP = () => {
    var table = document.getElementById('exTable');
    var div = document.createElement("div");
    var button = document.createElement("button");
    var header = document.createElement("header");
    header.id = "exTabCounter";
    div.style.position = "fixed";
    div.style.display = "flex";
    div.style.flexFlow = "column";
    div.style.left = `${tableWidth+tableStartPoint}px`;
    div.style.top = 0;
    // div.style.width = '45px';
    div.style.padding = '5px';
    div.style.boxSizing = 'border-box';
    div.style.cursor = 'default';
    div.style.background = 'rgba(32,114,69,.6)';
    div.style.color = '#eee';

    button.addEventListener('click',
        function () {

            let str;
            var arrayToSave = new Array;
            let TMP_tr = document.getElementsByClassName('exTr_ac');

            for (var key1 in TMP_tr) {
                if (TMP_tr.hasOwnProperty(key1)) {
                    arrayToSave[key1] = [];
                    const trki = TMP_tr[key1];

                    const tedeki = trki.children;
                    for (const key2 in tedeki) {

                        const element = tedeki[key2].innerHTML;
                        // console.log(`trki[key].`, tedeki[key]);
                        if (typeof element != 'undefined') {
                            // console.log('key1: ',arrayToSave);
                            arrayToSave[key1].push(`"` + element + `"`);

                        }
                    }
                }
            }
            //adding filename (from attribute of the table)
            var filename = table.getAttribute('data-fTitle') + '.csv';

            var csvContent = '';
            arrayToSave.forEach(function (infoArray, index) {
                let dataString = infoArray.join(';');
                csvContent += index < arrayToSave.length ? dataString + '\n' : dataString;
            });

            var download = function (content, fileName, mimeType) {
                var a = document.createElement('a');
                mimeType = mimeType || 'application/octet-stream';

                if (navigator.msSaveBlob) { // IE10
                    navigator.msSaveBlob(new Blob([content], {
                        type: mimeType
                    }), fileName);
                } else if (URL && 'download' in a) { //html5 A[download]
                    a.href = URL.createObjectURL(new Blob([content], {
                        type: mimeType
                    }));
                    a.setAttribute('download', fileName);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
                }
            }

            download(csvContent, filename, 'text/csv;charset:utf-8');
        });

    div.id = "controlPanel";
    header.innerHTML = `${tableOfActiveObjs.length}/${exTr.length}`;
    button.innerText = "CSV";

    div.append(header);
    div.append(button);
    table.append(div);
}

export {
    getActive,
    compare,
    color,
    setPosition,
    appendCP,
    setCounter
}