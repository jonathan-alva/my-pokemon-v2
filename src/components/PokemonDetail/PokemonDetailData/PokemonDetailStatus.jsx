import React from 'react'
import startCase from "lodash/startCase";

const PokemonDetailStatus = (props) => {
    let stats = props.stats

    const graphClassName = (width) => {
        let className = "pokemon-detail-stat__graph";
        const barColor = 20;
        if (width <= barColor) {
          className += " -low";
        } else if (width > barColor && width <= barColor * 2) {
          className += " -medium";
        } else if (width > barColor * 2 && width <= barColor * 3) {
          className += " -high";
        } else if (width > barColor * 3 && width <= barColor * 4) {
          className += " -epic";
        }
        return className;
    };

    return(
        <div>
            <table className="pokemon-detail-stat__table" cellSpacing="0">
                <tbody>
                    {stats.map((stat) => {
                    return (
                        <tr key={stat.stat.name}>
                        <td>
                            <strong>{startCase(stat.stat.name)}</strong>
                        </td>
                        <td><span>{stat.base_stat}</span></td>
                        <td>
                            <div className="pokemon-detail-stat__graph-wrapper">
                            <div
                                className={graphClassName(
                                (stat.base_stat / 255) * 100
                                )}
                                style={{
                                width: (stat.base_stat / 255) * 100 + "%",
                                }}
                            ></div>
                            </div>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PokemonDetailStatus;