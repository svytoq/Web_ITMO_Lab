import React from 'react';
import '../css/resultTable.css';
import {useSelector} from "react-redux";

export default function ResultTable() {

    const points = useSelector(state => state.points.points);
    return (
        <div className="column">
            <div className="result_table">
                <table>
                    <thead>
                    <tr>
                        <th>Attempt #</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Attempt time</th>
                        <th>Process time</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        points.map((v) => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.x}</td>
                                <td>{v.y}</td>
                                <td>{v.r}</td>
                                <td>{new Date(v.attemptTime).toLocaleString()}</td>
                                <td>{v.processTime} ms</td>
                                <td>{v.success ? <span className="hit">HIT</span> : <span className="miss">MISS</span>}</td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}