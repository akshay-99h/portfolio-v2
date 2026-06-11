---
title: "Real-Time Features with WebSockets and Redis"
date: "2024-12-05"
excerpt: "How to build reliable real-time experiences with pub/sub, presence, and horizontal scaling."
tags: ["WebSockets", "Redis", "Realtime"]
readTime: 6
featured: false
---

## The scaling problem

One server handles thousands of socket connections. But as soon as you scale horizontally, you need state coordination across instances.

## Redis pub/sub as the backbone

```ts
const pub = redis.createClient();
const sub = pub.duplicate();

io.adapter(createAdapter(pub, sub));
```

## Presence and typing indicators

I store presence in Redis with short TTL keys and refresh on activity. It keeps the data lightweight and resilient to disconnects.

## Watch out for fan-out

Broadcasting to large rooms can blow up memory usage fast. Partition large rooms by region or use targeted channels for updates.
