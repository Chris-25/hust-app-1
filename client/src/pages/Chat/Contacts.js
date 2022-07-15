import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const currentUser = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		setCurrentUserName(currentUser.result.name);
	}, []);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<Container>
			<div className="contacts">
				{contacts.map((contact, index) => {
					return (
						<div
							key={contact._id}
							className={`contact ${
								index === currentSelected ? "selected" : ""
							}`}
							onClick={() => changeCurrentChat(index, contact)}
						>
							<div className="username">
								<h3>{contact.name}</h3>
							</div>
						</div>
					);
				})}
			</div>
			<div className="current-user">
				<div className="username">{/* <h2>{currentUserName}</h2> */}</div>
			</div>
		</Container>
	);
}
const Container = styled.div`
	display: grid;
	grid-template-rows: 85% 15%;
	overflow: hidden;
	background-color: white;
	height: 100%;
	border-radius: 20px;
	border-right: 1px solid #d9d9d9;
	margin-right: 10px;
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		border-radius: 20px 20px 0 0;
		background: white;
		font-size: 12px;
		padding-top: 10px;
		padding-bottom: 50px;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			border: 1px solid #d9d9d9;
			min-height: 2rem;
			cursor: pointer;
			width: 90%;
			border-radius: 20px;
			padding: 0.3rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			transition: 0.5s ease-in-out;
			.avatar {
				img {
					height: 3rem;
				}
			}
			.username {
				h3 {
					padding: 0 10px;
					color: black;
				}
			}
		}
		.selected {
			background-color: #e6e6e6;
		}
	}

	.current-user {
		background: white;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		.username {
			h2 {
				color: white;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`;
