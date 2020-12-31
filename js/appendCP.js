import { table, exTr, tableOfActiveObjs, tableWidth, tableStartPoint          } from "./vars.js";
import { color} from "./methods.js";
import { setPosition                                                          } from "./setPosition.js"
var appendCP = () => {
    "use strict";
    var table                = document.getElementById('exTable');
    var div                  = document.createElement("div");

    var button               = document.createElement("button");
    var stickyButton         = document.createElement("button");
    var stickyButtonImg      = document.createElement("img");
        stickyButtonImg.src="icon/sticky.svg";
    var header               = document.createElement("header");
    var content              = document.createElement("div");
    var selectAllBtn         = document.createElement("button");
    var selectAllImg         = document.createElement("img");
        selectAllImg.src="icon/ok.svg";



        header.id                 = "exTabCounter";
        content.id                = "exTabContent";

        selectAllBtn.id           = "sAllBtn";
        selectAllBtn.classList.add("scene")  ;
        
        // selectAllBtn.innerText    = "select all";
        // stickyButton.innerText    = "get sticky";
        div.style.position        = "fixed";
        div.style.display         = "flex";
        div.style.flexDirection   = "column";
        div.style.left            = `${tableWidth+tableStartPoint}px`;
        div.style.top             = 0;
        div.style.padding         = '0px';
        div.style.boxSizing       = 'border-box';
        div.style.cursor          = 'default';
        // div.style.background      = '#222831';
        div.style.color           = '#eee';
        div.style.height          = 'auto';
        div.style.justifyContent  = 'flex-start';

        button.classList.add('ex_csvButton');
        button.style.backgroundColor="#f05454";
        button.style.color="#eee";


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
    function removeOne(){
        this.classList.remove('exTr_sticky');
    }
    var getSticky=()=>{
        console.log('tableOfActiveObjs', tableOfActiveObjs);
        tableOfActiveObjs.forEach(el => {
            el.obj.classList.add('exTr_sticky');
            console.log(el.obj);
            el.obj.addEventListener('click',removeOne);
         });
    }
    var cpInit=()=>{
        div.id            = "controlPanel";
        content.innerHTML = `0/${exTr.length}`;
        header.innerHTML  = `0%`;
        button.innerHTML  = `CSV`;

    
        div.append(content);
        div.append(header);
        
        div.append(selectAllBtn);
        selectAllBtn.append(selectAllImg);
        div.append(stickyButton);
        stickyButton.append(stickyButtonImg);
        div.append(button);

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