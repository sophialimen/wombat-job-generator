import './App.css';
import RobotSelector from './robotSelector.js';
import { React, useState } from "react";
import { coreData } from "./data.js";
import Menu from './JobMenu.js'; 

function App() 
{    
  const [selectedrobot, setSelectedRobot] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  
  const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(selectedRegionOption);
        // Add your form submission logic here
    };


  /* return html format */
  return (
    <div className="App">
      <header className="Main-Header"><h1>Warehouse Automation Job Generator Manager</h1></header>

      <RobotSelector
       onSelectionChange={{
        setSelectedRobot,
        setSelectedBuilding,
        setSelectedSite,
        setSelectedRegion
      }}
      />

      {selectedrobot && (
        <Menu
          selectedRobot={selectedrobot}
          selectedBuilding={selectedBuilding}
          selectedSite={selectedSite}
          selectedRegion={selectedRegion}
        />
      )}

      

      
      
      

      <header className="App-header">        
        
        <button 
          type="submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
          >Submit</button>
        
      </header>




    </div>
  );
}

export default App;
