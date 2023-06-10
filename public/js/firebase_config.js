
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAD5psWwGwGav_gczFS6Tz74SSPMCuBkik",
    authDomain: "browser-project-4439b.firebaseapp.com",
    databaseURL: "https://browser-project-4439b-default-rtdb.firebaseio.com",
    projectId: "browser-project-4439b",
    storageBucket: "browser-project-4439b.appspot.com",
    messagingSenderId: "598143292243",
    appId: "1:598143292243:web:9edabaf13ef40e9e0547a6",
    measurementId: "G-9VSB5H0BT2"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();

  //console.log(db);

  //This is how we add data

  function addNewRecipe(name,dif,ingridientsArray,photoLink,timeItTakes,howToMakeit){

      db.collection("Recepies").add({
        recipeName: name,
        difficulty:dif,
        ingridients:ingridientsArray,
        recipePhoto:photoLink,
        time:timeItTakes,
        howToDo:howToMakeit
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

  }

  function addUser(userName,id){

    db.collection("Users").doc(id).set({
      name: userName
      })
      .then(() => {
          console.log("User successfully created!");
      })
      .catch((error) => {
          console.error("Error writing user: ", error);
      });
  }


  //This is how to retrieve information from Database
/*
  db.collection("Recepies").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(`${doc.get("recipeName")}`);
        console.log(`${doc.get("difficulty")}`);
        console.log(`${doc.get("howToDo")}`);
        console.log(doc.get("ingridients"));
        console.log(`${doc.get("time")}`);
      

        //console.log(doc.data());

        
    });
  });

*/