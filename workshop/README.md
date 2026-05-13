# Funny Geese Workshop

Стартовый проект для мастер-класса CodeSpeak.

## Платформенные стартовые файлы

Для мобильных проектов используйте папку вашей платформы:

- `web/geese.spec.md`
- `android/AGENTS.md` и `android/geese.android.spec.md`
- `flutter/AGENTS.md` и `flutter/geese.flutter.spec.md`
- `ios/AGENTS.md` и `ios/geese.ios.spec.md`

`AGENTS.md` кладется рядом с проектом как подсказка агенту. Спека описывает intent для первого build.

## Запуск

```bash
cd web
codespeak init
codespeak build geese.spec.md
```

Для Web CodeSpeak должен создать простую HTML/JS-страницу. Откройте сгенерированный HTML-файл напрямую в браузере.

## Идея

Стартовая Web-спека описывает демо с веселыми гусями, которые летают по экрану. Для Web нужен только файл `web/geese.spec.md`; `AGENTS.md` используется в мобильных стартовых папках.
