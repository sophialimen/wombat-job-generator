
export const getQueueButtonStates = ({ _selectedQueueRow, _queueTaskData }) => {
    if (_selectedQueueRow === null) {
        return {
            run: false,
            pause: false,
            stop: false,
            remove: false
        };
    }

    const selectedQueuedTask = _queueTaskData[_selectedQueueRow];
    const isFirstInQueue = selectedQueuedTask.order === 1;

    switch (selectedQueuedTask.status) {
        case "Executing":
            return {
                run: false,
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
        case "Idle":
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

export const getTaskSelectState = ({ selectedTask }) => {
    if (selectedTask === null) {
        return { add: false };
    }
    return { add: true };
};


 export const getQueueStates = (status) => {
     switch (status) {
         case "Executing":
             return {
                 colour: "#90EE90"
             };
         case "Waiting":
             return {
                 colour: "#f0f022ff"
             };
         case "Idle":
             return {
                 colour: "#f0f022ff"
             };
         default:
             return {
                 colour: "transparent"
             };

     }
};

export const runButtonClicked = (_queueTaskData, _setQueueTaskData, _selectedQueueRow) =>
{
    if (!_queueTaskData) {
        console.log("queueTaskData is undefined!");
        return;  // Exit early if no data
    }

    const updatedQueue = _queueTaskData.map((task, index) => {
        if (index === _selectedQueueRow) {
            return {
                order: task.order,
                job: task.job,
                status: "Executing"
            };
        }
        else
            return task;

    });

    _setQueueTaskData(updatedQueue);    
};

export const pauseButtonClicked = (_queueTaskData, _setQueueTaskData, _selectedQueueRow) =>
{
    if (!_queueTaskData) {
        console.log("queueTaskData is undefined!");
        return;  // Exit early if no data
    }

    const updatedQueue = _queueTaskData.map((task, index) => {
        if (index === _selectedQueueRow) {
            return {
                order: task.order,
                job: task.job,
                status: "Idle"
            };
        }
        else
            return task;

    });

    _setQueueTaskData(updatedQueue);    
    console.log(updatedQueue);
};

export const abortJob = (_queueTaskData, _setQueueTaskData, _selectedQueueRow, _setSelectedQueueRow) =>
{    
    const newQueueList = [..._queueTaskData];
    newQueueList.splice(_selectedQueueRow, 1);  //splice(startingIndex, deleteCount)  

    const updatedQueue = newQueueList.map ((task, index) => ({
        ...task,
        order: index + 1

    }));

    _setSelectedQueueRow(null);
    _setQueueTaskData(updatedQueue);
};

export const addJob = (_queueTaskData, _setQueueTaskData, _selectedQueueRow, _setSelectedQueueRow, _selectedTaskIndex, _presetTaskList) =>
{
    if (_selectedQueueRow === null)
        return;

    //copy of Queue List
    const newQueueList = [..._queueTaskData];
    
    //get new Task Details
    const newJobName = _presetTaskList[_selectedTaskIndex].taskName;
    const addJobToList = {
        order: _selectedQueueRow+1,
        job: newJobName,
        status: "Idle"
    };    

    newQueueList.splice(_selectedQueueRow, 0, addJobToList); //splice(startingIndex, deleteCount, item1, item2, ...)
    const updatedQueue = newQueueList.map((task, index) => {
        let updatedTask = {...task};
        if (index > _selectedQueueRow) {
            updatedTask.order = task.order + 1;
        }
        if (task.status === "Executing" && _selectedQueueRow === 0) {
            updatedTask.status = "Idle";
        }
        return updatedTask;
    });

    _setSelectedQueueRow(_selectedQueueRow);
    _setQueueTaskData(updatedQueue);
}


export default {
    getQueueButtonStates,
    getTaskSelectState,
    getQueueStates,
    runButtonClicked,
    pauseButtonClicked,
    abortJob, 
    addJob
};


