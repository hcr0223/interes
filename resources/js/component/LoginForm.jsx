import { Component } from "react";
import { AuthContext } from "../store/auth-context";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal)

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginData: {
                email: '',
                password: ''
            },
        }
    }

    static contextType = AuthContext

    sendData = () => {
        axios.post(`/api/login`, this.state.loginData)
        .then(res => {
            this.context.authenticate(res.data.token, res.data.user.admin)
        })
        .catch(err => {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.message
            })
        })
    }

    render = () => (
        <>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-4">
                        <div className="card-header">Inicio de Sesión</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" name="email" id="email" className="form-control" value={this.state.loginData.email} onChange={(e) => this.setState({loginData: { ...this.state.loginData, email: e.target.value }})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.loginData.password} onChange={(e) => this.setState({ loginData: { ...this.state.loginData, password: e.target.value } })} />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-info me-2" onClick={() => this.props.cambiarRegistro()}>Registrar</button>
                                <button className="btn btn-primary" onClick={() => this.sendData()}>Iniciar Sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login