'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Info, Apple, Heart, AlertCircle, Sparkles } from 'lucide-react';

interface FastingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastingGuideModal({ isOpen, onClose }: FastingGuideModalProps) {
  const { locale } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-orthodox-parchment dark:bg-slate-900 border-2 border-orthodox-gold text-slate-800 dark:text-slate-100 rounded-2xl max-w-xl md:max-w-2xl lg:max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orthodox-gold/30 pb-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl" role="img" aria-label="Fasting icon">
              🍇
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-orthodox-navy dark:text-orthodox-gold-light">
                {locale === 'ja'
                  ? '正教会の斎（ものいみ）と「厳斎」の手引き'
                  : locale === 'ru'
                  ? 'О православном посте: Что такое строгий пост?'
                  : 'Orthodox Fasting Guide: What is a Strict Fast?'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {locale === 'ja'
                  ? '精進・厳斎・完全断食の違いと教会伝統の意義'
                  : locale === 'ru'
                  ? 'Различие между строгим постом (сухоядением) и полным воздержанием'
                  : 'Understanding Strict Fast (Xerophagy) vs. Total Abstinence'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm">
          {/* 1. Core Clarification Banner: Strict Fast vs Total Abstinence */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-orthodox-gold p-4 rounded-r-xl space-y-2">
            <h3 className="font-bold text-orthodox-burgundy dark:text-orthodox-gold flex items-center space-x-2 text-sm sm:text-base">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                {locale === 'ja'
                  ? '「厳斎（げんさい）」と「完全断食」の違い'
                  : locale === 'ru'
                  ? 'В чем разница между строгим постом и полным воздержанием?'
                  : 'Difference Between "Strict Fast" and "Total Abstinence"'}
              </span>
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-200">
              {locale === 'ja' ? (
                <>
                  正教会の教会暦において<strong>「厳斎（げんさい / Xerophagy）」</strong>とは、水や食物を一切口にしない絶食ではありません。
                  <strong>肉、乳製品（チーズ・牛乳・バター）、卵、魚、酒（ワイン）、植物油</strong>を断ち、
                  穀物、野菜、豆類、きのこ、海藻、果物、パンなどの簡素な植物性食物を摂る精進を指します。
                </>
              ) : locale === 'ru' ? (
                <>
                  В церковной традиции термин <strong>«Строгий пост» (сухоядение / без елея)</strong> <em>не означает</em> полный отказ от еды и воды.
                  Это воздержание от <strong>мяса, птицы, молочных продуктов, яиц, рыбы, вина и растительного масла</strong>.
                  Разрешается вкушение растительной пищи: овощей, круп, каш, бобовых, грибов, хлеба, фруктов и меда.
                </>
              ) : (
                <>
                  In the Orthodox Church calendar, a <strong>"Strict Fast" (🟣 厳斎 / Xerophagy)</strong> does <em>not</em> mean starving or refraining from all food and water.
                  Rather, it means abstaining from <strong>meat, poultry, dairy products, eggs, fish, wine, and olive oil</strong>, while eating simple plant foods: vegetables, grains, beans/lentils, bread, fruits, nuts, and mushrooms.
                </>
              )}
            </p>
            <p className="leading-relaxed text-slate-700 dark:text-slate-200 pt-1 border-t border-amber-200 dark:border-amber-900/60">
              {locale === 'ja' ? (
                <>
                  一切の飲食を断つ<strong>「完全断食（絶食 / Total Fast）」</strong>は、
                  <strong>聖大金曜日（十字架受難日）</strong>の午後遅くの聖骸布着座（夕祈祷）まで、
                  あるいは<strong>聖体礼儀で領聖（聖体拝領）する前の深夜からの断食</strong>など、特定の特別な時にのみ守られます。
                </>
              ) : locale === 'ru' ? (
                <>
                  <strong>Полное воздержание (отказ от всякой пищи и пития / Total Fast)</strong> соблюдается лишь в особые священные дни:
                  в <strong>Великий Пяток</strong> (до вечерни с выносом Плащаницы во второй половине дня) и во время <strong>евхаристического поста</strong> с полуночи перед принятием Святых Таин.
                </>
              ) : (
                <>
                  <strong>Total Abstinence (⚫ 完全断食 / Complete Fast)</strong>—refraining entirely from all food and drink—is reserved for special solemn occasions:
                  principally on <strong>Great and Holy Friday</strong> (until the afternoon Vespers of the Epitaphios / Shroud), and during the <strong>Eucharistic Fast</strong> from midnight before receiving Holy Communion.
                </>
              )}
            </p>
          </div>

          {/* 2. The 5 Levels of Orthodox Fasting */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-orthodox-navy dark:text-orthodox-gold-light border-b border-orthodox-gold/30 pb-1.5 flex items-center space-x-2">
              <Apple className="w-4 h-4 text-orthodox-gold" />
              <span>
                {locale === 'ja'
                  ? '正教会の精進・斎の5つの段階'
                  : locale === 'ru'
                  ? 'Степени православного поста'
                  : 'The Five Degrees of Orthodox Fasting'}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Level 1: Fast-Free */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-300 dark:border-emerald-800">
                <div className="flex items-center space-x-2 font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="text-base">🟢</span>
                  <span>{locale === 'ja' ? '斎なし（祝祷週間）' : locale === 'ru' ? 'Сплошная седмица (Поста нет)' : 'Fast-Free (Continuous Week)'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {locale === 'ja'
                    ? 'すべての食物（肉・乳製品・魚・酒・油）が許されます。降誕節（1/7〜17）、光明週間（復活祭後）、五旬祭後の週などに祝われます。'
                    : locale === 'ru'
                    ? 'Разрешается любая пища (мясо, рыба, молоко, вино, масло). Святки, Светлая седмица, Троицкая седмица.'
                    : 'All foods permitted without restriction. Observed during Christmastide, Bright Week, and Trinity Week.'}
                </p>
              </div>

              {/* Level 2: Fish, Wine & Oil */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-sky-300 dark:border-sky-800">
                <div className="flex items-center space-x-2 font-bold text-sky-700 dark:text-sky-400">
                  <span className="text-base">🐟</span>
                  <span>{locale === 'ja' ? '魚・酒・油可（魚菜可）' : locale === 'ru' ? 'Рыба, вино и елей' : 'Fish, Wine & Oil Allowed'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {locale === 'ja'
                    ? '肉・乳製品は断ちますが、魚・ワイン・植物油が許されます。生神女福音祭、聖枝祭、主の変容祭、使徒の斎やフィリップ斎の週末など。'
                    : locale === 'ru'
                    ? 'Воздержание от мяса и молока. Разрешается рыба, вино и масло на Благовещение, Вербное воскресенье, Преображение.'
                    : 'Abstain from meat and dairy; fish, wine, and olive oil are permitted. Observed on Annunciation, Palm Sunday, Transfiguration.'}
                </p>
              </div>

              {/* Level 3: Wine & Oil */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-300 dark:border-amber-800">
                <div className="flex items-center space-x-2 font-bold text-amber-700 dark:text-amber-400">
                  <span className="text-base">🟡</span>
                  <span>{locale === 'ja' ? '酒・油可（油菜可）' : locale === 'ru' ? 'Вино и елей' : 'Wine & Oil Allowed'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {locale === 'ja'
                    ? '肉・乳製品・魚は断ちますが、調理用油と少量のワインが許されます。大斎・就寝祭斎の土曜と日曜、および聖人の中祭日。'
                    : locale === 'ru'
                    ? 'Без мяса, молока и рыбы. Разрешается пища с растительным маслом и вино по субботам и воскресеньям Великого поста.'
                    : 'Abstain from meat, dairy, and fish; wine and olive oil are permitted with plant meals. Typical for Great Lent weekends.'}
                </p>
              </div>

              {/* Level 4: Strict Fast */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border-2 border-purple-400 dark:border-purple-700">
                <div className="flex items-center space-x-2 font-bold text-purple-800 dark:text-purple-300">
                  <span className="text-base">🟣</span>
                  <span>{locale === 'ja' ? '厳斎（油なし・乾食）' : locale === 'ru' ? 'Строгий пост (Сухоядение / без елея)' : 'Strict Fast (Xerophagy / No Oil)'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {locale === 'ja'
                    ? '肉・乳製品・魚・酒・油のすべてを断ちます。野菜、豆類、穀物、パン、果物など油を使わずに調理した食事を感謝して摂ります。'
                    : locale === 'ru'
                    ? 'Воздержание от мяса, молока, рыбы, вина и масла. Вареная пища без масла или сырая растительная пища.'
                    : 'Abstain from meat, dairy, fish, wine, and oil. Simple plant-based meals prepared without added oil.'}
                </p>
              </div>

              {/* Level 5: Total Fast */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 sm:col-span-2">
                <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-base">⚫</span>
                  <span>{locale === 'ja' ? '完全断食（絶食・完全斎）' : locale === 'ru' ? 'Полное воздержание (Полный пост)' : 'Total Fast (Complete Abstinence)'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {locale === 'ja'
                    ? '水と食物を完全に控えます。聖大金曜日（十字架受難日）、大斎の初日（清純の月曜・火曜）、および聖体拝領の前夜深夜からの断食で守られます。'
                    : locale === 'ru'
                    ? 'Полный отказ от пищи и воды до определенного часа богослужения (Великий Пяток, Чистый понедельник, евхаристический пост перед Причащением).'
                    : 'Refraining from all food and water. Observed on Great and Holy Friday until the Shroud Vespers, Clean Monday, and before Holy Communion.'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Special Commemorative Fast Days */}
          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-orthodox-navy dark:text-orthodox-gold text-xs sm:text-sm flex items-center space-x-1.5">
              <span>☦</span>
              <span>
                {locale === 'ja'
                  ? '一日厳斎日（前駆授洗イオアン斬首祭・十字架挙栄祭）'
                  : locale === 'ru'
                  ? 'Однодневные строгие посты'
                  : 'Special One-Day Strict Fasts'}
              </span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>{locale === 'ja' ? '前駆授洗イオアン斬首祭（9月11日 / 旧8月29日）: ' : locale === 'ru' ? 'Усекновение главы Иоанна Предтечи (11 сентября): ' : 'Beheading of St. John the Baptist (Sept 11): '}</strong>
                {locale === 'ja'
                  ? 'ヘロデ王の不敬な宴のさなかに預言者が斬首された悲劇を想い、深い痛悔と哀悼をもって肉・魚・乳製品を断ちます。敬虔な信徒の間では、皿に載った食物や丸い果物を避ける伝統もあります。'
                  : locale === 'ru'
                  ? 'День строгого поста и скорби в память мученической кончины величайшего из пророков во время греховного пира Ирода.'
                  : 'A strict fast observed in solemn grief for the martyred Forerunner, contrasted against Herod’s ungodly banquet. Pious custom also avoids eating round foods or using platters.'}
              </p>
              <p>
                <strong>{locale === 'ja' ? '十字架挙栄祭（9月27日 / 旧9月14日）: ' : locale === 'ru' ? 'Воздвижение Креста Господня (27 сентября): ' : 'Exaltation of the Holy Cross (Sept 27): '}</strong>
                {locale === 'ja'
                  ? '我らの救いのためにキリストが架けられた尊い十字架の苦難を追憶し、厳斎を守ります。'
                  : locale === 'ru'
                  ? 'День строгого поста в воспоминание спасительных страданий Господа на Честном Древе Креста.'
                  : 'Observed as a strict fast in solemn remembrance of the Lord’s sufferings upon the Cross for our salvation.'}
              </p>
            </div>
          </div>

          {/* 4. Pastoral Grace & Spiritual Purpose */}
          <div className="bg-orthodox-candle/20 dark:bg-slate-800/80 border border-orthodox-gold/40 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-orthodox-burgundy dark:text-orthodox-gold flex items-center space-x-1.5 text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-orthodox-gold flex-shrink-0" />
              <span>
                {locale === 'ja'
                  ? '斎の真の目的と牧会的な配慮（健康上の免除）'
                  : locale === 'ru'
                  ? 'Духовный смысл поста и пастырское снисхождение'
                  : 'The Spiritual Spirit of Fasting & Pastoral Dispensation'}
              </span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {locale === 'ja'
                ? '「口だけが断食してはならない。目も、耳も、足も、手も、私たちの身体のすべての部分が断食しなければならない。悪口やそしりから口を断食させよ。」（聖金口イオアン）'
                : locale === 'ru'
                ? '«Пусть постятся не одни уста, но и взор, и слух, и ноги, и руки, и все члены нашего тела. Пусть постятся уста от срамных речей и осуждения.» (Свт. Иоанн Златоуст)'
                : '"Let not only the mouth fast, but also the eye, the ear, the feet, the hands, and all the members of our bodies. Let the mouth fast from disgraceful speeches and reviling." (St. John Chrysostom)'}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-orthodox-gold/20">
              {locale === 'ja'
                ? '正教会の斎は形式的な律法ではなく、祈りと悔い改め、愛の奉仕を深めるための「霊的な薬」です。病気の方、妊産婦、授乳中の方、高齢者、子ども、旅行中の方は、無理をせず各自の健康に合わせて斎を緩和することが教会法上認められています。疑問があるときは、必ずご自身の霊父（司祭）にご相談ください。'
                : locale === 'ru'
                ? 'Пост в Православной Церкви — это не самоцель, а духовное врачевство для молитвы и покаяния. Болящие, беременные, кормящие матери, дети, пожилые и путешествующие освобождаются от строгости поста по благословению духовника.'
                : 'Fasting in the Orthodox Church is spiritual medicine for prayer, repentance, and charity—never legalism. Children, the sick, pregnant or nursing mothers, the elderly, and travelers are blessed to adjust their fasting according to health. Always consult your parish priest or spiritual father.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-orthodox-gold/30 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-orthodox-gold text-orthodox-navy font-bold text-xs sm:text-sm shadow hover:bg-orthodox-gold-dark hover:text-white transition-all active:scale-95"
          >
            {locale === 'ja' ? '閉じる' : locale === 'ru' ? 'Понятно' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
