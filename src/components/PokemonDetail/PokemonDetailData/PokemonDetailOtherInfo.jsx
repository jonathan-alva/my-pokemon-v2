import React from "react";

const PokemonDetailOtherInfo = (props) => {
  let weight, height;
  try {
    weight = parseFloat(parseInt(props.weight) / 10);
  } catch (error) {
    weight = "???";
  }
  try {
    height = parseFloat(parseInt(props.height) / 10);
  } catch (error) {
    height = "???";
  }
  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <td>
              <img
                alt="Weight"
                className="other-info-icon"
                src={require("./../../../assets/images/weight.svg")}
                width="20"
              ></img>
            </td>
            <td>
              <strong>{weight} kg</strong>
            </td>
          </tr>
          <tr>
            <td>
              <img
                alt="Height"
                className="other-info-icon"
                src={require("./../../../assets/images/height.svg")}
                width="20"
              ></img>
            </td>
            <td>
              <strong>{height} m</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetailOtherInfo;
