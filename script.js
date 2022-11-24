const ApiEndpoint = 'https://randomuser.me/api/';
const cardUser = document.getElementById('card_user');
const dataBase = new PouchDB('random_user');
const listUsers = document.getElementById('list-users');

let countUsers = 0;




const showCard = async () => {

      try{

            const user = await axios.get(ApiEndpoint);
            const image = user.data.results[0].picture.medium;
            const name = user.data.results[0].name.first;
            const lastName = user.data.results[0].name.last;
            const country = user.data.results[0].location.country;
            const email = user.data.results[0].email;
            const gender = user.data.results[0].gender;

            console.log(user);

            cardUser.innerHTML = `
                  <img src=${image} class="card-img-top" alt="...">
                  <div class="card-body">
                  <h5 class="card-title">${name} ${lastName}</h5>
                  <p class="card-text">Country: ${country}</p>
                  <p class="card-text">Gender: ${gender}</p>
                  <p class="card-text">Email: ${email}</p>
                  <a href="#" class="btn btn-primary" id="random-user" onclick="showCard();">Random user</a>
                  <a href="#" class="btn btn-primary" id="save-user" onclick="saveUserInDB('${name}','${lastName}','${country}','${gender}', '${email}');">Favorite</a>
      `;

      } catch(error){
            console.log(error);
      }
}


const saveUserInDB = (name, lastName, country, gender, email) =>{

      let doc = {
            _id: email,
            name: name,
            lastName: lastName,
            country: country,
            gender: gender
      };


      dataBase.put(doc, function(err, response) {
            if (err) {
               return console.log(err);
            } else {
               console.log("Document created Successfully");
               userListSave(doc);
            }
         });
}


const userListSave = (doc) =>{
      countUsers++;
      listUsers.innerHTML += `

            <li class="list-group-item d-flex justify-content-between align-items-start" id="user-${countUsers}">
            <div class="ms-2 me-auto user-info">
                  <div class="fw-bold">${countUsers}. ${doc._id} ${doc.name} ${doc.lastName} ${doc.country} ${doc.gender}</div>
                  <button type="button" class="btn btn-danger" onclick="deleteUser('${doc._id}', '${countUsers}')">Delete user</button>
            </div>
            </li>
      `;
}

const deleteUser = (idUser, userInList) =>{
      console.log("el id es :", idUser);

      document.getElementById(`user-${userInList}`).remove();

      dataBase.get(idUser, function(err, doc) {
            if (err) {
               return console.log(err);
            } else {
                  dataBase.remove(idUser, doc._rev, function(err) {
                        if (err) {
                           return console.log(err);
                        } else {
                           console.log("Document deleted successfully");
                        }
                     });
            }
         });

      
}


window.addEventListener('DOMContentLoaded', showCard());
