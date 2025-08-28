
export const getQueueButtonStates = ({ selectedQueueRow, queuedTaskInfo }) => {
    if (selectedQueueRow === null) {
        return {
            run: false,
            pause: false,
            stop: false,
            remove: false
        };
    }

    const selectedQueuedTask = queuedTaskInfo[selectedQueueRow];
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
    switch (status)
    {
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
        case "Paused":
            return {
                colour: "#FFA500"
            };
        default:
            return {
                colour: "transparent"
            };

    }
};


export default {
    getQueueButtonStates,
    getTaskSelectState,
    getQueueStates
};


