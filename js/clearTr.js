import { table, exTr, tableOfActiveObjs } from "./vars.js";
import { setCounter } from "./methods.js";
const clearTr = () => {
    for (const key in exTr) {
        if (exTr.hasOwnProperty(key)) {
            const element = exTr[key];
                  element.classList.remove('exTr_ac');
                  element.classList.remove('exTr_sticky');
                  table.focus;
        }
    };
    tableOfActiveObjs.length = 0;
    setCounter();
}
export {
    clearTr
}