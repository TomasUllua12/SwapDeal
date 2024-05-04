import React from 'react'
import FooterWave from '../components/Footers/FooterWave'
import Card from '../components/Card'
import ShowHide from '../components/ShowHide';
import vehicles from '../data/vehicles';
import { Header } from '../components/Header';

export function Inicio(props) {
    
    const vehicleList = vehicles.map(v => {
        return <Card title={v.name} description={v.description} />
      })

    return (
        <>
            <Header/>
            <div className="container">
                {vehicleList}
            </div>
            <ShowHide/>
            <div className="espacio"></div>
            <FooterWave/>
        </>
    )
}
