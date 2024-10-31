//add functions to objects 1 to 6
function InitialiseHidingTables(){
    let list=["header", "side-menu", "article-footnotes", "content", "article-header", "footer"];
    for(let elementName of list){
        let element=getElement(elementName);
        element.addEventListener('mousemove', ()=>OnMoveTable(elementName));
        element.addEventListener('mouseleave', ()=>HideTable(elementName));
        if(localStorage.getItem(`table-${elementName}-table`)) {
            localStorage.getItem(`table-${elementName}-table-check`, "true")
            element.innerHTML="";
            OnMoveTable(elementName);
        }
    }
}
//when field is hovered
function OnMoveTable(className){
    hoveredElement=getElement(className);
//if div doesn't contain said table
    if(!hoveredElement.innerHTML.includes("table-for-fifth")){
        hoveredElement.innerHTML+=`
        <form class="table-for-fifth">
            <div id="table-${className}-table"></div>
            <input type="button" value="AddRow" onclick="AddRowFifth('table-${className}-table')">
            <input type="button" value="DeleteRow" onclick="DeleteRowFifth('table-${className}-table')">
            <input type="button" value="Save Changes" onclick="SaveChangesToJsonFifth('table-${className}-table')">
            `
        if(localStorage.getItem(`table-${className}-table-check`)){    
            hoveredElement.innerHTML+=`<input type="button" value="Delete JSON and resume view" onclick="DeleteJson('table-${className}-table')">`
        }
            hoveredElement.innerHTML+=`</form>
        `
//fill with saved
        element=document.getElementById(`table-${className}-table`);
        json_object=localStorage.getItem(`table-${className}-table`);
        if(json_object==null||json_object==NaN&&json_object.array.length>0){
            element.innerHTML="<input type='text'>".repeat(5);
        }
        else{
            array=JSON.parse(json_object).array;
            for (let snippet of array){
                element.innerHTML+=`<input type='text' value="${snippet}">`;
            }
        }
    }
//if it has already
    else{
        getElement(className).getElementsByClassName("table-for-fifth")[0].style.display="block";
        getElement(className).style.minHeight="fit-content";
    }
}
function AddRowFifth(idName){ 
    document.getElementById(idName).innerHTML+="<input type='text'>";
}
function DeleteRowFifth(idName){
    inputArray=document.getElementById(idName).getElementsByTagName("Input");
    inputArray[inputArray.length-1].remove();
}
function SaveChangesToJsonFifth(idName){
    json_object={
        array:[]
    }
    inputArray=document.getElementById(idName).getElementsByTagName("Input");
    for (let inputItem of inputArray){
        json_object.array.push(inputItem.value);
    }
    localStorage.setItem(idName, JSON.stringify(json_object));
}
//when cursor exits
function HideTable(className){
    if(!localStorage.getItem(`table-${className}-table-check`)){
        element=getElement(className);
        element.getElementsByClassName("table-for-fifth")[0].style.display="none";
    }
}
function getElement(elementName){
    return document.getElementById(elementName)||document.getElementsByClassName(elementName)[0]||document.getElementsByTagName(elementName)[0];
}
function DeleteJson(jsonName){
    localStorage.removeItem(jsonName);
    localStorage.removeItem(`${elementName}-check`)
    window.location.reload();
}