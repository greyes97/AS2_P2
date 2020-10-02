import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Master from './componet/Master'
import Login from './componet/Login'
import Sales from './componet/Sales'

const Routes = () =>{
    return(
        <Route>
            <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/DetailMaster/:key" component={Master}/>
            <Route path="/Sales/:key" component={Sales} />
            </Switch>
        </Route>
    )
}

export default Routes;