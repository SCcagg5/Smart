import Carousel from "nuka-carousel";
import Card from "react-bootstrap/Card";
import gift from "../assets/images/gift.PNG";
import assistance from "../assets/images/assistanceSmartco.PNG";
import comptaSass from "../assets/images/comptaSass.PNG";
import offreFlash from "../assets/images/OFFREFLASH.PNG";
import comptecourant from "../assets/images/comptecourant.PNG";
import React from "react";
import domic from "../assets/images/domic.PNG";
import token from "../assets/images/token.PNG";
import assurance from "../assets/images/assurance.PNG";



<Carousel class="border border-success" slidesToShow={3}
cellSpacing={15} initialSlideHeight={"50%"}
style={{marginTop: "5%", padding: "3%"}}>
<Card>



<Card.Body>
<div style={{
    width: "100%",
        textAlign: "center"
}}>
<img src={domic} style={{
    marginLeft: "auto",
        marginRight: "auto"
}}/>
</div>
<div className="container" style={{
backgroundColor: "#007bff",
width: "80%",
textAlign: "center"
}}>
<text style={{
color: "white",
marginLeft: "auto",
marginRight: "auto",
fontWeight: "bold",
fontSize: "small"
}}>Domicialitation
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{
fontSize: "small",
fontWeight: "bold"
}}>Une adresse prestigieuse pour ma domiciliation
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{fontSize: "small"}}><a>En
savoir
plus</a></text>
</div>


</Card.Body>
<Card.Footer style={{
backgroundColor: "#1ca973",
cursor: "pointer",
textAlign: "center"
}}>
<text style={{
color: "white",
fontWeight: "bold",
fontSize: "small"
}}>J'en profite
</text>
</Card.Footer>
</Card>

<Card>



<Card.Body>
<div style={{
width: "100%",
textAlign: "center"
}}>
<img src={token} style={{
marginLeft: "auto",
marginRight: "auto"
}}/>
</div>
<div className="container" style={{
backgroundColor: "#007bff",
width: "80%",
textAlign: "center"
}}>
<text style={{
color: "white",
marginLeft: "auto",
marginRight: "auto",
fontWeight: "bold",
fontSize: "small"
}}>Token Shares
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{
fontSize: "small",
fontWeight: "bold"
}}>Simple, rapide, en ligne Tokeniser vos actions
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{fontSize: "small"}}><a>En
savoir
plus</a></text>
</div>


</Card.Body>
<Card.Footer style={{
backgroundColor: "#1ca973",
cursor: "pointer",
textAlign: "center"
}}>
<text style={{
color: "white",
fontWeight: "bold",
fontSize: "small"
}}>J'en profite
</text>
</Card.Footer>
</Card>

<Card>



<Card.Body>
<div style={{
width: "100%",
textAlign: "center"
}}>
<img src={assurance} style={{
marginLeft: "auto",
marginRight: "auto"
}}/>
</div>
<div className="container" style={{
backgroundColor: "#007bff",
width: "65%",
textAlign: "center"
}}>
<text style={{
color: "white",
marginLeft: "auto",
marginRight: "auto",
fontWeight: "bold",
fontSize: "small"
}}>Assurance
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{
fontSize: "small",
fontWeight: "bold"
}}>Protéger votre société contre les imprévus
</text>
</div>
<div style={{
width: "100%",
textAlign: "center",
marginTop: "2%"
}}>
<text style={{fontSize: "small"}}><a>En
savoir
plus</a></text>
</div>


</Card.Body>
<Card.Footer style={{
backgroundColor: "#1ca973",
cursor: "pointer",
textAlign: "center"
}}>
<text style={{
color: "white",
fontWeight: "bold",
fontSize: "small"
}}>J'en profite
</text>
</Card.Footer>
</Card>


</Carousel>