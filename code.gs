//MENU//
function onOpen(){
  SpreadsheetApp.getUi()
  .createMenu('Shocking Sale')
  .addItem('Get JSON', 'getJSON')
  .addItem('Delete Sheets', 'deleteSheet')  
  .addToUi()  
}

//GET JSON//
function getJSON() {
  var ss = SpreadsheetApp.getActive()
  var sheets = ss.getSheets()
  var promotionIdJson = UrlFetchApp.fetch("https://shopee.com.my/api/v2/flash_sale/get_all_sessions").getContentText()
  
  //Get all the promotion IDs
  var promotionId = JSON.parse(promotionIdJson)["data"]["sessions"].map(function (item){
    return item["promotionid"]
  })

  //Log Promotion IDs
  Logger.log(promotionId)

  //Get all the session names
  var sessionName = JSON.parse(promotionIdJson)["data"]["sessions"].map(function (item){
  return item["name"]
  })
  
  //Log Session Names
  //Logger.log(sessionName)
  
  for(var i = 0; i < promotionId.length; i++){
    var sheet = null
    sheets.forEach(function (st){
      if(st.getName() == sessionName[i]){
        sheet = st
      }
    })
    if(!sheet){
      sheet = ss.getSheetByName("Template").copyTo(ss)
      sheet.setName(sessionName[i])
    }  
    
    var head = sheet.getRange(1, 11,1,sheet.getLastColumn() - 10).getValues()[0]
    var itemJson = UrlFetchApp.fetch("https://shopee.com.my/api/v2/flash_sale/get_all_itemids?promotionid=" + promotionId[i])
    var itemDataTemp = JSON.parse(itemJson)["data"]["item_brief_list"].map(function (it){
      return it["itemid"]
    })
    
    var itemData = []
    var inc = Math.round(itemDataTemp.length / 50) + 1
    for(var a = 0; a < inc + 50; a++){
      var t = []
      var loop = false
      for(var j = (a * 50); j < (a + 1) * 50; j++){
        if(j == itemDataTemp.length){
          loop = true;
          break;
        }
        t.push(itemDataTemp[j])
      }
      itemData.push(t)
      if(loop){
        break
      }
    }
    
    var toPrint =[]
    
    for(var k = 0; k < itemData.length; k++){
    var headers1 = {'Referer': 'https://shopee.com.my','Cookie': 'csrftoken=d275yHpMWn0M4xtXhjdNkdPhDejCTlXK','x-csrftoken': 'd275yHpMWn0M4xtXhjdNkdPhDejCTlXK'}
    data1 = {"promotionid":promotionId[i],"itemids":itemData[k]}
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      'headers' : headers1,
      //'muteHttpExceptions' : False
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(data1)
    };
    var dataJson = UrlFetchApp.fetch('https://shopee.com.my/api/v2/flash_sale/flash_sale_batch_get_items',options)
    var outdata = JSON.parse(dataJson)["data"]["items"]

    //Log Session Names
    //Logger.log(outdata)    
    
    outdata.forEach(function (outJson){
      var temp = []
      for(var j = 0; j < head.length; j++){
        temp.push((outJson[head[j]]) ? outJson[head[j]] : "")
      }
      toPrint.push(temp)
    })
    }
    //console.log(toPrint)
    if(sheet.getLastRow() > 1){
      sheet.getRange(2, 11,sheet.getLastRow() - 1,sheet.getLastColumn()).clearContent()
    }
    sheet.getRange(2, 11, toPrint.length, toPrint[0].length).setValues(toPrint)
  }
}

//DELETE SHEETS//
function deleteSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  sheets.forEach(function (sheet){
    if(sheet.getName() != 'Template' && sheet.getName() != 'RM'){
      ss.deleteSheet(sheet);
    }
  })
}
