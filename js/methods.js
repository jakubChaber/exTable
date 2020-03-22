import {
    table,
    exTr,
    tableOfActiveObjs
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

var color = (arg, key) => {

    arg.obj.classList.add('exTr_ac');
    tableOfActiveObjs.push(arg);

    tableOfActiveObjs.sort(compare);
    // arg.obj.style.top = `${ (getActive()*getHeight())-getHeight() }px`;
    setPosition();
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
    div.style.position = "absolute";
    div.style.right = '-46px';
    div.style.top = (table.clientHeight) / 2 + 'px';
    div.style.width = '45px';
    div.style.padding = '5px';
    div.style.boxSizing = 'border-box';
    div.style.cursor = 'pointer';
    div.style.background = 'rgba(32,114,69,.6)';
    div.style.color = '#eee';

    div.addEventListener('click',
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
    div.innerText = "CSV";
    table.append(div);
}
export {
    getActive,
    compare,
    color,
    setPosition,
    appendCP

}