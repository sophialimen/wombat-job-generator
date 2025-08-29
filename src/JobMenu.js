import './JobMenu.css';
import { TaskData } from './data.js'
import { useState, useEffect } from 'react';
import { FaCaretDown, FaCaretUp, FaPause, FaPlay, FaStop } from 'react-icons/fa';
import FunctionMethods from './FunctionMethods.js';

const Menu = ({ selectedRobot, selectedBuilding, selectedSite, selectedRegion }) => {

    //Set states for Job Queues (list)
    const [queueTaskData, setQueueTaskData] = useState([]);

    //get from API - robot job queue information (order, task name, status)
    const queuedTaskList = TaskData.queuedTaskInfo;
    const presetTaskList = TaskData.predefinedTaskInfo;  

    //setting job queue data(list) from API
    useEffect (()=> {
        setQueueTaskData(queuedTaskList);
    }, [queuedTaskList]);

    //monitor selected row from Job Queue List and Preset job instruction list
    const [selectedQueueRow, setSelectedQueueRow] = useState(null);
    const [selectedTaskIndex, setSelectedTask] = useState(null);   


    /* Functions for Menu */
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
    const queueButtonState = FunctionMethods.getQueueButtonStates({ 
        _selectedQueueRow: selectedQueueRow, 
        _queueTaskData: queueTaskData
    });    
    const taskButtonState = FunctionMethods.getTaskSelectState({selectedTask: selectedTaskIndex});

    return (
        <div>            
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
                                    {queueTaskData.map((val, key) => {
                                    return (
                                        <tr key={key}
                                            onClick={() => setSelectedQueueRow(key)}
                                            style={{ backgroundColor: selectedQueueRow === key ? 'lightblue' : 'transparent' }}
                                        >
                                            <td className='td-queue'>{val.order}</td>
                                            <td className='td-queue'>{val.job}</td>
                                            <td className='td-queue' 
                                                style={{backgroundColor: FunctionMethods.getQueueStates(val.status).colour}}>
                                                {val.status}
                                            </td>
                                            
                                            <td className='td-queue-arrow'>
                                                <div className="arrow-container">
                                                    <button 
                                                    className='button-arrow'
                                                    disabled={val.order===1}
                                                    onClick={()=>FunctionMethods.moveUpQueue(queueTaskData, setQueueTaskData, selectedQueueRow, setSelectedQueueRow)}
                                                    >
                                                        <FaCaretUp /></button>
                                                    <button 
                                                    className='button-arrow'
                                                    disabled={val.order===queueTaskData.length}
                                                    onClick={()=>FunctionMethods.moveDownQueue()}
                                                    >
                                                        <FaCaretDown /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>                                
                            </table>

                            <div className='gridrow-controlButtons2'>
                                <button 
                                disabled={!queueButtonState.run}
                                onClick={()=>FunctionMethods.runButtonClicked(queueTaskData, setQueueTaskData, selectedQueueRow)}
                                >
                                    <FaPlay /> Run
                                </button>
                                <button 
                                disabled={!queueButtonState.pause}
                                onClick={()=>FunctionMethods.pauseButtonClicked(queueTaskData, setQueueTaskData, selectedQueueRow)}
                                >
                                    <FaPause /> Pause
                                </button>
                                <button 
                                disabled={!queueButtonState.stop}
                                onClick={()=> {
                                    console.log("about to call abortJob", setQueueTaskData, setSelectedQueueRow);
                                    FunctionMethods.pauseButtonClicked(queueTaskData, setQueueTaskData, selectedQueueRow, setSelectedQueueRow);}
                                }
                                >
                                    <FaStop /> Stop
                                </button>
                                <button
                                    disabled={!queueButtonState.remove}
                                    onClick={() => {                                        
                                        FunctionMethods.abortJob(queueTaskData, setQueueTaskData, selectedQueueRow, setSelectedQueueRow);
                                    }}>
                                    Remove (abort)
                                </button>
                            </div>

                        </div>
                        <div className='column-colour'>
                            <h3>Predefined Tasks</h3>

                            <table className='tableList'>
                                {presetTaskList.map((val, key) => {
                                    return (
                                        <tr key={key}
                                            onClick={() => setSelectedTask(key)}
                                            style={{ backgroundColor: selectedTaskIndex === key ? 'lightblue' : 'transparent' }}
                                        >
                                            <td className='td-task'>{val.taskName}</td>
                                        </tr>
                                    )
                                })}

                            </table>

                            <div className='gridrow-taskButtons2'>
                                <button className='button-Task2'>Create New Task</button>
                                <button className='button-Task2' 
                                disabled={!taskButtonState.add}
                                onClick={()=>FunctionMethods.addJob(queueTaskData, setQueueTaskData, selectedQueueRow, setSelectedQueueRow, selectedTaskIndex, presetTaskList)}
                                >Add to Queue</button>
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