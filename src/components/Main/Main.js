import React from "react";

import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
	return (
		<div className="content">
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
		</div>
	);
}

export default Main;
