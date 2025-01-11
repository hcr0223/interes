import { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registroData: {
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
            },
        }
    }

    sendData = () => {
        axios.post(`/api/registro`, this.state.registroData)
        .then(res => {
            MySwal.fire({
                icon:'success',
                title:'Éxito!',
                text:'Se ha registrado el usuario correctamente, puedes iniciar sesion'
            })
            this.props.cambiarRegistro()
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
                        <div className="card-header">Registro</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre:</label>
                                <input type="text" name="name" id="name" className="form-control" value={this.state.registroData.name} onChange={(e) => this.setState({ registroData: { ...this.state.registroData, name: e.target.value } })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" name="email" id="email" className="form-control" value={this.state.registroData.email} onChange={(e) => this.setState({registroData: { ...this.state.registroData, email: e.target.value }})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.registroData.password} onChange={(e) => this.setState({ registroData: { ...this.state.registroData, password: e.target.value } })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="form-label">Password:</label>
                                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" value={this.state.registroData.password_confirmation} onChange={(e) => this.setState({ registroData: { ...this.state.registroData, password_confirmation: e.target.value } })} />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-info me-2" onClick={() => this.props.cambiarRegistro()}>Inicia Sesión</button>
                                <button className="btn btn-primary" onClick={() => this.sendData()}>Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registro