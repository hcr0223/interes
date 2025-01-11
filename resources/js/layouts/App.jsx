import { Component, useContext, useState } from "react"
import { AuthContext } from "../store/auth-context"
import Registro from "../component/RegistroForm";
import Login from "../component/LoginForm";
import Client from "../component/Cliente";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRegistro: false
        }
    }

    static contextType = AuthContext

    render = () => (
        <>
            {this.context.isAuthenticated ? <Client /> : (this.state.showRegistro) ? <Registro cambiarRegistro={()=>this.setState({ showRegistro: false })} /> : <Login cambiarRegistro={() => this.setState({showRegistro: true})} /> }
        </>
    )
}

export default App