# Food Delivery App

## Описание проекта

Это приложение для доставки еды, разработанное с использованием React Native, Tailwind CSS, Expo и TypeScript на фронтенде, а также Django с Django REST Framework и Djoser на бэкенде.

## Функциональность

- Поиск ресторанов и меню.
- Просмотр подробной информации о блюдах и ресторанах.
- Добавление товаров в корзину и оформление заказа.
- Управление пользователями и аутентификация через JWT.

## Технологии

### Фронтенд

- **React Native**  
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjnyv5ek2a6qk88oUt76RCsdS5gqBiZ0Aog&s" alt="React Native" width="200"/>
  Основной фреймворк для мобильных приложений.

- **Tailwind CSS**  
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png" alt="Tailwind CSS" width="200"/>
  Утилитарный CSS-фреймворк для стилизации.

- **Expo**  
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCoY5tnQGvnq1fLi08ZxCRg1Vj6PN16PLLyQ&s" alt="Expo" width="200"/>
  Платформа для разработки и сборки приложений.

- **TypeScript**  
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="TypeScript" width="200"/>
  Статическая типизация для повышения надежности кода.

### Бэкенд

- **Django**  
  <img src="https://www.djangoproject.com/m/img/logos/django-logo-negative.svg" alt="Django" width="200"/>
  Веб-фреймворк для разработки бэкенда.

- **Django REST Framework**  
  <img src="https://www.django-rest-framework.org/img/logo.png" alt="Django REST Framework" width="200"/>
  Библиотека для создания RESTful API.

- **Djoser**  
  <img src="https://djoser.readthedocs.io/en/latest/_images/djoser_logo.png" alt="Djoser" width="200"/>
  Пакет для аутентификации и управления пользователями.

## Установка

### Фронтенд

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/ваш-репозиторий/food-delivery-app.git
    ```

2. Перейдите в директорию проекта:

    ```bash
    cd food-delivery-app
    ```

3. Установите зависимости:

    ```bash
    npm install
    ```

4. Запустите приложение:

    ```bash
    npm start
    ```

### Бэкенд

1. Создайте и активируйте виртуальное окружение:

    ```bash
    python -m venv env
    source env/bin/activate  # На Windows используйте `env\Scripts\activate`
    ```

2. Установите зависимости:

    ```bash
    pip install -r requirements.txt
    ```

3. Выполните миграции:

    ```bash
    python manage.py migrate
    ```

4. Запустите сервер:

    ```bash
    python manage.py runserver
    ```
