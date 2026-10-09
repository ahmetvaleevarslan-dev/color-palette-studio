# GitHub Pages

## Публикация ColorStudio

1. Открой репозиторий на GitHub.
2. Перейди в **Settings → Pages**.
3. В **Build and deployment** выбери **Deploy from a branch**.
4. В качестве branch выбери `main` и папку `/ (root)`.
5. Нажми **Save**.

Через некоторое время GitHub Pages опубликует сайт.

## Проверка

Убедись, что `index.html`, `style.css`, `script.js` и `config.js` находятся в корне репозитория.

## Важно

ColorStudio использует Supabase для авторизации и хранения пользовательских данных. Перед публикацией проверь настройки Supabase и RLS-политики.
