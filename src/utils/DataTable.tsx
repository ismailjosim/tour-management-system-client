/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/DataTable.tsx
import { type ReactNode } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableSkeleton from '@/components/layout/TableSkeleton';

interface Column {
  key: string;
  header: string;
  className?: string;
  render?: (value: any, item: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  emptyMessage?: string;
}

const DataTable = ({
  columns,
  data,
  isLoading,
  emptyMessage = 'No data available',
}: DataTableProps) => {
  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={5} />;
  }

  return (
    <div className="border-muted overflow-x-auto rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`px-4 py-3 text-left font-semibold ${column.className ?? ''}`}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item._id || index}>
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-2 ${column.className ?? ''}`}>
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
