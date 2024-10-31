function ProcessCookie(){

    const array=[];
    var min=null, max=null;
    for (i=0;i<10;i++){
        toInsert=document.getElementsByClassName("third-task")[i].value;
        array.push(parseFloat(toInsert)||null);
        if(array[i]!=null){
            if(i==0) min=max=array[i];
            if(array[i]<min) min = array[i];
            if(array[i]>max) max = array[i];
        }
        if(min==null&&array[i]!=null) min=array[i];
        console.log(`min ${min} array ${array[i]}`)
        if(max==null&&array[i]!=null) max=array[i];
    }
    data={
        object_array:array,
        object_min:min,
        object_max:max,
        object_cookie_confirmed:false
    }
    saveDataInCookie("5th lab 3rd task", data);
    alert('Reload page to see changes');
}
function saveDataInCookie(cookieName, data) {
    const date=new Date;
    date.setTime(date.getTime()+365*24*60*60);
    const jsonData = JSON.stringify(data);
    document.cookie=cookieName+"="+(jsonData||"")+"; expires="+date.toUTCString+"; path=/";
}
function getCookie(Name){
    let cookieName=Name+'=';
    let cookies=document.cookie.split("; ");
    for(let cookie of cookies){
        if(cookie.startsWith(cookieName)){
            return cookie.substring(cookieName.length);
        }
    }
    return null;
}
async function dealWithCookieOnUpload(){
    cookieName="5th lab 3rd task";
    let cookieContainment=getCookie(cookieName);
    element=document.getElementById("Form-3-task");
    if(cookieContainment!=null){
        element.style.display="hidden";
            element.innerHTML=`<button onclick="deleteCookie('5th lab 3rd task')">Delete cookie</button>`   
    }
    else{
        element.style.display="block";
    }
    if(cookieContainment!=null){
        
        json_object=JSON.parse(cookieContainment);
        if(!json_object.object_cookie_confirmed){
            await wait(400);
            let result;
            result=confirm(`The cookie preserved is ${cookieContainment}\nMin value: ${json_object.object_min}\nMax value: ${json_object.object_max}\n\nDo you want to save it?`); 
            
            if(result==true){
                json_object.object_cookie_confirmed=true;
                saveDataInCookie(cookieName, json_object);
                console.log(json_object);
                alert("Cookie was saved! Please, reload the page");
            }
            else{
                deleteCookie(cookieName);
                alert("cookie wasn't preserved; page will be reloaded");
                window.location.reload();
            }
        }
        
    }
}
function deleteCookie(name){
    document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}