import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    isAdmin: 0,
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
})

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') ?? null)
    const [authRole, setAuthRole] = useState(localStorage.getItem('isAdmin') ?? false);

    function authenticate(token, admin) {
        setAuthToken(token)
        setAuthRole(admin)
        localStorage.setItem('token', token)
        localStorage.setItem('isAdmin', admin)
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