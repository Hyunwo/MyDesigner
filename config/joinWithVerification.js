import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

const joinWithVerification = async (email, password) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    alert(authMessage['auth/post-email-verification-mail']);
  } catch ({ code, message }) {
    alert(errorMessage[code]);
  }
};
export default joinWithVerification