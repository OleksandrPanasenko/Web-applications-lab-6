function boldTextStart(){
    const element=document.getElementsByClassName("article-footnotes")[0];
    if(localStorage.getItem("5th lab bold")!=null){
        if(localStorage.getItem("5th lab bold")=='true'){
            document.getElementById('check-for-bold').checked=true;
            element.style.fontWeight='bold';
        }
        else{
            element.style.fontWeight='normal';
        }
    }
}
function ChangeCheck(){
    if(localStorage.getItem("5th lab bold")==null) localStorage.setItem("5th lab bold", false);
    if(document.getElementById('check-for-bold').checked) localStorage.setItem("5th lab bold", true);
    else localStorage.setItem("5th lab bold", false);
    boldTextStart();
}