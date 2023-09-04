import React from "react";

import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
	return (
		<div className="content">
			<Promo />
			<NavTab />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Portfolio />
		</div>
	);
}

export default Main;