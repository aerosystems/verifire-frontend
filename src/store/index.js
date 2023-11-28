import { createStore } from "vuex";
import { auth } from "./auth.module";
import { project } from "@/store/project.module";
import { user } from "@/store/user.module";
import { subscription } from "@/store/subscription.module";
import { ui } from "@/store/ui.module";

const store = createStore({
    modules: {
        auth,
        project,
        user,
        subscription,
        ui,
    },
});

export default store;