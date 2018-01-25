import React, {Component} from 'react';
import './PivotTable.css'
import IconService from "../../../../service/IconService";

export default class PivotTable extends Component {

    renderRows = (rows) => rows.map(
        (row, index) =>
            <tr key={index}>
                {this.renderCells(row.cells)}
            </tr>
    );

    renderCells = (cells) => cells.map(
        (cell, index) =>
            <th key={index} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>
                {cell.label}
                {this.renderButtons(cell.commands)}
            </th>
    );

    renderButtons = (commands) => commands.map(
        (command, index) =>
            <span className='command-button' key={index} onClick={() => this.props.onCommand(command)}>
            {IconService.getTableOperationIcon(command.name)}
        </span>
    );

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
            return (
                <div>
                    Execute query to get table
                </div>
            );
        }
    }
};