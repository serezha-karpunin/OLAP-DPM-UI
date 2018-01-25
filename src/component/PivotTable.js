import React, {Component} from 'react';
import './PivotTable.css'
import IconService from "./IconService";
export default class PivotTable extends Component {
    renderRows(rows) {
        return rows.map((row, index) =>
            <tr key={index}>
                {row.cells.map((cell, index) =>
                    <th key={index} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                        {cell.label}
                        {this.renderButtons(cell.commands)}
                    </th>)}
            </tr>
        );
    }

    renderButtons(commands) {
        if (commands) {
            return (
                <span>
                    {commands.map((command, index) =>
                        <span key={index}>{IconService.getTableOperationIcon(command.name)}</span>
                    )}
                </span>
            )
        }
    }

    render() {
        const {data} = this.props;
        if (data) {
            const {header, body} = data;
            return (
                <table className="pivot-table">
                    <thead>
                    {this.renderRows(header.rows)}
                    </thead>
                    <tbody>
                    {this.renderRows(body.rows)}
                    </tbody>
                </table>
            );
        } else {
            return <div/>
        }
    }
}