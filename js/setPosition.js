import { table, exTr, tableOfActiveObjs } from "./vars.js";
var setPosition = () => {
    for (const key in tableOfActiveObjs) {
        if (tableOfActiveObjs.hasOwnProperty(key)) {
            const element = tableOfActiveObjs[key];
            console.log('l6 set Pos', element.obj.querySelectorAll('td'));
                  element.obj.querySelectorAll('td, th').forEach(el => {
                      el.style.top = `${((parseInt(key)+1)*element.height) - element.height }px`;
                  });       
        }
    }
}
export {
    setPosition
}