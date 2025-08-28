
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

export const runButtonClicked = (_queueTaskData, _selectedQueueRow, _setQueueTaskData) =>
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

export const pauseButtonClicked = (_queueTaskData, _selectedQueueRow, _setQueueTaskData) =>
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
};

export const abortJob = () =>
{
    console.log("Job deleted");

};


export default {
    getQueueButtonStates,
    getTaskSelectState,
    getQueueStates,
    runButtonClicked,
    pauseButtonClicked,
    abortJob
};


