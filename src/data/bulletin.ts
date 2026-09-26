import { BulletinAnnouncement } from '../lib/types';

export const PARISH_ANNOUNCEMENTS: BulletinAnnouncement[] = [
  {
    id: 'ann-concert-lp',
    date: '2026-12-02',
    category: 'event',
    important: true,
    title: {
      ja: 'LPで聴く名曲喫茶コンサート、チャイコフスキー「くるみ割り人形」',
      en: 'LP Record Concert: Tchaikovsky "The Nutcracker"',
      ru: 'Концерт классической музыки с виниловых пластинок: П.И. Чайковский «Щелкунчик»',
    },
    content: {
      ja: '12月2日（水）14:00より、大阪教会会館にて「LPで聴く名曲喫茶コンサート」を開催いたします。温かみのあるアナログレコードの音色で、チャイコフスキーの名作バレエ音楽「くるみ割り人形」を鑑賞します。どなたでもお気軽にご参加ください。',
      en: 'On Wednesday, December 2 at 2:00 PM, we will host an LP Record Classical Music Concert at the church hall. Enjoy the rich analog sound of Tchaikovsky’s beloved ballet masterpiece "The Nutcracker". Everyone is warmly welcome to join us!',
      ru: 'В среду, 2 декабря в 14:00 в приходском зале состоится концерт классической музыки с виниловых пластинок. Мы будем слушать бессмертный балет П.И. Чайковского «Щелкунчик» в теплом аналоговом звучании. Сердечно приглашаем всех желающих!',
    },
  },
  {
    id: 'ann-cemetery-panihida',
    date: '2026-11-08',
    category: 'event',
    important: false,
    title: {
      ja: '露軍兵士墓地パニヒダ（泉大津）',
      en: 'Memorial Service at Russian Soldiers’ Cemetery (Izumiotsu)',
      ru: 'Панихида на кладбище российских солдат в Идзумиоцу',
    },
    content: {
      ja: '11月8日（日）16:00より、泉大津市のロシア兵墓地にて永眠者のためのパニヒダ（追悼祈祷）を捧げます。',
      en: 'On Sunday, November 8 at 4:00 PM, a memorial service (Panikhida) will be held at the Russian Soldiers’ Cemetery in Izumiotsu for the repose of the departed.',
      ru: 'В воскресенье, 8 ноября в 16:00 на кладбище российских солдат в г. Идзумиоцу будет совершена панихида об упокоении душ усопших воинов.',
    },
  },
  {
    id: 'ann-1',
    date: '2026-10-11',
    category: 'event',
    important: true,
    title: {
      ja: '堂祭・生神女庇護祭 バーベキュー大会のお知らせ',
      en: 'Temple Feast & Annual Parish Barbecue Party',
      ru: 'Престольный праздник и традиционное приходское барбекю',
    },
    content: {
      ja: '10月11日（日）は当教会の聖堂名（生神女庇護）に由来する最大の祝日典礼です。10:00からの聖体礼儀の後、教会の庭にて恒例のバーベキュー親睦会を開催いたします。皆さまご家族・ご友人お誘い合わせの上、ぜひご参加ください！',
      en: 'Sunday, October 11 is the celebration day for our temple\'s name: The Feast of the Holy Protection of the Virgin Mary. Following the 10:00 AM Divine Liturgy, we will hold our annual celebratory Barbecue Party in the church garden. All parishioners, families, and guests are warmly invited!',
      ru: 'В воскресенье, 11 октября — престольный праздник нашего храма (в честь Покрова Пресвятой Богородицы). После Божественной литургии в 10:00 в саду при храме состоится традиционное праздничное барбекю. Приглашаем всех прихожан, друзей и гостей!',
    },
  },
  {
    id: 'ann-2',
    date: '2026-09-20',
    category: 'event',
    important: true,
    title: {
      ja: '敬老会（教会のお年寄りを敬愛する集い）',
      en: 'Respect for the Aged Parish Celebration',
      ru: 'День почитания старших прихожан',
    },
    content: {
      ja: '9月20日（日）の聖体礼儀後、教会のお年寄りに感謝と敬意を表してお祝い会を行います。長年教会を支えてくださった方々と温かい時間を過ごしましょう。若い世代の皆さまのお手伝い・ご協力をお願いいたします。',
      en: 'On Sunday, September 20, we will hold a special gathering to express our heartfelt gratitude and respect to the senior members of our church. We kindly ask our younger parishioners to assist with preparations and lunch service.',
      ru: '20 сентября после Литургии состоится праздник в честь пожилых прихожан нашего храма, посвященный выражению признательности за их многолетний труд и молитвы. Просим молодых прихожан оказать содействие в организации трапезы.',
    },
  },
  {
    id: 'ann-3',
    date: '2026-08-29',
    category: 'sunday_school',
    important: false,
    title: {
      ja: '光の子会（日曜学校：プログラミング体験＆パン作り）',
      en: 'Hikari no Ko-kai: Programming Workshop & Bread Baking',
      ru: 'Встреча «Хикари но Ко-кай» («Дети света»)',
    },
    content: {
      ja: '8月29日（土）午後1時より光の子会を開催します。今年はチャーチフレンズが中心となり、子ども向けプログラミング体験を行います。その後はみんなでパン作りを楽しみ、夕食を囲んで親睦を深めます。午後5時からの晩祷にみんなでお祈りして締めくくります。',
      en: 'On Saturday, August 29, starting at 1:00 PM, we will hold the "Hikari no Ko-kai" (Children of the Light). The "Church Friends" group will lead a hands-on programming activity. Afterward, we will make bread together, enjoy dinner, and attend the 5:00 PM Vespers service together.',
      ru: 'В субботу, 29 августа в 13:00 состоится встреча «Хикари но Ко-кай» («Дети света»). Группа «Друзья церкви» проведет практическое занятие по программированию. Затем мы займемся выпечкой хлеба, поужинаем и посетим вечерню в 17:00.',
    },
  },
  {
    id: 'ann-4',
    category: 'sunday_school',
    important: false,
    title: {
      ja: '日曜学校の新しい参加方法について',
      en: 'A New Format for Sunday School — Flexible & Fun!',
      ru: 'Новый удобный формат воскресной школы',
    },
    content: {
      ja: 'これまで月1回の開催でしたが、日程が合わない子どもたちのために、先生がいる時にいつでも30〜40分の短いレッスンを開く新しい形式を導入します！聖書ストーリーブックを使って楽しくお話ししましょう。いつでもご参加ください。',
      en: 'To make it easier for children with busy schedules, we are introducing short 30-40 minute sessions whenever teachers are available! We read stories together using "The Bible Storybook", asking thoughtful questions and connecting faith to daily life.',
      ru: 'Чтобы облегчить участие детям, мы вводим новый формат: короткие 30-40-минутные уроки, когда свободны преподаватели. Читаем детскую иллюстрированную Библию и обсуждаем увлекательные истории.',
    },
  },
];
