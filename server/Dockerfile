# FROM gplane/pnpm:node19-bullseye
FROM denoland/deno:2.0.6

WORKDIR /app
# COPY package.json deno.json deno.lock index.ts /app/

# RUN deno install --allow-scripts=npm:bcrypt --entrypoint index.ts
# RUN deno install

COPY . .

RUN deno run --allow-all --unstable --allow-scripts=npm:bcrypt --node-modules-dir=auto index.ts

# 预先缓存和编译依赖项
RUN deno cache index.ts

EXPOSE 5080

CMD ["deno", "task", "dev"]