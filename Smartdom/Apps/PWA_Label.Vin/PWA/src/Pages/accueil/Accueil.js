import React, {Component} from 'react';
import "react-multi-carousel/lib/styles.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import BottomBar from '../../Components/BottomBar/BottomBar'
import "./style.css"
import TopBar from "../../Components/TopBar/TopBar";
import Routes from "../routes/routes";
import { navigateTo } from '../routes/history';
import moment from "moment";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

class Accueil extends Component {


    constructor(props) {
        super(props);

    }

    state={
        selectedPage:"",
        cart_items:0
    }

    componentDidMount() {
        localStorage.setItem('phone',"+21655836736")

        let path_array = this.props.location.pathname.split("/")
        let current = path_array[path_array.length -1]
        let cart = localStorage.getItem('cart')
        let cart_items = 0;
        if (cart !== null && cart !== undefined) {
            let data = JSON.parse(cart)
            cart_items = data.length;
        }
        this.setState({cart_items:cart_items,
            selectedPage:current === "categories" ? 0 : current === "cart" ? 1 : current === "profil" ? 2 : current === "rooms" ? 3 : 0})
        navigateTo(
            current === "categories" ? "/home/categories" :
                current === "cart" ? "/home/cart" :
                    current === "profil" ? "/home/profil" :
                        current === "rooms" ? "/home/rooms" : "/home/categories")

    }

    render() {



        return (
            <>
                <TopBar height={50} logo={require("../../assets/logos/label.vin_logo.jpeg")} />

                <Routes cart={this.state.cart_items} onAddToCart={(i) => {this.setState({cart_items:i})}}
                        onClearPanier={() => {this.setState({cart_items:0})}}
                />

                {
                    this.state.selectedPage !== "" &&
                    <BottomBar selectedPage={this.state.selectedPage}  phone={localStorage.getItem("phone")} email={localStorage.getItem("email")}
                               cart={this.state.cart_items.toString()}
                               onNavigate={(item) => {
                                   navigateTo(
                                       item === 0 ? "/home/categories" :
                                           item === 1 ? "/home/cart" :
                                               item === 2 ? "/home/profil" :
                                                   item === 3 ? "/home/rooms" : "/home/categories"
                        )}}/>
                }
            </>
        );
    }
}

export default Accueil;
