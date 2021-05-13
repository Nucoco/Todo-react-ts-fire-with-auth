import React, { FC, useState } from 'react'
import styles from "./TaskItem.module.css"
import { Grid, ListItem, TextField } from '@material-ui/core'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { db } from './firebase'

interface Props {
   id: string
   title: string
}

const TaskItem: FC<Props> = (props) => {
   const [title, setTitle] = useState(props.title)

   const editTask = () => {
      db.collection('tasks').doc(props.id).set({ title: title }, { merge: true })
   }

   const deleteTask = () => {
      db.collection('tasks').doc(props.id).delete()
   }

   return (
      <ListItem>
         <h2>{props.title}</h2>
         <Grid container justify="flex-end">
            <TextField
               InputLabelProps={{ shrink: true }}
               label="Edit task"
               value={title}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
         </Grid>
         <button className={styles.taskitem__icon} onClick={editTask}><EditOutlined /></button>
         <button className={styles.taskitem__icon} onClick={deleteTask}><DeleteOutlined /></button>
      </ListItem>
   )
}

export default TaskItem
