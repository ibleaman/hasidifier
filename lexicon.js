// HELPER FUNCTIONS

// originalword|replacementword
var pre_pipe = /\n.+?(?=\|)/g; // anything preceded by \n and followed by |
var post_pipe = /\|.+?(?=\n|(\/+))/g; // anything preceded by | and followed by \n or //

// combines matched arrays into a dictionary
function combine_variants(array1, array2) {
  var keys_values = {};

  var arrayLength = array1.length;
  for (var i = 0; i < arrayLength; i++) {
    keys_values[array1[i].substring(1,)] = array2[i].substring(1,);
  }
  return keys_values;
}

// goes through words in string and creates dictionary of exceptions and "tag#tag" indices
function index_exceptions(long_string, tag) {
  var array = long_string.match(/\n.+?(?=\n|(\/+))/mgi);
  var keys_values = {};

  var arrayLength = array.length;
  for (var i = 0; i < arrayLength; i++) {
    keys_values[array[i].substring(1,)] = tag + i + tag;
  }
  return keys_values;
}

// LEXICON VARIABLES

// note: lexicon entries should have:
//  וו not װ
//  וי not ױ
//  יי not ײ (for [ey] vowel)
//  ײַ not ייַ (for [ay] vowel)

// note: any comments should appear with "//" *immediately* after entry, no spaces

var lk_variants = `
שלמות|שלימות
גנבֿה|גניבֿה
גנבֿות|גניבֿות
נקבֿה|נקיבֿה
נקבֿות|נקיבֿות
מצבֿה|מציבֿה
מצבֿות|מציבֿות
ספֿקות|ספֿיקות
גילגול|גלגול
מיזרח|מזרח
מינהג|מנהג
מיצווה|מצוה
מיצוות|מצוות
גאווה|גאוה
ניפֿטר|נפֿטר
מישנה|משנה
מישפּט|משפּט
מיקווה|מקוה
דווקא|דוקא
כּוח<\/token>|כּח//koyekh but not koykhes
עופֿל|עוף'ל
עופֿעל|עוף'על
`;
lk_variants = combine_variants(lk_variants.match(pre_pipe), lk_variants.match(post_pipe));

var whole_word_variants = `
אײַפֿאָן|אײַפֿאָון
איצט|יעצט
איצטער|יעצט
איצטערט|יעצט
אָקיי|אָקעי
אָרעם|אָרים
בליצאַדרעס|אימעיל
בליצבריוו|אימעיל
בליצפּאָסט|אימעיל
ברייק|ברעיק
גיך|שנעל
געוויינט?לעך|געווענליך
גרענעץ|גרעניץ
דאָנערשטיק|דאָנערשטאָג
דינסטיק|דינסטאָג
זונטיק|זונטאָג
זײַנען|זענען
זע|זעה
זען|זעהן
זעט|זעהט
זעסט|זעהסט
טאָן|טוהן
לייען|ליין
לייענט|ליינט
לייענסט|ליינסט
לייענער|ליינער
לייענערס|ליינערס
מאָנטיק|מאָנטאָג
מײַספּייס|מײַספּעיס
נייטיק|נויטיק
סמאַרטפֿאָן|סמאַרטפֿאָון
פֿאַראַן|פֿאַרהאַן
פֿאַרזען|פֿאַרזעהן
פֿאַרלאָזלעך|פֿאַרלעסליך
פֿייסבוק|פֿעיסבוק
פֿרײַטיק|פֿרײַטאָג
צונויף|צאם
`;
// didn't include oyf'n, mit'n, far'n, etc.
whole_word_variants = combine_variants(whole_word_variants.match(pre_pipe), whole_word_variants.match(post_pipe));

var prefix_variants = `
אונדז|אונז
אָרעמ|אָרימ
גיכ|שנעל
גרענעצ|גרעניצ
דערהאַלט|ערהאַלט
דערוואַקס|ערוואַקס
דערוואַרט|ערוואַרט
דערלויב|ערלויב
דערפֿיל|ערפֿיל
דערצויג|ערצויג
דערצי|ערצי
דערקלער|ערקלער
דערשײַנ|ערשײַנ
ייִנ|אינ
נידעריק|נידריג
עמעצ|עמיצ
עקסיסט|עקזיסט
פֿאַרלאָזלעכ|פֿאַרלעסליכ
פֿראַנצייז|פֿראַנצויז
צוזאַמענ|צאַמ
צונויפֿ|צאַמ
רעדנדיק|רעדנד
אַבֿרהמ|אַבֿרהם
זלמנ|זלמן
אַהרונ|אַהרון
אַהרנ|אַהרן
בנימינ|בנימין
`;
prefix_variants = combine_variants(prefix_variants.match(pre_pipe), prefix_variants.match(post_pipe));

var suffix_variants = `
בראַכט|ברענגט
געזען|געזעהן
געלייענט|געליינט
זעען|זעהען
לייענען|ליינען
יקייט|יגקייט
יִקייט|יִגקייט
יקווײַז|יגווײַז
יִקווײַז|יגווײַז
`;
suffix_variants = combine_variants(suffix_variants.match(pre_pipe), suffix_variants.match(post_pipe));

var anywhere_variants = `
געטאָן|געטון
ייִד|איד
לייענענ|ליינענ
`;
anywhere_variants = combine_variants(anywhere_variants.match(pre_pipe), anywhere_variants.match(post_pipe));

var word_group_variants = `
אַ אימעיל|אַן אימעיל
אַ ביסל|אַביסל
אויף דער נאַכט|אויפֿדערנאַכט
אַזוי פֿיל|אַזויפֿיל
איין מאָל|איינמאָל
אין איינעם|אינאיינעם
אין גאַנצן|אינגאַנצן
אין דער היים|אינדערהיים
אין דער פֿרי|אינדערפֿרי
אין זין|אינזין
אין זינען|אינזינען
אין מיטן|אינמיטן
אַלע מאָל|אַלעמאָל
אַ סך|אַסאַך
קיין סך|קיין סאַך
אָפֿט מאָל|אָפֿטמאָל
בײַ טאָג|בײַטאָג
בײַ נאַכט|בײַנאַכט
די דאַטע(</token>)|דער דאַטום$1
דער דאַטע(</token>)|דעם דאַטום$1
די דאַטעס(</token>)|די דאַטומס$1
דאַטע(</token>)|דאַטום$1
הײַנט צו טאָג|הײַנטצוטאָג
וואָס פֿאַר אַ|וואָספֿאַראַ
ווי אַזוי|וויאַזוי
ווי באַלד|וויבאַלד
וויפֿל|וויפֿיל
טייל מאָל|טיילמאָל
מיט אַ מאָל|מיטאַמאָל
מע |מ'
נאָך אַלץ|נאָכאַלץ
נאָך אַ מאָל|נאָכאַמאָל
נאָך אַנאַנד|נאָכאַנאַנד
נאָך דעם|נאָכדעם
נאָך מיטאָג|נאָכמיטאָג
נאָך נישט|נאָכנישט
נאָך ניט|נאָכנישט
סע |ס'
פֿאַר וואָס|פֿאַרוואָס
פֿון דעסט וועגן|פֿונדעסטוועגן
קיין מאָל|קיינמאָל
`;
word_group_variants = combine_variants(word_group_variants.match(pre_pipe), word_group_variants.match(post_pipe));

var word_group_variants2 = {};
for (var grouping in word_group_variants) {
  key = grouping.replace(/\s/g, "</token><token> </token><token>");
  value = word_group_variants[grouping].replace(/\s/g, "</token><token> </token><token>");
  word_group_variants2[key] = value;
}
word_group_variants = word_group_variants2;


var ik_exceptions = `
'ניק
<token>ניק
אַטלאַנטיק
אַלקאָהאָליק
אַמעריקע
אַנטשיק
אַפּטייק
אַפֿריקע
אַקאַדעמיק
אַריבערשיקן
אַרקטיק
אָלימפּיק
אויסדריק
אומגליק
איבערשיקן
אייגעניק
אינדיק
איציק
באַלאַלײַקע
באָטאַניק
ביאַליק
ביאָטיק
בליק
בריק
גאַניק
גליק
געשיקט
גראַמאַטיק
גראַפֿיק
דײַקע
הויקער
היסטאָריק
חיריק
טאַביקע
טאַקטיק
טיטאַניק
טעאָרעטיק
טעכניק
טעמאַטיק
טשײַניק
יסטיק
לײַק
מאַטעמאַטיק
מאַכערײַקע
מוזיק
מזיק
מחזיק
מיסטיקער
מספּיק
מעטריקע
מעכאַניק
נודניק
סאָלאָווייטשיק
סופֿיקס
סטרײַק
סימפּאַטיק
סעמאַנטיק
ספּאָדיק
סקעפּטיק
עטיק
עלעקטריק
פּאַפּריקע
פּאָליטיק
פּאָלעמיק
פּלאַסטיק
פּלימעניק
פּעדאַגאָגיק
פּראַקטיק
פּרעפֿיקס
פֿאַבריק
פֿאַנאַטיק
פֿאַרשיקט
פֿאַרשיקן
פֿיזיק
צדיק
צוריק
צוריקשיקן
צושיקן
ציניקער
קאַטאָליק
קאָמיק
קלאַסיק
קליניק
קריטיק
ראָמאַנטיק
רובריק
רעטאָריק
רעספּובליק
רעפּובליק
שטיק
שטריק
שמוליק
שמענדריק
`;
ik_exceptions = index_exceptions(ik_exceptions, "ik_except");

var lekh_exceptions = `
אידל
אידעלע
אייניקל
אינגל
אינגעלע
אַרטיקל
בײַטל
בײַטעלע
ביכל
ביכעלע
ביסל
ביסעלע
ביציקל
בלומל
בלומעלע
בלימל
בלימעלע
בלעטל
בלעטעלע
בענדל
בענדעלע
בענקל
בעקעלע
בריוול
בריוועלע
ברעקל
ברעקעלע
גלעזל
גלעזעלע
דערפֿל
דערפֿעלע
דריידל
דריידעלע
הינדל
הינדעלע
הינטל
הינטעלע
הענטל
הענטעלע
ווײַבל
ווײַבעלע
ווערטל
ווערטעלע
זײַטל
זײַטעלע
זעקל
זעקעלע
טייגל
טייגעלע
טיכל
טיכעלע
טישל
טישעלע
לידל
לידעלע
לײַלעך
לײַלעכער
לעמפּל
לעמפּעלע
לעפֿל
לעפֿעלע
מאַשינדל
מאַשינדעלע
מיידל
מיידעלע
מײַזל
מײַזעלע
מילכל
מילכעלע
מילעך
מענטשעלע
נײַעסל
ניסל
ניסעלע
פֿייגל
פֿייגעלע
פּינטל
פּינטעלע
פֿינגערל
פֿיסל
פֿיסעלע
פּיצל
פּיצעלע
פֿישל
פֿישעלע
פּעקל
פּעקעלע
ציגאַרעטל
צעטל
צעטעלע
קאַפּיטל
קאַפּל
קאַפּעלע
קאַרטל
קאַרטעלע
קינדערלעך
קוויטל
קוויטעלע
קניידל
קניידעלע
קנעפּל
קנעפּעלע
קעלבל
קעלבעלע
קעסטל
קעסטעלע
קעפּל
קעפּעלע
קעצל
קעצעלע
קרישקעלע
קרעפּל
קרעפּעלע
רינגל
רינגעלע
רעדל
רעדעלע
רענצל
רענצעלע
רעקל
רעקעלע
שטיבל
שטיבעלע
שטיקל
שטרײַמל
שטרײַמעלע
שטעטל
שטעטעלע
שײַטל
שײַטעלע
שייטל
שייטעלע
שליסל
שליסעלע
שעפֿל
שעפֿעלע
שפּיצל
שפּיצעלע
שרײַבערל
`;
lekh_exceptions = index_exceptions(lekh_exceptions, "lekh_except");

var lkizmen = `
אמת
חבֿר
תּורה
תּורות
חבד
חב"ד
שבת
חידוש
חן
מיאוס
מלחמות
מלחמה
רעש
שלימות
גניבֿה
גניבֿות
מזל
מזרח
מנהג
גלגול
מצוה
מצוות
גאוות
גאוה
מורא
בית
בחור//רבי
חסיד
חסידים
חסידימ
חרד
חרדים
חרדימ
פּסח
סוכּות
שנה
כּיפּור
חודש
עזות
חזר
הרג
חתמ
גנבֿ//פּשט
פּשוט
כּישופֿ
כּישוף
קודש
חסידות
חוצפּה
הרע
טובֿה
עיקר
תּמימות
צניעות
כּפֿירה
מעשׂה
ניגון
ניגונ
ניגונים
ניגונימ
חזן
חזנים
חזנימ
חשובֿ
שׂכל
ישׂראל
משה
שלמה
יואלי
יואל
רבֿקה
שׂרה
דניאל
גבֿריאל
יעקבֿ
רחל
לאה
יצחק
שמואל
אַהרון
אַהרונ
אַהרן
אַהרנ
`;
lkizmen = lkizmen.match(/\n.+?(?=\n|(\/+))/mgi);




var last_minute_fixes = `
אַ מאָל|אַמאָל
(<token>)פֿיל(</token>)|$1פֿילע$2
(<token>)ליכער(</token>)|$1לעכער$2
שמואל'יג|שמואל'יק
ייִוואָ|ייווא
נישטיק|נישטיג
(<token>)עפּליך(</token>)|$1עפּלעך$2
(<token>)עפּעליך(</token>)|$1עפּעלעך$2
עוף'ליך|עוף'לעך
עוף'עליך|עוף'עלעך
'ליך|'לעך
מ'ס(<\/token>)|מ'ס$1
מ'ל(<\/token>)|מ'ל$1
נ'|ן'
`;
last_minute_fixes = combine_variants(last_minute_fixes.match(pre_pipe), last_minute_fixes.match(post_pipe));

var last_minute_fixes2 = {};
for (var grouping in last_minute_fixes) {
  key = grouping.replace(/\s/g, "</token><token> </token><token>");
  value = last_minute_fixes[grouping].replace(/\s/g, "</token><token> </token><token>");
  last_minute_fixes2[key] = value;
}
last_minute_fixes = last_minute_fixes2;
