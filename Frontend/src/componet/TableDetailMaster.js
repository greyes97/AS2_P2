import React, { Component } from 'react'
import './tableDetail.css'
import {Button} from 'react-bootstrap'
import Axios from 'axios'
import Swal from 'sweetalert2';

class TableDetailMaster extends Component{

    constructor(props){
        super(props)
        this.state ={
            dataDetailM : this.props.dataDetailM,
            dataStateDelete: null,
        }
    }

    /**Metodo Delete Axios 
     * Elimina el articulo de la venta
    */
    peticionDelete= async (data)=>{

        this.props.totalNew( 0 - data.totalSale)
        await Axios.delete('http://localhost:7001/AS2_P2/api/detailMaster?key='+data.idSale+'&idSaleDetail='+data.idSaleDetail).then(resp =>{
            this.setState({ dataDetailM: resp.data})
            console.log(resp)
        }).catch(error=>{
            console.log(error)
        })
    }

    /**Alert */
    alertConfirma=(data)=>{
        Swal.fire({
            title: 'Esta seguro que desea eliminar este producto de la venta?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((resp)=>{
            if(resp.isConfirmed){
                Swal.fire('Saved! se ha eliminado correctamente el articulo', '', 'success')
                this.peticionDelete(data)
            }else if(resp.isDenied){
                Swal.fire('No se ha eliminado', '', 'info')
            }
        })
    }


    alertSuccess=()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha eliminado tu artículo de la venta',
            showConfirmButton: false,
            timer: 1500
        })
    }


    render(){
        return(
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataDetailM.map(sale =>(
                            <tr key={sale.idSaleDetail}>
                                <td>{sale.article}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.price}</td>
                                <td>{sale.totalSale}</td>
                                <td><Button variant="outline-danger" onClick={()=>this.alertConfirma(sale)}>Delete</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr style={{color: "#0056b2"}} />
                <div className="optionButton">
                <Button variant="outline-primary" onClick={()=>this.props.upd()}>Guardar</Button>{' '}
                <Button variant="outline-danger" onClick={()=>this.props.cancel()}>Cancelar</Button>{' '}
                </div>
            </div>
        )
    }
}

export default TableDetailMaster;