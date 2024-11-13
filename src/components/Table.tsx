import {Identifiable, TableProps} from "../types/types.ts";
import {isStringOrNumber} from "../utils/helperFunctions.ts";

export default function Table<T extends Identifiable>({columns, data, setData, createData, setCreateData, setSelectedIds, selectedIds = [], onDelete, onUpdate, onSubmit}: TableProps<T>) {

    const handleCheckBoxChange = (id: number) => {
        if (selectedIds.includes(id) && setSelectedIds) {
            setSelectedIds(selectedIds.filter((row: number) => row !== id));
        } else if (setSelectedIds) {
            setSelectedIds([...selectedIds, id]);
        }
    }

    const handleInputChange = (value: string, key: string, id: number) => {
        if (!data || !setData) return;

        const itemIndex = data.findIndex((item) => item.id === id);
        const updatedData = [...data];
        updatedData[itemIndex] = {...updatedData[itemIndex], [key]: value};
        setData(updatedData);
    };

    const handleCreateInputChange = (value: string, key: string) => {
        if (!createData || !setCreateData) return;
        setCreateData({...createData, [key]: value});
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
                            Object.entries(entry)
                                .slice(1)
                                .map(([key,value], index: number) => (
                                    <td key={index}>
                                        {selectedIds.includes(entry.id as number) ? (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleInputChange(e.target.value, key, entry.id as number)}
                                            />
                                        ) : (
                                            value
                                    )}
                                    </td>
                            ))
                        }
                    </tr>
                ))}
                <tr key={"createRow"}>
                    <td></td>
                    {Object.entries(createData ?? {})
                        .slice(1) //remove id column
                        .filter(([, value]) => isStringOrNumber(value)) //filters out objects such as movieJSON or actorJSON
                        .map(([key, value], index) => (
                            <td key={index}>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleCreateInputChange(e.target.value, key)}
                                />
                            </td>
                        ))
                    }
                </tr>

                </tbody>
            </table>
            <div id={"buttonRow"}>
                <button className={"tableButton"} onClick={onDelete}>Delete</button>
                <button className={"tableButton"} onClick={onUpdate}>Update</button>
                <button className={"tableButton"} onClick={onSubmit}>Submit</button>
            </div>
        </>
    )

}
