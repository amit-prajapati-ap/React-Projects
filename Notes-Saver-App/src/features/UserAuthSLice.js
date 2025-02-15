import { createSlice, nanoid } from '@reduxjs/toolkit'
import { app } from '../firebase/firebase'
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

const auth = getAuth(app)
const googeProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const initialState = {
    user: [
        {
            name: 'Amit',
            email: 'xyz@gmail.com',
            profile: 'image',
            password: '1234',
            isLogged: false,
            id: nanoid
        }
    ]
}

const signInEmail = async (state, actions) => {
    const user = actions.payload
    await signInWithEmailAndPassword(auth, user.email, user.password)
        .then(value => console.log(value))
        .catch(err => console.log(err))
    console.log("Sign in With Email and Password")
}

const signInGoogle = async (state) => {
    await signInWithPopup(auth, googeProvider)
    console.log("Sign in With Google")
}

const signInGithub = async (state) => {
    await signInWithPopup(auth, githubProvider)
    console.log("Sign in With Github")
}

const signUp = (state, actions) => {
    const userInfo = actions.payload
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    console.log("Sign up With Email and Password")
}

const signOut = async () => {
    await signOut(auth)
    console.log("Sign Out")
}

const deleteUser = async (state) => {
    if (auth.currentUser) {
        try {
            await deleteUser(auth.currentUser)
        } catch (error) {
            console.log(error)
        }
        console.log("Delete user")
    }
}

const loggedIn = (state) => {
    try {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("Logged")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const UserAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SignInGoogle: signInGoogle,
        SignInEmail: signInEmail,
        SignInGithub: signInGithub,
        SignUp: signUp,
        SignOut: signOut,
        DeleteUser: deleteUser,
        LoggedIn: loggedIn
    }
})

export const { SignInGoogle, SignInEmail, SignInGithub, SignOut, SignUp, DeleteUser, LoggedIn } = UserAuthSlice.actions

export default UserAuthSlice.reducer