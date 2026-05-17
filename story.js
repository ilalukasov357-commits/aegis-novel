const characters = {
  narrator: {
    name: "Система Aegis",
    role: "Протокол наблюдения",
    portrait: "assets/characters/director-wolf.png"
  },
  wolf: {
    name: "Директор Вольф",
    role: "Руководитель академии",
    portrait: "assets/characters/director-wolf.png"
  },
  robert: {
    name: "Роберт Соколов",
    role: "Курсант, сетевая безопасность",
    portrait: "assets/characters/robert-sokolov.png"
  },
  kiraLane: {
    name: "Кира Лейн",
    role: "Курсант, криптография",
    portrait: "assets/characters/kira-lane.png"
  },
  kiraMorgan: {
    name: "Кира Морган",
    role: "Курсант, интернет-мошенничество",
    portrait: "assets/characters/kira-morgan.png"
  }
};

const story = {
  start: {
    chapter: "Пролог",
    location: "Ночная академия Aegis",
    background: "assets/characters/director-wolf.png",
    lines: [
      {
        speaker: "narrator",
        text: "Институт Aegis никогда не спит. Даже глубокой ночью его башни продолжают анализировать угрозы, а студенты соревнуются за право стать частью закрытых операций."
      },
      {
        speaker: "wolf",
        text: "Сегодняшняя проверка не будет похожа на обычный экзамен. Кто-то внутри академии уже начал игру, правила которой знает только он."
      },
      {
        speaker: "wolf",
        text: "Тебе предстоит выбрать, кому доверять с первых минут: логике Роберта, интуиции Киры Лейн или социальному чутью Киры Морган."
      }
    ],
    choices: [
      { label: "Пойти к Роберту", next: "robert-brief" },
      { label: "Поговорить с Кирой Лейн", next: "kira-lane-brief" },
      { label: "Проверить, что знает Кира Морган", next: "kira-morgan-brief" }
    ]
  },
  "robert-brief": {
    chapter: "Ветвь Роберта",
    location: "Лаборатория сетевой защиты",
    background: "assets/characters/robert-sokolov.png",
    lines: [
      {
        speaker: "robert",
        text: "Я уже нашёл аномальный трафик на внутреннем узле. Кто-то маскирует передачу данных под учебные симуляции."
      },
      {
        speaker: "robert",
        text: "Если хочешь идти быстро, мы углубимся в логи прямо сейчас. Но будь готов: правда может вывести на кого угодно."
      }
    ],
    choices: [
      { label: "Вернуться к выбору союзника", next: "start" }
    ]
  },
  "kira-lane-brief": {
    chapter: "Ветвь Киры Лейн",
    location: "Криптографический архив",
    background: "assets/characters/kira-lane.png",
    lines: [
      {
        speaker: "kiraLane",
        text: "Шифр, который мы получили, слишком аккуратный для студента-паникёра. Это или демонстрация силы, или приглашение в ловушку."
      },
      {
        speaker: "kiraLane",
        text: "Я могу взломать защитный слой, но тогда тот, кто стоит за этим, поймёт, что мы приблизились. Решение должно быть точным."
      }
    ],
    choices: [
      { label: "Вернуться к выбору союзника", next: "start" }
    ]
  },
  "kira-morgan-brief": {
    chapter: "Ветвь Киры Морган",
    location: "Комната психологических симуляций",
    background: "assets/characters/kira-morgan.png",
    lines: [
      {
        speaker: "kiraMorgan",
        text: "Системы можно обмануть, людей гораздо интереснее читать. Кто бы ни начал эту операцию, он уже рассчитывает на наш страх."
      },
      {
        speaker: "kiraMorgan",
        text: "Я предлагаю сыграть в ответ. Один разговор в нужном тоне иногда ломает защиту лучше любого эксплойта."
      }
    ],
    choices: [
      { label: "Вернуться к выбору союзника", next: "start" }
    ]
  }
};
