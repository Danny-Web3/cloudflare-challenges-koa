import Koa from "koa";
import axios from "axios";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router
    .get("/", (ctx, next) => {
        ctx.body = "Hello World!";
    })
    .post("/login", async (ctx: any, next) => {
        const turnstileToken = ctx.request.body["cf-turnstile-response"];
        const secretKey = process.env.SECRET_KEY!;

        try {
            let formData = new FormData();
            formData.append("secret", secretKey);
            formData.append("response", turnstileToken);

            const response = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", formData);
            if (response.data.success) {
                // Token is valid, proceed with login
                const username = ctx.request.body.username;
                const password = ctx.request.body.password;
                console.log({ username, password });
                // Your login logic here
                ctx.body = "Login successful";
            } else {
                ctx.status = 400;
                ctx.body = "Turnstile verification failed";
            }
        } catch (error: any) {
            console.log(error);
            ctx.status = 500;
            ctx.body = "Turnstile verification failed";
        }
    });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
