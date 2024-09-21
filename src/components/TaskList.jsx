import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import ImportExport from './ImportExport';
import FilterSort from './FilterSort';
import { exportToCSV } from '../utils/csvUtils';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {

    const initialTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-09-30', priority: 'High', status: 'Pending' },

    ];
    setTasks(initialTasks);
    setFilteredTasks(initialTasks);
  }, []);

  const handleExport = () => {
    exportToCSV(filteredTasks);
  };

  return (
    <div>
      <ImportExport onExport={handleExport} />
      <FilterSort tasks={tasks} setFilteredTasks={setFilteredTasks} />
      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
