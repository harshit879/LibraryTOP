var toggle = false;
var session = false;
const openbtn =  document.getElementById("newbook");
const library = document.getElementById("library");
const submit = document.getElementById("submit");
const form = document.getElementById("_form");
const search = document.getElementById("search")
const x = document.getElementById("search-box")
const y = document.getElementById("filter-box")
const empty = document.getElementById("empty");
const field = document.getElementById("field")
const filter = document.getElementById("filter");
var radios = document.getElementsByName("category")
var sr_toggle = false;
var ftr_toggle = false;
empty.addEventListener("click",()=>{
    localStorage.clear();
    console.log("hlo");
    document.querySelectorAll(".book").forEach(element => {
        element.remove()
    });
})

openbtn.addEventListener("click",slider)
document.addEventListener("click",(e)=>{
    if(!document.getElementById("place").contains(e.target)&&!document.getElementById("form").contains(e.target)){
        if(toggle== true){
        slider()}

    }
})

function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function slider(){
    if(toggle==false){
    document.getElementById("form").style.bottom="0";
    document.getElementById("place").style.bottom= (document.getElementById("form").getBoundingClientRect().height).toString()+"px";
    document.getElementById("form").style.backgroundColor="rgba(48, 47, 46, 0.9)";
    document.getElementById("place").style.backgroundColor="rgba(48, 47, 46, 0.9)";
    toggle = true;
    openbtn.getElementsByTagName("i")[0].innerText = "remove"
    openbtn.getElementsByTagName("i")[0].className = "material-icons"
    }
    else{
    document.getElementById("form").style.bottom="-"+(document.getElementById("form").getBoundingClientRect().height).toString()+"px";
    document.getElementById("place").style.bottom="0";
    document.getElementById("form").style.backgroundColor="white";
    document.getElementById("place").style.backgroundColor="white";
    toggle = false;
    openbtn.getElementsByTagName("i")[0].innerText = "add"
    openbtn.getElementsByTagName("i")[0].className = "material-icons"
    }
}

let books = [];
let book;
if(localStorage.getItem("books")== null){
    
    }
    else{
        fetch("books");
    }

function createbook(){
 
    event.preventDefault()
    var title = document.getElementById("Title").value
    var author = document.getElementById("Author").value
    var pages = document.getElementById("Pages").value
    var status = document.getElementById("Status").checked
    console.log(status)
  
    book = new Book(title,author,pages,status)
    books.push(book)
    storage(book);
    document.querySelectorAll(".book").forEach(element => {
        element.remove()
    });
    fetch("books");
    books.length=0;
    form.reset();
    
    
}

function storage(book){
    if(localStorage.getItem("books")== null){
    localStorage.setItem('books',JSON.stringify(books))
    console.log(JSON.parse(localStorage.getItem('books')||[]))
    }
    else{
        var lib = JSON.parse(localStorage.getItem("books"))
        lib.push(book);
        console.log("yellow")
        
        localStorage.setItem("books",JSON.stringify(lib))
        console.log(lib.length)
    }
     
    

}
function fetch(context){

    var lib = JSON.parse(localStorage.getItem(context))
 
    for(let i=0;i<lib.length;i++){
                
        const bookdiv = document.createElement("div")
        bookdiv.classList.add("book")
        
        bookdiv.setAttribute("id","book"+i)
    
        const titlediv = document.createElement("div")
        titlediv.classList.add("title")  
        bookdiv.append(titlediv)
        titlediv.innerText = lib[i].title
        
        const authordiv = document.createElement("div")
        authordiv.classList.add("author")  
        bookdiv.append(authordiv)
        authordiv.innerText ="~ :    " + lib[i].author
        
        const pagesdiv = document.createElement("div")
        pagesdiv.classList.add("pages")  
        bookdiv.append(pagesdiv)
        pagesdiv.innerText = lib[i].pages

        const statusdiv = document.createElement("div")
        statusdiv.classList.add("status") 
        bookdiv.append(statusdiv)
        
        var hotbar = document.createElement("div")
        hotbar.classList.add("hotbar")
        bookdiv.append(hotbar)

        
        var readdiv = document.createElement("div")
        readdiv.classList.add("hotbar-item")
        readdiv.setAttribute("id","read"+i)
        hotbar.append(readdiv)

        if (lib[i].status == true){
            readdiv.innerText = "unread"
            statusdiv.style.backgroundColor ="green"}
        if(lib[i].status == false){
            readdiv.innerText = "read"
            statusdiv.style.backgroundColor ="red"
        }
        
        
        var removediv = document.createElement("div")
        removediv.classList.add("hotbar-item")
        removediv.innerText = "remove"
        hotbar.append(removediv)


        library.append(bookdiv)
        readdiv.addEventListener("click",()=>{
            if (lib[i].status == true){
                
                updateStatus(lib,lib[i],false,context)
            }
            else{
                
                updateStatus(lib,lib[i],true,context)
            }
        })
        removediv.addEventListener("click",()=>{
            removeItem(lib,i,context)
        })
    }
    document.querySelectorAll(".hotbar-item").forEach(element=>{
        element.addEventListener("mouseover",()=>{
            element.style.backgroundColor = "#d8d9ce"
        })
        element.addEventListener("mouseout",()=>{
            element.style.backgroundColor = "inherit"
        })
    })
}
function updateStatus(lib,item,status,context){
        if(status== false){
            item.status = false
            localStorage.setItem(context,JSON.stringify(lib))
            document.querySelectorAll(".book").forEach(element => {
                element.remove()
            });
      
            fetch(context)
            
        }
        else{
            item.status = true
            localStorage.setItem(context,JSON.stringify(lib))
            document.querySelectorAll(".book").forEach(element => {
                element.remove()
            });
            fetch(context)
        }
        if(context=="search" || context=="sorted"){
            var temp = JSON.parse(localStorage.getItem("books"))
            for(let i=0;i<temp.length;i++){
                if(temp[i].title==item.title){
                    temp[i].status = item.status
                    localStorage.setItem("books",JSON.stringify(temp))
                }
            }
        }
}
function removeItem(lib,item,context){
        
            
            if(context=="search" || context=="sorted"){
                var temp = JSON.parse(localStorage.getItem("books"))
                for(let i=0;i<temp.length;i++){
                    
                    if(temp[i].title==lib[item].title){
                        temp.splice(temp[i],1)
                        console.log("kyakaru")
                        localStorage.setItem("books",JSON.stringify(temp))
                    }
                }
            }
            lib.splice(item,1)
            localStorage.setItem(context,JSON.stringify(lib))
           
            document.querySelectorAll(".book").forEach(element => {
                element.remove()
            });
            fetch(context)
}
search.addEventListener("click",()=>{
 
        if(sr_toggle==false){
        console.log("hell")
        x.style.left = ((search.getBoundingClientRect().left + (search.getBoundingClientRect().width/2))-150).toString()+"px"
        x.style.display = "block"
        console.log("hl")
        sr_toggle = true
    }
    else{
        x.style.display = "none"
        sr_toggle = false
    }
    if(ftr_toggle == true){
        ftr_toggle = false
        y.style.display = "none"
    }
})
document.addEventListener("click",(e)=>{
   
    if(!document.getElementById("search-box").contains(e.target)&&!document.getElementById("search").contains(e.target)&&!document.getElementById("filter-box").contains(e.target)&&!document.getElementById("filter").contains(e.target)){
        sr_toggle = false
        x.style.display = "none"
        ftr_toggle = false
        y.style.display = "none"
    }
})
window.addEventListener("resize",()=>{
    x.style.left = ((search.getBoundingClientRect().left + (search.getBoundingClientRect().width/2))-150).toString()+"px"
})
x.addEventListener("keydown",(e)=>{
    if(e.key =="Enter"){
        var searchitems = []
        var lib = JSON.parse(localStorage.getItem("books"))
        for(let i=0;i<lib.length;i++){
            if(lib[i].title.includes(field.value)||lib[i].author.includes(field.value)){
                searchitems.push(lib[i])
                localStorage.setItem("search",JSON.stringify(searchitems))
                console.log(JSON.parse(localStorage.getItem("search")))
                session = true;
            }
        }
        document.querySelector(".heading > div:nth-child(1)").innerHTML="Search results"
        document.querySelector(".heading > div:nth-child(2)").style.display = "block"
        document.querySelectorAll(".book").forEach(element => {
            element.remove()
        });
        fetch("search")
    }
})
document.querySelector(".heading > div:nth-child(2)").addEventListener("click",()=>{
    document.querySelectorAll(".book").forEach(element => {
        element.remove()
    });
    fetch("books")
    session = false;
    localStorage.removeItem("search")
    document.querySelector(".heading > div:nth-child(1)").innerHTML="Your Books"
    document.querySelector(".heading > div:nth-child(2)").style.display = "none"
})
filter.addEventListener("click",()=>{
        if(ftr_toggle == false){
        y.style.left = ((filter.getBoundingClientRect().left + (filter.getBoundingClientRect().width/2))-150).toString()+"px"
        y.style.display = "block"
            ftr_toggle = true
    }
        else{
            y.style.display = "none"
            ftr_toggle = false
        }
        if(sr_toggle == true){
            sr_toggle = false;
            x.style.display = "none"
        }
})
radios.forEach(element =>{
    element.addEventListener("click",(e)=>{
        if(element.value == "Unread"){
            if(session == true){
                sort(JSON.parse(localStorage.getItem("search")),false)
            }
            else{
                sort(JSON.parse(localStorage.getItem("books")),false)    
            }
        }
        if(element.value == "Read"){
            if(session == true){
                sort(JSON.parse(localStorage.getItem("search")),true)
            }
            else{
                sort(JSON.parse(localStorage.getItem("books")),true)    
            }   
        }
    })
})
function sort(lib,status){
    var sorted = []
    for(let i=0;i<lib.length;i++){
        if(lib[i].status == status){
            sorted.push(lib[i])
        }
    }
    localStorage.setItem("sorted",JSON.stringify(sorted))
    console.log(JSON.parse(localStorage.getItem("sorted")))
    update();
    document.querySelector(".heading > div:nth-child(1)").innerHTML="Filter results"
    document.querySelector(".heading > div:nth-child(2)").style.display = "block"
    fetch("sorted");
}
function update(){
    document.querySelectorAll(".book").forEach(element => {
        element.remove()
    });
}
