import { table, exTr, tableOfActiveObjs, tableWidth, tableStartPoint          } from "./vars.js";
import { color} from "./methods.js";
import { setPosition                                                          } from "./setPosition.js"
var appendCP = () => {

    var table                = document.getElementById('exTable');
    var div                  = document.createElement("div");
    var button               = document.createElement("button");
    var stickyButton         = document.createElement("button");
    var header               = document.createElement("header");
    var content              = document.createElement("div");
    var selectAllBtn         = document.createElement("button");

        header.id                 = "exTabCounter";
        content.id                = "exTabContent";
        selectAllBtn.id           = "sAllBtn"
        selectAllBtn.innerText    = "select all";
        stickyButton.innerText    = "get sticky";
        div.style.position        = "fixed";
        div.style.display         = "flex";
        div.style.flexDirection   = "column";
        div.style.left            = `${tableWidth+tableStartPoint}px`;
        div.style.top             = 0;
        div.style.padding         = '5px';
        div.style.boxSizing       = 'border-box';
        div.style.cursor          = 'default';
        div.style.background      = 'rgba(32,114,69,.6)';
        div.style.color           = '#eee';
        div.style.height          = 'auto';

    var selectAllTr = () =>{
     exTr.forEach(el => {

        let arg = {
            rowIndex: el.rowIndex,
            obj     : el,
            height  : 49,
        }
        color(arg, el.rowIndex);

     });
    }
    var getSticky=()=>{
        exTr.forEach(el => {
            el.classList.toggle("exTr_sticky");
         });
    }
    var cpInit=()=>{
        div.id            = "controlPanel";
        content.innerHTML = `0/${exTr.length}`;
        header.innerHTML  = `0%`;
        button.innerText  = "CSV";
    
        div.append(content);
        div.append(header);
        div.append(button);
        div.append(selectAllBtn);
        div.append(stickyButton);
        table.append(div);
    }
    var download =  (content, fileName, mimeType) => {
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
    var makeCP = () => {

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

        download(csvContent, filename, 'text/csv;charset:utf-8');
    }

    cpInit();


    button.addEventListener('click', makeCP);
    selectAllBtn.addEventListener('click', selectAllTr);
    stickyButton.addEventListener('click', getSticky);

}
export{
    appendCP
}