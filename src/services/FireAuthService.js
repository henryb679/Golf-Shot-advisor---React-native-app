import { firebaseAuth } from '../../environment/config';

// Logout operator
export const logout = async () => {
    await firebaseAuth.signOut();
};

// Sign in operator
export const signIn = async(emailAddress, password) => {
    await firebaseAuth.signInWithEmailAndPassword(emailAddress, password);
};

// Register operator
export const register = async(emailAddress, password) => {
    await firebaseAuth.createUserWithEmailAndPassword(emailAddress, password);
}
