// update()
// console.log('welcome to // console');
showNotes();
let add_button = document.getElementById('add_btn')

add_button.addEventListener('click', function(e) {
    let add_txt = document.getElementById('add_txt')
    let add_title = document.getElementById('add_title')
    let markAsImp = document.getElementById('markAsImp')
    let time = document.getElementById('clock')
    let notes = localStorage.getItem('notes')

    if (add_txt.value != '' && add_title.value != '') {
        if (notes == null) {
            notesobj = []
        } else {
            notesobj = JSON.parse(notes)
        }


        let myObj = {
            title: add_title.value,
            txt: add_txt.value,
            // timing: time.innerHTML,
            imp: new Boolean(markAsImp.checked)
        };
        notesobj.push(myObj)
        localStorage.setItem('notes', JSON.stringify(notesobj))

        add_txt.value = ""
        add_title.value = ""

        showNotes();
    } else {
        alert("add both title and description")
    }


})



function showNotes() {
    notes = localStorage.getItem('notes')

    if (notes == null) {
        notesobj = []
    } else {
        notesobj = JSON.parse(notes)
    }


    html = ''
    notesobj.forEach(function(element, index) {

        let str;


        if (element.imp == Boolean(true)) {
            str = `<div class="noteCard" style="width: 91%;margin: auto;margin-bottom: 5px;border-radius: 15px;  border: 4px solid green">`
        } else {
            str = `<div class="noteCard" style="width: 91%;border-radius: 20px;margin: auto; border: 2px solid grey;margin-bottom: 5px;">`
        }

        html = html + str +

            `     
        
            <div class="card-body">
   
        <div class="row">
         <p style="width:70%" class="card-title" id="card-title${index}">${element.title}</p>
         <div style="width:30%">
         <i style="   margin: 2px; cursor:pointer"  dataDelete="${index}"  class="fas delbtn fa-trash-alt"></i>
         <i style="   margin: 2px; cursor:pointer"  dataEdit="${index}"  class="fas editbtn fa-edit"></i>
         
            </div>
         
            </div>
             
                   

                    
                    <p class="card-text" id="card-text${index}">${element.txt}</p>
                    

                    
                
                
            </div>      
            
            </div>`;

    });

    //     <button  style=" width: 39px;
    //     margin: 2px;"  dataDelete="${index}" class="btn delbtn btn-secondary">Delete</button>
    //   <button  style=" width: 39px;
    //   margin: 2px;"  dataEdit="${index}" class="btn editbtn btn-secondary">Edit</i></button>
    // let notesElm = document.getElementById("notes_here");
    if (notesobj.length != 0) {
        document.getElementById("notes_here").innerHTML = html;


        const divs = document.querySelectorAll('.delbtn');
        divs.forEach(el => el.addEventListener('click', event => {
            deleteNote(event.target.getAttribute("dataDelete"));
            // // console.log("Delete ==->" + event.target.getAttribute("dataDelete"));
        }));

        const divs2 = document.querySelectorAll('.editbtn');
        divs2.forEach(el => el.addEventListener('click', event => {
            editNote(event.target.getAttribute("dataEdit"));
            // // console.log("Edit ->" + event.target.getAttribute("dataEdit"));
        }));
    } else {
        document.getElementById("notes_here").innerHTML = `No Available Notes! <br> Use Add Note to add your First Note`;
    }




}


let dlt_all = document.getElementById('dlt_all_btn');
dlt_all.addEventListener('click', function() {
    if (confirm("are you sure , you want to delete all notes? ")) {

        // localStorage.clear()
        localStorage.removeItem("notes");
        notesobj = null;
        myObj = null;
    }
    showNotes();
})

const divs = document.querySelectorAll('.delbtn');


function deleteNote(index) {
    // console.log('delete pressed', index)

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {

        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesobj));

    showNotes();
    return;
}


// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function () {

//     let inputVal = search.value.toLowerCase();

//     let noteCards = document.getElementsByClassName('noteCard');

//     Array.from(noteCards).forEach(function (element) {
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;

//         if (cardTxt.includes(inputVal)) {
//             element.style.display = "block";
//         }
//         else {
//             element.style.display = "none";
//         }
//     })
// })





// function update() {
//     setTimeout(() => {
//         let date = new Date;



//         let hours = ("0" + date.getHours()).slice(-2);
//         let minutes = ("0" + date.getMinutes()).slice(-2);
//         let seconds = ("0" + date.getSeconds()).slice(-2);
//         let clock = document.getElementById('clock');
//         // // console.log(hours,minutes,seconds);

//         clock.innerHTML = `${hours} : ${minutes} : ${seconds}`
//         update()
//     }, 1000);

// }


function editNote(index) {
    // console.log('edit pressed', index)


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {

        notesobj = JSON.parse(notes);
    }

    editNoteDescription = document.getElementById("card-text" + index)
    html = editNoteDescription.innerHTML

    editNoteDescription.innerHTML = ` <textarea style="width: 80%;
    margin-bottom: -10px;
    background-color: rgb(8, 31, 37);
    border: 2px solid rgb(116, 234, 255);
    color: white;" id="textarea" rows="2"> ${html}</textarea>`;

    let first = document.querySelector('#card-text' + index)


    let textarea = document.getElementById('textarea')
    textarea.addEventListener('blur', function() {
        let new_description = textarea.value
        document.getElementById("card-text" + index).innerHTML = new_description;

        notesobj[index].txt = new_description;


        localStorage.setItem("notes", JSON.stringify(notesobj));
        showNotes()
    })
}