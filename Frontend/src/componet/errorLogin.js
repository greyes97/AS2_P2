import React, {useState} from 'react'
import { Alert } from 'reactstrap';

const ErrorLog = (props) =>{
  const [visible, setVisible] = useState(props.state);

  const onDismiss = () => setVisible(false);
    return(
       <Alert color="danger" isOpen={visible} toggle={onDismiss}>
     Error! No se ha encontrado usuario. Revisar gmail y/o contraseña.
    </Alert>
    )
}

export default ErrorLog;