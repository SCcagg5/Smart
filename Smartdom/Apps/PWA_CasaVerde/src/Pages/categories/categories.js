import React,{useEffect} from "react";
import WooService from "../../provider/wooService";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import { navigateTo } from '../routes/history';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import Data from "../../data/Data";
import 'swiper/swiper.scss';

export default function Categories(props){
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


    const [loading, setLoading] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const [all_categories, setAll_Categories] = React.useState([]);

    useEffect(() => {
        getCategories()
    }, []);



    const  getCategories = async () => {
        setLoading(true)
        let data = []
        await WooService.getCategoriesV2().then((res) => {
            console.log(res)
            if (Array.isArray(res.data)) {
                (res.data || []).map(async (item, key) => {
                    if (item.parent === 0 && item.slug !== "non-classe") {
                        await WooService.getProductByCat(parseInt(item.id)).then((res2) => {
                            console.log(res2)
                            if (res2) {


                                item.products = res2.data
                                // this.setState({allcategories:allcat,souscategories:data,loading:false,loadingProd:false,products:products})
                            }

                        })
                        data.push(item)


                    }
                })
                setCategories(data)
                setTimeout(
                    () => setLoading(false),
                    3000
                );

                console.log(data)
                //setAll_Categories(all_categories)

                // setLoading(false)
            }
        })
    }


    return(
        <div>
            <MuiBackdrop open={loading}/>
            {loading===false&&
            <div style={{marginTop: 90, padding: 20, minHeight: "100vh"}}>
                <h5>
                    Catégories
                </h5>
                <div >
                    {
                        (categories ).map((item, key) => (
                            <div className="col-12 p-1">

                                <h2>{item.name}</h2>
                                { item.products.length>0?
                                    <div >
                                    <Swiper
                                        key={key}
                                        spaceBetween={30}
                                        slidesPerView={2}
                                        navigation
                                        pagination={{clickable: true}}

                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                    >
                                        {item.products.map((item2, key) =>
                                            (
                                                <SwiperSlide key={key}>
                                                    <div onClick={() => {
                                                        navigateTo('/home/product/' + item2.id)
                                                    }} className="card cardShadow"
                                                         style={{width: "100%", borderRadius: 10, marginBottom: 12}}>
                                                        <img className="card-img-top"
                                                             src={item2.images ? item2.images[0].src : ""} style={{
                                                            borderTopRightRadius: 10,
                                                            WebkitBorderTopLeftRadius: 10
                                                        }} alt="Card image cap"/>
                                                        <div className="card-body"
                                                             style={{padding: "0.5rem", minHeight: 61}}>
                                                            <div style={{fontWeight: 700}}
                                                                 className="text-center"> {item2.name} </div>

                                                            <div
                                                                className="row align-items-center justify-content-between mt-2">
                                                                <div className="col-6">
                                                                    <h5>{item2.price + "€"}  </h5>
                                                                </div>
                                                                <div className="col-3 ">
                                                                    <div className='ml-auto'>
                                                                        <div style={{
                                                                            borderRadius: 1000,
                                                                            height: 40,
                                                                            width: 40,
                                                                            position: "relative",
                                                                            borderWidth: 1,
                                                                            backgroundColor: Data.primary_color,
                                                                        }}>
                                                                            <text style={{
                                                                                fontSize: 25,
                                                                                position: "absolute",
                                                                                left: 12,
                                                                                bottom: 1,
                                                                                color: "white"
                                                                            }}>+
                                                                            </text>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>

                                            ))
                                        }

                                    </Swiper>
                                    </div>
                                :null}
                            </div>
                        ))
                    }
                </div>
            </div>
            }

        </div>
    )

}
