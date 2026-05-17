const characters = {
  hero: {
    id: "hero",
    name: "Егор Громов",
    role: "Главный герой, курсант, анализ уязвимостей",
    portrait: "assets/characters/hero-egor-gromov.png",
    bio: "Новичок в академии Aegis. Быстро учится, замечает неочевидные детали и упрямо ищет истину даже там, где другие уже сдались."
  },
  wolf: {
    id: "wolf",
    name: "Директор Вольф",
    role: "Руководитель академии Aegis",
    portrait: "assets/characters/director-wolf.png",
    bio: "Холодный и расчётливый директор академии. Даже союзники не всегда понимают, какую игру он ведёт."
  },
  robert: {
    id: "robert",
    name: "Роберт Соколов",
    role: "Курсант, сетевая безопасность",
    portrait: "assets/characters/robert-sokolov.png",
    bio: "Один из сильнейших студентов по сетевой защите. Предпочитает факты, логи и точный анализ."
  },
  alex: {
    id: "alex",
    name: "Алекс",
    role: "Курсант академии Aegis",
    portrait: "assets/backgrounds/chapter-2-social-engineering.png",
    bio: "Курсант, хорошо понимающий поведенческие атаки и человеческий фактор в безопасности."
  },
  student: {
    id: "student",
    name: "Студент",
    role: "Курсант академии Aegis",
    portrait: "assets/backgrounds/chapter-2-social-engineering.png",
    bio: "Один из курсантов, работающих в лаборатории Aegis."
  },
  teacher: {
    id: "teacher",
    name: "Преподаватель",
    role: "Инструктор академии Aegis",
    portrait: "assets/backgrounds/chapter-2-testing-auditorium.png",
    bio: "Ведёт входное тестирование и оценивает базовую цифровую грамотность новых курсантов."
  },
  kiraLane: {
    id: "kiraLane",
    name: "Кира Лейн",
    role: "Курсант, криптография",
    portrait: "assets/characters/kira-lane.png",
    bio: "Гениальная криптографка с ледяным самообладанием. Замечает в системах то, что другие даже не ищут."
  },
  kiraMorgan: {
    id: "kiraMorgan",
    name: "Кира Морган",
    role: "Курсант, интернет-мошенничество",
    portrait: "assets/characters/kira-morgan.png",
    bio: "Читает людей так же уверенно, как другие читают код. Самая опасная улыбка во всей академии."
  },
  hacker: {
    id: "hacker",
    name: "Мавро",
    role: "Нарушитель, эксплуатация уязвимостей",
    portrait: "assets/characters/hacker-mavro.png",
    secret: true,
    bio: "Сергей — бывший студент академии Aegis. Был отчислен за нарушение внутреннего кодекса и попытку несанкционированного доступа к системе. Предпочитает действовать скрытно, используя чужие доступы и человеческий фактор."
  },
  unknown: {
    id: "unknown",
    name: "???",
    role: "Неизвестный источник",
    portrait: "assets/characters/hacker-mavro.png",
    bio: "Источник сообщения не установлен."
  },
  narrator: {
    id: "narrator",
    name: "Система Aegis",
    role: "Служебный протокол",
    portrait: "assets/characters/director-wolf.png",
    bio: "Системный голос академии, сопровождающий ключевые события."
  }
};

const codexOrder = ["hero", "wolf", "robert", "kiraMorgan", "hacker"];

const story = {
  start: {
    chapter: "Инцидент",
    chapterNumber: 3,
    location: "Оперативный зал Aegis • 21:00",
    background: "assets/backgrounds/chapter-3-incident-may14.png",
    defaultCharacter: "hero",
    backgroundPosition: "center 32%",
    backgroundSize: "cover",
    lines: [
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Ночь. Оперативный зал Aegis. Холодный свет, экраны с логами, карты сети и мониторинг подключений. Помещение выглядит слишком стерильно, будто здесь нельзя ошибаться даже в дыхании."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор заходит вместе с Кирой. Роберт уже у терминала. Вульф стоит у центрального стола и просматривает данные."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        unlock: "wolf",
        text: "Садитесь. Сегодня я хочу не просто показать вам систему. Я хочу показать вам, где она ломается."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        unlock: "hero",
        text: "А если ломается не система?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Тогда ломается человек. А это случается чаще."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        unlock: "kiraMorgan",
        text: "Поэтому вы нас собрали?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Именно. Безопасность в интернете не начинается с пароля. Она начинается с понимания, кому вы доверяете и почему."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        unlock: "robert",
        text: "И кто уже получил лишний доступ."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Верно. У нас есть следы подозрительной активности. Кто-то работает не снаружи, а через внутренние точки."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "То есть кто-то из своих?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Или кто-то, кого вы сами пустили внутрь."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        text: "НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "По всем экранам проходит короткая рябь."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Это уже не демонстрация."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Нет. Это контакт."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hacker",
        narration: true,
        text: "На большом экране появляется лицо Мавро. Связь активна, он не прячет своё присутствие."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        unlock: "hacker",
        text: "Наконец-то. Я уже думал, вы так и будете смотреть на свои мониторы, пока их не отключат."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Кто ты?"
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Тот, кто пользуется тем, что вы сами оставили открытым."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Внутренний канал. Он уже в системе."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Нет. Он не просто в системе. Он изучает нас."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Подтверждаю. Мавро использует старые учётные данные и протоколы, которые должны были быть закрыты."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Слово «должны» часто используют, когда хотят прикрыть ошибки."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Карта сети разворачивается в виде узлов: Email, Пароль, Код подтверждения, Облачный доступ, Общий аккаунт, Wi-Fi и Резервная копия."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Теперь работаем по инциденту. Одна ошибка — и атака уйдёт глубже."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Что мы должны делать?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Сначала понять, где именно начался вход. Потом отделить ложные следы от настоящих. И только потом — закрыть брешь."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Если успеете."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Связь не обрывается. Мавро будто специально ждёт реакции."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Он провоцирует нас."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Проверяет, кто сорвётся первым."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Именно поэтому вы здесь."
      },
      {
        type: "incidentGame",
        title: "Цепочка доверия",
        subtitle: "Локализуй атаку по шагам: найди слабое звено, изолируй угрозу и удержи контроль над сетью.",
        threatStart: 58,
        threatBranchThreshold: 50,
        failNext: "chapter-3-incident-low",
        progressLabel: "Шаг",
        questions: [
          {
            prompt: "Какой узел выглядит первым подозрительным?",
            hint: "Ищи то, что давно забыли закрыть.",
            options: [
              "Обычный экран мониторинга",
              "Старый общий аккаунт",
              "Резервная копия"
            ],
            correctAnswer: 1,
            correctFeedback: [
              "Верно.",
              "Старые общие аккаунты часто становятся слабым местом, если их не закрывают вовремя."
            ],
            wrongFeedback: [
              "Неверно.",
              "Первый реальный риск обычно в забытых общих доступах, а не в заметных элементах интерфейса."
            ]
          },
          {
            prompt: "Что нужно сделать первым после обнаружения подозрительного доступа?",
            hint: "Сначала останови распространение.",
            options: [
              "Изолировать узел",
              "Ответить Мавро в чате",
              "Перезагрузить весь зал"
            ],
            correctAnswer: 0,
            correctFeedback: [
              "Верно.",
              "Сначала нужно изолировать источник угрозы, иначе атака распространится дальше."
            ],
            wrongFeedback: [
              "Неверно.",
              "Без изоляции узла атака продолжит двигаться по сети."
            ]
          },
          {
            prompt: "Какой сигнал указывает на социальную инженерию?",
            hint: "Ищи давление и срочность.",
            options: [
              "Срочная просьба назвать код",
              "Официальный логотип",
              "Чёткая инструкция от Вульфа"
            ],
            correctAnswer: 0,
            correctFeedback: [
              "Верно.",
              "Срочность и запрос кода — типичный приём давления и обмана."
            ],
            wrongFeedback: [
              "Неверно.",
              "Признак социальной инженерии — именно давление и требование передать код."
            ]
          },
          {
            prompt: "Как безопаснее всего подтвердить личность отправителя?",
            hint: "Проверяй через независимый канал.",
            options: [
              "Перейти по ссылке из сообщения",
              "Проверить через официальный канал",
              "Отправить ответное фото"
            ],
            correctAnswer: 1,
            correctFeedback: [
              "Верно.",
              "Проверка через официальный канал безопаснее, чем доверие сообщению из атаки."
            ],
            wrongFeedback: [
              "Неверно.",
              "Нельзя подтверждать личность через тот же потенциально скомпрометированный канал."
            ]
          },
          {
            prompt: "Если часть системы уже скомпрометирована, что важнее всего сохранить?",
            hint: "Нужны данные для разбора атаки.",
            options: [
              "Логи и следы атаки",
              "Красивый интерфейс",
              "Все открытые окна"
            ],
            correctAnswer: 0,
            correctFeedback: [
              "Верно.",
              "Логи помогают понять, как именно проникли в систему и где уязвимость."
            ],
            wrongFeedback: [
              "Неверно.",
              "Без логов невозможно точно восстановить цепочку проникновения."
            ]
          },
          {
            prompt: "Что нужно сделать после локализации атаки?",
            hint: "Локализация — только половина работы.",
            options: [
              "Сообщить и проверить все доступы",
              "Оставить всё как есть",
              "Отключить только экран Мавро"
            ],
            correctAnswer: 0,
            correctFeedback: [
              "Верно.",
              "После атаки нужно проверить все доступы, иначе угроза вернётся через другую точку."
            ],
            wrongFeedback: [
              "Неверно.",
              "После локализации обязательно проверяют доступы и уведомляют ответственных."
            ]
          }
        ]
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Карта сети постепенно стабилизируется."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Он не входил силой. Он искал слабые привычки."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "И нашёл их быстрее, чем должен был."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Значит, он атакует не только систему. Он атакует людей."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Верно. Потому что люди — это самый короткий путь к любой сети."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Неплохо. Похоже, вы всё-таки умеете учиться."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Он остался на связи."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Потому что это только начало."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Нет. Потому что у него есть цель."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "И кто-то внутри академии уже помог ему сделать первый шаг."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Кто?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Вот это нам и предстоит выяснить."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Система на экране стабилизируется. Но тревога не исчезает."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Теперь ты понял, почему здесь нельзя доверять всему подряд?"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Да."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "И почему интернет — это не просто сайт и пароль."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Это среда, где ошибка одного человека становится проблемой для всех."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "До скорой встречи."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Соединение обрывается."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Он вернётся?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Обязательно."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "И к следующему разу вы должны быть готовы лучше, чем он рассчитывает."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Пошли. У нас теперь настоящая работа."
      }
    ],
    choices: [
      { label: "Вернуться в главное меню", action: "menu" }
    ]
  },
  "chapter-3-incident-low": {
    chapter: "Инцидент",
    chapterNumber: 3,
    location: "Оперативный зал Aegis • После инцидента",
    background: "assets/backgrounds/chapter-3-incident-may14.png",
    defaultCharacter: "hero",
    backgroundPosition: "center 32%",
    backgroundSize: "cover",
    lines: [
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Красные предупреждения на экранах постепенно исчезают. В зале становится тихо."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор смотрит на карту сети. Несколько узлов всё ещё отмечены как скомпрометированные."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Он успел пройти глубже, чем должен был."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Мы потеряли слишком много времени на неверные решения."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор молчит."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Отчёт."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Часть внутренних логов скомпрометирована. Несколько узлов пришлось отключить полностью."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "А Мавро получил достаточно времени, чтобы проверить архитектуру сети."
      },
      {
        speaker: "narrator",
        sceneCharacter: "wolf",
        narration: true,
        text: "Вульф переводит взгляд на Егора."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Ты понимаешь, где ошибся?"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Да."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Тогда скажи."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Я слишком долго сомневался. И реагировал уже после того, как проблема начала распространяться."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "В сетевой безопасности опоздание иногда опаснее самой ошибки."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Потому что угроза не ждёт, пока ты почувствуешь уверенность."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор опускает взгляд."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Я понял."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Нет. Пока только начинаешь понимать."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Тишина."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Если честно… я ожидала результат лучше."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор поднимает взгляд."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "После тестирования казалось, что ты быстрее адаптируешься к давлению."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Ты думаешь как обычный пользователь. Не как человек, который должен защищать систему."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "То есть я всё испортил?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Нет."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Все замолкают."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Если бы одна ошибка означала конец — никто бы не учился этой работе."
      },
      {
        speaker: "narrator",
        sceneCharacter: "wolf",
        narration: true,
        text: "Вульф подходит ближе к центральному экрану."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Но интернет-безопасность — это не теория. Твои ошибки всегда стоят кому-то времени, доступа или данных."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hacker",
        narration: true,
        text: "На экране внезапно снова появляется сообщение Мавро."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Вот теперь он начинает понимать."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Страшно не то, что систему можно взломать."
      },
      {
        speaker: "hacker",
        sceneCharacter: "hacker",
        text: "Страшно то, как медленно люди замечают, что уже впустили тебя внутрь."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Экран гаснет."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Тишина."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Он специально давит."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Потому что знает — сомнения мешают быстрее, чем страх."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор смотрит на погасший экран."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Тогда в следующий раз я не дам ему времени."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Хорошо."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Потому что следующий раз будет."
      }
    ],
    choices: [
      { label: "Вернуться в главное меню", action: "menu" }
    ]
  },
  "robert-brief": {
    chapter: "Приглашение",
    chapterNumber: 1,
    location: "Комната Егора",
    background: "assets/backgrounds/robert-room.png",
    defaultCharacter: "hero",
    backgroundPosition: "center 22%",
    backgroundSize: "cover",
    lines: [
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Тихая комната. За окном медленно падает дождь. Слабый синий свет от ноутбука освещает стол и лицо Егора."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        unlock: "hero",
        text: "«Поздно уже…»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Надо было закончить раньше.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он проводит рукой по клавиатуре. На экране — строки кода."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Хотя… ещё немного.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Капли дождя тихо стучат по стеклу. В комнате почти полная тишина."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Звук уведомления."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Хм?»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он переводит взгляд на экран. В углу всплывает новое письмо."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Письмо?»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Я ничего не ждал.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он открывает список писем, но не спешит нажимать."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "\"Aegis Institute\"…"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Никогда о таком не слышал.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Свет экрана отражается в его глазах. Он немного хмурится."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Может, спам…»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Хотя…"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Сначала проверю отправителя.»", isThought: true
      },
      {
        type: "question",
        prompt: "Что нужно сделать при получении подозрительного письма?",
        options: [
          "Сразу открыть письмо",
          "Проверить отправителя",
          "Перейти по ссылке"
        ],
        correctAnswer: 1,
        correctFeedback: [
          "Верно.",
          "Сначала нужно убедиться, кто отправитель: так проще заметить поддельный адрес до того, как ты откроешь письмо."
        ],
        wrongFeedback: [
          "Неверно.",
          "Сначала нужно убедиться, кто отправитель."
        ]
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор внимательно смотрит на адрес отправителя."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Адрес странный…»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Не похож на официальный.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он слегка откидывается на спинку стула."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Но письмо выглядит слишком… аккуратно.»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Без ошибок.»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Без давления.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он снова смотрит на экран."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Ладно.»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Открою, но осторожно."
      },
      {
        type: "popup",
        kicker: "Aegis Mail",
        title: "Приглашение на обучение",
        image: "assets/overlays/aegis-invitation-email.png",
        alt: "Письмо с приглашением в Institute Aegis"
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он медленно читает, не отрывая взгляда."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Почему я?"
      },
      {
        type: "question",
        prompt: "Что может указывать на фишинговое письмо?",
        options: [
          "Ошибки в адресе",
          "Официальный стиль",
          "Наличие логотипа"
        ],
        correctAnswer: 0,
        correctFeedback: [
          "Верно.",
          "Ошибки в адресе или домене часто выдают фишинг, даже если письмо выглядит аккуратно и официально."
        ],
        wrongFeedback: [
          "Неверно.",
          "Фишинговые письма часто содержат ошибки в адресе."
        ]
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор прищуривается, изучая детали письма."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Адрес подозрительный…"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Но текст написан грамотно."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "И никто ничего не требует."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Лёгкий шум дождя усиливается за окном."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Похоже на настоящее приглашение.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "В письме видна ссылка на сайт."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Тут есть ссылка…»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Но переходить так — плохая идея.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он открывает новую вкладку."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Попробую найти вручную.»", isThought: true
      },
      {
        type: "question",
        prompt: "Как безопаснее перейти на сайт?",
        options: [
          "Нажать ссылку в письме",
          "Ввести адрес вручную",
          "Открыть через сообщение"
        ],
        correctAnswer: 1,
        correctFeedback: [
          "Верно.",
          "Если ввести адрес вручную, ты не попадёшь на подменённую ссылку из письма и сможешь отдельно проверить сайт."
        ],
        wrongFeedback: [
          "Неверно.",
          "Лучше вводить адрес вручную."
        ]
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "На экране открывается сайт. Интерфейс строгий и минималистичный."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Есть сайт…»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Выглядит серьёзно.»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Описание программы…"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Контакты…"
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он прокручивает страницу."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "И форма заявки."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Комната остаётся тихой. Только свет экрана и звук дождя."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Они ищут новичков…»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«С аналитическим мышлением.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Похоже на меня.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он задерживается на кнопке отправки."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Ладно.»", isThought: true
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Попробую.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Экран на секунду замирает."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Заявка отправлена…"
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Почти сразу приходит ответ."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Так быстро?.."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "\"Ваша заявка принята\""
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он молча смотрит на экран."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Дождь за окном продолжается."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Похоже…"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Это только начало."
      }
    ],
    choices: [
      { label: "Продолжить сюжет", next: "chapter-2-social" }
    ]
  },
  "chapter-2-social": {
    chapter: "Начало",
    chapterNumber: 2,
    location: "Холл академии Aegis",
    background: "assets/backgrounds/chapter-2-hall-three.png",
    defaultCharacter: "hero",
    backgroundPosition: "center 44%",
    backgroundSize: "cover",
    lines: [
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор заходит в здание академии."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Холл просторный, холодный и слишком аккуратный. Свет — белый, почти стерильный. По стенам — экраны с данными, схемами, логами. Люди двигаются быстро, разговаривают тихо, никто не задерживается без причины."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Каждый с пропуском. Каждый знает, куда идёт."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор на секунду останавливается, всматривается в пространство."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        unlock: "hero",
        text: "«Здесь всё выглядит так, будто ошибка просто не предусмотрена.»", isThought: true
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        unlock: "kiraMorgan",
        text: "Ты долго будешь стоять или уже начнёшь понимать, где находишься?"
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Егор оборачивается. Кира стоит чуть в стороне, наблюдая за ним спокойно и без лишних эмоций."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Пытаюсь разобраться, куда меня вообще занесло — пока похоже не на учебное место, а на систему, где ты либо вписываешься, либо нет."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Так и есть. Здесь не объясняют правила — здесь смотрят, как быстро ты их сам находишь и сколько ошибок успеваешь сделать до этого."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Она делает шаг ближе, оценивающе смотрит."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Ты выглядишь спокойным. Либо умеешь держать себя, либо ещё не понял, что тебя уже начали проверять."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Если проверка уже идёт, то странно, что меня хотя бы не предупредили — обычно люди любят делать вид, что дают шанс подготовиться."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Подготовка — это всё, что у тебя уже есть. Больше никто ничего не даст."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Пауза. Она кивает в сторону коридора."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "У тебя сейчас входное тестирование. По нему решат, с какого уровня ты начинаешь и насколько быстро придётся тебя догонять."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Они идут по коридору. Шум постепенно исчезает, становится тише."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "То есть это не экзамен, а скорее способ понять, насколько я уже уязвим?"
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Именно. И поверь — большинство узнаёт о себе не то, что ожидали."
      },
      {
        speaker: "narrator",
        sceneCharacter: "robert",
        narration: true,
        text: "У двери аудитории стоит Роберт. Он не двигается, но явно всё слышал."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        unlock: "robert",
        text: "Если коротко — тест покажет не знания, а иллюзии о них. Обычно именно они мешают больше всего."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор смотрит на него."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Ты звучишь так, будто уже видел, как люди на этом сыпятся."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Постоянно. Люди уверены, что понимают безопасность, пока не сталкиваются с тем, как легко их можно обойти."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Кира спокойно добавляет."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Или насколько они сами делают это за других."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "И вы оба через это проходили?"
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Да. И каждый раз становится очевиднее, что проблема не в системе."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "А в человеке, который думает, что её контролирует."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Короткая тишина."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "И что будет, если я провалюсь?"
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Ничего критичного. Просто быстрее поймёшь, где именно слабое место."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Это и есть цель."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Она слегка кивает на дверь."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Иди. Чем раньше начнёшь, тем раньше станет ясно, с чем ты на самом деле работаешь."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Егор смотрит на дверь, затем на них."
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Понял."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Он открывает дверь и заходит внутрь."
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        background: "assets/backgrounds/chapter-2-hall-two.png",
        backgroundPosition: "center 44%",
        backgroundSize: "cover",
        location: "Коридор у аудитории",
        text: "Дверь закрывается. В коридоре остаются Кира и Роберт."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Думаешь, он из тех, кто делает выводы?"
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Да."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Почему?"
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Он слушает, прежде чем отвечать."
      },
      {
        speaker: "narrator",
        sceneCharacter: "robert",
        narration: true,
        text: "Роберт коротко кивает."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Тогда у него есть шанс."
      },
      {
        speaker: "narrator",
        sceneCharacter: "teacher",
        narration: true,
        background: "assets/backgrounds/chapter-2-testing-auditorium.png",
        backgroundPosition: "center 36%",
        backgroundSize: "cover",
        location: "Аудитория Aegis",
        text: "В это же время в аудитории загорается интерфейс теста."
      },
      {
        speaker: "teacher",
        sceneCharacter: "teacher",
        text: "Сегодня у вас входное тестирование."
      },
      {
        speaker: "teacher",
        sceneCharacter: "teacher",
        text: "Тема — безопасность в сети интернет."
      },
      {
        speaker: "teacher",
        sceneCharacter: "teacher",
        text: "Это не экзамен."
      },
      {
        speaker: "teacher",
        sceneCharacter: "teacher",
        text: "Это оценка вашего текущего уровня."
      },
      {
        speaker: "teacher",
        sceneCharacter: "teacher",
        text: "Начинаем."
      },
      {
        type: "test",
        kicker: "Institute Aegis",
        title: "Входное тестирование",
        subtitle: "Ответь на 6 вопросов. Результаты и объяснения появятся только после завершения.",
        questions: [
          {
            prompt: "Какой пароль является наиболее безопасным?",
            options: ["12345678", "qwerty2024", "T9#kL2!pQ7"],
            correctAnswer: 2,
            explanation: "Надёжный пароль должен быть длинным, случайным и содержать разные типы символов."
          },
          {
            prompt: "Какой признак чаще всего указывает на фишинг?",
            options: ["Красивый дизайн письма", "Срочность и давление", "Наличие логотипа"],
            correctAnswer: 1,
            explanation: "Фишинг заставляет действовать быстро, чтобы человек не проверял информацию."
          },
          {
            prompt: "Какой метод 2FA наиболее безопасен?",
            options: ["SMS", "Email", "Приложение-аутентификатор"],
            correctAnswer: 2,
            explanation: "Приложения-аутентификаторы защищены лучше, чем SMS."
          },
          {
            prompt: "Вы подключены к открытому Wi-Fi. Что делать?",
            options: ["Использовать VPN", "Вводить данные как обычно", "Игнорировать риск"],
            correctAnswer: 0,
            explanation: "VPN шифрует соединение и снижает риск перехвата."
          },
          {
            prompt: "Если пароль утёк, что нужно сделать?",
            options: ["Ничего", "Сменить только там", "Сменить везде, где он использовался"],
            correctAnswer: 2,
            explanation: "Повторное использование паролей делает все аккаунты уязвимыми."
          },
          {
            prompt: "Вас просят сообщить код подтверждения. Что это?",
            options: ["Проверка", "интернет-мошенничество", "Ошибка"],
            correctAnswer: 1,
            explanation: "Коды подтверждения нельзя передавать — это попытка получить доступ."
          }
        ],
        background: "assets/backgrounds/chapter-2-testing-auditorium.png",
        backgroundPosition: "center 36%",
        backgroundSize: "cover",
        location: "Аудитория Aegis"
      },
      {
        speaker: "narrator",
        sceneCharacter: "teacher",
        narration: true,
        text: "Экран гаснет."
      },
      {
        speaker: "narrator",
        sceneCharacter: "teacher",
        text: "ТЕСТ ЗАВЕРШЁН."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        text: "Студенты начинают вставать."
      },
      {
        speaker: "narrator",
        sceneCharacter: "hero",
        narration: true,
        background: "assets/backgrounds/chapter-2-hall-three.png",
        backgroundPosition: "center 44%",
        backgroundSize: "cover",
        location: "Коридор у аудитории",
        text: "Егор выходит в коридор. Кира стоит у стены."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Ну?"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "Понял одно."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Что?"
      },
      {
        speaker: "hero",
        sceneCharacter: "hero",
        text: "«Я знаю меньше, чем думал.»", isThought: true
      },
      {
        speaker: "narrator",
        sceneCharacter: "kiraMorgan",
        narration: true,
        text: "Кира слегка кивает."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Это хороший результат."
      },
      {
        speaker: "narrator",
        sceneCharacter: "robert",
        narration: true,
        text: "Рядом проходит Роберт."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        unlock: "robert",
        text: "Для начала."
      },
      {
        speaker: "narrator",
        sceneCharacter: "teacher",
        narration: true,
        background: "assets/backgrounds/chapter-2-briefing-2100.png",
        backgroundPosition: "center 38%",
        backgroundSize: "cover",
        location: "Аудитория Aegis",
        text: "В аудитории остаётся тихий шум, но напряжение уже спадает."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        unlock: "wolf",
        text: "Сегодня вы увидели, как выглядит входное тестирование."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "А вечером вы увидите, как выглядит настоящая атака."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Значит, это не конец урока?"
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Нет. Это его продолжение."
      },
      {
        speaker: "robert",
        sceneCharacter: "robert",
        text: "Тогда лучше не расходиться далеко."
      },
      {
        speaker: "narrator",
        sceneCharacter: "wolf",
        narration: true,
        text: "Пауза."
      },
      {
        speaker: "wolf",
        sceneCharacter: "wolf",
        text: "Егор, Кира, Роберт — в 21:00 в оперативном зале. Не опаздывать."
      }
    ],
    choices: [
      { label: "Продолжить сюжет", next: "start" }
    ]
  },
  "kira-lane-brief": {
    chapter: "Ветвь Киры Лейн",
    chapterNumber: 3,
    location: "Криптографический архив",
    background: "assets/characters/kira-lane.png",
    defaultCharacter: "kiraLane",
    backgroundPosition: "center 16%",
    lines: [
      {
        speaker: "kiraLane",
        sceneCharacter: "kiraLane",
        unlock: "kiraLane",
        text: "Шифр слишком чистый и слишком уверенный. Так не пишет человек в панике. Это демонстрация контроля."
      },
      {
        speaker: "kiraLane",
        sceneCharacter: "kiraLane",
        text: "Я могу вскрыть первый слой, но тогда автор сигнала поймёт, что мы вышли на его частоту. Ошибка здесь будет стоить нам инициативы."
      }
    ],
    choices: [
      { label: "Вернуться к начальному выбору", next: "start" }
    ]
  },
  "kira-morgan-brief": {
    chapter: "Ветвь Киры Морган",
    chapterNumber: 3,
    location: "Зал психологических симуляций",
    background: "assets/characters/kira-morgan.png",
    defaultCharacter: "kiraMorgan",
    backgroundPosition: "center 16%",
    lines: [
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        unlock: "kiraMorgan",
        text: "Систему можно обмануть кодом. Людей удобнее обманывать ожиданиями. Тот, кто начал всё это, уже рассчитывает на наш страх."
      },
      {
        speaker: "kiraMorgan",
        sceneCharacter: "kiraMorgan",
        text: "Если хочешь, я найду слабое звено не в сети, а в поведении. Иногда один разговор рушит защиту лучше любого эксплойта."
      }
    ],
    choices: [
      { label: "Вернуться к начальному выбору", next: "start" }
    ]
  }
};
