import { Personnage } from "./personnage.class.js";

let myHeaders = new Headers();
let url = '/listePerso';
let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

/* ----------------------------------- */
/*               FAVICON               */
/* ----------------------------------- */

let head = document.querySelector('head');

let linkFavicon1 = document.createElement('link');
linkFavicon1.setAttribute('rel', 'icon');
linkFavicon1.setAttribute('sizes', '32x32');
linkFavicon1.setAttribute('href', '/favicons/favicon-32x32.png');

let linkFavicon2 = document.createElement('link');
linkFavicon2.setAttribute('rel', 'icon');
linkFavicon2.setAttribute('sizes', '16x16');
linkFavicon2.setAttribute('href', '/favicons/favicon-16x16.png');

let linkFavicon3 = document.createElement('link');
linkFavicon3.setAttribute('rel', 'manifest');
linkFavicon3.setAttribute('href', '/site.webmanifest');

let metaFavicon1 = document.createElement('meta');
metaFavicon1.setAttribute('name', 'msapplication-TileColor');
metaFavicon1.setAttribute('content', '#da532c');

let metaFavicon2 = document.createElement('meta');
metaFavicon2.setAttribute('name', 'theme-color');
metaFavicon2.setAttribute('content', '#ffffff');

head.appendChild(linkFavicon1);
head.appendChild(linkFavicon2);
head.appendChild(metaFavicon1);
head.appendChild(metaFavicon2);

/* ----------------------------------- */
/*               NAVBAR                */
/* ----------------------------------- */

let navContainer = document.querySelector('#navbar');

let navDiv = document.createElement('div');
navDiv.setAttribute('id', `nav-div`);

let linkAccueil = document.createElement('a');
linkAccueil.setAttribute('href', `/`);
linkAccueil.setAttribute('class', `link-accueil`);
linkAccueil.innerText = `Accueil`;

let linkListe = document.createElement('a');
linkListe.setAttribute('href', `/liste`);
linkListe.setAttribute('class', `link-liste`);
linkListe.innerText = `Liste Des Personnages`;

let linkAdd = document.createElement('a');
linkAdd.setAttribute('href', `/addPerso`);
linkAdd.setAttribute('class', `link-add`);
linkAdd.innerText = `Ajouter Un Personnage`;

let spaceDiv = document.createElement('div');
spaceDiv.setAttribute('class', `space-div`);

navContainer.appendChild(navDiv);
navDiv.appendChild(linkAccueil);
navDiv.appendChild(linkListe);
navDiv.appendChild(linkAdd);
navContainer.appendChild(spaceDiv);



/* ----------------------------------- */
/*               LISTE                 */
/* ----------------------------------- */

let listContainer = document.querySelector('#listContainer');

if (listContainer) {
  fetch(url, options)
    .then((res) => {
      if (res.ok) {

        return res.json();
      }
      return Promise.reject(res);
    })
    .then((response) => {
      response.forEach(personnageJson => {

        // Création du HTML pour chaques cartes personnages

        let personnage = new Personnage(personnageJson)

        let myPersonnage = document.createElement('section');
        myPersonnage.setAttribute('id', 'perso-section');
        let myTitle = document.createElement('h2');
        myTitle.innerText = `${personnage.nom} ${personnage.prenom}`;
        let divImage = document.createElement('div');
        divImage.setAttribute('class', 'divImage');
        let myImage = document.createElement('img');
        myImage.src = personnage.image;
        let myAlias = document.createElement('p');
        myAlias.innerHTML = `<strong>Alias :</strong> ${personnage.alias}`;
        let myAge = document.createElement('p');
        myAge.innerHTML = `<strong>Age :</strong> ${personnage.age} ans`;
        let myFruit = document.createElement('p');
        if (personnage.fruit == '') {
          myFruit.innerHTML = `<strong>Fruit Du Demon :</strong> Aucun`;
        }
        else {
          myFruit.innerHTML = `<strong>Fruit Du Demon :</strong> ${personnage.fruit}`;
        }

    // boutons

        let myBtnDiv = document.createElement('div');
        myBtnDiv.setAttribute('class', 'btnDiv')

        let myDetails = document.createElement('a');
        myDetails.setAttribute('href', `./details/${personnage.id}`);
        myDetails.setAttribute('class', 'a-details');
        myDetails.innerText = 'Détails';

        let myUpdate = document.createElement('a');
        myUpdate.setAttribute('href', `./updatePerso/${personnage.id}`);
        myUpdate.setAttribute('class', 'a-update');
        myUpdate.innerText = 'Modifier';

        let myDelete = document.createElement('a');
        myDelete.setAttribute('href', `/liste`);
        myDelete.setAttribute('id', `delete_btn`);
        myDelete.setAttribute('class', 'a-delete');
        myDelete.innerText = `Supprimer`;

        // Ajout du HTML au DOM

        listContainer.appendChild(myPersonnage);
        myPersonnage.appendChild(myTitle);
        myPersonnage.appendChild(divImage);
        divImage.appendChild(myImage);
        myPersonnage.appendChild(myAlias);
        myPersonnage.appendChild(myAge);
        myPersonnage.appendChild(myFruit);
        myPersonnage.appendChild(myBtnDiv);
        myBtnDiv.appendChild(myDetails);
        myBtnDiv.appendChild(myUpdate);
        myBtnDiv.appendChild(myDelete);

        /* ----------------------------------- */
        /*               DELETE                */
        /* ----------------------------------- */

        myDelete.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm(`Vous allez supprimer ${personnage.nom} ${personnage.prenom}.`)) {

            fetch('deletePerso/' + personnage.id, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                else {
                  return res.json();
                }
              })
              .then(() => {
                location.reload();
              })
              .catch((reason) => {
                console.log('err:', reason);
              });
          }

        });

      })
    })
    .catch((err) => {
      console.log('Error fetch /liste', err);
    });
};

/* ----------------------------------- */
/*               POST                  */
/* ----------------------------------- */

let add = document.querySelector('#add');

if (add) {
  add.addEventListener('click', () => {
    let personnage = new Personnage({})

    // Récupération des valeurs entrées par l'utilisateur

    personnage.image = document.querySelector(".add_image").value;
    personnage.nom = document.querySelector(".add_nom").value;
    personnage.prenom = document.querySelector(".add_prenom").value;
    personnage.alias = document.querySelector(".add_alias").value;
    personnage.age = document.querySelector(".add_age").value;
    personnage.fruit = document.querySelector(".add_fruit").value;

    // Verification format

    let alerteDiv = document.querySelector(".alerte-div");

    if (isNaN(personnage.age) || personnage.age < 1 || personnage.age > 1000) {
      let ageAlerte = "L'âge n'est pas valide";
      alerteDiv.style.visibility = "visible";
      alerteDiv.innerText = ageAlerte;
    } else {
      if (personnage.image == "" || personnage.prenom == "") {
        let emptyAlerte = "Le prénom et l'image ne peuvent pas être vide";
        alerteDiv.style.visibility = "visible";
        alerteDiv.innerText = emptyAlerte;
      } else {
        if (personnage.image.includes("http") == false && personnage.image.includes("https") == false) {
          let imageAlerte = "L'image doit être un lien internet";
          alerteDiv.style.visibility = "visible";
          alerteDiv.innerText = imageAlerte;
        } else {

          let options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(personnage)
          };

          fetch(url, options)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(res);
            })
            .then((response) => {
              window.location.href = '/liste';
              console.log(response);
            })
            .catch((err) => {
              console.log('Error fetch /liste', err);
            })
        }
      }
    }
  });
};

/* ----------------------------------- */
/*               UPDATE                */
/* ----------------------------------- */

let formContainer = document.querySelector("#update_form");

if (formContainer) {
  let myUpdateId = window.location.href.split('/')[4];

  fetch(`/perso/${myUpdateId}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((response) => {

// Préremplissage des inputs avec les valeurs du personnage dont l'id a été récupéré dans le lien

      let upId = response.id;
      let upImage = document.querySelector(".up_image");
      upImage.setAttribute('value', `${response.image}`);
      let upNom = document.querySelector(".up_nom");
      upNom.setAttribute('value', `${response.nom}`);
      let upPrenom = document.querySelector(".up_prenom");
      upPrenom.setAttribute('value', `${response.prenom}`);
      let upAlias = document.querySelector(".up_alias");
      upAlias.setAttribute('value', `${response.alias}`);
      let upAge = document.querySelector(".up_age");
      upAge.setAttribute('value', `${response.age}`);
      let upFruit = document.querySelector(".up_fruit");
      upFruit.setAttribute('value', `${response.fruit}`);

      let update = document.querySelector('#update');

      if (update) {
        update.addEventListener('click', () => {

          let personnage = new Personnage({})
          personnage.id = upId;
          personnage.image = upImage.value;
          personnage.nom = upNom.value;
          personnage.prenom = upPrenom.value;
          personnage.alias = upAlias.value;
          personnage.age = upAge.value;
          personnage.fruit = upFruit.value;

          // Vérification format

          let alerteDiv = document.querySelector(".alerte-div");

          if (isNaN(personnage.age) || personnage.age < 1 || personnage.age > 1000) {
            let ageAlerte = "L'âge n'est pas valide";
            alerteDiv.style.visibility = "visible";
            alerteDiv.innerText = ageAlerte;
          } else {
            if (personnage.image == "" || personnage.prenom == "") {
              let emptyAlerte = "Le prénom et l'image ne peuvent pas être vide";
              alerteDiv.style.visibility = "visible";
              alerteDiv.innerText = emptyAlerte;
            } else {
              if (personnage.image.includes("http") == false && personnage.image.includes("https") == false) {
                let imageAlerte = "L'image doit être un lien internet";
                alerteDiv.style.visibility = "visible";
                alerteDiv.innerText = imageAlerte;
              } else {

                let options = {
                  method: 'PUT',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  mode: 'cors',
                  cache: 'default',
                  body: JSON.stringify(personnage)
                };

                fetch(`/updatePerso/${myUpdateId}`, options)
                  .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    return Promise.reject(res);
                  })
                  .then((result) => {
                    console.log(result);
                    window.location.href = `/details/${response.id}`;
                  })
                  .catch((err) => {
                    console.log('Error fetch /liste', err);
                  })
              }
            }
          }
        });

      };

    });
}

/* ----------------------------------- */
/*               DETAILS               */
/* ----------------------------------- */

let detailsContainer = document.querySelector("#detailsContainer");

if (detailsContainer) {

  let myId = window.location.href.split('/')[4];

  fetch(`/perso/${myId}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((response) => {

      let personnage = new Personnage(response)

      let myH1 = document.querySelector('.details-h1');
      myH1.innerText = `${personnage.nom} ${personnage.prenom}`;
      let myPersonnage = document.createElement('section');
      myPersonnage.setAttribute('id', 'details-section');
      let divImage = document.createElement('div');
      divImage.setAttribute('class', 'divImage');
      let myImage = document.createElement('img');
      myImage.src = personnage.image;
      let myAlias = document.createElement('p');
      myAlias.innerHTML = `<strong>Alias :</strong> ${personnage.alias}`;
      let myAge = document.createElement('p');
      myAge.innerHTML = `<strong>Age :</strong> ${personnage.age} ans`;
      let myFruit = document.createElement('p');
      if (personnage.fruit == '') {
        myFruit.innerHTML = `<strong>Fruit Du Demon :</strong> Aucun`;
      }
      else {
        myFruit.innerHTML = `<strong>Fruit Du Demon :</strong> ${personnage.fruit}`;
      }

  //Boutons

      let myBtnDiv = document.createElement('div');
      myBtnDiv.setAttribute('class', 'btnDiv')

      let myUpdate = document.createElement('a');
      myUpdate.setAttribute('href', `../updatePerso/${personnage.id}`);
      myUpdate.setAttribute('class', 'a-update');
      myUpdate.innerText = 'Modifier';

      let myDelete = document.createElement('a');
      myDelete.setAttribute('href', `/liste`);
      myDelete.setAttribute('id', `delete_btn`);
      myDelete.setAttribute('class', 'a-delete');
      myDelete.innerText = `Supprimer`;

      detailsContainer.appendChild(myPersonnage);
      myPersonnage.appendChild(divImage);
      divImage.appendChild(myImage);
      myPersonnage.appendChild(myAlias);
      myPersonnage.appendChild(myAge);
      myPersonnage.appendChild(myFruit);
      myPersonnage.appendChild(myBtnDiv);
      myBtnDiv.appendChild(myUpdate);
      myBtnDiv.appendChild(myDelete);

      /* ----------------------------------- */
      /*               DELETE                */
      /* ----------------------------------- */

      myDelete.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.confirm(`Vous allez supprimer ${personnage.nom} ${personnage.prenom}.`)) {
          fetch('../deletePerso/' + personnage.id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              else {
                return res.json();
              }
            })
            .then(() => {
              window.location.href = `/liste`;
            })
            .catch((reason) => {
              console.log('err:', reason);
            });
        }
      });

    });
}