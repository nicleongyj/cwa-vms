import { Router } from "express";
import { supabase } from "../../lib/supabase";

const route = Router();

export default (app: Router) => {
    app.use("/auth", route);

    route.get("/confirm", async function (req, res) {
        /**
         * Verifies the one time password link sent to confirm a user's email
         */
        const token_hash = String(req.query.token_hash);
        const type = req.query.type;
        const next = String(req.query.next ?? "/");

        if (token_hash && type === "email") {
            const { error } = await supabase.auth.verifyOtp({
                type,
                token_hash,
            });
            if (!error) {
                res.redirect(303, `http://localhost:5173/${next.slice(1)}`);
                return;
            }
            console.log(error);
        }

        // return the user to an error page with some instructions
        res.redirect(303, "http:localhost:5173/auth/auth-code-error");
    });
};
