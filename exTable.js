
//variables
const table = document.querySelectorAll('#exTable');
const exTr = document.querySelectorAll('#exTable  tr');
var TMPmin=0;
table[0].style.position="relative";

//methods
clearTr=()=>{
    for (const key in exTr) {
        if (exTr.hasOwnProperty(key)) {
            const element = exTr[key];
            element.classList.remove('exTr_ac');
            table.focus;
        }
    }
}

//add point 'n click
for (const key in exTr) {
    if (exTr.hasOwnProperty(key)) {
        const element = exTr[key];
        exTr[key].addEventListener('click', ev =>{
            if(!ev.ctrlKey){
                clearTr();
                exTr[key].classList.add('exTr_ac');      
   
            }else if(ev.shiftKey){
                let i = TMPmin;
                let TMPcurrent = key;
                while(1){
                    exTr[i].classList.add('exTr_ac');
  
                    if( i > TMPcurrent){
                        i--;
                    }else if( i < TMPcurrent ){
                        i++;
                    }else{
                        break;
                    }
                }
            }else{
                exTr[key].classList.toggle('exTr_ac');
  
            }
            TMPmin=key;
        } )        
    }
}
// generating CP and click-it function
appendCP=()=>{
    var table = document.getElementById('exTable');
    var div = document.createElement("div");
    div.style.position="absolute";
    div.style.right='-46px';
    div.style.top=(table.clientHeight)/2 + 'px';
    div.style.width='45px';
    div.style.padding='5px';
    div.style.boxSizing='border-box';
    div.style.cursor='pointer';
    div.style.background='rgba(32,114,69,.6)';
    div.style.color='#eee';

    div.addEventListener('click',
            function() {
                
                    let str;
                    var arrayToSave = new Array;
                    let TMP_tr = document.getElementsByClassName('exTr_ac');
                    
                    for (var key1 in TMP_tr) {
                        if (TMP_tr.hasOwnProperty(key1)) {
                            arrayToSave[key1]=[];
                            const trki = TMP_tr[key1];
                            
                            const tedeki = trki.children;
                            for (const key2 in tedeki) {

                                    const element = tedeki[key2].innerHTML;
                                    // console.log(`trki[key].`, tedeki[key]);
                                    if( typeof element != 'undefined' ){
                                        // console.log('key1: ',arrayToSave);
                                        arrayToSave[key1].push( `"`+element+`"` );

                                    }
                                    

                            }

                            
                            
                        }
                    }
                    
                    //adding filename (from attribute of the table)
                    var filename = table.getAttribute('data-fTitle')+'.csv';

                    var csvContent = '';
                    arrayToSave.forEach(function(infoArray, index) {
                    dataString = infoArray.join(';');
                    csvContent += index < arrayToSave.length ? dataString + '\n' : dataString;
                    });

                    var download = function(content, fileName, mimeType) {
                    var a = document.createElement('a');
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

    div.id="controlPanel";
    div.innerText="CSV";
    table.append(div);
}

appendCP();

//events listeners CONTEXT MENU
  document.getElementById('exTable').addEventListener("contextmenu", function(e){
      clearTr();
      e.preventDefault();
    }, false);
