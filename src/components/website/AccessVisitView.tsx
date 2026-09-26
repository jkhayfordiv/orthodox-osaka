'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARISH_INFO } from '../../data/terminology';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Info,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Train,
  Car,
} from 'lucide-react';

export function AccessVisitView() {
  const { locale, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="relative bg-orthodox-navy text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src="/church-photos/osaka-church-panoramic.jpg"
            alt="Osaka Orthodox Church Grounds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orthodox-navy via-orthodox-navy/95 to-orthodox-navy/85 z-0" />

        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orthodox-gold/20 border border-orthodox-gold/40 text-orthodox-gold-light text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{locale === 'ja' ? '交通アクセス・参祷案内' : locale === 'ru' ? 'Адрес и визиты' : 'Location & Visiting Guide'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            {locale === 'ja'
              ? '交通案内・聖堂見学のご案内'
              : locale === 'ru'
              ? 'Как добраться и порядок посещения'
              : 'Directions & Visitor Information'}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-3xl font-light leading-relaxed">
            {locale === 'ja'
              ? '大阪府吹田市山手町。阪急千里線「豊津駅」または「関大前駅」より徒歩約8分。土曜日の見学開放と週末の礼拝にどなたでもご参加いただけます。'
              : locale === 'ru'
              ? 'Осака, Суита, Яматэтё 1-8-15. 8 минут пешком от станции Тоёцу. Приглашаем на субботние часы посещения и праздничные службы.'
              : 'Located in Suita, Osaka. Approx. 8 minutes walk from Toyotsu or Kandai-mae Station on the Hankyu Senri Line. Inquirers and visitors are warmly welcomed.'}
          </p>
        </div>
      </div>

      {/* Main Content: 12-Column Responsive Layout on PC */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Schedule & Etiquette */}
          <div className="lg:col-span-8 space-y-10">
            {/* Visiting and Worship Schedule Card */}
            <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Clock className="w-5 h-5 text-orthodox-gold" />
                <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {locale === 'ja' ? '見学および礼拝時間' : locale === 'ru' ? 'Часы посещения и богослужений' : 'Visiting & Liturgical Hours'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                      {locale === 'ja' ? '毎週土曜日 聖堂見学' : locale === 'ru' ? 'Суббота: Открытые часы' : 'Saturdays: Open Viewing'}
                    </div>
                    <div className="text-amber-800 dark:text-amber-300 font-mono text-base font-bold mt-1">15:00 〜 16:30</div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2">
                      {locale === 'ja'
                        ? '予約不要で見学いただけます。初めての方も歓迎いたします。'
                        : locale === 'ru'
                        ? 'Свободный вход и осмотр храма без записи.'
                        : 'No appointment needed. Drop in to view the icons and temple.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {locale === 'ja' ? '夕方 徹夜祷（晩祷）' : locale === 'ru' ? 'Вечер: Всенощная' : 'Evening All-Night Vigil'}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-mono text-base font-bold mt-1">17:00 〜</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      {locale === 'ja'
                        ? '夕刻の祈りと聖歌。静かに参祷いただけます。'
                        : locale === 'ru'
                        ? 'Вечерняя молитва и пение стихир при свечах.'
                        : 'Evening choral prayer preparing for the Lord’s Day.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {locale === 'ja' ? '日曜日 聖体礼儀（主日）' : locale === 'ru' ? 'Воскресенье: Литургия' : 'Sunday Divine Liturgy'}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-mono text-base font-bold mt-1">10:00 〜</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      {locale === 'ja'
                        ? '中心的な聖体礼儀。礼拝後はお茶の親睦会。'
                        : locale === 'ru'
                        ? 'Главное богослужение недели и братская трапеза.'
                        : 'The principal Sunday liturgy followed by fellowship tea.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step-by-Step Directions */}
            <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Navigation className="w-5 h-5 text-orthodox-gold" />
                <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {locale === 'ja' ? '交通アクセス・道順' : locale === 'ru' ? 'Маршрут и транспорт' : 'Directions & Transport'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <Train className="w-4 h-4 text-indigo-500" />
                    <span>{locale === 'ja' ? '電車でお越しの場合' : locale === 'ru' ? 'На поезде' : 'By Train'}</span>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed">
                    <li>
                      <strong>{locale === 'ja' ? '阪急千里線「豊津駅」' : locale === 'ru' ? 'Станция Тоёцу' : 'Hankyu Toyotsu Station'}</strong>:{' '}
                      {locale === 'ja' ? '東改札口より徒歩約8分。' : locale === 'ru' ? 'Восточный выход, 8 минут пешком.' : 'East exit, approx. 8 mins walk.'}
                    </li>
                    <li>
                      <strong>{locale === 'ja' ? '阪急千里線「関大前駅」' : locale === 'ru' ? 'Станция Кандай-маэ' : 'Hankyu Kandai-mae Station'}</strong>:{' '}
                      {locale === 'ja' ? '南改札口より徒歩約8分。' : locale === 'ru' ? 'Южный выход, 8 минут пешком.' : 'South exit, approx. 8 mins walk.'}
                    </li>
                    <li>
                      {locale === 'ja'
                        ? 'Osaka Metro堺筋線との直通運転があり、天神橋筋六丁目・北浜・日本橋方面からも乗り換えなしでアクセス可能です。'
                        : locale === 'ru'
                        ? 'Прямое сообщение с линией метро Сакаидзи (прямой поезд от ст. Китахама / Ниппонбаси).'
                        : 'Through-service with Osaka Metro Sakaisuji Line (direct from Kitahama and Nippombashi).'}
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <Car className="w-4 h-4 text-emerald-500" />
                    <span>{locale === 'ja' ? 'お車でお越しの場合' : locale === 'ru' ? 'На автомобиле' : 'By Car'}</span>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed">
                    <li>
                      {locale === 'ja'
                        ? '名神高速道路「吹田IC」または近畿自動車道より約15分。'
                        : locale === 'ru'
                        ? 'Около 15 минут от развязки Suita IC (скоростная трасса Мэйсин).'
                        : 'Approx. 15 minutes from Meishin Expressway Suita Interchange.'}
                    </li>
                    <li>
                      {locale === 'ja'
                        ? '境内駐車場は数台分ございます。満車の場合は周辺の有料コインパーキングをご利用ください。'
                        : locale === 'ru'
                        ? 'На территории храма есть несколько парковочных мест. При их заполнении пользуйтесь городскими парковками.'
                        : 'Limited parking on temple grounds. Nearby coin parking available.'}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Visitor Etiquette Section */}
            <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Info className="w-5 h-5 text-orthodox-gold" />
                <h2 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {locale === 'ja' ? '初めて参祷される方へ（マナーと心得）' : locale === 'ru' ? 'Памятка для посетителей' : 'First-Time Visitor Guidelines'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                      {locale === 'ja' ? '服装について' : locale === 'ru' ? 'Одежда' : 'Attire'}
                    </strong>
                    <span>
                      {locale === 'ja'
                        ? '露出の多い服装（短パン・キャミソール等）を控え、神聖な祈りの場にふさわしい清潔で控えめな服装をお勧めします。'
                        : locale === 'ru'
                        ? 'Просим приходить в благопристойной одежде, закрывающей плечи и колени.'
                        : 'Modest attire is appreciated. Please avoid shorts or sleeveless tops.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                      {locale === 'ja' ? '礼拝中の姿勢と着席' : locale === 'ru' ? 'Поведение на службе' : 'During Services'}
                    </strong>
                    <span>
                      {locale === 'ja'
                        ? '正教会の祈祷は基本的に立って祈りを捧げますが、ご体調に合わせて壁側の椅子をご自由にご利用ください。'
                        : locale === 'ru'
                        ? 'По традиции молятся стоя, но уставшие и пожилые могут сидеть на лавках вдоль стен.'
                        : 'The congregation stands in prayer, but benches along the walls are free to use anytime.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                      {locale === 'ja' ? '写真・動画撮影' : locale === 'ru' ? 'Фотосъёмка' : 'Photography'}
                    </strong>
                    <span>
                      {locale === 'ja'
                        ? '礼拝中の写真撮影はご遠慮ください。土曜の見学時間中であれば、他の方のご迷惑にならない範囲で撮影いただけます。'
                        : locale === 'ru'
                        ? 'Во время богослужений съёмка запрещена. В субботние часы посещения съёмка возможна с благословения.'
                        : 'Photography is not permitted during services. Respectful photos during Saturday viewing hours are allowed.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                      {locale === 'ja' ? '聖体拝領について' : locale === 'ru' ? 'Святое Причастие' : 'Holy Communion'}
                    </strong>
                    <span>
                      {locale === 'ja'
                        ? '聖体拝領は正教徒のみが与る秘跡ですが、礼拝終了時に神父様より感謝のパン（アンティドル）をお受け取りいただけます。'
                        : locale === 'ru'
                        ? 'Причастие Святых Таин преподаётся крещёным православным. Всем гостям раздаётся благословенный хлеб (антидор).'
                        : 'Holy Communion is for prepared Orthodox Christians. All guests are warmly invited to receive blessed antidoron bread.'}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT 4 COLUMNS: Location Card & Contact Box */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* Location & Map Card */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-base">
                <MapPin className="w-5 h-5 text-orthodox-gold" />
                <span>{locale === 'ja' ? '所在地・地図' : locale === 'ru' ? 'Адрес и карта' : 'Location & Map'}</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-16/9 bg-slate-900">
                <img
                  src="/church-photos/osaka-church-panoramic.jpg"
                  alt="Osaka Orthodox Church"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                  {PARISH_INFO.name[locale]}
                </p>
                <p className="font-mono">{PARISH_INFO.address[locale]}</p>
                <p className="text-slate-500 pt-1">{PARISH_INFO.access[locale]}</p>
              </div>

              <a
                href="https://goo.gl/maps/S6WgPs3SkyvZpbzB9"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orthodox-gold hover:bg-orthodox-gold-light text-orthodox-navy font-bold text-xs transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{locale === 'ja' ? 'Googleマップでルート案内' : locale === 'ru' ? 'Маршрут в Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-3xl bg-orthodox-navy text-white p-6 shadow-md space-y-3">
              <h3 className="font-serif font-bold text-sm text-orthodox-gold-light">
                {locale === 'ja' ? '事前予約・お問い合わせ' : locale === 'ru' ? 'Связь с приходом' : 'Questions & Advance Inquiries'}
              </h3>
              <p className="text-xs text-slate-300">
                {locale === 'ja'
                  ? '平日や時間外の見学、取材、ご相談はお気軽にご連絡ください。'
                  : locale === 'ru'
                  ? 'По всем вопросам посещения в будние дни связывайтесь с нами.'
                  : 'For weekday visits or pastoral inquiries, please reach out in advance.'}
              </p>

              <div className="pt-2 space-y-2 text-xs">
                <a
                  href={`tel:${PARISH_INFO.phone}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-orthodox-gold" />
                  <span className="font-mono font-bold">{PARISH_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${PARISH_INFO.email}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-orthodox-gold" />
                  <span className="font-mono text-[11px] truncate">{PARISH_INFO.email}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
