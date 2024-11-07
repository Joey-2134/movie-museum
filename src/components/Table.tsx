import {TableProps} from "../types/types.ts";

export default function Table<T>({ columns, data }: TableProps<T>) {

    return (
        <table className="tableContent">
            <thead>
            <tr>
                {columns.map((column: string) => (
                    <th className="header">{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map(entry => (
                <tr>
                    {
                        Object.values(entry).slice(1, Object.values(entry).length).map((value: any) => (
                        <td>{value}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )

}
