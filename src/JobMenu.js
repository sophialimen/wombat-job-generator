import './JobMenu.css';
import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp, FaPause, FaPlay, FaStop } from 'react-icons/fa';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

    //get from API - robot job queue information (order, task name, status)
    const queuedTaskInfo = [
        { order: 1, job: "Go to Delivery Point 1", status: "Executing" },
        { order: 2, job: "Go to Charging", status: "Waiting" }
    ]

    const [selectedQueueRow, setSelectedQueueRow] = useState(null);
    const [selectedTask, setSelectedTask] = useState([]);

    const predefinedTaskInfo = [
        { taskName: "Go to Home" },
        { taskName: "Go to Charging Station" },
        { taskName: "Go to Loading Station" }
    ]


    return (
        <div>
            {/* New concept */}
            <div className='two-column-container'>
                <div>
                    <div className='two-column-container2'>
                        <div className='column-colour'>
                            <h3>Job Menu</h3>
                            <table className='tableNew'>
                                <tr>
                                    <th className='th-New'>Queue No.</th>
                                    <th className='th-New'>Job</th>
                                    <th className='th-New'>Status</th>
                                </tr>
                                {queuedTaskInfo.map((val, key) => {
                                    return (
                                        <tr key={key}
                                            onClick={() => setSelectedQueueRow(key)}
                                            style={{ backgroundColor: selectedQueueRow === key ? 'lightblue' : 'transparent' }}
                                        >
                                            <td className='td-queue'>{val.order}</td>
                                            <td className='td-queue'>{val.job}</td>
                                            <td className='td-queue'>{val.status}</td>
                                            <td className='td-queue-arrow'>
                                                <div className="arrow-container">
                                                    <button className='button-arrow'><FaCaretUp /></button>
                                                    <button className='button-arrow'><FaCaretDown /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>

                            <div className='gridrow-controlButtons2'>
                                <button className='button-Queue2'><FaPlay /> Run</button>
                                <button className='button-Queue2'><FaPause /> Pause</button>
                                <button className='button-Queue2'><FaStop /> Stop</button>
                                <button className='button-Queue2'>Remove (abort)</button>
                            </div>

                        </div>
                        <div className='column-colour'>
                            <h3>Predefined Tasks</h3>

                            <table className='tableNew'>
                                {predefinedTaskInfo.map((val, key) => {
                                    return (
                                        <tr key={key}
                                            onClick={() => setSelectedTask(key)}
                                            style={{ backgroundColor: selectedTask === key ? 'lightblue' : 'transparent' }}
                                        >
                                            <td className='td-task'>{val.taskName}</td>
                                        </tr>
                                    )
                                })}

                            </table>

                            <div className='gridrow-taskButtons2'>
                                <button className='button-Task2'>Create New Task</button>
                                <button className='button-Task2'>Add to Queue</button>
                            </div>

                        </div>
                    </div>

                </div>


                <div className='column-colour'>
                    <h3>Robot Settings</h3>

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
    );


}; export default Menu;