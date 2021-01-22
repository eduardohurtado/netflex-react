//Interfaces
interface IAppStateMongo {
  tasks: {
    id: string;
    title: string;
    description: string;
    done: boolean;
  }[];
  isLoading: boolean;
}

interface IAction {
  type: string;
  id: string;
  title: string;
  description: string;
  payload: any;
}

//APP default initial state
const initialStateMongo: IAppStateMongo = {
  tasks: [],
  isLoading: true,
};

const reducer = (state = initialStateMongo, action: IAction) => {
  if (action.type === "DOWNLOAD_TASKS_MONGO_ASYNC") {
    const checkIfEmpty = (): boolean => {
      if (action.payload.length < 1) {
        return true;
      } else {
        return false;
      }
    };
    return {
      ...state,

      tasks: action.payload,
      isLoading: checkIfEmpty(),
    };
  } else if (action.type === "TASK_DELETE_ASYNC") {
    console.log("Task deleted from server:", action.id);
  }

  return state;
};

export default reducer;
