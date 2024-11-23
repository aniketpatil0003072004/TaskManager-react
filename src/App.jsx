import { useState, useEffect } from 'react'
import { createBrowserRouter, Link, useNavigate, RouterProvider } from 'react-router-dom'
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
import { LoadingSpinner } from './components/LoadingSpinner'


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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="p-12 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">Login</h1>
        {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Username</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-lg">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="p-12 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">Create Account</h1>
        {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Username</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-lg">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


function Navigation() {
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <nav className="flex flex-wrap justify-center gap-4 mb-8">
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
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-8">Welcome to Your To-Do List</h1>
      <Navigation />
      <h2 className="text-lg sm:text-2xl font-bold mb-4">About the Website</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
  const scheduledTaskIds = new Set();

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  const scheduleNotification = (task) => {
    const now = new Date().getTime();
    const taskTime = new Date(task.dueDate).getTime();
  
    console.log('Current Time:', now);
    console.log('Task Time:', taskTime);
  
    if (!isNaN(taskTime) && taskTime > now) {
      const delay = taskTime - now; 
      console.log('Delay (ms):', delay);
  
      setTimeout(() => {
        console.log('Notification triggered');
        if (Notification.permission === 'granted') {
          new Notification('Task Reminder', {
            body: `Reminder: ${task.title} is due at ${new Date(task.dueDate).toLocaleTimeString()}`,
            icon: '/icon.png', 
          });
        }
      }, delay);
    } else {
      console.error('Invalid task time or task is already past due.');
    }
  };
  

console.log(scheduledTaskIds);

  
  


  useEffect(() => {
    tasks.forEach(task => {
      if (!scheduledTaskIds.has(task.id)) {
        scheduleNotification(task);
        scheduledTaskIds.add(task.id);
      }
    });
  }, [tasks]);
  
  

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
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-8">Welcome to Your To-Do List</h1>
      <Navigation />
      <h2 className="text-lg sm:text-2xl font-bold mb-4">To-Do List</h2>
      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-4 mb-8">
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
          <div key={task.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    loadTasks()
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const loadTasks = async () => {
    const auth = getAuth()
    const db = getFirestore()
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
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 sm:h-32 md:h-40 border"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate)
        return taskDate.toDateString() === date.toDateString()
      })

      days.push(
        <div key={day} className="h-24 sm:h-32 md:h-40 border p-1 overflow-y-auto">
          <div className="font-bold">{day}</div>
          {dayTasks.map(task => (
            <div key={task.id} className="text-xs sm:text-sm bg-green-100 rounded px-1 my-1 truncate">
              {task.title}
            </div>
          ))}
        </div>
      )
    }

    return days
  }

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1))
  }

  const isSmallScreen = windowWidth < 640 // Tailwind's sm breakpoint

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-8">Your Calendar</h1>
      <Navigation />
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          Previous
        </button>
        <h2 className="text-base sm:text-lg font-bold">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-center text-xs sm:text-sm">
            {isSmallScreen ? day.charAt(0) : day}
          </div>
        ))}
        {renderCalendar()}
      </div>
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
    return (
      <div className="flex h-[100vh] justify-center flex-col items-center">
        <LoadingSpinner />
      </div>
    )
  }

  return user ? <>{children}</> : null
}

export default function App() {
  const router = createBrowserRouter([
    {path:"/login",element:<Login/>},
    {path:"/register",element:<Register/>},
    {path:"/",element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"/todo",element:<ProtectedRoute><TodoList/></ProtectedRoute>},
    {path:"/calendar",element:<ProtectedRoute><Calendar/></ProtectedRoute>},
  ])
  return (
    <RouterProvider router={router}/>
  )
}

