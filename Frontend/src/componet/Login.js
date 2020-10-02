import React, { Component } from 'react'
import axios from 'axios';
import '../componet/login.css'
import 'bootstrap/dist/css/bootstrapReact.min.css'
import ErrorLog from './errorLogin';
import { CommonLoading } from 'react-loadingg';



class Login extends Component {

    constructor(props){
        super(props);
        this.loginState={
            login : false,
            dataItem:[],
            loading:false,
            formLoad:false
        };
    }

    /**Evento submit
     * 
     */
    handleSubmit = e =>{
        e.preventDefault();
        this.peticionPost()
    }


    gmail = React.createRef();
    pass = React.createRef();

    sendDatos = [];
    datosApi = [];
    datos = (e) =>{
        this.sendDatos = {
            gmail: this.gmail.current.value,
            password: this.pass.current.value
        }
    }

    /**Metodo POST AXIOS
     * Verificacion de credenciales de usuarios
     */

    peticionPost = async ()=>{
        this.datos();
        await axios.post('http://localhost:7001/AS2_P2/api/login',this.sendDatos).then(response =>{
            this.setState(()=>this.loginState.dataItem  = response.data)
            if(this.loginState.dataItem.idUser === 0){
                this.setState(()=>this.loginState.login = true)
                console.log("error")
                
            }else{
                this.setState(()=>this.loginState.login = false)
                this.setState(()=>this.loginState.loading = true)
                this.setState(()=>this.loginState.formLoad = true)
                this.props.history.push('/DetailMaster/'+this.loginState.dataItem.key)
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className="loginApp fadeInDown">
                <div className="container" id="container">
                        <form id="formContainer" onSubmit={this.handleSubmit}>
                        <h1 className="titleLogin">Login</h1>
                        <div className="social-container">
                            <a href="www.google.com" className="aa"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-type-bold" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                            </svg></a>
                            <a href="www.google.com" className="aa"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-shield-lock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill="evenodd" d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z"/>
                            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                            </svg></a>
                        </div>
                        <span>Usa tu cuenta</span>
                        <div id="inputContainer">
                        <input type="email" ref={this.gmail} className="form-control" placeholder="Email" required />
                        <input type="password"  ref={this.pass} className="form-control" placeholder="Password" required />
                        </div>
                        <a href="www.google.com" className="aa">Forgot your password?</a>
                        <button className="btn btn-outline-warning" type="submit">Log In</button>
                        {this.loginState.loading ? <CommonLoading/>:""}
                        <div id="loginError">
                            {this.loginState.login ?<ErrorLog state={this.loginState.login}/>:""  }
                        </div>
                    </form>
                    
            </div>
            </div>)
    }
   
}

export default Login;