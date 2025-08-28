import './JobMenu.css';
import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaCaretUp, FaPause, FaPlay, FaStop } from 'react-icons/fa';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

    //get from API - robot job queue information (order, task name, status)
    const queuedTaskInfo = [
        { order: 1, job: "Go to Delivery Point 1", status: "Executing" },
        { order: 2, job: "Go to Charging", status: "Waiting" }   
    ]

    const [selectedQueueRow, setSelectedQueueRow] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const predefinedTaskInfo = [
        { taskName: "Go to Home" },
        { taskName: "Go to Charging Station" },
        { taskName: "Go to Loading Station" },
        { taskName: "Go to Unloading Station" }      
    ]

    //de-select options - outside click
    useEffect(()=> {
        const handleClickOutside = (event) => {
            if (!event.target.closest('tr') && !(event.target.closest('button')))
            {
                setSelectedQueueRow(null);
                setSelectedTask(null);
            }
        };
        document.addEventListener('click',handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);


    //enable or disable buttons depending on task selected
    const getQueueButtonStates = () => 
    {
        if (selectedQueueRow === null)
        {
            return {
                run: false,
                pause: false,
                stop: false,
                remove: false
            };
        }

        const selectedQueuedTask = queuedTaskInfo[selectedQueueRow];
        const isFirstInQueue = selectedQueuedTask.order === 1;

        switch (selectedQueuedTask.status)
        {
            case "Executing":
                return {
                    run:false,
                    pause: true,
                    stop: true,
                    remove: true
                };
            case "Waiting":
                return {
                    run: isFirstInQueue,
                    pause: false,
                    stop: false,
                    remove: true
                };
            default:
                return {
                    run: false,
                    pause: false,
                    stop: false,
                    remove: false 
                };
        }
    };

    const getTaskButtonStates = () =>
    {
        if (selectedTask ===  null)
        {
            return {add: false};
        }
        
        if (selectedTask != null)
        {
            return {add: true};
        }           

    };

    const queueButtonState = getQueueButtonStates();
    const taskButtonState = getTaskButtonStates();

    return (
        <div>
            {/* New concept */}
            <div className='two-column-container'>
                <div>
                    <div className='two-column-container2'>
                        <div className='column-colour'>
                            <h3>Job Menu</h3>
                            <table className='tableList'>
                                <thead>
                                    <tr>
                                        <th className='th-New'>Queue No.</th>
                                        <th className='th-New'>Job</th>
                                        <th className='th-New'>Status</th>
                                        <th className='th-New'>Rearrange</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                </tbody>                                
                            </table>

                            <div className='gridrow-controlButtons2'>
                                <button disabled={!queueButtonState.run}><FaPlay /> Run</button>
                                <button disabled={!queueButtonState.pause}><FaPause /> Pause</button>
                                <button disabled={!queueButtonState.stop}><FaStop /> Stop</button>
                                <button disabled={!queueButtonState.remove}>Remove (abort)</button>
                            </div>

                        </div>
                        <div className='column-colour'>
                            <h3>Predefined Tasks</h3>

                            <table className='tableList'>
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
                                <button className='button-Task2' disabled={!taskButtonState.add}>Add to Queue</button>
                            </div>

                        </div>
                    </div>

                </div>


                <div className='column-colour' style={{height:'500px'}}>
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