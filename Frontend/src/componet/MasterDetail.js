import React, { Component } from 'react'
import {InputGroup,FormControl, Button} from 'react-bootstrap'
import {CardBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './masterDetail.css'
import TableDetailMaster from './TableDetailMaster'
import Axios from 'axios';
import Swal from 'sweetalert2';


class MasterDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            dataMaster: this.props.dataM,
            priceDetail: 0,
            count:1,
            countPrice:0,
            dataPostState: null,
            stateButton: true,
            stateTable: false,
            dataArticle: null,
            stateButtonCancel:true
        }
        this.articles =  this.state.dataMaster.articles.map( article =>article)
    }
    price = React.createRef();
    quantity = React.createRef();

    /**
     * Busca por medio del ID el articulo en el Array
     */
    
    getPriceArticle= ()=>{
        let article = this.articles.find(price => price.idArticle === parseInt(this.price.current.value))
        this.setState({priceDetail: parseInt(article.price)})
        this.setState({countPrice: parseInt(article.price)})
        this.setState({count:1})
        this.setState({stateButton : false})

    }

    /**
     * Contadores de cantidad y precio
     */

    countArticle= ()=>{
        this.setState({count: this.state.count + 1 },()=>{
            this.setState({countPrice : this.state.count * this.state.priceDetail})
        })
       
    }
    restArticle = ()=>{
        if(this.state.count > 1){
            this.setState({count: this.state.count - 1 },()=>{
                this.setState({countPrice: this.state.count * this.state.priceDetail})
            })
        }
    }


    /**Metodo GET,POST AXIOS 
     * Get Verifica si hay stok 
     * Post registra el articulo a la venta
    */ 

    peticionGet = async ()=>{
        await Axios.get('http://localhost:7001/AS2_P2/api/detailMaster?idArticle='+this.price.current.value).then(resp=>{
            this.setState({dataArticle: resp.data})
        }).then(()=>{
            if(this.state.count <= this.state.dataArticle.stok){
                this.peticionPost()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Sin stok!',
                    html: 'Articulo: <strong>'+this.state.dataArticle.name+'</strong><div>Unidades disponibles: <strong>'+this.state.dataArticle.stok+'</strong></div>'
                  })
            }
        }).catch(error=>{
            console.log(error)
        })
    }


    peticionPost= async () =>{
        let dataDetailMaster={
            idSale: this.state.dataMaster.sale.idSale,
            idArticle: this.price.current.value,
            quantity: this.state.count,
            totalSale: this.state.countPrice
        }
        this.setState({stateButton: true})
        await Axios.post('http://localhost:7001/AS2_P2/api/detailMaster',dataDetailMaster).then(resp =>{
            this.setState({dataPostState: resp.data})
            this.setState({stateTable:false})
        }).then(()=>{
            let sales = this.state.dataPostState.map(sale => sale.idSale);
            sales.map(sale => {
                if(sale === this.state.dataMaster.sale.idSale){
                    console.log("venta verificada")
                }else{
                    this.setState({stateTable:false})
                    console.log("error no coinciden la key de la venta")
                }
            })
        }).then(()=>{
            this.setState({stateButtonCancel:false})
            this.alertConfirma()
            this.setState({stateButton: false})
            this.setState({stateTable:true})
            this.props.totalS(this.state.countPrice)
        }).catch(error=>{
            console.log(error)
        })
    }

    

    /**Alert */
    alertConfirma=()=>{
        Swal.fire({
            title: "Successful sale",
            imageUrl: "https://assets.website-files.com/5ba55685ff818b6009217323/5bad3d1ff688c1d33abb418c_Hunter-Design-ebay-cart.gif",
            imageWidth: 100,
            imageHeight: 100,
            timer: "2000",
            background: '#f2f0f0'
        })
    }
    render(){
        return(
        <CardBody id="cardBodyy">
            <div className="detailMaster">
                <div className="breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="">Article</label>
                                <div className="input-group">
                                    <select className="form-control form-control-sm" defaultValue="Article" id="article" ref={this.price} onChange={this.getPriceArticle}>
                                        <option disabled>Article</option>
                                        {this.articles.map(article =>
                                            <option key={article.idArticle} value={article.idArticle}>{article.name}</option>
                                             )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Quantity</label>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button variant="outline-danger" onClick={this.restArticle}>-</Button>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="1" ref={this.quantity} aria-label="1" disabled value={this.state.count}/>
                                        <InputGroup.Append>
                                        <Button variant="outline-success" onClick={this.countArticle}>+</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Price</label>
                                <div className="input-group">
                                    <input className="form-control form-control-sm" value={"Q. "+this.state.priceDetail+".00"} type="text" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Total</label>
                                <div className="input-group">
                                    <input className="form-control form-control-sm" value={"Q. "+this.state.countPrice+".00"} type="text" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <div className="form-group buttonAdd">
                                <label htmlFor=""></label>
                                <div className="input-group">
                                    <button type="button" onClick={this.peticionGet} disabled={this.state.stateButton} className="btn btn-success">
                                    <li>BUY<svg  width="1em" height="1em" viewBox="0 0 16 16" className="iconButton bi bi-bag-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5.5 3.5a2.5 2.5 0 0 1 5 0V4h-5v-.5zm6 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
                                        </svg>
                                    </li>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <hr style={{color: "#0056b2"}} />
            <div className="buttonCancel">
                {this.state.stateButtonCancel? <Button variant="outline-danger" onClick={()=>this.props.cancelar()}>Cancelar</Button>:""}
            </div>
            {this.state.stateTable ? <TableDetailMaster dataDetailM={this.state.dataPostState} totalNew = {this.props.totalS} cancel={this.props.cancelar} upd={this.props.update}/>:""}

        </CardBody>
        )
    }

}

export default MasterDetail;