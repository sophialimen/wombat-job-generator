import { useState } from "react";
import { coreData } from "./data.js";
import './robotSelector.css'; 

const RobotSelector = ({ onSelectionChange }) => {

    /* define state variables here */
    const [selectedRegionOption, setSelectedRegionOption] = useState("");
    const [selectedSiteOption, setSelectedSiteOption] = useState("");
    const [selectedBuildingOption, setSelectedBuildingOption] = useState("");
    const [selectedRobotOption, setSelectedRobotOption] = useState("");

    /* define change handlers here */
    const handleSelectRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegionOption(region);
        onSelectionChange.setSelectedRegion(region);    //update App.js state

        setSelectedSiteOption('');
        setSelectedBuildingOption('');
        setSelectedRobotOption('');
        onSelectionChange.setSelectedSite('');
        onSelectionChange.setSelectedBuilding('');
        onSelectionChange.setSelectedRobot('');
    };
    const handleSelectSiteChange = (event) => {
        const site = event.target.value;
        setSelectedSiteOption(site);
        onSelectionChange.setSelectedSite(site);    //update App.js state

        setSelectedBuildingOption('');
        setSelectedRobotOption('');
        onSelectionChange.setSelectedBuilding('');
        onSelectionChange.setSelectedRobot('');
    };
    const handleSelectBuildingChange = (event) => {
        const building = event.target.value;
        setSelectedBuildingOption(building);
        onSelectionChange.setSelectedBuilding(building); //update App.js state

        setSelectedRobotOption('');
        onSelectionChange.setSelectedRobot('');
    };
    const handleSelectRobotChange = (event) => {
        setSelectedRobotOption(event.target.value);
        onSelectionChange.setSelectedRobot(event.target.value); //update App.js state
    };

    /* get options */
    const getSites = () => {
        return selectedRegionOption ? coreData.sites[selectedRegionOption] || [] : [];
    };

    const getBuildings = () => {
        return selectedSiteOption ? coreData.buildings[selectedSiteOption] || [] : [];
    };

    const getRobots = () => {
        return selectedBuildingOption ? coreData.robots[selectedBuildingOption] || [] : [];
    };    

    /* JSX for dropdowns */
    return (        
        <div>
            <div className='flex-container'>
                <div className='column'>
                    <h3> Region </h3>
                    <select
                        id="regionSelect"
                        className="region-select-dropdown"
                        value={selectedRegionOption}
                        onChange={handleSelectRegionChange}
                    >
                        <option value="">Select Region...</option>
                        {coreData.regions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className='column'>
                    <h3>Site</h3>
                    <select
                        id="siteSelect"
                        className="region-select-dropdown"
                        value={selectedSiteOption}
                        onChange={handleSelectSiteChange}
                    >
                        <option value="">Select Site...</option>
                        {getSites().map((site) => (
                            <option key={site} value={site}>{site}</option>
                        ))}
                    </select>
                </div>

                <div className='column'>
                    <h3>Building</h3>
                    <select
                        id="buildingSelect"
                        className="region-select-dropdown"
                        value={selectedBuildingOption}
                        onChange={handleSelectBuildingChange}
                    >
                        <option value="">Select Bldg...</option>
                        {getBuildings().map((building) => (
                            <option key={building} value={building}>{building}</option>
                        ))}
                    </select>
                </div>

                <div className='column'>
                    <h3>Robot Name</h3>
                <select
                    id="robotSelect"
                    className="region-select-dropdown"
                    value={selectedRobotOption}
                    onChange={handleSelectRobotChange}
                >
                    <option value="">Select Robot...</option>
                    {getRobots().map((robot) => (
                        <option key={robot} value={robot}>{robot}</option>
                    ))}
                </select>
                </div>

            </div>
        
        </div>
        

    )



}; export default RobotSelector;