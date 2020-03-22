import {
    table,
    exTr,
    tableOfActiveObjs,
    tableWidth
} from "./vars.js";
import {
    getHeight
} from "./getHeight.js";
import {
    getActive,
    compare,
    color,
    setPosition,
    appendCP,
    setCounter
} from "./methods.js";
import {
    clearTr
} from "./clearTr.js";

var TMPmin = 0;
table[0].style.position = "relative";

//add point 'n click
for (const key in exTr) {
    if (exTr.hasOwnProperty(key)) {
        const element = exTr[key];
        exTr[key].addEventListener('click', ev => {

            if (!ev.ctrlKey) {
                clearTr();

                let tmpObj = {
                    rowIndex: exTr[key].rowIndex,
                    obj: exTr[key],
                    height: exTr[key].offsetHeight
                }

                color(tmpObj, key);

                // } else if (ev.shiftKey) {
                //     let i = TMPmin;
                //     let TMPcurrent = key;
                //     while (1) {
                //         let tmpObj = {
                //             rowIndex: exTr[key].rowIndex,
                //             obj: exTr[key],
                //             height: exTr[key].offsetHeight
                //         }
                //         color(tmpObj, i);
                //         if (i >= TMPcurrent) {
                //             i--;
                //         } else if (i < TMPcurrent) {
                //             i++;
                //         } else {
                //             break;
                //         }
                //     }
            } else {
                let tmpObj = {
                    rowIndex: exTr[key].rowIndex,
                    obj: exTr[key],
                    height: exTr[key].offsetHeight
                }
                color(tmpObj, key);
            }

            TMPmin = key;
        })
    }
}
// generating CP and click-it function


appendCP();

//events listeners CONTEXT MENU
document.getElementById('exTable').addEventListener("contextmenu", function (e) {
    clearTr();
    e.preventDefault();
}, false);