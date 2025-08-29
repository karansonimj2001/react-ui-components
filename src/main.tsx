import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const demoUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
]

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof User, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof User, sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' as keyof User, sortable: true },
]

function App() {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">React UI Components</h1>
          <p className="text-gray-600">Production-ready components built with React + TypeScript + TailwindCSS</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">InputField Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Default Input"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <InputField
              label="Password with Toggle"
              type="password"
              showPasswordToggle
              placeholder="Enter password..."
            />
            <InputField
              label="Input with Clear Button"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              showClearButton
              placeholder="Type to enable clear..."
            />
            <InputField
              label="Error State"
              errorMessage="This field is required"
              invalid
              placeholder="This input has an error"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">DataTable Component</h2>
          <DataTable
            data={demoUsers}
            columns={columns}
            selectable={true}
            onRowSelect={(selected) => console.log('Selected:', selected)}
          />
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Check out Storybook for more examples and component documentation</p>
          <p className="mt-2">Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run storybook</code></p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
