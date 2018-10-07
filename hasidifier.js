function convert_text() {
  var x = document.getElementById("user_input");
  var text = x.elements[0].value.split(/(\s+|,|\.|־|-|;|:|\?|\!|\/|\\)/);

  var numwords = text.length;
  for (var i = 0; i < numwords; i++) {
    text[i] = '<token>' + text[i] + '</token>';
  }

  var text = text.join('');

  text = remove_precombined_chars(text);

  text = correct_lk(text);
  text = insert_apostrophes_lk(text);

  text = replace_whole_words(text);
  text = replace_prefix(text);
  text = replace_suffix(text);
  text = replace_anywhere(text);
  text = replace_word_groups(text);

  text = hide_exceptions(text);
  text = apply_regular_rules(text);
  text = show_exceptions(text);

  text = replace_last_minute(text);

  text = strip_formatting(text);

  var alef_checkbox = document.getElementById("alef_diacritics");
  var pey_checkbox = document.getElementById("pey_diacritics");

  // all diacritics: [ִַָֹּֿׂ]
  // all diacritics but patah/qamats and dagesh/rafe: [ִַָֹׂ]
  // all diacritics but patah/qamats: [ִַָֹׂ]
  text = text.replace(/[ִֹֺֿׂ]/g, "");
  if (alef_checkbox.checked){
    text = text.replace(/([בֿגדהוּזחטיִײַכּלמםנןסעפּפֿףצקרשׂתּ])[ַָ]/g, "$1");
  }
  else {
    text = text.replace(/[ַָ]/g, "");
  }
  if (pey_checkbox.checked){
    text = text.replace(/([אַאָבֿגדהוּזחטיִײַכּלמםנןסעףצקרשׂתּ])[ּ]/g, "$1");
  }
  else {
    text = text.replace(/[ּ]/g, "");
  }
  text = text.replace(/<\/?token>/g, '');
  document.getElementById("hasidic_output").innerHTML = text;
}

// helper functions

function remove_precombined_chars(text) {
  var replacements = {
    "װ": "וו",
    "ײ": "יי",
    "ײַ": "ײַ",
    "ייַ": "ײַ",
    "ױ": "וי",
    "שׂ": "שׂ",
    "תּ": "תּ",
    "וּ": "וּ",
    "יִ": "יִ",
    "אָ": "אָ",
    "פּ": "פּ",
    "אַ": "אַ",
    "פֿ": "פֿ",
    "כּ": "כּ",
    "בֿ": "בֿ",
    "בּ": "בּ",
    "תֿ": "ת",
    "כֿ": "כ"
  };
  for (var letter_combined in replacements) {
    var regex = new RegExp(letter_combined, "g");
    text = text.replace(regex, replacements[letter_combined]);
  }
  return text;
}

function correct_lk(text) {
  // fix hebrew/aramaic words that may be spelled differently in hasidic y
  for (word in lk_variants) {
    var regex = new RegExp(word, "g");
    text = text.replace(regex, lk_variants[word]);
  }
  return text;
}

function insert_apostrophes_lk(text) {
  // add apostrophes before and after LK'izmen
  for (var i = 0; i < lkizmen.length; i++) {
    var regex = new RegExp("([אַאָגדוּזחטיִײַכּמםנןסעפּפֿףצץקרשׂתּ])" + lkizmen[i].substring(1,), "g"); // not b-, h-, l-, or word start
    text = text.replace(regex, "$1" + "'" + lkizmen[i].substring(1,));
    var regex = new RegExp(lkizmen[i].substring(1,) + "(?!<\/token>|ים|ות|ימ)", "g"); // not -im or -oys or word ending
    text = text.replace(regex, lkizmen[i].substring(1,) + "'");
  }
  return text;
}

function replace_whole_words(text) {
  for (var whole_word in whole_word_variants) {
    var regex = new RegExp("<token>" + whole_word + "<\/token>", "g");
    text = text.replace(regex, "<token>" + whole_word_variants[whole_word] + "</token>");
  }
  return text;
}

function replace_prefix(text) {
  for (var prefix in prefix_variants) {
    var regex = new RegExp("<token>" + prefix, "g");// + "(?!<\/token>)", "g");
    text = text.replace(regex, "<token>" + prefix_variants[prefix]);
  }
  return text;
}

function replace_suffix(text) {
  for (var suffix in suffix_variants) {
    var regex = new RegExp(suffix + "<\/token>", "g"); // "(?<!\<token\>)" +
    text = text.replace(regex, suffix_variants[suffix]);
  }
  return text;
}

function replace_anywhere(text) {
  for (var anywhere in anywhere_variants) {
    var regex = new RegExp(anywhere, "g");
    text = text.replace(regex, anywhere_variants[anywhere]);
  }
  return text;
}

function replace_word_groups(text) {
  for (var word_group in word_group_variants) {
    var regex = new RegExp(word_group, "g");
    text = text.replace(regex, word_group_variants[word_group]);
  }
  return text;
}

function apply_regular_rules(text) {
  // ik: ik(?=((er|e|n|st|s|t|ere|ern|ers|ste|ster|stn|stns|ung|ungen)?<\/token>))
  text = text.replace(/יק(?=((ער|ע|ן|סט|ס|ט|ערע|ערן|ערס|סטע|סטער|סטן|סטנס|ונג|ונגען)?<\/token>))/g, "יג");
  text = text.replace(/לעך/g, "ליך");
  // lekh: lekh(?=(e|er|n|st|s|t|ere|ern|ers|ste|ster|stn|stns)?<\/token>)
  text = text.replace(/לעכ(?=(ע|ער|ן|ס|ט|סט|ערע|ערן|ערס|סטע|סטער|סטן|סטנס|קייט|קייטן)?<\/token>)/g, "ליכ");
  return text;
}

function hide_exceptions(text) {
  for (var exception in ik_exceptions) {
    var regex = new RegExp(exception, "g");
    text = text.replace(regex, ik_exceptions[exception]);
  }
  for (var exception in lekh_exceptions) {
    var regex = new RegExp(exception, "g");
    text = text.replace(regex, lekh_exceptions[exception]);
  }
  return text;
}

function show_exceptions(text) {
  var reverse_dict = {};
  for (var key in ik_exceptions) {
    reverse_dict[ik_exceptions[key]] = key;
  }

  for (var index in reverse_dict) {
    var regex = new RegExp(index, "g");
    text = text.replace(regex, reverse_dict[index]);
  }

  var reverse_dict = {};
  for (var key in lekh_exceptions) {
    reverse_dict[lekh_exceptions[key]] = key;
  }

  for (var index in reverse_dict) {
    var regex = new RegExp(index, "g");
    text = text.replace(regex, reverse_dict[index]);
  }
  return text;
}

function replace_last_minute(text) {
  for (var fix in last_minute_fixes) {
    var regex = new RegExp(fix, "g");
    text = text.replace(regex, last_minute_fixes[fix]);
  }
  return text;
}

function strip_formatting(text) {
  // more spelling rules
  text = text.replace(/װ/g, "וו");
  text = text.replace(/ױ/g, "וי");
  text = text.replace(/ײ/g, "יי");
  text = text.replace(/וּוווּ/g, "ואוואו");
  text = text.replace(/יייִ/g, "ייאי");
  text = text.replace(/ייַיִ/g, "ייאי");//frier, hebreish - no alef in HY forums AFAIK
  text = text.replace(/וּוו/g, "ואוו");
  text = text.replace(/וווּ/g, "וואו");
  text = text.replace(/וווי/g, "וואוי");
  text = text.replace(/יִו/g, "יאו");
  text = text.replace(/ויִ/g, "ואי");
  text = text.replace(/וּיִ/g, "ואי");
  text = text.replace(/יִוּ/g, "יאו");
  text = text.replace(/יִיִ/g, "יאי");
  text = text.replace(/וּוּ/g, "ואו");
  text = text.replace(/וי(ו|וּ)/g, "ויאו");

  // fix punctuation
  text = text.replace(/־/g, "-");
  text = text.replace(/[“״″„]/g, '"');
  text = text.replace(/׳/g, "'");

  return text;
}
