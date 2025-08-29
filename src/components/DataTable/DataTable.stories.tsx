import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { DataTable } from './DataTable'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    createdAt: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2023-04-05',
  },
]

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt' as keyof User,
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    onRowSelect: () => {},
    onRowClick: () => {},
  },
}

export default meta
type Story = StoryObj<typeof DataTable<User>>

export const Default: Story = {
  args: {
    data: mockUsers,
    columns,
  },
}

export const Selectable: Story = {
  args: {
    data: mockUsers,
    columns,
    selectable: true,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyText: 'No users found',
  },
}

export const WithCustomRowClick: Story = {
  args: {
    data: mockUsers,
    columns,
    onRowClick: () => {},
  },
}

export const WithCustomStyles: Story = {
  args: {
    data: mockUsers,
    columns,
    className: 'border border-gray-200 rounded-lg',
    headerClassName: 'bg-gray-100',
    rowClassName: (record: User) =>
      record.status === 'inactive' ? 'bg-gray-50 text-gray-400' : '',
  },
}

export const ComplexData: Story = {
  render: () => {
    const complexColumns = [
      {
        key: 'name',
        title: 'Full Name',
        dataIndex: 'name' as keyof User,
        sortable: true,
        width: '20%',
      },
      {
        key: 'email',
        title: 'Email Address',
        dataIndex: 'email' as keyof User,
        sortable: true,
        width: '25%',
      },
      {
        key: 'role',
        title: 'User Role',
        dataIndex: 'role' as keyof User,
        sortable: true,
        width: '15%',
        align: 'center' as const,
      },
      {
        key: 'status',
        title: 'Account Status',
        dataIndex: 'status' as keyof User,
        sortable: true,
        width: '15%',
        align: 'center' as const,
        render: (value: string) => (
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              value === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {value.toUpperCase()}
          </span>
        ),
      },
      {
        key: 'createdAt',
        title: 'Registration Date',
        dataIndex: 'createdAt' as keyof User,
        sortable: true,
        width: '25%',
        render: (value: string) => (
          <span className="text-gray-600">
            {new Date(value).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        ),
      },
    ]

    return (
      <DataTable<User>
        data={mockUsers}
        columns={complexColumns}
        selectable={true}
        className="border border-gray-200 rounded-lg shadow-sm"
        headerClassName="bg-gray-50 border-b border-gray-200"
      />
    )
  },
}
