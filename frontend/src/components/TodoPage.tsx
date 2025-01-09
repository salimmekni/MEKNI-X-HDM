/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ editedTask, setEditedTask ] = useState<{ id: number, name: string, } | null>(null);

  // Fetch all tasks
  const handleFetchTasks = async () => {
    try {
      const fetchedTasks = await api.get('/tasks');
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Delete a task
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Save or update a task
  const handleSave = async (task: Partial<Task>) => {
    try {
      if (task.id) {
        await api.patch(`/tasks/${task.id}`, { name: task.name });
      } else {
        await api.post('/tasks', { name: task.name });
      }
      await handleFetchTasks();
      setEditedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={editedTask?.id === task.id ? editedTask.name : task.name}
              onChange={(e) => setEditedTask({ id: task.id, name: e.target.value })}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                onClick={() => editedTask && handleSave({ id: task.id, name: editedTask.name })}
                disabled={!editedTask || editedTask.name === task.name}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => handleSave({ name: 'Nouvelle tâche' })}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
