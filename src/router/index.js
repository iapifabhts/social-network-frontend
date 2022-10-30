import { createRouter, createWebHistory } from "vue-router"
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import Profile from "../components/Profile.vue"
import Subscribers from "../components/Subscribers.vue"
import Subscriptions from "../components/Subscriptions.vue"
import People from "../components/People.vue"
import Feed from "../components/Feed.vue"
import Comments from "../components/Comments.vue"
import Empty from "../layouts/Empty.vue"

const routes = [
	{ path: "/", component: SignIn, name: "signIn", meta: { layout: Empty } },
	{ path: "/signUp", component: SignUp, name: "signUp", meta: { layout: Empty } },
	{ path: "/profile/:id", component: Profile },
	{ path: "/profile/:id/subscribers", component: Subscribers },
	{ path: "/profile/:id/subscriptions", component: Subscriptions },
	{ path: "/people", component: People },
	{ path: "/posts/:id/comments", component: Comments },
	{ path: "/feed", component: Feed },
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
