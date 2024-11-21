'use client'

import { useState, useEffect } from 'react'
import {createBrowserRouter, BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, RouterProvider } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBEu8-1_hPMkBO7u0iOLRfCOhDc1Di2Tls",
  authDomain: "task-manager-e129c.firebaseapp.com",
  projectId: "task-manager-e129c",
  storageBucket: "task-manager-e129c.firebasestorage.app",
  messagingSenderId: "40697294895",
  appId: "1:40697294895:web:5019b222cd4f047566d6da"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, username, password)
      navigate('/')
    } catch (error) {
      setError('Failed to login. Please check your credentials.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-red-500">Register</Link>
      </p>
    </div>
  )
}


function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, username, password)
      navigate('/')
    } catch (error) {
      setError('Failed to create account')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-red-500">Login</Link>
      </p>
    </div>
  )
}


function Navigation() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <nav className="flex justify-center gap-4 mb-8">
      <Link to="/" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Home
      </Link>
      <Link to="/todo" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        To-Do List
      </Link>
      <Link to="/calendar" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Calendar
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Logout
      </button>
    </nav>
  )
}


function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your To-Do List</h1>
      <Navigation />
      <h2 className="text-2xl font-bold mb-4">About the Website</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          Organize Your Day, One Task at a Time!
        </div>
        <div className="p-4 bg-gray-100 rounded">
          Plan, Track, and Complete with Ease.
        </div>
        <div className="p-4 bg-gray-100 rounded">
          Visualize Your Schedule with Calendar View.
        </div>
        <div className="p-4 bg-gray-100 rounded">
          Set Reminders & Never Miss a Deadline.
        </div>
        <div className="p-4 bg-gray-100 rounded">
          Access Your To-Do List Anywhere, Anytime.
        </div>
        <div className="p-4 bg-gray-100 rounded">
          Simple, Syncable, and Always Up-to-Date!
        </div>
      </div>
    </div>
  )
}


function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const user = auth.currentUser
    if (!user) return

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const loadedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setTasks(loadedTasks)
  }

  const addTask = async (e) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user) return

    try {
      await addDoc(collection(db, 'tasks'), {
        userId: user.uid,
        title: newTask,
        dueDate: `${dueDate} ${dueTime}`,
        completed: false
      })
      setNewTask('')
      setDueDate('')
      setDueTime('')
      loadTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId))
      loadTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const toggleTask = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !completed
      })
      loadTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your To-Do List</h1>
      <Navigation />
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
      <form onSubmit={addTask} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Task
        </button>
      </form>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-100 rounded">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
                className="w-5 h-5"
              />
              <span className={task.completed ? 'line-through' : ''}>
                {task.title} (Due: {new Date(task.dueDate).toLocaleString()})
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


function Calendar() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const user = auth.currentUser
    if (!user) return

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const loadedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setTasks(loadedTasks)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-4 border"></td>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate)
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        )
      })

      days.push(
        <td key={day} className="p-4 border">
          <div className="font-bold">{day}</div>
          {dayTasks.map(task => (
            <div key={task.id} className="text-sm text-blue-600">
              {new Date(task.dueDate).toLocaleTimeString()} {task.title}
            </div>
          ))}
        </td>
      )
    }

 
    const weeks = []
    let week = []
    for (let i = 0; i < days.length; i++) {
      week.push(days[i])
      if (week.length === 7) {
        weeks.push(<tr key={`week-${i}`}>{week}</tr>)
        week = []
      }
    }
    if (week.length > 0) {
      weeks.push(<tr key="last-week">{week}</tr>)
    }

    return weeks
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your To-Do List</h1>
      <Navigation />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <div className="flex gap-4 items-center">
          <button onClick={previousMonth} className="px-4 py-2 bg-gray-200 rounded">&lt;</button>
          <span className="font-bold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="px-4 py-2 bg-gray-200 rounded">&gt;</button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border">Sun</th>
            <th className="p-4 border">Mon</th>
            <th className="p-4 border">Tue</th>
            <th className="p-4 border">Wed</th>
            <th className="p-4 border">Thu</th>
            <th className="p-4 border">Fri</th>
            <th className="p-4 border">Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  )
}


function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      if (!user) {
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <>{children}</> : null
}


export default function App() {
  const router = createBrowserRouter([
    {path:"/login",element:<Login/>},
    {path:"/register",element:<Register/>},
    {path:"/",element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"/todo",element:<ProtectedRoute><TodoList/></ProtectedRoute>},
    {path:"/calender",element:<ProtectedRoute><Calendar/></ProtectedRoute>},
  ])
  return (
    <RouterProvider router={router}/>
  )
}