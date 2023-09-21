import React from "react";
function Placeholder(props) {
	return (
		<div className="placeholder">
			<h2 className="title_l placeholder__title">{props.text}</h2>
		</div>
	);
}

export default Placeholder;
