// Konstruktur

class Buch{
  constructor(title, autor, isbn){
    this.title= title;
    this.autor=autor;
    this.isbn = isbn;
  }
}
class Store{

  constructor(){
  }


  static getBuch(){
    let buecher ;
    if(localStorage.getItem("buecher")=== null){
      buecher= [];
    }else{
      buecher = JSON.parse(localStorage.getItem("buecher"));
    }
    return buecher;
  }


  static displayBuch(){
    const buecher = Store.getBuch();
    buecher.forEach(function(buch) {
      const ui = new UI;
      ui.buchHinzufuegen(buch);
    });
  }

  static addBuch(buch){
    const buecher = Store.getBuch()
    buecher.push(buch);
    console.log(buecher.length);
    localStorage.setItem(buecher, JSON.stringify(buecher));

  }



  static removeBuch(){

  }
}

class UI{
  constructor(){}

 buchHinzufuegen(buch){
    const  buchlist = document.querySelector('#blist');  
  
    const tr = document.createElement('tr');
    tr.innerHTML =`
     <td>${buch.title}</td> 
     <td>${buch.autor}</td> 
     <td>${buch.isbn}</td> 
     <td><a href= "#" class ="delete">x</td> 
    ` ;
    buchlist.appendChild(tr);
  }

  clearInput(){
    document.querySelector('#title').value ="";
    document.querySelector('#autor').value= "";
    document.querySelector('#isbn').value= "";
  }

  loeschen(target){
    target.parentElement.parentElement.remove();
  
  }

  alert (text, className){
    const div = document.createElement("div");
    const container = document.querySelector(".container");
    const form = document.querySelector("#buch-form");
    div.textContent= `${text}`;
    div.className= `alert ${className} `;
    container.insertBefore(div,form);
    setTimeout(() => {
      document.querySelector(".alert").remove()
    }, 2000);
  }

}


const ui = new UI();


document.addEventListener('DOMContentLoaded', Store.displayBuch);


document.getElementById('buch-form').addEventListener('submit', function(e){
  const title = document.querySelector('#title').value;
  const autor = document.querySelector('#autor').value;
  const isbn = document.querySelector('#isbn').value;
  const buch = new Buch(title,autor,isbn);

    if (title === "" || autor ==="" || isbn === ""){
      ui.alert("Bitte die Eingabe vollständigen", "loeschen");
    }else{
      ui.buchHinzufuegen(buch);
      ui.alert("Buch hinzugefügt", "hinzufuegen");
      Store.addBuch(buch);
      ui.clearInput();
    }
 
  e.preventDefault();
  
});




document.getElementById("blist").addEventListener("click", function(e){
    
        if(e.target.className ==="delete"){
               ui.loeschen(e.target);
               ui.alert("Buch gelöscht", "loeschen");
          }
  e.preventDefault();
});


