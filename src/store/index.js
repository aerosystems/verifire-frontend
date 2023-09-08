import { createStore } from "vuex";
import { auth } from "./auth.module";
import { project } from "@/store/project.module";

const store = createStore({
    modules: {
        auth,
        project
    },
});

export default store;