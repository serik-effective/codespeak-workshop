# CodeSpeak Workshop

Готовый статический репозиторий для публичного мастер-класса по CodeSpeak.

Цель мастер-класса: за 1 час показать цикл **спека -> build -> запуск -> изменение через спеку**. Участники идут по публичной инструкции, ведущий показывает HTML-слайды слева и терминал справа.

Каналы:

- Серик Бейсенов: https://t.me/beysenov_tech
- Effective: https://t.me/effectiveband

## Публичные страницы

После публикации через GitHub Pages:

- инструкция для участников: `https://serik-effective.github.io/codespeak-workshop/`
- слайды ведущего: `https://serik-effective.github.io/codespeak-workshop/slides/`

Локально эти страницы можно открыть напрямую в браузере:

- `index.html`
- `slides/index.html`

## Как включить GitHub Pages

1. Откройте репозиторий на GitHub.
2. Перейдите в `Settings` -> `Pages`.
3. В `Source` выберите `Deploy from branch`.
4. В `Branch` выберите `main`.
5. В `Folder` выберите `/root`.
6. Сохраните настройки.

GitHub Pages URL для этого репозитория: `https://serik-effective.github.io/codespeak-workshop/`.

## Перед публикацией

Основные URL уже подставлены:

- GitHub Pages: `https://serik-effective.github.io/codespeak-workshop/`
- репозиторий: `https://github.com/serik-effective/codespeak-workshop`
- папка после clone: `codespeak-workshop`

QR-код уже ведет на публичную инструкцию.

## Как обновить QR

QR лежит здесь:

- `assets/qr-placeholder.svg`

Если URL инструкции изменится, перегенерируйте этот файл с новой ссылкой. Имя файла можно оставить прежним, тогда HTML менять не придется.

## Как провести мастер-класс

Рекомендуемый формат экрана:

- слева: `slides/index.html`;
- справа: терминал;
- у участников открыта инструкция `index.html`.

Рекомендуемый тайминг:

| Блок | Время |
| --- | ---: |
| Введение и установка | 10 минут |
| Первое приложение | 15-20 минут |
| Фича через спеку | 7-10 минут |
| Takeover готового проекта | 10 минут, бонус |
| Вторая фича / финал | 5 минут, если осталось время |

Главная мысль, которую стоит повторять: **источник правды не код, а спека как описание намерения**. Мы меняем intent в спецификации, запускаем build, затем проверяем результат.

## Takeover-репозитории

- Android: https://github.com/effective-dev-opensource/Effective-Office
- iOS: https://github.com/JohnUfo/SmartSpend
- Flutter: https://github.com/a4studios04/SyncSpend
- CodeSpeak example: https://github.com/codespeak-dev/markitdown

Для Effective Office не делайте takeover всего репозитория. Для демо берите конкретную source-папку планшетной фичи:

```bash
codespeak init
codespeak takeover clients/tablet/feature/main/src/commonMain/kotlin -o tablet-main.spec.md
```

## Стартовые файлы

Платформенные стартовые файлы лежат в `workshop/`:

- Web: `workshop/web/geese.spec.md`
- Android: `workshop/android/AGENTS.md` и `workshop/android/geese.android.spec.md`
- Flutter: `workshop/flutter/AGENTS.md` и `workshop/flutter/geese.flutter.spec.md`
- iOS: `workshop/ios/AGENTS.md` и `workshop/ios/geese.ios.spec.md`

На странице инструкции участник выбирает платформу наверху, после этого ссылки скачивания и команда `codespeak build ...` подстраиваются автоматически. Если у участника не установлено мобильное окружение для Android, Flutter или iOS, рекомендуйте переключиться на Web.

## План Б

Если участник отстал, не просите его догонять в терминале. Пусть переключается наверху инструкции на платформу `Web` и делает самую простую Web-версию:

```bash
cd workshop/web
codespeak init
codespeak build geese.spec.md
```

Windows без заранее установленного WSL может занять слишком много времени. В этом случае участник переключается на Web-трек, а WSL ставит после мастер-класса.

## Что сделать перед выступлением

1. Опубликовать репозиторий через GitHub Pages.
2. Проверить публичные URL.
3. Проверить, что QR-код на слайдах ведет на публичную инструкцию.
4. Открыть инструкцию и слайды по публичным ссылкам.
5. Проверить, что ссылки на файлы в разделе скачивания работают.
6. Пройти команды установки на чистом терминале или заранее подготовленной машине.
7. Проверить, что Web-трек содержит только `workshop/web/geese.spec.md`.
