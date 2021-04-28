import React, {Component} from 'react';
import BottomBar from "../../Components/BottomBar/BottomBar";
import CajooService from "../../provider/cajooservice";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "./style.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import { navigateTo } from '../routes/history';

class Products extends Component {

    constructor(props){
        super(props)
        console.log("products")

        this.state={
            allcategories:[],
            souscategories:[],
            products:[],
            loading:true,
            loadingProd:true,
            selectedCat:""
        }
    }
    componentDidMount() {
        this.getCategories()
    }

    getCategories(){
        let data=[]
        let products=[]
        let allcat=[]
        console.log(this.props.match.params.catID)
        CajooService.getCategories().then((res)=>{
            if (res){
                allcat=res
                res.map((item,key)=>{
                    if (item.parent === parseInt(this.props.match.params.catID)){
                        data.push(item)
                    }
                })
                if (data.length===0){
                    CajooService.getProductByCat(parseInt(this.props.match.params.catID)).then((res2)=>{
                        if (res2){
                            console.log(data)
                            res2.data.map((item,key)=>{
                                if (item.status==="publish"){
                                    products.push(item)
                                }
                            })
                            this.setState({allcategories:allcat,souscategories:data,loading:false,loadingProd:false,products:products})
                        }
                    })
                }else {
                    CajooService.getProductByCat(data[0].id).then((res2)=>{
                        if (res2){
                            console.log(res2)
                            res2.data.map((item,key)=>{
                                if (item.status==="publish"){
                                    products.push(item)
                                }
                            })
                            this.setState({allcategories:allcat,souscategories:data,loading:false,loadingProd:false,selectedCat:data[0].name,products:products})
                        }
                    })
                }
            }
        })
    }

    onChangeSousCat(id,key){
        this.setState({loadingProd:true})
        let allCat=this.state.allcategories
        let sousCat = this.state.souscategories
        let selectedCat = sousCat[key].name
        this.setState({selectedCat:selectedCat})
        let products=[]
        CajooService.getProductByCat(id).then((res2)=>{
            if (res2){
                console.log(res2)
                res2.data.map((item,key)=>{
                    if (item.status==="publish"){
                        products.push(item)
                    }
                })
                this.setState({products:products,loadingProd:false})

            }

        })


    }

    render() {
        return (
            <div>
                <MuiBackdrop open={this.state.loading}/>
                <div style={{marginTop:75,padding:20,minHeight:"100vh"}}>
                        <h5>
                            Produits
                        </h5>
                        {
                            this.state.loading === false &&
                            <div className="mt-2">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                navigation
                                pagination={{ clickable: true }}

                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {this.state.souscategories.map((item,key)=>
                                    (
                                        <SwiperSlide onClick={()=>this.onChangeSousCat(item.id,key)}  className={item.name===this.state.selectedCat?"selectedcat":""}>{item.name}</SwiperSlide>

                                    ))
                                }

                            </Swiper>
                            {
                                this.state.loadingProd===false &&
                                <div className="row align-items-center p-1 mt-3">
                                    {
                                        this.state.products.map((item, key) => (
                                            <div onClick={()=>{navigateTo('/home/product/'+item.id)}} className="col-6 p-1">
                                                <div className="card cardShadow"
                                                    style={{width: "100%", borderRadius: 10}}>
                                                    <img className="card-img-top" src={item.images[0].src} style={{
                                                        borderTopRightRadius: 10,
                                                        WebkitBorderTopLeftRadius: 10,
                                                        maxHeight: 150
                                                    }} alt="Card image cap"/>
                                                    <div className="card-body" style={{padding:"0.5rem"}}>
                                                        <div className="text-center" style={{fontWeight:700,fontSize:13}}> {item.name}</div>
                                                        <div className="text-center" style={{fontWeight:700,fontSize:14,color:"#6EC1E4"}}> {item.price + "€"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {
                                this.state.loadingProd === true &&
                            <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "50vh"}}>
                            <CircularProgress color="secondary" />
                                </div>


                            }
                        </div>
                        }

                    </div>
            </div>
        );
    }
}

export default Products;
