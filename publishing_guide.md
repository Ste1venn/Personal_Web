
## 内容发布指南 (Publishing Guide)

目前的系统分为两个部分：**前端展示**（网页上看到的卡片）和 **AI 知识库**（聊天助手知道的内容）。发布新内容时，通常需要同时更新这两个部分。

### 1. 更新前端展示 (Visual Cards)
网页上的文章/项目卡片目前是静态存储在前端代码中的。要添加新卡片，请按照以下步骤操作：

### 1. 更新前端展示 (Visual Cards)
**现在非常简单！你不需要修改代码了。**

**操作步骤**:
1. 确定你要发布到哪个板块：`product` (产品), `ai` (人工智能), 或 `entrepreneurship` (创业)。
2. 在 `frontend/src/content/[板块名]/` 文件夹下新建一个 Markdown 文件 (例如 `my-new-project.md`)。
3. 在文件开头添加以下格式的信息头（Frontmatter）：

```markdown
---
title: 我的新文章标题
description: 这里写文章的简短介绍...
tags: [标签1, 标签2]
date: Oct 2025
---

这里可以写正文内容（目前主要是标题和描述会显示在卡片上，正文暂时未显示，但未来详情页会用到）。
```
4. 保存文件。**网页会自动检测到新文件并刷新显示！**

**文件位置**:
- Product: `frontend/src/content/product/`
- AI: `frontend/src/content/ai/`
- Entrepreneurship: `frontend/src/content/entrepreneurship/`

### 2. 插入图片 (Insert Images)
要在文章中插入图片，建议使用以下标准流程：

1. **存放图片**: 将图片文件放入 `frontend/public/images/articles/` 文件夹。
2. **Markdown 引用**: 在文章中使用以下标准 Markdown 语法：
   ```markdown
   ![图片描述(Alt Text)](/images/articles/你的图片名.png "可选的图片标题")
   ```
   *注意：路径必须以 `/` 开头，直接指向 `public` 目录下的路径。*

### 3. 更新 AI 知识库 (AI Knowledge Base)
为了让网页右下角的 AI 助手能够回答关于你新内容的问题，你需要将详细内容告诉它。

**操作步骤**:
1. **准备内容**: 将你的详细文章或项目文档保存为 Markdown (`.md`) 格式。
2. **上传文件**: 将 `.md` 文件放入项目的 `data/` 文件夹中。
   - 路径: `/Users/Steven/Desktop/technology/Personal_Web/data/`
3. **刷新知识库**: 
   - 确保后端服务正在运行 (`uvicorn main:app --reload`).
   - 在终端执行以下命令通知 AI 重新学习：
     ```bash
     curl -X POST http://localhost:8000/api/refresh
     ```
   - 或者，你也可以重启后端服务。

---
**总结**: 
- 想让**人**看到 -> 修改前端 `.tsx` 代码。
- 想让**AI** 知道 -> 上传 Markdown 到 `data/` 并刷新。
