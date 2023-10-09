import { createStore } from "vuex";
import { auth } from "./auth.module";
import { project } from "@/store/project.module";
import { user } from "@/store/user.module";
import { ui } from "@/store/ui.module";

const store = createStore({
    modules: {
        auth,
        project,
        user,
        ui,
    },
});

export default store;