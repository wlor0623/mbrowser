var URL = getVar("url");

function 头部导航() {
  var res = {};
  var items = [];
  for (var j = 0; j < 列表.length; j++) {
    var 标题 = e2Arr(列表[j], 标题规则);
    var 地址 = e2Arr(列表[j], 地址规则);
    分类地址 = URL + 前 + 地址 + 后;
    items.push({
      title: 标题,
      url: 分类地址
    });
  }
  res.data = items;
  return JSON.stringify(res);
}
var 源码 = getCode();
if (源码.indexOf("<rss") != -1) {
  var 列表 = e2Arr(源码, ".xml(class ty)");
  var 标题规则 = ".t()";
  var 地址规则 = ".a(id)";
  var 前 = "?ac=videolist&pg=#PN#&t=";
  var 后 = "";
  头部导航();
} else if (URL.indexOf("/vod/json") != -1) {
  var 列表 = e2Arr(源码, ".json(list)");
  var 标题规则 = ".json(list_name).th( ##)";
  var 地址规则 = ".json(list_id)";
  var 前 = "?ac=videolist&pg=#PN#&t=";
  var 后 = "";
  头部导航();
} else {
  var 列表 = e2Arr(源码, ".json(class)");
  var 标题规则 = ".json(type_name)";
  var 地址规则 = ".json(type_id)";
  var 前 = "?ac=videolist&pg=#PN#&t=";
  var 后 = "";
  头部导航();
}
// ######通用列表######
var baseURL = getVar("url").split("?")[0];
var NEXTPAGE = Number(getVar("PN")) + 1;

function 通用列表() {
  var res = {};
  var items = [];
  var LIST = [];
  var LIMIT = 列表.length;
  for (var j = 0; j < LIMIT; j++) {
    var CODE = 列表[j];
    var 地址 = e2Rex(CODE, 地址规则).indexOf("http") != -1 ? e2Rex(CODE, 地址规则) : baseURL + e2Rex(CODE, 地址规则);
    var 标题 = e2Rex(CODE, 标题规则);
    var 预图片 = e2Rex(CODE, 图片规则);
    if (预图片.indexOf("/mac:") != -1) {
      var 图片 = "http:" + 预图片.split("mac:")[1];
    } else if (预图片.indexOf("img.test.com") != -1 || 预图片.indexOf("img.maccms.com") != -1 || 预图片.indexOf("img.maccms.pro") != -1) {
      var 图片 = getVar("url").match(/https?:\/\/.+?\//)[0] + 预图片.split(/img\.[a-z]+?\.[a-z]+/)[1];
      var 图片 = 图片.match(/.*(http.*)/)[1];
    } else if (预图片.indexOf("https://zy.itono.cn///") != -1) {
      var 图片 = "http:" + 预图片.split("///")[1];
    } else if (预图片.indexOf("http://zy.itono.cn/") != -1) {
      var 图片 = "https:" + 预图片.split("http:")[1];
    } else if (预图片.indexOf("http") != -1) {
      var 图片 = 预图片.match(/.*(http.*)/)[1];
    } else if (预图片 == "") {
      var 图片 = "https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/js2.0/kongbai.png";
    } else if (预图片.indexOf("//") != -1) {
      var 图片 = "http:" + 预图片;
    } else {
      var 图片 = getVar("url").match(/https?:\/\/.+?\//)[0] + 预图片;
    }
    var 简介 = e2Rex(CODE, 简介规则);
    var 图片底部 = e2Rex(CODE, 图片底部规则);
    var 左上 = e2Rex(CODE, 左上规则);
    var 右上 = e2Rex(CODE, 右上规则);
    LIST.push({
      title: 标题,
      url: 地址,
      img: 图片,
      detail: 简介,
      td: 图片底部,
      zs: 左上,
      ys: 右上
    });
  }
  var play_ = {};
  play_.list = LIST;
  items.push(play_);
  res.data = items;
  res.nextpage = getVar("前") + NEXTPAGE + getVar("后");
  return JSON.stringify(res);
}
var 源码 = getVar("源码");
if (源码.indexOf("<rss") != -1) {
  var 列表 = e2Arr(源码, ".xml(list video)");
  var 标题规则 = ".xml(name).ty(CDATA).tz2(])";
  var 地址规则 = ".c(?ac=videolist&ids=).xml(id).z(\\d+)";
  var 图片规则 = ".xml(pic).t().z(\\S.*\\S).th( ##%20)";
  var 简介规则 = ".c(<font color=\"#0997F7\"><b>).xml(dt).t().ct(</b></font><br>)";
  var 图片底部规则 = ".xml(last).t()";
  var 左上规则 = ".tx(<p style=\"background-color:#7091fc\"><font color=\"#FFFFFF\" size=\"40px\">).xml(type).t().ct(</font></p>)";
  var 右上规则 = ".tx(<p style=\"background-color:#CC00FF\"><font color=\"#FFFFFF\">).xml(note).t().ct(</font></p>)";
  通用列表();
} else if (baseURL.indexOf("/vod/json") != -1) {
  var 列表 = e2Arr(源码, ".json(data)");
  var 标题规则 = ".json(vod_name)";
  var 地址规则 = ".c(?ac=videolist&ids=).json(vod_id)";
  var 图片规则 = ".json(vod_pic)";
  var 简介规则 = ".c(<font color=\"#0997F7\"><b>).json(vod_play_from).ct(</b></font><br>)";
  var 图片底部规则 = ".json(vod_addtime)";
  var 左上规则 = ".tx(<p style=\"background-color:#7091fc\"><font color=\"#FFFFFF\" size=\"40px\">).json(type_name).ct(</font></p>)";
  var 右上规则 = ".tx(<p style=\"background-color:#CC00FF\"><font color=\"#FFFFFF\">).json(vod_type).ct(</font></p>)";
  通用列表();
} else {
  var 列表 = e2Arr(源码, ".json(list)");
  var 标题规则 = ".json(vod_name)";
  var 地址规则 = ".c(?ac=videolist&ids=).json(vod_id)";
  var 图片规则 = ".json(vod_pic)";
  var 简介规则 = ".c(<font color=\"#0997F7\"><b>).json(vod_play_from).ct(</b></font><br>)";
  var 图片底部规则 = ".json(vod_time)";
  var 左上规则 = ".tx(<p style=\"background-color:#7091fc\"><font color=\"#FFFFFF\" size=\"40px\">).json(type_name).ct(</font></p>)";
  var 右上规则 = ".tx(<p style=\"background-color:#CC00FF\"><font color=\"#FFFFFF\">).json(vod_remarks).ct(</font></p>)";
  通用列表();
}
// ######选集列表#####
var URL = getVar("url");

function 选集列表() {
  var res = {};
  var items = [];
  var detail = [];
  for (var i = 0; i < 分类.length; i++) {
    var 分类CODE = 分类[i];
    var 列表 = e2Arr(分类CODE, 列表规则).filter(Boolean);
    if (线路) {
      var 标题 = e2Rex(线路[i], 标题规则);
    } else {
      var 标题 = e2Rex(分类CODE, 标题规则);
    }
    var LIST = [];
    for (var j = 0; j < 列表.length; j++) {
      if (列表[j].indexOf("$") != -1) {
        var 选集 = e2Rex(列表[j], 选集规则);
        if (选集 == "") {
          选集 = j + 1;
        }
      } else {
        var 选集 = j + 1;
      }
      var 选集地址 = e2Rex(列表[j], 选集地址规则);
      //开始根据网址，线路判断前缀
      if (标题 == "xhzy") {
        选集地址 = 选集地址;
      } else if (URL.indexOf("api.yunboys.cn") != -1) {
        选集地址 = "https://jx.yunboys.cn/?url=" + 选集地址;
      } else if (URL.indexOf("ujuba.com") != -1) {
        选集地址 = "https://zy.ujuba.com/play.php?url=" + 选集地址;
      } else if (选集地址.indexOf("html") != -1 || 选集地址.indexOf("www.bilibili.com") != -1 || 选集地址.indexOf("share.weiyun.") != -1) {
        if (URL.indexOf("ycccyk.cn") != -1 || URL.indexOf("107.150.5.146") != -1) {
          选集地址 = "https://www.baidu.com/s?wd=https://api.m3u8.tv:5678/home/api?type=ys&uid=233711&key=bgjnopvDHPUY035689&url=" + 选集地址;
        } else {
          选集地址 = "http://egwang186.gitee.io/?url=" + 选集地址;
        }
      } else if (选集地址.indexOf(":6688/player") != -1) {
        var hash = 选集地址.split("player/")[1];
        选集地址 = "https://www.baidu.com/s?wd=https://qq.iqiyi5.b555b.com:7777/video/" + hash + ".m3u8";
      } else if (标题 == "wolong") {
        选集地址 = "https://jx.wolongcdn.com/?url=" + 选集地址;
      } else if (标题.indexOf("rrm3u8") != -1) {
        选集地址 = "https://www.meiju11.com/ckplayerx/m3u8.php?url=" + 选集地址;
      } else if (选集地址.indexOf(".m3u8") > 15 || 选集地址.indexOf(".mp4") > 15 || 选集地址.indexOf("/obj/tos") != -1) {
        选集地址 = "https://www.baidu.com/s?wd=" + 选集地址;
      } else if (URL.indexOf("qbzyz.com") != -1) {
        if (选集地址.indexOf("//") != -1) {
          选集地址 = "http:" + 选集地址;
        } else {
          选集地址 = "http://parse.qbzyz.com/parse?resources=" + 选集地址;
        }
      } else if (标题 == "mysp" || 标题 == "xmzy" || 标题 == "myck") {
        选集地址 = "http://player.sxmj.wang/m3u8.php?url=" + 选集地址;
      } else if (标题 == "mao") {
        选集地址 = "http://www.moyuyingshi.com/player.php?url=" + e2Rex(选集地址, ".en64()").replace(/=/g, "");
      } else if (标题 == "4kdym" || 标题 == "8kvod") {
        选集地址 = "https://www.baidu.com/s?wd=" + decodeURIComponent(选集地址);
      } else if (标题 == "789pan" || 标题 == "pll") {
        选集地址 = "https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url=" + 选集地址;
      } else if (标题 == "lekanzyw") {
        选集地址 = "https://bfq.ikan6.vip/m3u8.php?url=" + 选集地址 + '@{"referer":"https://ikan6.vip/"}';
      } else if (标题.indexOf("miaoparty") != -1) {
        选集地址 = "https://jiemi.jiexi.one/api/?key=zJQvr5baYHz7vpNSy9&url=" + 选集地址;
      } else if (标题.indexOf("mx771") != -1) {
        选集地址 = "https://vip.byteamone.cn/api/?key=vpO0packXeAp4XYCnA&url=" + 选集地址;
      } else if (标题 == "renrenmi") {
        选集地址 = "https://www.1080kan.cc/jiexi/rrmi.php?url=" + 选集地址 + '@{"Referer":"https://www.1080kan.cc/"}';
      } else if (URL.indexOf('fqzy.cc') != -1) {
        选集地址 = "https://jx.fqzy.cc/jx.php?url=" + 选集地址;
      } else if (选集地址.indexOf('wp.umao.vp6.top') != -1) {
        选集地址 = "http://u.umao.vp6.top/?url=" + 选集地址.replace("wp.umao.vp6.top", "umao.v.vp8.top");
      } else if (标题.indexOf('languang') != -1) {
        选集地址 = "https://j.languang.wfss100.com/jx/md5.php?url=" + 选集地址;
      } else if (标题 == "alizy") {
        选集地址 = "https://api.jhdyw.vip/?url=" + 选集地址;
      } else if (URL.indexOf('zy.7kjx.com') != -1) {
        选集地址 = "https://jx.xmflv.vip/?url=" + 选集地址;
      } else if (标题.indexOf('leduo') != -1) {
        选集地址 = "https://api.xxctzy.com/1.php?vid=" + 选集地址;
      } else if (URL.indexOf("api.yparse.com") != -1) {
        选集地址 = "https://jx.yparse.com/index.php?url=" + 选集地址;
      } else if (URL.indexOf("bbkdj") != -1) {
        选集地址 = "http://jx.yparse.com/index.php?url=" + 选集地址;
      } else if (标题 == 'niux') {
        选集地址 = "https://www.juztv.com/jx.php?id=" + 选集地址;
      } else if (标题 == 'u') {
        选集地址 = "https://jx.dxsdkw.cn/nv/" + 选集地址 + ".m3u8";
      } else if (标题 == 'youbo') {
        选集地址 = "http://1090ys2.com/x2.php?id=" + 选集地址 + '@{"referer":"http://1090ys2.com/"}';
      } else if (URL.indexOf('tvyb02.com') != -1 || URL.indexOf('zy.vodcdn.top') != -1) {
        if (标题 == 'hkm3u8') {
          选集地址 = "https://pl.tcc-interiors.com/hls/" + 选集地址 + '@{"referer":"http://www.tvyb02.com/"}';
        } else if (选集地址.indexOf(".m3u8") > 15 || 选集地址.indexOf(".mp4") > 15 || 选集地址.indexOf("/obj/tos") != -1) {
          选集地址 = "https://www.baidu.com/s?wd=" + 选集地址;
        } else if (标题 == 'yunbo') {
          var playurl = "https://www.mayigq.com/vodzip/player.php?vid=" + 选集地址;
          选集地址 = "https://www.baidu.com/s?wd=" + playurl;
        }
      }
      //结束判断
      LIST.push({
        title: 选集,
        url: 选集地址
      });
    }
    var play_ = {};
    play_.title = 标题;
    play_.list = LIST;
    items.push(play_);
  }
  detail.push({
    desc: 简介
  });
  res.data = items;
  res.desc = detail;
  return JSON.stringify(res);
}
if (getVar("源码").indexOf("<rss") != -1) {
  var 分类 = e2Arr(getVar("源码"), ".get(dd)");
  var 简介 = e2Rex(getVar("源码"), ".c(类型:).xml(type).c(<br>演员表:).xml(actor).c(<br>简介:).xml(des)");
  var 列表规则 = ".z2(CDATA\\[\\([\\s\\S]*?\\)[#]*?\\]).fg(#)";
  var 标题规则 = ".a(flag)";
  var 选集规则 = ".tz($)";
  var 选集地址规则 = ".z2(\\$\\([^\$|&]*\\)).or().z(.*)";
  选集列表();
} else {
  if (URL.indexOf("/vod/json") != -1) {
    var 分类 = e2Arr(getVar("源码"), ".json(data).json(vod_play_url).fg(\\$\\$\\$)");
    var 线路 = e2Arr(getVar("源码"), ".json(data).json(vod_play_from).fg(\\$\\$\\$)");
    var 选集地址规则 = ".z2(\\$\\(.*\\)).or().z(.*)";
    var 简介 = e2Arr(getVar("源码"), ".c(演员表:).json(data).json(vod_actor).c(<br>简介:).json(data).json(vod_content)");
    var 列表规则 = ".fg(#)";
    var 标题规则 = ".t()";
    var 选集规则 = ".tz($)";
    选集列表();
  } else {
    if (URL.indexOf("xunlei.fan") != -1) {
      var 分类 = e2Arr(getVar("源码"), ".json(list).json(vod_down_url).fg(\\$\\$\\$)");
      var 线路 = e2Arr(getVar("源码"), ".json(list).json(vod_down_from).fg(\\$\\$\\$)");
      var 选集地址规则 = ".ty($)";
    } else {
      var 分类 = e2Arr(getVar("源码"), ".json(list).json(vod_play_url).fg(\\$\\$\\$)");
      var 线路 = e2Arr(getVar("源码"), ".json(list).json(vod_play_from).fg(\\$\\$\\$)");
      var 选集地址规则 = ".z2(\\$\\(.*\\)).or().z(.*)";
    }
    var 简介 = e2Arr(getVar("源码"), ".c(演员表:).json(list).json(vod_actor).c(<br>简介:).json(list).json(vod_content)");
    var 列表规则 = ".fg(#)";
    var 标题规则 = ".t()";
    var 选集规则 = ".tz($)";
    选集列表();
  }
}
// ######搜索列表
function 搜索列表() {
  var res = {};
  var items = [];
  var LIST = [];
  var LIMIT = 列表.length;
  for (var j = 0; j < LIMIT; j++) {
    var CODE = 列表[j];
    var 地址 = e2Rex(CODE, 地址规则).indexOf("http") != -1 ? e2Rex(CODE, 地址规则) : getVar("Url") + e2Rex(CODE, 地址规则);
    var 标题 = e2Rex(CODE, 标题规则);
    var 预图片 = e2Rex(CODE, 图片规则);
    if (预图片.indexOf("/mac:") != -1) {
      var 图片 = "http:" + 预图片.split("mac:")[1];
    } else if (预图片.indexOf("=") != -1) {
      var 图片 = 预图片.match(/.*(http.*)/)[1];
    } else if (预图片.indexOf("http") != -1) {
      var 图片 = 预图片;
    } else if (预图片 == "") {
      var 图片 = "https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/js2.0/kongbai.png";
    } else if (预图片.indexOf("//") != -1) {
      var 图片 = "http:" + 预图片;
    } else {
      var 图片 = getVar("Url") + 预图片;
    }
    var 简介 = e2Rex(CODE, 简介规则);
    var 作者 = e2Rex(CODE, 作者规则);
    LIST.push({
      title: 标题,
      url: 地址,
      img: 图片,
      detail: 简介,
      author: 作者
    });
  }
  var play_ = {};
  play_.list = LIST;
  items.push(play_);
  res.data = items;
  return JSON.stringify(res);
}
var URL = getVar("Url") + "?ac=videolist&wd=" + getVar("KEY");
var 源码 = getHttp(JSON.stringify({
  url: URL
}));
if (源码.indexOf("<rss") != -1) {
  var 列表 = e2Arr(源码, ".xml(video)");
  var 标题规则 = ".xml(name).ty(CDATA).tz2(])";
  var 地址规则 = ".c(?ac=videolist&ids=).xml(id).z(\\d+)";
  var 图片规则 = ".xml(pic).t().z(http.*\\S).th( ##%20)";
  var 简介规则 = ".c(<font color=\"#0997F7\"><b>).xml(dt).t().c(</b></font><br>).xml(last).t()";
  var 作者规则 = ".tx(<p style=\"background-color:#7091fc\"><font color=\"#FFFFFF\">).xml(note).t().ct(</font></p>)";
  搜索列表();
} else if (URL.indexOf("/vod/json") != -1) {
  var 列表 = e2Arr(源码, ".json(data)");
  var 标题规则 = ".json(vod_name)";
  var 地址规则 = ".c(?ac=videolist&ids=).json(vod_id)";
  var 图片规则 = ".json(vod_pic)";
  var 简介规则 = ".json(type_name).c().json(vod_addtime).c().json(vod_type)";
  var 作者规则 = ".json(vod_play_from)";
  搜索列表();
} else {
  var 列表 = e2Arr(源码, ".json(list)");
  var 标题规则 = ".json(vod_name)";
  var 地址规则 = ".c(?ac=videolist&ids=).json(vod_id)";
  var 图片规则 = ".json(vod_pic)";
  var 简介规则 = ".json(type_name).c().json(vod_time).c().json(vod_remarks)";
  var 作者规则 = ".json(vod_play_from)";
  搜索列表();
}
// ######免嗅探
var uu = getVar("url");
var UA = "Mozilla/5.0";
var COOKIE = "";
if (uu.indexOf("www.meiju11.com") != -1) {
  var resp = getHttp(JSON.stringify({
    url: uu,
    head: {
      'Referer': 'https://www.meiju11.com'
    }
  }));
  var playurl = resp.match(/播放地址[\s\S]*?url.*?'(.*?)'/)[1];
  JSON.stringify({
    url: playurl
  });
} else if (uu.indexOf("languang.wfss100") != -1) {
  var resp = getHttp(JSON.stringify({
    url: uu
  }));
  var playurl = resp.match(/vodurl.*?'(.*?)[#|']/)[1].replace("https://languang", "https://img");
  JSON.stringify({
    url: playurl
  });
} else if (uu.indexOf("mgtv.com.byteamone.cn") != -1) {
  var playurl = uu.split("url=")[1];
  JSON.stringify({
    url: playurl,
    headers: {
      "referer": "",
      "user-agent": "Mozilla/5.0"
    }
  });
} else if (uu.indexOf("hjjjjhd.top") != -1) {
  var playurl = uu.split("url=")[1];
  JSON.stringify({
    url: playurl,
    headers: {
      "referer": uu
    }
  });
} else if (uu.indexOf("https://www.baidu.com/s?wd=") != -1) {
  var playurl = uu.split("wd=")[1];
  if (playurl.indexOf("duoduozy.com") != -1) {
    var uuu = "https://player.duoduozy.com/ddplay/?url=" + playurl;
    var resp = getHttp(JSON.stringify({
      url: uuu,
      head: {
        "referer": "https://www.duoduozy.com/"
      }
    }));
    var uuuu = resp.match(/var urls.+?"(.+?)"/)[1];
    JSON.stringify({
      url: uuuu
    });
  } else if (playurl.indexOf("mayigq.com/vodzip/player.php?vid=") != -1) {
    var resp1 = getHttp(JSON.stringify({
      url: playurl,
      head: {
        'Referer': 'https://www.mayigq.com'
      }
    }));
    var menudata = e2Rex(resp1, ".get(#player_swf).a(lovevod)");
    var resp2 = getHttp(JSON.stringify({
      url: "https://www.mayigq.com/vodzip/config/token.php",
      post: {
        'menudata': menudata
      },
      head: {
        'Referer': playurl,
        'x-requested-with': 'XMLHttpRequest'
      }
    }));
    var realurl = "https://www.mayigq.com/vodzip/" + e2Rex(resp2, ".z2(var url.*?\"\\(.*?\\)\").ty(/)");
    var a = JZ(JSON.stringify({
      url: realurl,
      redirect: false,
      head: {
        "Referer": playurl,
        "User-Agent": "Mozilla/5.0 Android",
        "Cookie": "UM_distinctid=17bed9f3ec1239-0e52198f3410a6-1b3f0a2f-62b80-17bed9f3ec243a"
      }
    }));
    var finalurl = realurl;
    while (a.head.location) {
      var finalurl = a.head.location;
      var a = JZ(JSON.stringify({
        url: finalurl,
        redirect: false,
        head: {
          "Referer": playurl,
          "User-Agent": "Mozilla/5.0 Android",
          "Cookie": "UM_distinctid=17bed9f3ec1239-0e52198f3410a6-1b3f0a2f-62b80-17bed9f3ec243a"
        }
      }));
    }
    JSON.stringify({
      url: finalurl
    });
  } else if (playurl.indexOf("cat.wkfile.com") != -1) {
    JSON.stringify({
      url: playurl,
      head: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://qian.wkfile.com/"
      }
    });
  } else if (playurl.indexOf("api.m3u8.tv:5678") != -1) {
    var resp = JZ(JSON.stringify({
      url: playurl,
      head: {
        "User-Agent": UA,
        "Cookie": COOKIE
      }
    }));
    if (e2Rex(resp.code, ".json(url)").length > 1) {
      var realurl = JSON.parse(resp.code).url;
      if (playurl.indexOf("mgtv.com") != -1) {
        JSON.stringify({
          url: realurl,
          head: {
            "User-Agent": "Mozilla/5.0",
            "Referer": ""
          }
        });
      } else {
        JSON.stringify({
          url: realurl
        });
      }
    } else {
      "web=http://egwang186.gitee.io/?url=" + playurl.split("url=")[1];
    }
  } else {
    JSON.stringify({
      url: playurl
    });
  }
} else if (uu.indexOf("?u=http") != -1 || uu.indexOf("url=") != -1 || uu.indexOf("v=http") != -1 || uu.indexOf("json.php?id=") != -1) {
  var resp = JZ(JSON.stringify({
    url: uu,
    head: {
      "User-Agent": UA,
      "Cookie": COOKIE
    }
  }));
  if (resp.code.indexOf("<html") != -1) {
    if (resp.code.search(/<div id="video"/) != -1 || resp.code.search(/<div id="[^"]*?player"/) != -1 || resp.code.search(/\/\/视频链接/) != -1 || resp.code.search(/<iframe[\s\S]*?src="[^"]+?"/) != -1 || resp.code.search(/<video[\s\S]*?src="[^"]+?"/) != -1) {
      "web=" + uu;
    } else {
      if (uu.split("url=")[1].indexOf("alizy-") != -1) {
        var id = uu.split("url=")[1];
        var uuu = "https://api.jhdyw.vip/?url=" + id;
        var resp2 = JZ(JSON.stringify({
          url: uuu
        }));
        var playurl = JSON.parse(resp2.code).url || JSON.parse(resp2.code).msg;
        JSON.stringify({
          url: playurl
        });
      } else if (uu.split("url=")[1].indexOf("http") != -1) {
        "web=http://egwang186.gitee.io/?url=" + uu.split("url=")[1];
      } else {
        var id = uu.split("url=")[1];
        var uuu = "https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url=" + id;
        var resp = JZ(JSON.stringify({
          url: uuu
        }));
        var playurl = JSON.parse(resp.code).url || JSON.parse(resp.code).msg;
        JSON.stringify({
          url: playurl
        });
      }
    }
  } else if (resp.code.indexOf("#EXTINF") != -1) {
    if (uu.indexOf("?") != -1) {
      if (uu.indexOf("www.mgtv.com") != -1) {
        JSON.stringify([{
          name: "播放不了请切换mp4",
          url: uu + "&_type=.m3u8",
          head: {
            "User-Agent": "Mozilla/5.0",
            "Referer": ""
          }
        }, {
          name: "mp4",
          url: uu + "&_type=.mp4",
          head: {
            "User-Agent": "Mozilla/5.0",
            "Referer": ""
          }
        }]);
      } else {
        JSON.stringify({
          url: uu + "&_type=.m3u8"
        });
      }
    } else {
      JSON.stringify({
        url: uu + "?type=.m3u8"
      });
    }
  } else {
    if (e2Rex(resp.code, ".json(url)").length > 1) {
      var playurl = JSON.parse(resp.code).url;
      if (playurl.indexOf(".titan.mgtv.com") != -1) {
        JSON.stringify({
          url: playurl,
          head: {
            "User-Agent": UA,
            "Referer": ""
          }
        });
      } else {
        JSON.stringify({
          url: playurl
        });
      }
    } else if (uu.split("url=")[1].indexOf("alizy-") != -1) {
      var id = uu.split("url=")[1];
      var uuu = "https://api.jhdyw.vip/?url=" + id;
      var resp2 = JZ(JSON.stringify({
        url: uuu
      }));
      var playurl = JSON.parse(resp2.code).url || JSON.parse(resp2.code).msg;
      JSON.stringify({
        url: playurl
      });
    } else if (uu.split("url=")[1].indexOf("http") != -1) {
      "web=http://egwang186.gitee.io/?url=" + uu.split("url=")[1];
    } else {
      var id = uu.split("url=")[1];
      var uuu = "https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url=" + id;
      var resp2 = JZ(JSON.stringify({
        url: uuu
      }));
      var playurl = JSON.parse(resp2.code).url || JSON.parse(resp2.code).msg;
      JSON.stringify({
        url: playurl
      });
    }
  }
} else if (uu.indexOf("juztv.com/jx.php") != -1) {
  var resp = getHttp(JSON.stringify({
    url: uu
  }));
  var uuu = 'https://www.juztv.com/' + resp.match(/var u="(.*?)"/)[1];
  var resp2 = getHttp(JSON.stringify({
    url: uuu,
    head: {
      'Referer': uu
    }
  }));
  var playurl = resp2.match(/<video src="(.*?)"/)[1];
  JSON.stringify({
    url: playurl
  });
} else {
  "web=" + uu;
}
