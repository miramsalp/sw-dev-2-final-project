export function Table({ columns, children }: { columns: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-black text-left text-sm">
        <thead>
          <tr className="border-b border-black">
            {columns.map((c) => (
              <th key={c} className="p-2">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-black">{children}</tr>;
}

export function Td({ children, colSpan }: { children?: React.ReactNode; colSpan?: number }) {
  return (
    <td className="p-2" colSpan={colSpan}>
      {children}
    </td>
  );
}
