function convert_text() {
  var x = document.getElementById("user_input");
  var text = " " + x.elements[0].value + " ";  // to avoid string-edge problems w/ regex

/* if form has multiple input areas:
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value.toUpperCase() + "<br>";
  }
 */
  
  text = remove_precombined(text);
  text = strip_formatting(text);
  text = correct_lkizmen(text);
  text = apostrophize_lkizmen(text);
  text = hide_exceptions(text);
  text = respell(text);
  text = show_exceptions(text);
  text = last_minute_fixes(text);
  text = text.replace(/\n/g, "<br>");

  document.getElementById("result").innerHTML = text;
}


function remove_precombined(text) {
  // transform precombined characters
  text = text.replace(/שׂ/g, "שׂ");
  text = text.replace(/תּ/g, "תּ");
  text = text.replace(/וּ/g, "וּ");
  text = text.replace(/יִ/g, "יִ");
  text = text.replace(/אָ/g, "אָ");
  text = text.replace(/פּ/g, "פּ");
  text = text.replace(/אַ/g, "אַ");
  text = text.replace(/פֿ/g, "פֿ");
  text = text.replace(/ײַ/g, "ײַ");
  text = text.replace(/כּ/g, "כּ");
  text = text.replace(/בֿ/g, "בֿ");
  text = text.replace(/בּ/g, "בּ");
  return text;
}

function strip_formatting(text) {
  // remove nekudes and special unicode symbols
  
  text = text.replace(/פֿאַרן/g, "פֿאַר'ן"); // just for far'n vs. forn vs. porn
  
  text = text.replace(/װ/g, "וו");
  text = text.replace(/ױ/g, "וי");
  text = text.replace(/ײ/g, "יי");
  text = text.replace(/ייִד/g, "איד");
  text = text.replace(/ייִנ/g, "אינ"); // can't do yi -> Ai because of yikhes, yires-shomaim, etc.
  text = text.replace(/וּוווּ/g, "ואוואו");
  text = text.replace(/יייִ/g, "ייאי");
  text = text.replace(/ייַיִ/g, "ייאי");
  text = text.replace(/וּוו/g, "ואוו");
  text = text.replace(/וווּ/g, "וואו");
  text = text.replace(/וווי/g, "וואוי");
  text = text.replace(/ייִוואָ/g, "ייווא");
  text = text.replace(/יִו/g, "יאו");
  text = text.replace(/ויִ/g, "ואי");
  text = text.replace(/וּיִ/g, "ואי");
  text = text.replace(/יִוּ/g, "יאו");
  text = text.replace(/יִיִ/g, "יאי");
  text = text.replace(/וּוּ/g, "ואו");
  
  // remove all nekudes and pintelekh
  text = text.replace(/[ִַָֹּֿ]/g, "");
  
  // simplify unicode chars w/ embedded nekudes
  text = text.replace(/אַ/g, "א");
  text = text.replace(/אָ/g, "א");
  text = text.replace(/ײַ/g, "יי");
  text = text.replace(/יִ/g, "י");
  text = text.replace(/פֿ/g, "פ");
  text = text.replace(/פּ/g, "פ");
  text = text.replace(/תּ/g, "ת");
  text = text.replace(/בֿ/g, "ב");
  text = text.replace(/שׂ/g, "ש");
  text = text.replace(/כּ/g, "כ");
  
  // fix punctuation
  text = text.replace(/־/g, "-");
  text = text.replace(/[“״″„]/g, '"');
  text = text.replace(/׳/g, "'");
  
  return text;
}

function correct_lkizmen(text) {
  // fix hebrew/aramaic words that may be spelled differently in hasidic y
  var i;
  for (i = 0; i < lk_variants.length; i++) {
    var regex = new RegExp(lk_variants[i][0], "g");
    text = text.replace(regex, lk_variants[i][1]);
  }
  return text;
}

function apostrophize_lkizmen(text) {
  // add apostrophes before and after LKizmen
  var i;
  for (i = 0; i < lkizmen.length; i++) {
    var regex = new RegExp("([\u05D0\u05D2\u05D3\u05D5-\u05DB\u05DD-\u05FF])" + lkizmen[i], "g"); // not beys or hey or lamed...
    text = text.replace(regex, "$1'" + lkizmen[i]);
    var regex = new RegExp(lkizmen[i] + "(?!(ים)|(ימ)|(ות))([\u0590-\u05FF])", "g"); // not -im or -oys
    text = text.replace(regex, lkizmen[i] + "'$4");
  }
  return text;
}

function hide_exceptions(text) {
  // "hide" words that are exceptions to regular spelling rules (by giving them unique "temp#temp" codes)
  var i;
  for (i = 0; i < lexical_exceptions.length; i++) {
    var regex = new RegExp(lexical_exceptions[i], "g");
    text = text.replace(regex, "temp" + i + "temp");
  }
  return text;
}

function show_exceptions(text) {
  // "show" words that were hidden before
  var i;
  for (i = 0; i < lexical_exceptions.length; i++) {
    var regex = new RegExp("temp" + i + "temp", "g");
    text = text.replace(regex, lexical_exceptions[i]);
  }
  return text;

}

function respell(text) {
  // correct spelling based on rules
  var i;
  for (i = 0; i < variants.length; i++) {
    var regex = new RegExp(variants[i][0], "g");
    text = text.replace(regex, variants[i][1]);
  }
  return text;
}

function last_minute_fixes(text) {
  // correct spelling based on rules
  var i;
  for (i = 0; i < last_minute.length; i++) {
    var regex = new RegExp(last_minute[i][0], "g");
    text = text.replace(regex, last_minute[i][1]);
  }
  return text;
}
