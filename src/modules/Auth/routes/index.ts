import auth from "@/core/middleware/auth"
import guest from "@/core/middleware/guest"
import admin from "@/core/middleware/admin"

export default [{
    path: "/",
    name: "Home",     
    meta: { middleware: [guest], layout: "empty" },      
    component: () => import("@/modules/Auth/views/Home/Index.vue").then(m => m.default)
}, {
    path: "/login",
    name: "Login",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/modules/Auth/views/Login/Index.vue").then(m => m.default)
}, {
    path: "/register",
    name: "Register",    
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/modules/Auth/views/Register/Index.vue").then(m => m.default)
}, {
    path: "/profile",
    name: "profile",
    meta: { middleware: [auth] },
    component: () => import("@/modules/Auth/views/Profile/Index.vue").then(m => m.default),
}, {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/modules/Auth/views/Dashboard.vue").then(m => m.default)
}, {
    path: "/about",
    name: "About",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/modules/Auth/components/About.vue").then(m => m.default)
}, {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/modules/Auth/components/NotFound.vue").then(m => m.default),    
}]
