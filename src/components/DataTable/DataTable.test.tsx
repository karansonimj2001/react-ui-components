import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from './DataTable'

interface TestData {
  id: number
  name: string
  email: string
  age: number
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
]

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof TestData, sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof TestData, sortable: true },
]

describe('DataTable', () => {
  test('renders table with data', () => {
    render(<DataTable data={mockData} columns={columns} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
  })

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} emptyText="No data found" />)
    
    expect(screen.getByText('No data found')).toBeInTheDocument()
  })

  test('handles row selection', () => {
    const handleRowSelect = jest.fn()
    render(
      <DataTable
        data={mockData}
        columns={columns}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    )
    
    const checkbox = screen.getAllByRole('checkbox')[1] // First data row checkbox
    fireEvent.click(checkbox)
    
    expect(handleRowSelect).toHaveBeenCalledWith([mockData[0]])
  })

  test('handles select all', () => {
    const handleRowSelect = jest.fn()
    render(
      <DataTable
        data={mockData}
        columns={columns}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    )
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0] // Header checkbox
    fireEvent.click(selectAllCheckbox)
    
    expect(handleRowSelect).toHaveBeenCalledWith(mockData)
  })

  test('sorts data by column', () => {
    render(<DataTable data={mockData} columns={columns} />)
    
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    
    // After sorting by name ascending, first row should be Bob Johnson
    const firstRowCells = screen.getAllByRole('cell')
    expect(firstRowCells[0]).toHaveTextContent('Bob Johnson')
  })

  test('handles row click', () => {
    const handleRowClick = jest.fn()
    render(
      <DataTable
        data={mockData}
        columns={columns}
        onRowClick={handleRowClick}
      />
    )
    
    const firstRow = screen.getByText('John Doe').closest('tr')
    fireEvent.click(firstRow!)
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0)
  })

  test('applies custom render function', () => {
    const customColumns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name' as keyof TestData,
        render: (value: string) => <strong>{value.toUpperCase()}</strong>,
      },
    ]
    
    render(<DataTable data={mockData} columns={customColumns} />)
    
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
    expect(screen.getByText('JOHN DOE').tagName).toBe('STRONG')
  })

  test('handles custom row key', () => {
    render(
      <DataTable
        data={mockData}
        columns={columns}
        rowKey={(record) => record.email}
      />
    )
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})
