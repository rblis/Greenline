import React, {useState} from 'react';
import './CardTableStyles.css';
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

interface Props {
    columns: any,
    rawData: any    
}

type Column = {
    header: string,
    accessorKey: string,
    cell: any
}

function CardTable({columns, rawData}: Props) {      

    const [data, setData] = useState(rawData);
    const initialState = {
        columnVisibility: {
            'id': false
        }
    };
    const table = useReactTable({
       data,
       columns, 
       getCoreRowModel: getCoreRowModel(),
       initialState
    }); 
    
    function checkEnds(index: number) {
        return index != 0 ? 'card_table_header_item' :  'card_table_cell_item_ends';
    }
    
    return (
        <table className={'table flex_col'}>
            <thead>
                {table.getHeaderGroups().map((group: any, index: number) => (
                    <tr className={'card_table_header'} key={index}>
                        {group.headers.map( (header: any, index: number) => (
                            <th className={checkEnds(index)} key={index}>
                                {header.column.columnDef.header}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row: any, index: number) => (
                    <tr className={'card_table_cell'} key={index}>
                        {row.getVisibleCells().map((cell: any, index: number) => (
                            <td className={'card_table_cell_item'} key={index}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>                     
                 ))}
            </tbody>
        </table>
    );
}
export default CardTable;