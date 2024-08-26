import TaskArea, { TODO } from '../../components/TaskArea';
import Sidebar from '../../components/Sidebar';
import FAB from '../../components/FAB';
import Modal from '../../components/Modal';

import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function Home() {
  const [modal, setModal] = useState(false);
  const [todos, setTodos] = useState<TODO[]>([]);
  const [edit, setEdit] = useState<TODO>();

  async function onSave(todo: TODO) {
    const update = todos.find((el) => el.id === todo.id);
    if (update) {
      await window.electron.updateTODO(todo);
    } else {
      await window.electron.insertTODO(todo);
    }

    await getAllTODOS();
    toggleModal();
  }

  async function onCheck(id: number) {
    const newState = todos.find((todo) => todo.id === id);

    if (!newState) return;

    newState.status = newState.status === 1 ? 0 : 1;
    await window.electron.updateTODO(newState);
    await getAllTODOS();
  }

  async function onDelete(id: number) {
    await window.electron.deleteTODO(id);
    await getAllTODOS();
  }

  function onEdit(id: number) {
    const editTodo = todos.find((todo) => todo.id === id);
    if (editTodo) {
      setEdit(editTodo);
    }

    toggleModal();
  }

  function toggleModal() {
    if (modal) {
      setEdit(undefined);
    }

    setModal(!modal);
  }

  async function getAllTODOS() {
    const data = await window.electron.getAllTODO();

    if (data) {
      setTodos(data);
    }
  }

  useEffect(() => {
    getAllTODOS();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      {/*
      <FAB onClick={toggleModal} />
      {modal && (
        <Modal onClose={toggleModal} onSave={onSave} initialData={edit} />
      )}
      <TaskArea
        todos={todos}
        onCheck={onCheck}
        onDelete={onDelete}
        onEdit={onEdit}
      /> */}
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          backgroundColor: '#39374C',
          minHeight: '100vh',
        }}
      >
        <Box
          style={{
            borderBottomLeftRadius: '25px',
            borderTopLeftRadius: '25px',
            backgroundColor: '#F1F5FB',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <div style={{ padding: '10px' }}>
            <p>CÔNG TY CỔ PHẦN THIẾT BỊ SISC VIỆT NAM</p>
          </div>
        </Box>
      </Box>
    </div>
  );
}
