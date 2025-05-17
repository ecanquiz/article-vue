import auth from "@/core/middleware/auth"
import admin from "@/core/middleware/admin"

export default [{
    path: "/articles",
    name: "articles",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/Datagrid/Index.vue").then(m => m.default)
}, {
    path: "/articles/create",
    name: "articleCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}, {
    path: "/articles/edit/:id(\\d+)",
    name: "articleEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/CreateOrEdit/Index.vue").then(m => m.default),
    props: true
}]
