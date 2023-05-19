import { ref, set, get, push, update, remove } from "firebase/database";
import { database } from "../firebase.config";

export const writeDB = async (path: string, body: any) => {
  try {
    const reference = ref(database, path);
    const snapshot = await get(reference);
    const origin = await snapshot.val();
    const newData = origin ? [...origin, body] : [body];
    set(ref(database, `${path}`), newData);

    return body;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const readDB = async (path: string) => {
  try {
    const reference = ref(database, path);
    const snapshot = await get(reference);
    if (!snapshot.exists()) {
      console.log("No data available");
      return;
    }
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const updateDB = async (path: string, newData: object) => {
  try {
    set(ref(database, `${path}`), newData);
  } catch (error) {
    console.log(error);
  }
  return null;
};

// export const deleteDB = ({ url, slash, params, body }: any) => {
//   return remove(url);
// };
