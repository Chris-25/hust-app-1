import React from "react";
import { Redirect } from "react-router-dom";
import { CreatorOrTag } from "../components";
import { Post, User } from "../pages/Admin";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";

export const PUBLIC_ROUTES = [
	{
		path: "/",
		exact: true,
		component: () => <Redirect to="/posts" />,
	},

	{
		path: "/posts",
		exact: true,
		component: Home,
	},

	{
		path: "/posts/search",
		exact: true,
		component: Home,
	},

	{
		path: "/posts/:id",
		exact: true,
		component: PostDetails,
	},

	{
		path: ["/creators/:name", "/tags/:name"],
		exact: false,
		component: CreatorOrTag,
	},
];

export const PRIVATE_ROUTES = [
	{
		path: "/profile",
		exact: true,
		component: Profile,
	},

	{
		path: "/chat",
		exact: true,
		component: Chat,
	},

	{
		path: "/admin/users",
		exact: true,
		component: User,
	},

	{
		path: "/admin/posts",
		exact: true,
		component: Post,
	},
];
