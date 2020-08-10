import React from "react";

const ButtonComponent = (props) => {
  	return (
		<div>
			<button className="btn btn-primary">{props.text}</button>
		</div>
  	);
};

export default ButtonComponent;
