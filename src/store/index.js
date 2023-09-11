import { createStore } from "vuex";
import { auth } from "./auth.module";
import { project } from "@/store/project.module";
import { user } from "@/store/user.module";

const store = createStore({
    modules: {
        auth,
        project,
        user
    },
});

export default store;