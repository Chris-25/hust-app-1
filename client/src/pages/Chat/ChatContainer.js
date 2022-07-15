import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import messageApi from "../../api/message";

export default function ChatContainer({ currentChat, socket }) {
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const user = JSON.parse(localStorage.getItem("profile"));

	const handleSendMsg = async (msg) => {
		socket.current.emit("send-msg", {
			to: currentChat._id,
			from: user.result._id,
			msg,
		});
		await messageApi.sendMessage({
			from: user.result._id,
			to: currentChat._id,
			message: msg,
		});

		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg });
		setMessages(msgs);
	};

	useEffect(() => {
		const messages = async () => {
			const response = await messageApi.receiveMessage({
				from: user.result._id,
				to: currentChat._id,
			});

			setMessages(response.data);
		};
		messages();
	}, [currentChat]);

	useEffect(() => {
		const getCurrentChat = async () => {
			if (currentChat) {
				await JSON.parse(localStorage.getItem("profile")).result._id;
			}
		};
		getCurrentChat().then((r) => {});
	}, [currentChat]);

	useEffect(() => {
		let listener = (msg) => {
			setArrivalMessage({ fromSelf: false, message: msg });
		};

		if (socket.current) {
			socket.current.on("msg-receive", listener);
		}
		return () => socket.current.off("msg-receive", listener);
	});

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<Container style={{ background: "white" }}>
			<div className="chat-header" style={{ background: "#aa261b" }}>
				<div className="user-details">
					<div className="username">
						<h3>{currentChat.name}</h3>
					</div>
				</div>
			</div>
			<div className="chat-messages">
				{messages.map((message) => {
					return (
						<div ref={scrollRef} key={uuidv4()}>
							<div
								className={`message ${
									message.fromSelf ? "sended" : "recieved"
								}`}
							>
								<div
									className="content "
									style={{
										fontSize: "12px",
										background: "#3f51b5",
										color: "white",
										padding: "5px",
										minWidth: "50px",
										paddingLeft: "10px",
									}}
								>
									<p
										style={{
											marginTop: "1px",
											marginBottom: "1px",
										}}
									>
										{message.message}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<ChatInput handleSendMsg={handleSendMsg} />
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 80% 10%;
	gap: 0.1rem;
	overflow: hidden;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-rows: 15% 70% 15%;
	}

	border-radius: 20px;
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20px;
		padding: 0 2rem;
		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;
			.avatar {
				img {
					height: 3rem;
				}
			}
			.username {
				h3 {
					color: white;
				}
			}
		}
	}
	.chat-messages {
		padding: 1rem 2rem;
		display: flex;
		background-color: white;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.message {
			display: flex;
			align-items: center;
			.content {
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;
				color: #d1d1d1;
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					max-width: 70%;
				}
			}
		}
		.sended {
			justify-content: flex-end;
		}
		.recieved {
			justify-content: flex-start;
		}
	}
`;
