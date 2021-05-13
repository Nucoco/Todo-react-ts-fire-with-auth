import React, { FC, useEffect, useState } from 'react';
import styles from './App.module.css';
import { db } from './firebase'
import { FormControl, List, makeStyles, TextField } from '@material-ui/core'
import { AddToPhotos } from '@material-ui/icons'
import TaskItem from './TaskItem';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: FC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [input, setInput] = useState('')
  const classes = useStyles()

  useEffect(() => {
    //usSub receive a method to quit listening database.
    //So, unSub() is a method as the return value from db.collection().onSnapshot()
    const unSub = db.collection('tasks').onSnapshot(snapshot => {//onSnapshot() listens to Cloud FireStore
      setTasks(
        snapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title }))
      )
    })
    return () => unSub();// if not defined as an arrow function, rendering goes wrong.
  }, [])

  const newTask = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    db.collection('tasks').add({ title: input })
    setInput('')
  }

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{ shrink: true }}
          label='New task ?'
          value={input}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput(event.target.value)}
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotos />
      </button>

      <List className={classes.list}>
        {tasks.map(task => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}

      </List>
    </div>
  );
}

export default App;
