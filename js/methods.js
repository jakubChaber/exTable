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

export {
    getActive  ,
    compare    ,
    color      ,
    setPosition,
       
    setCounter ,
    selectRowByMouse
}