# Запросы к API без Postman

> Лежит в корне `blog-api/`, а не в `src/` — это вспомогательный инструмент
> для разработки, а не код приложения. В сборку не попадает.

## Windows PowerShell — важно

В PowerShell `curl` — это псевдоним для `Invoke-WebRequest` с совершенно другим
синтаксисом. Пиши **`curl.exe`** с расширением, тогда вызовется настоящий curl
(он есть в Windows 10+ из коробки). Кавычки внутри JSON экранируются через `\"`.

В Git Bash / WSL всё проще — обычный `curl` и одинарные кавычки.

---

## Подготовка: создать юзера

Пока `UsersService` работает на массиве в памяти, юзера в базе создаём напрямую:

```bash
docker exec -it blog-db psql -U blog -d blog -c "INSERT INTO users (email, name) VALUES ('anna@test.com', 'Anna') RETURNING id;"
```

Запомни выданный `id` — он пойдёт в `authorId`.

Проверить, кто есть в базе:

```bash
docker exec -it blog-db psql -U blog -d blog -c "SELECT id, email, name FROM users;"
```

---

## Posts

### Создать

PowerShell:

```powershell
curl.exe -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{\"title\":\"Первый пост\",\"body\":\"Текст поста длиннее десяти символов\",\"authorId\":1}"
```

Git Bash / WSL:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Первый пост","body":"Текст поста длиннее десяти символов","authorId":1}'
```

### Получить все

```bash
curl.exe http://localhost:3000/posts
```

### Получить один

```bash
curl.exe http://localhost:3000/posts/1
```

### Обновить (PATCH — частично)

PowerShell:

```powershell
curl.exe -X PATCH http://localhost:3000/posts/1 -H "Content-Type: application/json" -d "{\"title\":\"Изменённый заголовок\"}"
```

Git Bash:

```bash
curl -X PATCH http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Изменённый заголовок"}'
```

### Удалить

```bash
curl.exe -i -X DELETE http://localhost:3000/posts/1
```

Флаг `-i` показывает заголовки ответа — нужен, чтобы увидеть код `204 No Content`,
ведь тела у ответа нет.

---

## Проверка валидации

Эти запросы должны падать с кодом 400 — так проверяется, что `ValidationPipe`
из дня 6 действительно работает.

Слишком короткий `title` (минимум 3 символа):

```powershell
curl.exe -i -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{\"title\":\"ab\",\"body\":\"Нормальный текст поста\",\"authorId\":1}"
```

Лишнее поле — сработает `forbidNonWhitelisted`:

```powershell
curl.exe -i -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{\"title\":\"Нормальный заголовок\",\"body\":\"Нормальный текст поста\",\"authorId\":1,\"isAdmin\":true}"
```

Несуществующий автор — должен быть 404 от `UsersService`:

```powershell
curl.exe -i -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{\"title\":\"Нормальный заголовок\",\"body\":\"Нормальный текст поста\",\"authorId\":999}"
```

Несуществующий пост — 404:

```bash
curl.exe -i http://localhost:3000/posts/99999
```

---

## Проверка, что данные легли в базу

Главная проверка дня 12 — пост должен пережить перезапуск приложения:

1. Создать пост запросом выше
2. Остановить приложение (`Ctrl+C`) и запустить заново (`bun run start:dev`)
3. `curl.exe http://localhost:3000/posts` — пост на месте

Посмотреть глазами базы:

```bash
docker exec -it blog-db psql -U blog -d blog -c "SELECT id, title, author_id FROM posts;"
```

Посты вместе с авторами через JOIN — то, что разбирали в дне 9:

```bash
docker exec -it blog-db psql -U blog -d blog -c "SELECT p.id, p.title, u.name AS author FROM posts p JOIN users u ON u.id = p.author_id;"
```
