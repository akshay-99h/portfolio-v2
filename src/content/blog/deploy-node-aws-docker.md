---
title: "Deploying Node.js to AWS with Docker"
date: "2025-01-20"
excerpt: "A minimal production path: containerize, push to ECR, deploy to ECS, and wire up secrets the right way."
tags: ["AWS", "Docker", "DevOps"]
readTime: 7
featured: true
---

## Containerize with a small image

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
CMD ["node", "dist/index.js"]
```

## Push to ECR

```bash
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
```

## ECS task definition notes

- Use task roles for AWS access, never access keys.
- Inject secrets from SSM Parameter Store.
- Configure autoscaling based on request count, not CPU alone.

## Health checks matter

Add both container and load balancer health checks or you'll chase phantom deploy failures.
