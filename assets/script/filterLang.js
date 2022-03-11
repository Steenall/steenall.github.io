var filter = -1;
const languages = ["c", "java", "html-css", "javascript", "python", "cpp"];
document.getElementById("menuLang").removeAttribute("hidden");
/**
 * Hide all projects which doesn't have the specified programming language
 * It also add 
 */
function filterByLang(lang) {
    let base = document.getElementById("projects").getElementsByTagName("li");
    if(lang===filter) {
        window.history.pushState({}, "", window.location.href.substring(0, window.location.href.indexOf("?")));
        filter = -1;
        document.getElementById('radio-'+lang).checked=false;
        for(let i=0; i < base.length; i++) {
            base.item(i).hidden = false;
        }
    }
    else {
        filter = lang;
        window.history.replaceState({}, "", "?filterLang="+languages[filter]);
        for(let i=0; i < base.length; i++) {
            if(base.item(i).classList.contains(languages[filter])){
                base.item(i).hidden = false;
            }else{
                base.item(i).hidden = true;
            }
        }
    }
}
/**
 * Check in parameters
 */
let index = window.location.href.indexOf("filterLang=");
if(index !== undefined && index !== -1){
    let param = window.location.href.substring(index+11);
    let endPos = param.indexOf("&");
    if(endPos!==-1){
        param = param.substring(0, param.indexOf("&"));
    }
    console.log(param);
    index = languages.indexOf(param);
    if(index!==-1) {
        document.getElementById('radio-'+index).checked = true;
        filterByLang(index);
    }
}else {
    /**
     * Check if the state of a radio button has been saved
     */
    for(i=0; i<languages.length; i++) {
        if(document.getElementById('radio-'+i).checked) {
            document.getElementById('radio-'+i).checked=true;
            filterByLang(i);
            break;
        }
    }

}
