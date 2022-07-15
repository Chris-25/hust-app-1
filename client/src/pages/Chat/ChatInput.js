import React, { useState } from "react";
import { Button, Container } from "@material-ui/core";

export default function ChatInput({ handleSendMsg }) {
	const [msg, setMsg] = useState("");

	const sendChat = (event) => {
		event.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg("");
		}
	};

	return (
		<Container style={{ maxWidth: "unset" }}>
			<form
				className="input-container"
				style={{ display: "flex", width: "100%", marginTop: "5px" }}
				onSubmit={(event) => sendChat(event)}
			>
				<input
					type="text"
					placeholder=""
					style={{
						border: "solid black 1px",
						width: "100%",
						padding: "10px",
						borderRadius: "5px",
					}}
					onChange={(e) => setMsg(e.target.value)}
					value={msg}
				/>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					style={{
						color: "white",
						marginLeft: "20px",
						backgroundColor: "#aa261b",
					}}
				>
					Gửi
				</Button>
			</form>
		</Container>
	);
}
