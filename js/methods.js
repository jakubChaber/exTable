import { table, exTr, tableOfActiveObjs, tableWidth, tableStartPoint } from "./vars.js";
import { setPosition                                                 } from "./setPosition.js"

var _percent =0;

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
    let content       = document.querySelector('#exTabContent');
        content.innerText   = `${tableOfActiveObjs.length} /${exTr.length}`;
        console.log(content);
        _percent = Math.floor((tableOfActiveObjs.length / exTr.length)*100);
    let tmp           = document.querySelector('#exTabCounter');
        tmp.innerText = `${ _percent  }%`;

       
}
var color = (arg, key) => {
    let tmpFlag = true;


   tableOfActiveObjs.forEach((el, key)=>{
       if(el.rowIndex == arg.rowIndex) tmpFlag = false;
   });

    if(tmpFlag){
        arg.obj.classList.add('exTr_ac');
        tableOfActiveObjs.push(arg);
    }
    tableOfActiveObjs.sort(compare);

    setPosition();
    setCounter();
}
var selectRowByMouse = (start, end) => {
    let trStartIndex = start - 1;
    let trEndIndex   = end - 1;

    exTr[trStartIndex].classList.add('exTr_ac');

    for (let i = trStartIndex; i <= trEndIndex; i++) {
        let arg = {
                    rowIndex: i,
                    obj     : exTr[i],
                    height  : 49,
                }
        color(arg, i);
        exTr[i].classList.add('exTr_ac');
    }
}
var selectAll = () => {
    var thead                          = document.querySelector('#exTable > thead');
        thead.style.position           = "relative";
    var button                         = document.createElement("button");
        button.innerText               = "";
        button.style.position          = "absolute";
        button.style.left              = "0";
        button.style.top               = "0";
        button.style.width             = "20px";
        button.style.height            = "20px";
        button.style.backgroundColor   = "red";
        button.style.borderRadius      = "50%";
        thead.append(button);
}
var appendCP = () => {

    var table                = document.getElementById('exTable');
    var div                  = document.createElement("div");
    var button               = document.createElement("button");
    var header               = document.createElement("header");
    var content              = document.createElement("div");

        header.id            = "exTabCounter";
        content.id            = "exTabContent";
        div.style.position   = "fixed";
        div.style.display    = "flex";
        div.style.flexDirection   = "column";
        div.style.left       = `${tableWidth+tableStartPoint}px`;
        div.style.top        = 0;
        div.style.padding    = '5px';
        div.style.boxSizing  = 'border-box';
        div.style.cursor     = 'default';
        div.style.background = 'rgba(32,114,69,.6)';
        div.style.color      = '#eee';
        div.style.height      = 'auto';

    button.addEventListener('click',
        function () {

            let str;
            var arrayToSave = new Array;
            let TMP_tr      = document.getElementsByClassName('exTr_ac');

            for (var key1 in TMP_tr) {
                if (TMP_tr.hasOwnProperty(key1)) {
                    arrayToSave[key1] = [];
                    const trki        = TMP_tr[key1];
                    const tedeki      = trki.children;

                    for (const key2 in tedeki) {
                        const element = tedeki[key2].innerHTML;

                        if (typeof element != 'undefined') {
                            arrayToSave[key1].push(`"` + element + `"`);
                        }
                    }
                }
            }
            //adding filename (from attribute of the table)
            var filename   = table.getAttribute('data-fTitle') + '.csv';
            var csvContent = '';

            arrayToSave.forEach(function (infoArray, index) {
                let dataString = infoArray.join(';');
                    csvContent += index < arrayToSave.length ? dataString + '\n' : dataString;
            });

            var download = function (content, fileName, mimeType) {
                var a    = document.createElement('a');
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

    div.id           = "controlPanel";
    content.innerHTML = `0/${exTr.length}`;
    header.innerHTML = `0%`;
    button.innerText = "CSV";
    div.append(content);
    div.append(header);

    div.append(button);
    table.append(div);
    // selectAll();
}

export {
    getActive  ,
    compare    ,
    color      ,
    setPosition,
    appendCP   ,
    setCounter ,
    selectRowByMouse
}