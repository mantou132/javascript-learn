function convert_simp() {
  var curDoc = window.document;
  if (curDoc.evaluate) {
    //var xpr = '//text()[string-length(normalize-space(.))>0][name(..)!="SCRIPT"][name(..)!="STYLE"]';
    var xpr = '//text()[normalize-space(.)][name(..)!="SCRIPT"][name(..)!="STYLE"]';

    var textnodes = curDoc.evaluate(xpr, curDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var textnodes_length = textnodes.snapshotLength;
    //var curNode = null;

    for (var i = 0, n = textnodes_length, textNodes = textnodes; i < n; ++i) {
      var curNode = textNodes.snapshotItem(i);

      //if (/[^\x20-\xFF]+/.test(curNode.data)){
      //if (/%u/.test(escape(curNode.data))){
      curNode.data = toSimp(curNode.data);
      //}
    }
  } else {
    window.document.body.innerHTML = toTrad(window.document.body.innerHTML);
  }
}