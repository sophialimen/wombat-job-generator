import './JobMenu.css';
import React, { useState } from 'react';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

       




    return (
        <div>

            <div className='flex-container1'>

                <div className='column'>
                    <h3>Job Menu</h3>

                    <div className='menu-container'>
                        <div className='queue-row'>
                            <button className='queue-button'>Queue1</button>
                            <div className="arrow-controls">
                            <button className="arrow-btn">
                                <div className="triangle-up"></div>
                            </button>
                            <button className="arrow-btn">
                                <div className="triangle-down"></div>
                            </button>
                        </div>
                        </div>
                        <div className='queue-row'><button className='queue-button'>Queue2</button></div>
                        <div className='queue-row'><button className='queue-button'>Queue3</button></div>
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