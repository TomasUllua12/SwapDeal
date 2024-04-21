import "./App.css";
import PaginaPrincipal from "./views/pagina_principal/PaginaPrincipal";
import Card from "./components/Card";
import ShowHide from "./components/ShowHide";
import vehicles from "./data/vehicles";
import FooterWave from "./components/Footers/FooterWave";


function App() {

  const vehicleList = vehicles.map(v => {
    return <Card title={v.name} description={v.description} />
  })

  return (
    <div className="App">
      <PaginaPrincipal/>
      <h1>SwapDeal</h1>
      <div className="container">
        {vehicleList}
      </div>
      <ShowHide/>
      <div class="espacio"></div>
      <FooterWave/>
    </div>
  );

}

export default App;
