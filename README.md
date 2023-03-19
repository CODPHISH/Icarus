本项目是一个仿 ChatGPT 项目，可免费部署到 Vercel，部署后无需翻墙即可使用

> 需要在首页填写自己的 API-KEY

技术栈
前端：React + Unocss + Vite
后端：基于 vercel 无服务函数和边缘函数

## 如何使用？

#### 安装

```sh
pnpm i -g vercel
```

#### 开发环境

```sh
vercel dev
```

> 由于 OpenAI API 墙了，本地开发需要开代理，部署到 vercel 后不需要代理

## 如何部署?

进 vercel 官网手动部署，或

```sh
vercel --prod
```
