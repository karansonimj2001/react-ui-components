import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { Column, DataTableProps, SortConfig } from './types'

export function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id' as keyof T,
  emptyText = 'No data available',
  className = '',
  headerClassName = '',
  rowClassName = '',
  onRowClick,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: 'asc',
  })

  const getRowId = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] ?? index
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue === bValue) return 0
      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1

      const comparison = String(aValue).localeCompare(String(bValue))
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortConfig])

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleRowSelect = (rowId: string | number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId)
    } else {
      newSelected.add(rowId)
    }
    setSelectedRows(newSelected)

    if (onRowSelect) {
      const selectedRecords = sortedData.filter((record, index) =>
        newSelected.has(getRowId(record, index))
      )
      onRowSelect(selectedRecords)
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
      setSelectedRows(new Set())
      onRowSelect?.([])
    } else {
      const allIds = new Set(
        sortedData.map((record, index) => getRowId(record, index))
      )
      setSelectedRows(allIds)
      onRowSelect?.(sortedData)
    }
  }

  const getRowClass = (record: T, index: number): string => {
    const baseClass = 'border-b border-gray-200 hover:bg-gray-50 transition-colors'
    const selectedClass = selectedRows.has(getRowId(record, index)) 
      ? 'bg-blue-50 hover:bg-blue-100' 
      : ''
    const customClass = typeof rowClassName === 'function' 
      ? rowClassName(record, index) 
      : rowClassName
    const clickableClass = onRowClick ? 'cursor-pointer' : ''

    return [baseClass, selectedClass, customClass, clickableClass]
      .filter(Boolean)
      .join(' ')
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 text-gray-500 ${className}`}>
        {emptyText}
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead className={headerClassName}>
          <tr className="bg-gray-50">
            {selectable && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                `}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
              >
                <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  {column.title}
                  {column.sortable && sortConfig.key === column.dataIndex && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => {
            const rowId = getRowId(record, index)
            return (
              <tr
                key={rowId}
                className={getRowClass(record, index)}
                onClick={() => onRowClick?.(record, index)}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowId)}
                      onChange={() => handleRowSelect(rowId)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`
                      px-4 py-3 text-sm text-gray-900
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                    `}
                  >
                    {column.render
                      ? column.render(record[column.dataIndex], record, index)
                      : String(record[column.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
