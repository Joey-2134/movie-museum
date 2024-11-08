import {TableProps} from "../types/types.ts";

export default function Table<T>({ columns, data, onDelete }: TableProps<T>) {

    const handleDelete = (firstName: string, lastName: string) => {
        onDelete(firstName, lastName);

        window.location.reload();
    }

    return (
        <table className="tableContent">
            <thead>
            <tr>
                {columns.map((column: string) => (
                    <th className="header">{column}</th>
                ))}
                <th className="header">
                 ACTIONS
                </th>
            </tr>
            </thead>
            <tbody>
            {data.map(entry => (
                <tr>
                    {
                        Object.values(entry).slice(1, Object.values(entry).length).map((value: any) => (
                        <td>{value}</td>
                    ))}
                    <td>
                        <button>Edit</button> {/*NOT IMPLEMENTED*/}
                        <button onClick={() => handleDelete((entry as any).firstName, (entry as any).lastName)}>Delete</button>
                    </td>
                </tr>
            ))}
            <tr>
                <td>
                <input type="text" />
                </td>
                <td>
                    <input type="text" />
                </td>
                <td>
                    <input type="text" />
                </td>
                <td>
                    <button>Create</button> {/*NOT IMPLEMENTED*/}
                </td>
            </tr>
            </tbody>
        </table>
    )

}
