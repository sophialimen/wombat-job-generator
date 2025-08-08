import './JobMenu.css';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

    
    return (
        <div>

            <div className='flex-container1'>

                <div className='column'>
                    <h3>Job Menu</h3>

                    <button>Queue1</button>
                    <button>Queue2</button>
                    <button>Queue3</button>  
                                      
                </div>


                <div className='column'>
                    <h3>Predefined Tasks</h3>
                    <button>Task1</button>
                    <button>Task2</button>
                    <button>Task3</button>
                </div>


                <div className='column'>
                    <h3>Robot Settings</h3>

                    <div className="robot-settings-menu">
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