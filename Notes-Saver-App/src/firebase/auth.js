import { app } from './firebaseConfig'
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, reload, deleteUser, sendPasswordResetEmail, verifyBeforeUpdateEmail, updateProfile, signOut } from 'firebase/auth'


class AuthService {
    auth;
    googleProvider;
    githubProvider;
    currentUser;
    constructor() {
        this.auth = getAuth(app)
        this.googleProvider = new GoogleAuthProvider();
        this.githubProvider = new GithubAuthProvider();
        this.currentUser = undefined;
    }

    //Returns a promise
    Signup = async ({ email, password, name }) => {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            this.changeProfile(name);
            this.Logout();
            return true;
        } catch (error) {
            console.log("Firebase :: Signup :: Error :", error);
            return false;
        }
    }

    //Returns a promise
    LoginEmailAndPassword = async ({ email, password }) => {

        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            return this.getCurrentUser();
        } catch (error) {
            console.log("Firebase :: LoginEmailAndPassword :: Error :", error);
            return null;
        }
    }

    //Returns a promise
    LoginGoogle = async () => {
        try {
            await signInWithPopup(this.auth, this.googleProvider);
            return this.getCurrentUser();
        } catch (error) {
            console.log('Firebase :: LoginGoogle :: Error :', error);
            return null;
        }
    }

    //Returns a promise
    LoginGithub = async () => {
        try {
            await signInWithPopup(this.auth, this.githubProvider);
            return this.getCurrentUser();
        } catch (error) {
            console.log('Firebase :: LoginGithub :: Error :', error);
            return null;
        }
    }

    //Return a promise
    Logout = async () => {
        try {
            await signOut(this.auth);
            return true;
        } catch (error) {
            console.log("Firebase :: Logout :: Error :", error);
            return false;
        }
    }

    //Returns a Object
    getCurrentUser = () => {
        const user = this.auth.currentUser;
        if (user !== null) {
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            return { displayName, email, photoURL, emailVerified, uid };
        }
        else {
            return null;
        }
    }

    //Returns a promise
    emailVerification = async () => {
        try {
            await sendEmailVerification(this.auth.currentUser);
            const isVerified = await this.waitForEmailVerification();
            if (isVerified) {
                return this.getCurrentUser();
            } else {
                return null;
            }
        } catch (error) {
            console.log("Firebase :: emailVerification :: Error :", error);
            return null;
        }
    }

    waitForEmailVerification = async () => {
        return new Promise((resolve) => {
            const checkVerification = async (user) => {
                if (user) {
                    await reload(user); // Refresh user data from Firebase
                    if (user.emailVerified) {
                        resolve(true);
                    } else {
                        setTimeout(() => checkVerification(user), 5000); // Retry after 5 seconds
                    }
                } else {
                    resolve(false); // No user logged in
                }
            };

            onAuthStateChanged(this.auth, (user) => {
                checkVerification(user);
            });
        });
    }

    //Returns a promise
    deleteUser = async () => {
        try {
            await deleteUser(this.auth.currentUser);
            return true;
        } catch (error) {
            console.log('Firebase :: deleteUser :: Error :', error);
            return false;
        }
    }

    //Returns a promise
    changePassword = async ({ email }) => {
        try {
            await sendPasswordResetEmail(this.auth, email);
            return true;
        } catch (error) {
            console.log('Firebase :: changePassword :: Error :', error);
            return false;
        }
    }

    //Returns a promise
    changeEmail = async (newEmail) => {
        try {
            await verifyBeforeUpdateEmail(this.auth.currentUser, newEmail);
            this.Logout();
            return true;
        } catch (error) {
            console.log("Firebase :: changeEmail :: Error :", error);
            return false;
        }
    }

    //Returns a promise
    changeProfile = async (displayName, photoURL) => {
        try {
            const user = this.auth.currentUser;

            displayName = displayName || user.displayName;
            photoURL = photoURL || user.photoURL;

            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL
            });

            return this.getCurrentUser();
        } catch (error) {
            console.log("Firebase :: changeProfile :: Error :", error);
            return null;
        }
    }
}


export const authService = new AuthService();