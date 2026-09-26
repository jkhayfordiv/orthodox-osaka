import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

FONTS_DIR = 'C:/Windows/Fonts'
GEORGIA = os.path.join(FONTS_DIR, 'georgia.ttf')
GEORGIA_BOLD = os.path.join(FONTS_DIR, 'georgiab.ttf')
GEORGIA_ITALIC = os.path.join(FONTS_DIR, 'georgiai.ttf')
ARIAL = os.path.join(FONTS_DIR, 'arial.ttf')
ARIAL_BOLD = os.path.join(FONTS_DIR, 'arialbd.ttf')

COLOR_NAVY = (12/255, 51/255, 136/255)
COLOR_CRIMSON = (134/255, 0/255, 75/255)
COLOR_GOLD = (239/255, 198/255, 0/255)
COLOR_WHITE = (1.0, 1.0, 1.0)
COLOR_PARCHMENT_INNER = (252/255, 251/255, 245/255)
COLOR_PARCHMENT_OUTER = (239/255, 225/255, 170/255)
COLOR_TEXT_DARK = (0.12, 0.12, 0.15)

def check_box(page, rect, text, **kwargs):
    rc = page.insert_textbox(rect, text, **kwargs)
    if rc < 0:
        print(f"WARNING: Text did not fit in {rect}! rc={rc}, text={text[:30]!r}")
    return rc

def build_multilingual_flyers():
    for lang in ['en', 'ru']:
        # -----------------------------
        # PAGE 1: FRONT COVER
        # -----------------------------
        doc_front = pymupdf.open('public/events/rachmaninoff-concert-2027-background.pdf')
        page0 = doc_front[0]

        page0.insert_font(fontname='f-geo', fontfile=GEORGIA)
        page0.insert_font(fontname='f-geo-b', fontfile=GEORGIA_BOLD)
        page0.insert_font(fontname='f-geo-i', fontfile=GEORGIA_ITALIC)
        page0.insert_font(fontname='f-arial', fontfile=ARIAL)
        page0.insert_font(fontname='f-arial-b', fontfile=ARIAL_BOLD)

        if lang == 'en':
            # 1. Top Seminar Banner
            check_box(
                page0, pymupdf.Rect(20, 10, 560, 26),
                "Orthodox Church in Japan  ·  Western Japan Diocese  ·  2027 Winter Seminar",
                fontname='f-arial-b', fontsize=10.5, color=COLOR_WHITE, align=0
            )

            # 2. Subtitle: Piano & Lecture
            check_box(
                page0, pymupdf.Rect(45, 68, 380, 100),
                "Piano & Lecture",
                fontname='f-geo-b', fontsize=22, color=COLOR_CRIMSON, align=0
            )

            # 3. Main Title
            check_box(
                page0, pymupdf.Rect(28, 98, 480, 235),
                "Rachmaninoff and\nthe Orthodox Bells",
                fontname='f-geo-b', fontsize=34, color=COLOR_NAVY, align=0
            )

            # 4. Performer below title
            check_box(
                page0, pymupdf.Rect(140, 238, 450, 275),
                "Matfei Sadakatsu Tsuchida",
                fontname='f-geo-b', fontsize=21, color=COLOR_CRIMSON, align=0
            )

            # 5. Program Header & Pieces (Left side)
            check_box(
                page0, pymupdf.Rect(38, 335, 200, 355),
                "— PROGRAM —",
                fontname='f-geo-b', fontsize=11, color=COLOR_NAVY, align=0
            )
            prog_text = (
                "• Prelude in C# minor \"The Bells\", Op. 3-2\n\n"
                "• Six Moments Musicaux, Op. 16\n\n"
                "• Piano Sonata No. 2 in Bb minor, Op. 36\n\n"
                "• Études-Tableaux, Op. 39-9 in D major"
            )
            check_box(
                page0, pymupdf.Rect(38, 360, 270, 475),
                prog_text,
                fontname='f-geo-b', fontsize=10.5, color=COLOR_NAVY, align=0
            )

            # 6. Poetic / Faith Reflection (Right side)
            refl_text = (
                "Rachmaninoff was a devout Orthodox Christian.\n"
                "In his creations, yearning for the eternal God,\n"
                "compassion and sorrow for the world, the resulting\n"
                "anguish, and boundless joy resound.\n\n"
                "Pianist Matfei Sadakatsu Tsuchida,\n"
                "who loves Rachmaninoff and lives the Orthodox faith,\n"
                "recites and performs a poem of love and life's joy."
            )
            check_box(
                page0, pymupdf.Rect(275, 470, 565, 605),
                refl_text,
                fontname='f-geo', fontsize=10.0, color=COLOR_NAVY, align=0
            )

            # 7. Venue & Event Info Box (Bottom Right)
            check_box(
                page0, pymupdf.Rect(238, 624, 570, 672),
                "Venue: Osaka Orthodox Church\n"
                "5 min walk from Hankyu Toyotsu Stn / 15 min from JR Suita Stn",
                fontname='f-geo-b', fontsize=11.5, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 678, 570, 725),
                "Tuesday, February 23, 2027 (National Holiday)\n"
                "2:00 PM Start (Doors open at 1:30 PM)",
                fontname='f-geo-b', fontsize=13.0, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 730, 570, 755),
                "Contribution: ¥1,500 (Open Seating · Limited to 100 Seats)",
                fontname='f-geo-b', fontsize=11.0, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 758, 570, 780),
                "Reservations Open: December 1, 2026",
                fontname='f-geo-b', fontsize=11.0, color=COLOR_GOLD, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 786, 570, 832),
                "Inquiries & Reservations: Osaka Orthodox Church\n"
                "Tel. 06-6388-4512   osaka.orthodox.church@gmail.com",
                fontname='f-geo', fontsize=10.0, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(25, 792, 230, 830),
                "Sadakatsu Tsuchida (Prof., Shokei Gakuin Univ.)\n"
                "1st Prize, 3rd Rachmaninoff Int'l Piano Competition",
                fontname='f-arial-b', fontsize=8.0, color=COLOR_GOLD, align=0
            )

        else: # Russian
            # 1. Top Seminar Banner
            check_box(
                page0, pymupdf.Rect(20, 10, 560, 26),
                "Японская Православная Церковь · Западно-Японская епархия · Зимний семинар 2027",
                fontname='f-arial-b', fontsize=9.5, color=COLOR_WHITE, align=0
            )

            # 2. Subtitle: Фортепиано и беседа
            check_box(
                page0, pymupdf.Rect(45, 68, 380, 100),
                "Фортепиано и беседа",
                fontname='f-geo-b', fontsize=20, color=COLOR_CRIMSON, align=0
            )

            # 3. Main Title
            check_box(
                page0, pymupdf.Rect(28, 96, 480, 235),
                "Рахманинов и\nколокола Православной Церкви",
                fontname='f-geo-b', fontsize=28, color=COLOR_NAVY, align=0
            )

            # 4. Performer below title
            check_box(
                page0, pymupdf.Rect(140, 238, 450, 275),
                "Матфей Садакацу Цутида",
                fontname='f-geo-b', fontsize=21, color=COLOR_CRIMSON, align=0
            )

            # 5. Program Header & Pieces (Left side)
            check_box(
                page0, pymupdf.Rect(38, 335, 200, 355),
                "— ПРОГРАММА —",
                fontname='f-geo-b', fontsize=11, color=COLOR_NAVY, align=0
            )
            prog_text = (
                "• Прелюдия «Колокола», соч. 3 № 2 (до-диез минор)\n\n"
                "• Шесть музыкальных моментов, соч. 16\n\n"
                "• Соната для фортепиано № 2 си-бемоль минор, соч. 36\n\n"
                "• Этюды-картины, соч. 39 № 9 (ре мажор)"
            )
            check_box(
                page0, pymupdf.Rect(38, 358, 270, 480),
                prog_text,
                fontname='f-geo-b', fontsize=9.5, color=COLOR_NAVY, align=0
            )

            # 6. Poetic / Faith Reflection (Right side)
            refl_text = (
                "Рахманинов был благочестивым православным.\n"
                "В его творчестве звучат искание вечного Бога,\n"
                "сострадание и скорбь о мире, рожденные ими муки\n"
                "и преизбыточествующая радость.\n\n"
                "Пианист Матфей Садакацу Цутида, любящий Рахманинова\n"
                "и живущий православной верой, словом и музыкой\n"
                "воплотит поэму любви и торжества жизни."
            )
            check_box(
                page0, pymupdf.Rect(268, 470, 565, 605),
                refl_text,
                fontname='f-geo', fontsize=9.5, color=COLOR_NAVY, align=0
            )

            # 7. Venue & Event Info Box (Bottom Right)
            check_box(
                page0, pymupdf.Rect(238, 624, 570, 672),
                "Место: Осакский Свято-Покровский православный храм\n"
                "5 мин. от ст. Тоёцу (линия Ханкю) / 15 мин. от ст. Суита (JR)",
                fontname='f-geo-b', fontsize=10.5, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 678, 570, 725),
                "Вторник, 23 февраля 2027 г. (выходной день)\n"
                "Начало в 14:00 (открытие дверей в 13:30)",
                fontname='f-geo-b', fontsize=12.0, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 730, 570, 755),
                "Благотворительный взнос: 1 500 иен (100 мест, свободная рассадка)",
                fontname='f-geo-b', fontsize=10.0, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 758, 570, 780),
                "Бронирование открывается 1 декабря 2026 г.",
                fontname='f-geo-b', fontsize=10.5, color=COLOR_GOLD, align=0
            )

            check_box(
                page0, pymupdf.Rect(238, 786, 570, 832),
                "Справки и бронирование: Осакский православный храм\n"
                "Тел. 06-6388-4512   osaka.orthodox.church@gmail.com",
                fontname='f-geo', fontsize=9.5, color=COLOR_WHITE, align=0
            )

            check_box(
                page0, pymupdf.Rect(25, 792, 230, 830),
                "Садакацу Цутида (проф. Ун-та Сёкэй Гакуин)\n"
                "1-я премия III Межд. конкурса им. С. Рахманинова",
                fontname='f-arial-b', fontsize=8.0, color=COLOR_GOLD, align=0
            )

        # -----------------------------
        # PAGE 2: BACK COVER
        # -----------------------------
        doc_original = pymupdf.open('public/events/rachmaninoff-concert-2027.pdf')
        page1 = doc_original[1]

        # Redact text blocks on page 1 using matching background colors:
        # Inner column parchment: COLOR_PARCHMENT_INNER
        # Outer border / bottom caption parchment: COLOR_PARCHMENT_OUTER
        blocks = page1.get_text('blocks')
        for b in blocks:
            rect = pymupdf.Rect(b[0] - 2, b[1] - 1, b[2] + 2, b[3] + 1)
            # Decide fill color based on y position and whether inside inner box
            if b[1] < 630:
                fill_color = COLOR_PARCHMENT_INNER
            else:
                fill_color = COLOR_PARCHMENT_OUTER
            page1.add_redact_annot(rect, fill=fill_color)
        page1.apply_redactions()

        # Register fonts on page1
        page1.insert_font(fontname='f-geo', fontfile=GEORGIA)
        page1.insert_font(fontname='f-geo-b', fontfile=GEORGIA_BOLD)
        page1.insert_font(fontname='f-geo-i', fontfile=GEORGIA_ITALIC)
        page1.insert_font(fontname='f-arial', fontfile=ARIAL)
        page1.insert_font(fontname='f-arial-b', fontfile=ARIAL_BOLD)

        if lang == 'en':
            # Headers placed below the top icon (top icon ends at y=114 in the center)
            # Left column header
            check_box(
                page1, pymupdf.Rect(38, 120, 275, 142),
                "Matfei Sadakatsu Tsuchida — Biography",
                fontname='f-geo-b', fontsize=10.5, color=COLOR_NAVY, align=0
            )

            # Right column header
            check_box(
                page1, pymupdf.Rect(318, 120, 560, 142),
                "About Orthodox Church Bells",
                fontname='f-geo-b', fontsize=10.5, color=COLOR_NAVY, align=0
            )

            # Left Column: Matfei Sadakatsu Tsuchida Bio
            bio_text = (
                "Born in Tokyo in 1975. After completing the Soloist Diploma Course at Toho Gakuen School of Music, he studied in Russia, graduating from the Moscow Conservatory and completing postgraduate studies. Studied under Yukiko Konishi, Harumi Sakata, Masako Kanematsu, A. Mndoyants, and V. Merzhanov.\n\n"
                "In 2002, awarded 1st Prize at the 3rd International Rachmaninoff Piano Competition. Has performed extensively across Russia, Ukraine, Croatia, Thailand, South Korea, Hong Kong, and throughout Japan (Tokyo Bunka Kaikan, Tokyo Opera City, Casals Hall, Sumida Triphony Hall, Yokohama Minato Mirai, Nerima Culture Center, Miyagi Prefectural Auditorium).\n\n"
                "Performed with major orchestras including the Tchaikovsky Symphony Orchestra under V. Fedoseyev, HRT Croatian Radio Symphony under B. Tavrić, and Tokyo Philharmonic conducted by Keiko Mitsuhashi.\n\n"
                "CD Releases: 'Rachmaninoff: 24 Preludes', 'Piano Masterpieces: Overcoming'. Books: 'Play Rachmaninoff' (Russian edition 2016), 'The Essence of Rachmaninoff Performance' (2023). Recipient of honor certificates from the Mayor of Perm (2016), Gunsan Police Station (2016), and President L. Kuchma of Ukraine (2016).\n\n"
                "Currently Professor at Shokei Gakuin University, Lecturer at Miyagi Gakuin Women's University, faithful member and choir conductor at Sendai Orthodox Church."
            )
            check_box(
                page1, pymupdf.Rect(38, 146, 275, 625),
                bio_text,
                fontname='f-geo', fontsize=8.6, color=COLOR_TEXT_DARK, align=0
            )

            # Right Column: About Orthodox Bells Essay
            bells_text = (
                "In Orthodox tradition, bells hold a sacred place. Tokyo's Holy Resurrection Cathedral (Nikolai-do) has been renowned since pre-war times for 'The Bells of Nikolai', inspiring songs and poetry. In Hakodate, the Orthodox church has long been affectionately called 'Gangan-ji' (the Bell-Ringing Temple).\n\n"
                "Bells announce divine services, mark the arrival of hierarchs, mourn the falling asleep of the faithful, and alert during floods or fires. More deeply, their sacred chime is believed to convey God's grace, dispelling demonic temptations and filling the faithful with courage and spiritual peace.\n\n"
                "Orthodox belfries feature sets of tuned bells: Nikolai-do has 16, while Hakodate and Osaka each have 6, connected by ropes and rung rhythmically by dedicated bell-ringers in breathing harmony.\n\n"
                "The slow, deep stroke of the largest bell is called in Russian 'Blagovest'—meaning 'Good Tidings' or 'The Gospel'. The bell-ringer holds an office akin to clergy: before ringing, they receive the priest's blessing, make the Sign of the Cross before icons cast on the bell, and bow in reverence.\n\n"
                "Bells are cast from copper and tin, enriched with silver and gold. In imperial Russia, crowds gathered at the furnace as prayers were chanted, offering gold and silver coins into the molten bronze. Tarkovsky famously immortalized this sacred art in his cinematic masterpiece, 'Andrei Rublev'.\n\n"
                "For Orthodox Christians, church bells are life itself—a loving call from God and a voice of heavenly joy."
            )
            check_box(
                page1, pymupdf.Rect(318, 146, 560, 625),
                bells_text,
                fontname='f-geo', fontsize=8.6, color=COLOR_TEXT_DARK, align=0
            )

            # Bottom Captions:
            check_box(
                page1, pymupdf.Rect(45, 792, 205, 835),
                "1904: Nikolai-do Belfry. Ringing in traditional kimono and zori sandals. (Tokyo Resurrection Cathedral Album)",
                fontname='f-geo', fontsize=6.8, color=COLOR_TEXT_DARK, align=0
            )

            check_box(
                page1, pymupdf.Rect(360, 792, 560, 835),
                "1910: Great Bell gifted from Russia with 4 relief icons. Damaged in 1945 air raid; now resting by church. (Osaka Church)",
                fontname='f-geo', fontsize=6.8, color=COLOR_TEXT_DARK, align=0
            )

            # QR Code headers
            check_box(
                page1, pymupdf.Rect(238, 622, 350, 646),
                "Listen to the Bells\nScan QR Codes",
                fontname='f-geo-b', fontsize=8.0, color=COLOR_NAVY, align=1
            )
            check_box(
                page1, pymupdf.Rect(235, 737, 350, 749),
                "Nikolai-do Bells",
                fontname='f-geo-b', fontsize=7.5, color=COLOR_NAVY, align=1
            )
            check_box(
                page1, pymupdf.Rect(235, 823, 350, 835),
                "Osaka Church Bells",
                fontname='f-geo-b', fontsize=7.5, color=COLOR_NAVY, align=1
            )

        else: # Russian
            # Left column header
            check_box(
                page1, pymupdf.Rect(38, 120, 275, 142),
                "Матфей Садакацу Цутида — Биография",
                fontname='f-geo-b', fontsize=10.0, color=COLOR_NAVY, align=0
            )

            # Right column header
            check_box(
                page1, pymupdf.Rect(318, 120, 560, 142),
                "О колокольном звоне Церкви",
                fontname='f-geo-b', fontsize=10.0, color=COLOR_NAVY, align=0
            )

            # Left Column: Matfei Sadakatsu Tsuchida Bio
            bio_text = (
                "Родился в Токио в 1975 г. После курса солистов школы Тохо Гакуэн учился в России, окончил Московскую государственную консерваторию им. П. И. Чайковского и аспирантуру. Занимался у Ю. Кониси, Х. Саката, М. Канэмацу, А. Мндоянца, В. Мержанова.\n\n"
                "В 2002 г. завоевал I премию на III Международном конкурсе пианистов им. С. В. Рахманинова. Многократно выступал в России, Украине, Хорватии, Таиланде, Южной Корее, Гонконге и Японии (Токио Бунка Кайкан, Токио Опера Сити, Зал Казальса, Сумида Трифони, Йокогама Минато Мираи, Префектурный зал Мияги и др.).\n\n"
                "Выступал с Большим симфоническим оркестром им. Чайковского под управлением В. Федосеева, оркестром HRT Хорватии, Токийским филармоническим оркестром под управлением К. Мицухаси и др.\n\n"
                "Записи: «Рахманинов: 24 прелюдии», «Шедевры фортепиано». Книги: «Играйте Рахманинова» (русское изд. 2016), «Секреты исполнения Рахманинова» (2023). Награжден почетными грамотами мэра Перми (2016), полиции Кунсана (2016), президента Украины Л. Кучмы (2016).\n\n"
                "Профессор Университета Сёкэй Гакуин, преподаватель Музыкального колледжа Мияги Гакуин, прихожанин и регент Сэндайского православного храма."
            )
            check_box(
                page1, pymupdf.Rect(38, 146, 275, 625),
                bio_text,
                fontname='f-geo', fontsize=8.5, color=COLOR_TEXT_DARK, align=0
            )

            # Right Column: About Orthodox Bells Essay
            bells_text = (
                "Православный храм неразрывно связан с колокольным звоном. Токийский собор Воскресения Христова (Николай-до) с довоенных времен славился «колоколами Николая». Храм в Хакодатэ горожане издревле ласково зовут «Ган-ган-дзи» (храм звона колоколов).\n\n"
                "Колокол возвещает время молитвы, приезд архиереев, упокоение верующих, предупреждает о стихиях. В его звоне сокрыта Божественная благодать, отгоняющая духовные искушения и укрепляющая веру и надежду.\n\n"
                "Звонницы состоят из ансамбля колоколов: в соборе Николай-до их 16, в Хакодатэ и Осаке — по 6 колоколов, соединенных тягами и звучащих в молитвенном согласии звонарей.\n\n"
                "Мерный звон самого большого колокола зовется «Благовест» — благая весть Евангелия. Звонарь почитается почти как священнослужитель: перед звоном берет благословение священника, благоговейно крестится на лики икон, отлитые на колоколе, и полагает поклон.\n\n"
                "Колокола отливают из меди и олова с серебром и золотом. В дореволюционной России при отливке народ собирался на молебен, жертвуя монеты в кипящую медь. Образ отливки увековечил Тарковский в картине «Андрей Рублев».\n\n"
                "Для православного колокольный звон — это глас Божий, освящающий жизнь, и нескончаемая радость."
            )
            check_box(
                page1, pymupdf.Rect(318, 146, 560, 625),
                bells_text,
                fontname='f-geo', fontsize=8.5, color=COLOR_TEXT_DARK, align=0
            )

            # Bottom Captions:
            check_box(
                page1, pymupdf.Rect(45, 792, 205, 835),
                "1904 г.: Звонница собора Николай-до. Звонари в традиционном кимоно и дзори. (Альбом собора)",
                fontname='f-geo', fontsize=6.8, color=COLOR_TEXT_DARK, align=0
            )

            check_box(
                page1, pymupdf.Rect(360, 792, 560, 835),
                "1910 г.: Большой колокол из России с 4 иконами. Пострадал при бомбежке 1945 г.; ныне у храма. (Осака)",
                fontname='f-geo', fontsize=6.8, color=COLOR_TEXT_DARK, align=0
            )

            # QR Code headers
            check_box(
                page1, pymupdf.Rect(238, 622, 350, 646),
                "Послушать колокольный\nзвон (QR-код)",
                fontname='f-geo-b', fontsize=7.5, color=COLOR_NAVY, align=1
            )
            check_box(
                page1, pymupdf.Rect(235, 737, 350, 749),
                "Колокола Николай-до",
                fontname='f-geo-b', fontsize=7.0, color=COLOR_NAVY, align=1
            )
            check_box(
                page1, pymupdf.Rect(235, 823, 350, 835),
                "Колокола Осакского храма",
                fontname='f-geo-b', fontsize=7.0, color=COLOR_NAVY, align=1
            )

        # Combine Page 0 and Page 1
        final_doc = pymupdf.open()
        final_doc.insert_pdf(doc_front)
        final_doc.insert_pdf(doc_original, from_page=1, to_page=1)

        pdf_out = f'public/events/rachmaninoff-concert-2027-{lang}.pdf'
        final_doc.save(pdf_out, garbage=4, deflate=True)
        print(f"Generated {pdf_out}")

        mat = pymupdf.Matrix(2.0, 2.0)
        pix0 = final_doc[0].get_pixmap(matrix=mat)
        pix0.save(f'public/events/rachmaninoff-flyer-{lang}-p1.jpg')

        pix1 = final_doc[1].get_pixmap(matrix=mat)
        pix1.save(f'public/events/rachmaninoff-flyer-{lang}-p2.jpg')

        doc_front.close()
        doc_original.close()
        final_doc.close()

if __name__ == '__main__':
    build_multilingual_flyers()
    print("DONE!")
