import {Identifiable, TableProps} from "../types/types.ts";

export default function Table<T extends Identifiable>({columns, data, setSelectedRows, selectedRows = [], onDelete}: TableProps<T>) {
    const handleCheckBoxChange = (id: number) => {
        if (selectedRows.includes(id) && setSelectedRows) {
            setSelectedRows(selectedRows.filter((row: number) => row !== id));
        } else if (setSelectedRows) {
            setSelectedRows([...selectedRows, id]);
        }
    }

    return (
        <>
            <table className="tableContent">
                <thead>
                <tr>
                    {columns.map((column: string, index: number) => (
                        <th className="header" key={index}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map(entry => (
                    <tr key={entry.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(entry.id as number)}
                                onChange={() => {
                                    handleCheckBoxChange(entry.id as number)
                                }}
                            />
                        </td>
                        {
                            Object.values(entry).slice(1).map((value: string | number, index: number) => (
                                <td key={index}>{value}</td>
                            ))
                        }
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={onDelete}>Delete</button>
        </>
    )

}
