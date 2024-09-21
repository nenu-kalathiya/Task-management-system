export const filterTasks = (tasks, criteria) => {
    return tasks.filter(task => task.status === criteria);
};


export const sortTasksByDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

export const validateTaskData = (task) => {
    const errors = {};
    if (!task.title) errors.title = "Title is required";
    if (!task.dueDate || new Date(task.dueDate) < new Date()) {
        errors.dueDate = "Due date cannot be in the past";
    }
    return errors;
};
