# hasidify
A Yiddish orthographic normalizer: Standard Yiddish goes in, Hasidic Yiddish comes out.  
Available online: <a href="https://ibleaman.github.io/hasidify">https://ibleaman.github.io/hasidify</a>

Coded by <a href="https://wp.nyu.edu/ibleaman">Isaac L. Bleaman</a> (איציק בלימאַן). Please use the form linked in the sidebar (or <a href="https://docs.google.com/forms/d/e/1FAIpQLSeEReifR2tkrEMT2gdUuo2p_6GxDXRpLDdpmXkvsyJYaE0Kdg/viewform">here</a>) to send me feedback on the orthographic normalizer itself. I welcome suggestions for improvement!

### FAQ
**(1) What does this do exactly?**<br>
<a href="http://www.yivoencyclopedia.org/article.aspx/Language/Yiddish">Yiddish</a> is written today using two different orthographies, both based on the Hebrew alphabet. Standard Yiddish, which follows the recommendations of the <a href="https://www.yivo.org/Yiddish-Alphabet">YIVO</a>, is taught in virtually all college-level Yiddish courses and used by the <a href="http://yiddish.forward.com/">*Forverts* newspaper</a>. A different set of orthographic conventions is used in the Hasidic community, where the majority of today's Yiddish speakers (and writers) come from. This system takes text written in Standard/YIVO Yiddish as input, and outputs the same text in Hasidic Yiddish.

**(2) Does the system work in the other direction, i.e., from Hasidic Yiddish to Standard/YIVO Yiddish?**  
Currently this only normalizes texts in one direction, from Standard/YIVO to Hasidic. The tool is based on a list of regular respelling rules and exceptions. Converting from Hasidic to Standard/YIVO would additionally require a large dictionary, and ideally some grammatical information due to the presence of ambiguous string tokens (e.g., "few" and "for" are both written פאר; "cry" and "wine" are both written וויין). If you're interested in converting texts from Hasidic to Standard/YIVO, please check out Refoyl Finkel's <a href="https://www.cs.uky.edu/~raphael/yiddish/checkSpellUTF.cgi">normalizer</a>. When using his tool or mine, be sure to check that the output is what you intended, and send feedback if you notice any errors.

**(3) How were the rules and exceptions determined?**  
From my own observations as a reader (and writer) on Hasidic forums. The list of exceptions (e.g., to the rules that rewrite the adjectival suffixes יק- and לעך- as יג- and ליך-, respectively) is based on lexical frequencies from the chat forum <a href="http://www.kaveshtiebel.com/">KaveShtiebel.com</a>.
