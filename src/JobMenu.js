import './JobMenu.css';
import React, { useState } from 'react';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

    //for receiving from API and tracking state while in menu
    const [queue1, setQueue1] = useState([]); 

    const data = [
        { order: 1, job: "Go to Delivery pt 1", status: "Executing"},
        { order: 2, job: "Go to Charging", status: "Waiting"}
    ]

    const [selectedRow, setSelectedRow] = useState(null);


    return (
        <div>

            <div className='flex-container1'>

                <div className='column'>
                    <h3>Job Menu</h3>

                    <div className='menu-container'>

                        <table>
                            <tr>
                                <th>Queue No.</th>
                                <th>Job</th>
                                <th>Status</th>
                            </tr>
                            {data.map((val, key) => {
                                return (
                                    <tr className='table-row' 
                                    key={key} 
                                    onClick={()=>setSelectedRow(key)}
                                    style={{backgroundColor: selectedRow === key? 'lightblue' : 'transparent'}}
                                    >
                                        <td>{val.order}</td>
                                        <td>{val.job}</td>
                                        <td>{val.status}</td>
                                        <td><div className="arrow-container">
                                            <button className="arrow-btn">
                                                <div className="triangle-up"></div>
                                            </button>
                                            <button className="arrow-btn">
                                                <div className="triangle-down"></div>
                                            </button>
                                        </div></td>
                                    </tr>
                                )
                            })}
                        </table>

                    </div>


                </div>


                <div className='column'>
                    <h3>Predefined Tasks</h3>

                    <div className="menu-container">
                        <div className="info-row">
                            <button className='task-button'>Go to Home</button>
                        </div>
                        <div className="info-row">
                            <button className='task-button'>Go to Charging Station</button>
                        </div>
                        <div className="info-row">
                            <button className='task-button'>Go to Delivery Point 1</button>
                        </div>
                    </div>
                </div>


                <div className='column'>
                    <h3>Robot Settings</h3>

                    <div className="menu-container">
                        <div className="info-row">
                            <span className="info-label">Selected Robot:</span>
                            <span className="info-value">{selectedRobot}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Robot Battery Level:</span>
                            <span className="info-value">90%</span>
                        </div>
                    </div>



                </div>

            </div>



        </div>
    );


}; export default Menu;