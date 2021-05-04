import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';
import Categories from "../categories/categories";
import Rooms from "../Rooms/Rooms";
import Chat from "../Chat/Chat";
import history from "./history"
import Profil from "../profil/profil";
import Panier from "../panier/panier3";
import Products from "../product/products";
import Product from "../product/product";
import Checkout from "../checkout/checkout";
import Etiquette from "../etiquette/etiquette";



export default function Routes(props) {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/home/categories" component={Categories}/>
                <Route exact path="/home/products/:catID" component={Products}/>

                <Route exact path="/home/product/:prodID">
                    <Product onAddToCart={props.onAddToCart} history={history}/>
                </Route>
                <Route exact path="/home/etiquette/:prodID/:quantity">
                    <Etiquette onAddToCart={props.onAddToCart} history={history}/>
                </Route>

                <Route exact path="/home/cart">
                        <Panier onClearPanier={props.onClearPanier} history={history}/>
                </Route>
                <Route exact path="/home/checkout" component={Checkout}/>
                <Route exact path="/home/profil" component={Profil}/>
                <Route exact path="/home/rooms" component={Rooms}/>

                <Route exact path="/home/chat" component={Chat}/>

            </Switch>
        </Router>
    );
}
