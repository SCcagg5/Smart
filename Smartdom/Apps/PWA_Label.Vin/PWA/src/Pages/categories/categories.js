import React,{useEffect} from "react";
import WooService from "../../provider/wooService";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import { navigateTo } from '../routes/history';

export default function Categories(props){

    const [loading, setLoading] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [all_categories, setAll_Categories] = React.useState([]);

    useEffect(() => {
        getCategories()
    }, []);


    const getCategories = () => {
        setLoading(true)
        let data=[]
        WooService.getCategories().then((res)=>{
            console.log(res)
            if(Array.isArray(res)){
                (res|| []).map((item,key)=>{
                    if (item.parent===0 && item.slug !== "non-classe"){
                        data.push(item)
                    }
                })
                //setAll_Categories(all_categories)
                setCategories(data)
                setLoading(false)
            }
        })
    }


    return(
        <div>
            <MuiBackdrop open={loading}/>
            <div style={{marginTop:90,padding:20,minHeight:"100vh"}}>
                <h5>
                    Catégories
                </h5>
                <div className="row align-items-center p-1">
                    {
                        categories.map((item,key)=>(
                            <div className="col-4 p-1"  >
                                <div onClick={()=>{
                                    navigateTo('/home/products/' + item.id)
                                }} className="card cardShadow" style={{width:"100%",borderRadius:10,marginBottom:12}}>
                                    <img className="card-img-top" src={item.image ? item.image.src : ""} style={{borderTopRightRadius:10,WebkitBorderTopLeftRadius:10}} alt="Card image cap"/>
                                    <div className="card-body" style={{padding:"0.5rem",minHeight:61}} >
                                        <div style={{fontWeight:700}} className="text-center"> {item.name} </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )

}
