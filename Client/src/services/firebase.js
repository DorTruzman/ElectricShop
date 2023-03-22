import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { userTypeNames } from "../userTypeNames";
import { createEntity, getEntities, getEntityById } from "./fetchService";

const firebaseConfig = {
  apiKey: "AIzaSyD4_3S9Oy7YxC2kVIzUKO48ozC82yyPeQg",
  authDomain: "electric-shop-5d569.firebaseapp.com",
  projectId: "electric-shop-5d569",
  storageBucket: "electric-shop-5d569.appspot.com",
  messagingSenderId: "95147020657",
  appId: "1:95147020657:web:2fbd219fae67dc56e4a6d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const getUserDisplayName = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const doc = await getDocs(q);
  const data = doc.docs[0].data();
  return data.name;
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });

      const userTypes = await getEntities({
        name: "userType",
      });

      const guestType = userTypes.find(
        (utype) => utype.type === userTypeNames.CUSTOMER
      );

      await createEntity({
        name: "user",
        entity: {
          username: user.uid,
          area: null,
          userType: guestType._id,
        },
      });
    }
  } catch (err) {
    throw err;
  }
};

const getUserType = async () => {
  if (!auth.currentUser || !auth.currentUser.uid) return null;

  const userEntity = await getEntityById({
    name: "user",
    id: auth.currentUser.uid,
  });

  return userEntity.type && userEntity.type.type;
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    const userTypes = await getEntities({
      name: "userType",
    });

    const guestType = userTypes.find(
      (utype) => utype.type === userTypeNames.CUSTOMER
    );

    await createEntity({
      name: "user",
      entity: {
        username: user.uid,
        area: null,
        userType: guestType._id,
      },
    });
  } catch (err) {
    throw err;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  getUserType,
  getUserDisplayName,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
