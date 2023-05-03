import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  push,
  update,
  remove,
} from "firebase/database";

export const writeDB = ({ url, slash, params, body }: any) => {
  const db = getDatabase();
  set(ref(db, `${url}/${slash}`), params);

  return null;
};

export const readDB = ({ url, slash, params, body }: any) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `${url}/${slash}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateDB = ({ url, slash, params, body }: any) => {
  const db = getDatabase();

  // A post entry.
  const postData = body as object;

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), url)).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {
    [`/posts/${newPostKey}`]: postData,
  };

  return update(ref(db), updates);
};

export const deleteDB = ({ url, slash, params, body }: any) => {
  return remove(url);
};
