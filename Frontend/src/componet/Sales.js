import React, { Component } from 'react'
import Navigation from './Navigation'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Table } from 'react-bootstrap';
import {Card, CardBody,CardHeader} from 'reactstrap';
import './sales.css'
import { CommonLoading } from 'react-loadingg';
import Swal from 'sweetalert2/src/sweetalert2'


class Sales extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSaleGet:null,
            statusUser: false,
            stateDataSale: [],
            loading:false,
            stateDataDetailM:[]
        }
        const { match: { params } } = this.props;
        this.peticionGet(params.key)
    }
    componentDidMount() {
        document.title = "Sales";
        }

    peticionGet = async (dato)=>{
        await axios.get('http://localhost:7001/AS2_P2/api/sales?key='+dato).then(resp =>{
          this.setState({dataSaleGet : resp.data})
          if(this.state.dataSaleGet.idUser > 0){
              this.setState({statusUser : true})
          }else{
              console.log("error")
          }
        }).then(()=>{
          if(this.state.statusUser){
            ReactDOM.render(
                <Navigation dataM={this.state.dataSaleGet} stateButton={this.state.statusUser}/>, document.getElementById('Nav')
              )
          }
          this.peticionGetSales()
        }).catch(error =>{
          console.log(error)
        })
      }

      peticionGetSales = async()=>{
          await axios.get('http://localhost:7001/AS2_P2/api/sales').then(resp=>{
              console.log(resp.data)
              this.setState({stateDataSale: resp.data})
          }).then(()=>{
              this.setState({loading:true})
          }).catch(error=>{
              console.log(error)
          })
      }

      peticionGetDetail=async(data)=>{
          await axios.get('http://localhost:7001/AS2_P2/api/detailMaster?keySale='+data.idSale).then(resp=>{
              console.log(resp.data)
              this.setState({stateDataDetailM: resp.data})
          }).then(()=>{
              console.log(this.state.stateDataDetailM)
              this.getValue(data)
          }).catch(error=>{
              console.log(error)
          })
      }

      /**Obtener Valor de tabla */
      getValue=(data)=>{
        Swal.fire({
            title:'<small>'+data.idSale+'</small>',
            width: 800,
            color: `fff`,
            padding: '3em',
            background: 'fff',
            backdrop: `
            rgb(0 0 0 / 47%)
            `,
            html:`
            <style>
            .swal2-content {
                z-index: 1;
                justify-content: center;
                margin: 0;
                padding: 0;
                color: #3a3a40;
                font-size: 1.125em;
                font-weight: 400;
                line-height: normal;
                text-align: center;
                word-wrap: break-word;
                lign-self: center;
                place-self: center;
            }
            </style>
            
            <div class="container">
                <div class="row" style="color: #3a3a40;">
                    <div className="col-xs-12 col-md-2">
                        <div className="form-group" style="margin-right: 15px;text-align-last: center;">
                            <label htmlFor="">Customer</label>
                            <div className="input-group">
                                <input style="color: #037a3f;" class="form-control btn" value=${data.customer} type="text" disabled/>
                            </div>
                            <label htmlFor="">Address</label>
                            <div className="input-group">
                                <input style="color: #037a3f;" class="form-control btn" value=${data.addressCustomer} type="text" disabled/>
                            </div>
                            <label htmlFor="">Nit</label>
                            <div className="input-group">
                                <input style="color: #037a3f;" class="form-control btn" value=${data.nitCustomer} type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-2">
                        <div className="form-group" style="margin-right: 15px;text-align-last: center;">
                            <label htmlFor="">Date</label>
                            <div className="input-group">
                                <input style="color: #037a3f;" class="form-control btn" value=${data.dateSale} type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-2">
                        <div className="form-group" style="margin-right: 15px;text-align-last: center;">
                            <label htmlFor="">Total Sale</label>
                            <div className="input-group">
                                <input style="color: #037a3f;" class="form-control btn" value=${data.saleTotal} type="text" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
                <table class="table">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sub-Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.state.stateDataDetailM.map(detail =>(`<tr key=${detail.idSaleDetail}>
                                    <th>${detail.article}</th>
                                    <th>${detail.quantity}</th>
                                    <th>${detail.price}</th>
                                    <th>${detail.totalSale}</th></tr>`))}
                        </tbody>
                    </table>
            </div>
            `
          })
          console.log(data)
      }


    render(){
        return(
            <div id="containerSale">
                {this.state.loading?
            <Card>
            <CardHeader>Sales list</CardHeader>
            <CardBody>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Customer</td>
                        <td>Nit</td>
                        <td>Address</td>
                        <td>Date</td>
                        <td>Cashier</td>
                        <td>Total Sale</td>
                    </tr>
                </thead>
                <tbody id="tableSales">
                    {this.state.stateDataSale.map(sale =>(
                        <tr key={sale.idSale} onClick={()=>this.peticionGetDetail(sale)}>
                            <td>{sale.idSale}</td>
                            <td>{sale.customer}</td>
                            <td>{sale.nitCustomer}</td>
                            <td>{sale.addressCustomer}</td>
                            <td>{sale.dateSale}</td>
                            <td>{sale.nameCashier}</td>
                            <td>Q.{sale.saleTotal}.00</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </CardBody>
        </Card>:<CommonLoading/> 
            }
            </div>  
        )
    }

}
export default Sales