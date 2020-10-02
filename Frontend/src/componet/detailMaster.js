import React from 'react'
import { useParams } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,CardHeader,
    CardTitle, CardSubtitle, Button,Jumbotron
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './detailMaster.css'
import axios from 'axios';

const DetailMaster = (props) => {
    let key = useParams();
    console.log(key)

    let peticionGet = async ()=>{
      await axios.get('http://localhost:7001/AS2_P2/api/sales',key).then(resp =>{
        console.log(resp)
      }).catch(error =>{
        console.log(error)
      })
    }

    return(
      <div id="headMaster">
        <Card>
          <CardHeader id="colorAll">Master</CardHeader>
          <CardBody id="cardBody">
          <div className="cardBody">
            <p>Por favor ingresa la informacion del cliente para generar una nueva venta.</p>
          </div>
          <div className="row">
            <div className="areaCustomer">
              <div className="col-md-6 borderCustomer">
                <div className="form-group">
                  <label htmlFor="">Customer</label>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Name customer"/>
                    <span className="input-group-addon">-</span>
                    <input type="text" className="form-control" placeholder="NIT"/>
                  </div>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Address"/>
                    <span className="input-group-addon">-</span>
                    <input type="text" className="form-control" placeholder="Date" disabled/>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Cashier</label>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Full Name" disabled/>
                    <span className="input-group-addon">-</span>
                    <input type="text" className="form-control" placeholder="Sur Name" disabled/>
                  </div>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="User name" disabled/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnMaster">
            <input type="button" onClick={()=>peticionGet()} value="Generar Venta" className="btn btn-outline-info"/>
          </div>
          </CardBody>
          <CardHeader id="cardBodDetail">Detail Master</CardHeader>
        </Card>
      </div>
    )
}
export default DetailMaster