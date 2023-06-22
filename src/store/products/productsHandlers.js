import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export async function fetchProductsFromFirebase() {
  let collectionRef = collection(db, 'categories');

  let response = await getDocs(collectionRef);
  let documents = response.docs;

  let data = documents.reduce((finalObj, document) => {
    let { title, items } = document.data();
    finalObj[title.toLowerCase()] = items;
    return finalObj;
  }, {});

  return data;
}