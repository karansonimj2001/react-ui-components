export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: number | string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  rowKey?: keyof T | ((record: T) => string | number)
  emptyText?: string
  className?: string
  headerClassName?: string
  rowClassName?: string | ((record: T, index: number) => string)
  onRowClick?: (record: T, index: number) => void
}

export interface SortConfig<T> {
  key: keyof T | null
  direction: 'asc' | 'desc'
}
