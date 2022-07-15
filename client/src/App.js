import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components";
import Router from "./Router";

const App = () => {
	return (
		<BrowserRouter>
			<Container maxWidth="xl">
				<Navbar />
				<Router />
			</Container>
		</BrowserRouter>
	);
};

export default App;
