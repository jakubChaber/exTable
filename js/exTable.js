import { table, exTr, tableOfActiveObjs, tableWidth                                     } from "./vars.js";
import { getHeight                                                                      } from "./getHeight.js";
import { getActive, compare, color, setPosition, appendCP, setCounter, selectRowByMouse } from "./methods.js";
import { clearTr                                                                        } from "./clearTr.js";

var TMPmin                  = 0         ;
var pointDown                           ;
var isClicked               = 0         ;
    table[0].style.position = "relative";

//add point 'n click
for (const key in exTr) {
    if (exTr.hasOwnProperty(key)) {
        const element = exTr[key];

        exTr[key].addEventListener('click', ev => {

                let tmpObj = {
                    rowIndex : exTr[key].rowIndex,
                    obj      : exTr[key],
                    height   : exTr[key].offsetHeight
                }
                
                color(tmpObj, key);

            TMPmin = key;
        });
        exTr[key].addEventListener('mousedown', ev => {

            pointDown = ev.target.parentNode.rowIndex;
            isClicked = 1;
            ev.target.parentNode.classList.add('selected');

        })
        exTr.forEach(el => {
            el.addEventListener('mouseover', (ev) => {
                if (isClicked == 1) {
                    ev.target.parentNode.classList.add('selected');
                }

            })
        })
        exTr[key].addEventListener('mouseup', ev => {
            let point_1 = pointDown;
            let point_2 = ev.target.parentNode.rowIndex;


            while (1) {

                let tmpObj = {
                    rowIndex: exTr[point_1 - 1].rowIndex,
                    obj     : exTr[point_1 - 1],
                    height  : exTr[point_1 - 1].offsetHeight
                }
                color(tmpObj, point_1 - 1);
                if (point_1 - 1 == point_2 - 1) {
                    break;
                }
                if (point_1 < point_2) point_1++;
                if (point_1 > point_2) point_1--;

            }
            isClicked = 0;
            exTr.forEach(el => {
                el.classList.remove('selected');
            });
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