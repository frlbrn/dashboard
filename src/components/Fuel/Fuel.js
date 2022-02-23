/*
https://public.opendatasoft.com/explore/dataset/prix_des_carburants_j_7/map/?location=6,46.48839,2.49423&basemap=jawg.light
*/

import React, { useEffect, useState } from "react";

const Fuel = (props) => {
    const [price_sp95, setsp95] = useState("");
    const [price_e10, sete10] = useState("");
    const [price_e85, sete85] = useState("");
    const [price_gazole, setgazole] = useState("");
    const [price_sp98, setsp98] = useState("");

  useEffect(() => {
    let server = "https://public.opendatasoft.com/";
    let request = "/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&refine.city="+props.city
    fetch(server + request)
    .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      })
    .then(result => {
        let data = result["records"][0]["fields"]
        setsp95(data.price_sp95)
        sete10(data.price_e10)
        sete85(data.price_e85)
        setgazole(data.price_gazole)
        setsp98(data.price_sp98)
    })
    .catch( err => {
        console.log(err)
        //err.text().then( errorMessage => {
          //  console.log(errorMessage)
          //this.props.dispatch(displayTheError(errorMessage))
      });
    

  }, [props.city]);

  return (
    <>
    <table>
      <tbody>
        <tr><td align="center"><img height="30" alt="gazole" src={process.env.PUBLIC_URL+"/fuel_gazole.png"}/></td><td align="right"><span style={{fontVariant:['tabular-nums']}}>{price_gazole}€</span></td></tr>
        <tr><td align="center"><img height="30" alt="sp98" src={process.env.PUBLIC_URL+"/fuel_SP98.png"}/></td><td align="right"><span style={{fontVariant:['tabular-nums']}}>{price_sp98}€</span></td></tr>
        <tr><td align="center"><img height="30" alt="sp95" src={process.env.PUBLIC_URL+"/fuel_SP95.png"}/></td><td align="right"><span style={{fontVariant:['tabular-nums']}}>{price_sp95}€</span></td></tr>
        <tr><td align="center"><img height="30" alt="e10" src={process.env.PUBLIC_URL+"/fuel_E10.png"}/></td><td align="right"><span style={{fontVariant:['tabular-nums']}}>{price_e10}€</span></td></tr>
        <tr><td align="center"><img height="30" alt="e85" src={process.env.PUBLIC_URL+"/fuel_E85.png"}/></td><td align="right"><span style={{fontVariant:['tabular-nums']}}>{price_e85}€</span></td></tr>
        </tbody>
      </table>
    </>
  );
}

Fuel.defaultProps = {
  city: "BORDEAUX"
}
export default Fuel;
