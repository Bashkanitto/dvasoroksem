import { colors } from '@/shared/constants/colors'

type TableProps<T> = {
  data: T[]
  columns: { header: string; render: (item: T) => React.ReactNode }[]
}

export const CustomTable = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((c: any) => (
              <th
                className="px-4 py-2 text-left font-normal"
                style={{ color: colors.text }}
                key={c.header}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((c) => (
                <td className="px-4 py-2 text-left text-[14px]" key={c.header}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                Нет данных.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
