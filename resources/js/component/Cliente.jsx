import { Component } from "react";
import { AuthContext } from "../store/auth-context";
import MyModal from "./MyModal";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MySwal = withReactContent(Swal)

class Client extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            clientModal: false,
            selectedClient: {},
            showClientModal: false
        }
    }

    getClients = () => {
        axios.post(`/api/get-clientes`, {}, {
            headers: {
                Authorization: `Bearer ${this.context.token}`
            }
        })
        .then(res => 
            this.setState({clients: res.data.clientes})
        )
        .catch(err => console.log(err))
    }

    modalStatus = () => {
        this.setState({ clientModal: !this.state.clientModal })
    }

    showClientData = (client) => {
        if (this.context.isAdmin) {
            this.setState({ showClientModal: true });
            this.setState({ selectedClient: client });
        } else {
            MySwal.fire({
                icon: 'warning',
                title: 'Alerta!',
                text: 'No eres administrador!'
            })
        }
    }

    handleFileUpload = (file) => {
        var form = new FormData
        form.append('archivo', file)
        axios.post(`/api/carga-clientes`, form, {
            headers: {
                Authorization: `Bearer ${this.context.token}`
            }
        })
        .then(res => {
            MySwal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Importación Exitosa!'
            })
            this.modalStatus()
        })
        .catch(err => {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text:'Ocurrio un error, intente mas tarde!'
            })
            this.modalStatus()
        })
    }

    static contextType = AuthContext

    componentDidMount(){
        this.getClients()
    }

    render = () => (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>Clientes</span>
                            {this.context.isAdmin === true && <button className="btn btn-sm btn-outline-dark" onClick={() => this.modalStatus()}><i className="bi bi-plus"></i></button>}
                        </div>
                        <div className="card-body">
                            <DataTable value={this.state.clients} rows={10} dataKey="id"  selectionMode="single" selection={this.state.selectedClient} onSelectionChange={(e) => this.showClientData(e.value)} paginator unstyled pt={{
                                root: 'table-responsive',
                                table: 'table table-striped table-bordered table-hover',
                                paginator: {
                                    root: 'pagination',
                                    firstPageButton: 'page-item page-link',
                                    prevPageButton: 'page-item page-link',
                                    pageButton: 'page-item page-link',
                                    nextPageButton: 'page-item page-link',
                                    lastPageButton: 'page-item page-link',
                                }
                            }}>
                                <Column field="id" header="ID"></Column>
                                <Column field="nombre" header="Nombre"></Column>
                                <Column field="paterno" header="A. Paterno"></Column>
                                <Column field="materno" header="A. Materno"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <MyModal modalTitle="Importar Clientes" show={this.state.clientModal} handleClose={() => this.modalStatus()} size="md">
                <FileUploader handleChange={this.handleFileUpload} label="Carga un Archivo CSV" name="file" types={['csv']} hoverTitle="Suelta Aqui!" />
            </MyModal>
            <MyModal modalTitle="Mostrar datos de Cliente" show={this.state.showClientModal} handleClose={() => this.setState({ showClientModal: !this.state.showClientModal })} size="lg" onExit={() => this.setState({ selectedClient: {} })}>
                <h2 className="text-center">Direcciones</h2>
                <DataTable value={this.state.selectedClient.direccion} dataKey="id" unstyled pt={{
                    root: 'table-responsive',
                    table: 'table table-striped table-bordered table-hover',
                    paginator: {
                        root: 'pagination',
                        firstPageButton: 'page-item page-link',
                        prevPageButton: 'page-item page-link',
                        pageButton: 'page-item page-link',
                        nextPageButton: 'page-item page-link',
                        lastPageButton: 'page-item page-link',
                    }
                }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="calle" header="Calle"></Column>
                    <Column field="numero_exterior" header="Numero Exterior"></Column>
                    <Column field="numero_interior" header="Numero Interior"></Column>
                    <Column field="colonia" header="Colonia"></Column>
                    <Column field="cp" header="Código Postal"></Column>
                </DataTable>
                <hr />
                <h2 className="text-center">Teléfonos</h2>
                <DataTable value={this.state.selectedClient.telefono} dataKey="id"  unstyled pt={{
                    root: 'table-responsive',
                    table: 'table table-striped table-bordered table-hover',
                    paginator: {
                        root: 'pagination',
                        firstPageButton: 'page-item page-link',
                        prevPageButton: 'page-item page-link',
                        pageButton: 'page-item page-link',
                        nextPageButton: 'page-item page-link',
                        lastPageButton: 'page-item page-link',
                    }
                }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="telefono" header="Teléfono"></Column>
                </DataTable>
            </MyModal>
        </>
    )

}

export default Client