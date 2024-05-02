import React from 'react'
import FooterWave from '../components/Footers/FooterWave'
import Card from '../components/Card'
import ShowHide from '../components/ShowHide';
import vehicles from '../data/vehicles';

export function Inicio(props) {
    
    const vehicleList = vehicles.map(v => {
        return <Card title={v.name} description={v.description} />
      })

    return (
        <>
            <h1>SwapDeal</h1>
            <div className="container">
                {vehicleList}
            </div>
            <ShowHide/>
            <div class="espacio"></div>
            <FooterWave/>
        </>
    )
}
