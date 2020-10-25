import {
    table,
    exTr,
    tableOfActiveObjs
} from "./vars.js";
var setPosition = () => {
    for (const key in tableOfActiveObjs) {
        if (tableOfActiveObjs.hasOwnProperty(key)) {
            const element = tableOfActiveObjs[key];
            console.log(parseInt(key) + 1);
            element.obj.style.top = `${((parseInt(key)+1)*element.height) - element.height }px`;
        }
    }
}
export {
    setPosition
}