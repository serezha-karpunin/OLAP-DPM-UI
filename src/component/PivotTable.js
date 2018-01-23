import React, {Component} from 'react';
import './PivotTable.css'
export default class PivotTable extends Component {
    renderRows(rows) {
        return rows.map((row, index) =>
            <tr key={index}>
                {row.cells.map((cell, index) =>
                    <th key={index} colSpan={cell.colSpan} rowSpan={cell.rowSpan}>{cell.label}</th>)}
            </tr>
        );
    }

    render(){
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