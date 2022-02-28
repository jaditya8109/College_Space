import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: {
        "_id": "62164c35b2d1cbd20e860a59",
        "username": "aditya",
        "email": "jaditya8109@gmail.com",
        "profilePicture": "person/2.jpeg",
        "coverPicture": "",
        "followers": [],
        "following": [],
        "isAdmin": false,
        "createdAt": "2022-02-23T15:01:09.191Z",
        "__v": 0,
        "city": "Bhopal",
        "desc": "This is Aditya's Profile",
        "from": "Vellore",
        "relationship": 2
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children} ) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{user:state.user,
         isFetching:state.isFetching,
          error:state.error,
           dispatch
        }} >

        {children}
        </AuthContext.Provider>
    )
}