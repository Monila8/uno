function fetchComments() {
  axios
    .get("http://localhost:3001/comments?active=true")//query params or string param
    .then(function name(response) {
      console.log(response.data);
      //the following line gets the results node and assign it to p1
      const p1 = document.querySelector(".results");
      //the next line erases the content of the node to have fresh set of messages
      p1.innerHTML=""

      response.data.forEach((element) => {
        //if (element.active === true) {    
          addTextNode(element);
        //}
        
      });
    })
    .catch(function name(error) {
      console.log(error);
    });
}
const comm = document.querySelector(".comments");
const sendBtn = document.querySelector(".send");

sendBtn.addEventListener("click", function onClick(params) {
  axios
    .post("http://localhost:3001/comments", {
      message: comm.value,
      active: true,
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
     })
    .then(function onSucces(params) {
      comm.value = "";
      fetchComments();
    })
    .catch(function onError(params) {
      alert("Error");
    });
});

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("Loaded");
  fetchComments();
});

function addTextNode(el) {
  const pContainer = document.createElement("p")
  pContainer.classList.add("m-2", "comment-container");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-danger","btn", "m-2");
  deleteBtn.innerHTML = "Borrar";
  deleteBtn.onclick = function name(params) {
    axios
      .patch(`http://localhost:3001/comments/${el.id}`, {
        active: false,
        updatedAt: new Date().toISOString(),
      })
      .then(function name(response) {
        fetchComments();
      })
      .catch(function name(error) {
        console.log(error);
      });
  };

  const newtext = document.createTextNode(el.message)
  const br= document.createElement('br');
  const resultsNode = document.querySelector(".results");
  const dateText = document.createTextNode(`Fecha: ${new Date(el.createdAt).toLocaleString()} - Última actualización: ${new Date(el.updatedAt).toLocaleString()}`);

  pContainer.appendChild(newtext);
  pContainer.appendChild(br); 
  pContainer.appendChild(dateText);     
  pContainer.appendChild(deleteBtn);
  resultsNode.appendChild(pContainer);  
}

console.log("Loading");
