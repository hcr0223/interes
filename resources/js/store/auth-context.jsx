import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    isAdmin:'',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
})

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') ?? null)
    const [authRole, setAuthRole] = useState(false);

    function authenticate(token, admin = false) {
        setAuthToken(token)
        setAuthRole(admin)
        localStorage.setItem('token', token)
    }

    function logout() {
        setAuthToken(null)
        localStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAdmin: authRole,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider