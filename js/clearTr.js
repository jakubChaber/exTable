import {
    table,
    exTr,
    tableOfActiveObjs
} from "./vars.js";
const clearTr = () => {
    for (const key in exTr) {
        if (exTr.hasOwnProperty(key)) {
            const element = exTr[key];
            element.classList.remove('exTr_ac');
            table.focus;
        }
    };
    // console.log('tableOfActiveObjs', tableOfActiveObjs);
    // tableOfActiveObjs = [];
    tableOfActiveObjs.length = 0;
}
export {
    clearTr
}