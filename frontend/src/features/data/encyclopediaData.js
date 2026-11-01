export const ENCYCLOPEDIA_CATEGORIES = [
  { id: 'all', label: { hy: 'Բոլորը', ru: 'Все статьи', en: 'All Articles' }, icon: '✨' },
  { id: 'deities', label: { hy: 'Աստվածներ', ru: 'Божества', en: 'Deities' }, icon: '⚡' },
  { id: 'creatures', label: { hy: 'Առասպելական Էակներ', ru: 'Мифические существа', en: 'Creatures' }, icon: '🐉' },
  { id: 'sanctuaries', label: { hy: 'Սրբավայրեր և Տաճարներ', ru: 'Святилища и храмы', en: 'Sanctuaries' }, icon: '🏛️' },
  { id: 'legends', label: { hy: 'Առասպելներ և Էպոս', ru: 'Легенды и космология', en: 'Legends' }, icon: '📜' },
  { id: 'history', label: { hy: 'Ուրարտու և Պատմիչներ', ru: 'Урарту и историки', en: 'History & Sources' }, icon: '🏺' }
];

export const ENCYCLOPEDIA_ARTICLES = [
  
  {
    id: 'vahagn',
    category: 'deities',
    icon: '🔥',
    image: '/assets/images/vahagn.jpg',
    title: { hy: 'Վահագն (Վիշապաքաղ)', ru: 'Ваагн (Вишапаках)', en: 'Vahagn (The Dragon Reaper)' },
    subtitle: {
      hy: 'Կրակի, որոտի, ռազմի և հերոսության աստված',
      ru: 'Бог небесного огня, грозы, солнца и воинской доблести',
      en: 'God of cosmic fire, thunder, heroic war, and solar vitality'
    },
    era: { hy: 'Մ.թ.ա. II հազարամյակ – մ.թ. IV դար', ru: 'II тыс. до н.э. – IV в. н.э.', en: '2nd Mill. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Կրակ, կայծակ, արևային աչքեր, հրե մորուք, նիզակ',
        cultCenter: 'Աշտիշատ (Վահեվանյան մեհյան, Տարոն)',
        sacredAnimal: 'Արծիվ, առյուծ',
        symbol: 'Արեվախաչ, կրակե եղեգ',
        family: 'Արամազդի որդին, Աստղիկի սիրելին'
      },
      ru: {
        attributes: 'Огонь, молния, очи-солнца, огнекудрая борода, копье',
        cultCenter: 'Аштишат (храм Вахеваньян в Тароне)',
        sacredAnimal: 'Орёл, лев',
        symbol: 'Аревахач, пламенный тростник',
        family: 'Сын Арамазда, возлюбленный богини Астхик'
      },
      en: {
        attributes: 'Fire, thunderbolts, sun-eyes, fiery hair, sacred spear',
        cultCenter: 'Ashtishat (Vahevanyan sanctuary in Taron)',
        sacredAnimal: 'Eagle, lion',
        symbol: 'Arevakhach, blazing reed',
        family: 'Son of Aramazd, beloved of Astghik'
      }
    },
    summary: {
      hy: 'Վահագնը հին հայոց ամենասիրված և հերոսական աստվածն է։ Ծնվել է տիեզերական բնության երկունքից՝ ծիրանի ծովում բոցավառվող եղեգնից։ Որպես Վիշապաքաղ՝ նա սպանել է երկրի կենսատու ջրերն ու արեգակը կլանող վիշապներին։',
      ru: 'Ваагн — центральный богатырский образ древнеармянского пантеона. Рождённый из пламенного тростника в пурпурном море, он поражал громовыми стрелами гигантских змеев-вишапов, возвращая живительную влагу долинам.',
      en: 'Vahagn is the primeval dragon-slayer champion of Armenia. Born from a blazing reed within the purple sea, he freed blocked mountain aquifers by destroying monstrous serpentine Vishaps.'
    },
    content: {
      hy: [
        '**Ծննդյան Երգը (Մովսես Խորենացի)**:\nՄովսես Խորենացին իր «Հայոց պատմության» մեջ պահպանել է հինավուրց գողթան երգիչների անգին երգը.\n> *«Երկնէր երկին, երկնէր երկիր, երկնէր և ծովն ծիրանի.\n> Երկն ի ծովուն ունէր և զկարմրիկն եղեգնիկ:\n> Ընդ եղեգան փող ծուխ ելանէր, ընդ եղեգան փող բոց ելանէր.\n> Եւ ի բոցոյն վազէր խարտեաշ պատանեկիկ.\n> Նա հուր հեր ունէր, բոց ունէր մօրուս, և աչկունքն էին արեգակունք։»*',
        '**Վիշապաքաղ և Ջրերի Փրկություն**:\nՀայկական լեռնաշխարհում վիշապները մարմնավորում էին երաշտը, ամպրոպային քաոսն ու ջրային աղբյուրների զավթումը։ Վահագնը նիզակով մարտնչում էր վիշապների դեմ, ճեղքում նրանց որովայնները և ազատ արձակում կենարար աղբյուրները։',
        '**Հարդագողի Ճանապարհը (Ծիր Կաթին)**:\nԸստ ավանդության՝ ցուրտ ձմռանը Վահագնը ասորեստանցիների նախահայր Բարշամից ծղոտ է գողանում՝ հայոց աշխարհը տաքացնելու համար։ Երկնքով անցնելիս ծղոտի փշուրները թափվում են երկնակամարում՝ ձևավորելով Մլեչնի Պուտը, որը հայերեն կոչվում է «Հարդագողի ճանապարհ»։'
      ],
      ru: [
        '**Песнь о Рождении Ваагна (Мовсес Хоренаци)**:\nОтец армянской историографии сохранил древнейший гимн, распевавшийся певцами Гохтана:\n> *«Рождало небо, рождала земля, рождало и пурпурное море.\n> Роды в море охватили и алый тростничок.\n> Из стебля тростника восходил дым, из стебля тростника восходило пламя,\n> И из пламени выбегал рыжекудрый юноша.\n> Были у него власы из огня, пламенем пламенела борода, а очи были солнцами!»*',
        '**Подвиг Вишапакаха (Истребителя Драконов)**:\nВишапы в мифологии нагорья перекрывали высокогорные истоки, требуя в жертву юных дев. Ваагн низвергался молнией в морские пучины и горные ущелья, рассекал гигантов и возвращал орошение полям.',
        '**Дорога Соломокрада (Млечный Путь)**:\nОдин из самых знаменитых этиологических мифов: суровой зимой Ваагн похитил у вавилонско-ассирийского царя Баршама солому, чтобы спасти от стужи очаги своего народа. По пути оброненные соломинки озарили ночное небо, образовав «Հարդագողի ճանապարհ» (Млечный Путь).'
      ],
      en: [
        '**The Song of Vahagn\'s Birth (Movses Khorenatsi)**:\nPreserved by the 5th-century historian Movses Khorenatsi from oral bards:\n> *«Heaven was in labor, earth was in labor, the purple sea was in labor!\n> In the sea the crimson reed was in labor also.\n> Out of the reed-stalk smoke issued, out of the reed-stalk flame issued,\n> And from the flame ran forth a fiery youth!\n> Fire was his hair, flame was his beard, and his eyes were twin suns!»*',
        '**The Vishapakagh (Dragon Reaper)**:\nIn ancient Armenian lore, monstrous subterranean serpent-dragons (Vishaps) blocked mountain water reservoirs and demanded human tributes. Armed with celestial thunderbolts and flaming spears, Vahagn shattered their stony grip, returning alpine streams to the plains.',
        '**The Straw Thief\'s Way (The Milky Way)**:\nDuring a punishing ancient winter, Vahagn stole straw from the granaries of the Assyrian rival ruler Barshamin to ignite warm hearths in Armenia. The spilled golden straws scattered across the heavens, forming the cosmic galaxy known in Armenian as *Hardagoghi Chanaparh*.'
      ]
    },
    quote: {
      hy: '«Նա հուր հեր ունէր, բոց ունէր մօրուս, և աչկունքն էին արեգակունք» — Մովսես Խորենացի',
      ru: '«Были у него власы из огня, пламенем пламенела борода, а очи были солнцами» — Мовсес Хоренаци',
      en: '«Fire was his hair, flame was his beard, and his eyes were twin suns» — Movses Khorenatsi'
    }
  },

  {
    id: 'aramazd',
    category: 'deities',
    icon: '👑',
    image: '/assets/images/aramazd.jpg',
    title: { hy: 'Արամազդ', ru: 'Арамазд', en: 'Aramazd' },
    subtitle: {
      hy: 'Հայր աստվածների, տիեզերքի և երկրի մեծ արարիչ',
      ru: 'Верховный отец богов, творец неба, земли и податель изобилия',
      en: 'Father of gods, architect of heaven, earth, and divine abundance'
    },
    era: { hy: 'Մ.թ.ա. VI դար – մ.թ. IV դար', ru: 'VI в. до н.э. – IV в. н.э.', en: '6th Cent. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Տիեզերական արդարություն, ամպրոպ, անձրևաբեր իմաստություն',
        cultCenter: 'Անի-Կամախ (Դարանաղյաց գավառ)',
        sacredAnimal: 'Սպիտակ ցուլ, ձի',
        symbol: 'Արքայական թագ, կայծակնային գավազան',
        family: 'Անահիտի, Միհրի և Նանեի հայրը'
      },
      ru: {
        attributes: 'Высшая мудрость, податель дождей и плодородия, творец',
        cultCenter: 'Крепость Ани-Камах (провинция Даранаги)',
        sacredAnimal: 'Белый бык, конь',
        symbol: 'Венценосный скипетр, солярное колесо',
        family: 'Отец Анаит, Михра, Ваагна и Нане'
      },
      en: {
        attributes: 'Cosmic law, thunderous bounty, bringer of spring rains',
        cultCenter: 'Ani-Kamakh fortress (Daranaghi district)',
        sacredAnimal: 'White bull, stallion',
        symbol: 'Royal scepter, celestial solar disc',
        family: 'Father of Anahit, Mihr, Vahagn, and Nane'
      }
    },
    summary: {
      hy: 'Արամազդը հայկական պանթեոնի գերագույն հայրն է՝ երկնքի, երկրի և մարդկանց բարօրության ստեղծիչը։ Նրանից էին հայցում առատ բերք, հաղթություն և տիեզերական խաղաղություն։',
      ru: 'Арамазд — верховное божество пантеона, творец вселенной. В армянской традиции он почитался как источник «полноты и тучности» (լիություն և պարարտություն), дарующий благодатные дожди.',
      en: 'Aramazd presided as the supreme father of the Armenian pantheon. Celebrated as the architect of cosmos, he commanded heavenly rains, agricultural bounty, and royal legitimacy.'
    },
    content: {
      hy: [
        '**Տիտղոսներ և Բնույթ**:\nԱգաթանգեղոսը նրան անվանում է «Մեծն և արի Արամազդ՝ արարիչ երկնի և երկրի, հայր բոլոր աստվածների»։ Նա համարվում էր ոչ միայն արարիչ, այլև պետականության և հայոց թագավորների գերագույն հովանավորը։',
        '**Սրբավայրը Անի-Կամախում**:\nԱրամազդի գլխավոր մեհյանը գտնվում էր Եփրատի ափին վեր խոյացող Անի-Կամախ ամրոցում։ Այստեղ էին թաղվում հայ Արշակունի թագավորները, իսկ տաճարի ներսում պահվում էին անհամար գանձեր և աստծո վեհաշուք արձանը։',
        '**Համադրումներ**:\nՀելլենիստական դարաշրջանում Արամազդը նույնացվել է հունական Զևսի հետ, իսկ նախնական արմատներով կրում էր ուրարտական Խալդիի և իրանական Ահուրա Մազդայի գերագույն իմաստնության տարրերը՝ պահպանելով հայկական ինքնատիպ բնույթը։'
      ],
      ru: [
        '**Священный титул**:\nАгафангел именует его: «Великий и мужественный Арамазд, творец неба и земли, податель изобилия и отец всех богов». В отличие от грозных богов соседних культур, Арамазд мыслился справедливым и доброжелательным отцом смертных.',
        '**Святилище в Ани-Камахе**:\nГлавный храмовый комплекс возвышался над неприступными утесами реки Евфрат в Ани-Камахе. Именно там располагался царский некрополь династии Аршакидов, где хранились родовые реликвии короны.',
        '**Эллинистический синкретизм**:\nВ эпоху Великой Армении Арташесидов и Аршакидов Арамазд сопоставлялся с греческим Зевсом Олимпийским, сочетая черты урартского владыки Халди и самобытную армянскую традицию благословения земли.'
      ],
      en: [
        '**Divine Attributes**:\nHistorian Agathangelos records him as «The Great and Valiant Aramazd, architect of heaven and earth, father of gods, and bestower of prosperity». He was characterized as a magnanimous fatherly creator.',
        '**The Sanctuary of Ani-Kamakh**:\nHis primary temple crowned the dramatic precipices of the Euphrates gorge at Ani-Kamakh (Kemah). This citadel also safeguarded the royal mausoleums of the Arsacid kings.',
        '**Cultural Syncretism**:\nDuring the Artaxiad renaissance, Aramazd became syncretized with Hellenic Zeus, uniting primordial Urartian foundations with indigenous Armenian reverence for heavenly justice.'
      ]
    },
    quote: {
      hy: '«Մեծն և արի Արամազդ՝ արարիչ երկնի և երկրի, լիութեան և պարարտութեան տուիչ» — Ագաթանգեղոս',
      ru: '«Великий и доблестный Арамазд, творец неба и земли, даритель изобилия и тучности» — Агафангел',
      en: '«Great and valiant Aramazd, architect of heaven and earth, bestower of abundance» — Agathangelos'
    }
  },

  {
    id: 'anahit',
    category: 'deities',
    icon: '🌸',
    image: '/assets/images/anahit.jpg',
    title: { hy: 'Անահիտ (Ոսկեմայր)', ru: 'Анаит (Золотая Мать)', en: 'Anahit (The Golden Mother)' },
    subtitle: {
      hy: 'Մայրության, պտղաբերության, բժշկության և ջրերի մեծ դիցուհի',
      ru: 'Великая богиня материнства, плодородия, целительства и чистых вод',
      en: 'Great Goddess of fertility, healing, motherhood, and alpine waters'
    },
    era: { hy: 'Մ.թ.ա. I հազարամյակ – մ.թ. IV դար', ru: 'I тыс. до н.э. – IV в. н.э.', en: '1st Mill. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Ոսկե թագ, նռնենու ճյուղ, կենսատու սափոր',
        cultCenter: 'Երիզա (Եկեղյաց գավառ), Արտաշատ, Տարոն',
        sacredAnimal: 'Սպիտակ աղավնի, եղնիկ',
        symbol: 'Ոսկի, նուռ, լոտոս, մաքուր աղբյուրներ',
        family: 'Արամազդի ավագ դուստրը'
      },
      ru: {
        attributes: 'Золотая корона, гранатовая ветвь, сосуд с живой водой',
        cultCenter: 'Ериза (провинция Экегяц), Арташат, Тарон',
        sacredAnimal: 'Белая голубка, лань',
        symbol: 'Золото, спелый гранат, горные ключи',
        family: 'Старшая дочь верховного Арамазда'
      },
      en: {
        attributes: 'Golden crown, pomegranate branch, vessel of living water',
        cultCenter: 'Eriza (Acilisene province), Artashat, Taron',
        sacredAnimal: 'White dove, hind',
        symbol: 'Gold, ripe pomegranate, pure alpine springs',
        family: 'Eldest daughter of Aramazd'
      }
    },
    summary: {
      hy: 'Անահիտը հայոց ամենապաշտելի դիցուհին էր՝ «Ոսկեմայր» և «Հայոց աշխարհի փառքն ու կենսատուն»։ Նա հովանավորում էր ընտանիքները, մայրերին, նորածիններին և բնության զարթոնքը։',
      ru: 'Анаит почиталась как «Золотая Мать» и «слава и спасительница армянской нации». Ей посвящались грандиозные золотые изваяния, а праздник Навасард чествовал плоды её благословения.',
      en: 'Revered as the Golden Mother and the Glory and Nourisher of Armenia, Anahit stood as the supreme maternal protector of life, medicine, childbearing, and pristine springs.'
    },
    content: {
      hy: [
        '**«Ոսկեհատ Ոսկեմայր»**:\nԱնահիտի գլխավոր մեհյանը Եկեղյաց գավառի Երիզա ավանում էր (այժմ՝ Երզնկա), որի պատճառով այդ շրջանը կոչվում էր «Անահտական»։ Այստեղ կանգնեցված էր նրա հռչակավոր ամբողջական ոսկեձույլ արձանը։ Պլինիոս Ավագը գրում է, որ մ.թ.ա. 34 թ. Մարկոս Անտոնիոսի զինվորները թալանել են տաճարը և կտոր-կտոր բաժանել ոսկե արձանը։',
        '**Պաշտամունք և Տոներ**:\nՆավասարդի օրերին հազարավոր ուխտավորներ հավաքվում էին Անահիտի մեհյանների մոտ։ Նրան նվիրաբերում էին սպիտակ երինջներ, ոսկե պսակներ և նորածիլ ցորենի հասկեր։ Բժիշկներն ու ծննդկանները նրա անունով էին կատարում աղոթքները։',
        '**Բրիտանական Թանգարանի Բրոնզե Գլուխը**:\n1872 թ. Սատաղում (Փոքր Հայք) հայտնաբերվեց Անահիտ դիցուհու հելլենիստական ոճի բրոնզե արձանի հոյակերտ գլուխը, որն այժմ պահվում է Լոնդոնի Բրիտանական թանգարանում և համարվում է հայկական հնագույն արվեստի գլուխգործոց։'
      ],
      ru: [
        '**Золотой Кумир Еризы**:\nВ главном святилище в Еризе (Ерзнка) высилась статуя богини из чистого золота. Римский писатель Плиний Старший сообщает, что в 34 г. до н.э. легионеры Марка Антония разграбили храм и разбили золотую статую на куски, дабы поделить слитки драгоценного металла.',
        '**Материнская защита народа**:\nЦарь Трдат Великий в своих указах именовал её: «Великая госпожа Анаит, слава нашего народа и дарительница жизни, дочь великого и мужественного Арамазда».',
        '**Бронзовый шедевр в Британском Музее**:\nВ 1872 году близ Саталы (Малая Армения) была обнаружена великолепная бронзовая голова богини Анаит эллинистической эпохи, ныне экспонирующаяся в Британском музее в Лондоне.'
      ],
      en: [
        '**The Golden Sanctuary at Eriza**:\nHer premier temple stood at Eriza (Erzincan) in Acilisene. Roman chronicler Pliny the Elder recorded that when Mark Antony invaded Armenia in 34 BC, his soldiers plundered the sanctuary and shattered her life-sized solid gold idol.',
        '**Praise by King Tiridates**:\nAncient decrees inscribed by Armenian monarchs hail her as «The Great Lady Anahit, the glory of our realm, the nourisher of mankind, daughter of valiant Aramazd».',
        '**The British Museum Bronze**:\nIn 1872, an exquisite Hellenistic bronze head attributed to Anahit was unearthed at Satala in Lesser Armenia, now celebrated as an artistic centerpiece in the British Museum in London.'
      ]
    },
    quote: {
      hy: '«Մեծ տիկին Անահիտ, որ մեր ազգի փառքն է և կենսատուն» — Տրդատ Գ Մեծ արքա',
      ru: '«Великая госпожа Анаит, слава нашего народа и подательница жизни» — Царь Трдат III Великий',
      en: '«Great Lady Anahit, who is the glory of our realm and giver of life» — King Tiridates III'
    }
  },

  {
    id: 'astghik',
    category: 'deities',
    icon: '✨',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Աստղիկ', ru: 'Астхик', en: 'Astghik' },
    subtitle: {
      hy: 'Սիրո, գեղեցկության, ջրի և երկնային լույսի դիցուհի',
      ru: 'Богиня любви, девичьей красоты, утренней зари и водных источников',
      en: 'Goddess of love, maiden beauty, morning dew, and celestial waters'
    },
    era: { hy: 'Մ.թ.ա. I հազարամյակ – մ.թ. IV դար', ru: 'I тыс. до н.э. – IV в. н.э.', en: '1st Mill. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Վարդեր, լույսի ճառագայթներ, լուսաբաց',
        cultCenter: 'Աշտիշատ (Դեմյան մեհյան, Տարոն)',
        sacredAnimal: 'Աղավնի',
        symbol: 'Վարդ, աստղ (Վեներա մոլորակ), ջրի կաթիլներ',
        family: 'Վահագնի սիրելին'
      },
      ru: {
        attributes: 'Алые розы, утренняя заря, капли росы',
        cultCenter: 'Аштишат (покои Демьян в Тароне)',
        sacredAnimal: 'Голубка',
        symbol: 'Роза, утренняя звезда (Венера), всплески воды',
        family: 'Возлюбленная бога Ваагна'
      },
      en: {
        attributes: 'Red roses, dawn rays, shimmering morning dew',
        cultCenter: 'Ashtishat (Demyan chamber in Taron)',
        sacredAnimal: 'Dove',
        symbol: 'Rose, Morning Star (Venus), water splash',
        family: 'Beloved companion of Vahagn'
      }
    },
    summary: {
      hy: 'Աստղիկը՝ Վահագնի հավերժ սիրելին, մարմնավորում էր անբիծ սերն ու լուսաբացը։ Նրան է վերագրվում համաժողովրդական Վարդավառի տոնի ծնունդը, երբ մարդիկ միմյանց վրա ջուր են ցողում և վարդեր նվիրում։',
      ru: 'Астхик — древнеармянская богиня любви, красоты и утренней зари. Её романтический союз с огнекудрым Ваагном олицетворял животворный брак огня и воды, породивший праздник Вардавар.',
      en: 'Astghik personified celestial beauty, love, and dawn. Her cosmic courtship with fiery Vahagn symbolized the union of flame and spring water, giving rise to the beloved Vardavar water festival.'
    },
    content: {
      hy: [
        '**Վահագնի և Աստղիկի Սերը**:\nԱշտիշատում Աստղիկի «սենյակը» կոչվում էր Դեմյան։ Երբ դիցուհին գիշերը լողանում էր Եփրատ գետում, հիացած երիտասարդները լեռների գագաթներին կրակներ էին վառում, որպեսզի տեսնեն նրա լուսեղեն գեղեցկությունը։ Սակայն Աստղիկը տարածում էր մշուշ՝ թաքցնելով իր մարմինը անարժան հայացքներից։',
        '**Վարդավառի Ծագումը**:\n«Վարդավառ» բառը կապված է «վարդ» և «վառ» արմատների հետ (նաև խեթա-ուրարտական «վարդ»՝ ջուր ցողել իմաստով)։ Դիցուհուն նվիրում էին կարմիր վարդեր, բաց էին թողնում աղավնիներ և միմյանց ջրում էին՝ մաքրվելով հոգևոր և ֆիզիկական ախտերից։'
      ],
      ru: [
        '**Омовение в тумане Евфрата**:\nПо преданию, каждую ночь богиня спускалась к реке Арацани (приток Евфрата) для омовения. Желая полюбоваться её сияющей красотой, юноши разжигали костры на склонах гор, но целомудренная Астхик окутывала долину густым туманом.',
        '**Праздник Вардавар**:\nС именем Астхик неразрывно связан Вардавар. В древности в этот день влюбленные преподносили друг другу розы (վարդ) и окропляли священной водой, благодаря за щедрость лета и возрождение любви.'
      ],
      en: [
        '**Bathing in the Mist of the Euphrates**:\nLegend recounts that Astghik bathed nightly in the waters of the Aratsani. Enamored youths lit towering bonfires on mountain peaks to catch glimpses of her radiance, yet she cast veil-like mists over the valley to conceal herself.',
        '**Origin of Vardavar**:\nIn her honor, people celebrated Vardavar by offering wild roses and sprinkling fresh mountain spring water on one another, a festival of purification and joyous joy celebrated continuously to this day.'
      ]
    },
    quote: {
      hy: '«Երբ Աստղիկը լողանում էր Արաբանիում, մշուշը պատում էր լեռները» — Ժողովրդական զրույց',
      ru: '«Когда Астхик купалась в реке, священный туман укрывал горы» — Народное предание',
      en: '«When Astghik bathed in the river, sacred mists veiled the hills» — Ancient Legend'
    }
  },

  {
    id: 'mihr',
    category: 'deities',
    icon: '☀️',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Միհր', ru: 'Михр', en: 'Mihr' },
    subtitle: {
      hy: 'Արեգակի, լույսի, ճշմարտության և պայմանագրերի աստված',
      ru: 'Бог небесного света, солнца, справедливости и священных клятв',
      en: 'God of solar radiance, truth, moral light, and holy covenants'
    },
    era: { hy: 'Մ.թ.ա. I հազարամյակ – մ.թ. IV դար', ru: 'I тыс. до н.э. – IV в. н.э.', en: '1st Mill. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Արեգակնային սկավառակ, կրակե ջահ, հավերժական բոց',
        cultCenter: 'Գառնի, Բագայառիճ (Դերջան գավառ)',
        sacredAnimal: 'Սպիտակ նժույգ, առյուծ',
        symbol: 'Արեվախաչ, ճառագայթող արև',
        family: 'Արամազդի որդին'
      },
      ru: {
        attributes: 'Солнечный диск, жертвенный огонь, нерушимая клятва',
        cultCenter: 'Храм Гарни, Багаярич (провинция Дерджан)',
        sacredAnimal: 'Белый скакун, солнечный лев',
        symbol: 'Аревахач, лучистое солнце',
        family: 'Сын верховного Арамазда'
      },
      en: {
        attributes: 'Solar disc, eternal flame of truth, covenant seal',
        cultCenter: 'Temple of Garni, Bagayarich',
        sacredAnimal: 'White charger, lion',
        symbol: 'Arevakhach, radiant solar wheel',
        family: 'Son of Aramazd'
      }
    },
    summary: {
      hy: 'Միհրը արեգակի և արդարության դիցն է, ում տաճարը մինչ օրս հպարտորեն կանգուն է Գառնիում։ Հայկական էպոսում նրա կերպարը վերածվել է «Մհեր» հերոսի, ով փակված է Ագռավաքարի ժայռում։',
      ru: 'Михр олицетворяет благородный свет и божественную истину. Его единственный сохранившийся эллинистический храм I в. н.э. украшает ущелье Гарни. В эпосе «Сасна Црер» он перевоплотился в образ Мгера Младшего.',
      en: 'Mihr governed heavenly illumination, truth, and covenants. The iconic 1st-century AD Temple of Garni was consecrated in his name. In national folklore, his archetype survives as Mher in the Sassoun epic.'
    },
    content: {
      hy: [
        '**Գառնու Հեթանոսական Տաճարը**:\nՏրդատ Ա թագավորը մ.թ. 77 թվականին Գառնիում կառուցեց հունա-հռոմեական սյունազարդ հոյակերտ տաճարը՝ նվիրված Միհրին։ Տաճարի ներսում տեղադրված էր աստծո արձանը, որը լուսավորվում էր առաստաղի բացվածքից ընկնող արևի առաջին ճառագայթներով։',
        '**Փոքր Մհեր և Ագռավաքար**:\n«Սասնա Ծռեր» էպոսում Փոքր Մհերը չի կարողանում ապրել անարդար դարձած աշխարհում («Աշխարհը ծուռ է, հողը չի դիմանում իմ ձիուն»)։ Նա փակվում է Վանի Ագռավաքար (Մհերի դուռ) ժայռի մեջ՝ խոստանալով դուրս գալ այն ժամանակ, երբ ցորենը դառնա մասուրի չափ, իսկ գարին՝ ընկույզի։'
      ],
      ru: [
        '**Храм Гарни — Жемчужина Нагорья**:\nПостроенный царем Трдатом I в 77 г. н.э., храм Гарни посвящен богу солнца Михру. Это единственный античный языческий храм, полностью уцелевший на территории Армении и всего постсоветского пространства.',
        '**Мгер Младший и Вороний Камень**:\nВ эпосе «Давид Сасунский» божество трансформировалось в Мгера Младшего. Видя, как мир погружается во зло и несправедливость, богатырь уходит в скалу Агравакар (Дверь Мгера у озера Ван), ожидая часа возрождения праведного мира.'
      ],
      en: [
        '**The Ionic Colonnade of Garni**:\nErected in 77 AD by King Tiridates I, the Temple of Garni stands as an architectural marvel dedicated to Mihr, perched majestically above the dramatic basalt basalt cliffs of the Azat river gorge.',
        '**Lesser Mher and the Raven\'s Rock**:\nIn the national epic *Daredevils of Sassoun*, the god reemerges as Lesser Mher. Mourning that the world has turned corrupt and earth cannot hold his weight, he seals himself within the Raven\'s Rock near Van, awaiting the renewal of justice.'
      ]
    },
    quote: {
      hy: '«Քանի աշխարհքը չար է, ես ժայռից դուրս չեմ գա» — Փոքր Մհեր',
      ru: '«Пока миром правит зло, я не покину эту скалу» — Мгер Младший',
      en: '«While evil rules the world, I shall not leave this stone» — Lesser Mher'
    }
  },

  {
    id: 'tir',
    category: 'deities',
    icon: '📜',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Տիր (Երազացույց)', ru: 'Тир (Толкователь Снов)', en: 'Tir (God of Wisdom & Scribes)' },
    subtitle: {
      hy: 'Գրի, դպրության, իմաստության, արվեստների և երազների մեկնիչ',
      ru: 'Бог письменности, науки, искусств, сновидений и небесный писарь',
      en: 'God of written knowledge, scholastic wisdom, divination, and dreams'
    },
    era: { hy: 'Մ.թ.ա. IV դար – մ.թ. IV դար', ru: 'IV в. до н.э. – IV в. н.э.', en: '4th Cent. BC – 4th Cent. AD' },
    infobox: {
      hy: {
        attributes: 'Գրչագիր մատյան, փետուր, աստղային քարտեզ',
        cultCenter: 'Երազամույն (Արտաշատի մոտ)',
        sacredAnimal: 'Իմաստուն բու',
        symbol: 'Գիրք, փետրագրիչ, մագաղաթ',
        family: 'Արամազդի գրագիրն ու պատգամախոսը'
      },
      ru: {
        attributes: 'Небесная книга деяний, тростниковое перо, свиток',
        cultCenter: 'Еразамуйн (близ древнего Арташата)',
        sacredAnimal: 'Сова мудрости',
        symbol: 'Пергамент, священное перо',
        family: 'Секретарь и вестник верховного Арамазда'
      },
      en: {
        attributes: 'Book of celestial decrees, reed stylus, starry parchment',
        cultCenter: 'Erazamoyn (near ancient Artashat)',
        sacredAnimal: 'Owl',
        symbol: 'Scroll, stylus, celestial script',
        family: 'Chancellor and scribe of Aramazd'
      }
    },
    summary: {
      hy: 'Տիրը գիտելիքի և դպրության աստվածն էր, ով արձանագրում էր մարդկանց բարի և չար գործերը Արամազդի մատյանում և մեկնաբանում գիշերային երազները։',
      ru: 'Тир считался покровителем просвещения, мудрости и пророческих сновидений. Он записывал людские дела в книгу судеб и препровождал души в загробный мир.',
      en: 'Tir guided scribes, scholarship, and prophetic dreams. Sitting at the celestial court, he transcribed human deeds into the book of destiny.'
    },
    content: {
      hy: [
        '**Երազամույնի Տաճարը**:\nՏիրի գլխավոր մեհյանը կոչվում էր Երազամույն («Երազահան տեղ») և գտնվում էր Արտաշատից Վաղարշապատ տանող ճանապարհին։ Մարդիկ գալիս էին այստեղ՝ քրմերից իրենց երազների իմաստը իմանալու և ապագան գուշակելու նպատակով։',
        '**«Գրողի Ծոցը»**:\nՀայերեն հայտնի արտահայտությունը՝ «Գրողի ծոցը ուղարկել», կապված է Տիրի հետ։ Տիրին կոչում էին նաև «Գրող», քանի որ նա էր գրանցում մահվան ժամը և հոգիներին առաջնորդում հանդերձյալ կյանք։'
      ],
      ru: [
        '**Святилище Еразамуйн**:\nГлавный оракул бога находился в местечке Еразамуйн («Место толкования снов») близ Арташата. Сюда стекались писцы, мудрецы и правители для истолкования ночных откровений.',
        '**«В объятия Гроха» (Գրողի ծոցը)**:\nВ народном фольклоре Тир дал начало образу «Гроха» (Писаря судьбы), который фиксирует смертный час человека.'
      ],
      en: [
        '**The Oracle of Erazamoyn**:\nHis primary sanctuary, Erazamoyn («Expounder of Dreams»), was located on the ancient royal road between Artashat and Vagharshapat, where pilgrims consulted sacred dream interpreters.',
        '**The Celestial Scribe**:\nTir recorded the moments of mortal passing, inspiring the timeless Armenian idiom referring to the fateful scribe.'
      ]
    },
    quote: {
      hy: '«Տիր դիցն էր գրի ու իմաստութեան, որ մեկնէր զերազս մարդկան» — Հնագույն ավանդություն',
      ru: '«Тир был богом письменности и премудрости, толкующим сны смертных» — Древняя хроника',
      en: '«Tir was the deity of scholarship and dreams who unraveled omens» — Ancient Chronicle'
    }
  },

  
  {
    id: 'vishap',
    category: 'creatures',
    icon: '🐉',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Վիշապներ և Վիշապաքարեր', ru: 'Вишапы и Вишапакары', en: 'Vishaps & Vishapakars' },
    subtitle: {
      hy: 'Հնագույն վիշապ-օձեր և 5000-ամյա ջրային կոթողներ',
      ru: 'Древние драконы-великаны и 5000-летние каменные стражи вод',
      en: 'Primordial serpent-dragons and 5,000-year-old megalithic stelae'
    },
    era: { hy: 'Մ.թ.ա. III–I հազարամյակներ', ru: 'III–I тыс. до н.э.', en: '3rd–1st Mill. BC' },
    infobox: {
      hy: {
        nature: 'Ջրերի, ամպերի և երկնային որոտի տարերային ուժեր',
        locations: 'Գեղամա լեռներ, Արագած, Սևան, Գառնի',
        stoneType: 'Բազալտե ձկնակերպ և ցլակերպ մոնումենտալ կոթողներ',
        adversary: 'Վահագն Վիշապաքաղ'
      },
      ru: {
        nature: 'Повелители водных источников, бурь и подземных каналов',
        locations: 'Гегамские горы, Арагац, Севан, Гарни',
        stoneType: 'Базальтовые рыбообразные монолиты до 5 метров',
        adversary: 'Ваагн Драконоборец'
      },
      en: {
        nature: 'Elemental sovereigns of springs, storms, and aquifers',
        locations: 'Geghama Range, Mount Aragats, Lake Sevan',
        stoneType: 'Basalt fish-shaped and bull-draped megalithic stelae',
        adversary: 'Vahagn the Dragon Reaper'
      }
    },
    summary: {
      hy: 'Վիշապները հայկական դիցաբանության ամենահնագույն կերպարներից են։ Դեռևս բրոնզե դարից պահպանվել են եզակի «Վիշապաքարեր»՝ ձկների կամ ցուլերի տեսքով քարակոթողներ, որոնք կանգնեցվել են ջրային ակունքների մոտ։',
      ru: 'Вишапы — древнейшие мифические исполины Армянского нагорья. С глубокой древности сохранились уникальные мегалиты — вишапакары (рыбообразные каменные стелы), отмечавшие истоки горных рек.',
      en: 'Vishaps are primeval dragon spirits representing alpine water systems. Unique Bronze Age stone stelae (Vishapakars), carved like gigantic fish or draped bull hides, guarded natural mountain springs.'
    },
    content: {
      hy: [
        '**Ինչպիսի՞ն էին Վիշապները**:\nՀայկական ավանդազրույցներում վիշապները հսկա օձակերպ կամ թևավոր հրեշներ էին, որոնք ապրում էին բարձր լեռնային լճերում (Սևան, Աժդահակ)։ Երբ նրանք մեծանում էին, բարձրանում էին երկինք՝ առաջացնելով կայծակներ և ամպրոպային փոթորիկներ։',
        '**Վիշապաքարերի Հնագիտական Ֆենոմենը**:\n1909 թ. Նիկողայոս Մառը և Յակով Սմիրնովը Գեղամա լեռներում հայտնաբերեցին հսկայական (մինչև 5 մետր) բազալտե ձկնաձև կոթողներ։ Դրանք թվագրվում են մ.թ.ա. 3-րդ հազարամյակով և վկայում են ջրի սրբազան պաշտամունքի մասին։'
      ],
      ru: [
        '**Мифический облик**:\nВишапы представлялись гигантскими змеями или водными драконами, обитающими в высокогорных озерах. Они могли вызывать бури, смерчи и затмения солнца, заглатывая небесные светила.',
        '**Археологическое открытие вишапакаров**:\nВ 1909 году экспедиция Н. Марра и Я. Смирнова на высокогорье Гегамских гор исследовала уникальные монолиты — «вишапакары». Высеченные из цельного базальта в виде сомов или быков, они являлись древнейшими святилищами оросительных каналов.'
      ],
      en: [
        '**Mythological Nature**:\nVishaps embodied primordial nature: giant horned serpents residing in alpine waters who could ascend into cloudbanks to unleash torrential tempests.',
        '**Archaeological Megaliths**:\nIn 1909, explorers Nicholas Marr and Yakov Smirnov cataloged prehistoric stone monuments across high plateau meadows. Dating to the 3rd millennium BC, these stelae stand among the earliest water-cult monuments in Eurasia.'
      ]
    },
    quote: {
      hy: '«Վիշապաքարերը հայոց լեռների լուռ պահապաններն են» — Հնագիտական աշխատություն',
      ru: '«Вишапакары — безмолвные хранители горных источников Армении» — Академические труды',
      en: '«Vishapakars are the silent megalithic sentinels of the Armenian highlands»'
    }
  },

  {
    id: 'aralez',
    category: 'creatures',
    icon: '🐕',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Արալեզներ', ru: 'Аралезы', en: 'Aralezner (The Winged Healers)' },
    subtitle: {
      hy: 'Երկնային թևավոր շներ, որոնք լիզելով հարություն էին տալիս հերոսներին',
      ru: 'Крылатые псы небес, воскрешавшие павших героев своим дыханием и лизанием ран',
      en: 'Winged celestial canines that descended to lick battle wounds and restore life'
    },
    era: { hy: 'Մ.թ.ա. II հազարամյակ – մ.թ. V դար', ru: 'II тыс. до н.э. – V в. н.э.', en: 'Bronze Age – 5th Cent. AD' },
    infobox: {
      hy: {
        appearance: 'Թևավոր շներ, երկնային ոգիներ',
        associatedLegend: 'Արա Գեղեցիկ և Շամիրամ, Մուշեղ Մամիկոնյան',
        power: 'Վերակենդանացում, վերքերի բուժում',
        origin: 'Հայկական բնիկ հավատալիքներ'
      },
      ru: {
        appearance: 'Крылатые верные псы, спускающиеся с небес',
        associatedLegend: 'Ара Прекрасный и Семирамида (Шамирам)',
        power: 'Оживление павших в бою богатырей',
        origin: 'Исконная традиция Армянского нагорья'
      },
      en: {
        appearance: 'Winged celestial hounds gliding from the firmament',
        associatedLegend: 'Ara the Beautiful and Semiramis (Shamiram)',
        power: 'Resurrection of fallen heroic warriors',
        origin: 'Indigenous highland mythos'
      }
    },
    summary: {
      hy: 'Արալեզները հայկական դիցաբանության ամենահուզիչ էակներից են՝ հավատարիմ երկնային թևավոր շներ, ովքեր իջնում էին ռազմադաշտ և իրենց կախարդական լեզվով լիզելով՝ կյանքի կոչում ընկած քաջերին։',
      ru: 'Аралезы — благородные крылатые существа древнеармянских легенд. После кровопролитных сражений они слетали с небес и зализывали раны павших воинов, возвращая их к жизни.',
      en: 'Aralezner are winged celestial dog spirits celebrated in Armenian epic legend. They soared above battlefields, descending to lick the wounds of heroic commanders to resurrect them.'
    },
    content: {
      hy: [
        '**Արա Գեղեցիկի և Շամիրամի Առասպելը**:\nԵրբ Ասորեստանի թագուհի Շամիրամի զորքերի դեմ ճակատամարտում զոհվում է հայոց արքա Արա Գեղեցիկը, Շամիրամը հրամայում է նրա մարմինը դնել բարձր աշտարակի վրա, որպեսզի Արալեզները իջնեն և իրենց լեզվով լիզելով հարություն տան սիրելի արքային։',
        '**Մուշեղ Մամիկոնյանի Պատմությունը**:\nՓավստոս Բուզանդը հայտնում է, որ նույնիսկ 4-րդ դարում, երբ դավադրաբար սպանվեց սպարապետ Մուշեղ Մամիկոնյանը, նրա հարազատները դիակը դրեցին աշտարակի վրա՝ հավատալով, որ Արալեզները կվերակենդանացնեն քաջ զորավարին։'
      ],
      ru: [
        '**Сказание об Аре Прекрасном и Шамирам**:\nПосле гибели целомудренного армянского царя Ары на поле брани царица Шамирам велела отнести тело на вершину крепости, объявив: «Я повелела богам моим Аралезам зализать раны Ары, и он воскреснет».',
        '**Свидетельство Фавстоса Бузанда**:\nИсторик V века описывает, что даже после принятия христианства вера в Аралезов была настолько жива, что после гибели спарапета Мушега Мамиконяна близкие водрузили его тело на башню в ожидании крылатых спасителей.'
      ],
      en: [
        '**The Legend of Ara and Semiramis**:\nWhen the beloved Armenian king Ara the Beautiful perished defending his homeland against the invasion of Queen Semiramis (Shamiram), she placed his body upon a palace battlement, expecting the sacred Aralez hounds to restore his breath.',
        '**Historian Faustus\' Account**:\n5th-century chronicler Faustus of Byzantium recounts that soldiers placed the slain general Mushegh Mamikonian on a tower, attesting to how deeply this myth resonated through centuries.'
      ]
    },
    quote: {
      hy: '«Ես աղաչեցի Արալեզներին, որ իջնեն և լիզեն Արա Գեղեցիկի վերքերը» — Շամիրամ թագուհի',
      ru: '«Я молила богов-аралезов исцелить дыханием раны прекрасного Ары» — Царица Шамирам',
      en: '«I implored the Aralez to descend and breathe life into noble Ara»'
    }
  },

  
  {
    id: 'garni-temple',
    category: 'sanctuaries',
    icon: '🏛️',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Գառնու Հեթանոսական Տաճար', ru: 'Храм Гарни', en: 'The Temple of Garni' },
    subtitle: {
      hy: 'Մ.թ. I դարի հոյակերտ հունա-հռոմեական տաճար՝ նվիրված Միհրին',
      ru: 'Уникальный античный храм I века н.э., посвященный богу солнца Михру',
      en: '1st-century Greco-Roman classical colonnade dedicated to solar deity Mihr'
    },
    era: { hy: 'Կառուցվել է մ.թ. 77 թ. Տրդատ Ա արքայի կողմից', ru: 'Построен в 77 г. н.э. царем Трдатом I', en: 'Built in 77 AD by King Tiridates I' },
    infobox: {
      hy: {
        architecture: 'Հելլենիստական իոնիական օրդեր, 24 բազալտե սյուներ',
        deity: 'Միհր (Արեգակի աստված)',
        location: 'Կոտայքի մարզ, Ազատ գետի կիրճ',
        features: 'Արքայական բաղնիք մոզայկայով, ամրոց'
      },
      ru: {
        architecture: 'Ионический ордер, 24 массивные базальтовые колонны',
        deity: 'Михр (Бог солнечного света)',
        location: 'Котайкская область, ущелье реки Азат',
        features: 'Римская царская баня с мозаикой, цитадель'
      },
      en: {
        architecture: 'Peripteral Ionic order with 24 basalt colonnades',
        deity: 'Mihr (Solar deity)',
        location: 'Kotayk Province, Azat River Canyon',
        features: 'Royal thermal bath with seabed mosaic, fortress'
      }
    },
    summary: {
      hy: 'Գառնու տաճարը նախաքրիստոնեական Հայաստանի պահպանված միակ հեթանոսական տաճարն է։ Այն կանգնած է Ազատ գետի եռանկյունաձև բազալտե հրվանդանի վրա և խորհրդանշում է արևի 24 ժամերը։',
      ru: 'Храм Гарни — единственный уцелевший языческий храм на территории Армении и Закавказья. Воздвигнутый на вершине живописного базальтового мыса, он символизирует торжество вечного света.',
      en: 'The Temple of Garni is the sole standing Greco-Roman colonnaded building in Armenia. Erected upon a dramatic triangular basalt promontory, its 24 columns symbolize the hours of the solar day.'
    },
    content: {
      hy: [
        '**Հունարեն Արձանագրությունը**:\nՏաճարի մոտ պահպանվել է Տրդատ Ա արքայի հունարեն հայտնի արձանագրությունը. «Արեգակ Տրդատ թագավոր Մեծ Հայքի... իբրև տեր կառուցեց այս անառիկ ամրոցը իր թագուհու համար»։',
        '**24 Իոնիական Սյուները**:\nՏաճարն ունի 24 սյուն (6-ական դիմացից և ետևից, 8-ական կողքերից)։ Ըստ հետազոտողների՝ սյուների թիվը խորհրդանշում է օրվա 24 ժամերը՝ նվիրված արեգակի աստված Միհրի հավերժական պտույտին։'
      ],
      ru: [
        '**Греческая строительная надпись**:\nНа территории крепости сохранился базальтовый блок с греческой надписью царя Трдата I: «Гелиос! Трдат Великий, царь Великой Армении... построил эту неприступную крепость в 11-й год своего царствования» (77 г. н.э.).',
        '**Символика 24 колонн**:\nПериптер обрамлен 24 ионическими колоннами из цельного серого базальта, которые исследователи связывают с 24 часами солнечных суток, прославляя свет Михра.'
      ],
      en: [
        '**The Greek Dedicatory Inscription**:\nA basalt stele preserves Tiridates I\'s inscription in classical Greek: «Helios! Tiridates the Great, King of Greater Armenia... established this impregnable fortress».',
        '**Solar Symbolism of 24 Columns**:\nCarved from indigenous grey basalt, the 24 Ionic columns correspond to the 24 hours of the diurnal cycle under the guardianship of Mihr.'
      ]
    },
    quote: {
      hy: '«Արեգակ Տրդատ թագավոր Մեծ Հայքի կառուցեց զամրոցս» — Գառնու հունարեն արձանագրություն',
      ru: '«Гелиос! Трдат царь Великой Армении воздвиг сию твердыню» — Надпись царя Трдата I',
      en: '«Helios! Tiridates, monarch of Greater Armenia, founded this fortress»'
    }
  },

  {
    id: 'ashtishat',
    category: 'sanctuaries',
    icon: '⛪',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Աշտիշատ (Հայոց Օլիմպոս)', ru: 'Аштишат (Олимп Древней Армении)', en: 'Ashtishat (The Olympus of Armenia)' },
    subtitle: {
      hy: 'Հեթանոսական Հայաստանի գլխավոր հոգևոր կենտրոնը Տարոնում',
      ru: 'Главная духовная и религиозная столица дохристианской Армении',
      en: 'The premier religious capital of pre-Christian Armenia in Taron'
    },
    era: { hy: 'Մ.թ.ա. II հազարամյակ – մ.թ. 301 թ.', ru: 'II тыс. до н.э. – 301 г. н.э.', en: '2nd Mill. BC – 301 AD' },
    infobox: {
      hy: {
        deities: 'Վահագն, Անահիտ, Աստղիկ',
        region: 'Տարոն գավառ, Քարքե լեռան լանջին',
        river: 'Արածանի (Մուրադ)',
        significance: 'Ազգային մեհենական տոներ և Նավասարդ'
      },
      ru: {
        deities: 'Ваагн, Анаит, Астхик («Триада божеств»)',
        region: 'Провинция Тарон, у склона горы Карке',
        river: 'Река Арацани (Восточный Евфрат)',
        significance: 'Место всенародных торжеств и коронаций'
      },
      en: {
        deities: 'Vahagn, Anahit, Astghik (Divine Triad)',
        region: 'Taron District, slopes of Mount Karke',
        river: 'Aratsani River (Eastern Euphrates)',
        significance: 'Seat of Pan-Armenian festivals and Navasard'
      }
    },
    summary: {
      hy: 'Աշտիշատը համարվում էր հին հայոց «Օլիմպոսը»։ Այստեղ կողք կողքի կանգնած էին Վահագնի (Վահեվանյան), Անահիտի («Ոսկեհատ Ոսկեմոր») և Աստղիկի («Դեմյան») շքեղ մեհյանները։',
      ru: 'Аштишат в провинции Тарон почитался как священное сердце нагорья. Здесь располагались великолепные храмы верховной триады — Ваагна, Анаит и Астхик.',
      en: 'Ashtishat formed the sacred religious heart of the realm. Perched above the Aratsani river, it held the grandest sanctuaries of Vahagn, Anahit, and Astghik.'
    },
    content: {
      hy: [
        '**Երեք Սրբազան Տաճարները**:\nԱշտիշատի բլուրների վրա բարձրանում էին երեք մեհյաններ. Վահագնի տաճարը զարդարված էր ոսկով ու արծաթով, Անահիտինը՝ մայրական փառքով, իսկ Աստղիկի սենյակը՝ սիրո ծաղիկներով։ Այստեղ էին տեղի ունենում համահայկական Նավասարդյան խաղերը։',
        '**Քրիստոնեական Դարաշրջանը**:\n301 թ. Գրիգոր Լուսավորիչը տաճարների տեղում հիմնեց առաջին մայր եկեղեցիներից մեկը, իսկ 354 թ. Ներսես Մեծ կաթողիկոսը այստեղ գումարեց հանրահայտ Աշտիշատի Առաջին Կանոնական Ժողովը։'
      ],
      ru: [
        '**Триада Великих Храмов**:\nВ Аштишате на священных холмах стояли храмы трех любимейших богов: золотой трон Анаит, пламенный чертог Ваагна и ложе утренней зари Астхик. Сюда со всего царства стекались цари, нахарары и гусаны.',
        '**Христианская преемственность**:\nВ 301 г. Григорий Просветитель основал на месте языческих алтарей христианский собор, а в 354 г. католикос Нерсес Великий провел знаменитый Первый Аштишатский собор.'
      ],
      en: [
        '**The Triad of Sanctuaries**:\nAshtishat held the golden sanctuary of Anahit, the battle hall of Vahagn, and the fragrant bower of Astghik, drawing pilgrims from all corners of the kingdom.',
        '**Historic Transition**:\nIn 301 AD, Gregory the Illuminator established a cathedral upon the sanctuary ruins, which later hosted the monumental Council of Ashtishat in 354 AD.'
      ]
    },
    quote: {
      hy: '«Եվ հասան ի տեղին սուրբ յԱշտիշատ, ուր մեհեանքն մեծամեծք էին» — Ագաթանգեղոս',
      ru: '«И пришли они в святое место Аштишат, где стояли величайшие капища» — Агафангел',
      en: '«And they arrived at sacred Ashtishat, where stood the greatest temples»'
    }
  },

  
  {
    id: 'urartu-pantheon',
    category: 'history',
    icon: '🏺',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Ուրարտուի Դիցարանը (Խալդի, Թեյշեբա, Շիվինի)', ru: 'Пантеон Урарту (Халди, Тейшеба, Шивини)', en: 'The Urartian Pantheon (Haldi, Teisheba, Shivini)' },
    subtitle: {
      hy: 'Արարատյան թագավորության 79 աստվածությունները և Մհերի դուռը',
      ru: '79 божеств царства Урарту и клинописные врата Мгера в Ване',
      en: 'The 79 deities of Urartu and the cuneiform Door of Mher at Van'
    },
    era: { hy: 'Մ.թ.ա. IX–VI դարեր', ru: 'IX–VI вв. до н.э.', en: '9th–6th Cent. BC' },
    infobox: {
      hy: {
        supremeGod: 'Խալդի (առյուծի վրա կանգնած ռազմի դից)',
        stormGod: 'Թեյշեբա (ցուլ հեծնած ամպրոպի աստված)',
        sunGod: 'Շիվինի (թևավոր արևի սկավառակ)',
        inscription: 'Մհերի դռան արձանագրություն (Վան, 79 աստված)'
      },
      ru: {
        supremeGod: 'Халди (верховный бог-воитель на льве)',
        stormGod: 'Тейшеба (бог грозы и бури верхом на быке)',
        sunGod: 'Шивини (бог солнца с крылатым диском)',
        inscription: 'Надпись Мхери Дур (Скала Вана, 79 божеств)'
      },
      en: {
        supremeGod: 'Haldi (supreme warrior deity standing upon a lion)',
        stormGod: 'Teisheba (god of storms and tempest riding a bull)',
        sunGod: 'Shivini (solar deity depicted with winged disc)',
        inscription: 'Meher Kapısı Cuneiform inscription (Van Rock)'
      }
    },
    summary: {
      hy: 'Ուրարտուի (Արարատյան թագավորության) դիցարանը հանդիսանում է հայկական հնագույն հավատալիքների հիմնասյունը։ Վանի «Մհերի դուռ» ժայռափոր արձանագրության մեջ նշված են ուրարտական 79 աստվածներն ու նրանց մատուցվող զոհերը։',
      ru: 'Урартский пантеон — глубочайший исторический пласт верований Армянского нагорья. Верховная триада — Халди, Тейшеба и Шивини — заложила черты будущих армянских культов Арамазда, Ваагна и Михра.',
      en: 'The pantheon of Urartu (Kingdom of Van / Ararat) forms the deep historical bedrock of Armenian mythology. Documented upon the colossal cuneiform rock inscription at Van, 79 deities were officially revered.'
    },
    content: {
      hy: [
        '**Մհերի Դռան Արձանագրությունը**:\nԻշպուինի և Մենուա թագավորների օրոք (մ.թ.ա. 9-րդ դարի վերջ) Վանի ժայռի հարթեցված մակերեսին փորագրվեց ուրարտական պանթեոնի ամբողջական կանոնը։ Խալդիին զոհաբերվում էր 17 ցուլ և 34 ոչխար, Թեյշեբային՝ 6 ցուլ, Շիվինիին՝ 4 ցուլ։',
        '**Կապը Հայկական Դիցարանի Հետ**:\nՇատ գիտնականներ փաստում են, որ ուրարտական Խալդին իր տեղը զիջեց Արամազդին, ամպրոպի աստված Թեյշեբայի հատկանիշները փոխանցվեցին Վահագնին (Թեյշեբաինի ամրոցը Երևանում՝ Կարմիր բլուր), իսկ արևի աստված Շիվինիից սերում է Միհրի և Արեվախաչի պաշտամունքը։'
      ],
      ru: [
        '**Клинописная летопись скалы Вана**:\nЦари Ишпуини и Менуа высекли на полированной скале у озера Ван список 79 божеств и строгий распорядок жертвоприношений: верховному Халди предназначалось 17 быков и 34 овцы, Тейшебе — 6 быков, Шивини — 4 быка.',
        '**Преемственность в армянской культуре**:\nУрартские истоки зримо прослеживаются в пантеоне Великой Армении: Халди передал свои черты верховному Арамазду, грозный Тейшеба — Ваагну, а солнечный Шивини — культу Михра и священного солярного знака Аревахач.'
      ],
      en: [
        '**The Cuneiform Gate of Van**:\nCarved under Kings Ishpuini and Menua in the late 9th century BC, the sheer rock facade of Meher Kapısı codifies the rituals for 79 gods. Haldi received the paramount sacrifice of 17 bulls and 34 sheep.',
        '**Evolution into Armenian Lore**:\nScholars identify continuity between Urartian deities and classical Armenian myth: Haldi informed Aramazd, Teisheba\'s storm prowess enriched Vahagn, and Shivini\'s solar disc became the sacred Arevakhach.'
      ]
    },
    quote: {
      hy: '«Խալդի աստծուն՝ զորեղին, Իշպուինի Սարդուրորդին և Մենուա Իշպուինորդին կանգնեցրին այս սրբազան գիրը» — Վանի սեպագիր',
      ru: '«Богу Халди всемогущему, цари Ишпуини и Менуа высекли сии священные письмена» — Клинопись Вана',
      en: '«Unto Haldi the Lord, Kings Ishpuini and Menua inscribed these sacred decrees»'
    }
  },

  {
    id: 'movses-khorenatsi',
    category: 'history',
    icon: '🪶',
    image: '/assets/images/hero_bg.jpg',
    title: { hy: 'Մովսես Խորենացի (Պատմահայր)', ru: 'Мовсес Хоренаци (Отец Армянской Истории)', en: 'Movses Khorenatsi (Father of Armenian History)' },
    subtitle: {
      hy: 'V դարի մեծագույն պատմիչ, ով փրկեց հայոց հեթանոսական բանահյուսությունը',
      ru: 'Великий мыслитель V века, сохранивший древнейшие языческие мифы и песни',
      en: '5th-century master historian who immortalized pagan Armenian epics and songs'
    },
    era: { hy: 'V դար («Ոսկեդար»)', ru: 'V век («Золотой Век»)', en: '5th Century AD (Golden Age)' },
    infobox: {
      hy: {
        magnumOpus: '«Պատմություն Հայոց» (3 գրքով)',
        titleName: 'Քերթողահայր, Պատմահայր',
        teachers: 'Մեսրոպ Մաշտոց, Սահակ Պարթև',
        preservedMyths: 'Հայկ և Բել, Արա Գեղեցիկ, Վահագնի ծնունդ, Տիգրան և Աժդահակ'
      },
      ru: {
        magnumOpus: '«История Армении» (в 3-х томах)',
        titleName: 'Отец Истории, Верховный ритор',
        teachers: 'Месроп Маштоц, Саак Партев',
        preservedMyths: 'Гайк и Бэл, Ара Прекрасный, Рождение Ваагна, Арташес и Сатеник'
      },
      en: {
        magnumOpus: '«History of Armenia» (in 3 books)',
        titleName: 'Patmahayr (Father of History)',
        teachers: 'Mesrop Mashtots, Sahak Partev',
        preservedMyths: 'Hayk & Bel, Ara the Beautiful, Birth of Vahagn, Artashes & Satenik'
      }
    },
    summary: {
      hy: 'Մովսես Խորենացին հայ պատմագրության հայրն է։ Նրա «Պատմություն Հայոց» մատյանի շնորհիվ մենք այսօր գիտենք Հայկ նահապետի, Վահագնի ծննդյան, Արա Գեղեցիկի և հայոց արքաների առասպելները։',
      ru: 'Мовсес Хоренаци — основоположник армянской историографии. Благодаря его труду до нас дошли драгоценные строки древних песен гусанов о сотворении мира, богатырях и богах.',
      en: 'Movses Khorenatsi is revered as the Father of Armenian History. His monumental chronicle rescued the archaic oral bards of Goghtan from oblivion.'
    },
    content: {
      hy: [
        '**Գողթան Երգիչների Փրկությունը**:\nԽորենացին խորին հարգանքով էր վերաբերվում ժողովրդական ավանդազրույցներին. «Թեպետ մենք փոքր ածու ենք և թվով խիստ սահմանափակ, սակայն մեր երկրում ևս գործվել են քաջության շատ գործեր, որոնք արժանի են գրի առնվելու»։',
        '**Ազգային Ինքնագիտակցություն**:\nԽորենացու պատմությունը սկսվում է տիեզերական ջրհեղեղից և Հայկ Նահապետի՝ բռնակալ Բելի դեմ մղած ազատագրական ճակատամարտից (մ.թ.ա. 2492 թ.), որով հիմք դրվեց հայկական պետականությանը։'
      ],
      ru: [
        '**Песни певцов Гохтана**:\nХристианский ученый V века не отверг дохристианское наследие, а с трепетом записал живые эпические напевы гусанов, сохранив древнейшую поэзию армянского народа.',
        '**Бессмертная формула достоинства**:\nХоренаци вложил в уста своего народа знаменитые слова: «Хотя мы народ малый и числом весьма ограниченный и многократно бывали под чужим господством, все же и в нашей стране совершено много подвигов мужества, достойных занесения в летописи».'
      ],
      en: [
        '**Preserving the Bards of Goghtan**:\nA towering Christian scholar of the Golden Age, Khorenatsi listened closely to pagan folk minstrels, inscribing their poetic verses into formal history.',
        '**The Proclamation of Dignity**:\nHe penned the celebrated testament: «Though we are a small garden, modest in numbers and often subjected to foreign might, yet many deeds of valiant courage have been wrought in our land, worthy of eternal memory».'
      ]
    },
    quote: {
      hy: '«Թէպէտ և եմք ածու փոքր և թուով յոյժ ընդ փոքու սահմանեալ, այլ բազում գործք արութեան գտանին գործեալ և ի մերում աշխարհիս» — Մովսես Խորենացի',
      ru: '«Хотя мы народ малый и числом весьма ограниченный, однако и в нашей стране совершено много подвигов мужества» — Мовсес Хоренаци',
      en: '«Though we are a small nation, yet many deeds of valiant courage have been wrought in our land»'
    }
  }
];

