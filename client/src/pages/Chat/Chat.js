import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import userApi from "../../api/user";
import { host } from "../../api";

export default function Chat() {
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);

	const currentUser = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser.result._id);
		}
	}, [currentUser]);

	useEffect(() => {
		let contact = async () => {
			if (currentUser) {
				const data = await userApi.allUsers();
				setContacts(
					data.data.filter((user) => user._id !== currentUser.result._id)
				);
			}
		};
		contact();
	}, []);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<Container>
				<div className="container">
					<Contacts contacts={contacts} changeChat={handleChatChange} />
					{currentChat === undefined ? (
						<div
							style={{
								background: "white",
								textAlign: "center",
								alignContent: "center",
								paddingTop: "200px",
								fontSize: "30px",
								borderRadius: "20px",
							}}
						></div>
					) : (
						<ChatContainer currentChat={currentChat} socket={socket} />
					)}
				</div>
			</Container>
		</>
	);
}

const Container = styled.div`
	.container {
		height: 70vh;
		display: grid;
		border-radius: 20px;
		grid-template-columns: 25% 75%;
		border: solid 1px #d9d9d9;
		box-shadow: 2px 3px 3px 0px rgba(125, 125, 125, 0.76);
		-webkit-box-shadow: 2px 3px 3px 0px rgba(125, 125, 125, 0.76);
		-moz-box-shadow: 2px 3px 3px 0px rgba(125, 125, 125, 0.76);
	}
`;
