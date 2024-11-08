import {Identifiable, TableProps} from "../types/types.ts";

export default function Table<T extends Identifiable>({columns, data, setSelectedIds, selectedIds = [], onDelete}: TableProps<T>) {
    const handleCheckBoxChange = (id: number) => {
        if (selectedIds.includes(id) && setSelectedIds) {
            setSelectedIds(selectedIds.filter((row: number) => row !== id));
        } else if (setSelectedIds) {
            setSelectedIds([...selectedIds, id]);
        }
    }

    const handleInputChange = (value: string) => {
        console.log(value);
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
                                checked={selectedIds.includes(entry.id as number)}
                                onChange={() => {
                                    handleCheckBoxChange(entry.id as number)
                                }}
                            />
                        </td>
                        {
                            Object.values(entry).slice(1).map((value: string | number, index: number) => (
                                <td key={index}>
                                    {selectedIds.includes(entry.id as number) ? (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                        />
                                    ) : (
                                        value
                                )}
                                </td>
                            ))
                        }
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={onDelete}>Delete</button>
            <button onClick={() => console.log("Update Clicked")}>Update</button>
        </>
    )

}
