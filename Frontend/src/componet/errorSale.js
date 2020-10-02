import React, {useState} from 'react'
import { Alert } from 'reactstrap';

const ErrorSale = (props) =>{
  const [visible, setVisible] = useState(props.error);

  const onDismiss = () => setVisible(false);
  console.log(visible)
    return(
       <Alert color="danger" isOpen={visible} toggle={onDismiss}>
     Error! No se ha ingresado un campo, por favor itentelo de nuevo.
    </Alert>
    )
}

export default ErrorSale;