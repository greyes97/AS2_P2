import React, { Component} from 'react'
import {Card, CardBody,CardHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './master.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert'
import DetailMaster from './MasterDetail'
import $ from 'jquery'
import Navigation from './Navigation'
import ReactDOM from 'react-dom'
import { CommonLoading } from 'react-loadingg';




 class Master extends Component{
  constructor(props){
    super(props)
    this.state ={
      dataStateGet : [],
      dataStatePos: [],
      stateDataGet : false,
      date : new Date(),
      stateButton : false,
      stateDate : false,
      errorSa: false,
      stateEfec: false,
      stateTotal: 0,
      dataDeleteState: false,
      dataPutState: null,
      loading: false
    };
    const { match: { params } } = this.props;
    this.peticionGet(params.key)
  }

  componentDidMount() {
    document.title = "DetailMaster";
    }


  
  /** ref que capturan el valor del input */
  cust = React.createRef();
  nit =React.createRef();
  dateS = React.createRef();
  addre = React.createRef();
  numberSale = uuidv4();


  /**Metodo GET,POST,DELETE axios
   * Get verifica el usuario de nuevo
   * Post guarda Master en la base de datos
   * Put actualiza el valor del total de la venta
   * Delete elimina la venta
   */

   /**Get */
  peticionGet = async (dato)=>{
    await axios.get('http://localhost:7001/AS2_P2/api/sales?key='+dato).then(resp =>{
      this.setState(()=>this.state.dataStateGet = resp.data)
      console.log(this.state.dataStateGet)
      if(this.state.dataStateGet.idUser > 0){
        this.setState(()=>this.state.stateDataGet = true)
        this.controlDate(true)
      }
    }).then(()=>{
       ReactDOM.render(
          <Navigation dataM={this.state.dataStateGet} stateButton={false}/>, document.getElementById('Nav')
        )
    }).then(()=>{
      this.setState({loading:true})
    }).catch(error =>{
      console.log(error)
    })
  }

  /**Post */
  peticionPost = async (datos)=>{
    await axios.post('http://localhost:7001/AS2_P2/api/sales',datos).then(resp =>{
      this.setState({dataStatePos : resp.data})
      this.setState({stateButton: true})
      this.ocultar()
    }).catch(error =>{
      console.log(error)
    })
  }

  /**Put*/
  peticionPut=async()=>{
    let dataSale={
        idSale: this.numberSale,
        saleTotal: this.state.stateTotal
    }
    console.log(dataSale.saleTotal)
    await axios.put('http://localhost:7001/AS2_P2/api/sales',dataSale).then(resp=>{
      this.setState({dataPutState : resp.data});
    }).then(()=>{
      if(this.numberSale === this.state.dataPutState.idSale){
        window.location.reload(false)
      }else{
        console.log("error"+this.state.dataPutState)
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  /**Delete */
  peticionDelete=()=>{
    swal({
      title:"Verificación",
      text: "Esta seguro que quiere cancelar la venta?",
      icon: "warning",
      buttons: ["No","Si"],
    }).then(resp =>{
      if(resp){
        axios.delete('http://localhost:7001/AS2_P2/api/sales?idSale='+this.numberSale).then(resp =>{
        this.setState({dataDeleteState: resp.data})
        console.log(this.numberSale)
        console.log(resp.data)
    }).then(()=>{
        if(this.state.dataDeleteState === true){
            swal({
                text:"Se ha eliminado exitosamente la venta",
                icon:"success",
                timer: 2000
              }).then(()=>{
                this.mostrar()
                this.setState({stateButton:false})
                this.setState({stateTotal:0})
              })
        }else{
            swal({
                title:"Error",
                text: "Hubo un error al momento de eliminar la venta",
                icon: "error",
                timer: 2000
              })
        }
    }).catch(error=>{
        console.log(error)
    })}
  })
}


  /**Metodo para guardar la venta */
  dataSales= []
  generateSale = ()=>{
    this.dataSales ={
      idSale : this.numberSale,
      customer : this.cust.current.value,
      nitCustomer : this.nit.current.value,
      dateSale : new Date().toLocaleString() ,
      idUser : this.state.dataStateGet.idUser,
      addressCustomer : this.addre.current.value,
      totalSale: 0  
    }
    if(this.dataSales.customer === ""|| this.dataSales.nitCustomer===""||this.dataSales.addressCustomer === ""){
      this.alertError()
    }else{
      this.alertConfirmation(this.dataSales)
    }
  }

  /**Clock */
  tick=()=>{
    this.setState({date : new Date()})
  }
  inter = null;
  controlDate=(dato)=>{
    if(dato === true){
      console.log("Encendido")
      this.inter = setInterval(this.tick,1000)
    }else{
      console.log("apagado")
      clearInterval(this.inter)
    }
  }
  /**Alertas */
  alertConfirmation=(data)=>{
    swal({
      title:"Verificación",
      text: "Ha ingresado todos los datos del cliente correctamente? Cliente: "+this.cust.current.value+" NIT: "+this.nit.current.value+" Direccion: "+this.addre.current.value,
      icon: "warning",
      buttons: ["No","Si"],
    }).then(resp =>{
      if(resp){
        this.controlDate(false)
        this.peticionPost(data)
        /**this.setState({stateButton: true})*/
        swal({
          text:"Se ha generado correctamente la venta",
          icon:"success",
          timer: 2000
        })
      }
    })
  }

  confirSaveSale=()=>{
    swal({
      title:"Warning",
      text: "Esta seguro que quiere guardar y finalizar esta venta?",
      icon: "warning",
      buttons: ["No","Si"],
    }).then(resp=>{
      if(resp){
        this.peticionPut()
        swal({
          text:"Su venta se ha guardado exitosamente",
          icon:"success",
          timer: 2000
        })
      }
    })
  }

  alertError=()=>{
    swal({
      title:"Error",
      text: "No has ingresado los campos correspondientes",
      icon: "error",
      timer: 2000
    })
  }

  /**Ocultar */
  ocultar=()=>{
    $('#cardBody').toggle(500)
    this.setState({stateEfec:true})
  }
  mostrar=()=>{
    $('#cardBody').show(500)
    this.setState({stateEfec:false})
  }

  childrenCompon = (total)=>{
    console.log("state: " +this.state.stateTotal+" totalVenta: "+total)
    this.setState({stateTotal: total + this.state.stateTotal})
  }

  render(){
    return(
      <div id="headMaster">
        {this.state.loading?
      <Card>
      <CardHeader id="colorAll" onClick={this.state.stateEfec? this.ocultar:this.mostrar}>Master</CardHeader>
      <CardBody id="cardBody" className={this.state.stateButton ? "disabled": ""}>
      <div className="cardBody">
        <p>Por favor ingresa la informacion del cliente para generar una nueva venta.</p>
      </div>
      <div className="row">
        <div className="areaCustomer">
          <div className="col-md-9 borderCustomer">
            <div className="form-group">
              <label htmlFor="">Customer</label>
              <div className="input-group">
                <input type="text" ref={this.cust} className="form-control form-control-sm" placeholder="Name customer" disabled={this.state.stateButton}/>
                <span className="input-group-addon">-</span>
                <input type="text" ref={this.nit} className="form-control form-control-sm col-4" placeholder="NIT"  disabled={this.state.stateButton}/>
              </div>
              <div className="input-group">
                <input type="text" ref={this.addre}  className="form-control form-control-sm" placeholder="Address"  disabled={this.state.stateButton}/>
                <span className="input-group-addon">-</span>
                  <button type="text" ref={this.dateS} className="form-control form-control-sm" value={new Date()} placeholder="Date" disabled>{new Date().toLocaleDateString()} {this.state.date.toLocaleTimeString()}</button>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="form-group">
              <label htmlFor="">Cashier</label>
              <div className="input-group">
                <button type="button" className="form-control form-control-sm"  disabled>{this.state.dataStateGet.fullName}</button>
                <span className="input-group-addon">-</span>
                <button type="button" className="form-control form-control-sm" disabled>{this.state.dataStateGet.surName}</button>
              </div>
              <div className="input-group">
              <button type="button" className="form-control form-control-sm" disabled><strong>{this.state.dataStateGet.userName}</strong></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btnMaster">
        <input type="button" onClick={this.generateSale} value="Generar Venta" className="btn btn-outline-info"  disabled={this.state.stateButton}/>
      </div>
      </CardBody>
      <CardHeader id="cardBodDetail">Detail Master {this.state.stateButton ? <strong id="total">Total: Q. {this.state.stateTotal}.00</strong>:"" }</CardHeader>
      {this.state.stateButton ? <DetailMaster dataM = {this.state.dataStatePos /*this.dataSales*/} totalS={this.childrenCompon} cancelar={this.peticionDelete} keySale={this.numberSale} update={this.confirSaveSale}/>:""}
    </Card>:<CommonLoading/>  
      }
      </div>
    )
  }
}

export default Master;
