var toggle = false;

const openbtn =  document.getElementById("newbook");
openbtn.addEventListener("click",openslider)

function openslider(){
    if(toggle==false){
    console.log("heh")
    document.getElementById("form").style.bottom="0";
    document.getElementById("place").style.bottom="500px";
    document.getElementById("form").style.backgroundColor="rgba(48, 47, 46, 0.9)";
    document.getElementById("place").style.backgroundColor="rgba(48, 47, 46, 0.9)";
    toggle = true;
    }
    else{
    document.getElementById("form").style.bottom="-500px";
    document.getElementById("place").style.bottom="0";
    document.getElementById("form").style.backgroundColor="white";
    document.getElementById("place").style.backgroundColor="white";
    toggle = false;
    }
}