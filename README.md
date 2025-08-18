<img width="1456" height="694" alt="image" src="https://github.com/user-attachments/assets/eb2713c0-a7cd-4d30-856d-bbbecd6ba119" />



## 🧰 Frontend-документация проекта [dvasoroksem.com]

**Тип проекта:** Лендинг + админ-панель для рекламного агентства  
**Целевая аудитория:** клиенты агентства и администраторы контента

### 1. 🚀 Установка и запуск

```bash
git clone https://github.com/bashkanitto/dvasoroksem.git
cd dvasoroksem
npm install
npm run dev
```

#### Сборка
```bash
npm run build
```

---

### 2. 📂 Структура проекта

```
/public
  /images       # Изображения
  /icons        # Иконки
  /fonts        # Шрифты

/src
  /app
    /api                # API-роуты Next.js (статьи, отзывы, проекты и т.д.)
    /admin              # Интерфейс админки
    /[locale]           # Локализованные страницы
    layout.tsx
    not-found.tsx
    page.tsx
|
  /components           # Переиспользуемые UI-компоненты
    Header.tsx
    Footer.tsx
    CustomInput.tsx
    CustomButton.tsx
    AnimationSection.tsx
    ...

  /features             # Модульные фичи (UI + API)
    /about
    /articles
    /reviews
    /feedbacks
    /cases

  /firebase             # Настройка Firebase клиента
    client.ts

  /store                # MobX-хранилища
    AuthStore.ts
    index.ts

  /shared               # Константы, хуки
    /constants/colors.ts
    /hooks/useAuth.ts

  /i18n                 # Мультиязычность (next-intl)
    messages/ru.json
    messages/en.json
    navigation.ts
    routing.ts
    request.ts

  /styles
    globals.css         # Глобальные стили

.env.local              # Переменные окружения
middleware.ts           # Middleware для локали

```

---

### 3. 🤖 Технологии

| Технология         | Назначение                         |
|--------------------|------------------------------------|
| Next.js            | SSR и маршрутизация                |
| TypeScript         | Типизация                          |
| MobX               | Состояние приложения               |
| Tailwind CSS       | Утилитарная стилизация             |
| Firebase           | Auth и база данных                 |
| Axios              | Запросы к API                      |
| Framer Motion      | Анимации                           |
| Next intl          | Мультиязычность                    |
| Lucide-react       | Иконки                             |
| Vercel             | Деплой                             |

---

### 4. 🎨 Стили

- Tailwind CSS: utility-first подход
- Глобальные стили: src/styles/globals.css
- Цветовая палитра в shared/constants/colors.ts

---

### 5. 📦 MobX Store

- Хранилище авторизации: store/AuthStore.ts
- Все сторы оборачиваются в makeAutoObservable
- Используйте observer() для реактивных компонентов

---

### 6. 🌍 Мультиязычность

- Используется next-intl
- Поддержка локалей ru и en
- Локализованные маршруты: src/app/[locale]/...
- Файлы перевода: i18n/messages/ru.json, en.json


---

### 7. 🔄 API и серверные маршруты

- API-роуты находятся в src/app/api/...
- Реализованы как server actions для:
- Статей (articles/route.ts)
- Отзывов (reviews/route.ts)
- Проектов, кейсов и фидбэков
- Связанная логика запросов: в features/<module>/api

---

### 8. 🛤️ Роутинг

- Используется App Router (Next.js)
- Группировка по локали: [locale]/about, [locale]/services, и т.д.
- Админ-панель в /admin
- Middleware для локали: middleware.ts

---

### 9. 📚 Гайды

## Новая локализованная страница:
- Добавьте папку в app/[locale]/your-page и переводы в i18n/messages

## Добавление API:
- Создайте файл route.ts в app/api/your-resource/

## Добавление MobX store:
- store/YourStore.ts → экспортируйте и добавьте в store/index.ts

### 10. 🛠️ Роли и доступ
Админ-панель /admin защищена авторизацией Firebase.
Доступ получают только авторизованные пользователи с соответствующей ролью.

