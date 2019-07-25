import React from "react";

export class TyprSessionStats extends React.Component {
    render() {
        const statsList = this.props.keyPressLog.map((i, j) => {
            return (
                <li className="keyPressLog" key={j}>
                    {i.timestamp}, {i.event.key}, {i.char}, {i.className},{" "}
                    {i.wpmCounter}, {}
                </li>
            );
        });
        return (
            <div className="statsDisplay" key="0">
                <h2> timestamp, event.key, char, className, wpmCounter</h2>
                <ol>{statsList.slice(-10)}</ol>
            </div>
        );
    }
}
