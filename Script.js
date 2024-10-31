const height=Math.PI;
const width=Math.E;

/*#1 Change contents of x and y*/
function SwitchXandY(){
    const x = document.getElementsByClassName("motto")[0];
    const y = document.getElementsByClassName("motto")[1];
    buffer=x.innerHTML;
    x.innerHTML=y.innerHTML;
    y.innerHTML=buffer;
}
/*#2 Rectangle surface area from inside variables into area 4*/
function RectangleArea(){
    const Rectangle=document.getElementsByClassName("content")[0];
    const string=`<p>Total area from variables: ${height*width} </p>`+`<p>Total area of this particular rectangle: ${Rectangle.clientHeight*Rectangle.clientWidth}`;
    Rectangle.innerHTML+=string;
}




function WhenLoaded(){
    SwitchXandY();
    RectangleArea();
    dealWithCookieOnUpload();
    boldTextStart();
    InitialiseHidingTables();
}