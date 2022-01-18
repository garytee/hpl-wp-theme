function poker() { var bm = {};
    bm.clientVersion = "6.26";
    bm.copyright = "2020";
    bm.actionQueue = [];
    bm.audio = {};
    bm.bytesIn = 0;
    bm.bytesInList = [];
    bm.bytesOut = 0;
    bm.bytesOutList = [];
    bm.checkMark = "&#10004;";
    bm.color = {};
    bm.connected = false;
    bm.crc = {};
    bm.data = {};
    bm.debug = [];
    bm.debugShowing = false;
    bm.debugStatsTimer = null;
    bm.debugTimer = null;
    bm.deck = "";
    bm.doc = {};
    bm.arrowD = "&#9660;";
    bm.arrowL = "&#9668;";
    bm.arrowR = "&#9658;";
    bm.arrowU = "&#9650;";
    bm.eSeed = "";
    bm.firstError = true;
    bm.focused = null;
    bm.fullScreenCancel = false;
    bm.fullScreenRequest = false;
    bm.hasTouch = "ontouchstart" in document;
    bm.lang = {};
    bm.languages = 0;
    bm.lobby = null;
    bm.local = {};
    bm.loginData = {};
    bm.licenseType = "";
    bm.lobbyChatQueue = [];
    bm.loggedIn = false;
    bm.lurking = false;
    bm.maxAvatar = 64;
    bm.minAvatar = 1;
    bm.mobile = false;
    bm.mouse = true;
    bm.newAccounts = false;
    bm.notecolor = ["", "#97FF30", "#669966", "#80FFE1", "#309BFF", "#FFBBFF", "#8E7AFF", "#FFAA30", "#FF3E30", "#FFDB30", "#B5946E"];
    bm.notelabel = ["", "", "", "", "", "", "", "", "", "", ""];
    bm.params = {};
    bm.passwordRecovery = false;
    bm.passwords = {};
    bm.playerAction = [];
    bm.postFlopButtons = ["Min", "20%", "25%", "30%", "33%", "35%", "40%", "45%", "50%", "55%", "60%", "65%", "67%", "70%", "75%", "80%", "Pot", "Max"];
    bm.preFlopButtons = ["Min", "2½bb", "3bb", "3½bb", "4bb", "4½bb", "5bb", "5½bb", "6bb", "Pot", "Max"];
    bm.profileURL = "";
    bm.quit = false;
    bm.reconKey = "";
    bm.seatEmptyOpacity = 0.15;
    bm.seatOpacity = 0.5;
    bm.seatPosition = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    bm.sessionID = "";
    bm.sitting = [];
    bm.soundOK = true;
    bm.storage = true;
    bm.tableCurrent = -1;
    bm.tables = [];
    bm.validateEmails = false;
    bm.viewPort = 960;
    bm.waiting = [];
    bm.winOfsX = 10;
    bm.winOfsY = 10;
    bm.zTop = 0;

    function bB() { var g; for (g = bm.actionQueue.length - 1; g >= 0; g--) { if (bm.actionQueue[g].queued == false) { bm.actionQueue.splice(g, 1) } } if (bm.actionQueue.length > 0) { u(bm.actionQueue[0]) } }

    function a1(g) { if (g.queued == true) { return } bm.actionQueue.push(g);
        g.queued = true; if (bm.actionQueue.length == 1) { u(g) } }

    function u(g) { if (bm.local.bringToFront == true) { g.bringToFront() } }

    function bs() { var ce, cd, cc, cf, cg, g;
        cg = window.innerWidth;
        g = window.innerHeight; if (bm.mobile) { bm.$webTop.add(bm.$webBottom).add(bm.$webLeft).add(bm.$webRight).hide();
            bm.$webClient.css({ left: 0, top: 0, width: cg, height: g, right: "auto", bottom: "auto" }); return } ce = bm.$webLeft.width();
        cd = bm.$webRight.width();
        cc = bm.$webTop.height();
        cf = bm.$webBottom.height(); if (g - cc < bm.params.minHeight) { cc = 0 } bm.$webTop.toggle(cc > 0); if (g - cc - cf < bm.params.minHeight) { cf = 0 } bm.$webBottom.toggle(cf > 0); if (cg - ce < bm.params.minWidth) { ce = 0 } bm.$webLeft.toggle(ce > 0); if (cg - ce - cd < bm.params.minWidth) { cd = 0 } bm.$webRight.toggle(cd > 0);
        bm.$webClient.css({ top: cc, bottom: cf, left: ce, right: cd, width: "auto", height: "auto" }) }

    function h(cc, g) { bm.audio[cc].enabled = g; if (cc == "card2" || cc == "card3" || cc == "card4" || cc == "card5") { return } y(cc + "Sound", g) }

    function aU(g) { var cc = (new Date).getTime();
        bm.bytesInList.push({ time: cc, size: g });
        bm.bytesIn += g }

    function ar(g) { var cd, cc;
        cd = (new Date).getTime();
        cc = cd - 60000;
        bm.bytesOutList.push({ time: cd, size: g });
        bm.bytesOut += g; while (bm.bytesOutList[0].time < cc) { bm.bytesOut -= bm.bytesOutList[0].size;
            bm.bytesOutList.splice(0, 1) } }

    function v(cc) { var g, cd; if (cc) { g = bm.lobby.sitnGoGrid.selrow } else { g = bm.lobby.tourneyGrid.selrow } if (g < 0) { return false } if (cc) { cd = bm.data.SitnGo.rows[g].startMin } else { cd = bm.data.Tourney.rows[g].startMin } return (cd > 0) }

    function bf(cc) { var cd, g;
        cd = "Image?Name=Cards"; if (cc) { cd = cd + "4" } else { cd = cd + "2" } bm.deck = cd + "&Crc=" + bm.crc.image; for (g = 0; g < bm.tables.length; g++) { bm.tables[g].deckChange() } }

    function bO(ch, cf, cc, cj) { var ce, cd, ci, cg, g;
        ce = bm.lobby.loginGrid.getRow(ch, "player"); if (ce >= 0) { g = bm.data.Login.rows[ce];
            g.note = cf == "" ? "" : "&#10004;";
            g.colorSort = cc;
            g.color = J(cc);
            g.block = cj == "Yes" ? "" : "&#10004;";
            bm.lobby.loginGrid.update() } cg = cj == "No"; for (ce = 0; ce < bm.tables.length; ce++) { ci = bm.tables[ce]; for (cd = 1; cd <= ci.seats; cd++) { if (ci.playerName[cd] == ch) { ci.seat[cd].setNoteColor(cf, cc);
                    ci.setHint(cd);
                    ci.seat[cd].chatBlockIcon(cg); break } } } }

    function ap(cc) { var g, cd;
        g = cc.split("<br>"); for (cd = 0; cd < g.length; cd++) { g[cd] = a6(g[cd]) } return g.join("<br>") }

    function ac(cc, g) { return Math.floor(cc / g) * g }

    function D(cf) { if (cf.substr(0, 1) == "#") { cf = "0x" + cf.substr(1) } var ce, cd, cc;
        ce = cf >> 16 & 255;
        cd = cf >> 8 & 255;
        cc = cf & 255; return e(ce, cd, cc) }

    function ak(cg, cd, cc, cf, ci) { var ch, g, ce; if (cc == "T") { ch = aD(cd) } else { ch = cd } g = bm.passwords[cc + ch]; if (cf == true && g == null) { bm.lobby.getPasswordShow(cd, cc, ci, cg) } else { ce = { Response: cg, Table: cd, Type: cc, Seat: ci }; if (g != null) { ce.Password = g } bU(ce) } }

    function aa(cc) { if (cc.length == 0) { return "" } var g, cd;
        g = Math.round(Math.random() * 4294967295).toString(16).toUpperCase(); while (g.length < 8) { g = "0" + g } cd = m(m(cc + g)); return g + "-" + cd }

    function F(g, cg, cf) { var cd, ci, ce, cc, ch;
        ci = document.styleSheets.length; for (cd = 0; cd < ci; cd++) { cc = document.styleSheets[cd];
            ch = cc.cssRules || cc.rules; for (ce in ch) { if (ch[ce].selectorText == g) { ch[ce].style[cg] = cf; return true } } } return false }

    function bg(cc, g) { if (g) { return bm.maskPrimary.split("%1%").join(cc) } else { return bm.maskSecondary.split("%1%").join(cc) } }

    function ab(cc) { var g = ""; if (cc >= 1000000000) { cc = cc / 1000000000;
            g = "B" } else { if (cc >= 1000000) { cc = cc / 1000000;
                g = "M" } else { if (cc >= 10000) { cc = cc / 1000;
                    g = "K" } } } return bW(cc) + g }

    function bW(ce) { var g, cc, cd;
        cd = Number(ce); if (cd === parseInt(cd, 10)) { return cd.toString() } g = cd.toFixed(2);
        cc = g.indexOf("."); return g.substr(0, cc) + bm.local.decimalMark + g.substr(cc + 1, 2) }

    function bL(ci) { var g, ch, ce, cg, cd, cf; if (ci < 0) { g = "-" } else { g = "" } ch = Math.abs(ci);
        ce = bW(ch); if (ch < 10000) { return g + ce } cg = ce.indexOf(bm.local.decimalMark); if (cg < 0) { cg = ce.length } cd = ce.substr(cg, 3);
        cf = 0; while (cg > 0) { if (cf == 3) { cd = bm.local.thouSeparator + cd;
                cf = 0 } cg--;
            cd = ce.substr(cg, 1) + cd;
            cf++ } return g + cd }

    function j(cf) { var cd, g, cc, ce;
        cd = cf.getHours(); if (cd > 12 && bm.local.timeFormat == "12") { cd = cd - 12 } if (cd < 10) { ce = "0" + cd } else { ce = cd } g = cf.getMinutes(); if (g < 10) { ce = ce + ":0" + g } else { ce = ce + ":" + g } cc = cf.getSeconds(); if (cc < 10) { ce = ce + ":0" + cc } else { ce = ce + ":" + cc } return ce }

    function n(ch) { var cg, ce, g, cd, cc, cf;
        cg = new Date;
        ce = cg.getUTCHours(); if (ce < 10) { ce = "0" + ce } g = cg.getUTCMinutes(); if (g < 10) { g = "0" + g } cd = cg.getUTCSeconds(); if (cd < 10) { cd = "0" + cd } cc = cg.getUTCMilliseconds(); if (cc < 10) { cc = "00" + cc } else { if (cc < 100) { cc = "0" + cc } } cf = ce + ":" + g + ":" + cd + "." + cc + " " + ch;
        bm.debug.push(cf); if (bm.debugShowing) { bm.debugContent.addTextLine(cf) } }

    function aL() { bm.color.TableTop = "#FFFFFF";
        bm.color.TableBackground = "#FFFFFF";
        bm.color.Background = "#FFFFFF";
        bm.color.Window = "#303030";
        bm.color.Button = "#C0C0C0";
        bm.color.List = "#FFFFFF";
        bh();
        bm.debugLog = new bp($("#DebugLog"), null, { minwidth: 250, minheight: 150, onresize: function() { bm.debugContent.updateScrollPosition() } });
        bm.debugLog.setTitle("Debugger");
        new C($(".ok", bm.debugLog.$dialog), "OK", 25, function() { bm.debugShowing = false;
            bm.debugLog.close() });
        new C($(".save", bm.debugLog.$dialog), "Save", 25, function() { a9("Debugger", bm.debugContent.getText(), true) });
        $(".closebtn", bm.debugLog.$dialog).on("touchstart mousedown", function() { bm.debugShowing = false;
            bm.debugLog.close(); return false });
        bm.debugContent = new bC($(".debugcontent", bm.debugLog.$dialog), true);
        n("MSG Version " + bm.clientVersion + " : " + bm.params.sitePlatform + " : " + bm.params.siteID);
        bm.debugStatsTimer = setInterval(bH, 60000) }

    function bb() { bm.doc.debug = false; if (bm.doc.$menu) { bm.doc.$menu.hide();
            bm.doc.$menu = null } bm.debugLog.show(false, bm.mobile);
        bm.debugContent.setScale(bm.debugLog.scale); if (!bm.mobile) { var g, cc;
            g = (bm.$webClient.width() - bm.debugLog.$dialog.width()) / 2;
            cc = (bm.$webClient.height() - bm.debugLog.$dialog.height()) / 2;
            bm.debugLog.$dialog.css({ left: g, top: cc }) } bm.debugShowing = true;
        bm.debugContent.setText(bm.debug.join("\r\n") + "\r\n");
        bm.debugContent.bottomScroll() }

    function bH() { var g = (new Date).getTime() - 60000; while (bm.bytesInList.length > 0 && bm.bytesInList[0].time < g) { bm.bytesIn -= bm.bytesInList[0].size;
            bm.bytesInList.splice(0, 1) } while (bm.bytesOutList.length > 0 && bm.bytesOutList[0].time < g) { bm.bytesOut -= bm.bytesOutList[0].size;
            bm.bytesOutList.splice(0, 1) } if (bm.debugShowing) { n("MSG Packets per minute: " + bm.bytesInList.length + " in, " + bm.bytesOutList.length + " out");
            n("MSG Bytes per minute: " + bm.bytesIn + " in, " + bm.bytesOut + " out") } }

    function bG() { var g = !bm.hasTouch,
            cc = false;
        bm.doc.$menu = null;
        bm.doc.menuitem = null;
        bm.doc.button = null;
        bm.doc.dialog = null;
        bm.doc.grid = null;
        bm.doc.nameplate = null;
        bm.doc.scrollbar = null;
        bm.doc.slider = null;
        bm.doc.debug = false;
        $(document).on("contextmenu", function() { return false });
        $(document).on("touchend mouseup", function(ce) { if (aQ(ce)) { return } var cd = false; if (!cc && bm.waContext) { cc = true;
                bm.waContext.resume() } if (!g) { g = true;
                bm.audio.beep.play(true) } if (bm.doc.debug) { bm.doc.debug = false;
                clearTimeout(bm.debugTimer) } if (bm.doc.$menu) { bm.doc.$menu.hide();
                bm.doc.$menu = null;
                cd = true } if (bm.doc.menuitem) { bm.doc.menuitem.$menu.parent().hide();
                bm.doc.menuitem = null;
                cd = true } if (bm.doc.button) { bm.doc.button.up();
                cd = true } if (bm.doc.dialog) { bm.doc.dialog.offDialog();
                cd = true } if (bm.doc.grid) { bm.doc.grid.offGrid();
                cd = true } if (bm.doc.nameplate) { bm.doc.nameplate.hintOff();
                cd = true } if (bm.doc.scrollbar) { clearTimeout(bm.doc.scrollbar.timer);
                bm.doc.scrollbar = null;
                cd = true } if (bm.doc.slider) { bm.doc.slider = null;
                cd = true } if (cd) { return false } });
        $(document).on("touchmove mousemove", function(ce) { if (aQ(ce)) { return } var cd = false; if (bm.doc.dialog) { bm.doc.dialog.onDialog(ce);
                cd = true } if (bm.doc.grid) { bm.doc.grid.onGrid(ce);
                cd = true } if (bm.doc.scrollbar) { bm.doc.scrollbar.dragThumb(ce);
                cd = true } if (bm.doc.slider) { bm.doc.slider.slide(ce);
                cd = true } if (cd) { return false } }) }

    function o(g) { var cc = g.lastIndexOf(" - Table "); if (cc < 0) { return 0 } else { return bu(g.substring(cc + 9)) } }

    function aD(g) { var cc = g.lastIndexOf(" - "); if (cc < 0) { return g } else { return g.substring(0, cc) } }

    function aG(g) { $(".dialog .title").removeClass("bold");
        $(".title", g.$dialog).addClass("bold");
        bm.focused = g }

    function W() { var g = window.document,
            cc = g.documentElement;
        bm.fullScreenCancel = g.exitFullscreen || g.mozCancelFullScreen || g.webkitExitFullscreen || g.msExitFullscreen;
        bm.fullScreenRequest = cc.requestFullscreen || cc.mozRequestFullScreen || cc.webkitRequestFullScreen || cc.msRequestFullscreen }

    function T() { var g = window.document; return g.fullscreenElement || g.mozFullScreenElement || g.webkitFullscreenElement || g.msFullscreenElement }

    function b6(g) { if (g && bm.fullScreenRequest) { bm.fullScreenRequest.call(window.document.documentElement) } else { if (!g && bm.fullScreenCancel) { bm.fullScreenCancel.call(window.document) } } }

    function am(ct, cq, cp, co, cn) { var ci, cm, cx, cw, cv, cu, cr, cs, cl, cj, ck, ch, cg, cf, ce, cd, cc, g;
        ci = "23456789TJQKA";
        cm = "cdhs";
        cs = "["; if (ct > 0 && ct < 53) { cl = Math.floor((ct - 1) / 4);
            cj = (ct - 1) % 4;
            cx = ci.charAt(cl) + cm.charAt(cj);
            cs = cs + cx } if (cq > 0 && cq < 53) { ck = Math.floor((cq - 1) / 4);
            ch = (cq - 1) % 4;
            cw = ci.charAt(ck) + cm.charAt(ch);
            cs = cs + " " + cw } if (cp > 0 && cp < 53) { cg = Math.floor((cp - 1) / 4);
            cf = (cp - 1) % 4;
            cv = ci.charAt(cg) + cm.charAt(cf);
            cs = cs + " " + cv } if (co > 0 && co < 53) { ce = Math.floor((co - 1) / 4);
            cd = (co - 1) % 4;
            cu = ci.charAt(ce) + cm.charAt(cd);
            cs = cs + " " + cu } if (cn > 0 && cn < 53) { cc = Math.floor((cn - 1) / 4);
            g = (cn - 1) % 4;
            cr = ci.charAt(cc) + cm.charAt(g);
            cs = cs + " " + cr } cs = cs + "]"; return cs }

    function c(cc) { var g, cd;
        g = bm.lobby.noteList.controls.noteGrid.getRow(cc, "player"); if (g < 0) { return { color: 0, note: "", block: "" } } else { cd = bm.data.Notes.rows[g]; return { color: cd.colorNum, note: cd.note, block: cd.block } } }

    function H() { if (!bm.storage) { return "00000000" } if (R("PCID") == null) { var g = Math.round(Math.random() * 4294967295).toString(16).toUpperCase(); while (g.length < 8) { g = "0" + g } y("PCID", g) } return R("PCID") }

    function r(ce) { var cd, cc, g;
        cd = null;
        cc = aj(ce.Type) + aj(ce.Table); for (g = 0; g < bm.tables.length; g++) { if (bm.tables[g].type + bm.tables[g].id == cc) { cd = bm.tables[g]; break } } return cd }

    function al(cd, cc, cf) { var g, cg, ce; if (cc == "R") { for (g = 0; g < bm.data.Ring.rows.length; g++) { if (bm.data.Ring.rows[g].id == cd) { return bm.data.Ring.rows[g].buyin } } return "?" } else { if (cf) { ce = bm.data.SitnGo.rows } else { ce = bm.data.Tourney.rows } cg = aD(cd); for (g = 0; g < ce.length; g++) { if (ce[g].id == cg) { return ce[g].buyin } } return "?" } }

    function bK(ce, cd, cg) { var cc, g, ci, ch, cf;
        cc = ""; if (bm.loggedIn && !bm.mobile) { cc = " - " + bm.lang.TableCaptionLoggedIn.split("%1%").join(bm.loginData.player) } if (cd == "R") { for (g = 0; g < bm.data.Ring.rows.length; g++) { if (bm.data.Ring.rows[g].id == ce) { return ce + (bm.mobile ? "" : " - " + bm.data.Ring.rows[g].game + " (" + bm.data.Ring.rows[g].buyin + ")") + cc } } return "?" } else { if (cg) { cf = bm.data.SitnGo.rows } else { cf = bm.data.Tourney.rows } ci = aD(ce);
            ch = o(ce);
            ce = ci + " - " + bm.lang.TableCaptionTable + " " + ch; for (g = 0; g < cf.length; g++) { if (cf[g].id == ci) { return ce + (bm.mobile ? "" : " - " + cf[g].game + " (" + cf[g].buyin + ")") + cc } } return "?" } }

    function J(g) { if (g == 0) { return "" } else { return "<div class='grid_color' style='background-color: " + bm.notecolor[g] + ";'>" } }

    function bQ(cj, ce, ci) { var cf, cg, cp, cn, co, cq, g, cc, cm, cd, ch, cl, ck;
        cn = cj / 100;
        co = ce / 100;
        cq = ci / 100; if (cq < 0.5) { g = cq * (1 + co) } else { g = cq + co - (cq * co) } cc = (2 * cq) - g;
        cm = cn + (1 / 3); if (cm > 1) { cm = cm - 1 } if (cm < (1 / 6)) { cf = cc + ((g - cc) * 6 * cm) } else { if (cm < (1 / 2)) { cf = g } else { if (cm < (2 / 3)) { cf = cc + ((g - cc) * 6 * ((2 / 3) - cm)) } else { cf = cc } } } cf = Math.round(cf * 255);
        cd = cn; if (cd < (1 / 6)) { cg = cc + ((g - cc) * 6 * cd) } else { if (cd < (1 / 2)) { cg = g } else { if (cd < (2 / 3)) { cg = cc + ((g - cc) * 6 * ((2 / 3) - cd)) } else { cg = cc } } } cg = Math.round(cg * 255);
        ch = cn - (1 / 3); if (ch < 0) { ch = ch + 1 } if (ch < (1 / 6)) { cp = cc + ((g - cc) * 6 * ch) } else { if (ch < (1 / 2)) { cp = g } else { if (ch < (2 / 3)) { cp = cc + ((g - cc) * 6 * ((2 / 3) - ch)) } else { cp = cc } } } cp = Math.round(cp * 255);
        cl = (cf << 16) | (cg << 8) | cp;
        ck = cl.toString(16); while (ck.length < 6) { ck = "0" + ck } return "#" + ck }

    function a6(g) { return g.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split("'").join("&apos;").split('"').join("&quot;") }

    function aQ(g) { if (g.type.indexOf("mouse") == 0) { return !bm.mouse } else { bm.mouse = false;
            setTimeout(function() { bm.mouse = true }, 2000); return false } }

    function aW() { bm.winOfsX = bm.winOfsX + 35;
        bm.winOfsY = bm.winOfsY + 35; if (bm.winOfsX + 706 > bm.$webClient.width() - 5) { bm.winOfsX = 10 } if (bm.winOfsY + 568 > bm.$webClient.height() - 5) { bm.winOfsY = 10 } }

    function cb() { var cc, g = ["2½", "3", "3½", "4", "4½", "5", "5½", "6"];
        bm.preFlopButtons[0] = bm.lang.TableButtonMin; for (cc = 1; cc < 9; cc++) { bm.preFlopButtons[cc] = bm.lang.TableButtonBBx.split("%1%").join(g[cc - 1]) } bm.preFlopButtons[9] = bm.lang.TableButtonPot;
        bm.preFlopButtons[10] = bm.lang.TableButtonMax;
        bm.postFlopButtons[0] = bm.lang.TableButtonMin;
        bm.postFlopButtons[16] = bm.lang.TableButtonPot;
        bm.postFlopButtons[17] = bm.lang.TableButtonMax }

    function bV() { var g;
        $.fn.xytrans = function(cc) { if (cc == 0) { return $(this).each(function() { $(this).css("transition", "none") }) } else { return $(this).each(function() { $(this).css({ transition: "left " + cc + "ms ease-out, top " + cc + "ms ease-out", "-webkit-backface-visibility": "hidden" }) }) } };
        $.fn.optrans = function(cc) { return $(this).each(function() { $(this).css({ transition: "opacity " + cc + "ms", "-webkit-backface-visibility": "hidden" }) }) };
        $.fn.redraw = function() { return $(this).each(function() { g = getComputedStyle(this).display }) } }

    function aw(cc) { var g = bm.lobby.noteList.controls.noteGrid.getRow(cc, "player"); return (g >= 0 && bm.data.Notes.rows[g].chatBool == "No") }

    function bq() { return (window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches) }

    function bw(g) { return encodeURI(g).split(/%..|./).length - 1 }

    function aK() { if (typeof AudioContext !== "undefined") { bm.waContext = new AudioContext();
            bm.waGain = (typeof bm.waContext.createGain == "undefined") ? bm.waContext.createGainNode() : bm.waContext.createGain();
            bm.mp3 = true;
            n("MSG Using Web Audio") } else { if (typeof webkitAudioContext !== "undefined") { bm.waContext = new webkitAudioContext();
                bm.waGain = (typeof bm.waContext.createGain == "undefined") ? bm.waContext.createGainNode() : bm.waContext.createGain();
                bm.mp3 = true;
                n("MSG Using Webkit Audio") } else { bm.waContext = null;
                bm.waGain = null;
                bm.mp3 = (new Audio()).canPlayType("audio/mpeg");
                n("MSG Using HTML Audio") } } bm.audio.beep = new af("beep", R("beepSound") != "false");
        bm.audio.bet = new af("bet", R("betSound") != "false");
        bm.audio.card = new af("card", R("cardSound") != "false");
        bm.audio.card2 = new af("card", R("cardSound") != "false");
        bm.audio.card3 = new af("card", R("cardSound") != "false");
        bm.audio.card4 = new af("card", R("cardSound") != "false");
        bm.audio.card5 = new af("card", R("cardSound") != "false");
        bm.audio.check = new af("check", R("checkSound") != "false");
        bm.audio.login = new af("login", R("loginSound") == "true");
        bm.audio.pot = new af("pot", R("potSound") != "false") }

    function ai() { bm.params.buttonRadius = aj(params.buttonRadius);
        bm.params.fontFamily = aj(params.fontFamily);
        bm.params.fontLarge = aj(params.fontLarge);
        bm.params.fontNormal = aj(params.fontNormal);
        bm.params.fontSmall = aj(params.fontSmall);
        bm.params.gradients = aj(params.gradients) == "Yes";
        bm.params.guiMode = aj(params.guiMode);
        bm.params.language = bu(params.language);
        bm.params.loginName = aj(params.loginName);
        bm.params.loginPassword = aj(params.loginPassword);
        bm.params.logoutLink = aj(params.logoutLink);
        bm.params.minHeight = bu(params.minHeight);
        bm.params.minWidth = bu(params.minWidth);
        bm.params.packetPort = aj(params.packetPort);
        bm.params.sessionKey = aj(params.sessionKey);
        bm.params.showNetChips = aj(params.showNetChips) == "Yes";
        bm.params.sitAndGoTab = aj(params.sitAndGoTab) == "Yes";
        bm.params.siteID = aj(params.siteID);
        bm.params.sitePlatform = aj(params.sitePlatform);
        bm.params.sitePassword = aj(params.sitePassword);
        bm.params.tableDelimiter = aj(params.tableDelimiter);
        bm.params.tableName = aj(params.tableName);
        bm.params.tablePassword = aj(params.tablePassword);
        bm.params.tableType = aj(params.tableType);
        bm.params.useSSL = aj(params.useSSL);
        bm.$webBottom = $("#bottom_div");
        bm.$webClient = $("#client_div");
        bm.$webLeft = $("#left_div");
        bm.$webRight = $("#right_div");
        bm.$webTop = $("#top_div"); if (bm.params.gradients) { F(".menu", "backgroundImage", "url('Image?Name=Grad25')");
            F(".header", "backgroundImage", "url('Image?Name=Grad30')");
            F(".grid_header", "backgroundImage", "url('Image?Name=Grad25')") } }

    function ba() { var cc, g, ce, cd; if (bm.params.language > 0) { y("language", bm.params.language) } cc = R("language"); if (cc == null || cc < 0 || cc > 5) { cc = 0 } bm.local.language = cc; if (R("decimalMark") == ",") { bm.local.decimalMark = ",";
            bm.local.thouSeparator = "." } else { bm.local.decimalMark = ".";
            bm.local.thouSeparator = "," } if (R("timeFormat") == "24") { bm.local.timeFormat = "24" } else { bm.local.timeFormat = "12" } cc = R("soundVolume"); if (cc == null || cc < 0 || cc > 1) { cc = 1 } bm.local.soundVolume = cc;
        bm.local.bringToFront = R("bringToFront") != "false";
        bm.local.preferredSeat = R("preferredSeat") != "false";
        cc = R("seatPosition"); if (cc != null) { bm.seatPosition = JSON.parse(cc) } bm.local.handHelper = R("handHelper") != "false";
        bm.local.autoMuck = R("autoMuck") != "false";
        bm.local.fourColorDeck = R("fourColorDeck") == "true";
        bm.local.dealFaceDown = R("dealFaceDown") == "true";
        bm.local.muteDealer = R("muteDealer") == "true";
        g = [2, 4, 6, 9];
        ce = [4, 8, 12, 16]; for (cd = 1; cd < 5; cd++) { cc = R("preFlopButton" + cd); if (cc == null || cc < 0 || cc > 10) { cc = g[cd - 1] } bm.local["preFlopButton" + cd] = +cc;
            cc = R("postFlopButton" + cd); if (cc == null || cc < 0 || cc > 17) { cc = ce[cd - 1] } bm.local["postFlopButton" + cd] = +cc } bm.local.arrangeLobby = R("arrangeLobby") == "true"; if (bm.params.guiMode == "") { bm.local.gui = R("gui") } else { bm.local.gui = bm.params.guiMode;
            bJ("gui", bm.local.gui) } if (bm.local.gui != "desktop" && bm.local.gui != "mobile") { bm.local.gui = "auto" } if (bm.local.gui == "auto") { bm.mobile = bm.hasTouch } else { bm.mobile = (bm.local.gui == "mobile") } bm.local.fontSize = R("fontSize"); if (bm.local.fontSize != "small" && bm.local.fontSize != "large") { bm.local.fontSize = "normal" } V();
        F("body", "fontFamily", bm.params.fontFamily);
        bm.local.chatBlockAsterisk = R("chatBlockAsterisk") != "false";
        bm.local.lobbyChatTime = R("lobbyChatTime") == "true";
        bm.local.tableChatTime = R("tableChatTime") == "true";
        bm.local.filterRingActivate = R("filterRingActivate") == "true";
        bm.local.filterRingHoldem = R("filterRingHoldem") != "false";
        bm.local.filterRingOmaha = R("filterRingOmaha") != "false";
        bm.local.filterRingOmahaHiLo = R("filterRingOmahaHiLo") != "false";
        bm.local.filterRingOmaha5 = R("filterRingOmaha5") != "false";
        bm.local.filterRingOmaha5HiLo = R("filterRingOmaha5HiLo") != "false";
        bm.local.filterRingRazz = R("filterRingRazz") != "false";
        bm.local.filterRingStud = R("filterRingStud") != "false";
        bm.local.filterRingStudHiLo = R("filterRingStudHiLo") != "false";
        bm.local.filterRingMixed = R("filterRingMixed") != "false";
        bm.local.filterRingNL = R("filterRingNL") != "false";
        bm.local.filterRingPL = R("filterRingPL") != "false";
        bm.local.filterRingCL = R("filterRingCL") != "false";
        bm.local.filterRingFixed = R("filterRingFixed") != "false";
        bm.local.filterRingStakesMin = R("filterRingStakesMin");
        bm.local.filterRingStakesMax = R("filterRingStakesMax");
        bm.local.filterRingBuyinMin = R("filterRingBuyinMin");
        bm.local.filterRingBuyinMax = R("filterRingBuyinMax");
        bm.local.filterRingSeatsMin = R("filterRingSeatsMin");
        bm.local.filterRingSeatsMax = R("filterRingSeatsMax");
        bm.local.filterRingPlayersMin = R("filterRingPlayersMin");
        bm.local.filterRingPrimary = R("filterRingPrimary") != "false";
        bm.local.filterRingSecondary = R("filterRingSecondary") != "false";
        bm.local.filterRingHideFull = R("filterRingHideFull") == "true";
        bm.local.filterRingHidePrivate = R("filterRingHidePrivate") == "true";
        bm.local.filterTourneyActivate = R("filterTourneyActivate") == "true";
        bm.local.filterTourneyHoldem = R("filterTourneyHoldem") != "false";
        bm.local.filterTourneyOmaha = R("filterTourneyOmaha") != "false";
        bm.local.filterTourneyOmahaHiLo = R("filterTourneyOmahaHiLo") != "false";
        bm.local.filterTourneyOmaha5 = R("filterTourneyOmaha5") != "false";
        bm.local.filterTourneyOmaha5HiLo = R("filterTourneyOmaha5HiLo") != "false";
        bm.local.filterTourneyRazz = R("filterTourneyRazz") != "false";
        bm.local.filterTourneyStud = R("filterTourneyStud") != "false";
        bm.local.filterTourneyStudHiLo = R("filterTourneyStudHiLo") != "false";
        bm.local.filterTourneyMixed = R("filterTourneyMixed") != "false";
        bm.local.filterTourneyNL = R("filterTourneyNL") != "false";
        bm.local.filterTourneyPL = R("filterTourneyPL") != "false";
        bm.local.filterTourneyFixed = R("filterTourneyFixed") != "false";
        bm.local.filterTourneyFreezeout = R("filterTourneyFreezeout") != "false";
        bm.local.filterTourneyRebuy = R("filterTourneyRebuy") != "false";
        bm.local.filterTourneyShootout = R("filterTourneyShootout") != "false";
        bm.local.filterTourneyBuyinMin = R("filterTourneyBuyinMin");
        bm.local.filterTourneyBuyinMax = R("filterTourneyBuyinMax");
        bm.local.filterTourneySizeMin = R("filterTourneySizeMin");
        bm.local.filterTourneySizeMax = R("filterTourneySizeMax");
        bm.local.filterTourneyTime = R("filterTourneyTime") != "false";
        bm.local.filterTourneyOther = R("filterTourneyOther") != "false";
        bm.local.filterTourneyPrimary = R("filterTourneyPrimary") != "false";
        bm.local.filterTourneySecondary = R("filterTourneySecondary") != "false";
        bm.local.filterTourneyHidePrivate = R("filterTourneyHidePrivate") == "true";
        bm.local.filterTourneyHideRunning = R("filterTourneyHideRunning") == "true";
        bm.local.filterSitnGoActivate = R("filterSitnGoActivate") == "true";
        bm.local.filterSitnGoHoldem = R("filterSitnGoHoldem") != "false";
        bm.local.filterSitnGoOmaha = R("filterSitnGoOmaha") != "false";
        bm.local.filterSitnGoOmahaHiLo = R("filterSitnGoOmahaHiLo") != "false";
        bm.local.filterSitnGoOmaha5 = R("filterSitnGoOmaha5") != "false";
        bm.local.filterSitnGoOmaha5HiLo = R("filterSitnGoOmaha5HiLo") != "false";
        bm.local.filterSitnGoRazz = R("filterSitnGoRazz") != "false";
        bm.local.filterSitnGoStud = R("filterSitnGoStud") != "false";
        bm.local.filterSitnGoStudHiLo = R("filterSitnGoStudHiLo") != "false";
        bm.local.filterSitnGoMixed = R("filterSitnGoMixed") != "false";
        bm.local.filterSitnGoNL = R("filterSitnGoNL") != "false";
        bm.local.filterSitnGoPL = R("filterSitnGoPL") != "false";
        bm.local.filterSitnGoFixed = R("filterSitnGoFixed") != "false";
        bm.local.filterSitnGoFreezeout = R("filterSitnGoFreezeout") != "false";
        bm.local.filterSitnGoRebuy = R("filterSitnGoRebuy") != "false";
        bm.local.filterSitnGoShootout = R("filterSitnGoShootout") != "false";
        bm.local.filterSitnGoBuyinMin = R("filterSitnGoBuyinMin");
        bm.local.filterSitnGoBuyinMax = R("filterSitnGoBuyinMax");
        bm.local.filterSitnGoSizeMin = R("filterSitnGoSizeMin");
        bm.local.filterSitnGoSizeMax = R("filterSitnGoSizeMax");
        bm.local.filterSitnGoTime = R("filterSitnGoTime") != "false";
        bm.local.filterSitnGoOther = R("filterSitnGoOther") != "false";
        bm.local.filterSitnGoPrimary = R("filterSitnGoPrimary") != "false";
        bm.local.filterSitnGoSecondary = R("filterSitnGoSecondary") != "false";
        bm.local.filterSitnGoHidePrivate = R("filterSitnGoHidePrivate") == "true";
        bm.local.filterSitnGoHideRunning = R("filterSitnGoHideRunning") == "true" }

    function bJ(g, cc) { bm.local[g] = cc;
        y(g, cc) }

    function aq(cc) { var g; if (cc == "#000000") { return "#333333" } g = D(cc); return bQ(g.hu, g.sa, g.li * 0.75) }

    function bh() { bm.color.WindowText = bv(bm.color.Window);
        bm.color.WindowDisabled = w(bm.color.Window);
        bm.color.ButtonText = bv(bm.color.Button);
        bm.color.ButtonDisabled = w(bm.color.Button);
        bm.color.ButtonBorder = aq(bm.color.Button);
        bm.color.ListText = bv(bm.color.List);
        bm.color.ListDisabled = w(bm.color.List) }

    function w(cc) { var g = D(cc); if (g.y >= 50) { g.li = g.li / 2 } else { g.li = g.li / 2 + 50 } return bQ(g.hu, g.sa, g.li) }

    function bv(cc) { var g = D(cc); if (g.y >= 50) { g.li = g.li / 4 } else { g.li = g.li / 4 + 75 } return bQ(g.hu, g.sa, g.li) }

    function bA() { var cc, g;
        cc = bm.color.List; if ($(this).hasClass("disabled")) { g = bm.color.ListDisabled } else { g = bm.color.ListText } $(this).css({ color: cc, "background-color": g }) }

    function bS() { var g, cc;
        g = bm.color.List; if ($(this).hasClass("disabled")) { cc = bm.color.ListDisabled } else { cc = bm.color.ListText } $(this).css({ color: cc, "background-color": g }) }

    function bu(g) { var cc = Number(g); if (isNaN(cc) == true) { return 0 } else { return cc } }

    function aj(g) { if (g == null) { return "" } else { return String(g) } }

    function bP(g) { var cc = (g.type.indexOf("touch") == 0 && g.originalEvent.touches.length > 1); return cc }

    function f(g) { var cc; while (bm.tables.length > 0) { bm.tables[0].closeTable() } bm.lobby.popoutChat.close();
        bm.lobby.info.close();
        bm.lobby.news.close();
        bm.lobby.faq.close();
        bm.connected = false;
        bm.loggedIn = false;
        bm.loginData = {};
        ax();
        bm.lobby.dialog.close();
        bm.lobby = null;
        bm.quit = true; if (g == true) { alert(bm.lang.MessageTerminated) } else { bU({ Response: "Logout" }) } bm.ws.close();
        clearInterval(bm.debugStatsTimer); if (T()) { cc = new C($("#ExitFullScreenBtn"), bm.lang.LobbyButtonExitFS, 40, function() { b6(false);
                cc.show(false) }) } if (!g && bm.params.logoutLink != "") { window.location.href = bm.params.logoutLink } }

    function bI(g) { if (bm.audio[g].enabled) { bm.audio[g].play() } }

    function bF(cd, cc) { var g = r(cc); if (g == null) { return } if (g.animating == 0) { cd(cc) } else { g.packetQueue.push({ command: cd, packet: cc }) } }

    function B(cc) { var cd; while (cc.animating == 0 && cc.packetQueue.length > 0) { cd = cc.packetQueue.shift(); try { cd.command(cd.packet) } catch (g) { n("ERR queueProcess error: " + g) } } }

    function bi() { var cc, g; for (cc = 0; cc < bm.tables.length; cc++) { table = bm.tables[cc]; for (g = 1; g <= table.seats; g++) { table.setHint(g) } } }

    function N(g) { switch (g) {
            case 1:
                return bm.lang.CardsAce;
            case 2:
                return bm.lang.CardsDeuce;
            case 3:
                return bm.lang.CardsThree;
            case 4:
                return bm.lang.CardsFour;
            case 5:
                return bm.lang.CardsFive;
            case 6:
                return bm.lang.CardsSix;
            case 7:
                return bm.lang.CardsSeven;
            case 8:
                return bm.lang.CardsEight;
            case 9:
                return bm.lang.CardsNine;
            case 10:
                return bm.lang.CardsTen;
            case 11:
                return bm.lang.CardsJack;
            case 12:
                return bm.lang.CardsQueen;
            case 13:
                return bm.lang.CardsKing;
            case 14:
                return bm.lang.CardsAce;
            default:
                return "?" } }

    function p(g) { switch (g) {
            case 1:
                return bm.lang.CardsAces;
            case 2:
                return bm.lang.CardsDeuces;
            case 3:
                return bm.lang.CardsThrees;
            case 4:
                return bm.lang.CardsFours;
            case 5:
                return bm.lang.CardsFives;
            case 6:
                return bm.lang.CardsSixes;
            case 7:
                return bm.lang.CardsSevens;
            case 8:
                return bm.lang.CardsEights;
            case 9:
                return bm.lang.CardsNines;
            case 10:
                return bm.lang.CardsTens;
            case 11:
                return bm.lang.CardsJacks;
            case 12:
                return bm.lang.CardsQueens;
            case 13:
                return bm.lang.CardsKings;
            case 14:
                return bm.lang.CardsAces;
            default:
                return "?" } }

    function bn(ch) { var g, cc, ci, cg, cf, ce, cd;
        g = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        ci = (ch & 983040) >>> 16;
        cg = (ch & 61440) >>> 12;
        cf = (ch & 3840) >>> 8;
        ce = (ch & 240) >>> 4;
        cd = ch & 15; if (ch == 10411194) { cc = bm.lang.HandRoyalFlush } else { if (ch >= 9437184) { cc = bm.lang.HandStraightFlushLong.split("%1%").join(N(cd));
                cc = cc.split("%2%").join(N(ci)) } else { if (ch >= 8388608) { cc = bm.lang.HandFourOfAKindLong.split("%1%").join(p(ci));
                    cc = cc.split("%2%").join(g[cd]) } else { if (ch >= 7340032) { cc = bm.lang.HandFullHouseLong.split("%1%").join(p(ci));
                        cc = cc.split("%2%").join(p(ce)) } else { if (ch >= 6291456) { cc = bm.lang.HandFlushLong.split("%1%").join(N(ci));
                            cc = cc.split("%2%").join(g[cg] + g[cf] + g[ce] + g[cd]) } else { if (ch >= 5242880) { cc = bm.lang.HandStraightLong.split("%1%").join(N(cd));
                                cc = cc.split("%2%").join(N(ci)) } else { if (ch >= 4194304) { cc = bm.lang.HandThreeOfAKindLong.split("%1%").join(p(ci));
                                    cc = cc.split("%2%").join(g[ce] + g[cd]) } else { if (ch >= 3145728) { cc = bm.lang.HandTwoPairLong.split("%1%").join(p(ci));
                                        cc = cc.split("%2%").join(p(cf));
                                        cc = cc.split("%3%").join(g[cd]) } else { if (ch >= 2097152) { if (cd != 0) { cc = bm.lang.HandPairLong } else { cc = bm.lang.HandPairShort } cc = cc.split("%1%").join(p(ci)); if (cd != 0) { cc = cc.split("%2%").join(g[cf] + g[ce] + g[cd]) } } else { if (ch >= 1048576) { if (cd != 0) { cc = bm.lang.HandHighCardLong } else { cc = bm.lang.HandHighCardShort } cc = cc.split("%1%").join(N(ci)); if (cd != 0) { cc = cc.split("%2%").join(g[cg] + g[cf] + g[ce] + g[cd]) } } else { cc = "?" } } } } } } } } } } return cc }

    function ah(cf) { var g, cc, ce, cd = [];
        g = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"]; if (cf == 16777215) { return bm.lang.GameNone } cd[1] = (cf >>> 16) & 15;
        cd[2] = (cf >>> 12) & 15;
        cd[3] = (cf >>> 8) & 15;
        cd[4] = (cf >>> 4) & 15;
        cd[5] = cf & 15;
        ce = ""; for (cc = 1; cc <= 5; cc++) { ce = ce + g[cd[cc]] } return ce }

    function aP(cc) { if (bm.profileURL == "" || cc == "") { return } var g = bm.profileURL; if (g.indexOf("?") < 0) { g = g + "?" } else { g = g + "&" } g = g + "Player=" + encodeURIComponent(cc);
        window.open(g, "_blank") }

    function e(cd, ce, cn) { var cc, ch, cl, ck, cf, cj, ci, cm, co, cg;
        cc = cd / 255;
        ch = ce / 255;
        cl = cn / 255;
        ck = 0.2126 * cc + 0.7152 * ch + 0.0722 * cl;
        cf = cc;
        cj = cc; if (ch < cf) { cf = ch } if (cl < cf) { cf = cl } if (ch > cj) { cj = ch } if (cl > cj) { cj = cl } if (cj == cf) { ci = 0 } else { if (cj == cc) { ci = (60 * (ch - cl) / (cj - cf) + 360) % 360 } else { if (cj == ch) { ci = 60 * (cl - cc) / (cj - cf) + 120 } else { ci = 60 * (cc - ch) / (cj - cf) + 240 } } } co = (cj + cf) / 2; if (cj == cf) { cm = 0 } else { if (co <= 0.5) { cm = (cj - cf) / (cj + cf) } else { cm = (cj - cf) / (2 - (cj + cf)) } } cg = {};
        cg.hu = Math.round(ci * 100 / 360);
        cg.sa = Math.round(cm * 100);
        cg.li = Math.round(co * 100);
        cg.y = Math.round(ck * 100); return cg }

    function bU(cd) { var cc, g;
        cd.ID = bm.sessionID;
        bm.PNum = bm.PNum + 1;
        cd.PNum = bm.PNum;
        cc = JSON.stringify(cd);
        g = bw(cc);
        bm.ws.send(cc);
        ar(g) }

    function a() { var g, cc;
        g = "ws"; if (bm.params.useSSL == "Yes") { g = g + "s" } cc = window.location.hostname; if (cc.indexOf(":") >= 0 && cc.indexOf("[") < 0) { cc = "[" + cc + "]" } g = g + "://" + cc + ":" + bm.params.packetPort;
        n("MSG Connecting to " + g + " ...");
        bm.ws = new WebSocket(g);
        bm.ws.onopen = function() { var cd;
            n("MSG Connected");
            bm.firstError = false; if (bm.sessionID == "") { bm.PNum = 0;
                cd = { Response: "Session", PC: H(), Version: bm.clientVersion, Language: bm.local.language, SitePassword: bm.params.sitePassword };
                bU(cd) } else { bm.lobby.retryMessage.close();
                cd = { Response: "Reconnect" };
                cd.ReconKey = bm.reconKey; if (bm.loginData.player != null) { cd.Player = bm.loginData.player;
                    cd.PWHash = m(bm.eSeed + bm.sessionID) } bm.connected = true;
                bU(cd) } };
        bm.ws.onmessage = function(cd) { aN(cd.data) };
        bm.ws.onerror = function() { n("MSG WebSocket Connection Error");
            n("MSG Check Browser Error Console"); if (bm.firstError) { $("#Connecting").text(params.connectError);
                bm.firstError = false;
                bb() } };
        bm.ws.onclose = function(cd) { n("MSG Connection Closed with Event Code " + cd.code);
            bm.connected = false; if (bm.quit) { return } if (bm.lobby.retryMessage.isVisible()) { n("MSG Retrying connection...");
                setTimeout(a, 10000) } else { bI("beep");
                bm.lobby.retryMessage.showMessage(bm.lang.ConnectRetry, true, bm.mobile);
                setTimeout(a, 1000) } } }

    function aN(cd) { var ce, cc; if (bm.quit == true) { return } try { ce = JSON.parse(cd);
            cc = bw(cd);
            aU(cc) } catch (g) { n("ERR " + g + " : " + cd) } try { switch (ce.Command) {
                case "ActionChips":
                    bF(ca, ce); break;
                case "BadPassword":
                    Y(ce); break;
                case "Balance":
                    aI(ce); break;
                case "Bet":
                    bF(bE, ce); break;
                case "BetCollection":
                    bF(b7, ce); break;
                case "Buttons":
                    bF(b8, ce); break;
                case "Cards":
                    bF(be, ce); break;
                case "Chat":
                    bF(P, ce); break;
                case "Clear":
                    bF(b0, ce); break;
                case "Deal":
                    bF(b9, ce); break;
                case "Dealer":
                    bF(S, ce); break;
                case "ECards":
                    bF(x, ce); break;
                case "EndBreak":
                    bF(q, ce); break;
                case "FAQ":
                    bx(ce); break;
                case "Flop":
                    bF(bj, ce); break;
                case "FoldCards":
                    bF(bl, ce); break;
                case "HandHelper":
                    bF(bD, ce); break;
                case "History":
                    bF(bo, ce); break;
                case "HotSeat":
                    bF(an, ce); break;
                case "Invite":
                    bF(bT, ce); break;
                case "Language":
                    br(ce); break;
                case "LobbyChat":
                    b5(ce); break;
                case "Login":
                    av(ce); break;
                case "LoginSalt":
                    bX(ce); break;
                case "Logins":
                    a2(ce); break;
                case "Logout":
                    f(true); break;
                case "LogoutRequest":
                    X(ce); break;
                case "Message":
                    aC(ce); break;
                case "NextMove":
                    bF(M, ce); break;
                case "News":
                    at(ce); break;
                case "ObserverStats":
                    bF(bd, ce); break;
                case "OpenTable":
                    aF(ce); break;
                case "Ping":
                    aO(ce); break;
                case "PlayerInfo":
                    i(ce); break;
                case "PlayerNotes":
                    a0(ce); break;
                case "PlayerStats":
                    bF(bk, ce); break;
                case "PotAward":
                    bF(aE, ce); break;
                case "PotRake":
                    bF(Q, ce); break;
                case "RefreshTables":
                    b4(); break;
                case "RegisterRequest":
                    ag(ce); break;
                case "Reserve":
                    bF(az, ce); break;
                case "RingGameLobby":
                    I(ce); break;
                case "River":
                    bF(s, ce); break;
                case "Session":
                    a7(ce); break;
                case "SitOut":
                    bF(aX, ce); break;
                case "Straddle":
                    bF(a5, ce); break;
                case "StraddleLive":
                    bF(Z, ce); break;
                case "Street":
                    bF(A, ce);
                case "SuspendChat":
                    bF(aS, ce); break;
                case "Table":
                    bF(ay, ce); break;
                case "TableBanners":
                    bF(aV, ce); break;
                case "TableCapBanner":
                    bF(l, ce); break;
                case "TableGame":
                    bF(t, ce); break;
                case "TableImage":
                    ae(ce); break;
                case "TableInfo":
                    aB(ce); break;
                case "TableMessage":
                    bF(k, ce); break;
                case "TableHeader":
                    bF(d, ce); break;
                case "TablesSitting":
                    ao(ce); break;
                case "TablesWaiting":
                    U(ce); break;
                case "TimeLeft":
                    bF(aJ, ce); break;
                case "Total":
                    bF(G, ce); break;
                case "TournamentLobby":
                    bt(ce); break;
                case "Transfer":
                    bc(ce); break;
                case "Turn":
                    bF(bY, ce); break;
                case "ValidateAccount":
                    bm.lobby.accountInfoValidate(); break;
                case "Waiting":
                    a3(ce); break;
                default:
                    n("ERR Unknown command: " + ce.Command + " data: " + cd) } } catch (g) { n("ERR Command: " + ce.Command + "  Error: " + g) } }

    function V() { switch (bm.local.fontSize) {
            case "small":
                F("#client_div", "fontSize", bm.params.fontSmall);
                F(".memo", "lineHeight", "14px"); break;
            case "normal":
                F("#client_div", "fontSize", bm.params.fontNormal);
                F(".memo", "lineHeight", "32px"); break;
            case "large":
                F("#client_div", "fontSize", bm.params.fontLarge);
                F(".memo", "lineHeight", "18px"); break } }

    function aA() { bs(); if (bm.mobile && bm.lobby) { bm.lobby.guiScale();
            bm.lobby.resize(); for (var g = 0; g < bm.tables.length; g++) { bm.tables[g].resizeTable();
                bm.tables[g].resizeFinish() } window.scrollTo(0, 0) } }

    function au() { W();
        bG();
        bV();
        aY();
        ai();
        ba();
        aL(); if (!bm.storage) { n("ERR localStorage not supported") } $(window).on("resize", function() { setTimeout(aA, 250) });
        bs();
        $("#Connecting").text(params.connectMsg).css("color", bv(params.connectBC)).show();
        a() }

    function aY() { if (typeof window.localStorage === "object") { bm.storage = true; try { localStorage.setItem("localStorageTest", 1);
                localStorage.removeItem("localStorageTest") } catch (g) { bm.storage = false } } else { bm.storage = false } }

    function R(g) { return bm.storage ? localStorage.getItem(g) : null }

    function y(g, cc) { if (bm.storage) { localStorage.setItem(g, cc) } }

    function bN(cc) { var cd, g, ce; if (bm.local.decimalMark == ",") { cc = cc.split(",").join(".") } cc = cc.toUpperCase();
        cd = 1;
        g = cc.length - 1; if (cc.charAt(g) == "K") { cd = 1000;
            cc = cc.slice(0, g) } else { if (cc.charAt(g) == "M") { cd = 1000000;
                cc = cc.slice(0, g) } else { if (cc.charAt(g) == "B") { cd = 1000000000;
                    cc = cc.slice(0, g) } } } ce = Number(cc); if (isNaN(ce) == true) { return 0 } else { return ce * cd } }

    function a9(cf, g, cd) { var cc, ce; if (bq()) { bm.lobby.messageShow(bm.lang.MessageNoSave); return } cc = window.open("", "", "scrollbars=yes, resizable=yes, width=640, height=480");
        ce = cc.document;
        ce.open();
        ce.writeln("<!DOCTYPE html>");
        ce.writeln("<html>");
        ce.writeln("<head>");
        ce.writeln("<title>" + cf + "</title>");
        ce.writeln("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
        ce.writeln("</head>");
        ce.writeln("<body>"); if (cd) { ce.writeln("<pre>") } ce.writeln(g); if (cd) { ce.writeln("</pre>") } ce.writeln("</body>");
        ce.writeln("</html>");
        ce.close();
        cc.focus() }

    function ax() { bm.lobby.accountLogin.show(!bm.loggedIn);
        bm.lobby.accountLogout.show(bm.loggedIn);
        bm.lobby.accountCreate.enable(bm.connected && !bm.loggedIn);
        bm.lobby.accountChange.enable(bm.loggedIn);
        bm.lobby.accountBalance.enable(bm.loggedIn);
        bm.lobby.accountTickets.enable(bm.loggedIn);
        bm.lobby.accountPermissions.enable(bm.loggedIn);
        bm.lobby.accountTransfer1.enable(bm.loggedIn);
        bm.lobby.accountTransfer2.enable(bm.loggedIn);
        bm.lobby.accountChipRequest1.enable(bm.loggedIn);
        bm.lobby.accountChipRequest2.enable(bm.loggedIn);
        bm.lobby.optionsSearch.enable(bm.loggedIn);
        bm.lobby.optionsNotes.enable(bm.loggedIn);
        bm.lobby.helpContact.enable(bm.connected);
        bm.lobby.helpNews.enable(bm.loggedIn || bm.lurking);
        bm.lobby.helpFAQ.enable(bm.loggedIn || bm.lurking);
        bm.lobby.balanceBtn.enable(bm.loggedIn);
        bm.lobby.searchBtn.enable(bm.loggedIn);
        bm.lobby.notesBtn.enable(bm.loggedIn);
        bm.lobby.logInOutBtn.enable(bm.connected);
        bm.lobby.balanceBtn.setCaption(bm.lang.LobbyButtonBalance);
        bm.lobby.searchBtn.setCaption(bm.lang.LobbyButtonSearch);
        bm.lobby.notesBtn.setCaption(bm.lang.LobbyButtonNotes); if (bm.connected == false) { bm.lobby.setCaption(bm.lang.LobbyCaptionTitle);
            bm.lobby.lobbyTabs.setCaption(0, bm.lang.LobbyCaptionLogins);
            bm.data.Ring.rows.length = 0;
            bm.lobby.ringGrid.update();
            bm.lobby.$ringSelected.text(bm.lang.LobbyCaptionNoRingGame);
            bm.data.RingPlayer.rows.length = 0;
            bm.lobby.ringPlayerGrid.update();
            bm.data.RingWait.rows.length = 0;
            bm.lobby.ringWaitGrid.update();
            bm.lobby.ringInfoBtn.show(false);
            bm.lobby.ringObserveBtn.show(false);
            bm.lobby.ringWaitBtn.show(false);
            bm.lobby.ringWaitBtn.setCaption(bm.lang.LobbyButtonRingWait);
            bm.lobby.lobbyTabs.setCaption(1, bm.lang.LobbyCaptionRingGames);
            bm.data.Tourney.rows.length = 0;
            bm.lobby.tourneyGrid.update();
            bm.lobby.$tourneySelected.text(bm.lang.LobbyCaptionNoTournament);
            bm.data.TourneyPlayer.rows.length = 0;
            bm.lobby.tourneyPlayerGrid.update();
            bm.data.TourneyWait.rows.length = 0;
            bm.lobby.tourneyWaitGrid.update();
            $("#TourneyStartLabel", bm.lobby.$dialog).text("");
            bm.lobby.tourneyInfoBtn.show(false);
            bm.lobby.tourneyObserveBtn.show(false);
            bm.lobby.tourneyRegisterBtn.show(false);
            bm.lobby.tourneyRegisterBtn.setCaption(bm.lang.LobbyButtonTrnyRegister);
            bm.lobby.tourneyStartNow.show(false);
            bm.lobby.tourneyStartNow.setCheck(false);
            bm.lobby.lobbyTabs.setCaption(2, bm.lang.LobbyCaptionTournaments);
            bm.lobby.optionsStart.enable(false);
            bm.data.SitnGo.rows.length = 0;
            bm.lobby.sitnGoGrid.update();
            bm.lobby.$sitnGoSelected.text(bm.lang.LobbyCaptionNoSitnGo);
            bm.data.SitnGoPlayer.rows.length = 0;
            bm.lobby.sitnGoPlayerGrid.update();
            bm.data.SitnGoWait.rows.length = 0;
            bm.lobby.sitnGoWaitGrid.update();
            $("#SitnGoStartLabel", bm.lobby.$dialog).text("");
            bm.lobby.sitnGoInfoBtn.show(false);
            bm.lobby.sitnGoObserveBtn.show(false);
            bm.lobby.sitnGoRegisterBtn.show(false);
            bm.lobby.sitnGoRegisterBtn.setCaption(bm.lang.LobbyButtonTrnyRegister);
            bm.lobby.sitnGoStartNow.show(false);
            bm.lobby.sitnGoStartNow.setCheck(false);
            bm.lobby.lobbyTabs.setCaption(3, bm.lang.LobbyCaptionSitnGos) } if (bm.loggedIn == true) { bm.lobby.logInOutBtn.setCaption(bm.lang.LobbyButtonLogout) } else { bm.lobby.logInOutBtn.setCaption(bm.lang.LobbyButtonLogin) } }

    function b2(cl, cm, cj, g) { var ci, cg, cn, ck, ce, cd, cc, cf, ch, co; if (cl == "No") { return "No" } ci = cl.substr(0, 4);
        cg = cl.substr(5, 2) - 1;
        ck = cl.substr(8, 2);
        ce = cl.substr(11, 2);
        cd = cl.substr(14, 2);
        cc = "00"; if (cm == true) { cc = cl.substr(17, 2) } cf = "";
        ch = new Date(Date.UTC(ci, cg, ck, ce, cd, cc));
        ci = ch.getFullYear();
        cg = ch.getMonth() + 1; if (cg < 10) { cg = "0" + cg } cn = bm.lang["LobbyCaptionMonth" + cg];
        ck = ch.getDate(); if (ck < 10) { ck = "0" + ck } ce = ch.getHours(); if (cj == true) { if (ce < 12) { cf = bm.lang.LobbyCaptionAMTime } else { cf = bm.lang.LobbyCaptionPMTime } if (ce == 0) { ce = 12 } else { if (ce > 12) { ce = ce - 12 } } } if (ce < 10) { ce = "0" + ce } cd = ch.getMinutes(); if (cd < 10) { cd = "0" + cd } cc = ch.getSeconds(); if (cc < 10) { cc = "0" + cc } if (g == true) { co = ci + "-" + cg + "-" } else { co = cn + " " } co = co + ck + " " + ce + ":" + cd; if (cm == true) { co = co + ":" + cc } if (cj == true) { return cf.split("%1%").join(co) } else { return co } }

    function af(cd, g) { var cc, cf, ce;
        cc = this;
        cc.enabled = g;
        cc.loaded = false;
        cc.sound = cd;
        cc.buffer = [];
        cf = "Sound?Name=" + cd + (bm.mp3 ? ".mp3" : ".ogg") + "&Crc=" + bm.crc.audio; if (bm.waContext) { ce = new XMLHttpRequest();
            ce.open("GET", cf, true);
            ce.responseType = "arraybuffer";
            ce.onload = function() { bm.waContext.decodeAudioData(ce.response, function(cg) { cc.buffer = cg;
                    cc.loaded = true }, function() { n("ERR Error loading " + cf) }) };
            ce.send() } else { cc.player = new Audio(cf);
            cc.player.addEventListener("loadedmetadata", function() { cc.loaded = true }, false) } } af.prototype.play = function(cf) { var cd = this,
            ce, g; if (!cd.loaded) { return } if (cf || !cd.enabled) { g = 0 } else { g = bm.local.soundVolume } try { if (bm.waContext) { ce = bm.waContext.createBufferSource();
                ce.buffer = cd.buffer;
                ce.connect(bm.waGain);
                bm.waGain.connect(bm.waContext.destination);
                bm.waGain.gain.value = g; if (typeof ce.start !== "undefined") { ce.start(0) } else { ce.noteOn(0) } } else { cd.player.pause();
                cd.player.currentTime = 0;
                cd.player.volume = g;
                cd.player.play() } } catch (cc) { n("ERR Audio error for " + cd.sound + ": " + cc) } };

    function C(cf, g, cg, ce) { var cc, cd;
        cc = this;
        cc.$container = cf;
        cc.caption = g;
        cc.enabled = true;
        cc.$button = $("<button>").attr("type", "button").html(g);
        cc.$container.html(cc.$button);
        cc.$button.css({ width: "100%", height: "100%", color: bm.color.ButtonText, "background-color": bm.color.Button, border: "1px outset " + bm.color.Button, "border-radius": bm.params.buttonRadius, margin: "0px", padding: "0px 0px 2px 0px", overflow: "hidden" }); if (bm.params.gradients) { cc.$button.css("background-image", "url('Image?Name=Grad" + cg + "')") } cc.$button.on("touchstart mousedown", function(ch) { if (bP(ch) || aQ(ch) || !cc.enabled || bm.doc.button) { return } cc.down();
            ch.preventDefault() });
        cc.$button.on("touchend mouseup", function(ch) { if (!cc.enabled || !bm.doc.button || aQ(ch)) { return } cd = (cc == bm.doc.button);
            bm.doc.button.up(); if (cd && ce) { ce() } ch.preventDefault() }) } C.prototype.down = function() { var g = this;
        g.$button.css({ border: "1px inset " + bm.color.ButtonBorder, padding: "2px 0px 3px 2px" });
        bm.doc.button = g };
    C.prototype.enable = function(g) { var cc = this; if (g) { cc.$button.css("color", bm.color.ButtonText);
            cc.enabled = true } else { cc.$button.css("color", bm.color.ButtonDisabled);
            cc.enabled = false } };
    C.prototype.fontSize = function(g) { this.$container.css("font-size", g); return this };
    C.prototype.getCaption = function() { return this.caption };
    C.prototype.isVisible = function() { return this.$container.is(":visible") };
    C.prototype.lineHeight = function(g) { this.$container.css("line-height", g); return this };
    C.prototype.move = function(g, cc) { this.$container.css({ left: g, top: cc }); return this };
    C.prototype.setCaption = function(g) { this.caption = g;
        this.$button.html(g) };
    C.prototype.show = function(g) { this.$container.toggle(g) };
    C.prototype.resize = function(g, cc, cd) { this.$container.css({ width: g, height: cc }); if (bm.params.gradients) { this.$button.css("background-image", "url('Image?Name=Grad" + cd + "')") } return this };
    C.prototype.up = function() { var g = this;
        g.$button.css({ border: "1px outset " + bm.color.Button, padding: "0px 0px 3px 0px" });
        bm.doc.button = null };

    function bZ(ce, cd, g, cf) { var cc;
        cc = this;
        cc.hclip = cd;
        cc.$container = $("<div>").addClass("card").appendTo(ce.$content).css({ left: g, top: cf });
        cc.$shade = $("<div>").addClass("cardshade").appendTo(cc.$container);
        cc.shaded = false;
        cc.setDeck();
        cc.cardNum = 0 } bZ.prototype.clip = function(g) { var cc = this;
        cc.$container.css("height", g ? cc.hclip : 64);
        cc.$shade.css("border-radius", g ? "6px 6px 0px 0px" : "6px 6px 6px 6px"); return cc };
    bZ.prototype.isShaded = function() { var g = this; return g.shaded };
    bZ.prototype.isVisible = function() { var g = this; return g.$container.is(":visible") };
    bZ.prototype.moveTo = function(cd, g, ce) { var cc = this;
        cc.$container.xytrans(cd).css({ left: g, top: ce }); return cc };
    bZ.prototype.redraw = function() { var g = this;
        g.$container.redraw(); return g };
    bZ.prototype.setCard = function(cc) { var g = this;
        g.cardNum = cc; if (cc < 1 || cc > 53) { g.$container.css("background-position", (52 * -46) + "px 0px").hide() } else { g.$container.css("background-position", ((cc - 1) * -46) + "px 0px") } return g };
    bZ.prototype.setDeck = function() { var g = this;
        g.$container.css("background-image", "url('" + bm.deck + "')"); return g };
    bZ.prototype.shade = function(cc) { var g = this;
        g.$shade.toggle(cc);
        g.shaded = cc; return g };
    bZ.prototype.show = function(cc) { var g = this;
        g.$container.toggle(cc); return g };

    function b(ce, cd, cc) { var g = this;
        g.caption = cd;
        g.$container = ce.css("white-space", "nowrap");
        g.$box = $("<div>").addClass("checkbox").css("background-color", bm.color.Window).appendTo(ce);
        g.$label = $("<div>").html(cd).addClass("checkbox_label").appendTo(ce);
        g.enabled = true;
        g.$box.add(g.$label).on("touchstart mousedown", function(cf) { if (bP(cf) || aQ(cf)) { return } if (g.enabled) { g.$box.toggleClass("checkbox_check"); if (cc) { cc(g.$box.hasClass("checkbox_check")) } } cf.preventDefault() }) } b.prototype.enable = function(g) { this.enabled = g;
        this.$container.css("opacity", g ? 1 : 0.5) };
    b.prototype.isChecked = function() { return this.$box.hasClass("checkbox_check") };
    b.prototype.isEnabled = function() { return this.enabled };
    b.prototype.isVisible = function() { return this.$container.is(":visible") };
    b.prototype.getCaption = function() { return this.caption };
    b.prototype.setCaption = function(g) { this.caption = g;
        this.$label.html(g); return this };
    b.prototype.setCheck = function(g) { this.$box.toggleClass("checkbox_check", g); return this };
    b.prototype.show = function(g) { this.$container.toggle(g); return this };

    function b3(cl, cf, cj, g, cd) { var cc, cg, ce, ch, ck, ci;
        cc = this;
        cc.$grid = cl.css({ "background-color": bm.color.List, "border-color": bm.color.ButtonBorder });
        cc.$gridheader = $("<div>").addClass("grid_header").css({ color: bm.color.ButtonText, "background-color": bm.color.Button, "border-color": bm.color.ButtonBorder }).appendTo(cl);
        cc.$griddata = $("<div>").addClass("grid_data").appendTo(cl);
        cc.$scrollbox = $("<div>").addClass("grid_scroll").appendTo(cl);
        cc.scrollbar = new O(cc, cc.$scrollbox);
        cc.scrollbar.$bar.css("width", "100%");
        cc.data = cf;
        cc.onClick = cj;
        cc.onDblClick = g;
        cc.onSort = cd;
        cc.cols = cc.data.cols;
        cc.pw = cc.data.widths;
        cc.cw = [];
        cc.ch = cc.data.headers;
        cc.toprow = 0;
        cc.selrow = -1;
        cc.sellast = -1;
        cc.vrows = Math.floor((cc.$grid.innerHeight() - cc.$gridheader.outerHeight()) / cc.data.rowHeight);
        cc.$gridcol = [];
        cc.sortA = "<span style='font-size: 0.75em'>" + bm.arrowU + "</span>";
        cc.sortD = "<span style='font-size: 0.75em'>" + bm.arrowD + "</span>";
        ci = cc.scrollbar.$container.width();
        ck = cc.$grid.width() - ci - cc.cols - 5; for (cg = 0; cg < cc.cols; cg++) { cc.cw[cg] = cc.pw[cg] * ck;
            ch = $("<div>").width(cc.cw[cg]).html(cc.ch[cg]).css("border-right-color", bm.color.ButtonBorder); if (cg == cc.data.sortCol && cc.data.sortable) { ch.append(cc.data.sortAscend ? " " + cc.sortA : " " + cc.sortD) } cc.$gridheader.append(ch);
            cc.$gridcol[cg] = $("<div>").width(cc.cw[cg]).css("border-right-color", bm.color.ButtonBorder); for (ce = 0; ce < cc.vrows; ce++) { cc.$gridcol[cg].append(cc.createCell()) } cc.$griddata.append(cc.$gridcol[cg]) } cc.xdown = 0;
        cc.ydown = 0;
        cc.scale = 1;
        cc.startrow = 0;
        cc.col = -1;
        cc.resizecol = false;
        cc.touchscroll = false;
        cc.mouseEvents(); if (cc.data.sortable) { cc.sort() } else { cc.update() } } b3.prototype.createCell = function() { var ce, cg, ch, cc, cf, cd, g;
        ce = this;
        cg = false;
        ch = $("<div>").css({ height: ce.data.rowHeight, lineHeight: ce.data.rowHeight + "px" });
        ch.on("touchstart mousedown", function(ci) { if (bP(ci) || aQ(ci)) { return } cc = $(this).index();
            cf = ce.data.rows.length; if (cc + ce.toprow >= cf) { return } cd = ce.selrow - ce.toprow; if (cd >= 0 && cd < ce.vrows) { for (g = 0; g < ce.cols; g++) { ce.$gridcol[g].children().eq(cd).css({ color: bm.color.ListText, "background-color": bm.color.List }) } } for (g = 0; g < ce.cols; g++) { ce.$gridcol[g].children().eq(cc).css({ color: bm.color.List, "background-color": bm.color.ListText }) } ce.selrow = cc + ce.toprow; if ((ce.selrow == ce.sellast) && ce.onDblClick) { ce.sellast = -1;
                cg = true; return } ce.sellast = ce.selrow;
            setTimeout(function() { ce.sellast = -1 }, 500); if (ce.onClick) { ce.onClick(ce.selrow) } });
        ch.on("touchend mouseup", function(ci) { if (aQ(ci)) { return } if (cg) { ce.onDblClick(ce.selrow) } cg = false }); return ch };
    b3.prototype.getRow = function(ce, cf) { var cc, g, cd;
        cc = this;
        cd = -1; for (g = 0; g < cc.data.rows.length; g++) { if (cc.data.rows[g][cf] == ce) { cd = g; break } } return cd };
    b3.prototype.getValue = function(cc) { var g = this; if (g.selrow < 0 || g.selrow >= g.data.rows.length) { return "" } else { return aj(g.data.rows[g.selrow][cc]) } };
    b3.prototype.guiChange = function(cd) { var cc, cf, ce, ch, cg, cj, ci, g, cl, ck;
        cc = this;
        cf = cd ? "1.4em" : "0.9em";
        ce = cd ? "1.5em" : "0.75em";
        ch = cd ? "40px" : "25px";
        cg = cd ? "41px" : "26px";
        cj = cd ? "39px" : "24px";
        ci = cd ? "32px" : "32px";
        cc.$grid.css("font-size", cf);
        cc.$griddata.css("top", ch);
        cc.$gridheader.css({ height: cj, lineHeight: cj });
        cc.$scrollbox.css({ top: cg, width: ci });
        cc.scrollbar.$up.css({ height: ci, lineHeight: ci, fontSize: ce });
        cc.scrollbar.$down.css({ height: ci, lineHeight: ci, fontSize: ce }); if (bm.params.gradients) { g = cd ? "40" : "25";
            cl = cd ? "32H" : "32H";
            cc.$gridheader.css("backgroundImage", "url('Image?Name=Grad" + g + "')");
            cc.scrollbar.$up.css("background-image", "url('Image?Name=Grad" + cl + "')");
            cc.scrollbar.$down.css("background-image", "url('Image?Name=Grad" + cl + "')");
            cc.scrollbar.$thumb.css("background-image", "url('Image?Name=Grad" + cl + "')") } ck = cd ? 32 : 32;
        cc.setRowHeight(ck) };
    b3.prototype.headerCaption = function(cf, g) { var cd, cc, ce;
        cd = this;
        cc = cf;
        ce = g; if (cc == cd.data.sortCol) { ce = ce + (cd.data.sortAscend ? " " + cd.sortA : " " + cd.sortD) } $("div", cd.$gridheader).eq(cc).html(ce) };
    b3.prototype.mouseEvents = function() { var g = this;
        g.$griddata.on("wheel", function(cc) { if (cc.originalEvent.deltaY < 0) { g.onUp() } else { if (cc.originalEvent.deltaY > 0) { g.onDown() } } cc.preventDefault() });
        g.$griddata.on("touchstart mousedown", function(cd) { if (bP(cd) || aQ(cd)) { return } var cc = (cd.type == "touchstart") ? cd.originalEvent.touches[0] : cd;
            g.ydown = cc.pageY / g.scale;
            g.startrow = g.toprow;
            g.touchscroll = true;
            bm.doc.grid = g;
            cd.preventDefault() });
        $("div", g.$gridheader).on("touchstart mousedown", function(ce) { if (bP(ce) || aQ(ce)) { return } var cd, cc; if (g.col >= 0) { cd = (ce.type == "touchstart") ? ce.originalEvent.touches[0] : ce;
                g.xdown = cd.pageX / g.scale;
                g.resizecol = true;
                bm.doc.grid = g } else { if (g.data.sortable) { cc = $(this).index(); if (cc == g.data.sortCol) { g.data.sortAscend = !g.data.sortAscend } else { g.data.sortCol = cc;
                        g.data.sortAscend = true } g.sort(); if (g.onSort) { g.onSort() } } } ce.preventDefault() });
        $("div", g.$gridheader).on("touchmove mousemove", function(cf) { var ce, cd, cc, cg; if (g.resizecol || aQ(cf)) { return } ce = (cf.type == "touchmove") ? cf.originalEvent.touches[0] : cf;
            cd = $(this).index();
            cc = (ce.pageX - $(this).offset().left) / g.scale; if (cc < 2 && cd > 0) { g.col = cd - 1;
                cg = "e-resize" } else { if (cc > g.cw[cd] - 3 && cd < 4) { g.col = cd;
                    cg = "w-resize" } else { g.col = -1;
                    cg = "default" } } $(this).css("cursor", cg) }) };
    b3.prototype.offGrid = function() { var g = this;
        g.resizecol = false;
        g.col = -1;
        g.touchscroll = false;
        bm.doc.grid = null };
    b3.prototype.onGrid = function(ch) { var cf, cg, cc, g, ce, cd;
        cf = this;
        cg = (ch.type == "touchmove") ? ch.originalEvent.touches[0] : ch;
        ce = cg.pageX / cf.scale;
        cd = cg.pageY / cf.scale; if (cf.resizecol) { cc = ce - cf.xdown; if (cf.cw[cf.col] + cc > 5 && cf.cw[cf.col + 1] - cc > 5) { cf.cw[cf.col] += cc;
                cf.cw[cf.col + 1] -= cc;
                $("div", cf.$gridheader).eq(cf.col).width(cf.cw[cf.col]);
                cf.$gridcol[cf.col].width(cf.cw[cf.col]);
                $("div", cf.$gridheader).eq(cf.col + 1).width(cf.cw[cf.col + 1]);
                cf.$gridcol[cf.col + 1].width(cf.cw[cf.col + 1]);
                cf.xdown = ce } } else { if (cf.touchscroll) { g = cd - cf.ydown;
                cf.toprow = cf.startrow - Math.round(g / cf.data.rowHeight);
                cf.update() } } };
    b3.prototype.onDown = function() { var g = this;
        g.toprow++;
        g.update() };
    b3.prototype.onPageDown = function() { var g = this;
        g.toprow += g.vrows;
        g.update() };
    b3.prototype.onPageUp = function() { var g = this;
        g.toprow -= g.vrows;
        g.update() };
    b3.prototype.onThumb = function(ce) { var g, cd, cc;
        g = this;
        cd = g.vrows;
        cc = g.data.rows.length;
        g.toprow = Math.round(ce * (cc - cd));
        g.update() };
    b3.prototype.onUp = function() { var g = this;
        g.toprow--;
        g.update() };
    b3.prototype.resize = function() { var cf, cc, g, cg, ce, cd, ch;
        cf = this;
        g = cf.scrollbar.$container.width();
        cc = cf.$grid.width() - g - cf.cols - 5; for (ce = 0; ce < cf.cols; ce++) { cf.cw[ce] = cf.pw[ce] * cc;
            cf.$gridheader.children().eq(ce).width(cf.cw[ce]);
            cf.$gridcol[ce].width(cf.cw[ce]) } cg = cf.vrows;
        cf.vrows = Math.floor((cf.$grid.innerHeight() - cf.$gridheader.outerHeight()) / cf.data.rowHeight);
        ch = cf.vrows - cg; if (ch > 0) { for (ce = 0; ce < cf.cols; ce++) { for (cd = 0; cd < ch; cd++) { cf.$gridcol[ce].append(cf.createCell()) } } } else { if (ch < 0) { ch = -ch; for (ce = 0; ce < cf.cols; ce++) { for (cd = 0; cd < ch; cd++) { cf.$gridcol[ce].children().last().remove() } } } } cf.update() };
    b3.prototype.scrollIntoView = function() { var g;
        g = this; if (g.selrow < 0) { return } if (g.selrow < g.toprow) { g.toprow = g.selrow } else { if (g.selrow >= g.toprow + g.vrows) { g.toprow = g.selrow - g.vrows + 10 } } g.update() };
    b3.prototype.setScale = function(g) { this.scale = g;
        this.scrollbar.setScale(g) };
    b3.prototype.setRowHeight = function(cd) { var cc, g;
        cc = this;
        cc.data.rowHeight = cd; for (g = 0; g < cc.cols; g++) { $("div", cc.$gridcol[g]).css({ height: cd, lineHeight: 50 + "px" }) } cc.resize() };
    b3.prototype.sort = function() { var cg, ci, ce, cd, cf, ch, cc, g;
        cg = this; if (cg.data.sortable == false) { return } ci = cg.data.fieldsSort[cg.data.sortCol];
        ce = cg.data.fieldsNum[cg.data.sortCol];
        cd = cg.data.sortAscend; if (cg.selrow >= cg.data.rows.length) { cg.selrow = -1 } if (cg.selrow >= 0) { cg.data.rows[cg.selrow].temp_sel = true } cg.data.rows.sort(function(ck, cj) { if (ce) { cc = bu(ck[ci]);
                g = bu(cj[ci]); if (cd) { return (cc - g) } else { return (g - cc) } } else { cc = ck[ci].toLowerCase();
                g = cj[ci].toLowerCase(); if (cc == g) { return 0 } else { if (cc < g) { return cd ? -1 : 1 } else { return cd ? 1 : -1 } } } }); if (cg.selrow >= 0) { for (cf = 0; cf < cg.data.rows.length; cf++) { if (cg.data.rows[cf].temp_sel) { delete cg.data.rows[cf].temp_sel;
                    cg.selrow = cf; break } } } for (cf = 0; cf < cg.data.cols; cf++) { ch = cg.ch[cf]; if (cf == cg.data.sortCol) { ch = ch + (cg.data.sortAscend ? " " + cg.sortA : " " + cg.sortD) } $("div", cg.$gridheader).eq(cf).html(ch) } cg.update() };
    b3.prototype.update = function() { var g, cm, cc, ci, cg, ck, ce, cd, cn, cj, ch, cf, cl;
        g = this;
        cc = g.vrows;
        ci = g.data.rows.length;
        cg = ci - cc; if (g.toprow > cg) { g.toprow = cg } if (g.toprow < 0) { g.toprow = 0 } if (ci == 0) { g.selrow = -1 } for (ce = 0; ce < cc; ce++) { if (ce + g.toprow < ci) { ch = g.data.rows[ce + g.toprow].bold } else { ch = false } for (cd = 0; cd < g.cols; cd++) { cm = g.$gridcol[cd].children().eq(ce);
                ck = g.data.fieldsShow[cd];
                cf = g.data.fieldsHTML[cd]; if (ce + g.toprow < ci) { cl = g.data.rows[ce + g.toprow][ck] } else { cl = "" } if (cf) { cm.html(cl) } else { cm.text(cl) } cm.css("font-weight", ch ? "bold" : "normal"); if (g.selrow == ce + g.toprow) { cm.css({ color: bm.color.List, "background-color": bm.color.ListText }) } else { cm.css({ color: bm.color.ListText, "background-color": bm.color.List }) } } } if (ci == 0) { cn = 0 } else { cn = cc / ci } if (cg <= 0) { cj = 0 } else { cj = g.toprow / cg } g.scrollbar.setThumb(cj, cn) };

    function aT(ce, cc) { var g, cd;
        g = this;
        g.$container = ce; if (!cc) { cc = {} } if (cc.password) { cd = "password" } else { cd = "text" } g.$input = $("<input>").attr("type", cd).addClass("input").css({ color: bm.color.ListText, "background-color": bm.color.List });
        ce.html(g.$input); if (cc.border) { g.$input.css("border", "1px solid " + bm.color.Window) } if (cc.onKeyUp) { g.$input.keyup(function() { cc.onKeyUp() }) } if (cc.onEnterKey) { g.$input.keypress(function(cf) { if (cf.which == 13) { cc.onEnterKey(g.$input.val()) } }) } if (cc.onFocus) { g.$input.focus(cc.onFocus) } } aT.prototype.enable = function(g) { this.$input.prop("disabled", !g) };
    aT.prototype.getText = function() { return this.$input.val() };
    aT.prototype.isVisible = function() { return this.$input.is(":visible") };
    aT.prototype.setText = function(g) { this.$input.val(g) };
    aT.prototype.setFocus = function() { this.$input.focus() };
    aT.prototype.show = function(g) { this.$input.toggle(g) };
    aT.prototype.unFocus = function() { this.$input.blur() };

    function bC(ce, cd) { var g, cc;
        g = this;
        g.fixed = (cd == true);
        g.ydown = 0;
        g.starttop = 0;
        g.$memo = ce;
        ce.css("background-color", bm.color.List);
        g.$memotext = $(g.fixed ? "<pre>" : "<div>").addClass("memo noselect").css("color", bm.color.ListText).appendTo(ce);
        g.scrollbar = new O(g, ce);
        g.scale = 1;
        g.scrolling = false;
        g.$memotext.on("touchstart mousedown", function(cf) { if (bP(cf) || aQ(cf)) { return } cc = (cf.type == "touchstart") ? cf.originalEvent.touches[0] : cf;
            g.ydown = cc.pageY / g.scale;
            g.starttop = g.$memotext.scrollTop();
            g.scrolling = true });
        g.$memotext.on("touchmove mousemove", function(cf) { if (bP(cf) || aQ(cf)) { return } if (g.scrolling) { g.scroll(cf);
                cf.preventDefault() } });
        g.$memotext.on("touchend mouseup", function(cf) { if (bP(cf) || aQ(cf)) { return } g.scrolling = false });
        g.$memotext.on("wheel", function(cf) { if (cf.originalEvent.deltaY < 0) { g.onUp() } else { if (cf.originalEvent.deltaY > 0) { g.onDown() } } cf.preventDefault() }) } bC.prototype.addTextLine = function(cl, ch) { var ci, cj, g, cf, ce, cd, cg, ck, cc;
        ci = this;
        cj = ci.$memotext.scrollTop();
        g = ci.$memotext.prop("scrollHeight");
        cf = ci.$memotext.innerHeight();
        ce = (cj + 1) >= (g - cf);
        ck = ci.$memotext.html() + cl;
        cd = ci.fixed ? "\r\n" : "<br>";
        ck = ck.split(cd);
        cg = 0; if (bu(ch) > 0) { while (ck.length > ch) { ck.shift();
                cg++ } } ck = ck.join(cd);
        ci.$memotext.html(ck + cd);
        g = ci.$memotext.prop("scrollHeight"); if (ce == true) { cj = g - cf } else { cc = parseInt(ci.$memotext.css("line-height"));
            cj = cj - (cc * cg); if (cj < 0) { cj = 0 } } ci.$memotext.scrollTop(cj);
        ci.updateScrollPosition() };
    bC.prototype.bottomScroll = function() { var cd, ce, cc, g;
        cd = this;
        ce = cd.$memotext.prop("scrollHeight");
        cc = cd.$memotext.innerHeight();
        g = ce - cc;
        cd.$memotext.scrollTop(g);
        cd.updateScrollPosition() };
    bC.prototype.getText = function(cc) { var g = this; if (cc) { return g.$memotext.text() } else { return g.$memotext.html() } };
    bC.prototype.guiChange = function(cd) { var cc, cf, ce, g, cg;
        cc = this; if (cd) { if (bm.local.fontSize == "small") { ce = 17 } else { if (bm.local.fontSize == "large") { ce = 22 } else { ce = 19 } } cc.$memotext.css({ "font-size": "1.2em", "line-height": ce + "px" }) } else { if (bm.local.fontSize == "small") { ce = 14 } else { if (bm.local.fontSize == "large") { ce = 18 } else { ce = 16 } } cc.$memotext.css({ "font-size": "1.0em", "line-height": ce + "px" }) } g = cd ? "32px" : "32px";
        cf = cd ? "1.5em" : "0.75em";
        cc.$memotext.css("right", g);
        cc.scrollbar.$bar.css("width", g);
        cc.scrollbar.$up.css({ height: g, lineHeight: g, fontSize: cf });
        cc.scrollbar.$down.css({ height: g, lineHeight: g, fontSize: cf }); if (bm.params.gradients) { cg = cd ? "32H" : "32H";
            cc.scrollbar.$up.css("background-image", "url('Image?Name=Grad" + cg + "')");
            cc.scrollbar.$down.css("background-image", "url('Image?Name=Grad" + cg + "')");
            cc.scrollbar.$thumb.css("background-image", "url('Image?Name=Grad" + cg + "')") } cc.updateScrollPosition() };
    bC.prototype.onDown = function() { var g, cd, cc;
        g = this;
        cd = g.$memotext.scrollTop();
        cc = parseInt(g.$memotext.css("line-height"));
        g.$memotext.scrollTop(cd + cc);
        g.updateScrollPosition() };
    bC.prototype.onPageDown = function() { var g, cc, cd;
        g = this;
        cc = g.$memotext.scrollTop();
        cd = g.$memotext.height();
        g.$memotext.scrollTop(cc + cd);
        g.updateScrollPosition() };
    bC.prototype.onPageUp = function() { var g, cc, cd;
        g = this;
        cc = g.$memotext.scrollTop();
        cd = g.$memotext.height();
        g.$memotext.scrollTop(cc - cd);
        g.updateScrollPosition() };
    bC.prototype.onThumb = function(cg) { var cc, ce, cd, g, cf;
        cc = this;
        ce = cc.$memotext.prop("scrollHeight");
        cd = cc.$memotext.innerHeight();
        g = ce - cd;
        cf = Math.round(cg * g);
        cc.$memotext.scrollTop(cf);
        cc.updateScrollPosition() };
    bC.prototype.onUp = function() { var g, cd, cc;
        g = this;
        cd = g.$memotext.scrollTop();
        cc = parseInt(g.$memotext.css("line-height"));
        g.$memotext.scrollTop(cd - cc);
        g.updateScrollPosition() };
    bC.prototype.setScale = function(g) { this.scale = g;
        this.scrollbar.setScale(g) };
    bC.prototype.scroll = function(ce) { var cc, cd, g;
        cc = this;
        cd = (ce.type == "touchmove") ? ce.originalEvent.touches[0] : ce;
        g = (cd.pageY / cc.scale) - cc.ydown;
        cc.$memotext.scrollTop(cc.starttop - g);
        cc.updateScrollPosition() };
    bC.prototype.setLineHeight = function(cc) { var g = this;
        g.$memotext.css("line-height", cc + "px") };
    bC.prototype.setText = function(cc) { var g = this;
        g.$memotext.html(cc);
        g.updateScrollPosition() };
    bC.prototype.topScroll = function() { var g = this;
        g.$memotext.scrollTop(0);
        g.updateScrollPosition() };
    bC.prototype.updateScrollPosition = function() { var cc, cf, ce, cd, g, cg, ch;
        cc = this;
        cf = cc.$memotext.prop("scrollHeight");
        ce = cc.$memotext.innerHeight();
        cd = ce / cf;
        g = cf - ce;
        cg = cc.$memotext.scrollTop(); if (g <= 0) { ch = 0 } else { ch = cg / g } cc.scrollbar.setThumb(ch, cd) };

    function b1(cd, g, cf, cc) { var ce = this;
        ce.$menu = cd;
        ce.enable(cc);
        ce.$menu.text(g);
        ce.$menu.on("touchstart mousedown", function(cg) { if (bP(cg) || aQ(cg) || !ce.enabled || bm.doc.menuitem) { return } bm.doc.menuitem = ce; return false });
        ce.$menu.on("touchend mouseup", function(cg) { if (!ce.enabled || !bm.doc.menuitem || aQ(cg)) { return } var ch = (ce == bm.doc.menuitem);
            ce.$menu.parent().hide();
            bm.doc.menuitem = null;
            bm.doc.$menu = null; if (ch && cf) { cf() } return false }) } b1.prototype.enable = function(g) { var cc = this;
        cc.enabled = g != false; if (cc.enabled == true) { cc.$menu.css("color", bm.color.ListText).removeClass("disabled") } else { cc.$menu.css("color", bm.color.ListDisabled).addClass("disabled") } };
    b1.prototype.show = function(g) { this.$menu.toggle(g) };

    function aH(ce, cd, cc) { var g = this;
        g.caption = cd;
        g.$container = ce.css("white-space", "nowrap");
        g.$siblings = ce.siblings();
        g.$box = $("<div>").addClass("checkbox").css("background-color", bm.color.Window).appendTo(ce);
        g.$label = $("<div>").html(cd).addClass("checkbox_label").appendTo(ce);
        g.$box.add(g.$label).on("touchstart mousedown", function(cf) { if (bP(cf) || aQ(cf)) { return } $(".checkbox_radio", g.$siblings).removeClass("checkbox_radio");
            g.$box.addClass("checkbox_radio"); if (cc) { cc() } cf.preventDefault() }) } aH.prototype.isChecked = function() { return this.$box.hasClass("checkbox_radio") };
    aH.prototype.getCaption = function() { return this.caption };
    aH.prototype.setCaption = function(g) { this.caption = g;
        this.$label.html(g) };
    aH.prototype.setCheck = function() { var g = this;
        $(".checkbox_radio", g.$siblings).removeClass("checkbox_radio");
        g.$box.addClass("checkbox_radio") };

    function O(g, cc) { var cd = this;
        cd.po = g;
        cd.$container = cc;
        cd.$bar = $("<div>").addClass("scrollbar").css({ "background-color": bm.color.Button, "border-color": bm.color.ButtonBorder }).appendTo(cc);
        cd.$up = $("<div>").addClass("scrollbar_up").html(bm.arrowU).appendTo(cd.$bar);
        cd.$thumb = $("<div>").addClass("scrollbar_thumb").appendTo(cd.$bar);
        cd.$down = $("<div>").addClass("scrollbar_down").html(bm.arrowD).appendTo(cd.$bar);
        cd.$up.add(cd.$down).add(cd.$thumb).css({ color: bm.color.ButtonText, "border-color": bm.color.ButtonBorder }); if (bm.params.gradients) { cd.$up.add(cd.$down).add(cd.$thumb).css("background-image", "url('Image?Name=Grad16H')") } cd.scale = 1;
        cd.ypos = 0;
        cd.ydown = 0;
        cd.bindEvents();
        cd.timer = null } O.prototype.bindEvents = function() { var cd = this,
            cc;

        function g(ce) { switch (ce) {
                case "up":
                    cd.po.onUp(); break;
                case "down":
                    cd.po.onDown(); break;
                case "pageup":
                    cd.po.onPageUp(); break;
                case "pagedown":
                    cd.po.onPageDown(); break } cd.timer = setTimeout(function() { g(ce) }, 50) } cd.$up.on("touchstart mousedown", function(ce) { if (bP(ce) || aQ(ce)) { return } cd.po.onUp();
            clearTimeout(cd.timer);
            bm.doc.scrollbar = cd;
            cd.timer = setTimeout(function() { g("up") }, 350);
            ce.preventDefault() });
        cd.$down.on("touchstart mousedown", function(ce) { if (bP(ce) || aQ(ce)) { return } cd.po.onDown();
            clearTimeout(cd.timer);
            bm.doc.scrollbar = cd;
            cd.timer = setTimeout(function() { g("down") }, 350);
            ce.preventDefault() });
        cd.$bar.on("touchstart mousedown", function(ch) { if (bP(ch) || aQ(ch)) { return } if (this != ch.target) { return } var ce, cg, cf; if (cd.$thumb.is(":hidden") == true) { ch.preventDefault(); return } ce = (ch.type == "touchstart") ? ch.originalEvent.touches[0] : ch;
            cc = ce.pageY / cd.scale;
            cg = cd.$thumb.offset().top / cd.scale; if (cc < cg) { cd.po.onPageUp();
                cf = "pageup" } else { cd.po.onPageDown();
                cf = "pagedown" } clearTimeout(cd.timer);
            bm.doc.scrollbar = cd;
            cd.timer = setTimeout(function() { g(cf) }, 350);
            ch.preventDefault() });
        cd.$thumb.on("touchstart mousedown", function(cf) { if (bP(cf) || aQ(cf)) { return } var ce = (cf.type == "touchstart") ? cf.originalEvent.touches[0] : cf;
            cc = ce.pageY / cd.scale;
            cd.ypos = ($(this).position().top / cd.scale) - cd.$up.outerHeight();
            cd.ydown = cc;
            bm.doc.scrollbar = cd;
            cf.preventDefault() }) };
    O.prototype.dragThumb = function(cf) { var ch, ce, cd, cg, cc, g;
        ch = this;
        ce = (cf.type == "touchmove") ? cf.originalEvent.touches[0] : cf;
        cd = ce.pageY / ch.scale;
        cg = ch.ypos + cd - ch.ydown;
        cc = ch.$bar.innerHeight() - ch.$up.outerHeight() - ch.$down.outerHeight();
        g = cc - ch.$thumb.outerHeight(); if (cg < 0) { cg = 0 } else { if (cg > g) { cg = g } } ch.po.onThumb(cg / g) };
    O.prototype.setScale = function(g) { this.scale = g };
    O.prototype.setThumb = function(ci, cd) { var ch, cf, cc, ce, g, cg;
        ch = this;
        cf = ch.$up.outerHeight(); if (cd == 0 || cd >= 1) { ch.$bar.css("opacity", 0.35);
            ch.$thumb.css("top", cf).hide() } else { ch.$bar.css("opacity", 1);
            cc = ch.$bar.innerHeight() - cf - ch.$down.outerHeight();
            ce = Math.round(cd * cc); if (ce < cf + 1) { ce = cf + 1 } g = cc - ce; if (g < 0) { ch.$thumb.hide() } else { cg = Math.round(ci * g) + cf;
                ch.$thumb.css("top", cg).outerHeight(ce).show() } } };

    function by(ce, g, ci, ch) { var cc, cd, cg, cf;
        cc = this;
        cc.table = ce;
        cc.seat = ch;
        cc.$container = $(".seatplate").clone().removeClass("seatplate").appendTo(ce.$content).css({ top: ci, left: g });
        cc.$cardbox = $(".sp_cards", cc.$container);
        cc.$graphic = $(".sp_graphic", cc.$container);
        cc.$seat = $(".sp_seat", cc.$container);
        cc.$avatar = $(".sp_avatar", cc.$seat);
        cc.$chatblock = $(".sp_block", cc.$avatar);
        cc.$note = $(".sp_note", cc.$avatar);
        cc.$name = $(".sp_name", cc.$seat);
        cc.$info = $(".sp_info", cc.$seat);
        cc.$glow = $(".sp_glow", cc.$seat);
        cc.adjustSide(ch);
        cc.clear();
        cc.glowing = false;
        cc.noteText = "";
        cc.colorNum = 0;
        cc.hint = "";
        cc.timeExpires = 0;
        cc.$tooltip = $("<div>").appendTo(ce.$content).addClass("tooltip").hide();
        cc.$cardbox.hover(function(cj) { ce.ghostCards(true, ch) }, function(cj) { ce.ghostCards(false, ch) });
        cc.$cardbox.on("touchstart", function(cj) { if (bP(cj)) { return } ce.ghostCards(true, ch);
            cj.preventDefault() });
        cc.$cardbox.on("touchend mouseup", function(cj) { if (aQ(cj)) { return } ce.ghostCards(false, ch);
            ce.toggleCards(ch);
            cj.preventDefault() });
        cc.$seat.hover(function(cj) { cc.hintOn(cj.pageX, cj.pageY) }, function() { cc.hintOff() });
        cf = false;
        cc.$seat.on("touchstart mousedown", function(cj) { if (bP(cj)) { return } if (cj.type == "touchstart") { cd = cj.originalEvent.touches[0];
                cg = setTimeout(function() { cc.hintOn(cd.pageX, cd.pageY - 60) }, 500) } cf = true;
            cj.preventDefault() });
        cc.$seat.on("touchend mouseup", function(cj) { if (aQ(cj)) { return } clearTimeout(cg); if ((cc.$tooltip.is(":hidden") || cj.type == "mouseup") && cf) { if (cc.pName == "" && ce.getPlayerSeat() == 0) { ce.seatRequest(ch) } else { ce.playerInfoShow(ch) } } cc.hintOff();
            cf = false;
            cj.preventDefault() }) } by.prototype.adjustSide = function() { var g, cc, cd;
        g = this; if (g.pName == "") { return } cd = g.table.seatPosition(g.seat);
        cc = cd <= Math.ceil(g.table.seats / 2);
        g.isRight = cc;
        g.$graphic.css("background", "url('Image?Name=Seat" + (cc ? "Right" : "Left") + "&Crc=" + bm.crc.image + "') no-repeat");
        g.$avatar.css("left", (cc ? 3 : 95));
        g.$name.css("left", (cc ? 38 : 2));
        g.$info.css("left", (cc ? 38 : 2));
        g.$note.css({ left: (cc ? "0px" : "auto"), right: (cc ? "auto" : "0px") }) };
    by.prototype.avatarClear = function() { this.$avatar.css("background-image", "none") };
    by.prototype.avatarSet = function(g) { var cc = ((g - 1) * -32) + "px 0px";
        this.$avatar.css("background", "url('Image?Name=Avatars&Crc=" + bm.crc.image + "') no-repeat " + cc) };
    by.prototype.avatarSetCustom = function(g, cc) { this.$avatar.css("background", "url('Avatar?Player=" + encodeURIComponent(g) + "&Crc=" + cc + "') no-repeat") };
    by.prototype.chatBlockIcon = function(g) { if (g) { this.$chatblock.css("background", "url('Image?Name=Block') no-repeat") } else { this.$chatblock.css("background-image", "none") } };
    by.prototype.clear = function() { this.setGlow(false);
        this.chatBlockIcon(false);
        this.avatarClear();
        this.setName("");
        this.setInfo("");
        this.$graphic.css("background", "url('Image?Name=SeatEmpty&Crc=" + bm.crc.image + "') no-repeat");
        this.$graphic.css("opacity", bm.seatEmptyOpacity);
        this.$note.hide() };
    by.prototype.hintOff = function() { this.$tooltip.hide();
        bm.doc.nameplate = null };
    by.prototype.hintOn = function(g, cg) { var cc, cf, ce, cd;
        cd = this.table.dialog.scale;
        cc = 0;
        cf = (g - this.$tooltip.parent().offset().left) / cd;
        ce = (cg + 20 - this.$tooltip.parent().offset().top) / cd;
        this.$tooltip.html(this.hint); if (this.isRight) { cc = this.$tooltip.width() + 10 } this.$tooltip.css({ left: cf - cc, top: ce }).show().redraw();
        bm.doc.nameplate = this };
    by.prototype.setGlow = function(ce) { var g = this;

        function cd() { if (!g.glowing) { return } g.showTimer();
            g.$glow.css("opacity", 0.5);
            setTimeout(cc, 750) }

        function cc() { if (!g.glowing) { return } g.showTimer();
            g.$glow.css("opacity", 0);
            setTimeout(cd, 750) } if (ce) { g.glowing = true;
            g.$glow.optrans(700);
            cd() } else { g.glowing = false;
            g.$glow.stop(true);
            g.$glow.optrans(0).css("opacity", 0) } };
    by.prototype.setInfo = function(g) { if (this.pName == "") { this.$info.text("") } else { this.$info.text(g) } };
    by.prototype.setName = function(cc) { var g = this;
        g.pName = cc;
        g.$name.text(cc); if (cc == "") { g.$graphic.css("background", "url('Image?Name=SeatEmpty&Crc=" + bm.crc.image + "') no-repeat");
            g.$graphic.css("opacity", bm.seatEmptyOpacity) } else { g.adjustSide();
            g.$graphic.css("opacity", bm.seatOpacity) } };
    by.prototype.setNoteColor = function(g, cc) { this.noteText = g;
        this.colorNum = cc; if (cc == 0) { color = "#FFFFFF" } else { color = bm.notecolor[cc] } this.$note.text(g == "" ? "" : "N").css("background-color", color);
        this.$note.toggle(g != "" || cc != 0) };
    by.prototype.setTime = function(g) { this.$name.text(bm.lang.TableCaptionTime + " " + g) };
    by.prototype.show = function(g) { this.$container.toggle(g) };
    by.prototype.showTimer = function() { var g, cc, cd;
        g = this; if (g.timeExpires == 0) { g.setName(g.pName) } else { cc = new Date();
            cd = Math.round((g.timeExpires - cc.getTime()) / 1000); if (cd >= 0) { g.setTime(cd) } else { g.setName(g.pName) } } };

    function ad(cg, g, cd) { var cf, ce, ch, cc;
        cf = this;
        cf.$container = cg;
        cf.$bar = $("<div>").addClass("slider_bar").css({ "background-color": bm.color.Button, "border-color": bm.color.ButtonBorder }).appendTo(cg);
        cf.$thumb = $("<div>").addClass("slider_thumb").css({ "background-color": bm.color.Button, "border-color": bm.color.ButtonBorder }).appendTo(cg);
        cf.onChange = cd;
        cf.value = 0;
        cf.scale = 1;
        cf.increment = g;
        cf.xpos = 0;
        cf.xdown = 0;
        cf.$thumb.on("touchstart mousedown", function(ci) { if (bP(ci) || aQ(ci)) { return } ce = (ci.type == "touchstart") ? ci.originalEvent.touches[0] : ci;
            cf.xpos = parseInt($(this).css("left"));
            cf.xdown = ce.pageX;
            bm.doc.slider = cf;
            ci.preventDefault() });
        cf.$bar.on("touchstart mousedown", function(ci) { if (bP(ci) || aQ(ci)) { return } if (this != ci.target) { return } ce = (ci.type == "touchstart") ? ci.originalEvent.touches[0] : ci;
            ch = cf.$thumb.offset().left; if (ce.pageX < ch) { cc = cf.value - cf.increment } else { cc = cf.value + cf.increment } cf.setValue(cc, true);
            ci.preventDefault() }) } ad.prototype.getValue = function() { return this.value };
    ad.prototype.setScale = function(g) { this.scale = g };
    ad.prototype.setValue = function(cd, g) { var cc = this;
        cd = parseFloat(cd); if (cd < 0) { cd = 0 } else { if (cd > 1) { cd = 1 } } cc.value = cd;
        cc.updateThumb(); if (g && cc.onChange) { cc.onChange(cd) } };
    ad.prototype.show = function(g) { this.$container.toggle(g) };
    ad.prototype.slide = function(cg) { var cf, ce, cc, cd, g;
        cf = this;
        ce = (cg.type == "touchmove") ? cg.originalEvent.touches[0] : cg;
        cc = cf.xpos + (ce.pageX - cf.xdown) / cf.scale;
        cd = 10;
        g = cf.$container.width() - 10; if (cc < cd) { cc = cd } else { if (cc > g) { cc = g } } cf.setValue((cc - cd) / (g - cd), true) };
    ad.prototype.updateThumb = function() { var ce, cd, cc, g;
        ce = this;
        cd = 10;
        cc = ce.$container.width() - 10;
        g = ce.value * (cc - cd) + cd;
        ce.$thumb.css("left", g) };

    function aZ(cg, cc, cf, g) { var ce, cd, ch;
        ce = this;
        ce.$container = cg.css("background-color", bm.color.List);
        ce.$tabs = $("> ul", cg);
        ce.$labels = $("> ul > li", cg);
        ce.$contents = $("> div", cg);
        ce.$labels.css({ color: bm.color.WindowText, "background-color": bm.color.Window, "border-color": bm.color.Window });
        ce.hNormal = 25;
        ce.hSelect = 30;
        ce.$labels.on("touchstart mousedown", function(ci) { if (bP(ci) || aQ(ci)) { return } ce.setTab($(this).index());
            ci.preventDefault() });
        ce.$contents.css("background-color", bm.color.Window);
        ce.count = 0;
        ch = cc.length;
        ce.totalCount = ch; for (cd = 0; cd < ch; cd++) { ce.$labels.eq(cd).text(cc[cd]); if (cf[cd]) { ce.count++;
                ce.$labels.eq(cd).show() } } ce.onChange = g;
        ce.index = 0 } aZ.prototype.getTab = function() { return this.index };
    aZ.prototype.guiChange = function(cc) { var cf, cg, ce, g, cd, ch;
        cf = this;
        cg = cc ? "1.2em" : "1.0em";
        ce = cc ? "40px" : "30px";
        g = cc ? "35px" : "25px";
        cf.$labels.css("font-size", cg);
        cf.$tabs.css("height", ce);
        cf.$contents.css("top", ce);
        cf.hNormal = cc ? 35 : 25;
        cf.hSelect = cc ? 40 : 30; if (bm.params.gradients) { ch = "url('Image?Name=Grad" + cf.hNormal + "')" } else { ch = "none" } for (cd = 0; cd < cf.totalCount; cd++) { if (cd == cf.index) { cf.$labels.eq(cd).css({ top: "0px", "line-height": cf.hSelect + "px", "font-weight": "bold", backgroundImage: "none" }) } else { cf.$labels.eq(cd).css({ top: "5px", "line-height": cf.hNormal + "px", "font-weight": "normal", backgroundImage: ch }) } } };
    aZ.prototype.setCaption = function(cc, g) { var cd = this;
        cd.$labels.eq(cc).text(g) };
    aZ.prototype.setTab = function(g) { var cd, cf, cc, ce;
        cd = this;
        cf = cd.index;
        cd.index = g; if (bm.params.gradients) { ce = "url('Image?Name=Grad" + cd.hNormal + "')" } else { ce = "none" } for (cc = 0; cc < cd.totalCount; cc++) { if (cc == g) { cd.$labels.eq(cc).css({ top: "0px", "line-height": cd.hSelect + "px", "font-weight": "bold", backgroundImage: "none" }) } else { cd.$labels.eq(cc).css({ top: "5px", "line-height": cd.hNormal + "px", "font-weight": "normal", backgroundImage: ce }) } } cd.$contents.css("visibility", "hidden").eq(g).css("visibility", "visible");
        cd.onChange(g, cf) };
    aZ.prototype.setTabWidth = function(g) { this.$labels.css("width", g) };
    aZ.prototype.showTab = function(cd, g) { var ce, cc;
        ce = this;
        cc = ce.$labels.eq(cd).is(":visible");
        ce.$labels.eq(cd).toggle(g); if (g && !cc) { ce.count++ } else { if (!g && cc) { ce.count-- } } };

    function a8(cd, cc) { var g;
        g = this;
        g.$container = cd; if (!cc) { cc = {} } g.$textarea = $("<textarea>").addClass("textarea").css({ color: bm.color.ListText, "background-color": bm.color.List, resize: "none" });
        cd.html(g.$textarea); if (cc.border) { g.$textarea.css("border", "1px solid " + bm.color.Window) } if (cc.maxlength) { g.$textarea.attr("maxlength", cc.maxlength) } if (cc.readonly) { g.$textarea.attr("readonly", "readonly") } if (cc.onInput) { g.$textarea.on("input", function(ce) { cc.onInput();
                ce.preventDefault() }) } } a8.prototype.getText = function() { return this.$textarea.val() };
    a8.prototype.setText = function(g) { this.$textarea.val(g) };
    a8.prototype.show = function(g) { this.$textarea.toggle(g) };

    function ca(cg) { var cc, ci, ch, cf, ce, g, cd;
        cc = r(cg); if (cc == null || !cc.graphicsMade) { return } ci = bu(cg.Seat); if (ci < 1 || ci > cc.seats) { return } ch = cg.Action1;
        cf = cg.Action2;
        ce = bu(cg.Time);
        g = bu(cg.Chips);
        cc.actionTimer(ci, ch, cf, ce, g);
        cd = aj(cg.Sound).toLowerCase(); if (cc.dialog == bm.focused && cd != "" && bm.soundOK) { bI(cd) } }

    function Y(ce) { var cd, cc, cg, g, cf;
        cd = r(ce);
        cg = aj(ce.Table);
        cc = aj(ce.Type);
        g = (ce.Local == "Yes"); if (cc == "T") { cg = aD(cg) } delete bm.passwords[cc + cg];
        cf = bm.lang.PasswordBad.split("%1%").join(cg); if (cd && g) { cd.bringToFront();
            cd.messageShow(cf) } else { bm.lobby.lobbyFront();
            bm.lobby.messageShow(cf) } }

    function aI(g) { bm.lobby.balanceShow(bm.loginData.player, bL(g.Available), bL(g.Available2), bL(g.InPlay), bL(g.InPlay2), bL(g.Total), bL(g.Total2)) }

    function bE(cd) { var cc, ce, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } ce = bu(cd.Seat);
        g = bu(cd.Bet); if (ce < 1 || ce > cc.seats) { return } cc.betShow(ce, g) }

    function b7(cc) { var g, cd;
        g = r(cc); if (g == null || !g.graphicsMade) { return } cd = bu(cc.Pot); if (cd < 1 || cd >= g.seats) { return } g.collectBets(cc) }

    function b8(cm) { var cq, g, cj, ci, cg, ce, ct, cc, cr, co, cp, ck, cn, cs, ch, cd, cf, cl;
        cq = r(cm); if (cq == null || !cq.graphicsMade) { return } g = cq.nextMove;
        cq.clearNextMoves();
        cj = aj(cm.Button1); if (cj == "Fold+") { cj = "Fold";
            ct = true } else { ct = false } ci = aj(cm.Button2);
        cg = aj(cm.Button3);
        ce = aj(cm.Button4);
        cc = bu(cm.BringIn);
        cr = bu(cm.Call); if (bm.local.autoMuck && cj == "Muck") { cq.sendButton("Muck", 0); return } if (cq.foldAnyBet.isChecked()) { if (ci == "Check") { cq.sendButton("Check", 0); return } if (cj == "Fold") { cq.sendButton("Fold", 0); return } } if (g != "") { if (g == "CheckFold") { if (ci == "Check") { g = "Check" } else { g = "Fold" } } if (g == "CallCheck") { if (ci == "Call") { g = "Call" } else { g = "Check" } } if (g == cj || g == ci) { cq.sendButton(g, 0); return } } if (ct) { cq.showOnFold.show(true);
            cq.showOnFold.setCheck(false) } co = bu(cm.MinRaise);
        cp = bu(cm.MaxRaise);
        ck = bu(cm.IncRaise);
        cn = bu(cm.Multiple); if (cn == 0) { cn = 1 } cq.setupButtons(cj, ci, cg, ce, cc, cr, co, cp);
        cs = aj(cm.Preflop) == "Yes";
        cq.setupRaiseBar(co, cp, ck, cn, ce);
        ch = bu(cm.BB);
        cd = bu(cm.Bet);
        cf = bu(cm.Pot);
        cq.setupRaiseButtons(cs, ch, cd, cr, cf);
        cl = bu(cm.TimeBank);
        cq.timeBankBtn.setCaption(bm.lang.TableButtonTime.split("%1%").join(cl));
        cq.timeBankBtn.show(cl > 0); if (cj + ci + cg != "" && ci != "Ready" && ci != "Start") { bI("beep");
            a1(cq) } }

    function be(ce) { var cd, cg, cc, cf, g;
        cd = r(ce); if (cd == null || !cd.graphicsMade) { return } cg = bu(ce.Seat); if (cg < 1 || cg > cd.seats) { return } g = (cd.getPlayerSeat() == cg); for (cc = 1; cc <= 7; cc++) { cf = bu(ce["Card" + cc]);
            cd.holeCard[cc][cg] = cf; if (cf != 0 || !g) { cd.card[cc][cg].setCard(cf) } if (cf != 0) { cd.card[cc][cg].show(true) } } if (g) { cd.isFaceDown = (cd.holeCard[1][cg] == 53);
            cd.updateHandHelper() } }

    function P(cd) { var ck, ch, cc, cf, cl, g, cj, cn, ci, cm, ce, cg;
        ck = r(cd); if (ck == null || !ck.graphicsMade) { return } cc = aj(cd.Player);
        cf = aw(cc); if (cf && !bm.local.chatBlockAsterisk) { return } cl = a6(aj(cd.Title)); if (cl != "") { cl = "[" + cl + "] " } if ((cc == "" || cc == bm.lang.ReservedDealer) && bm.local.muteDealer) { return } g = aj(cd.Text);
        cj = aj(cd.Chips); if (cj == "Yes" && bm.local.decimalMark != ".") { g = g.split(".").join(bm.local.decimalMark) } if (cc != bm.lang.ReservedDealer && cc != bm.lang.ReservedSystem) { g = a6(g) } if (cf) { g = "*" } ci = 100;
        cm = {};
        cm.color1 = bm.color.ListText;
        cm.color2 = aj(cd.Color);
        cm.time = j(new Date());
        cm.title = cl;
        cm.player = cc;
        cm.text = g;
        ck.chatQueue.push(cm); while (ck.chatQueue.length > ci) { ck.chatQueue.shift() } ch = ck.infoDialog;
        ce = ch.controls.chatInfoMove.isChecked(); if (ce && bm.local.tableChatTime && !bm.mobile) { cg = "[" + cm.time + "] " } else { cg = "" } if (cc == "") { cn = "" } else { cn = "<font color='" + cm.color1 + "'>" + cg + cl + cc + ":  </font><font color='" + cm.color2 + "'>" + g + "</font>" } cn = "<span>" + cn + "</span>"; if (ce) { ch.controls.chatInfoText.addTextLine(cn, ci) } else { if (!bm.mobile) { ck.chatText.addTextLine(cn, ci) } else { if (bm.tableCurrent == bm.tables.indexOf(ck)) { bm.lobby.mobileChatText.addTextLine(cn, ci) } } } }

    function b0(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.buttonsOff() }

    function b9(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.dealCards(cc.Seats) }

    function S(cd) { var cc, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } g = bu(cd.Dealer);
        cc.moveDealer(g) }

    function x(g) { var co, ci, cn, cm, cl, ck, cj, ch, cg, cf, cd, cc, ce;
        co = r(g); if (co == null || !co.graphicsMade) { return } ci = m(bm.eSeed + aj(g.Salt));
        cn = parseInt(ci.substring(0, 2), 16);
        cm = parseInt(ci.substring(2, 4), 16);
        cl = parseInt(ci.substring(4, 6), 16);
        ck = parseInt(ci.substring(6, 8), 16);
        cj = parseInt(ci.substring(8, 10), 16);
        ch = parseInt(aj(g.Card1), 16) ^ cn;
        cg = parseInt(aj(g.Card2), 16) ^ cm;
        cf = parseInt(aj(g.Card3), 16) ^ cl;
        cd = parseInt(aj(g.Card4), 16) ^ ck;
        cc = parseInt(aj(g.Card5), 16) ^ cj;
        ce = aj(g.Hand); if (ch < 0 || ch > 53) { ch = 0 } if (cg < 0 || cg > 53) { cg = 0 } if (cf < 0 || cf > 53) { cf = 0 } if (cd < 0 || cd > 53) { cd = 0 } if (cc < 0 || cc > 53) { cc = 0 } co.cardNum[1] = ch;
        co.cardNum[2] = cg; if (co.holeCards == 4 || co.holeCards == 5) { co.cardNum[3] = cf;
            co.cardNum[4] = cd } if (co.holeCards == 5) { co.cardNum[5] = cc } if (co.holeCards == 7) { co.cardNum[7] = cf; if (cf > 0) { ch = cf;
                cg = 0;
                cf = 0 } } co.historyAdd(ce, bm.lang.HHDealt.split("%1%").join(bm.loginData.player).split("%2%").join(am(ch, cg, cf, cd, cc))); if (g.Show == "Yes") { co.showHoleCards() } }

    function q(cc) { var g, cd;
        g = r(cc); if (g == null || !g.graphicsMade) { return } cd = aj(cc.Caption);
        g.endBreakUpdate(cd) }

    function bx(g) { bm.lobby.faqShow(g.Text) }

    function bj(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.boardCard[1] = bu(cc.Board1);
        g.boardCard[2] = bu(cc.Board2);
        g.boardCard[3] = bu(cc.Board3);
        g.boardCard[4] = 0;
        g.boardCard[5] = 0;
        g.dealFlop() }

    function bl(cd) { var cc, ce, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } ce = cc.getPlayerSeat(); if (ce < 1 || ce > cc.seats) { return } if (cd.Ghost == "Yes") { if (cc.isFaceDown) { cc.toggleCards(ce) } cc.ghosted = true; for (g = 1; g <= cc.holeCards; g++) { cc.card[g][ce].show(false) } } else { cc.ghosted = false; for (g = 1; g <= cc.holeCards; g++) { cc.cardNum[g] = 0;
                cc.holeCard[g][ce] = 0 } for (g = 1; g <= cc.holeCards; g++) { cc.card[g][ce].setCard(0).shade(false) } } cc.foldAnyBetCheck(false);
        cc.foldAnyBetShow(false);
        cc.handHelper = "";
        cc.updateHandHelper() }

    function bD(cd) { var cj, cg, cc, ci, ch, cf, g, ce;
        cj = r(cd); if (cj == null || !cj.graphicsMade) { return } cg = m(bm.eSeed + aj(cd.HSalt));
        ci = parseInt(cg.substring(0, 8), 16);
        cf = parseInt(aj(cd.HRank), 16) ^ ci;
        cc = m(bm.eSeed + aj(cd.LSalt));
        ch = parseInt(cc.substring(0, 8), 16);
        g = parseInt(aj(cd.LRank), 16) ^ ch; if (g == 0) { ce = bm.lang.HandHelper.split("%1%").join(bn(cf)) } else { if (cf == 0) { ce = bm.lang.HandHelper.split("%1%").join(ah(g)) } else { ce = bm.lang.HandHelperHiLo.split("%1%").join(bn(cf));
                ce = ce.split("%2%").join(ah(g)) } } cj.handHelper = ce }

    function bo(ce) { var cd, cg, cf, g, cc;
        cd = r(ce); if (cd == null || !cd.graphicsMade) { return } cg = aj(ce.Hand);
        cf = bu(ce.Text.length); for (g = 0; g < cf; g++) { cc = a6(aj(ce.Text[g]));
            cd.historyAdd(cg, cc) } }

    function an(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } if (g.turn > 0 && g.turn <= g.seats) { g.seat[g.turn].setGlow(false) } g.turn = bu(cc.Seat); if (g.turn > 0 && g.turn <= g.seats) { g.seat[g.turn].setGlow(true) } }

    function bT(cc) { var ci, g, cf, cg, cd, ch, cj, ce;
        ci = r(cc); if (ci == null) { return } g = bu(cc.Timer); if (g <= 0) { return } cf = bu(cc.MinBuyIn);
        cg = bu(cc.MaxBuyIn);
        cd = bu(cc.DefBuyIn);
        ch = bu(cc.Balance);
        cj = cc.Rathole == "Yes";
        ce = cc.Primary == "Yes";
        ci.buyInRingChipsShow(g, cf, cg, cd, ch, cj, ce) }

    function br(cd) { var cc, g;
        bm.local.language = cd.Language;
        bm.languages = cd.Languages;
        bJ("language", bm.local.language);
        g = cd.FontFamily; if (g != "" && g != bm.params.fontFamily) { F("body", "fontFamily", g) } delete cd.Command;
        delete cd.Language;
        delete cd.Languages;
        delete cd.FontFamily; for (cc in cd) { bm.lang[cc] = cd[cc] } bm.playerAction = ["", bm.lang.PlayerActionAddOn, bm.lang.PlayerActionAllIn, bm.lang.PlayerActionAnte, bm.lang.PlayerActionBB, bm.lang.PlayerActionBet, bm.lang.PlayerActionBringIn, bm.lang.PlayerActionCall, bm.lang.PlayerActionCheck, bm.lang.PlayerActionFold, bm.lang.PlayerActionRaise, bm.lang.PlayerActionRebuy, bm.lang.PlayerActionReserved, bm.lang.PlayerActionSB, bm.lang.PlayerActionSBBB, bm.lang.PlayerActionSit, bm.lang.PlayerActionStraddle, bm.lang.PlayerActionWait] }

    function b5(cd) { var cc, cf, cj, g, cg, cl, ch, ce, ck, ci;
        cc = aj(cd.Player);
        cf = aw(cc); if (cf && !bm.local.chatBlockAsterisk) { return } cj = a6(aj(cd.Title)); if (cj != "") { cj = "[" + cj + "] " } g = a6(aj(cd.Text)); if (cf) { g = "*" } ci = 100;
        ck = {};
        ck.color1 = bm.color.ListText;
        ck.color2 = aj(cd.Color);
        ck.time = j(new Date());
        ck.title = cj;
        ck.player = cc;
        ck.text = g;
        bm.lobbyChatQueue.push(ck); while (bm.lobbyChatQueue.length > ci) { bm.lobbyChatQueue.shift() } ce = bm.lobby.popoutChat.$dialog.is(":visible"); if (ce && bm.local.lobbyChatTime) { ch = "[" + ck.time + "] " } else { ch = "" } if (cc == "") { cl = "" } else { cl = "<font color='" + ck.color1 + "'>" + ch + cj + cc + ":  </font><font color='" + ck.color2 + "'>" + g + "</font>" } cl = "<span>" + cl + "</span>"; if (ce) { cg = bm.lobby.popoutChat.controls.popoutChatText } else { cg = bm.lobby.lobbyChatText } cg.addTextLine(cl, ci) }

    function av(cc) { var cf, cj, g, cg, cd, ck, ch, ci, ce; switch (aj(cc.Status)) {
            case "Ok":
                bm.loginData.player = aj(cc.Player);
                bm.loginData.realName = aj(cc.RealName);
                bm.loginData.avatar = bu(cc.Avatar);
                bm.loginData.avatarCrc = aj(cc.AvatarCrc); if (cc.AvatarFile == "Yes") { bm.minAvatar = 0 } bm.loginData.gender = aj(cc.Gender);
                bm.loginData.location = aj(cc.Location);
                bm.loginData.email = aj(cc.Email);
                bm.loginData.custom = aj(cc.Custom);
                bm.loggedIn = true; for (cf = 0; cf < bm.tables.length; cf++) { cj = bm.tables[cf];
                    g = cj.id;
                    cg = cj.type;
                    cd = cj.sng;
                    cj.setTitle(bK(g, cg, cd));
                    cj.player = bm.loginData.player } ax(); break;
            case "Error":
                bm.lobby.messageShow(aj(cc.Text));
                bm.loggedIn = false;
                ax(); break } bm.lobby.updateLobbyTitle(); if (bm.loggedIn == false || bm.params.tableName == "") { return } ck = [];
        ch = [];
        ci = []; if (bm.params.tableDelimiter == "") { ck[0] = bm.params.tableName;
            ch[0] = bm.params.tableType;
            ci[0] = bm.params.tablePassword } else { ck = bm.params.tableName.split(bm.params.tableDelimiter);
            ch = bm.params.tableType.split(bm.params.tableDelimiter);
            ci = bm.params.tablePassword.split(bm.params.tableDelimiter) } for (cf = 0; cf < ck.length; cf++) { ce = { Response: "OpenTable" };
            ce.Table = ck[cf];
            ce.Type = ch[cf]; if (ci[cf] != "") { ce.Password = ci[cf]; if (ch[cf] == "T") { g = aD(ck[cf]) } else { g = ck[cf] } bm.passwords[ch[cf] + g] = ci[cf] } bU(ce) } }

    function bX(cd) { var cc, g;
        cc = aj(cd.Salt);
        g = { Response: "Login" };
        g.Player = bm.loginData.player;
        g.Hash = m(bm.loginData.password + cc);
        bm.eSeed = aa(bm.loginData.password);
        g.NextHash = bm.eSeed;
        g.ValCode = bm.loginData.valCode;
        bU(g) }

    function a2(cc) { var cg, cf, ce, g, cd, cm, ch, ck, cj, cl, ci;
        cm = bm.lobby.loginGrid.selrow; if (cm < 0) { cd = "" } else { cd = bm.data.Login.rows[cm].player } ch = (cc.Clear == "Yes"); if (ch) { bm.data.Login.rows.length = 0 } ci = bm.local.timeFormat == "12"; if (!cc.Remove) { cc.Remove = [] } for (cg = 0; cg < cc.Remove.length; cg++) { g = cc.Remove[cg]; if (g == cd) { cd = "" } ce = bm.data.Login.rows.length; for (cf = 0; cf < ce; cf++) { if (g == bm.data.Login.rows[cf].player) { bm.data.Login.rows.splice(cf, 1); break } } } if (!cc.Player) { cc.Player = [] } for (cg = 0; cg < cc.Player.length; cg++) { ck = {};
            ck.player = cc.Player[cg];
            ck.bold = ck.player == bm.loginData.player;
            ck.real = cc.RealName[cg];
            ck.location = cc.Location[cg];
            cj = c(ck.player);
            ck.colorSort = cj.color;
            ck.color = J(cj.color);
            ck.note = cj.note;
            ck.block = cj.block;
            ck.login = b2(cc.Login[cg], true, ci, false);
            ck.loginSort = b2(cc.Login[cg], true, false, true);
            bm.data.Login.rows.push(ck) } if (!ch && cc.Player.length > 0) { bI("login") } ce = bm.data.Login.rows.length;
        bm.lobby.loginGrid.selrow = -1; if (cd == "") { bm.lobby.loginSelected = "";
            bm.lobby.loginSelect(-1) } else { for (cg = 0; cg < ce; cg++) { if (cd == bm.data.Login.rows[cg].player) { bm.lobby.loginGrid.selrow = cg; break } } } bm.lobby.loginGrid.sort();
        cl = bm.lang.LobbyCaptionLogins + ": " + ce;
        bm.lobby.lobbyTabs.setCaption(0, cl);
        bm.lobby.lobbyLogins.$menu.text(cl); if (ce != cc.Total) { bU({ Response: "BLOGINS" }) } }

    function X(g) { var cc = aj(g.Message); if (cc == "Ok") { f(false) } else { bm.lobby.logoutConfirmShow(cc) } }

    function aC(cc) { var g, ce, cd;
        g = r(cc);
        ce = aj(cc.Title);
        cd = aj(cc.Text); if (g) { g.messageShow(cd, ce) } else { if (bm.lobby) { bm.lobby.lobbyFront();
                bm.lobby.messageShow(cd, ce) } else { alert(cd) } } if (cc.Disconnect == "Yes") { bm.quit = true;
            bm.ws.close();
            bI("beep") } }

    function at(g) { bm.lobby.newsShow(g.Text) }

    function M(cd) { var cc, g, ce;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } g = bu(cd.Call); if (g < 0) { cc.clearNextMoves(); return } cc.$nextPanel.show(); if (g == 0) { cc.nextMove1.setCaption(bm.lang.TableCaptionNextCheckFold);
            cc.nextMove1.show(true);
            cc.nextCommand1 = "CheckFold";
            cc.nextMove2.setCaption(bm.lang.TableCaptionNextCheck);
            cc.nextMove2.show(true);
            cc.nextCommand2 = "Check";
            cc.nextMove3.setCaption("");
            cc.nextMove3.show(false);
            cc.nextCommand3 = "";
            cc.nextMove4.setCaption(bm.lang.TableCaptionNextCallAnyCheck);
            cc.nextMove4.show(true);
            cc.nextCommand4 = "CallCheck" } else { cc.nextMove1.setCaption("");
            cc.nextMove1.show(false);
            cc.nextCommand1 = "";
            ce = bm.lang.TableCaptionNextCall + " " + bL(g); if (cc.nextMove2.getCaption() != ce) { if (cc.nextMove2.isChecked()) { cc.nextMove = "";
                    cc.nextMove2.setCheck(false) } if (cc.nextMove2.isVisible()) { cc.nextMove2.enable(false);
                    setTimeout(function() { cc.nextMove2.enable(true) }, 1500) } } cc.nextMove2.setCaption(ce);
            cc.nextMove2.show(true);
            cc.nextCommand2 = "Call";
            cc.nextMove3.setCaption(bm.lang.TableCaptionNextFold);
            cc.nextMove3.show(true);
            cc.nextCommand3 = "Fold"; if (cc.nextMove == "CheckFold") { cc.nextMove3.setCheck(true);
                cc.nextMove = "Fold" } cc.nextMove4.setCaption(bm.lang.TableCaptionNextCallAny);
            cc.nextMove4.show(true);
            cc.nextCommand4 = "Call" } }

    function bd(cf) { var ce, cg, ch, cc, g, cd;
        ce = r(cf); if (ce == null || !ce.graphicsMade || ce.getPlayerSeat() != 0) { return } ch = bu(cf.Count);
        cc = "<pre>"; for (g = 0; g < ch; g++) { cd = aj(cf.Line[g]); if (bm.local.decimalMark != ".") { cd = cd.split(".").join(bm.local.decimalMark) } cc = cc + cd + "\r\n" } cc = cc + "</pre>";
        ce.$tooltip.html(cc);
        cg = ce.infoDialog;
        cg.controls.statsInfo.setText(cc) }

    function aF(ce) { var cn, cc, ch, cj, cm, co, cp, g, ci, cl, cd, cf, cg, ck, cq; if (bm.mobile && bm.lobby.lobbyTabs.getTab() != 4) { bm.lobby.lobbyTabs.setTab(4); if (bm.lobby.showMenu) { bm.lobby.menuToggle(false) } } cn = r(ce); if (cn) { u(cn) } else { cc = aj(ce.Table);
            ch = aj(ce.Type);
            cf = aj(ce.SnG) == "Yes";
            cg = aj(ce.Straddle) == "Yes";
            cj = bK(cc, ch, cf);
            co = al(cc, ch, cf);
            cm = aj(ce.Game);
            cp = aj(ce.Mix);
            g = aj(ce.Graphic);
            ci = aj(ce.Primary) == "Yes";
            cl = bu(ce.RebuyFee);
            cd = bu(ce.MinChip);
            ck = aj(bm.loginData.player);
            cn = new bz(cj, cc, ch, cm, co, cp, g, ci, cl, cd, cf, cg, ck, bm.winOfsX, bm.winOfsY);
            aW();
            bm.tables.push(cn);
            cn.bringToFront();
            aG(cn.dialog) } cq = bm.lang.LobbyCaptionOpen + ": " + bm.tables.length;
        bm.lobby.lobbyTabs.setCaption(4, cq);
        bm.lobby.lobbyOpenTables.$menu.text(cq); if (ce.Beep == "Yes") { bI("beep") } }

    function aO(g) { if (aj(g.Pong) == "Yes") { bU({ Response: "Pong" }) } }

    function i(cc) { var g, ch, cd, cj, ck, cg, ci, cf, ce;
        g = aj(cc.Table);
        ch = aj(cc.Type);
        cd = bu(cc.Count);
        ce = aj(cc.SnG) == "Yes";
        cj = []; if (ch == "R") { bm.lobby.$ringSelected.text(g); for (cg = 0; cg < cd; cg++) { ci = {};
                ci.player = aj(cc.Player[cg]);
                ck = aj(cc.Chips[cg]);
                ci.chipsSort = ck; if (bm.local.decimalMark != ".") { ck = ck.split(".").join(bm.local.decimalMark) } ci.chips = ck;
                ck = aj(cc.Net[cg]);
                ci.netSort = ck; if (bm.local.decimalMark != ".") { ck = ck.split(".").join(bm.local.decimalMark) } ci.net = ck;
                cj.push(ci) } bm.data.RingPlayer.rows = cj;
            bm.lobby.ringPlayerGrid.sort() } else { cf = aj(cc.Time); if (cf == "") { ck = g } else { ck = bm.lang.LobbyCaptionRunning.split("%1%").join(g).split("%2%").join(cf) } if (ce) { if (bm.lobby.sitnGoGrid.selrow >= 0) { bm.lobby.$sitnGoSelected.text(ck) } } else { if (bm.lobby.tourneyGrid.selrow >= 0) { bm.lobby.$tourneySelected.text(ck) } } for (cg = 0; cg < cd; cg++) { ci = {};
                ci.player = aj(cc.Player[cg]);
                ck = aj(cc.Chips[cg]); if (ck == "Removed") { ck = bm.lang.GamePlayerRemoved } else { if (ck == "Finished") { ck = bm.lang.GameFinished } } ci.chips = ck;
                ci.rank = aj(cc.Rank[cg]);
                ci.table = aj(cc.TNum[cg]);
                cj.push(ci) } if (ce) { bm.data.SitnGoPlayer.rows = cj;
                bm.lobby.sitnGoPlayerGrid.sort() } else { bm.data.TourneyPlayer.rows = cj;
                bm.lobby.tourneyPlayerGrid.sort() } } }

    function a0(ch) { var ce, cc, cg, cd, cf, g, ci;
        ci = bm.lobby.noteList;
        ce = ci.controls.noteGrid.getValue("player");
        bm.data.Notes.rows.length = 0;
        cd = -1; for (cc = 0; cc < ch.Subject.length; cc++) { cf = ch.Subject[cc]; if (cf == "*labels*") { g = JSON.parse(ch.Note[cc]); if (Array.isArray(g) && g.length == 11) { bm.notelabel = g.slice() } continue } cg = {};
            cg.player = cf; if (ce == cg.player) { cd = cc } cg.colorNum = bu(ch.Color[cc]);
            cg.color = J(cg.colorNum);
            cg.noteText = ch.Note[cc];
            cg.note = cg.noteText == "" ? "" : "&#10004;";
            cg.chatBool = ch.Chat[cc];
            cg.block = cg.chatBool == "Yes" ? "" : "&#10004;";
            bm.data.Notes.rows.push(cg) } ci.controls.noteGrid.selrow = cd;
        bm.lobby.noteListSelect(cd);
        ci.controls.noteGrid.sort() }

    function bk(cf) { var ce, cg, ch, cc, g, cd;
        ce = r(cf); if (ce == null || !ce.graphicsMade) { return } ch = bu(cf.Count);
        cc = "<pre>"; for (g = 0; g < ch; g++) { cd = aj(cf.Line[g]); if (bm.local.decimalMark != ".") { cd = cd.split(".").join(bm.local.decimalMark) } cc = cc + cd + "\r\n" } cc = cc + "</pre>";
        ce.$tooltip.html(cc);
        cg = ce.infoDialog;
        cg.controls.statsInfo.setText(cc) }

    function aE(cc) { var g, cd;
        g = r(cc); if (g == null || !g.graphicsMade) { return } cd = bu(cc.Pot); if (cd < 1 || cd > 9) { return } g.potAward(cc) }

    function Q(ce) { var cc, cf, cd, g;
        cc = r(ce); if (cc == null || !cc.graphicsMade) { return } cf = bu(ce.Pot); if (cf < 1 || cf > 9) { return } cd = bu(ce.Value);
        g = bu(ce.Total);
        cc.potRake(cf, cd, g) }

    function b4() { for (var g = 0; g < bm.tables.length; g++) { bm.tables[g].refreshTable() } }

    function ag(cc) { var g, cn, cj, cl, ck, ch, cm, ce, cd, cf, cg, ci;
        g = aj(cc.Table);
        cm = cc.Password == "Yes";
        cf = cc.Primary == "Yes";
        cn = bW(cc.BuyIn);
        cg = bg(cn, cf);
        ce = bL(cc.Balance);
        ci = bg(ce, cf);
        cj = aj(cc.Ticket);
        ck = cc.HasTicket == "Yes";
        ch = ck ? bm.lang.GameYes : bm.lang.GameNo;
        cl = cc.TicketRequired == "Yes"; if (ck && !cl) { bm.lobby.tourneyRegOptionShow(g, cm, cj, cg, ci) } else { cd = bm.lang.BuyInTourney + "<br>"; if (cn >= 0) { cd = cd + "<br>" + bm.lang.BuyInTotal.split("%1%").join(cg) } if (cj != "") { cd = cd + "<br>" + bm.lang.BuyInTicket.split("%1%").join(cj) } if (cn >= 0) { cd = cd + "<br>" + bm.lang.BuyInBalance.split("%1%").join(ci) } if (cj != "") { cd = cd + "<br>" + bm.lang.BuyInHasTicket.split("%1%").join(ch) } bm.lobby.tourneyRegShow(cd, g, cm) } }

    function az(cd) { var cc, ce, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } ce = bu(cd.Seat); if (ce < 1 || ce > cc.seats) { return } g = cd.Player;
        cc.playerName[ce] = g;
        cc.playerAction[ce] = bm.lang.PlayerActionReserved;
        cc.seat[ce].setGlow(false);
        cc.seat[ce].setName(g);
        cc.seat[ce].setInfo(bm.lang.PlayerActionReserved);
        cc.seat[ce].show(true) }

    function I(cd) { var ch, cg, cf, cc, cl, ce, cm, ci, cj, ck, g;
        cm = bm.lobby.ringGrid.selrow; if (cm < 0) { ce = "" } else { ce = bm.data.Ring.rows[cm].id } ci = cd.Clear == "Yes"; if (ci) { bm.data.Ring.urows.length = 0;
            cf = 0 } else { cf = bm.data.Ring.urows.length } cj = bu(cd.Count); for (ch = 0; ch < cj; ch++) { cc = aj(cd.ID[ch]); if (cc == "") { continue } ck = {};
            ck.id = cc;
            ck.bold = (bm.sitting.indexOf("R" + cc) > -1) || (bm.waiting.indexOf("R" + cc) > -1);
            ck.primary = aj(cd.Primary[ch]) == "Yes";
            g = ck.primary ? "p" : "s";
            ck.game = aj(cd.Game[ch]);
            ck.gameIndex = bu(cd.GameIndex[ch]);
            ck.stakesLo = aj(cd.StakesLo[ch]);
            ck.stakesHi = aj(cd.StakesHi[ch]);
            ck.ante = bu(cd.Ante[ch]);
            ck.stakesSort = g + ("0000000000" + bu(ck.stakesLo).toFixed(2)).substr(-14);
            ck.stakes = ab(ck.stakesLo) + "/" + ab(ck.stakesHi); if (ck.ante > 0) { ck.stakes += "/" + ab(ck.ante) } ck.stakes = bg(ck.stakes, ck.primary);
            ck.buyinMin = aj(cd.BuyinMin[ch]);
            ck.buyinMax = aj(cd.BuyinMax[ch]);
            ck.buyinSort = g + ("0000000000" + bu(ck.buyinMin).toFixed(2)).substr(-14);
            ck.buyin = bg(ab(ck.buyinMin) + " - " + ab(ck.buyinMax), ck.primary);
            ck.playing = aj(cd.Players[ch]);
            ck.seats = aj(cd.Seats[ch]);
            ck.startCode = aj(cd.StartCode[ch]) == "Yes";
            ck.waiting = aj(cd.Waiting[ch]);
            ck.password = aj(cd.Password[ch]);
            cl = false; if (ci == false) { for (cg = 0; cg < cf; cg++) { if (cc == bm.data.Ring.urows[cg].id) { cl = true;
                        bm.data.Ring.urows[cg] = ck; break } } } if (cl == false) { bm.data.Ring.urows.push(ck) } } bm.lobby.ringFilterData();
        bm.lobby.ringGameSelectID(ce);
        bm.lobby.ringGrid.sort();
        bm.lobby.ringGameSelect(bm.lobby.ringGrid.selrow);
        bm.lobby.ringTabCaption() }

    function s(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.boardCard[5] = bu(cc.Board5);
        g.dealRiver() }

    function a7(cg) { var cf, cc, cd, g, ce;
        bm.color.TableTop = aj(cg.TextColorTop);
        bm.color.TableBackground = aj(cg.TextColorBack);
        bm.color.Background = aj(cg.BackgroundColor);
        bm.color.Window = aj(cg.WindowColor);
        bm.color.Button = aj(cg.ButtonColor);
        bm.color.List = aj(cg.ListColor);
        bm.seatEmptyOpacity = aj(cg.SeatEmptyOpacity);
        bm.seatOpacity = aj(cg.SeatOpacity);
        bm.crc.audio = aj(cg.AudioCrc);
        bm.crc.image = aj(cg.ImageCrc);
        bh();
        bm.$webClient.add("#OpenBackground").css("background-color", bm.color.Background); if (cg.BackgroundGraphic == "Default") { $("#BGLogo img").attr("src", "Image?Name=PMLogo");
            $("#BGLogo a").attr("href", "http://www.briggsoft.com");
            $("#BGLogo").css({ top: 50, height: 150 }).show();
            ce = $("#BGLogo").clone().attr("id", "BGLogo2").appendTo("#OpenBackground");
            $("a", ce).removeAttr("href").removeAttr("target") } else { if (cg.BackgroundGraphic == "Yes") { if (cg.BackgroundTile == "Yes") { $("#BGTile").css("background-image", "url('Image?Name=Logo&Crc=" + bm.crc.image + "')");
                    cf = aj(cg.BackgroundLink); if (cf != "") { $("#BGTile").attr("href", cf) } $("#BGTile").show();
                    ce = $("#BGTile").clone().attr("id", "BGTile2").appendTo("#OpenBackground");
                    ce.removeAttr("href").removeAttr("target") } else { $("#BGLogo img").attr("src", "Image?Name=Logo&Crc=" + bm.crc.image);
                    cf = aj(cg.BackgroundLink); if (cf != "") { $("#BGLogo a").attr("href", cf) } $("#BGLogo").show();
                    ce = $("#BGLogo").clone().attr("id", "BGLogo2").appendTo("#OpenBackground");
                    $("a", ce).removeAttr("href").removeAttr("target") } } } bm.sessionID = aj(cg.ID);
        bm.siteName = aj(cg.Site);
        bm.siteEmail = aj(cg.Email);
        bm.siteWeb = aj(cg.Web);
        bm.licenseType = aj(cg.LicenseType);
        bm.maskPrimary = aj(cg.PrimaryMask);
        bm.maskSecondary = aj(cg.SecondaryMask);
        bm.secondary = cg.Secondary == "Yes";
        bm.customCaption = aj(cg.CustomCaption);
        bm.customDescription = aj(cg.CustomDescription);
        bm.customEdit = cg.CustomEdit == "Yes";
        bm.customMouseOver = cg.CustomMouseOver == "Yes";
        bm.profileURL = aj(cg.ProfileURL);
        bm.reconKey = aj(cg.ReconKey);
        aK();
        cb();
        bm.lurking = cg.Lurking == "Yes";
        bm.newAccounts = cg.NewAccounts == "Yes";
        bm.passwordRecovery = cg.PasswordRecovery == "Yes";
        bm.validateEmails = cg.ValidateEmails == "Yes";
        bm.maxAvatar = bu(cg.Avatars);
        bm.lobby = new bM($("#Lobby"));
        aG(bm.lobby.dialog);
        $("#Connecting").hide();
        bm.$webClient.css("background-image", "none"); if (cg.RemoveAbout == "Yes") { $("#HelpSep").hide();
            bm.lobby.helpAbout.show(false) } bm.lobby.lobbyChatDisplay(cg.LobbyChat == "Yes");
        bm.lobby.accountTickets.show(cg.TicketsMenu == "Yes");
        bm.lobby.accountPermissions.show(cg.PermissionsMenu == "Yes");
        bm.lobby.optionsLanguage.show(bm.languages > 1); if (bm.newAccounts == true) { bm.lobby.accountCreate.show(true) } if (cg.AccountChanges == "Yes") { bm.lobby.accountChange.show(true) } if (cg.ChipTransfers == "Yes") { bm.lobby.accountTransfer1.show(true) } if (cg.ChipTransfers2 == "Yes" && bm.secondary) { bm.lobby.accountTransfer2.show(true) } if (cg.BalanceResets == "Yes") { bm.lobby.accountChipRequest1.show(true) } if (cg.BalanceResets2 == "Yes" && bm.secondary) { bm.lobby.accountChipRequest2.show(true) } bf(bm.local.fourColorDeck);
        bm.lobby.$sitePanel.text(bm.mobile ? "" : bm.siteName);
        bm.connected = true;
        ax(); if (bm.quit == true) { f(false); return } if (bm.params.loginName == "") { bm.lobby.loginShow() } else { bm.loginData = {};
            bm.loginData.player = bm.params.loginName;
            cc = bm.params.sessionKey;
            cd = bm.params.loginPassword; if (cc != "") { g = { Response: "Login", SessionKey: cc };
                bm.eSeed = cc } else { g = { Response: "LoginRequest" };
                bm.loginData.password = cd;
                bm.loginData.valCode = "" } g.Player = bm.params.loginName;
            bU(g) } }

    function aX(ce) { var cd, g, cc;
        cd = r(ce); if (cd == null || !cd.graphicsMade) { return } g = (ce.Show == "Yes");
        cc = (ce.Type == "R" && cd.holeCards < 7);
        cd.outNextHandCheck(false);
        cd.outNextHandShow(g);
        cd.outNextBlindCheck(false);
        cd.outNextBlindShow(g && cc) }

    function a5(cd) { var cc, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } g = (cd.Check == "Yes");
        cc.straddleCheck(g) }

    function Z(cc) { var g;
        g = r(cc); if (g == null || !g.graphicsMade) { return } g.liveStraddle = (cc.Live == "Yes");
        g.straddleUpdate() }

    function A(ce) { var cc, cf, cd, g;
        cc = r(ce); if (cc == null || !cc.graphicsMade) { return } cf = bu(ce.Street);
        cd = []; for (g = 1; g <= 8; g++) { cd[g] = bu(ce.Cards[g - 1]) } cc.dealStreet(cf, cd) }

    function aS(cc) { var g = r(cc); if (g == null) { return } g.suspendChat = aj(cc.Suspend) == "Yes" }

    function ay(ce) { var cd, g, cc;
        cd = r(ce); if (cd == null) { return } cd.password = ce.Password == "Yes";
        cc = cd.seats;
        cd.seats = bu(ce.Seats); if (cd.seats < 0 || cd.seats > 10) { cd.seats = 0 } if (cd.graphicsMade && cc != cd.seats) { cd.refreshTable(); return } cd.dealer = bu(ce.Dealer);
        cd.turn = bu(ce.Turn);
        cd.totalPot = aj(ce.Total);
        cd.liveStraddle = ce.Straddle == "Yes"; for (g = 1; g <= 10; g++) { cd.playerName[g] = aj(ce.Player[g - 1]);
            cd.playerTitle[g] = aj(ce.Title[g - 1]);
            cd.playerLevel[g] = aj(ce.Level[g - 1]);
            cd.playerCustom[g] = aj(ce.Custom[g - 1]);
            cd.playerRealName[g] = aj(ce.RealName[g - 1]);
            cd.playerAvatar[g] = bu(ce.Avatar[g - 1]);
            cd.playerAvatarCrc[g] = aj(ce.AvatarCrc[g - 1]);
            gender = aj(ce.Gender[g - 1]);
            cd.playerGender[g] = aj(ce.Gender[g - 1]) == "F" ? bm.lang.AccountFemale : bm.lang.AccountMale;
            cd.playerLocation[g] = aj(ce.Location[g - 1]);
            cd.playerAction[g] = bm.playerAction[bu(ce.Action[g - 1])];
            cd.playerChips[g] = aj(ce.Chips[g - 1]);
            cd.playerTime[g] = bm.lang.GameSeconds.split("%1%").join(aj(ce.Time[g - 1]));
            cd.playerAway[g] = aj(ce.Away[g - 1]);
            cd.playerBet[g] = bu(ce.Bet[g - 1]); if (cd.getPlayerSeat() == g && cd.holeCards == 7) { cd.cardNum[3] = bu(ce.Card3[g - 1]);
                cd.cardNum[4] = bu(ce.Card4[g - 1]);
                cd.cardNum[5] = bu(ce.Card5[g - 1]);
                cd.cardNum[6] = bu(ce.Card6[g - 1]) } if (cd.getPlayerSeat() == g && cd.isFaceDown == false) { cd.holeCard[1][g] = cd.cardNum[1];
                cd.holeCard[2][g] = cd.cardNum[2];
                cd.holeCard[3][g] = cd.cardNum[3];
                cd.holeCard[4][g] = cd.cardNum[4];
                cd.holeCard[5][g] = cd.cardNum[5];
                cd.holeCard[6][g] = cd.cardNum[6];
                cd.holeCard[7][g] = cd.cardNum[7] } else { cd.holeCard[1][g] = bu(ce.Card1[g - 1]);
                cd.holeCard[2][g] = bu(ce.Card2[g - 1]);
                cd.holeCard[3][g] = bu(ce.Card3[g - 1]);
                cd.holeCard[4][g] = bu(ce.Card4[g - 1]);
                cd.holeCard[5][g] = bu(ce.Card5[g - 1]);
                cd.holeCard[6][g] = bu(ce.Card6[g - 1]);
                cd.holeCard[7][g] = bu(ce.Card7[g - 1]) } } for (g = 1; g <= 9; g++) { cd.potChips[g] = bu(ce.Pot[g - 1]) } for (g = 1; g <= 5; g++) { cd.boardCard[g] = bu(ce.Board[g - 1]) } cd.drawTable() }

    function aV(ce) { var cd, cf, cc, g;
        cd = r(ce); if (cd == null || !cd.graphicsMade) { return } cf = aj(ce.Left);
        cc = aj(ce.Middle);
        g = aj(ce.Right);
        cd.setTableBanners(cf, cc, g) }

    function l(cd) { var cc, g;
        cc = r(cd); if (cc == null || !cc.graphicsMade) { return } g = aj(cd.Cap);
        cc.setTableCapBanner(g) }

    function t(ce) { var cd, g, cc;
        cd = r(ce); if (cd == null) { return } g = aj(ce.Game);
        cc = aj(ce.Straddle) == "Yes";
        cd.changeGame(g, cc) }

    function ae(cc) { var g, cd;
        g = r(cc); if (g == null) { return } cd = aj(cc.Graphic);
        g.changeImage(cd) }

    function aB(g) { var cc, ch, ce, cd, cj, cg, ci, cf;
        cc = bu(g.Count);
        ch = "";
        ce = aj(g.Desc); if (ce != "") { ch = ch + ce + "<br>\r\n" } ch = ch + "<pre>"; for (cd = 0; cd < cc; cd++) { cj = aj(g.Line[cd]); if (cd > 0 && bm.local.decimalMark != ".") { cj = cj.split(".").join(bm.local.decimalMark) } ch = ch + (a6(cj) + "\r\n") } ch = ch + "</pre>"; if (g.Target == "Lobby") { cg = bm.lang.InfoTitle + " - " + aD(g.Table);
            bm.lobby.infoShow(cg, ch) } else { ci = r(g); if (ci == null || !ci.graphicsMade) { return } cf = ci.infoDialog;
            cf.controls.generalInfo.setText(ch) } }

    function k(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.setTableMessage(aj(cc.Text)) }

    function d(cd) { var cc, g;
        cc = r(cd); if (cc == null) { return } g = cd.Text; if (bm.local.decimalMark != ".") { g = g.split(".").join(bm.local.decimalMark) } cc.headerCaption(g) }

    function ao(g) { bm.sitting = g.Tables }

    function U(g) { bm.waiting = g.Tables }

    function aJ(ce) { var cc, cg, cf, g, cd;
        cc = r(ce); if (cc == null || !cc.graphicsMade) { return } cg = bu(ce.Seat); if (cg < 1 || cg > cc.seats) { return } cf = bu(ce.Time);
        cd = aj(ce.Beep) == "Yes"; if (cf == 0) { cc.seat[cg].timeExpires = 0 } else { g = new Date();
            g.setTime(g.getTime() + cf * 1000);
            cc.seat[cg].timeExpires = g.getTime() } cc.seat[cg].showTimer(); if (cd && cc.getPlayerSeat() == cg) { bI("beep") } }

    function G(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.totalPot = bu(cc.Total);
        g.updateTotal() }

    function bt(cj) { var cu, cs, cp, cn, ck, cd, cc, cv, cx, ci, cm, cq, cr, ce, co, ch, cw, cf, ct, g, cg, cl;
        ci = bm.lobby.sitnGoGrid.selrow; if (ci < 0) { cv = "" } else { cv = bm.data.SitnGo.rows[ci].id } cm = bm.lobby.tourneyGrid.selrow; if (cm < 0) { cx = "" } else { cx = bm.data.Tourney.rows[cm].id } co = cj.Clear == "Yes"; if (co) { bm.data.Tourney.urows.length = 0;
            cp = 0 } else { cp = bm.data.Tourney.urows.length } ch = bu(cj.Count);
        cl = bm.local.timeFormat == "12"; for (cu = 0; cu < ch; cu++) { cn = aj(cj.ID[cu]); if (cn == "") { continue } g = {};
            g.id = cn;
            g.bold = (bm.sitting.indexOf("T" + cn) > -1) || (bm.waiting.indexOf("T" + cn) > -1);
            g.primary = aj(cj.Primary[cu]) == "Yes";
            cg = g.primary ? "p" : "s";
            g.sng = aj(cj.SnG[cu]) == "Yes";
            g.shootout = aj(cj.Shootout[cu]) == "Yes";
            g.game = aj(cj.Game[cu]);
            g.gameIndex = bu(cj.GameIndex[cu]);
            cd = aj(cj.Buyin[cu]);
            cc = aj(cj.EntryFee[cu]);
            cr = aj(cj.Rebuy[cu]);
            ce = aj(cj.Ticket[cu]);
            g.buyinSort = cg + ("0000000000" + bu(cd).toFixed(2)).substr(-14);
            g.buyin = bg(ab(cd) + "+" + ab(cc), g.primary);
            g.buyinTotal = bu(cd) + bu(cc);
            g.rebuy = cr != "";
            g.buyin = g.buyin + cr + ce;
            g.ts = aj(cj.TS[cu]);
            cw = aj(cj.PreReg[cu]) == "Yes";
            cf = aj(cj.Reg[cu]);
            ct = aj(cj.Max[cu]); if (cw) { g.reg = "x/" + ct } else { g.reg = cf + "/" + ct } while (cf.length < 4) { cf = "0" + cf } while (ct.length < 4) { ct = "0" + ct } g.regSort = cf + "/" + ct;
            g.tables = aj(cj.Tables[cu]);
            g.starts = aj(cj.Starts[cu]);
            g.startsSort = g.starts;
            cq = aj(cj.StartTime[cu]); if (g.starts == "Time") { g.starts = bm.lang.StatusStartsTime.split("%1%").join(b2(cq, false, cl, false));
                g.startsSort = bm.lang.StatusStartsTime.split("%1%").join(b2(cq, false, false, true)) } g.startMin = aj(cj.StartMin[cu]);
            g.startTime = b2(cq, false, cl, false);
            g.startCode = aj(cj.StartCode[cu]) == "Yes";
            g.running = aj(cj.Running[cu]);
            g.password = aj(cj.Password[cu]);
            ck = false; if (co == false) { for (cs = 0; cs < cp; cs++) { if (cn == bm.data.Tourney.urows[cs].id) { ck = true;
                        bm.data.Tourney.urows[cs] = g; break } } } if (ck == false) { bm.data.Tourney.urows.push(g) } } bm.lobby.tourneyFilterData();
        bm.lobby.tourneySelectID(cx);
        bm.lobby.tourneyGrid.sort();
        bm.lobby.tourneySelect(bm.lobby.tourneyGrid.selrow);
        bm.lobby.tourneyTabCaption();
        bm.lobby.sitnGoFilterData();
        bm.lobby.sitnGoSelectID(cv);
        bm.lobby.sitnGoGrid.sort();
        bm.lobby.sitnGoSelect(bm.lobby.sitnGoGrid.selrow);
        bm.lobby.sitnGoTabCaption() }

    function bc(g) { bm.lobby.transferConfirmShow(g.Message, g.Recipient, g.Amount, g.Primary) }

    function bY(cc) { var g = r(cc); if (g == null || !g.graphicsMade) { return } g.boardCard[4] = bu(cc.Board4);
        g.dealTurn() }

    function a3(ce) { var g, ci, cf, cj, cm, cc, cn, cl, ch, ck, cd, cg;
        g = aj(ce.Table);
        ci = aj(ce.Type);
        cf = bu(ce.Count);
        cd = aj(ce.LateReg);
        cg = aj(ce.SnG) == "Yes";
        cj = 0;
        cm = false;
        cc = false;
        cn = []; for (ch = 0; ch < cf; ch++) { cl = aj(ce.Wait[ch]); if (cl == bm.loginData.player) { cj = ch;
                cm = true } else { if (cl == bm.loginData.player + " *") { cj = ch;
                    cc = true } } ck = {};
            ck.pos = ch + 1;
            ck.player = cl;
            cn.push(ck) } if (ci == "R") { bm.data.RingWait.rows = cn;
            bm.lobby.ringWaitGrid.update(); if (cm == true) { cl = bm.lang.LobbyButtonRingUnjoin } else { cl = bm.lang.LobbyButtonRingJoin } bm.lobby.ringWaitBtn.setCaption(cl);
            bm.lobby.ringWait2Btn.setCaption(cl) } else { cl = bm.lang.LobbyColumnTrnyWaiting; if (cf > 0) { cl = cl + ": " + cf } if (cg) { bm.data.SitnGoWait.rows = cn;
                bm.lobby.sitnGoWaitGrid.update();
                bm.lobby.sitnGoWaitGrid.headerCaption(1, cl) } else { bm.data.TourneyWait.rows = cn;
                bm.lobby.tourneyWaitGrid.update();
                bm.lobby.tourneyWaitGrid.headerCaption(1, cl) } if (cc == true) { cm = true } if (cm == true) { cl = bm.lang.LobbyButtonTrnyUnregister } else { if (cd == "Yes") { cl = bm.lang.LobbyButtonTrnyRegLate } else { cl = bm.lang.LobbyButtonTrnyRegister } } if (cg) { bm.lobby.sitnGoRegisterBtn.setCaption(cl);
                bm.lobby.sitnGoRegister2Btn.setCaption(cl);
                bm.lobby.sitnGoStartNow.show(cm && v(true));
                bm.lobby.sitnGoStartNow.setCheck(cc) } else { bm.lobby.tourneyRegisterBtn.setCaption(cl);
                bm.lobby.tourneyRegister2Btn.setCaption(cl);
                bm.lobby.tourneyStartNow.show(cm && v(false));
                bm.lobby.tourneyStartNow.setCheck(cc) } } }

    function bM(cg) { var cf, g, ce, ci, cd, ch, cc;
        cf = this;
        cf.modalList = [];
        cf.$dialog = cg;
        cf.dialog = new bp(cf.$dialog, null, { shadeparent: cf, title: bm.lang.LobbyCaptionTitle, removeonclose: true, minwidth: 640, minheight: 480, onresize: function() { cf.resize() } });
        aW();
        cf.modalList.push(cf.dialog);
        cf.menuInit();
        cf.$sitePanel = $("#SitePanel", cf.$dialog).css({ color: bm.color.ListText, backgroundColor: bm.color.List });
        cf.$siteMobile = $("#SiteMobile", cf.$dialog).css("overflow", "hidden");
        cf.$closeBtn = $(".closebtn", cf.$dialog).on("touchstart mousedown", function(cj) { cf.close(); return false });
        cf.$openTableBox = $("#OpenTableBox");
        cf.$openTableControls = $("#OpenTableControls");
        cf.createDialogs();
        cf.loginTabSetup();
        cf.ringTabSetup();
        cf.tourneyTabSetup();
        cf.sitnGoTabSetup();
        cf.mobileButtonSetup();
        g = [bm.lang.LobbyCaptionLogins, bm.lang.LobbyCaptionRingGames, bm.lang.LobbyCaptionTournaments, bm.lang.LobbyCaptionSitnGos, bm.lang.LobbyCaptionOpen];
        ce = [true, true, true, bm.params.sitAndGoTab, false];
        cf.lobbyTabs = new aZ($(".tabs", cf.$dialog), g, ce, function(cj, ck) { cf.lobbyTabsChange(cj, ck) });
        cf.lobbyTabs.setTab(0); if (bm.mobile) { cf.guiChange() } else { ci = cf.$dialog.width();
            cd = cf.$dialog.height();
            ch = bm.$webClient.width();
            cc = bm.$webClient.height(); if (ci > ch) { ci = ch } if (cd > cc) { cd = cc } if (ci != 706 || cd != 568) { cf.$dialog.css({ width: ci, height: cd }) } cf.dialog.show(false) } cf.resize() } bM.prototype.aboutCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#About");
        cd = new bp(g, cc, { title: bm.lang.AboutTitle });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.about = cd };
    bM.prototype.aboutShow = function() { var g = this;
        $("#about_title").text("Poker Mavens");
        $("#about_license").text(bm.licenseType + " " + bm.clientVersion);
        $("#about_copyright").html("Copyright &copy; " + bm.copyright + " Kent Briggs");
        $("#about_company").text("Briggs Softworks");
        $("#about_link a").attr("href", "http://www.briggsoft.com").text("www.briggsoft.com");
        g.about.show(true, bm.mobile) };
    bM.prototype.accountChangeShow = function() { var g, cc, cd;
        g = this;
        cd = g.accountInfo;
        cd.setTitle(bm.lang.AccountChange);
        $("#ai_custom").toggle(bm.customEdit);
        cd.show(true, bm.mobile);
        cd.controls.aiPlayer.$input.css("color", bm.color.ListDisabled);
        cd.controls.aiPlayer.setText(bm.loginData.player);
        cd.controls.aiPlayer.enable(false);
        cd.controls.aiRealName.setText(bm.loginData.realName); if (bm.loginData.gender == "Female") { cd.controls.aiFemale.setCheck(true) } else { cd.controls.aiMale.setCheck(true) } cd.controls.avatarSlider.setScale(cd.scale);
        cd.controls.avatarSlider.increment = 1 / (bm.maxAvatar - bm.minAvatar);
        cc = (bm.loginData.avatar - bm.minAvatar) / (bm.maxAvatar - bm.minAvatar);
        cd.controls.avatarSlider.setValue(cc, true);
        cd.controls.aiLocation.setText(bm.loginData.location);
        cd.controls.aiPassword1.setText("");
        cd.controls.aiPassword2.setText("");
        $("#ai_pw_desc").text(bm.lang.AccountPWDesc2);
        cd.controls.aiEmail.setText(bm.loginData.email);
        cd.controls.aiCustom.setText(bm.loginData.custom) };
    bM.prototype.accountCreateShow = function() { var g, cc;
        g = this;
        cc = g.accountInfo;
        cc.setTitle(bm.lang.AccountNew);
        $("#ai_custom").toggle(bm.customEdit);
        cc.show(true, bm.mobile);
        cc.controls.aiPlayer.$input.css("color", bm.color.ListText);
        cc.controls.aiPlayer.enable(true);
        $("#ai_pw_desc").text(bm.lang.AccountPWDesc);
        cc.controls.avatarSlider.setScale(cc.scale);
        cc.controls.avatarSlider.setValue(0, true);
        cc.controls.aiPassword1.setText("");
        cc.controls.aiPassword2.setText("") };
    bM.prototype.accountInfoAvatar = function(ce) { var cc, cf, g, cd;
        cc = this;
        cf = cc.accountInfo;
        cf.data.aiAvatar = Math.round(ce * (bm.maxAvatar - bm.minAvatar)) + bm.minAvatar;
        $("#ai_avatar_label").text(bm.lang.AccountAvatar + " " + cf.data.aiAvatar);
        g = cf.data.aiAvatar; if (g == 0) { $("#ai_avatar_image").css("background", "url('Avatar?Player=" + encodeURIComponent(bm.loginData.player) + "&Crc=" + bm.loginData.avatarCrc + "') no-repeat") } else { cd = ((g - 1) * -32) + "px 0px";
            $("#ai_avatar_image").css("background", "url('Image?Name=Avatars&Crc=" + bm.crc.image + "') no-repeat " + cd) } };
    bM.prototype.accountInfoAvatarPrev = function() { var g, cd, cc;
        g = this;
        cd = g.accountInfo;
        cc = cd.controls.avatarSlider.value - cd.controls.avatarSlider.increment;
        cd.controls.avatarSlider.setValue(cc, true) };
    bM.prototype.accountInfoAvatarNext = function() { var g, cd, cc;
        g = this;
        cd = g.accountInfo;
        cc = cd.controls.avatarSlider.value + cd.controls.avatarSlider.increment;
        cd.controls.avatarSlider.setValue(cc, true) };
    bM.prototype.accountInfoCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#AccountInfo");
        cd = new bp(g, cc, {});
        $("#ai_player_label").text(bm.lang.AccountPlayer);
        cd.controls.aiPlayer = new aT($("#ai_player_input"), { border: true });
        $("#ai_player_desc").text(bm.lang.AccountPlayerDesc).css("color", bm.color.ListDisabled);
        $("#ai_real_label").text(bm.lang.AccountReal);
        cd.controls.aiRealName = new aT($("#ai_real_input"), { border: true });
        $("#ai_real_desc").text(bm.lang.AccountRealDesc).css("color", bm.color.ListDisabled);
        $("#ai_gender_label").text(bm.lang.AccountGender);
        cd.controls.aiMale = new aH($("#ai_gender_male"), bm.lang.AccountMale);
        cd.controls.aiMale.setCheck(true);
        cd.controls.aiFemale = new aH($("#ai_gender_female"), bm.lang.AccountFemale);
        $("#ai_avatar_label").text(bm.lang.AccountAvatar);
        new C($("#ai_avatar_prev"), bm.arrowL, 20, function() { cc.accountInfoAvatarPrev() });
        cd.controls.avatarSlider = new ad($("#ai_avatar_slider"), 1 / (bm.maxAvatar - bm.minAvatar + 1), function(ce) { cc.accountInfoAvatar(ce) });
        new C($("#ai_avatar_next"), bm.arrowR, 20, function() { cc.accountInfoAvatarNext() });
        $("#ai_loc_label").text(bm.lang.AccountLocation);
        cd.controls.aiLocation = new aT($("#ai_loc_input"), { border: true });
        $("#ai_loc_desc").text(bm.lang.AccountLocationDesc).css("color", bm.color.ListDisabled);
        $("#ai_pw_label1").text(bm.lang.AccountPWSelect);
        cd.controls.aiPassword1 = new aT($("#ai_pw_input1"), { border: true, password: true });
        $("#ai_pw_label2").text(bm.lang.AccountPWConfirm);
        cd.controls.aiPassword2 = new aT($("#ai_pw_input2"), { border: true, password: true });
        $("#ai_pw_desc").text(bm.lang.AccountPWDesc).css("color", bm.color.ListDisabled);
        $("#ai_email_label").text(bm.lang.AccountEmail);
        cd.controls.aiEmail = new aT($("#ai_email_input"), { border: true });
        $("#ai_email_desc").text(bm.lang.AccountEmailDesc).css("color", bm.color.ListDisabled);
        $("#ai_custom_label").text(bm.customCaption);
        $("#ai_custom_desc").text(bm.customDescription).css("color", bm.color.ListDisabled);
        cd.controls.aiCustom = new aT($("#ai_custom_input"), { border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.accountInfoOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.accountInfo = cd };
    bM.prototype.accountInfoOk = function() { var cd, cf, cc, g, ce;
        cd = this;
        cf = cd.accountInfo;
        cc = cf.controls.aiPassword1.getText();
        g = cf.controls.aiPassword2.getText(); if (cc != g) { cd.messageShow(bm.lang.AccountPWError); return } ce = { Response: "ChangeAccount" };
        ce.RealName = cf.controls.aiRealName.getText(); if (cf.controls.aiFemale.isChecked()) { ce.Gender = "Female" } else { ce.Gender = "Male" } ce.Avatar = cf.data.aiAvatar;
        ce.Location = cf.controls.aiLocation.getText(); if (cc != "") { ce.Hash = aa(cc) } ce.Email = cf.controls.aiEmail.getText(); if (bm.customEdit == true) { ce.Custom = cf.controls.aiCustom.getText() } if (cf.title == bm.lang.AccountNew) { ce.Response = "NewAccount";
            ce.Player = cf.controls.aiPlayer.getText() } bU(ce) };
    bM.prototype.accountInfoValidate = function() { var g, cd, cc;
        g = this;
        cd = g.accountInfo;
        cd.close(); if (cd.title == bm.lang.AccountNew) { g.loginShow();
            cc = g.login;
            cc.controls.loginNameInput.setText(cd.controls.aiPlayer.getText());
            cc.controls.loginPWInput.setText(cd.controls.aiPassword1.getText()) } else { bm.loginData.realName = cd.controls.aiRealName.getText();
            bm.loginData.avatar = cd.data.aiAvatar; if (cd.controls.aiFemale.isChecked()) { bm.loginData.gender = "Female" } else { bm.loginData.gender = "Male" } bm.loginData.location = cd.controls.aiLocation.getText();
            bm.loginData.email = cd.controls.aiEmail.getText() } };
    bM.prototype.arrangeCascade = function() { var cd, cg, cc, g, cf, ce;
        cd = this;
        cg = cd.arrangeWindows;
        cc = cg.controls.arrangeLobby.isChecked();
        bJ("arrangeLobby", cc);
        cg.close();
        ce = bm.tables.length; if (cc) { ce++ } if (ce == 0) { return } bm.winOfsX = 10;
        bm.winOfsY = 10; if (cc) { cd.popoutChatClose();
            cd.info.close();
            cd.news.close();
            cd.faq.close();
            cd.$dialog.css({ left: bm.winOfsX, top: bm.winOfsY, width: 706, height: 568 });
            aW();
            cd.resize();
            cd.lobbyFront() } for (g = 0; g < bm.tables.length; g++) { cf = bm.tables[g];
            cf.infoClose();
            cf.$dialog.css({ left: bm.winOfsX, top: bm.winOfsY, width: 706, height: 568 });
            aW();
            cf.resizeTable();
            cf.resizeFinish();
            cf.bringToFront() } };
    bM.prototype.arrangeTile = function() { var cr, cs, g, co, ct, cn, ce, cu, cc, ck, cp, ch, cf, cd, ci, cm, cl, cq, cg, cj;
        cr = this;
        cs = cr.arrangeWindows;
        g = cs.controls.arrangeLobby.isChecked();
        bJ("arrangeLobby", g);
        cs.close();
        ce = bm.tables.length; if (g) { ce++ } if (ce == 0) { return } bm.winOfsX = 40;
        bm.winOfsY = 40;
        cl = bm.$webClient.width() - 5;
        cq = bm.$webClient.height() - 5;
        ck = 0;
        cp = 0;
        cj = 0;
        cg = 0; for (ct = 1; ct <= ce; ct++) { cn = Math.ceil(ce / ct);
            cu = cl / ct;
            cc = (cu - 6) * (510 / 700) + 58; if (cc > (cq / cn)) { cc = cq / cn;
                cu = (cc - 58) * (700 / 510) + 6 } if (cu > ck) { ck = cu;
                cp = cc;
                cg = cn;
                cj = ct } } if (ck < 356 || cp < 313) { ck = 356;
            cp = 313 } if (ck * cj > cl && cj > 1) { cd = (cl - ck) / (cj - 1);
            cm = 0 } else { cd = ck;
            cm = (cl - (cj * ck)) / 2 } if (cp * cg > cq && cg > 1) { ci = (cq - cp) / (cg - 1) } else { ci = cp } ch = cm;
        cf = 0;
        ct = 0; if (g) { cr.popoutChatClose();
            cr.info.close();
            cr.news.close();
            cr.faq.close(); if (ck < 640) { cu = 640 } else { cu = ck } if (cp < 480) { cc = 480 } else { cc = cp } cr.$dialog.css({ left: ch, top: cf, width: cu, height: cc });
            cr.resize();
            cr.lobbyFront();
            ch = ch + cd;
            ct++; if (ct == cj) { ct = 0;
                ch = cm;
                cf = cf + ci } } for (co = 0; co < bm.tables.length; co++) { table = bm.tables[co];
            table.infoClose();
            table.$dialog.css({ left: ch, top: cf, width: ck, height: cp });
            table.resizeTable();
            table.resizeFinish();
            table.bringToFront();
            ch = ch + cd;
            ct++; if (ct == cj) { ct = 0;
                ch = cm;
                cf = cf + ci } } };
    bM.prototype.arrangeWindowsCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#ArrangeWindows");
        cd = new bp(g, cc, { title: bm.lang.ArrangeTitle });
        cd.controls.arrangeLobby = new b($("#aw_lobby"), bm.lang.ArrangeLobby);
        new C($("#aw_tile", g), bm.lang.ArrangeTile, 25, function() { cc.arrangeTile() });
        new C($("#aw_cascade", g), bm.lang.ArrangeCascade, 25, function() { cc.arrangeCascade() });
        new C($(".cancelbtn", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.arrangeWindows = cd };
    bM.prototype.arrangeWindowsShow = function() { var g, cc;
        g = this;
        cc = g.arrangeWindows;
        cc.controls.arrangeLobby.setCheck(bm.local.arrangeLobby);
        cc.show(true, bm.mobile) };
    bM.prototype.balanceCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#Balance");
        cd = new bp(g, cc, { title: "" });
        $("#bal_availcap").text(bm.lang.BalanceAvailable);
        $("#bal_playcap").text(bm.lang.BalanceInPlay);
        $("#bal_totalcap").text(bm.lang.BalanceTotal);
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.balance = cd };
    bM.prototype.balance2Create = function() { var cc, g, cd;
        cc = this;
        g = $("#Balance2");
        cd = new bp(g, cc, { title: "" });
        $("#bal2_primary").text(bm.lang.BalancePrimary);
        $("#bal2_availcap1").text(bm.lang.BalanceAvailable);
        $("#bal2_playcap1").text(bm.lang.BalanceInPlay);
        $("#bal2_totalcap1").text(bm.lang.BalanceTotal);
        $("#bal2_secondary").text(bm.lang.BalanceSecondary);
        $("#bal2_availcap2").text(bm.lang.BalanceAvailable);
        $("#bal2_playcap2").text(bm.lang.BalanceInPlay);
        $("#bal2_totalcap2").text(bm.lang.BalanceTotal);
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.balance2 = cd };
    bM.prototype.balanceShow = function(cd, ch, cg, cc, ci, cf, g) { var ce = this; if (bm.secondary) { ce.balance2.setTitle(cd);
            $("#bal2_avail1").text(bg(ch, true));
            $("#bal2_play1").text(bg(cc, true));
            $("#bal2_total1").text(bg(cf, true));
            $("#bal2_avail2").text(bg(cg, false));
            $("#bal2_play2").text(bg(ci, false));
            $("#bal2_total2").text(bg(g, false));
            ce.balance2.show(true, bm.mobile) } else { ce.balance.setTitle(cd);
            $("#bal_balance").text(bm.lang.BalanceTitle);
            $("#bal_avail").text(bg(ch, true));
            $("#bal_play").text(bg(cc, true));
            $("#bal_total").text(bg(cf, true));
            ce.balance.show(true, bm.mobile) } };
    bM.prototype.chipTransferCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#ChipTransfer");
        cd = new bp(g, cc, { title: bm.lang.TransferTitle });
        $("#ct_chipslabel").text(bm.lang.TransferChips);
        cd.controls.ctChipsInput = new aT($("#ct_chipsinput"), { border: true });
        $("#ct_reciplabel").text(bm.lang.TransferRecipient);
        cd.controls.ctRecipInput = new aT($("#ct_recipinput"), { onEnterKey: function() { cc.chipTransferOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.chipTransferOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.chipTransfer = cd };
    bM.prototype.chipTransferOk = function() { var g, cd, cc;
        g = this;
        cd = g.chipTransfer;
        cd.close();
        cc = { Response: "Transfer" };
        cc.Action = "Confirm";
        cc.Amount = bN(cd.controls.ctChipsInput.getText());
        cc.Recipient = cd.controls.ctRecipInput.getText();
        cc.Primary = cd.data.primary ? "Yes" : "No";
        bU(cc) };
    bM.prototype.chipTransferShow = function(cc) { var g, cd;
        g = this;
        cd = g.chipTransfer;
        cd.data.primary = cc; if (bm.secondary) { cd.setTitle(cc ? bm.lang.TransferTitle1 : bm.lang.TransferTitle2) } cd.show(true, bm.mobile);
        cd.controls.ctChipsInput.setText("");
        cd.controls.ctRecipInput.setText(""); if (bm.hasTouch == false) { cd.controls.ctChipsInput.setFocus() } };
    bM.prototype.close = function() { if (bm.loggedIn == false || bm.quit) { f(false) } else { bU({ Response: "LogoutRequest" }) } };
    bM.prototype.contactCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#ContactAdmin");
        cd = new bp(g, cc, { title: bm.lang.ContactTitle });
        $("#ca_label1").text(bm.lang.ContactEmail);
        $("#ca_label2").text(bm.lang.ContactWeb);
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.contactAdmin = cd };
    bM.prototype.contactShow = function() { var cc, g;
        cc = this;
        g = bm.siteEmail; if (g == "") { $("#ca_email").text(bm.lang.ContactNone) } else { $("#ca_email").attr("href", "mailto:" + g + "?subject=" + encodeURIComponent(bm.siteName)).text(g) } if (bm.siteWeb == "") { $("#ca_web").text(bm.lang.ContactNone) } else { $("#ca_web").attr("href", bm.siteWeb).text(bm.siteWeb) } cc.contactAdmin.show(true, bm.mobile) };
    bM.prototype.createDialogs = function() { var g = this;
        g.aboutCreate();
        g.accountInfoCreate();
        g.arrangeWindowsCreate();
        g.balanceCreate();
        g.balance2Create();
        g.chipTransferCreate();
        g.contactCreate();
        g.displaySettingsCreate();
        g.faqCreate();
        g.getPasswordCreate();
        g.infoCreate();
        g.languageCreate();
        g.loginCreate();
        g.logoutConfirmCreate();
        g.newsCreate();
        g.noteListCreate();
        g.playerSearchCreate();
        g.popoutChatCreate();
        g.postFlopButtonsCreate();
        g.preFlopButtonsCreate();
        g.recoveryCreate();
        g.retryCreate();
        g.ringFilterCreate();
        g.ringPlayersCreate();
        g.sitnGoPlayersCreate();
        g.sitnGoRegCreate();
        g.soundCreate();
        g.startGameCreate();
        g.tableSelectCreate();
        g.tableSettingsCreate();
        g.tourneyFilterCreate();
        g.tourneyPlayersCreate();
        g.tourneyRegCreate();
        g.tourneyRegOptionCreate();
        g.transferConfirmCreate();
        aM(g, false);
        L(g, false) };
    bM.prototype.defaultSize = function() { var g = this;
        g.$dialog.css({ width: 706, height: 568 });
        g.resize() };
    bM.prototype.displaySettingsCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#DisplaySettings");
        cd = new bp(g, cc, { title: bm.lang.DisplayTitle });
        $("#Interface").text(bm.lang.DisplayInterface);
        cd.controls.guiDesktop = new aH($("#GUIDesktop"), bm.lang.DisplayDesktop);
        cd.controls.guiMobile = new aH($("#GUIMobile"), bm.lang.DisplayMobile);
        cd.controls.guiAuto = new aH($("#GUIAuto"), bm.lang.DisplayAutoDetect);
        $("#FontSize").text(bm.lang.DisplayFont);
        cd.controls.fontSmall = new aH($("#FontSmall"), bm.lang.DisplayFontSmall);
        cd.controls.fontNormal = new aH($("#FontNormal"), bm.lang.DisplayFontNormal);
        cd.controls.fontLarge = new aH($("#FontLarge"), bm.lang.DisplayFontLarge);
        $("#NumberFormat").text(bm.lang.DisplayNumber);
        cd.controls.numberFormat1 = new aH($("#NumberFormat1"), "12,345.67");
        cd.controls.numberFormat2 = new aH($("#NumberFormat2"), "12.345,67");
        $("#BlockedChat").text(bm.lang.DisplayBlocked);
        cd.controls.echoAsterisk = new aH($("#EchoAsterisk"), bm.lang.DisplayAsterisk);
        cd.controls.echoNothing = new aH($("#EchoNothing"), bm.lang.DisplayNothing);
        $("#ChatTimestamps").text(bm.lang.DisplayChatTime);
        cd.controls.lobbyChatTime = new b($("#LobbyChatTime"), bm.lang.DisplayLobbyChatTime);
        cd.controls.tableChatTime = new b($("#TableChatTime"), bm.lang.DisplayTableChatTime);
        $("#TimeFormat").text(bm.lang.DisplayTime);
        cd.controls.timeFormat12 = new aH($("#TimeFormat12"), bm.lang.DisplayTime12);
        cd.controls.timeFormat24 = new aH($("#TimeFormat24"), bm.lang.DisplayTime24);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.displaySettingsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.displaySettings = cd };
    bM.prototype.displaySettingsOk = function() { var cf, ch, cc, cg, g, ce, cd;
        cf = this;
        ch = cf.displaySettings; if (ch.controls.guiDesktop.isChecked()) { bJ("gui", "desktop") } else { if (ch.controls.guiMobile.isChecked()) { bJ("gui", "mobile") } else { bJ("gui", "auto") } } if (bm.local.gui == "auto") { cc = bm.hasTouch } else { cc = (bm.local.gui == "mobile") } if (ch.controls.fontSmall.isChecked()) { bJ("fontSize", "small") } else { if (ch.controls.fontLarge.isChecked()) { bJ("fontSize", "large") } else { bJ("fontSize", "normal") } } V(); if (ch.controls.numberFormat1.isChecked()) { bJ("decimalMark", ".");
            bJ("thouSeparator", ",") } else { bJ("decimalMark", ",");
            bJ("thouSeparator", ".") } bJ("chatBlockAsterisk", ch.controls.echoAsterisk.isChecked());
        cg = ch.controls.lobbyChatTime.isChecked();
        g = ch.controls.tableChatTime.isChecked();
        ch.close(); if (bm.local.lobbyChatTime != cg) { bJ("lobbyChatTime", cg);
            cf.lobbyChatUpdate() } if (bm.local.tableChatTime != g) { bJ("tableChatTime", g); for (ce = 0; ce < bm.tables.length; ce++) { bm.tables[ce].chatUpdate() } } cd = bm.local.timeFormat; if (ch.controls.timeFormat24.isChecked()) { bJ("timeFormat", "24") } else { bJ("timeFormat", "12") } if (cd != bm.local.timeFormat) { bU({ Response: "RefreshLists" }) } if (cc != bm.mobile) { bm.mobile = cc;
            cf.guiChange() } };
    bM.prototype.displaySettingsShow = function() { var g, cc;
        g = this;
        cc = g.displaySettings; if (bm.local.gui == "desktop") { cc.controls.guiDesktop.setCheck() } else { if (bm.local.gui == "mobile") { cc.controls.guiMobile.setCheck() } else { cc.controls.guiAuto.setCheck() } } if (bm.local.fontSize == "small") { cc.controls.fontSmall.setCheck() } else { if (bm.local.fontSize == "large") { cc.controls.fontLarge.setCheck() } else { cc.controls.fontNormal.setCheck() } } if (bm.local.decimalMark == ".") { cc.controls.numberFormat1.setCheck() } else { cc.controls.numberFormat2.setCheck() } if (bm.local.chatBlockAsterisk) { cc.controls.echoAsterisk.setCheck() } else { cc.controls.echoNothing.setCheck() } cc.controls.lobbyChatTime.setCheck(bm.local.lobbyChatTime);
        cc.controls.tableChatTime.setCheck(bm.local.tableChatTime); if (bm.local.timeFormat == "24") { cc.controls.timeFormat24.setCheck() } else { cc.controls.timeFormat12.setCheck() } cc.show(true, bm.mobile) };
    bM.prototype.faqCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#FAQ");
        cd = new bp(g, cc, { minwidth: 250, minheight: 150, onresize: function() { cc.faqResize() } });
        cd.controls.faqContent = new bC($(".faqcontent", g), false);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.close() });
        new C($(".save", g), bm.lang.DialogSave, 25, function() { a9(bm.siteName, cd.controls.faqContent.getText(), false) });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.faq = cd };
    bM.prototype.faqResize = function() { var g, cc;
        g = this;
        cc = g.faq;
        cc.controls.faqContent.updateScrollPosition() };
    bM.prototype.faqShow = function(cd) { var g, cc;
        g = this;
        cc = g.faq;
        cc.setTitle(bm.lang.FAQTitle);
        cc.show(bm.mobile, bm.mobile);
        cc.controls.faqContent.setScale(cc.scale);
        cc.controls.faqContent.setText(cd);
        cc.controls.faqContent.topScroll() };
    bM.prototype.fullScreenToggle = function() { var g = this; if (!bm.fullScreenRequest) { g.messageShow(bm.lang.LobbyMenuOptionsNoFullScreen) } else { b6(!T()) } };
    bM.prototype.getPasswordCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#Password");
        cd = new bp(g, cc, { title: bm.lang.PasswordTitle });
        cd.controls.getPasswordInput = new aT($("#pw_input"), { onEnterKey: function() { cc.getPasswordOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.getPasswordOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.getPassword = cd };
    bM.prototype.getPasswordOk = function() { var cf, ch, ci, cj, cg, cd, ce, g, cc;
        cf = this;
        ch = cf.getPassword;
        ch.close();
        ci = ch.controls.getPasswordInput.getText();
        cj = ch.data.table;
        cg = ch.data.tt;
        cd = ch.data.seat;
        ce = ch.data.command; if (cg == "T") { g = aD(cj) } else { g = cj } bm.passwords[cg + g] = ci;
        cc = { Response: ce };
        cc.Table = cj;
        cc.Type = cg;
        cc.Seat = cd;
        cc.Password = ci;
        bU(cc) };
    bM.prototype.getPasswordShow = function(ce, cd, ci, cg) { var cc, cf, ch, g;
        cc = this;
        cf = cc.getPassword;
        cf.data.table = ce;
        cf.data.tt = cd;
        cf.data.seat = ci;
        cf.data.command = cg;
        cf.show(true, bm.mobile); if (cd == "T") { ch = aD(ce) } else { ch = ce } g = bm.lang.PasswordPrompt.split("%1%").join(ch);
        $("#pw_label").text(g);
        cf.controls.getPasswordInput.setText(""); if (bm.hasTouch == false) { cf.controls.getPasswordInput.setFocus() } };
    bM.prototype.guiChange = function() { var cc, g;
        cc = this;
        cc.popoutChatClose();
        cc.info.close();
        cc.news.close();
        cc.faq.close();
        bm.debugLog.close();
        bm.winOfsX = 10;
        bm.winOfsY = 10;
        bs(); if (!cc.showMenu) { cc.menuToggle(true) } if (bm.mobile) { cc.guiScale();
            $("#Lobby > .header").hide();
            $("#Lobby > .menu").css({ top: 0, height: 40, "line-height": "40px", "font-size": "1.2em" }); if (bm.params.gradients) { $("#Lobby > .menu").css("backgroundImage", "url('Image?Name=Grad40')") } $("#Lobby > .menu_bold").css("width", 120);
            $("#Lobby > .menu ul").css("width", 270);
            $("#Lobby button").css("font-size", "1.2em");
            $("#MobileCap").show();
            $("#MenuCap").css("right", 0).append(cc.$closeBtn.css("top", 12));
            cc.$sitePanel.css({ top: 40, left: 0, right: 0, height: 3 });
            cc.lobbyTabs.$container.css({ top: 43, left: 0, right: 0, bottom: 0 });
            F(".shader", "borderRadius", "0px");
            cc.$loginSelected.add(cc.$ringSelected).add(cc.$tourneySelected).add(cc.$sitnGoSelected).css("font-size", "1.2em") } else { cc.$dialog.css({ left: bm.winOfsX, top: bm.winOfsY, width: 706, height: 568, transform: "scale(1)", borderRadius: "10px 10px 0px 0px", boxShadow: "3px 3px 10px 0px #404040" });
            cc.dialog.scale = 1;
            cc.scrollbarScale();
            aW();
            $("#Lobby > .header").show();
            $("#Lobby > .menu").css({ top: 30, height: 50, "line-height": "25px", "font-size": "1.0em" }); if (bm.params.gradients) { $("#Lobby > .menu").css("backgroundImage", "url('Image?Name=Grad25')") } $("#Lobby > .menu_bold").css("width", 100);
            $("#Lobby > .menu ul").css("width", 225);
            $("#Lobby > .header").append(cc.$closeBtn.css("top", 7));
            $("#Lobby button").css("font-size", "1.0em");
            $("#MobileCap").hide();
            $("#MenuCap").css("right", 3);
            cc.$sitePanel.css({ top: 55, left: 3, right: 3, height: 35 });
            cc.lobbyTabs.$container.css({ top: 90, left: 3, right: 3, bottom: 3 }); if (cc.lobbyTabs.getTab() == 4) { cc.lobbyTabs.setTab(0) } F(".shader", "borderRadius", "10px 10px 0px 0px");
            cc.$loginSelected.add(cc.$ringSelected).add(cc.$tourneySelected).add(cc.$sitnGoSelected).css("font-size", "1.0em") } cc.lobbyChatText.guiChange(bm.mobile);
        cc.mobileChatText.guiChange(bm.mobile);
        cc.lobbyOpenTables.show(bm.mobile);
        cc.lobbyDefault.show(!bm.mobile);
        cc.optionsArrange.show(!bm.mobile);
        cc.lobbyTabs.showTab(4, bm.mobile);
        cc.lobbyTabs.guiChange(bm.mobile);
        cc.loginGrid.guiChange(bm.mobile);
        cc.ringGrid.guiChange(bm.mobile);
        cc.sitnGoGrid.guiChange(bm.mobile);
        cc.tourneyGrid.guiChange(bm.mobile);
        cc.updateLobbyTitle();
        $(".resize", cc.$dialog).toggle(!bm.mobile);
        cc.resize(); for (g = 0; g < bm.tables.length; g++) { bm.tables[g].guiChange() } };
    bM.prototype.guiScale = function() { var ce, g, cd, cc;
        ce = this;
        g = bm.$webClient.width();
        cd = bm.$webClient.height();
        cc = g / bm.viewPort;
        ce.$dialog.css({ left: 0, top: 0, borderRadius: 0, boxShadow: "none", "transform-origin": "left top", transform: "scale(" + cc + ")", width: g / cc, height: cd / cc }).show();
        ce.dialog.scale = cc;
        ce.scrollbarScale() };
    bM.prototype.infoCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#Info");
        cd = new bp(g, cc, { minwidth: 250, minheight: 150, onresize: function() { cc.infoResize() } });
        cd.controls.infoContent = new bC($(".infocontent", g), false);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.close() });
        new C($(".save", g), bm.lang.DialogSave, 25, function() { a9(bm.siteName, cd.controls.infoContent.getText(), false) });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.info = cd };
    bM.prototype.infoResize = function() { var g, cc;
        g = this;
        cc = g.info;
        cc.controls.infoContent.updateScrollPosition() };
    bM.prototype.infoShow = function(ce, cd) { var g, cc;
        g = this;
        cc = g.info;
        cc.setTitle(ce);
        cc.show(bm.mobile, bm.mobile);
        cc.controls.infoContent.setScale(cc.scale);
        cc.controls.infoContent.setText(cd);
        cc.controls.infoContent.topScroll() };
    bM.prototype.languageCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#Language");
        cd = new bp(g, cc, { title: bm.lang.LanguageTitle });
        cd.controls.language1 = new aH($("#Language1"), bm.lang.Language1);
        cd.controls.language2 = new aH($("#Language2"), bm.lang.Language2); if (bm.languages > 2) { cd.controls.language3 = new aH($("#Language3"), bm.lang.Language3) } if (bm.languages > 3) { cd.controls.language4 = new aH($("#Language4"), bm.lang.Language4) } if (bm.languages > 4) { cd.controls.language5 = new aH($("#Language5"), bm.lang.Language5) } $("#LanguageNote").text(bm.lang.LanguageNote).css("color", bm.color.ListDisabled);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.languageOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.language = cd };
    bM.prototype.languageOk = function() { var g, cc;
        g = this;
        cc = g.language; if (cc.controls.language1.isChecked()) { bJ("language", 1) } else { if (cc.controls.language2.isChecked()) { bJ("language", 2) } else { if (bm.languages > 2 && cc.controls.language3.isChecked()) { bJ("language", 3) } else { if (bm.languages > 3 && cc.controls.language4.isChecked()) { bJ("language", 4) } else { if (bm.languages > 4 && cc.controls.language5.isChecked()) { bJ("language", 5) } } } } } cc.close() };
    bM.prototype.languageShow = function() { var g, cc;
        g = this;
        cc = g.language; switch (bm.local.language) {
            case 1:
                cc.controls.language1.setCheck(); break;
            case 2:
                cc.controls.language2.setCheck(); break;
            case 3:
                if (bm.languages > 2) { cc.controls.language3.setCheck() } break;
            case 4:
                if (bm.languages > 3) { cc.controls.language4.setCheck() } break;
            case 5:
                if (bm.languages > 4) { cc.controls.language5.setCheck() } break } cc.show(true, bm.mobile) };
    bM.prototype.lobbyChatEnter = function(cd) { var cc, g;
        cc = this;
        g = $.trim(cd); if (g == "") { return } if (bm.loggedIn == false) { cc.messageShow(bm.lang.MessageChatLogin) } else { bU({ Response: "LobbyChat", Text: g });
            cc.lobbyChatEdit.setText(""); if (bm.hasTouch) { cc.lobbyChatEdit.unFocus() } } };
    bM.prototype.lobbyChatDisplay = function(g) { var cc = this;
        cc.$lobbyChatGroup.toggle(g);
        cc.loginGrid.$grid.css("right", g ? "258px" : "3px");
        cc.loginGrid.resize() };
    bM.prototype.lobbyChatUpdate = function() { var cc, g, ce, cj, ci, cd, cf, ch, cg;
        cc = this;
        cg = cc.popoutChat;
        g = cg.isVisible(); if (g) { ce = cg.controls.popoutChatText } else { ce = cc.lobbyChatText } ch = bm.local.lobbyChatTime;
        ci = ""; for (cd = 0; cd < bm.lobbyChatQueue.length; cd++) { cj = bm.lobbyChatQueue[cd]; if (g && ch) { cf = "[" + cj.time + "] " } else { cf = "" } ci = ci + "<span>"; if (cj.player != "") { ci = ci + "<font color='" + cj.color1 + "'>" + cf + cj.title + cj.player + ":  </font><font color='" + cj.color2 + "'>" + cj.text + "</font>" } ci = ci + "</span><br>" } ce.setText(ci);
        ce.bottomScroll() };
    bM.prototype.lobbyFront = function() { var cc, g;
        cc = this; if (bm.mobile) { return } if (cc.$dialog.css("z-index") < bm.zTop) { for (g = 0; g < cc.modalList.length; g++) { cc.modalList[g].$dialog.css("z-index", ++bm.zTop) } } aG(cc.dialog) };
    bM.prototype.lobbyTabsChange = function(g, cf) { var cd = this,
            cc, ce; if (bm.mobile) { if (g != 4 && cf == 4) { for (cc = 0; cc < bm.tables.length; cc++) { bm.tables[cc].infoClose() } if (!cd.showMenu) { cd.menuToggle(true) } cd.lobbyTabs.$contents.eq(4).css({ top: 40, left: 3, right: 3, bottom: 3 }) } else { if (g == 4 && cf != 4) { if (bm.tables.length > 0) { cd.menuToggle(false) } for (cc = 0; cc < bm.tables.length; cc++) { bm.tables[cc].resizeTable();
                        bm.tables[cc].resizeFinish() } bm.returnTab = cf } } bm.soundOk = (g == 4);
            cd.updateLobbyTitle() } ce = false; if (g == 1) { cc = cd.ringGrid.selrow; if (cc >= 0 && cc < bm.data.Ring.rows.length && bm.data.Ring.rows[cc].startCode) { ce = true } } else { if (g == 2) { cc = cd.tourneyGrid.selrow; if (cc >= 0 && cc < bm.data.Tourney.rows.length && bm.data.Tourney.rows[cc].startCode) { ce = true } } else { if (g == 3) { cc = cd.sitnGoGrid.selrow; if (cc >= 0 && cc < bm.data.SitnGo.rows.length && bm.data.SitnGo.rows[cc].startCode) { ce = true } } } } cd.optionsStart.enable(ce && bm.loggedIn) };
    bM.prototype.loginCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#Login");
        cd = new bp(g, cc, { title: bm.lang.LoginTitle });
        $("#li_namelabel").text(bm.lang.LoginName);
        cd.controls.loginNameInput = new aT($("#li_nameinput"), { border: true, onEnterKey: function() { cc.loginOk() } });
        $("#li_pwlabel").text(bm.lang.LoginPassword);
        cd.controls.loginPWInput = new aT($("#li_pwinput"), { border: true, password: true, onEnterKey: function() { cc.loginOk() } });
        cd.controls.loginPWCheck = new b($("#li_remember"), bm.lang.LoginRemember);
        cd.controls.loginCreateBtn = new C($("#li_createbtn"), bm.lang.LoginAccount, 20, function() { cd.close();
            cc.accountCreateShow() });
        cd.controls.loginResetBtn = new C($("#li_resetbtn"), bm.lang.LoginResetPW, 20, function() { cc.resetPassword() });
        cd.controls.loginResendBtn = new C($("#li_resendbtn"), bm.lang.LoginResendVC, 20, function() { cc.resendValCode() });
        cd.controls.$loginValCodeLabel = $("#li_valcodelabel").text(bm.lang.LoginValCode);
        cd.controls.loginValCodeInput = new aT($("#li_valcodeinput"), { border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.loginOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.login = cd };
    bM.prototype.loginOk = function() { var cc, cd, g;
        cc = this;
        cd = cc.login;
        cc.logInOutBtn.enable(false);
        y("PlayerName", cd.controls.loginNameInput.getText());
        g = cd.controls.loginPWInput.getText(); if (cd.controls.loginPWCheck.isChecked() == false) { g = "" } y("PlayerPassword", g);
        y("RememberPassword", cd.controls.loginPWCheck.isChecked());
        bm.loginData = {};
        bm.loginData.player = cd.controls.loginNameInput.getText();
        bm.loginData.password = cd.controls.loginPWInput.getText();
        bm.loginData.valCode = cd.controls.loginValCodeInput.getText();
        bU({ Response: "LoginRequest", Player: bm.loginData.player });
        cd.close() };
    bM.prototype.loginSaveSort = function() { y("LoginSortColumn", bm.data.Login.sortCol);
        y("LoginSortAscend", bm.data.Login.sortAscend) };
    bM.prototype.loginSelect = function(g) { var cd, cc, ce;
        cd = this; if (g < 0 || g >= bm.data.Login.rows.length) { cc = "" } else { ce = bm.data.Login.rows[g];
            cc = ce.player + " (" + ce.real; if (ce.real != "") { cc = cc + " " } cc = cc + bm.lang.MouseOverFrom + " " + ce.location + ")" } cd.$loginSelected.text(cc) };
    bM.prototype.loginShow = function() { var g, cc;
        g = this;
        cc = g.login;
        cc.controls.loginCreateBtn.show(bm.newAccounts);
        cc.controls.loginResetBtn.show(bm.passwordRecovery);
        cc.controls.loginResendBtn.show(bm.passwordRecovery || bm.validateEmails);
        cc.controls.$loginValCodeLabel.toggle(bm.passwordRecovery || bm.validateEmails);
        cc.controls.loginValCodeInput.show(bm.passwordRecovery || bm.validateEmails);
        cc.controls.loginNameInput.setText(aj(R("PlayerName")));
        cc.controls.loginPWInput.setText(aj(R("PlayerPassword")));
        cc.controls.loginPWCheck.setCheck(aj(R("RememberPassword")) == "true");
        cc.show(true, bm.mobile); if (bm.hasTouch == false) { cc.controls.loginNameInput.setFocus() } };
    bM.prototype.loginTabSetup = function() { var g, cc;
        g = this;
        bm.data.Login = {};
        bm.data.Login.cols = 5;
        bm.data.Login.widths = [0.28, 0.12, 0.12, 0.12, 0.36];
        bm.data.Login.headers = [bm.lang.LobbyColumnLoginsPlayer, bm.lang.LobbyColumnLoginsColor, bm.lang.LobbyColumnLoginsNote, bm.lang.LobbyColumnLoginsBlock, bm.lang.LobbyColumnLoginsTime];
        bm.data.Login.fields = ["player", "real", "location", "color", "colorSort", "note", "block", "login", "loginSort"];
        bm.data.Login.fieldsShow = ["player", "color", "note", "block", "login"];
        bm.data.Login.fieldsSort = ["player", "colorSort", "note", "block", "loginSort"];
        bm.data.Login.fieldsNum = [false, true, false, false, false];
        bm.data.Login.fieldsHTML = [false, true, true, true, false];
        cc = bu(R("LoginSortColumn")); if (cc < 0 || cc >= bm.data.Login.cols) { cc = 0 } bm.data.Login.sortCol = cc;
        bm.data.Login.sortAscend = R("LoginSortAscend") != "false";
        bm.data.Login.sortable = true;
        bm.data.Login.rows = [];
        bm.data.Login.rowHeight = bm.mobile ? 24 : 32;
        g.loginGrid = new b3($("#LoginGrid", g.$dialog), bm.data.Login, function(cd) { g.loginSelect(cd) }, function() { aP(g.loginGrid.getValue("player")) }, function() { g.loginSaveSort() });
        g.$lobbyChatGroup = $("#LobbyChatGroup", g.$dialog);
        g.lobbyChatText = new bC($("#LobbyChatText", g.$dialog), false);
        g.lobbyChatBtn = new C($("#LobbyChatBtn", g.$dialog), bm.lang.LobbyButtonChatExt, 25, function() { g.popoutChatShow() });
        g.lobbyChatEdit = new aT($("#LobbyChatEdit", g.$dialog), { onEnterKey: function(cd) { g.lobbyChatEnter(cd) } });
        g.lobbyChatSendBtn = new C($("#LobbyChatSendBtn", g.$dialog), "&#8595;", 25, function() { g.lobbyChatEnter(g.lobbyChatEdit.getText()) });
        g.lobbyChatSendBtn.$button.css("border-radius", "0px");
        g.$loginSelected = $("#LoginSelected", g.$dialog);
        g.searchBtn = new C($("#SearchBtn", g.$dialog), bm.lang.LobbyButtonSearch, 40, function() { g.playerSearchShow() });
        g.notesBtn = new C($("#NotesBtn", g.$dialog), bm.lang.LobbyButtonNotes, 40, function() { g.noteListShow() });
        g.balanceBtn = new C($("#BalanceBtn", g.$dialog), bm.lang.LobbyButtonBalance, 40, function() { bU({ Response: "Balance" }) });
        g.logInOutBtn = new C($("#LogInOutBtn", g.$dialog), bm.lang.LobbyButtonLogin, 40, function() { if (bm.loggedIn == false) { g.loginShow() } else { g.close() } }) };
    bM.prototype.logoutConfirmCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.DialogConfirm });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.logoutConfirmOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.logoutConfirm = cd };
    bM.prototype.logoutConfirmOk = function() { this.logoutConfirm.close();
        f(false) };
    bM.prototype.logoutConfirmShow = function(g) { this.logoutConfirm.showMessage(g, true, bm.mobile) };
    bM.prototype.menuInit = function() { var cc = this,
            g;
        cc.$LobbyMenu = $("#LobbyMenu", cc.$dialog).text(bm.lang.LobbyMenuLobby);
        cc.lobbyLogins = new b1($("#LobbyLogins", cc.$dialog), bm.lang.LobbyCaptionLogins, function() { cc.lobbyTabs.setTab(0) }, true);
        cc.lobbyRingGames = new b1($("#LobbyRingGames", cc.$dialog), bm.lang.LobbyCaptionRingGames, function() { cc.lobbyTabs.setTab(1) }, true);
        cc.lobbyTournaments = new b1($("#LobbyTournaments", cc.$dialog), bm.lang.LobbyCaptionTournaments, function() { cc.lobbyTabs.setTab(2) }, true);
        cc.lobbySitnGos = new b1($("#LobbySitnGos", cc.$dialog), bm.lang.LobbyCaptionSitnGos, function() { cc.lobbyTabs.setTab(3) }, true);
        cc.lobbySitnGos.show(bm.params.sitAndGoTab);
        cc.lobbyOpenTables = new b1($("#LobbyOpenTables", cc.$dialog), bm.lang.LobbyCaptionOpen, function() { cc.lobbyTabs.setTab(4) }, true);
        cc.lobbyOpenTables.show(bm.mobile);
        cc.lobbyDefault = new b1($("#LobbyDefaultSize", cc.$dialog), bm.lang.TableMenuOptionsWindowSize, function() { cc.defaultSize() }, true);
        cc.lobbyExit = new b1($("#LobbyExit", cc.$dialog), bm.lang.LobbyMenuLobbyExit, function() { cc.close() }, true);
        $("#AccountMenu", cc.$dialog).text(bm.lang.LobbyMenuAccount);
        cc.accountLogin = new b1($("#AccountLogin", cc.$dialog), bm.lang.LobbyMenuAccountLogin, function() { cc.loginShow() }, true);
        cc.accountLogout = new b1($("#AccountLogout", cc.$dialog), bm.lang.LobbyMenuAccountLogout, function() { cc.close() }, true);
        cc.accountCreate = new b1($("#AccountCreate", cc.$dialog), bm.lang.LobbyMenuAccountCreate, function() { cc.accountCreateShow() }, true);
        cc.accountChange = new b1($("#AccountChange", cc.$dialog), bm.lang.LobbyMenuAccountChange, function() { cc.accountChangeShow() }, true);
        cc.accountBalance = new b1($("#AccountBalance", cc.$dialog), bm.lang.LobbyMenuAccountBalance, function() { bU({ Response: "Balance" }) }, false);
        cc.accountTickets = new b1($("#AccountTickets", cc.$dialog), bm.lang.LobbyMenuAccountTickets, function() { bU({ Response: "Tickets" }) }, false);
        cc.accountPermissions = new b1($("#AccountPermissions", cc.$dialog), bm.lang.LobbyMenuAccountPerm, function() { bU({ Response: "Permissions" }) }, false);
        g = bm.secondary ? bm.lang.LobbyMenuAccountTransfer1 : bm.lang.LobbyMenuAccountTransfer;
        cc.accountTransfer1 = new b1($("#AccountTransfer1", cc.$dialog), g, function() { cc.chipTransferShow(true) }, false);
        cc.accountTransfer2 = new b1($("#AccountTransfer2", cc.$dialog), bm.lang.LobbyMenuAccountTransfer2, function() { cc.chipTransferShow(false) }, false);
        g = bm.secondary ? bm.lang.LobbyMenuAccountRequest1 : bm.lang.LobbyMenuAccountRequest;
        cc.accountChipRequest1 = new b1($("#AccountChipRequest1", cc.$dialog), g, function() { bU({ Response: "BalanceReset", Primary: "Yes" }) }, false);
        cc.accountChipRequest2 = new b1($("#AccountChipRequest2", cc.$dialog), bm.lang.LobbyMenuAccountRequest2, function() { bU({ Response: "BalanceReset", Primary: "No" }) }, false);
        $("#OptionsMenu", cc.$dialog).text(bm.lang.LobbyMenuOptions);
        cc.optionsFullScreen = new b1($("#OptionsFullScreen", cc.$dialog), bm.lang.LobbyMenuOptionsFullScreen, function() { cc.fullScreenToggle() }, true);
        cc.optionsLanguage = new b1($("#OptionsLanguage", cc.$dialog), bm.lang.LobbyMenuOptionsLanguage, function() { cc.languageShow() }, true);
        cc.optionsArrange = new b1($("#OptionsArrange", cc.$dialog), bm.lang.LobbyMenuOptionsArrange, function() { cc.arrangeWindowsShow() }, true);
        cc.optionsDisplay = new b1($("#OptionsDisplay", cc.$dialog), bm.lang.LobbyMenuOptionsDisplay, function() { cc.displaySettingsShow() }, true);
        cc.optionsTable = new b1($("#OptionsTable", cc.$dialog), bm.lang.LobbyMenuOptionsTable, function() { cc.tableSettingsShow() }, true);
        cc.optionsSound = new b1($("#OptionsSound", cc.$dialog), bm.lang.LobbyMenuOptionsSound, function() { cc.soundShow() }, true);
        cc.optionsStart = new b1($("#OptionsStart", cc.$dialog), bm.lang.LobbyMenuOptionsStart, function() { cc.startGameShow() }, false);
        cc.optionsSearch = new b1($("#OptionsSearch", cc.$dialog), bm.lang.LobbyMenuOptionsSearch, function() { cc.playerSearchShow() }, true);
        cc.optionsNotes = new b1($("#OptionsNotes", cc.$dialog), bm.lang.LobbyMenuOptionsNotes, function() { cc.noteListShow() }, true);
        $("#HelpMenu", cc.$dialog).text(bm.lang.LobbyMenuHelp).on("touchstart mousedown", function(cd) { if (aQ(cd)) { return } bm.doc.debug = true;
            bm.debugTimer = setTimeout(function() { if (bm.doc.debug) { bb() } }, 2000) });
        cc.helpContact = new b1($("#HelpContact", cc.$dialog), bm.lang.LobbyMenuHelpContact, function() { cc.contactShow() }, true);
        cc.helpNews = new b1($("#HelpNews", cc.$dialog), bm.lang.LobbyMenuHelpNews, function() { bU({ Response: "News!" }) }, true);
        cc.helpFAQ = new b1($("#HelpFAQ", cc.$dialog), bm.lang.LobbyMenuHelpFAQ, function() { bU({ Response: "FAQ" }) }, true);
        cc.helpAbout = new b1($("#HelpAbout", cc.$dialog), bm.lang.LobbyMenuHelpAbout + " Poker Mavens...", function() { cc.aboutShow() }, true);
        cc.$tableMenu = $("#MobileTableMenu", cc.$dialog).text(bm.lang.LobbyMenuTable).on("touchstart mousedown", function(cd) { bm.tables[bm.tableCurrent].leaveSeatCheck(cc.leaveSeatMenu);
            cd.preventDefault() });
        new b1($("#mt_GeneralInfo", cc.$dialog), bm.lang.TableMenuOptionsGeneral, function() { bm.tables[bm.tableCurrent].showInfo(0) }, true);
        new b1($("#mt_Statistics", cc.$dialog), bm.lang.TableMenuOptionsStats, function() { bm.tables[bm.tableCurrent].showInfo(1) }, true);
        new b1($("#mt_HandHistory", cc.$dialog), bm.lang.TableMenuOptionsHistory, function() { bm.tables[bm.tableCurrent].showInfo(2) }, true);
        new b1($("#mt_ExtendedChat", cc.$dialog), bm.lang.TableMenuOptionsChat, function() { bm.tables[bm.tableCurrent].showInfo(3) }, true);
        new b1($("#mt_AddMoreChips", cc.$dialog), bm.lang.TableMenuOptionsAddChips, function() { bm.tables[bm.tableCurrent].getRebuy() }, true);
        new b1($("#mt_RefreshTable", cc.$dialog), bm.lang.TableMenuOptionsRefresh, function() { bm.tables[bm.tableCurrent].refreshTable() }, true);
        new b1($("#mt_RotateSeats", cc.$dialog), bm.lang.TableMenuOptionsRotate, function() { bm.tables[bm.tableCurrent].rotateSeatsShow(0) }, true);
        cc.leaveSeatMenu = new b1($("#mt_LeaveSeat", cc.$dialog), bm.lang.TableMenuLeaveSeat, function() { bm.tables[bm.tableCurrent].confirmLeave(true) }, true);
        new b1($("#mt_LeaveTable", cc.$dialog), bm.lang.TableMenuLeaveTable, function() { bm.tables[bm.tableCurrent].confirmLeave(false) }, true);
        $(".menu", cc.$dialog).css({ color: bm.color.ButtonText, "background-color": bm.color.Button });
        $(".menu ul", cc.$dialog).css({ color: bm.color.ListText, "background-color": bm.color.List, "border-color": bm.color.ListText });
        $(".menu_sep", cc.$dialog).css({ "background-color": bm.color.ListText });
        $(".menu ul li", cc.$dialog).hover(bA, bS) };
    bM.prototype.menuToggle = function(g) { var cd, cc;
        cd = this;
        cd.showMenu = g; if (cd.showMenu) { $("#Lobby > .menu").show();
            cd.$sitePanel.css({ top: 40, left: 0, right: 0, height: 3 });
            cd.lobbyTabs.$container.css({ top: 43, left: 0, right: 0, bottom: 0 });
            cd.menuToggleBtn.setCaption(bm.lang.TableButtonMenu + " " + bm.checkMark) } else { $("#Lobby > .menu").hide();
            cd.$sitePanel.css({ top: 0, left: 0, right: 0, height: 3 });
            cd.lobbyTabs.$container.css({ top: 3, left: 0, right: 0, bottom: 0 });
            cd.menuToggleBtn.setCaption(bm.lang.TableButtonMenu) } for (cc = 0; cc < bm.tables.length; cc++) { bm.tables[cc].resizeTable();
            bm.tables[cc].resizeFinish() } };
    bM.prototype.messageShow = function(cf, ce) { var cc, g, cd;
        cc = this;
        g = $(".message").clone().removeClass("message").appendTo(bm.$webClient); if (!ce || ce == "") { ce = bm.lang.DialogMessage } cd = new bp(g, cc, { title: ce, removeonclose: true });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cd.showMessage(cf, true, bm.mobile) };
    bM.prototype.mobileButtonSetup = function() { var g = this;
        g.showMenu = true;
        g.$tableNamePanel = $("#TableNamePanel").css({ "font-size": "1.15em", color: bm.color.WindowText, "line-height": "25px", overflow: "hidden" });
        g.menuToggleBtn = new C($("#MenuToggleBtn", g.$dialog), bm.lang.TableButtonMenu + " " + bm.checkMark, 40, function() { g.menuToggle(!g.showMenu) });
        g.lobbyShowBtn = new C($("#LobbyShowBtn", g.$dialog), bm.lang.TableButtonLobby, 40, function() { g.lobbyTabs.setTab(bm.returnTab) });
        g.mobileChatBtn = new C($("#MobileChatBtn", g.$dialog), bm.lang.TableButtonChat, 40, function() { bm.tables[bm.tableCurrent].mobileChatShow() });
        g.mobileChatText = new bC($("#MobileChatText", g.$dialog), false);
        g.prevTableBtn = new C($("#PrevTableBtn", g.$dialog), bm.arrowL + " " + bm.lang.TableButtonPrev, 40, function() { g.prevTable() });
        g.nextTableBtn = new C($("#NextTableBtn", g.$dialog), bm.lang.TableButtonNext + " " + bm.arrowR, 40, function() { g.nextTable() }) };
    bM.prototype.newsCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#News");
        cd = new bp(g, cc, { minwidth: 250, minheight: 150, onresize: function() { cc.newsResize() } });
        cd.controls.newsContent = new bC($(".newscontent", g), false);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.close() });
        new C($(".save", g), bm.lang.DialogSave, 25, function() { a9(bm.siteName, cd.controls.newsContent.getText(), false) });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.news = cd };
    bM.prototype.newsResize = function() { this.news.controls.newsContent.updateScrollPosition() };
    bM.prototype.newsShow = function(cd) { var g, cc;
        g = this;
        cc = g.news;
        cc.setTitle(bm.lang.NewsTitle);
        cc.show(bm.mobile, bm.mobile);
        cc.controls.newsContent.setScale(cc.scale);
        cc.controls.newsContent.setText(cd);
        cc.controls.newsContent.topScroll() };
    bM.prototype.nextTable = function() { if (bm.tableCurrent < bm.tables.length - 1) { bm.tables[bm.tableCurrent + 1].bringToFront() } };
    bM.prototype.noteListCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#NoteList");
        cd = new bp(g, cc, { title: bm.lang.NoteTitle });
        bm.data.Notes = {};
        bm.data.Notes.cols = 4;
        bm.data.Notes.widths = [0.44, 0.2, 0.18, 0.18];
        bm.data.Notes.headers = [bm.lang.NotePlayer, bm.lang.NoteColor, bm.lang.NoteNote, bm.lang.NoteBlock];
        bm.data.Notes.fields = ["player", "color", "note", "block", "colorNum", "noteText", "chatBool"];
        bm.data.Notes.fieldsShow = ["player", "color", "note", "block"];
        bm.data.Notes.fieldsSort = ["player", "colorNum", "note", "block"];
        bm.data.Notes.fieldsNum = [false, true, false, false];
        bm.data.Notes.fieldsHTML = [false, true, true, true];
        bm.data.Notes.sortCol = 0;
        bm.data.Notes.sortAscend = true;
        bm.data.Notes.sortable = true;
        bm.data.Notes.rows = [];
        bm.data.Notes.rowHeight = bm.mobile ? 24 : 32;
        cd.controls.noteGrid = new b3($("#nl_grid", g), bm.data.Notes, function(ce) { cc.noteListSelect(ce) }, function() { cc.noteListEdit() }, null);
        cd.controls.noteBox = new a8($("#nl_note", g), { border: true, readonly: true });
        new C($(".leftbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        new C($(".middlebtn", g), bm.lang.NoteEdit, 25, function() { cc.noteListEdit() });
        new C($(".rightbtn", g), bm.lang.NoteDelete, 25, function() { cc.noteListDelete() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.noteList = cd };
    bM.prototype.noteListDelete = function() { var cd, ce, cc, g;
        cd = this;
        ce = cd.noteList;
        cc = ce.controls.noteGrid.selrow; if (cc < 0) { cd.messageShow(bm.lang.MessageChatPlayer); return } g = bm.data.Notes.rows[cc].player;
        bm.data.Notes.rows.splice(cc, 1);
        ce.controls.noteGrid.update();
        bO(g, "", "", "Yes");
        bU({ Response: "PlayerNote", Subject: g, Color: 0, Chat: "Yes", Note: "" }) };
    bM.prototype.noteListEdit = function() { var cd, ce, cc, g;
        cd = this;
        ce = cd.noteList;
        cc = ce.controls.noteGrid.selrow; if (cc < 0) { cd.messageShow(bm.lang.MessageChatPlayer); return } g = bm.data.Notes.rows[cc].player;
        z(cd, g) };
    bM.prototype.noteListSelect = function(g) { var cd, ce, cc;
        cd = this;
        ce = cd.noteList; if (g < 0 || g >= bm.data.Notes.rows.length) { cc = "" } else { cc = bm.data.Notes.rows[g].noteText } ce.controls.noteBox.setText(cc) };
    bM.prototype.noteListShow = function() { var cd, cf, cc, g, ce;
        cd = this;
        cf = cd.noteList;
        cc = cd.loginGrid.getValue("player"); if (cc == "") { g = -1 } else { g = cf.controls.noteGrid.getRow(cc, "player"); if (g < 0) { ce = {};
                ce.player = cc;
                ce.color = "";
                ce.note = "";
                ce.block = "";
                ce.colorNum = 0;
                ce.noteText = "";
                ce.chatBool = "Yes";
                bm.data.Notes.rows.push(ce);
                cf.controls.noteGrid.sort();
                g = cf.controls.noteGrid.getRow(cc, "player") } } cf.controls.noteGrid.selrow = g;
        cf.controls.noteGrid.toprow = g;
        cd.noteListSelect(g);
        cf.show(true, bm.mobile);
        cf.controls.noteGrid.setScale(cf.scale);
        cf.controls.noteGrid.resize() };
    bM.prototype.playerSearchCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#PlayerSearch");
        cd = new bp(g, cc, { title: bm.lang.SearchTitle });
        $("#ps_label").text(bm.lang.SearchName);
        cd.controls.playerSearchInput = new aT($("#ps_input"), { onEnterKey: function() { cc.playerSearchOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.playerSearchOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.playerSearch = cd };
    bM.prototype.playerSearchOk = function() { var g, cc;
        g = this;
        cc = g.playerSearch;
        cc.close();
        bU({ Response: "PlayerSearch", Player: cc.controls.playerSearchInput.getText() }) };
    bM.prototype.playerSearchShow = function() { var g, cd, cc;
        g = this;
        cd = g.playerSearch;
        cd.show(true, bm.mobile);
        cc = g.loginGrid.getValue("player");
        cd.controls.playerSearchInput.setText(cc); if (bm.hasTouch == false) { cd.controls.playerSearchInput.setFocus() } };
    bM.prototype.popoutChatClose = function() { var g, cc;
        g = this;
        cc = g.popoutChat; if (cc.isVisible()) { cc.close();
            g.lobbyChatDisplay(true);
            g.lobbyChatEdit.setText(cc.controls.popoutChatEdit.getText());
            g.lobbyChatUpdate() } };
    bM.prototype.popoutChatCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#PopoutChat");
        cd = new bp(g, cc, { title: bm.lang.LobbyCaptionChat, minwidth: 250, minheight: 200, onresize: function() { cc.popoutChatResize() } });
        cd.controls.popoutChatEdit = new aT($("#PopoutChatEdit"), { onEnterKey: function(ce) { cc.popoutChatEnter(ce) } });
        new C($("#PopoutChatSendBtn"), "&#8595;", 25, function() { cc.popoutChatEnter(cd.controls.popoutChatEdit.getText()) }).$button.css("border-radius", "0px");
        cd.controls.popoutChatText = new bC($("#PopoutChatText"), false);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.popoutChatClose() });
        new C($(".save", g), bm.lang.DialogSave, 25, function() { cc.popoutChatSave() });
        $(".closebtn", g).on("touchstart mousedown", function() { cc.popoutChatClose(); return false });
        cc.popoutChat = cd };
    bM.prototype.popoutChatEnter = function(ce) { var cc, cd, g;
        cc = this;
        cd = cc.popoutChat;
        g = $.trim(ce); if (g == "") { return } if (bm.loggedIn == false) { cc.messageShow(bm.lang.MessageChatLogin) } else { bU({ Response: "LobbyChat", Text: g });
            cd.controls.popoutChatEdit.setText(""); if (bm.hasTouch) { cd.controls.popoutChatEdit.unFocus() } } };
    bM.prototype.popoutChatResize = function() { this.popoutChat.controls.popoutChatText.updateScrollPosition() };
    bM.prototype.popoutChatSave = function() { var cc, cd, g;
        cc = this;
        cd = cc.popoutChat.controls.popoutChatText.$memotext.clone();
        $("span", cd).each(function() { $(this).replaceWith($(this).text()) });
        $("font", cd).each(function() { $(this).replaceWith($(this).text()) });
        g = ap(cd.html());
        a9(bm.siteName, g, false) };
    bM.prototype.popoutChatShow = function() { var cf, cg, cd, cc, g, ce;
        cf = this;
        cg = cf.popoutChat;
        cf.lobbyChatDisplay(false); if (bm.mobile) { cg.$dialog.css({ width: 500, height: cf.lobbyTabs.$container.height() - 90 });
            cg.show(true, true) } else { cd = cf.$dialog.offset().top;
            cc = cf.$dialog.offset().left + cf.$dialog.outerWidth() + 5;
            g = 350;
            ce = cf.$dialog.height();
            $(".resize", cg.$dialog).show();
            cg.$dialog.css({ top: cd, left: cc, width: g, height: ce }).show().css("z-index", ++bm.zTop);
            aG(cg) } cg.controls.popoutChatText.setScale(cg.scale);
        cg.controls.popoutChatEdit.setText(cf.lobbyChatEdit.getText());
        cf.lobbyChatUpdate() };
    bM.prototype.postFlopButtonsCaller = function(cc, g) { return function() { cc.postFlopButtonsShow(g) } };
    bM.prototype.postFlopButtonsCreate = function() { var cd, g, ce, cc;
        cd = this;
        g = $("#PostFlopButtons");
        ce = new bp(g, cd, { title: bm.lang.TableSettingsPostFlopBtns });
        ce.controls.post = []; for (cc = 0; cc < 18; cc++) { ce.controls.post[cc] = new aH($("#post_" + cc), bm.postFlopButtons[cc], cd.postFlopButtonsSelect(cd, cc)) } new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.postFlopButtonsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { ce.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { ce.close(); return false });
        cd.postFlopButtons = ce };
    bM.prototype.postFlopButtonsOk = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.postFlopButtons;
        g = ce.data.btn;
        cd = ce.data.rc;
        cc.tableSettings.data.postFlopBtn[g] = cd;
        cc.tableSettings.controls.postFlopBtn[g].setCaption(bm.postFlopButtons[cd]);
        ce.close() };
    bM.prototype.postFlopButtonsReset = function() { var cd, cf, g, ce, cc;
        cd = this;
        cf = cd.tableSettings;
        cc = [4, 8, 12, 16]; for (g = 1; g < 5; g++) { ce = cc[g - 1];
            cf.data.postFlopBtn[g] = ce;
            cf.controls.postFlopBtn[g].setCaption(bm.postFlopButtons[ce]) } };
    bM.prototype.postFlopButtonsSelect = function(cc, g) { return function() { cc.postFlopButtons.data.rc = g } };
    bM.prototype.postFlopButtonsShow = function(g) { var cc, ce, cd;
        cc = this;
        ce = cc.postFlopButtons;
        ce.data.btn = g;
        cd = cc.tableSettings.data.postFlopBtn[g];
        ce.controls.post[cd].setCheck();
        ce.data.rc = cd;
        ce.show(true, bm.mobile) };
    bM.prototype.preFlopButtonsCaller = function(cc, g) { return function() { cc.preFlopButtonsShow(g) } };
    bM.prototype.preFlopButtonsCreate = function() { var cd, g, ce, cc;
        cd = this;
        g = $("#PreFlopButtons");
        ce = new bp(g, cd, { title: bm.lang.TableSettingsPreFlopBtns });
        ce.controls.pre = []; for (cc = 0; cc < 11; cc++) { ce.controls.pre[cc] = new aH($("#pre_" + cc), bm.preFlopButtons[cc], cd.preFlopButtonsSelect(cd, cc)) } new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.preFlopButtonsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { ce.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { ce.close(); return false });
        cd.preFlopButtons = ce };
    bM.prototype.preFlopButtonsOk = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.preFlopButtons;
        g = ce.data.btn;
        cd = ce.data.rc;
        cc.tableSettings.data.preFlopBtn[g] = cd;
        cc.tableSettings.controls.preFlopBtn[g].setCaption(bm.preFlopButtons[cd]);
        ce.close() };
    bM.prototype.preFlopButtonsReset = function() { var cd, cf, g, ce, cc;
        cd = this;
        cf = cd.tableSettings;
        cc = [2, 4, 6, 9]; for (g = 1; g < 5; g++) { ce = cc[g - 1];
            cf.data.preFlopBtn[g] = ce;
            cf.controls.preFlopBtn[g].setCaption(bm.preFlopButtons[ce]) } };
    bM.prototype.preFlopButtonsSelect = function(cc, g) { return function() { cc.preFlopButtons.data.rc = g } };
    bM.prototype.preFlopButtonsShow = function(g) { var cc, ce, cd;
        cc = this;
        ce = cc.preFlopButtons;
        ce.data.btn = g;
        cd = cc.tableSettings.data.preFlopBtn[g];
        ce.controls.pre[cd].setCheck();
        ce.data.rc = cd;
        ce.show(true, bm.mobile) };
    bM.prototype.prevTable = function() { if (bm.tableCurrent > 0) { bm.tables[bm.tableCurrent - 1].bringToFront() } };
    bM.prototype.recoveryCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.$webClient);
        cd = new bp(g, cc, {});
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.recoveryOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.recovery = cd };
    bM.prototype.recoveryOk = function() { var g, cc;
        g = this;
        cc = g.recovery;
        cc.close();
        bU({ Response: cc.data.command, Player: cc.data.player }) };
    bM.prototype.recoveryShow = function(ce, g) { var cc, cd;
        cc = this;
        cd = cc.recovery;
        cd.setTitle(g);
        cd.showMessage(ce, true, bm.mobile) };
    bM.prototype.resendValCode = function() { var cc, ce, cd, g;
        cc = this;
        ce = cc.login;
        g = ce.controls.loginNameInput.getText(); if (g == "") { cc.messageShow(bm.lang.LoginNoName) } else { cd = cc.recovery;
            cd.data.player = g;
            cd.data.command = "ResendValCode";
            cc.recoveryShow(bm.lang.ValCodeMsg1, g) } };
    bM.prototype.resetPassword = function() { var cc, ce, cd, g;
        cc = this;
        ce = cc.login;
        g = ce.controls.loginNameInput.getText(); if (g == "") { cc.messageShow(bm.lang.LoginNoName) } else { cd = cc.recovery;
            cd.data.player = g;
            cd.data.command = "ResetPassword";
            cc.recoveryShow(bm.lang.ValCodeMsg2, g) } };
    bM.prototype.resize = function() { var cd, g, cc;
        cd = this;
        g = (cd.lobbyTabs.$container.width() - 25) / cd.lobbyTabs.count;
        cd.lobbyTabs.setTabWidth(g);
        cd.loginGrid.resize();
        cd.lobbyChatText.updateScrollPosition();
        cd.ringGrid.resize();
        cd.sitnGoGrid.resize();
        cd.tourneyGrid.resize();
        g = $("#OpenBackground").width();
        cc = $("#OpenBackground").height();
        $("#BGLogo2 img").css({ "max-width": g, "max-height": cc }) };
    bM.prototype.retryCancel = function() { var g = this;
        g.retryMessage.close();
        f(false) };
    bM.prototype.retryCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".message").clone().removeClass("message").appendTo(bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.ConnectTitle });
        new C($(".okbtn", g), bm.lang.DialogCancel, 25, function() { cc.retryCancel() });
        $(".closebtn", g).on("touchstart mousedown", function() { cc.retryCancel(); return false });
        cc.retryMessage = cd };
    bM.prototype.ringFilterChange = function() { var cc, ce, g, cd;
        cc = this;
        cd = bm.lang.LobbyButtonFilter; if (bm.local.filterRingActivate) { cd = cd + " " + bm.checkMark } cc.ringFilterBtn.setCaption(cd);
        ce = "";
        g = cc.ringGrid.selrow; if (g >= 0) { ce = bm.data.Ring.rows[g].id } cc.ringFilterData();
        cc.ringGameSelectID(ce);
        cc.ringGrid.sort();
        cc.ringGameSelect(cc.ringGrid.selrow);
        cc.ringTabCaption() };
    bM.prototype.ringFilterCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#RingFilter");
        cd = new bp(g, cc, { title: bm.lang.FilterTitleRing });
        $("#rf_game").text(bm.lang.FilterGame);
        cd.controls.rfHoldem = new b($("#rf_holdem"), bm.lang.FilterHoldem);
        cd.controls.rfOmaha = new b($("#rf_omaha"), bm.lang.FilterOmaha);
        cd.controls.rfOmahaHiLo = new b($("#rf_omahahilo"), bm.lang.FilterOmahaHiLo);
        cd.controls.rfOmaha5 = new b($("#rf_omaha5"), bm.lang.FilterOmaha5);
        cd.controls.rfOmaha5HiLo = new b($("#rf_omaha5hilo"), bm.lang.FilterOmaha5HiLo);
        cd.controls.rfRazz = new b($("#rf_razz"), bm.lang.FilterRazz);
        cd.controls.rfStud = new b($("#rf_stud"), bm.lang.FilterStud);
        cd.controls.rfStudHiLo = new b($("#rf_studhilo"), bm.lang.FilterStudHiLo);
        cd.controls.rfMixed = new b($("#rf_mixed"), bm.lang.FilterMixed);
        $("#rf_limit").text(bm.lang.FilterLimit);
        cd.controls.rfNL = new b($("#rf_nl"), bm.lang.FilterNL);
        cd.controls.rfPL = new b($("#rf_pl"), bm.lang.FilterPL);
        cd.controls.rfCL = new b($("#rf_cl"), bm.lang.FilterCL);
        cd.controls.rfFixed = new b($("#rf_fixed"), bm.lang.FilterFixed);
        $("#rf_stakes").text(bm.lang.FilterStakes);
        $("#rf_stakesmincap").text(bm.lang.FilterMin);
        cd.controls.rfStakesMin = new aT($("#rf_stakesmin"), { border: true });
        $("#rf_stakesmaxcap").text(bm.lang.FilterMax);
        cd.controls.rfStakesMax = new aT($("#rf_stakesmax"), { border: true });
        $("#rf_buyin").text(bm.lang.FilterBuyin);
        $("#rf_buyinmincap").text(bm.lang.FilterMin);
        cd.controls.rfBuyinMin = new aT($("#rf_buyinmin"), { border: true });
        $("#rf_buyinmaxcap").text(bm.lang.FilterMax);
        cd.controls.rfBuyinMax = new aT($("#rf_buyinmax"), { border: true });
        $("#rf_seats").text(bm.lang.FilterSeats);
        $("#rf_seatsmincap").text(bm.lang.FilterMin);
        cd.controls.rfSeatsMin = new aT($("#rf_seatsmin"), { border: true });
        $("#rf_seatsmaxcap").text(bm.lang.FilterMax);
        cd.controls.rfSeatsMax = new aT($("#rf_seatsmax"), { border: true });
        $("#rf_players").text(bm.lang.FilterPlayers);
        $("#rf_playersmincap").text(bm.lang.FilterMin);
        cd.controls.rfPlayersMin = new aT($("#rf_playersmin"), { border: true });
        cd.controls.rfHideFull = new b($("#rf_hidefull"), bm.lang.FilterFull);
        cd.controls.rfHidePrivate = new b($("#rf_hideprivate"), bm.lang.FilterPrivate);
        cd.controls.$rfCurrency = $("#rf_currency");
        cd.controls.$rfCurrency.text(bm.lang.FilterCurrency);
        cd.controls.rfPrimary = new b($("#rf_primary"), bm.lang.FilterPrimary);
        cd.controls.rfSecondary = new b($("#rf_secondary"), bm.lang.FilterSecondary);
        cd.controls.rfEnabled = new b($("#rf_enabled"), bm.lang.FilterEnabled);
        new C($("#rf_reset", g), bm.lang.FilterReset, 20, function() { cc.ringFilterReset() });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.ringFilterOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.ringFilter = cd };
    bM.prototype.ringFilterData = function() { var co, ch, cf, ck, cl, cc, cd, cj, g, cg, ci, cm, cn, ce; if (!bm.local.filterRingActivate) { bm.data.Ring.rows = bm.data.Ring.urows.slice(0) } else { bm.data.Ring.rows.length = 0;
            cf = bu(bm.local.filterRingStakesMin);
            ck = bu(bm.local.filterRingStakesMax);
            cl = bu(bm.local.filterRingBuyinMin);
            cc = bu(bm.local.filterRingBuyinMax);
            cd = bu(bm.local.filterRingSeatsMin);
            cj = bu(bm.local.filterRingSeatsMax);
            g = bu(bm.local.filterRingPlayersMin);
            ci = bm.local.filterRingPrimary || !bm.secondary;
            cm = bm.local.filterRingSecondary && bm.secondary;
            cg = bm.local.filterRingHideFull;
            cn = bm.local.filterRingHidePrivate; for (ce = 0; ce < bm.data.Ring.urows.length; ce++) { co = bm.data.Ring.urows[ce];
                ch = co.gameIndex; switch (ch) {
                    case 0:
                        if (!bm.local.filterRingHoldem || !bm.local.filterRingFixed) { continue } break;
                    case 1:
                        if (!bm.local.filterRingHoldem || !bm.local.filterRingPL) { continue } break;
                    case 2:
                        if (!bm.local.filterRingHoldem || !bm.local.filterRingNL) { continue } break;
                    case 3:
                        if (!bm.local.filterRingHoldem || !bm.local.filterRingCL) { continue } break;
                    case 4:
                        if (!bm.local.filterRingOmaha || !bm.local.filterRingFixed) { continue } break;
                    case 5:
                        if (!bm.local.filterRingOmaha || !bm.local.filterRingPL) { continue } break;
                    case 6:
                        if (!bm.local.filterRingOmaha || !bm.local.filterRingNL) { continue } break;
                    case 7:
                        if (!bm.local.filterRingOmaha || !bm.local.filterRingCL) { continue } break;
                    case 8:
                        if (!bm.local.filterRingOmahaHiLo || !bm.local.filterRingFixed) { continue } break;
                    case 9:
                        if (!bm.local.filterRingOmahaHiLo || !bm.local.filterRingPL) { continue } break;
                    case 10:
                        if (!bm.local.filterRingOmahaHiLo || !bm.local.filterRingNL) { continue } break;
                    case 11:
                        if (!bm.local.filterRingOmahaHiLo || !bm.local.filterRingCL) { continue } break;
                    case 12:
                        if (!bm.local.filterRingOmaha5 || !bm.local.filterRingFixed) { continue } break;
                    case 13:
                        if (!bm.local.filterRingOmaha5 || !bm.local.filterRingPL) { continue } break;
                    case 14:
                        if (!bm.local.filterRingOmaha5 || !bm.local.filterRingNL) { continue } break;
                    case 15:
                        if (!bm.local.filterRingOmaha5 || !bm.local.filterRingCL) { continue } break;
                    case 16:
                        if (!bm.local.filterRingOmaha5HiLo || !bm.local.filterRingFixed) { continue } break;
                    case 17:
                        if (!bm.local.filterRingOmaha5HiLo || !bm.local.filterRingPL) { continue } break;
                    case 18:
                        if (!bm.local.filterRingOmaha5HiLo || !bm.local.filterRingNL) { continue } break;
                    case 19:
                        if (!bm.local.filterRingOmaha5HiLo || !bm.local.filterRingCL) { continue } break;
                    case 20:
                        if (!bm.local.filterRingRazz || !bm.local.filterRingFixed) { continue } break;
                    case 21:
                        if (!bm.local.filterRingStud || !bm.local.filterRingFixed) { continue } break;
                    case 22:
                        if (!bm.local.filterRingStudHiLo || !bm.local.filterRingFixed) { continue } break;
                    case 23:
                        if (!bm.local.filterRingMixed) { continue } break } if (co.stakesLo < cf) { continue } if (ck > 0 && co.stakesHi > ck) { continue } if (co.buyinMin < cl) { continue } if (cc > 0 && co.buyinMax > cc) { continue } if (co.seats < cd) { continue } if (cj > 0 && co.seats > cj) { continue } if (co.playing < g) { continue } if (cg && co.playing == co.seats) { continue } if (cn && co.password != "No") { continue } if (!ci && co.primary) { continue } if (!cm && !co.primary) { continue } bm.data.Ring.rows.push(co) } } };
    bM.prototype.ringFilterOk = function() { var g, cc;
        g = this;
        cc = g.ringFilter;
        cc.close();
        bJ("filterRingHoldem", cc.controls.rfHoldem.isChecked());
        bJ("filterRingOmaha", cc.controls.rfOmaha.isChecked());
        bJ("filterRingOmahaHiLo", cc.controls.rfOmahaHiLo.isChecked());
        bJ("filterRingOmaha5", cc.controls.rfOmaha5.isChecked());
        bJ("filterRingOmaha5HiLo", cc.controls.rfOmaha5HiLo.isChecked());
        bJ("filterRingRazz", cc.controls.rfRazz.isChecked());
        bJ("filterRingStud", cc.controls.rfStud.isChecked());
        bJ("filterRingStudHiLo", cc.controls.rfStudHiLo.isChecked());
        bJ("filterRingMixed", cc.controls.rfMixed.isChecked());
        bJ("filterRingNL", cc.controls.rfNL.isChecked());
        bJ("filterRingPL", cc.controls.rfPL.isChecked());
        bJ("filterRingCL", cc.controls.rfCL.isChecked());
        bJ("filterRingFixed", cc.controls.rfFixed.isChecked());
        bJ("filterRingStakesMin", cc.controls.rfStakesMin.getText());
        bJ("filterRingStakesMax", cc.controls.rfStakesMax.getText());
        bJ("filterRingBuyinMin", cc.controls.rfBuyinMin.getText());
        bJ("filterRingBuyinMax", cc.controls.rfBuyinMax.getText());
        bJ("filterRingSeatsMin", cc.controls.rfSeatsMin.getText());
        bJ("filterRingSeatsMax", cc.controls.rfSeatsMax.getText());
        bJ("filterRingPlayersMin", cc.controls.rfPlayersMin.getText()); if (bm.secondary) { bJ("filterRingPrimary", cc.controls.rfPrimary.isChecked());
            bJ("filterRingSecondary", cc.controls.rfSecondary.isChecked()) } bJ("filterRingHideFull", cc.controls.rfHideFull.isChecked());
        bJ("filterRingHidePrivate", cc.controls.rfHidePrivate.isChecked());
        bJ("filterRingActivate", cc.controls.rfEnabled.isChecked());
        g.ringFilterChange() };
    bM.prototype.ringFilterReset = function() { var g, cc;
        g = this;
        cc = g.ringFilter;
        cc.controls.rfHoldem.setCheck(true);
        cc.controls.rfOmaha.setCheck(true);
        cc.controls.rfOmahaHiLo.setCheck(true);
        cc.controls.rfOmaha5.setCheck(true);
        cc.controls.rfOmaha5HiLo.setCheck(true);
        cc.controls.rfRazz.setCheck(true);
        cc.controls.rfStud.setCheck(true);
        cc.controls.rfStudHiLo.setCheck(true);
        cc.controls.rfMixed.setCheck(true);
        cc.controls.rfNL.setCheck(true);
        cc.controls.rfPL.setCheck(true);
        cc.controls.rfCL.setCheck(true);
        cc.controls.rfFixed.setCheck(true);
        cc.controls.rfStakesMin.setText("");
        cc.controls.rfStakesMax.setText("");
        cc.controls.rfBuyinMin.setText("");
        cc.controls.rfBuyinMax.setText("");
        cc.controls.rfSeatsMin.setText("");
        cc.controls.rfSeatsMax.setText("");
        cc.controls.rfPlayersMin.setText("");
        cc.controls.rfPrimary.setCheck(true);
        cc.controls.rfSecondary.setCheck(true);
        cc.controls.rfHideFull.setCheck(false);
        cc.controls.rfHidePrivate.setCheck(false) };
    bM.prototype.ringFilterShow = function() { var g, cc;
        g = this;
        cc = g.ringFilter;
        cc.controls.rfHoldem.setCheck(bm.local.filterRingHoldem);
        cc.controls.rfOmaha.setCheck(bm.local.filterRingOmaha);
        cc.controls.rfOmahaHiLo.setCheck(bm.local.filterRingOmahaHiLo);
        cc.controls.rfOmaha5.setCheck(bm.local.filterRingOmaha5);
        cc.controls.rfOmaha5HiLo.setCheck(bm.local.filterRingOmaha5HiLo);
        cc.controls.rfRazz.setCheck(bm.local.filterRingRazz);
        cc.controls.rfStud.setCheck(bm.local.filterRingStud);
        cc.controls.rfStudHiLo.setCheck(bm.local.filterRingStudHiLo);
        cc.controls.rfMixed.setCheck(bm.local.filterRingMixed);
        cc.controls.rfNL.setCheck(bm.local.filterRingNL);
        cc.controls.rfPL.setCheck(bm.local.filterRingPL);
        cc.controls.rfCL.setCheck(bm.local.filterRingCL);
        cc.controls.rfFixed.setCheck(bm.local.filterRingFixed);
        cc.controls.rfStakesMin.setText(bm.local.filterRingStakesMin);
        cc.controls.rfStakesMax.setText(bm.local.filterRingStakesMax);
        cc.controls.rfBuyinMin.setText(bm.local.filterRingBuyinMin);
        cc.controls.rfBuyinMax.setText(bm.local.filterRingBuyinMax);
        cc.controls.rfSeatsMin.setText(bm.local.filterRingSeatsMin);
        cc.controls.rfSeatsMax.setText(bm.local.filterRingSeatsMax);
        cc.controls.rfPlayersMin.setText(bm.local.filterRingPlayersMin);
        cc.controls.$rfCurrency.toggle(bm.secondary);
        cc.controls.rfPrimary.show(bm.secondary);
        cc.controls.rfSecondary.show(bm.secondary); if (bm.secondary) { cc.controls.rfPrimary.setCheck(bm.local.filterRingPrimary);
            cc.controls.rfSecondary.setCheck(bm.local.filterRingSecondary) } cc.controls.rfHideFull.setCheck(bm.local.filterRingHideFull);
        cc.controls.rfHidePrivate.setCheck(bm.local.filterRingHidePrivate);
        cc.controls.rfEnabled.setCheck(bm.local.filterRingActivate);
        cc.show(true, bm.mobile) };
    bM.prototype.ringGameNext = function() { var cc, g, cd;
        cc = this;
        g = cc.ringGrid.selrow; if (g < 0 || g >= bm.data.Ring.rows.length - 1) { return } g++;
        cc.ringGrid.selrow = g;
        cc.ringGrid.scrollIntoView();
        cc.ringGameSelect(g);
        cd = bm.data.Ring.rows[g];
        cc.ringPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.stakes + ")") };
    bM.prototype.ringGamePrev = function() { var cc, g, cd;
        cc = this;
        g = cc.ringGrid.selrow; if (g <= 0) { return } g--;
        cc.ringGrid.selrow = g;
        cc.ringGrid.scrollIntoView();
        cc.ringGameSelect(g);
        cd = bm.data.Ring.rows[g];
        cc.ringPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.stakes + ")") };
    bM.prototype.ringGameSelect = function(g) { var cc, ce, cd;
        cc = this; if (g < 0 || g >= bm.data.Ring.rows.length) { cc.ringUnselect() } else { ce = cc.ringSelected != bm.data.Ring.rows[g].id;
            cc.ringSelected = bm.data.Ring.rows[g].id;
            cc.ringInfoBtn.enable(true);
            cc.ringObserveBtn.enable(true);
            cc.ringPlayersBtn.enable(true);
            cd = bm.data.Ring.rows[g].playing == bm.data.Ring.rows[g].seats;
            cc.ringWaitBtn.enable(cd);
            cc.ringWait2Btn.enable(cd);
            cc.ringPrevBtn.enable(g > 0);
            cc.ringNextBtn.enable(g < bm.data.Ring.rows.length - 1);
            cc.optionsStart.enable(bm.data.Ring.rows[g].startCode && bm.loggedIn); if (ce) { bU({ Response: "GameSelected", Table: cc.ringSelected, Type: "R", SnG: "No" }) } } };
    bM.prototype.ringGameSelectID = function(ce) { var cc, cd, g;
        cc = this;
        cc.ringGrid.selrow = -1; if (ce == "") { cc.ringUnselect(); return } cd = bm.data.Ring.rows.length; for (g = 0; g < cd; g++) { if (ce == bm.data.Ring.rows[g].id) { cc.ringGrid.selrow = g; break } } };
    bM.prototype.ringInfoRequest = function() { var g, cc;
        g = this; if (g.ringSelected == "") { g.messageShow(bm.lang.LobbyCaptionNoRingGame); return } cc = { Response: "TableInfo" };
        cc.Table = g.ringSelected;
        cc.Type = "R";
        bU(cc) };
    bM.prototype.ringPlayersCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#RingPlayers");
        cd = new bp(g, cc, { title: "" });
        cc.ringPrevBtn = new C($("#RingPrevBtn", g), bm.lang.LobbyButtonRingPrev, 25, function() { cc.ringGamePrev() });
        cc.ringNextBtn = new C($("#RingNextBtn", g), bm.lang.LobbyButtonRingNext, 25, function() { cc.ringGameNext() });
        cc.ringWait2Btn = new C($("#RingWait2Btn", g), bm.lang.LobbyButtonRingJoin, 25, function() { cc.ringRegister() });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.ringPlayers = cd };
    bM.prototype.ringPlayersShow = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.ringPlayers;
        g = cc.ringGrid.selrow; if (g < 0) { return } cd = bm.data.Ring.rows[g];
        ce.setTitle(cd.id + " - " + cd.game + " (" + cd.stakes + ")");
        ce.show(true, bm.mobile);
        cc.ringPlayerGrid.setScale(ce.scale);
        cc.ringPlayerGrid.resize();
        cc.ringWaitGrid.setScale(ce.scale);
        cc.ringWaitGrid.resize() };
    bM.prototype.ringRegister = function() { var ce, g, cd, cf, cg, cc;
        ce = this;
        g = ce.ringGrid.selrow; if (g < 0) { ce.messageShow(bm.lang.LobbyCaptionNoRingGame); return } if (bm.loggedIn == false) { ce.messageShow(bm.lang.MessageRingGameLogin); return } cd = bm.data.Ring.rows[g].password;
        cf = (cd == "Yes" || cd == "Yes+");
        cg = bm.data.Ring.rows[g].id;
        cc = ce.ringWaitBtn.getCaption() == bm.lang.LobbyButtonRingJoin; if (cc == true) { ak("Register", cg, "R", cf, 0) } else { bU({ Response: "Unregister", Table: cg, Type: "R" }) } };
    bM.prototype.ringSaveSort = function() { y("RingSortColumn", bm.data.Ring.sortCol);
        y("RingSortAscend", bm.data.Ring.sortAscend);
        y("RingPlayerSortColumn", bm.data.RingPlayer.sortCol);
        y("RingPlayerSortAscend", bm.data.RingPlayer.sortAscend) };
    bM.prototype.ringTabCaption = function() { var g, cc;
        g = this;
        cc = bm.lang.LobbyCaptionRingGames + ": "; if (bm.local.filterRingActivate) { cc = cc + bm.data.Ring.rows.length + "/" } cc = cc + bm.data.Ring.urows.length;
        g.lobbyTabs.setCaption(1, cc);
        g.lobbyRingGames.$menu.text(cc) };
    bM.prototype.ringTableOpen = function(cc) { var cd, ce, g;
        cd = this; if (cc < 0) { cd.messageShow(bm.lang.LobbyCaptionNoRingGame); return } ce = bm.data.Ring.rows[cc].password == "Yes+";
        g = bm.data.Ring.rows[cc].id;
        ak("OpenTable", g, "R", ce, 0) };
    bM.prototype.ringTableSelectedOpen = function() { var g = this;
        g.ringTableOpen(g.ringGrid.selrow) };
    bM.prototype.ringTabSetup = function() { var g, cd, cc;
        g = this;
        bm.data.Ring = {};
        bm.data.Ring.cols = 7;
        cd = bu(R("RingSortColumn")); if (cd < 0 || cd > 6) { cd = 0 } bm.data.Ring.sortCol = cd;
        bm.data.Ring.sortAscend = R("RingSortAscend") != "false";
        bm.data.Ring.sortable = true;
        bm.data.Ring.widths = [0.26, 0.18, 0.15, 0.17, 0.08, 0.08, 0.08];
        bm.data.Ring.rows = [];
        bm.data.Ring.urows = [];
        bm.data.Ring.rowHeight = bm.mobile ? 24 : 32;
        bm.data.Ring.headers = [bm.lang.LobbyColumnRingID, bm.lang.LobbyColumnRingGame, bm.lang.LobbyColumnRingStakes, bm.lang.LobbyColumnRingBuyIn, bm.lang.LobbyColumnRingSeats, bm.lang.LobbyColumnRingPlay, bm.lang.LobbyColumnRingWait];
        bm.data.Ring.fields = ["id", "game", "gameIndex", "stakes", "stakesLo", "stakesHi", "stakesSort", "buyin", "buyinMin", "buyinMax", "buyinSort", "seats", "playing", "waiting", "password"];
        bm.data.Ring.fieldsShow = ["id", "game", "stakes", "buyin", "seats", "playing", "waiting"];
        bm.data.Ring.fieldsSort = ["id", "game", "stakesSort", "buyinSort", "seats", "playing", "waiting"];
        bm.data.Ring.fieldsNum = [false, false, false, false, true, true, true];
        bm.data.Ring.fieldsHTML = [false, false, false, false, false, false, false];
        g.ringGrid = new b3($("#RingGrid", g.$dialog), bm.data.Ring, function(ce) { g.ringGameSelect(ce) }, function(ce) { g.ringTableOpen(ce) }, function() { g.ringSaveSort() });
        cc = bm.lang.LobbyButtonFilter; if (bm.local.filterRingActivate) { cc = cc + " " + bm.checkMark } g.ringFilterBtn = new C($("#RingFilterBtn", g.$dialog), cc, 40, function() { g.ringFilterShow() });
        g.ringObserveBtn = new C($("#RingObserveBtn", g.$dialog), bm.lang.LobbyButtonRingObserve, 40, function() { g.ringTableSelectedOpen() });
        g.ringInfoBtn = new C($("#RingInfoBtn", g.$dialog), bm.lang.LobbyButtonRingInfo, 40, function() { g.ringInfoRequest() });
        g.ringPlayersBtn = new C($("#RingPlayersBtn", g.$dialog), bm.lang.LobbyButtonRingPlayers, 40, function() { g.ringPlayersShow() });
        g.ringWaitBtn = new C($("#RingWaitBtn", g.$dialog), bm.lang.LobbyButtonRingJoin, 40, function() { g.ringRegister() });
        g.ringSelected = "";
        g.$ringSelected = $("#RingSelected", g.$dialog);
        bm.data.RingPlayer = {};
        bm.data.RingPlayer.cols = 3;
        cd = bu(R("RingPlayerSortColumn")); if (cd < 0 || cd > 2) { cd = 0 } bm.data.RingPlayer.sortCol = cd;
        bm.data.RingPlayer.sortAscend = R("RingPlayerSortAscend") != "false";
        bm.data.RingPlayer.sortable = true;
        bm.data.RingPlayer.widths = [0.4, 0.3, 0.3];
        bm.data.RingPlayer.rows = [];
        bm.data.RingPlayer.rowHeight = 50;
        bm.data.RingPlayer.headers = [bm.lang.LobbyColumnRingPlayer, bm.lang.LobbyColumnRingChips, bm.lang.LobbyColumnRingNet];
        bm.data.RingPlayer.fields = ["player", "chips", "chipsSort", "net", "netSort"];
        bm.data.RingPlayer.fieldsShow = ["player", "chips", "net"];
        bm.data.RingPlayer.fieldsSort = ["player", "chipsSort", "netSort"];
        bm.data.RingPlayer.fieldsNum = [false, true, true];
        bm.data.RingPlayer.fieldsHTML = [false, false, false]; if (!bm.params.showNetChips) { bm.data.RingPlayer.cols--;
            bm.data.RingPlayer.widths = [0.6, 0.4];
            bm.data.RingPlayer.headers.splice(2, 1);
            bm.data.RingPlayer.fieldsShow.splice(2, 1);
            bm.data.RingPlayer.fieldsSort.splice(2, 1);
            bm.data.RingPlayer.fieldsNum.splice(2, 1) } g.ringPlayerGrid = new b3($("#RingPlayerGrid", g.ringPlayers.$dialog), bm.data.RingPlayer, null, null, function() { g.ringSaveSort() });
        bm.data.RingWait = {};
        bm.data.RingWait.cols = 2;
        bm.data.RingWait.sortCol = -1;
        bm.data.RingWait.sortAscend = true;
        bm.data.RingWait.sortable = false;
        bm.data.RingWait.widths = [0.23, 0.77];
        bm.data.RingWait.rows = [];
        bm.data.RingWait.rowHeight = 16;
        bm.data.RingWait.headers = ["#", bm.lang.LobbyColumnRingWaiting];
        bm.data.RingWait.fields = ["pos", "player"];
        bm.data.RingWait.fieldsShow = ["pos", "player"];
        bm.data.RingWait.fieldsSort = ["pos", "player"];
        bm.data.RingWait.fieldsNum = [true, false];
        bm.data.RingWait.fieldsHTML = [false, false];
        g.ringWaitGrid = new b3($("#RingWaitGrid", g.ringPlayers.$dialog), bm.data.RingWait) };
    bM.prototype.ringUnselect = function() { var g = this;
        g.ringSelected = "";
        g.$ringSelected.text(bm.lang.LobbyCaptionNoRingGame);
        bm.data.RingPlayer.rows.length = 0;
        g.ringPlayerGrid.update();
        bm.data.RingWait.rows.length = 0;
        g.ringWaitGrid.update();
        g.ringInfoBtn.enable(false);
        g.ringObserveBtn.enable(false);
        g.ringPlayersBtn.enable(false);
        g.ringWaitBtn.enable(false);
        g.ringWait2Btn.enable(false);
        g.ringPrevBtn.enable(false);
        g.ringNextBtn.enable(false);
        g.optionsStart.enable(false);
        g.ringPlayers.close() };
    bM.prototype.scrollbarScale = function() { var cc, g;
        cc = this;
        g = cc.dialog.scale;
        cc.loginGrid.setScale(g);
        cc.lobbyChatText.setScale(g);
        cc.ringGrid.setScale(g);
        cc.sitnGoGrid.setScale(g);
        cc.tourneyGrid.setScale(g);
        cc.mobileChatText.setScale(g) };
    bM.prototype.setCaption = function(g) { this.dialog.setTitle(g) };
    bM.prototype.sitnGoFilterData = function() { var cj, ce, ch, g, cc, cf, cg, ci, cd; if (!bm.params.sitAndGoTab) { return } bm.data.SitnGo.total = bm.data.Tourney.urows.length;
        bm.data.SitnGo.rows.length = 0; if (!bm.local.filterSitnGoActivate) { for (cd = 0; cd < bm.data.Tourney.urows.length; cd++) { cj = bm.data.Tourney.urows[cd]; if (!cj.sng) { bm.data.SitnGo.total-- } else { bm.data.SitnGo.rows.push(cj) } } } else { ch = bu(bm.local.filterSitnGoBuyinMin);
            g = bu(bm.local.filterSitnGoBuyinMax);
            cc = bu(bm.local.filterSitnGoSizeMin);
            cf = bu(bm.local.filterSitnGoSizeMax);
            cg = bm.local.filterSitnGoPrimary || !bm.secondary;
            ci = bm.local.filterSitnGoSecondary && bm.secondary; for (cd = 0; cd < bm.data.Tourney.urows.length; cd++) { cj = bm.data.Tourney.urows[cd]; if (!cj.sng) { bm.data.SitnGo.total--; continue } ce = cj.gameIndex; switch (ce) {
                    case 0:
                        if (!bm.local.filterSitnGoHoldem || !bm.local.filterSitnGoFixed) { continue } break;
                    case 1:
                        if (!bm.local.filterSitnGoHoldem || !bm.local.filterSitnGoPL) { continue } break;
                    case 2:
                        if (!bm.local.filterSitnGoHoldem || !bm.local.filterSitnGoNL) { continue } break;
                    case 3:
                        continue; break;
                    case 4:
                        if (!bm.local.filterSitnGoOmaha || !bm.local.filterSitnGoFixed) { continue } break;
                    case 5:
                        if (!bm.local.filterSitnGoOmaha || !bm.local.filterSitnGoPL) { continue } break;
                    case 6:
                        if (!bm.local.filterSitnGoOmaha || !bm.local.filterSitnGoNL) { continue } break;
                    case 7:
                        continue; break;
                    case 8:
                        if (!bm.local.filterSitnGoOmahaHiLo || !bm.local.filterSitnGoFixed) { continue } break;
                    case 9:
                        if (!bm.local.filterSitnGoOmahaHiLo || !bm.local.filterSitnGoPL) { continue } break;
                    case 10:
                        if (!bm.local.filterSitnGoOmahaHiLo || !bm.local.filterSitnGoNL) { continue } break;
                    case 11:
                        continue; break;
                    case 12:
                        if (!bm.local.filterSitnGoOmaha5 || !bm.local.filterSitnGoFixed) { continue } break;
                    case 13:
                        if (!bm.local.filterSitnGoOmaha5 || !bm.local.filterSitnGoPL) { continue } break;
                    case 14:
                        if (!bm.local.filterSitnGoOmaha5 || !bm.local.filterSitnGoNL) { continue } break;
                    case 15:
                        continue; break;
                    case 16:
                        if (!bm.local.filterSitnGoOmaha5HiLo || !bm.local.filterSitnGoFixed) { continue } break;
                    case 17:
                        if (!bm.local.filterSitnGoOmaha5HiLo || !bm.local.filterSitnGoPL) { continue } break;
                    case 18:
                        if (!bm.local.filterSitnGoOmaha5HiLo || !bm.local.filterSitnGoNL) { continue } break;
                    case 19:
                        continue; break;
                    case 20:
                        if (!bm.local.filterSitnGoRazz || !bm.local.filterSitnGoFixed) { continue } break;
                    case 21:
                        if (!bm.local.filterSitnGoStud || !bm.local.filterSitnGoFixed) { continue } break;
                    case 22:
                        if (!bm.local.filterSitnGoStudHiLo || !bm.local.filterSitnGoFixed) { continue } break;
                    case 23:
                        if (!bm.local.filterSitnGoMixed) { continue } break } if (!bm.local.filterSitnGoFreezeout && !cj.rebuy && !cj.shootout) { continue } if (!bm.local.filterSitnGoRebuy && cj.rebuy) { continue } if (!bm.local.filterSitnGoShootout && cj.shootout) { continue } if (cj.buyinTotal < ch) { continue } if (g > 0 && cj.buyinTotal > g) { continue } if (cj.ts < cc) { continue } if (cf > 0 && cj.ts > cf) { continue } if (bm.local.filterSitnGoHidePrivate && cj.password != "No") { continue } if (bm.local.filterSitnGoHideRunning && cj.running == "Yes") { continue } if (!cg && cj.primary) { continue } if (!ci && !cj.primary) { continue } bm.data.SitnGo.rows.push(cj) } } };
    bM.prototype.sitnGoInfoRequest = function() { var g = this; if (g.sitnGoSelected == "") { g.messageShow(bm.lang.LobbyCaptionNoSitnGo); return } bU({ Response: "TableInfo", Table: g.sitnGoSelected, Type: "T" }) };
    bM.prototype.sitnGoNext = function() { var cc, g, cd;
        cc = this;
        g = cc.sitnGoGrid.selrow; if (g < 0 || g >= bm.data.SitnGo.rows.length - 1) { return } g++;
        cc.sitnGoGrid.selrow = g;
        cc.sitnGoGrid.scrollIntoView();
        cc.sitnGoSelect(g);
        cd = bm.data.SitnGo.rows[g];
        cc.sitnGoPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")") };
    bM.prototype.sitnGoPrev = function() { var cc, g, cd;
        cc = this;
        g = cc.sitnGoGrid.selrow; if (g <= 0) { return } g--;
        cc.sitnGoGrid.selrow = g;
        cc.sitnGoGrid.scrollIntoView();
        cc.sitnGoSelect(g);
        cd = bm.data.SitnGo.rows[g];
        cc.sitnGoPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")") };
    bM.prototype.sitnGoPlayersCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#SitnGoPlayers");
        cd = new bp(g, cc, { title: "" });
        cc.sitnGoPrevBtn = new C($("#SitnGoPrevBtn", g), bm.lang.LobbyButtonSnGPrev, 25, function() { cc.sitnGoPrev() });
        cc.sitnGoNextBtn = new C($("#SitnGoNextBtn", g), bm.lang.LobbyButtonSnGNext, 25, function() { cc.sitnGoNext() });
        cc.sitnGoRegister2Btn = new C($("#SitnGoRegister2Btn", g), bm.lang.LobbyButtonTrnyRegister, 25, function() { cc.sitnGoRegister() });
        cc.sitnGoStartNow = new b($("#SitnGoStartNow", g), bm.lang.LobbyCaptionStartNow + " *", function() { cc.sitnGoStartNowCheck() });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.sitnGoPlayers = cd };
    bM.prototype.sitnGoPlayersShow = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.sitnGoPlayers;
        g = cc.sitnGoGrid.selrow; if (g < 0) { return } cd = bm.data.SitnGo.rows[g];
        ce.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")");
        ce.show(true, bm.mobile);
        cc.sitnGoPlayerGrid.setScale(ce.scale);
        cc.sitnGoPlayerGrid.resize();
        cc.sitnGoWaitGrid.setScale(ce.scale);
        cc.sitnGoWaitGrid.resize() };
    bM.prototype.sitnGoRegister = function() { var ce, cd, g, cf, cg, cc;
        ce = this; if (ce.sitnGoSelected == "") { ce.messageShow(bm.lang.LobbyCaptionNoSitnGo); return } if (bm.loggedIn == false) { ce.messageShow(bm.lang.MessageTournamentLogin); return } cg = ce.sitnGoRegisterBtn.getCaption();
        cd = (cg == bm.lang.LobbyButtonTrnyRegister || cg == bm.lang.LobbyButtonTrnyRegLate); if (cd) { bU({ Response: "RegisterRequest", Table: ce.sitnGoSelected, Type: "T" }) } else { g = ce.sitnGoGrid.selrow;
            cc = bm.data.SitnGo.rows[g].password;
            cf = (cc == "Yes" || cc == "Yes+");
            ak("Unregister", ce.sitnGoSelected, "T", cf, 0) } };
    bM.prototype.sitnGoRegCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.$webClient);
        cd = new bp(g, cc, {});
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.sitnGoRegOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.sitnGoReg = cd };
    bM.prototype.sitnGoRegOk = function() { var g, cc;
        g = this;
        cc = g.sitnGoReg;
        g.sitnGoReg.close();
        ak("Register", cc.data.sitnGo, "T", cc.data.needpw, 0) };
    bM.prototype.sitnGoRegShow = function(cf, g, ce) { var cc, cd;
        cc = this;
        cd = cc.sitnGoReg;
        cd.setTitle(g);
        cd.data.sitnGo = g;
        cd.data.needpw = ce;
        cd.showMessage(cf, true, bm.mobile) };
    bM.prototype.sitnGoSaveSort = function() { y("SitnGoSortColumn", bm.data.SitnGo.sortCol);
        y("SitnGoSortAscend", bm.data.SitnGo.sortAscend);
        y("SitnGoPlayerSortColumn", bm.data.SitnGoPlayer.sortCol);
        y("SitnGoPlayerSortAscend", bm.data.SitnGoPlayer.sortAscend) };
    bM.prototype.sitnGoSelect = function(g) { var cc, cd;
        cc = this; if (g < 0 || g >= bm.data.SitnGo.rows.length) { cc.sitnGoUnselect() } else { cd = cc.sitnGoSelected != bm.data.SitnGo.rows[g].id;
            cc.sitnGoSelected = bm.data.SitnGo.rows[g].id;
            cc.sitnGoInfoBtn.enable(true);
            cc.sitnGoObserveBtn.enable(true);
            cc.sitnGoPlayersBtn.enable(true);
            cc.sitnGoRegisterBtn.enable(true);
            cc.sitnGoRegister2Btn.enable(true);
            cc.sitnGoPrevBtn.enable(g > 0);
            cc.sitnGoNextBtn.enable(g < bm.data.SitnGo.rows.length - 1);
            cc.optionsStart.enable(bm.data.SitnGo.rows[g].startCode && bm.loggedIn); if (cd) { bU({ Response: "GameSelected", Table: cc.sitnGoSelected, Type: "T", SnG: "Yes" }) } } };
    bM.prototype.sitnGoSelectID = function(ce) { var cc, cd, g;
        cc = this;
        cc.sitnGoGrid.selrow = -1; if (ce == "") { cc.sitnGoUnselect(); return } cd = bm.data.SitnGo.rows.length; for (g = 0; g < cd; g++) { if (ce == bm.data.SitnGo.rows[g].id) { cc.sitnGoGrid.selrow = g; break } } };
    bM.prototype.sitnGoStartNowCheck = function() { var g = this; if (g.sitnGoSelected == bm.lang.LobbyCaptionNoSitnGo) { return } bU({ response: "StartNow", Table: g.sitnGoSelected, Checked: g.sitnGoStartNow.isChecked() ? "Yes" : "No" }) };
    bM.prototype.sitnGoTabCaption = function() { var g, cc;
        g = this;
        cc = bm.lang.LobbyCaptionSitnGos + ": "; if (bm.local.filterSitnGoActivate) { cc = cc + bm.data.SitnGo.rows.length + "/" } cc = cc + bm.data.SitnGo.total;
        g.lobbyTabs.setCaption(3, cc);
        g.lobbySitnGos.$menu.text(cc) };
    bM.prototype.sitnGoTableSelectedOpen = function() { var g = this;
        g.tourneyTableOpen(true, g.sitnGoGrid.selrow) };
    bM.prototype.sitnGoTabSetup = function() { var g, cd, cc;
        g = this;
        bm.data.SitnGo = {};
        bm.data.SitnGo.cols = 6;
        cd = bu(R("SitnGoSortColumn")); if (cd < 0 || cd > 5) { cd = 0 } bm.data.SitnGo.sortCol = cd;
        bm.data.SitnGo.sortAscend = R("SitnGoSortAscend") != "false";
        bm.data.SitnGo.sortable = true;
        bm.data.SitnGo.widths = [0.26, 0.18, 0.16, 0.06, 0.11, 0.23];
        bm.data.SitnGo.rows = [];
        bm.data.SitnGo.total = 0;
        bm.data.SitnGo.rowHeight = bm.mobile ? 24 : 16;
        bm.data.SitnGo.headers = [bm.lang.LobbyColumnSnGID, bm.lang.LobbyColumnTrnyGame, bm.lang.LobbyColumnTrnyBuyIn, bm.lang.LobbyColumnTrnyTS, bm.lang.LobbyColumnTrnyReg, bm.lang.LobbyColumnTrnyStarts];
        bm.data.SitnGo.fields = ["id", "game", "gameIndex", "buyin", "buyinSort", "ts", "reg", "regSort", "tables", "starts", "startsSort", "startMin", "startTime", "password"];
        bm.data.SitnGo.fieldsShow = ["id", "game", "buyin", "ts", "reg", "starts"];
        bm.data.SitnGo.fieldsSort = ["id", "game", "buyinSort", "ts", "regSort", "startsSort"];
        bm.data.SitnGo.fieldsNum = [false, false, false, true, false, false];
        bm.data.SitnGo.fieldsHTML = [false, false, false, false, false, false];
        g.sitnGoGrid = new b3($("#SitnGoGrid", g.$dialog), bm.data.SitnGo, function(ce) { g.sitnGoSelect(ce) }, function(ce) { g.tourneyTableOpen(true, ce) }, function() { g.sitnGoSaveSort() });
        cc = bm.lang.LobbyButtonFilter; if (bm.local.filterSitnGoActivate) { cc = cc + " " + bm.checkMark } g.sitnGoFilterBtn = new C($("#SitnGoFilterBtn", g.$dialog), cc, 40, function() { g.tourneyFilterShow(true) });
        g.sitnGoObserveBtn = new C($("#SitnGoObserveBtn", g.$dialog), bm.lang.LobbyButtonTrnyObserve, 40, function() { g.sitnGoTableSelectedOpen() });
        g.sitnGoInfoBtn = new C($("#SitnGoInfoBtn", g.$dialog), bm.lang.LobbyButtonSnGInfo, 40, function() { g.sitnGoInfoRequest() });
        g.sitnGoPlayersBtn = new C($("#SitnGoPlayersBtn", g.$dialog), bm.lang.LobbyButtonTrnyPlayers, 40, function() { g.sitnGoPlayersShow() });
        g.sitnGoRegisterBtn = new C($("#SitnGoRegisterBtn", g.$dialog), bm.lang.LobbyButtonTrnyRegister, 40, function() { g.sitnGoRegister() });
        g.sitnGoSelected = "";
        g.$sitnGoSelected = $("#SitnGoSelected", g.$dialog);
        bm.data.SitnGoPlayer = {};
        bm.data.SitnGoPlayer.cols = 4;
        cd = bu(R("SitnGoPlayerSortColumn")); if (cd < 0 || cd > 3) { cd = 0 } bm.data.SitnGoPlayer.sortCol = cd;
        bm.data.SitnGoPlayer.sortAscend = R("SitnGoPlayerSortAscend") != "false";
        bm.data.SitnGoPlayer.sortable = true;
        bm.data.SitnGoPlayer.widths = [0.4, 0.2, 0.2, 0.2];
        bm.data.SitnGoPlayer.rows = [];
        bm.data.SitnGoPlayer.rowHeight = 16;
        bm.data.SitnGoPlayer.headers = [bm.lang.LobbyColumnTrnyPlayer, bm.lang.LobbyColumnTrnyTable, bm.lang.LobbyColumnTrnyChips, bm.lang.LobbyColumnTrnyRank];
        bm.data.SitnGoPlayer.fields = ["player", "table", "chips", "rank"];
        bm.data.SitnGoPlayer.fieldsShow = ["player", "table", "chips", "rank"];
        bm.data.SitnGoPlayer.fieldsSort = ["player", "table", "chips", "rank"];
        bm.data.SitnGoPlayer.fieldsNum = [false, true, true, true];
        bm.data.SitnGoPlayer.fieldsHTML = [false, false, false, false];
        g.sitnGoPlayerGrid = new b3($("#SitnGoPlayerGrid", g.sitnGoPlayers.$dialog), bm.data.SitnGoPlayer, null, function(ce) { g.tourneyPlayerTable(true, ce) }, function() { g.sitnGoSaveSort() });
        bm.data.SitnGoWait = {};
        bm.data.SitnGoWait.cols = 2;
        bm.data.SitnGoWait.sortCol = -1;
        bm.data.SitnGoWait.sortAscend = true;
        bm.data.SitnGoWait.sortable = false;
        bm.data.SitnGoWait.widths = [0.23, 0.77];
        bm.data.SitnGoWait.rows = [];
        bm.data.SitnGoWait.rowHeight = 16;
        bm.data.SitnGoWait.headers = ["#", bm.lang.LobbyColumnTrnyWaiting];
        bm.data.SitnGoWait.fields = ["pos", "player"];
        bm.data.SitnGoWait.fieldsShow = ["pos", "player"];
        bm.data.SitnGoWait.fieldsSort = ["pos", "player"];
        bm.data.SitnGoWait.fieldsNum = [true, false];
        bm.data.SitnGoWait.fieldsHTML = [false, false];
        g.sitnGoWaitGrid = new b3($("#SitnGoWaitGrid", g.sitnGoPlayers.$dialog), bm.data.SitnGoWait) };
    bM.prototype.sitnGoUnselect = function() { var g = this;
        g.sitnGoSelected = "";
        g.$sitnGoSelected.text(bm.lang.LobbyCaptionNoSitnGo);
        bm.data.SitnGoPlayer.rows.length = 0;
        g.sitnGoPlayerGrid.update();
        bm.data.SitnGoWait.rows.length = 0;
        g.sitnGoWaitGrid.update();
        g.sitnGoInfoBtn.enable(false);
        g.sitnGoObserveBtn.enable(false);
        g.sitnGoPlayersBtn.enable(false);
        g.sitnGoRegisterBtn.enable(false);
        g.sitnGoRegister2Btn.enable(false);
        g.sitnGoPrevBtn.enable(false);
        g.sitnGoNextBtn.enable(false);
        g.sitnGoStartNow.show(false); if (g.lobbyTabs.getTab() == 3) { g.optionsStart.enable(false);
            g.sitnGoPlayers.close() } };
    bM.prototype.soundCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#SoundEffects");
        cd = new bp(g, cc, { title: bm.lang.SoundTitle });
        cd.controls.$soundPercent = $("#SoundPercent");
        cd.controls.beepSound = new b($("#BeepSound"), bm.lang.SoundBeep);
        cd.controls.betSound = new b($("#BetSound"), bm.lang.SoundBet);
        cd.controls.cardSound = new b($("#CardSound"), bm.lang.SoundCard);
        cd.controls.checkSound = new b($("#CheckSound"), bm.lang.SoundCheck);
        cd.controls.potSound = new b($("#PotSound"), bm.lang.SoundPot);
        cd.controls.loginSound = new b($("#LoginSound"), bm.lang.SoundLogin);
        cd.controls.volumeSlider = new ad($("#SoundVolume"), 0.01, function(ce) { cc.soundVolumeChange(ce) });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.soundOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.soundEffects = cd };
    bM.prototype.soundOk = function() { var g, cd, cc;
        g = this;
        cd = g.soundEffects;
        cc = cd.controls.volumeSlider.getValue();
        bJ("soundVolume", cc);
        h("beep", cd.controls.beepSound.isChecked());
        h("bet", cd.controls.betSound.isChecked());
        h("card", cd.controls.cardSound.isChecked());
        h("card2", cd.controls.cardSound.isChecked());
        h("card3", cd.controls.cardSound.isChecked());
        h("card4", cd.controls.cardSound.isChecked());
        h("check", cd.controls.checkSound.isChecked());
        h("pot", cd.controls.potSound.isChecked());
        h("login", cd.controls.loginSound.isChecked());
        cd.close() };
    bM.prototype.soundShow = function() { var g, cc;
        g = this;
        cc = g.soundEffects;
        cc.controls.beepSound.setCheck(bm.audio.beep.enabled);
        cc.controls.betSound.setCheck(bm.audio.bet.enabled);
        cc.controls.cardSound.setCheck(bm.audio.card.enabled);
        cc.controls.checkSound.setCheck(bm.audio.check.enabled);
        cc.controls.potSound.setCheck(bm.audio.pot.enabled);
        cc.controls.loginSound.setCheck(bm.audio.login.enabled);
        cc.controls.volumeSlider.setValue(bm.local.soundVolume, true);
        cc.show(true, bm.mobile);
        cc.controls.volumeSlider.setScale(cc.scale) };
    bM.prototype.soundVolumeChange = function(g) { this.soundEffects.controls.$soundPercent.text(bm.lang.SoundVolume + " " + Math.round(g * 100) + "%") };
    bM.prototype.startGameCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#StartGame");
        cd = new bp(g, cc, {});
        $("#st_label").text(bm.lang.StartCodeTitle);
        cd.controls.startGameInput = new aT($("#st_input"), { onEnterKey: function() { cc.startGameOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.startGameOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.startGame = cd };
    bM.prototype.startGameOk = function() { var g, cd, cc;
        g = this;
        cd = g.startGame;
        cc = cd.controls.startGameInput.getText();
        cd.close(); if (cc == "") { return } bU({ Response: "StartCode", Table: cd.data.startGameName, Type: cd.data.startGameType, Code: cc }) };
    bM.prototype.startGameShow = function() { var cd, ce, g, cc;
        cd = this;
        ce = cd.startGame;
        cc = cd.lobbyTabs.getTab();
        g = ""; switch (cc) {
            case 1:
                g = cd.ringSelected;
                ce.data.startGameType = "R"; break;
            case 2:
                g = cd.tourneySelected;
                ce.data.startGameType = "T"; break;
            case 3:
                g = cd.sitnGoSelected;
                ce.data.startGameType = "T"; break;
            default:
                return } if (g == "") { cd.messageShow((cc == 1) ? bm.lang.LobbyCaptionNoRingGame : bm.lang.LobbyCaptionNoTournament); return } ce.data.startGameName = g;
        ce.show(true, bm.mobile);
        ce.setTitle(g);
        ce.controls.startGameInput.setText(""); if (bm.hasTouch == false) { ce.controls.startGameInput.setFocus() } };
    bM.prototype.tableSelectCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#TableSelect");
        cd = new bp(g, cc, {});
        bm.data.TableSelect = {};
        bm.data.TableSelect.cols = 1;
        bm.data.TableSelect.sortCol = -1;
        bm.data.TableSelect.sortAscend = true;
        bm.data.TableSelect.sortable = false;
        bm.data.TableSelect.widths = [1];
        bm.data.TableSelect.rows = [];
        bm.data.TableSelect.rowHeight = bm.mobile ? 24 : 16;
        bm.data.TableSelect.headers = [bm.lang.LobbyCaptionSelect];
        bm.data.TableSelect.fields = ["table"];
        bm.data.TableSelect.fieldsShow = ["table"];
        bm.data.TableSelect.fieldsSort = ["table"];
        bm.data.TableSelect.fieldsNum = [false];
        bm.data.TableSelect.fieldsHTML = [false];
        cd.controls.tableSelectGrid = new b3($("#TableSelectGrid"), bm.data.TableSelect, null, function() { cc.tableSelectOk() });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.tableSelectOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.tableSelect = cd };
    bM.prototype.tableSelectOk = function() { var cd, cf, cc, ce, cg, g;
        cd = this;
        cf = cd.tableSelect;
        cc = cf.data.name;
        ce = cf.data.needpw;
        cf.close();
        cg = cf.controls.tableSelectGrid.selrow + 1; if (cg <= 0) { return } g = "Table " + cg;
        ak("OpenTable", cc + " - " + g, "T", ce, 0) };
    bM.prototype.tableSettingsCreate = function() { var cd, g, ce, cc;
        cd = this;
        g = $("#TableSettings");
        ce = new bp(g, cd, { title: bm.lang.TableSettingsTitle });
        ce.controls.bringToFront = new b($("#BringToFront"), bm.lang.TableSettingsFront);
        ce.controls.preferredSeat = new b($("#PreferredSeat"), bm.lang.TableSettingsSeat);
        ce.controls.handHelper = new b($("#HandHelper"), bm.lang.TableSettingsHandHelper);
        ce.controls.autoMuck = new b($("#AutoMuck"), bm.lang.TableSettingsAutoMuck);
        ce.controls.fourColorDeck = new b($("#FourColorDeck"), bm.lang.TableSettingsFourColor);
        ce.controls.dealFaceDown = new b($("#DealFaceDown"), bm.lang.TableSettingsFaceDown);
        ce.controls.muteDealer = new b($("#MuteDealer"), bm.lang.TableSettingsMuteDealer);
        $("#PreFlopBtns").text(bm.lang.TableSettingsPreFlopBtns);
        ce.data.preFlopBtn = [];
        ce.controls.preFlopBtn = []; for (cc = 1; cc < 5; cc++) { ce.controls.preFlopBtn[cc] = new C($("#PreFlopBtn" + cc), "", 20, cd.preFlopButtonsCaller(cd, cc)) } ce.controls.preFlopReset = new C($("#PreFlopReset"), bm.lang.TableSettingsResetBtns, 20, function() { cd.preFlopButtonsReset() });
        $("#PostFlopBtns").text(bm.lang.TableSettingsPostFlopBtns);
        ce.data.postFlopBtn = [];
        ce.controls.postFlopBtn = []; for (cc = 1; cc < 5; cc++) { ce.controls.postFlopBtn[cc] = new C($("#PostFlopBtn" + cc), "", 20, cd.postFlopButtonsCaller(cd, cc)) } ce.controls.postFlopReset = new C($("#PostFlopReset"), bm.lang.TableSettingsResetBtns, 20, function() { cd.postFlopButtonsReset() });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cd.tableSettingsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { ce.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { ce.close(); return false });
        cd.tableSettings = ce };
    bM.prototype.tableSettingsOk = function() { var cc, cd, g;
        cc = this;
        cd = cc.tableSettings;
        bJ("bringToFront", cd.controls.bringToFront.isChecked());
        bJ("preferredSeat", cd.controls.preferredSeat.isChecked()); if (!bm.local.preferredSeat) { bm.seatPosition = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            y("seatPosition", JSON.stringify(bm.seatPosition)) } bJ("handHelper", cd.controls.handHelper.isChecked());
        bJ("autoMuck", cd.controls.autoMuck.isChecked());
        bJ("fourColorDeck", cd.controls.fourColorDeck.isChecked());
        bJ("dealFaceDown", cd.controls.dealFaceDown.isChecked());
        bJ("muteDealer", cd.controls.muteDealer.isChecked()); for (g = 1; g < 5; g++) { bJ("preFlopButton" + g, cd.data.preFlopBtn[g]) } for (g = 1; g < 5; g++) { bJ("postFlopButton" + g, cd.data.postFlopBtn[g]) } cd.close();
        bf(bm.local.fourColorDeck) };
    bM.prototype.tableSettingsShow = function() { var cd, ce, cc, g;
        cd = this;
        ce = cd.tableSettings;
        ce.controls.bringToFront.setCheck(bm.local.bringToFront);
        ce.controls.preferredSeat.setCheck(bm.local.preferredSeat);
        ce.controls.handHelper.setCheck(bm.local.handHelper);
        ce.controls.autoMuck.setCheck(bm.local.autoMuck);
        ce.controls.fourColorDeck.setCheck(bm.local.fourColorDeck);
        ce.controls.dealFaceDown.setCheck(bm.local.dealFaceDown);
        ce.controls.muteDealer.setCheck(bm.local.muteDealer); for (cc = 1; cc < 5; cc++) { g = bm.local["preFlopButton" + cc];
            ce.data.preFlopBtn[cc] = g;
            ce.controls.preFlopBtn[cc].setCaption(bm.preFlopButtons[g]);
            g = bm.local["postFlopButton" + cc];
            ce.data.postFlopBtn[cc] = g;
            ce.controls.postFlopBtn[cc].setCaption(bm.postFlopButtons[g]) } ce.show(true, bm.mobile) };
    bM.prototype.tourneyFilterChange = function(ce) { var cc, cf, g, cd;
        cc = this; if (ce) { cd = bm.lang.LobbyButtonFilter; if (bm.local.filterSitnGoActivate) { cd = cd + " " + bm.checkMark } cc.sitnGoFilterBtn.setCaption(cd);
            cf = "";
            g = cc.sitnGoGrid.selrow; if (g >= 0) { cf = bm.data.SitnGo.rows[g].id } cc.sitnGoFilterData();
            cc.sitnGoSelectID(cf);
            cc.sitnGoGrid.sort();
            cc.sitnGoSelect(cc.sitnGoGrid.selrow);
            cc.sitnGoTabCaption() } else { cd = bm.lang.LobbyButtonFilter; if (bm.local.filterTourneyActivate) { cd = cd + " " + bm.checkMark } cc.tourneyFilterBtn.setCaption(cd);
            cf = "";
            g = cc.tourneyGrid.selrow; if (g >= 0) { cf = bm.data.Tourney.rows[g].id } cc.tourneyFilterData();
            cc.tourneySelectID(cf);
            cc.tourneyGrid.sort();
            cc.tourneySelect(cc.tourneyGrid.selrow);
            cc.tourneyTabCaption() } };
    bM.prototype.tourneyFilterCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#TourneyFilter");
        cd = new bp(g, cc, { title: bm.lang.FilterTitleTourney });
        $("#tf_game").text(bm.lang.FilterGame);
        cd.controls.tfHoldem = new b($("#tf_holdem"), bm.lang.FilterHoldem);
        cd.controls.tfOmaha = new b($("#tf_omaha"), bm.lang.FilterOmaha);
        cd.controls.tfOmahaHiLo = new b($("#tf_omahahilo"), bm.lang.FilterOmahaHiLo);
        cd.controls.tfOmaha5 = new b($("#tf_omaha5"), bm.lang.FilterOmaha5);
        cd.controls.tfOmaha5HiLo = new b($("#tf_omaha5hilo"), bm.lang.FilterOmaha5HiLo);
        cd.controls.tfRazz = new b($("#tf_razz"), bm.lang.FilterRazz);
        cd.controls.tfStud = new b($("#tf_stud"), bm.lang.FilterStud);
        cd.controls.tfStudHiLo = new b($("#tf_studhilo"), bm.lang.FilterStudHiLo);
        cd.controls.tfMixed = new b($("#tf_mixed"), bm.lang.FilterMixed);
        $("#tf_limit").text(bm.lang.FilterLimit);
        cd.controls.tfNL = new b($("#tf_nl"), bm.lang.FilterNL);
        cd.controls.tfPL = new b($("#tf_pl"), bm.lang.FilterPL);
        cd.controls.tfFixed = new b($("#tf_fixed"), bm.lang.FilterFixed);
        $("#tf_format").text(bm.lang.FilterFormat);
        cd.controls.tfFreezeout = new b($("#tf_freezeout"), bm.lang.FilterFreezeout);
        cd.controls.tfRebuy = new b($("#tf_rebuy"), bm.lang.FilterRebuy);
        cd.controls.tfShootout = new b($("#tf_shootout"), bm.lang.FilterShootout);
        $("#tf_buyin").text(bm.lang.FilterBuyin);
        $("#tf_buyinmincap").text(bm.lang.FilterMin);
        cd.controls.tfBuyinMin = new aT($("#tf_buyinmin"), { border: true });
        $("#tf_buyinmaxcap").text(bm.lang.FilterMax);
        cd.controls.tfBuyinMax = new aT($("#tf_buyinmax"), { border: true });
        $("#tf_size").text(bm.lang.FilterSize);
        $("#tf_sizemincap").text(bm.lang.FilterMin);
        cd.controls.tfSizeMin = new aT($("#tf_sizemin"), { border: true });
        $("#tf_sizemaxcap").text(bm.lang.FilterMax);
        cd.controls.tfSizeMax = new aT($("#tf_sizemax"), { border: true });
        cd.controls.$tfStarts = $("#tf_starts");
        cd.controls.$tfStarts.text(bm.lang.FilterStarts);
        cd.controls.tfTime = new b($("#tf_time"), bm.lang.FilterTime);
        cd.controls.tfOther = new b($("#tf_other"), bm.lang.FilterOther);
        cd.controls.$tfCurrency = $("#tf_currency");
        cd.controls.$tfCurrency.text(bm.lang.FilterCurrency);
        cd.controls.tfPrimary = new b($("#tf_primary"), bm.lang.FilterPrimary);
        cd.controls.tfSecondary = new b($("#tf_secondary"), bm.lang.FilterSecondary);
        cd.controls.tfHidePrivate = new b($("#tf_hideprivate"), bm.lang.FilterPrivate);
        cd.controls.tfHideRunning = new b($("#tf_hiderunning"), bm.lang.FilterRunning);
        cd.controls.tfEnabled = new b($("#tf_enabled"), bm.lang.FilterEnabled);
        new C($("#tf_reset", g), bm.lang.FilterReset, 20, function() { cc.tourneyFilterReset() });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.tourneyFilterOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.tourneyFilter = cd };
    bM.prototype.tourneyFilterData = function() { var cj, ce, ch, g, cc, cf, cg, ci, cd;
        bm.data.Tourney.total = bm.data.Tourney.urows.length; if (!bm.local.filterTourneyActivate) { if (!bm.params.sitAndGoTab) { bm.data.Tourney.rows = bm.data.Tourney.urows.slice(0) } else { bm.data.Tourney.rows.length = 0; for (cd = 0; cd < bm.data.Tourney.urows.length; cd++) { cj = bm.data.Tourney.urows[cd]; if (cj.sng) { bm.data.Tourney.total-- } else { bm.data.Tourney.rows.push(cj) } } } } else { bm.data.Tourney.rows.length = 0;
            ch = bu(bm.local.filterTourneyBuyinMin);
            g = bu(bm.local.filterTourneyBuyinMax);
            cc = bu(bm.local.filterTourneySizeMin);
            cf = bu(bm.local.filterTourneySizeMax);
            cg = bm.local.filterTourneyPrimary || !bm.secondary;
            ci = bm.local.filterTourneySecondary && bm.secondary; for (cd = 0; cd < bm.data.Tourney.urows.length; cd++) { cj = bm.data.Tourney.urows[cd]; if (cj.sng) { bm.data.Tourney.total--; continue } ce = cj.gameIndex; switch (ce) {
                    case 0:
                        if (!bm.local.filterTourneyHoldem || !bm.local.filterTourneyFixed) { continue } break;
                    case 1:
                        if (!bm.local.filterTourneyHoldem || !bm.local.filterTourneyPL) { continue } break;
                    case 2:
                        if (!bm.local.filterTourneyHoldem || !bm.local.filterTourneyNL) { continue } break;
                    case 3:
                        continue; break;
                    case 4:
                        if (!bm.local.filterTourneyOmaha || !bm.local.filterTourneyFixed) { continue } break;
                    case 5:
                        if (!bm.local.filterTourneyOmaha || !bm.local.filterTourneyPL) { continue } break;
                    case 6:
                        if (!bm.local.filterTourneyOmaha || !bm.local.filterTourneyNL) { continue } break;
                    case 7:
                        continue; break;
                    case 8:
                        if (!bm.local.filterTourneyOmahaHiLo || !bm.local.filterTourneyFixed) { continue } break;
                    case 9:
                        if (!bm.local.filterTourneyOmahaHiLo || !bm.local.filterTourneyPL) { continue } break;
                    case 10:
                        if (!bm.local.filterTourneyOmahaHiLo || !bm.local.filterTourneyNL) { continue } break;
                    case 11:
                        continue; break;
                    case 12:
                        if (!bm.local.filterTourneyOmaha5 || !bm.local.filterTourneyFixed) { continue } break;
                    case 13:
                        if (!bm.local.filterTourneyOmaha5 || !bm.local.filterTourneyPL) { continue } break;
                    case 14:
                        if (!bm.local.filterTourneyOmaha5 || !bm.local.filterTourneyNL) { continue } break;
                    case 15:
                        continue; break;
                    case 16:
                        if (!bm.local.filterTourneyOmaha5HiLo || !bm.local.filterTourneyFixed) { continue } break;
                    case 17:
                        if (!bm.local.filterTourneyOmaha5HiLo || !bm.local.filterTourneyPL) { continue } break;
                    case 18:
                        if (!bm.local.filterTourneyOmaha5HiLo || !bm.local.filterTourneyNL) { continue } break;
                    case 19:
                        continue; break;
                    case 20:
                        if (!bm.local.filterTourneyRazz || !bm.local.filterTourneyFixed) { continue } break;
                    case 21:
                        if (!bm.local.filterTourneyStud || !bm.local.filterTourneyFixed) { continue } break;
                    case 22:
                        if (!bm.local.filterTourneyStudHiLo || !bm.local.filterTourneyFixed) { continue } break;
                    case 23:
                        if (!bm.local.filterTourneyMixed) { continue } break } if (!bm.local.filterTourneyFreezeout && !cj.rebuy && !cj.shootout) { continue } if (!bm.local.filterTourneyRebuy && cj.rebuy) { continue } if (!bm.local.filterTourneyShootout && cj.shootout) { continue } if (cj.buyinTotal < ch) { continue } if (g > 0 && cj.buyinTotal > g) { continue } if (cj.ts < cc) { continue } if (cf > 0 && cj.ts > cf) { continue } if (!bm.local.filterTourneyTime && cj.startTime != "No") { continue } if (!bm.local.filterTourneyOther && cj.startTime == "No") { continue } if (bm.local.filterTourneyHidePrivate && cj.password != "No") { continue } if (bm.local.filterTourneyHideRunning && cj.running == "Yes") { continue } if (!cg && cj.primary) { continue } if (!ci && !cj.primary) { continue } bm.data.Tourney.rows.push(cj) } } };
    bM.prototype.tourneyFilterOk = function() { var cc, ce, cd, g;
        cc = this;
        ce = cc.tourneyFilter;
        cd = ce.data.tourneyFilterSnG;
        g = cd ? "SitnGo" : "Tourney";
        ce.close();
        bJ("filter" + g + "Holdem", ce.controls.tfHoldem.isChecked());
        bJ("filter" + g + "Omaha", ce.controls.tfOmaha.isChecked());
        bJ("filter" + g + "OmahaHiLo", ce.controls.tfOmahaHiLo.isChecked());
        bJ("filter" + g + "Omaha5", ce.controls.tfOmaha5.isChecked());
        bJ("filter" + g + "Omaha5HiLo", ce.controls.tfOmaha5HiLo.isChecked());
        bJ("filter" + g + "Razz", ce.controls.tfRazz.isChecked());
        bJ("filter" + g + "Stud", ce.controls.tfStud.isChecked());
        bJ("filter" + g + "StudHiLo", ce.controls.tfStudHiLo.isChecked());
        bJ("filter" + g + "Mixed", ce.controls.tfMixed.isChecked());
        bJ("filter" + g + "NL", ce.controls.tfNL.isChecked());
        bJ("filter" + g + "PL", ce.controls.tfPL.isChecked());
        bJ("filter" + g + "Fixed", ce.controls.tfFixed.isChecked());
        bJ("filter" + g + "Freezeout", ce.controls.tfFreezeout.isChecked());
        bJ("filter" + g + "Rebuy", ce.controls.tfRebuy.isChecked());
        bJ("filter" + g + "Shootout", ce.controls.tfShootout.isChecked());
        bJ("filter" + g + "BuyinMin", ce.controls.tfBuyinMin.getText());
        bJ("filter" + g + "BuyinMax", ce.controls.tfBuyinMax.getText());
        bJ("filter" + g + "SizeMin", ce.controls.tfSizeMin.getText());
        bJ("filter" + g + "SizeMax", ce.controls.tfSizeMax.getText()); if (!cd) { bJ("filter" + g + "Time", ce.controls.tfTime.isChecked());
            bJ("filter" + g + "Other", ce.controls.tfOther.isChecked()) } if (bm.secondary) { bJ("filter" + g + "Primary", ce.controls.tfPrimary.isChecked());
            bJ("filter" + g + "Secondary", ce.controls.tfSecondary.isChecked()) } bJ("filter" + g + "HidePrivate", ce.controls.tfHidePrivate.isChecked());
        bJ("filter" + g + "HideRunning", ce.controls.tfHideRunning.isChecked());
        bJ("filter" + g + "Activate", ce.controls.tfEnabled.isChecked());
        cc.tourneyFilterChange(cd) };
    bM.prototype.tourneyFilterReset = function() { var g, cc;
        g = this;
        cc = g.tourneyFilter;
        cc.controls.tfHoldem.setCheck(true);
        cc.controls.tfOmaha.setCheck(true);
        cc.controls.tfOmahaHiLo.setCheck(true);
        cc.controls.tfOmaha5.setCheck(true);
        cc.controls.tfOmaha5HiLo.setCheck(true);
        cc.controls.tfRazz.setCheck(true);
        cc.controls.tfStud.setCheck(true);
        cc.controls.tfStudHiLo.setCheck(true);
        cc.controls.tfMixed.setCheck(true);
        cc.controls.tfNL.setCheck(true);
        cc.controls.tfPL.setCheck(true);
        cc.controls.tfFixed.setCheck(true);
        cc.controls.tfFreezeout.setCheck(true);
        cc.controls.tfRebuy.setCheck(true);
        cc.controls.tfShootout.setCheck(true);
        cc.controls.tfBuyinMin.setText("");
        cc.controls.tfBuyinMax.setText("");
        cc.controls.tfSizeMin.setText("");
        cc.controls.tfSizeMax.setText("");
        cc.controls.tfTime.setCheck(true);
        cc.controls.tfOther.setCheck(true);
        cc.controls.tfPrimary.setCheck(true);
        cc.controls.tfSecondary.setCheck(true);
        cc.controls.tfHidePrivate.setCheck(false);
        cc.controls.tfHideRunning.setCheck(false) };
    bM.prototype.tourneyFilterShow = function(cd) { var cc, ce, g;
        cc = this;
        ce = cc.tourneyFilter;
        g = cd ? "SitnGo" : "Tourney";
        ce.controls.tfHoldem.setCheck(bm.local["filter" + g + "Holdem"]);
        ce.controls.tfOmaha.setCheck(bm.local["filter" + g + "Omaha"]);
        ce.controls.tfOmahaHiLo.setCheck(bm.local["filter" + g + "OmahaHiLo"]);
        ce.controls.tfOmaha5.setCheck(bm.local["filter" + g + "Omaha5"]);
        ce.controls.tfOmaha5HiLo.setCheck(bm.local["filter" + g + "Omaha5HiLo"]);
        ce.controls.tfRazz.setCheck(bm.local["filter" + g + "Razz"]);
        ce.controls.tfStud.setCheck(bm.local["filter" + g + "Stud"]);
        ce.controls.tfStudHiLo.setCheck(bm.local["filter" + g + "StudHiLo"]);
        ce.controls.tfMixed.setCheck(bm.local["filter" + g + "Mixed"]);
        ce.controls.tfNL.setCheck(bm.local["filter" + g + "NL"]);
        ce.controls.tfPL.setCheck(bm.local["filter" + g + "PL"]);
        ce.controls.tfFixed.setCheck(bm.local["filter" + g + "Fixed"]);
        ce.controls.tfFreezeout.setCheck(bm.local["filter" + g + "Freezeout"]);
        ce.controls.tfRebuy.setCheck(bm.local["filter" + g + "Rebuy"]);
        ce.controls.tfShootout.setCheck(bm.local["filter" + g + "Shootout"]);
        ce.controls.tfBuyinMin.setText(bm.local["filter" + g + "BuyinMin"]);
        ce.controls.tfBuyinMax.setText(bm.local["filter" + g + "BuyinMax"]);
        ce.controls.tfSizeMin.setText(bm.local["filter" + g + "SizeMin"]);
        ce.controls.tfSizeMax.setText(bm.local["filter" + g + "SizeMax"]);
        ce.controls.$tfStarts.toggle(!cd);
        ce.controls.tfTime.show(!cd);
        ce.controls.tfOther.show(!cd); if (!cd) { ce.controls.tfTime.setCheck(bm.local["filter" + g + "Time"]);
            ce.controls.tfOther.setCheck(bm.local["filter" + g + "Other"]) } ce.controls.$tfCurrency.toggle(bm.secondary);
        ce.controls.tfPrimary.show(bm.secondary);
        ce.controls.tfSecondary.show(bm.secondary); if (bm.secondary) { ce.controls.tfPrimary.setCheck(bm.local["filter" + g + "Primary"]);
            ce.controls.tfSecondary.setCheck(bm.local["filter" + g + "Secondary"]) } ce.controls.tfHidePrivate.setCheck(bm.local["filter" + g + "HidePrivate"]);
        ce.controls.tfHideRunning.setCheck(bm.local["filter" + g + "HideRunning"]);
        ce.controls.tfEnabled.setCheck(bm.local["filter" + g + "Activate"]);
        ce.data.tourneyFilterSnG = cd;
        ce.setTitle(cd ? bm.lang.FilterTitleSitnGo : bm.lang.FilterTitleTourney);
        ce.show(true, bm.mobile) };
    bM.prototype.tourneyInfoRequest = function() { var g = this; if (g.tourneySelected == "") { g.messageShow(bm.lang.LobbyCaptionNoTournament); return } bU({ Response: "TableInfo", Table: g.tourneySelected, Type: "T" }) };
    bM.prototype.tourneyNext = function() { var cc, g, cd;
        cc = this;
        g = cc.tourneyGrid.selrow; if (g < 0 || g >= bm.data.Tourney.rows.length - 1) { return } g++;
        cc.tourneyGrid.selrow = g;
        cc.tourneyGrid.scrollIntoView();
        cc.tourneySelect(g);
        cd = bm.data.Tourney.rows[g];
        cc.tourneyPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")") };
    bM.prototype.tourneyPrev = function() { var cc, g, cd;
        cc = this;
        g = cc.tourneyGrid.selrow; if (g <= 0) { return } g--;
        cc.tourneyGrid.selrow = g;
        cc.tourneyGrid.scrollIntoView();
        cc.tourneySelect(g);
        cd = bm.data.Tourney.rows[g];
        cc.tourneyPlayers.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")") };
    bM.prototype.tourneyPlayerTable = function(ch, ce) { var cf, g, cd, cg, ci, cc;
        cf = this; if (ce < 0) { return } cg = ch ? bm.data.SitnGoPlayer.rows : bm.data.TourneyPlayer.rows;
        g = "Table " + cg[ce].table;
        cd = ch ? cf.sitnGoGrid.selrow : cf.tourneyGrid.selrow; if (cd < 0) { return } cg = ch ? bm.data.SitnGo.rows : bm.data.Tourney.rows;
        ci = cg[cd].password == "Yes+";
        cc = cg[cd].id;
        ak("OpenTable", cc + " - " + g, "T", ci, 0) };
    bM.prototype.tourneyPlayersCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#TourneyPlayers");
        cd = new bp(g, cc, { title: "" });
        cc.tourneyPrevBtn = new C($("#TourneyPrevBtn", g), bm.lang.LobbyButtonTrnyPrev, 25, function() { cc.tourneyPrev() });
        cc.tourneyNextBtn = new C($("#TourneyNextBtn", g), bm.lang.LobbyButtonTrnyNext, 25, function() { cc.tourneyNext() });
        cc.tourneyRegister2Btn = new C($("#TourneyRegister2Btn", g), bm.lang.LobbyButtonTrnyRegister, 25, function() { cc.tourneyRegister() });
        cc.tourneyStartNow = new b($("#TourneyStartNow", g), bm.lang.LobbyCaptionStartNow + " *", function() { cc.tourneyStartNowCheck() });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.tourneyPlayers = cd };
    bM.prototype.tourneyPlayersShow = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.tourneyPlayers;
        g = cc.tourneyGrid.selrow; if (g < 0) { return } cd = bm.data.Tourney.rows[g];
        ce.setTitle(cd.id + " - " + cd.game + " (" + cd.buyin + ")");
        ce.show(true, bm.mobile);
        cc.tourneyPlayerGrid.setScale(ce.scale);
        cc.tourneyPlayerGrid.resize();
        cc.tourneyWaitGrid.setScale(ce.scale);
        cc.tourneyWaitGrid.resize() };
    bM.prototype.tourneyRegister = function() { var ce, cd, g, cf, cg, cc;
        ce = this; if (ce.tourneySelected == "") { ce.messageShow(bm.lang.LobbyCaptionNoTournament); return } if (bm.loggedIn == false) { ce.messageShow(bm.lang.MessageTournamentLogin); return } cg = ce.tourneyRegisterBtn.getCaption();
        cd = (cg == bm.lang.LobbyButtonTrnyRegister || cg == bm.lang.LobbyButtonTrnyRegLate); if (cd) { bU({ Response: "RegisterRequest", Table: ce.tourneySelected, Type: "T" }) } else { g = ce.tourneyGrid.selrow;
            cc = bm.data.Tourney.rows[g].password;
            cf = (cc == "Yes" || cc == "Yes+");
            ak("Unregister", ce.tourneySelected, "T", cf, 0) } };
    bM.prototype.tourneyRegCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.$webClient);
        cd = new bp(g, cc, {});
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.tourneyRegOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.tourneyReg = cd };
    bM.prototype.tourneyRegOk = function() { var g, cc;
        g = this;
        cc = g.tourneyReg;
        cc.close();
        ak("Register", cc.data.tourney, "T", cc.data.needpw, 0) };
    bM.prototype.tourneyRegShow = function(ce, cf, cd) { var g, cc;
        g = this;
        cc = g.tourneyReg;
        cc.setTitle(cf);
        cc.data.tourney = cf;
        cc.data.needpw = cd;
        cc.showMessage(ce, true, bm.mobile) };
    bM.prototype.tourneyRegOptionCreate = function() { var cc, g, cd;
        cc = this;
        g = $("#TourneyRegOption").appendTo(bm.$webClient);
        cd = new bp(g, cc, {});
        $("#tro_msg").text(bm.lang.BuyInTourney);
        $("#tro_option").text(bm.lang.BuyInSelect);
        cd.controls.useTicket = new aH($("#tro_ticket"), "");
        cd.controls.useBalance = new aH($("#tro_balance"), "");
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.tourneyRegOptionOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.tourneyRegOption = cd };
    bM.prototype.tourneyRegOptionOk = function() { var g, cd, cc;
        g = this;
        cd = g.tourneyRegOption;
        cc = cd.controls.useTicket.isChecked() ? "Register" : "RegisterPay";
        cd.close();
        ak(cc, cd.data.tourney, "T", cd.data.needpw, 0) };
    bM.prototype.tourneyRegOptionShow = function(ch, cg, ce, cd, g) { var cc, cf;
        cc = this;
        cf = cc.tourneyRegOption;
        cf.setTitle(ch);
        cf.data.tourney = ch;
        cf.data.needpw = cg;
        cf.controls.useTicket.setCaption(bm.lang.BuyInUseTicket.split("%1%").join(ce));
        cf.controls.useBalance.setCaption(bm.lang.BuyInPay.split("%1%").join(cd).split("%2%").join(g));
        cf.controls.useTicket.setCheck(true);
        cf.show(true, bm.mobile) };
    bM.prototype.tourneySaveSort = function() { y("TourneySortColumn", bm.data.Tourney.sortCol);
        y("TourneySortAscend", bm.data.Tourney.sortAscend);
        y("TourneyPlayerSortColumn", bm.data.TourneyPlayer.sortCol);
        y("TourneyPlayerSortAscend", bm.data.TourneyPlayer.sortAscend) };
    bM.prototype.tourneySelect = function(g) { var cc, cd;
        cc = this; if (g < 0 || g >= bm.data.Tourney.rows.length) { cc.tourneyUnselect() } else { cd = cc.tourneySelected != bm.data.Tourney.rows[g].id;
            cc.tourneySelected = bm.data.Tourney.rows[g].id;
            cc.tourneyInfoBtn.enable(true);
            cc.tourneyObserveBtn.enable(true);
            cc.tourneyPlayersBtn.enable(true);
            cc.tourneyRegisterBtn.enable(true);
            cc.tourneyRegister2Btn.enable(true);
            cc.tourneyPrevBtn.enable(g > 0);
            cc.tourneyNextBtn.enable(g < bm.data.Tourney.rows.length - 1);
            cc.optionsStart.enable(bm.data.Tourney.rows[g].startCode && bm.loggedIn); if (cd) { bU({ Response: "GameSelected", Table: cc.tourneySelected, Type: "T", SnG: "No" }) } } };
    bM.prototype.tourneySelectID = function(ce) { var cc, cd, g;
        cc = this;
        cc.tourneyGrid.selrow = -1; if (ce == "") { cc.tourneyUnselect(); return } cd = bm.data.Tourney.rows.length; for (g = 0; g < cd; g++) { if (ce == bm.data.Tourney.rows[g].id) { cc.tourneyGrid.selrow = g; break } } };
    bM.prototype.tourneyTabCaption = function() { var g, cc;
        g = this;
        cc = bm.lang.LobbyCaptionTournaments + ": "; if (bm.local.filterTourneyActivate) { cc = cc + bm.data.Tourney.rows.length + "/" } cc = cc + bm.data.Tourney.total;
        g.lobbyTabs.setCaption(2, cc);
        g.lobbyTournaments.$menu.text(cc) };
    bM.prototype.tourneyTableOpen = function(ce, ch) { var cf, ci, cd, g, cc, cg, ck, cj, cl;
        cf = this;
        ci = cf.tableSelect; if (ch < 0) { cf.messageShow(bm.lang.LobbyCaptionNoTournament); return } cl = ce ? bm.data.SitnGo.rows : bm.data.Tourney.rows;
        cd = cl[ch].password == "Yes+";
        g = cl[ch].id;
        cc = cl[ch].tables; if (cc > 1) { bm.data.TableSelect.rows.length = 0; for (cg = 1; cg <= cc; cg++) { cj = {};
                cj.table = bm.lang.TableCaptionTable + " " + cg;
                bm.data.TableSelect.rows.push(cj) } ci.data.name = g;
            ci.data.needpw = cd;
            ci.setTitle(g);
            ci.show(true, bm.mobile);
            ci.controls.tableSelectGrid.setScale(ci.scale);
            ci.controls.tableSelectGrid.selrow = 0;
            ci.controls.tableSelectGrid.toprow = 0;
            ci.controls.tableSelectGrid.resize() } else { ck = "Table 1";
            ak("OpenTable", g + " - " + ck, "T", cd, 0) } };
    bM.prototype.tourneyTableSelectedOpen = function() { var g = this;
        g.tourneyTableOpen(false, g.tourneyGrid.selrow) };
    bM.prototype.tourneyTabSetup = function() { var g, cd, cc;
        g = this;
        bm.data.Tourney = {};
        bm.data.Tourney.cols = 6;
        cd = bu(R("TourneySortColumn")); if (cd < 0 || cd > 5) { cd = 0 } bm.data.Tourney.sortCol = cd;
        bm.data.Tourney.sortAscend = R("TourneySortAscend") != "false";
        bm.data.Tourney.sortable = true;
        bm.data.Tourney.widths = [0.26, 0.18, 0.16, 0.06, 0.11, 0.23];
        bm.data.Tourney.rows = [];
        bm.data.Tourney.urows = [];
        bm.data.Tourney.total = 0;
        bm.data.Tourney.rowHeight = bm.mobile ? 24 : 16;
        bm.data.Tourney.headers = [bm.lang.LobbyColumnTrnyID, bm.lang.LobbyColumnTrnyGame, bm.lang.LobbyColumnTrnyBuyIn, bm.lang.LobbyColumnTrnyTS, bm.lang.LobbyColumnTrnyReg, bm.lang.LobbyColumnTrnyStarts];
        bm.data.Tourney.fields = ["id", "game", "gameIndex", "buyin", "buyinSort", "ts", "reg", "regSort", "tables", "starts", "startSort", "startMin", "startTime", "password"];
        bm.data.Tourney.fieldsShow = ["id", "game", "buyin", "ts", "reg", "starts"];
        bm.data.Tourney.fieldsSort = ["id", "game", "buyinSort", "ts", "regSort", "startsSort"];
        bm.data.Tourney.fieldsNum = [false, false, false, true, false, false];
        bm.data.Tourney.fieldsHTML = [false, false, false, false, false, false];
        g.tourneyGrid = new b3($("#TourneyGrid", g.$dialog), bm.data.Tourney, function(ce) { g.tourneySelect(ce) }, function(ce) { g.tourneyTableOpen(false, ce) }, function() { g.tourneySaveSort() });
        cc = bm.lang.LobbyButtonFilter; if (bm.local.filterTourneyActivate) { cc = cc + " " + bm.checkMark } g.tourneyFilterBtn = new C($("#TourneyFilterBtn", g.$dialog), cc, 40, function() { g.tourneyFilterShow(false) });
        g.tourneyObserveBtn = new C($("#TourneyObserveBtn", g.$dialog), bm.lang.LobbyButtonTrnyObserve, 40, function() { g.tourneyTableSelectedOpen() });
        g.tourneyInfoBtn = new C($("#TourneyInfoBtn", g.$dialog), bm.lang.LobbyButtonTrnyInfo, 40, function() { g.tourneyInfoRequest() });
        g.tourneyPlayersBtn = new C($("#TourneyPlayersBtn", g.$dialog), bm.lang.LobbyButtonTrnyPlayers, 40, function() { g.tourneyPlayersShow() });
        g.tourneyRegisterBtn = new C($("#TourneyRegisterBtn", g.$dialog), bm.lang.LobbyButtonTrnyRegister, 40, function() { g.tourneyRegister() });
        g.tourneySelected = "";
        g.$tourneySelected = $("#TourneySelected", g.$dialog);
        bm.data.TourneyPlayer = {};
        bm.data.TourneyPlayer.cols = 4;
        cd = bu(R("TourneyPlayerSortColumn")); if (cd < 0 || cd > 3) { cd = 0 } bm.data.TourneyPlayer.sortCol = cd;
        bm.data.TourneyPlayer.sortAscend = R("TourneyPlayerSortAscend") != "false";
        bm.data.TourneyPlayer.sortable = true;
        bm.data.TourneyPlayer.widths = [0.4, 0.2, 0.2, 0.2];
        bm.data.TourneyPlayer.rows = [];
        bm.data.TourneyPlayer.rowHeight = 16;
        bm.data.TourneyPlayer.headers = [bm.lang.LobbyColumnTrnyPlayer, bm.lang.LobbyColumnTrnyTable, bm.lang.LobbyColumnTrnyChips, bm.lang.LobbyColumnTrnyRank];
        bm.data.TourneyPlayer.fields = ["player", "table", "chips", "rank"];
        bm.data.TourneyPlayer.fieldsShow = ["player", "table", "chips", "rank"];
        bm.data.TourneyPlayer.fieldsSort = ["player", "table", "chips", "rank"];
        bm.data.TourneyPlayer.fieldsNum = [false, true, true, true];
        bm.data.TourneyPlayer.fieldsHTML = [false, false, false, false];
        g.tourneyPlayerGrid = new b3($("#TourneyPlayerGrid", g.tourneyPlayers.$dialog), bm.data.TourneyPlayer, null, function(ce) { g.tourneyPlayerTable(false, ce) }, function() { g.tourneySaveSort() });
        bm.data.TourneyWait = {};
        bm.data.TourneyWait.cols = 2;
        bm.data.TourneyWait.sortCol = -1;
        bm.data.TourneyWait.sortAscend = true;
        bm.data.TourneyWait.sortable = false;
        bm.data.TourneyWait.widths = [0.23, 0.77];
        bm.data.TourneyWait.rows = [];
        bm.data.TourneyWait.rowHeight = 16;
        bm.data.TourneyWait.headers = ["#", bm.lang.LobbyColumnTrnyWaiting];
        bm.data.TourneyWait.fields = ["pos", "player"];
        bm.data.TourneyWait.fieldsShow = ["pos", "player"];
        bm.data.TourneyWait.fieldsSort = ["pos", "player"];
        bm.data.TourneyWait.fieldsNum = [true, false];
        bm.data.TourneyWait.fieldsHTML = [false, false];
        g.tourneyWaitGrid = new b3($("#TourneyWaitGrid", g.tourneyPlayers.$dialog), bm.data.TourneyWait) };
    bM.prototype.tourneyStartNowCheck = function() { var g = this; if (g.tourneySelected == bm.lang.LobbyCaptionNoTournament) { return } bU({ response: "StartNow", Table: g.tourneySelected, Checked: g.tourneyStartNow.isChecked() ? "Yes" : "No" }) };
    bM.prototype.tourneyUnselect = function() { var g = this;
        g.tourneySelected = "";
        g.$tourneySelected.text(bm.lang.LobbyCaptionNoTournament);
        bm.data.TourneyPlayer.rows.length = 0;
        g.tourneyPlayerGrid.update();
        bm.data.TourneyWait.rows.length = 0;
        g.tourneyWaitGrid.update();
        g.tourneyInfoBtn.enable(false);
        g.tourneyObserveBtn.enable(false);
        g.tourneyPlayersBtn.enable(false);
        g.tourneyRegisterBtn.enable(false);
        g.tourneyRegister2Btn.enable(false);
        g.tourneyPrevBtn.enable(false);
        g.tourneyNextBtn.enable(false);
        g.tourneyStartNow.show(false); if (g.lobbyTabs.getTab() == 2) { g.optionsStart.enable(false);
            g.tourneyPlayers.close() } };
    bM.prototype.transferConfirmCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.DialogConfirm });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.transferConfirmOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.transferConfirm = cd };
    bM.prototype.transferConfirmOk = function() { var g, cc;
        g = this;
        cc = g.transferConfirm;
        cc.close();
        bU({ Response: "Transfer", Action: "Finish", Recipient: cc.data.recipient, Amount: cc.data.amount, Primary: cc.data.primary }) };
    bM.prototype.transferConfirmShow = function(cg, ce, g, cd) { var cc, cf;
        cc = this;
        cf = cc.transferConfirm;
        cf.data.recipient = ce;
        cf.data.amount = g;
        cf.data.primary = cd;
        cf.showMessage(cg, true, bm.mobile) };
    bM.prototype.updateLobbyTitle = function() { var cc, g;
        cc = this; if (bm.mobile) { if (cc.lobbyTabs.getTab() == 4 && bm.tables.length > 0) { cc.$tableNamePanel.text(bm.tables[bm.tableCurrent].title);
                g = bm.siteName; if (bm.loggedIn) { g = g + " - " + bm.loginData.player } cc.$siteMobile.text(g).css("left", 503); if (cc.showMenu) { cc.$tableMenu.parent().show() } } else { g = bm.siteName; if (bm.loggedIn) { g = g + " - " + bm.lang.TableCaptionLoggedIn.split("%1%").join(bm.loginData.player) } cc.$siteMobile.text(g).css("left", 403);
                cc.$tableMenu.parent().hide() } cc.$sitePanel.text("") } else { if (bm.loggedIn) { g = bm.lang.LobbyCaptionTitleLogged.split("%1%").join(bm.loginData.player) } else { g = bm.lang.LobbyCaptionTitle } cc.setCaption(g);
            cc.$sitePanel.text(bm.siteName);
            cc.$siteMobile.text("").css("left", 403);
            cc.$tableMenu.parent().hide() } };

    function bz(cu, ck, cc, cr, ce, ch, ci, cp, cl, cn, cq, g, cm, cd, cj) { var co, cs, cf, ct, cg;
        co = this;
        co.id = ck;
        co.game = cr;
        co.buyin = ce;
        co.mix = ch;
        co.primary = cp;
        co.rebuyfee = cl;
        co.minchip = cn;
        co.sng = cq;
        co.sutg = g;
        co.player = cm;
        co.title = cu;
        co.chatQueue = [];
        co.infotext = "";
        co.type = cc;
        co.initLocalVariables();
        co.$dialog = $(".table").clone().removeClass("table").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient).css({ left: cd, top: cj }).attr("id", cc + ck);
        co.dialog = new bp(co.$dialog, null, { shadeparent: co, title: cu, removeonclose: true, minwidth: 356, minheight: 313, onresize: function() { co.resizeTable() }, onresized: function() { co.resizeFinish() } });
        co.modalList.push(co.dialog);
        co.$closeBtn = $(".closebtn", co.$dialog).on("touchstart mousedown", function() { co.closeTable(); return false });
        co.$content = $(".tablecontent", co.$dialog).css({ background: "url('Image?Name=" + ci + "') no-repeat" });
        $(".chatimage", co.$dialog).attr("src", "Image?Name=Chat&Crc=" + bm.crc.image).on("dragstart", function(cv) { return false });
        co.$chatEdit = $(".tablechatedit", co.$content);
        co.chatEdit = new aT(co.$chatEdit, { onEnterKey: function() { co.chatSend() } });
        co.$chatSendBtn = $(".tablechatsendbtn", co.$content);
        new C(co.$chatSendBtn, "&#8595;", 20, function() { co.chatSend() }).$button.css("border-radius", "0px");
        co.$chatText = $(".tablechattext", co.$content);
        co.chatText = new bC($(".tablechattext", co.$content), false);
        co.totalPlateSetup();
        co.horzChrome = 6;
        co.vertChrome = 58;
        co.createDialogs();
        co.dialog.show(false); if (bm.mobile) { co.vertChrome = 6;
            co.$dialog.css({ left: 0, top: 0, width: "100%", height: "100%", borderRadius: 0, boxShadow: "none" });
            $(".header", co.$dialog).hide();
            $(".menu", co.$dialog).hide();
            $(".tablecontent", co.$dialog).css("top", 3);
            co.showChat(false);
            co.$bannerright.show();
            co.$bannerright2.show();
            co.resizeTable();
            co.resizeFinish() } else { cs = co.$dialog.width();
            cf = co.$dialog.height();
            ct = bm.$webClient.width();
            cg = bm.$webClient.height(); if (cs > ct) { cs = ct;
                cf = ((cs - co.horzChrome) * 510 / 700) + co.vertChrome } if (cf > cg) { cf = cg;
                cs = ((cf - co.vertChrome) * 700 / 510) + co.horzChrome } if (cs != 706 || cf != 568) { co.$dialog.css({ width: cs, height: cf });
                co.resizeTable();
                co.resizeFinish() } } } bz.prototype.actionTimer = function(ch, cg, cf, ce, g) { var cd = this; if (g == 0 && cd.getPlayerSeat() == ch) { cd.foldAnyBetCheck(false);
            cd.foldAnyBetShow(false) } cd.playerAction[ch] = cf;
        cd.playerChips[ch] = g;
        cd.setHint(ch); if (ce == 0) { cc() } else { cd.seat[ch].setInfo(cg);
            setTimeout(cc, ce) }

        function cc() { cf = cd.playerAction[ch];
            g = cd.playerChips[ch]; if (cf == "") { cd.seat[ch].setInfo(bL(g)) } else { cd.seat[ch].setInfo(cf) } } };
    bz.prototype.addRingChipsCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".addringchips").clone().removeClass("addringchips").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: cc.id });
        $(".arc_addchips", g).text(bm.lang.ChipsTitle);
        cd.controls.chipsMin = new aH($(".arc_buyinmin", g), bm.lang.ChipsMin, function() { cd.controls.chipsInput.setText("") });
        cd.controls.chipsMax = new aH($(".arc_buyinmax", g), bm.lang.ChipsMax, function() { cd.controls.chipsInput.setText("") });
        cd.controls.chipsOther = new aH($(".arc_buyinother", g), bm.lang.ChipsOther);
        cd.controls.chipsInput = new aT($(".arc_otherinput", g), { onFocus: function() { cd.controls.chipsOther.setCheck() }, border: true });
        cd.controls.chipsAuto = new b($(".arc_autorebuy", g), bm.lang.ChipsAuto);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.addRingChipsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.addRingChips = cd };
    bz.prototype.addRingChipsOk = function() { var g, ce, cc, cd;
        g = this;
        cd = g.addRingChips;
        cd.close();
        ce = bN(cd.controls.chipsInput.getText()); if (cd.controls.chipsMin.isChecked()) { ce = "Min" } else { if (cd.controls.chipsMax.isChecked()) { ce = "Max" } else { if (ce < 0) { g.messageShow(bm.lang.ChipsInvalid); return } } } cc = { Response: "AddChips" };
        cc.Table = g.id;
        cc.Type = "R";
        cc.Amount = ce; if (cd.controls.chipsAuto.isChecked()) { cc.AutoRebuy = "Yes" } else { cc.AutoRebuy = "No" } bU(cc) };
    bz.prototype.addRingChipsShow = function() { var g = this;
        g.addRingChips.controls.chipsMin.setCheck();
        g.addRingChips.show(true, bm.mobile) };
    bz.prototype.addTourneyChipsOk = function() { var g, cc;
        g = this;
        g.addTourneyChips.close();
        cc = { Response: "AddChips" };
        cc.Table = g.id;
        cc.Type = g.type;
        bU(cc) };
    bz.prototype.addTourneyChipsCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: cc.id });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.addTourneyChipsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.addTourneyChips = cd };
    bz.prototype.betButtonClick = function(cc) { var cd, g;
        cd = this;
        g = 0; switch (cc) {
            case 1:
                g = cd.betButton1.amount; break;
            case 2:
                g = cd.betButton2.amount; break;
            case 3:
                g = cd.betButton3.amount; break;
            case 4:
                g = cd.betButton4.amount; break } if (g < cd.minRaiseTo) { g = cd.minRaiseTo } else { if (g > cd.maxRaiseTo) { g = cd.maxRaiseTo } } cd.raiseInput.setText(g);
        cd.raiseInputChange() };
    bz.prototype.betButtonsVisible = function() { return (this.button1.isVisible() || this.button2.isVisible() || this.button3.isVisible() || this.button4.isVisible()) };
    bz.prototype.betLabelCSS = function(ch) { var cd, cg, ce, g, cf, cc;
        cd = this;
        cg = cd.seats;
        ce = cd.seatPosition(ch);
        cc = cd.$betLabel[ch].width();
        g = cd.chipX[cg][ce];
        cf = cd.chipY[cg][ce] - cd.chyOfs; if (cd.seat[ch].isRight) { g = g - cd.chxOfs - 2 - cc } else { g = g + cd.chxOfs + 2 } return { left: g, top: cf } };
    bz.prototype.betShow = function(ch, cc) { var cd, cg, ce, g, cf;
        cd = this;
        cd.playerBet[ch] = cc;
        cg = cd.seats;
        ce = cd.seatPosition(ch);
        g = cd.chipX[cg][ce];
        cf = cd.chipY[cg][ce];
        cd.$bet[ch].xytrans(0).css({ left: g - cd.chxOfs, top: cf - cd.chyOfs });
        cd.stackChips(cd.$bet[ch], cc);
        cd.$bet[ch].toggle(cc > 0);
        cd.$betLabel[ch].text(bL(cc)).xytrans(0).css(cd.betLabelCSS(ch)).toggle(cc > 0) };
    bz.prototype.bringToFront = function() { var cd, cc, g;
        cd = this; if (cd.$dialog.css("z-index") < bm.zTop) { for (cc = 0; cc < cd.modalList.length; cc++) { cd.modalList[cc].$dialog.css("z-index", ++bm.zTop) } } aG(cd.dialog);
        bm.tableCurrent = bm.tables.indexOf(cd); if (bm.mobile) { cd.chatUpdate();
            bm.lobby.prevTableBtn.enable(bm.tableCurrent > 0);
            bm.lobby.nextTableBtn.enable(bm.tableCurrent < bm.tables.length - 1);
            bm.lobby.updateLobbyTitle();
            g = $("ul", bm.lobby.$tableMenu.parent()); if (g.is(":visible")) { bm.doc.$menu = null;
                g.hide() } } };
    bz.prototype.button1Click = function() { var g, cc;
        g = this; if (bm.hasTouch == false) { g.chatFocus() } cc = g.button1.command; if (cc == "Fold") { if (g.button2.command == "Check") { g.confirmFold.showMessage(bm.lang.MessageConfirmFold, true, bm.mobile); return } if (g.showOnFold.isVisible() && g.showOnFold.isChecked()) { cc = "Fold+" } } g.sendButton(cc, 0);
        g.buttonsOff() };
    bz.prototype.button2Click = function() { var g, cc;
        g = this; if (bm.hasTouch == false) { g.chatFocus() } cc = g.button2.command;
        g.sendButton(cc, 0);
        g.buttonsOff() };
    bz.prototype.button3Click = function() { var g, cc;
        g = this; if (bm.hasTouch == false) { g.chatFocus() } cc = g.button3.command;
        g.sendButton(cc, g.raiseTo);
        g.buttonsOff() };
    bz.prototype.button4Click = function() { var g, cc;
        g = this; if (bm.hasTouch == false) { g.chatFocus() } cc = g.button4.command;
        g.sendButton(cc, g.maxRaiseTo);
        g.buttonsOff() };
    bz.prototype.buttonsOff = function() { var g = this;
        g.setCommand(g.button1, "Off", 0);
        g.setCommand(g.button2, "Off", 0);
        g.setCommand(g.button3, "Off", 0);
        g.setCommand(g.button4, "Off", 0);
        g.showOnFold.setCheck(false);
        g.showOnFold.show(false);
        g.timeBankBtn.show(false);
        g.raiseInput.setText("");
        g.$raiseBox.hide();
        g.betButton1.show(false);
        g.betButton2.show(false);
        g.betButton3.show(false);
        g.betButton4.show(false);
        g.queued = false;
        bB() };
    bz.prototype.buyInRingChipsCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".buyinringchips").clone().removeClass("buyinringchips").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.BuyInTitle });
        cd.controls.buyInMin = new aH($(".brc_buyinmin", g), bm.lang.BuyInMin, function() { cd.controls.buyInInput.setText("") });
        cd.controls.buyInMax = new aH($(".brc_buyinmax", g), bm.lang.BuyInMax, function() { cd.controls.buyInInput.setText("") });
        cd.controls.buyInOther = new aH($(".brc_buyinother", g), bm.lang.BuyInOther);
        cd.controls.buyInInput = new aT($(".brc_otherinput", g), { onFocus: function() { cd.controls.buyInOther.setCheck() }, border: true });
        cd.controls.buyInAuto = new b($(".brc_autorebuy", g), bm.lang.BuyInAuto);
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.buyInRingChipsOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cc.buyInRingChipsDecline() });
        $(".closebtn", g).on("touchstart mousedown", function() { cc.buyInRingChipsDecline(); return false });
        cc.buyInRingChips = cd };
    bz.prototype.buyInRingChipsDecline = function() { var g, cc, cd;
        g = this;
        cd = g.buyInRingChips;
        clearInterval(cd.data.interval);
        cc = { Response: "RSVP" };
        cc.Table = g.id;
        cc.Type = "R";
        cc.BuyIn = 0;
        bU(cc);
        g.buyInRingChips.close() };
    bz.prototype.buyInRingChipsOk = function() { var cd, cc, g, cg, ce, cf;
        cd = this;
        cf = cd.buyInRingChips;
        clearInterval(cf.data.interval);
        cc = cf.data.min;
        g = cf.data.max;
        cg = bN(cf.controls.buyInInput.getText()); if (cf.controls.buyInMin.isChecked()) { cg = cc } else { if (cf.controls.buyInMax.isChecked()) { cg = g } else { if (cg < cc) { cd.messageShow(bm.lang.BuyInMessageMin.split("%1%").join(cc)); return } else { if (cg > g) { cd.messageShow(bm.lang.BuyInMessageMax.split("%1%").join(g)); return } } } } ce = { Response: "RSVP" };
        ce.Table = cd.id;
        ce.Type = "R";
        ce.BuyIn = cg; if (cf.controls.buyInAuto.isChecked()) { ce.AutoRebuy = "Yes" } else { ce.AutoRebuy = "No" } bU(ce);
        cf.close() };
    bz.prototype.buyInRingChipsShow = function(cc, ch, cj, cf, ck, cm, cg) { var cl, ce, ci, g;
        cl = this;
        ci = cl.buyInRingChips;
        ci.data.min = ch;
        ci.data.max = cj;
        $(".brc_instruct", ci.$dialog).text(bm.lang.BuyInMessage.split("%1%").join(cc).split("%2%").join(cl.id));
        $(".brc_seconds", ci.$dialog).text(bm.lang.BuyInSeconds + " " + cc);
        g = bg(bL(ck), cg);
        $(".brc_balance", ci.$dialog).text(bm.lang.BuyInBalance.split("%1%").join(g));
        $(".brc_rathole", ci.$dialog).text(bm.lang.BuyInRathole).toggle(cm);
        ci.controls.buyInMin.setCaption(bm.lang.BuyInMin + " " + bW(ch));
        ci.controls.buyInMax.setCaption(bm.lang.BuyInMax + " " + bW(cj));
        ci.controls.buyInInput.setText(bW(cf));
        ci.controls.buyInOther.setCheck();
        ci.show(true, bm.mobile);
        bI("beep");
        ce = (new Date()).getTime();
        ci.data.interval = setInterval(cd, 1000);

        function cd() { var cn = cc - Math.round(((new Date()).getTime() - ce) / 1000);
            $(".brc_seconds", ci.$dialog).text(bm.lang.BuyInSeconds + " " + cn); if (cn <= 0) { cl.buyInRingChipsDecline() } } };
    bz.prototype.changeGame = function(cd, cc) { var cg, ce, g, ch, cf;
        cg = this;
        cg.game = cd;
        cg.sutg = cc;
        cg.straddleShow(cg.sutg && cg.getPlayerSeat() > 0); if (cg.game == "holdem") { cg.holeCards = 2;
            cg.holeX = [0, 30, 16];
            cg.holeY = [0, 40, 40];
            cg.outNextBlindShow(cg.outNextHand.isVisible()) } else { if (cg.game == "omaha") { cg.holeCards = 4;
                cg.holeX = [0, 44, 30, 16, 2];
                cg.holeY = [0, 40, 40, 40, 40];
                cg.outNextBlindShow(cg.outNextHand.isVisible()) } else { if (cg.game == "omaha5") { cg.holeCards = 5;
                    cg.holeX = [0, 51, 37, 23, 9, -5];
                    cg.holeY = [0, 40, 40, 40, 40, 40];
                    cg.outNextBlindShow(cg.outNextHand.isVisible()) } else { cg.holeCards = 7;
                    cg.holeX = [0, 65, 51, 37, 23, 9, -5, -19];
                    cg.holeY = [0, 40, 40, 45, 45, 45, 45, 40];
                    cg.outNextBlindShow(false); if (cg.button1.command == "Wait") { cg.button1.show(false) } } } } ch = cg.seats; for (ce = 1; ce <= ch; ce++) { for (g = 1; g <= 7; g++) { if (!cg.card[g][ce]) { continue } if (cg.holeCards == 7 && g > 2 && g < 7) { cf = 45 } else { cf = 40 } cg.card[g][ce].hclip = cf } } cg.$bannermiddle.text(bm.lang.TableMessageMixed);
        setTimeout(function() { cg.$bannermiddle.text("") }, 3000) };
    bz.prototype.changeImage = function(cc) { var g;
        g = this;
        g.$content.css({ background: "url('Image?Name=" + cc + "') no-repeat" }) };
    bz.prototype.chatFocus = function() { var g, cc;
        g = this;
        cc = g.infoDialog; if (cc.controls.chatInfoMove.isChecked()) { cc.controls.chatInfoEdit.setFocus() } else { g.chatEdit.setFocus() } };
    bz.prototype.chatSend = function() { var cc, g, cd;
        cc = this;
        g = $.trim(cc.chatEdit.getText()); if (g == "") { return } if (bm.loggedIn == false) { cc.messageShow(bm.lang.MessageChatLogin); return } if (cc.suspendChat == true) { cc.messageShow(bm.lang.InfoSuspendChat); return } cd = { Response: "Chat" };
        cd.Table = cc.id;
        cd.Type = cc.type;
        cd.Text = g;
        bU(cd);
        cc.chatEdit.setText("") };
    bz.prototype.chatInfoSend = function() { var cc, ce, g, cd;
        cc = this;
        ce = cc.infoDialog;
        g = $.trim(ce.controls.chatInfoEdit.getText()); if (g == "") { return } if (bm.loggedIn == false) { cc.messageShow(bm.lang.MessageChatLogin); return } if (cc.suspendChat == true) { cc.messageShow(bm.lang.InfoSuspendChat); return } if (ce.controls.chatInfoMove.isChecked() == false) { ce.controls.chatInfoMove.setCheck(true);
            cc.moveChat() } cd = { Response: "Chat" };
        cd.Table = cc.id;
        cd.Type = cc.type;
        cd.Text = g;
        bU(cd);
        ce.controls.chatInfoEdit.setText("") };
    bz.prototype.chatUpdate = function() { var ch, cf, g, cd, cj, ci, cc, ce, cg;
        ch = this;
        cf = ch.infoDialog;
        g = cf.controls.chatInfoMove.isChecked(); if (g) { cd = cf.controls.chatInfoText } else { if (!bm.mobile) { cd = ch.chatText } else { if (bm.tableCurrent != bm.tables.indexOf(ch)) { return } cd = bm.lobby.mobileChatText } } cg = bm.local.tableChatTime;
        ci = ""; for (cc = 0; cc < ch.chatQueue.length; cc++) { cj = ch.chatQueue[cc];
            ci = ci + "<span>"; if (g && cg) { ce = "[" + cj.time + "] " } else { ce = "" } if (cj.player != "") { ci = ci + "<font color='" + cj.color1 + "'>" + ce + cj.title + cj.player + ":  </font><font color='" + cj.color2 + "'>" + cj.text + "</font>" } ci = ci + "</span><br>" } cd.setText(ci);
        cd.bottomScroll() };
    bz.prototype.clearNextMoves = function() { var g = this;
        g.nextMove = "";
        g.nextCommand1 = "";
        g.nextCommand2 = "";
        g.nextCommand3 = "";
        g.nextCommand4 = "";
        g.$nextPanel.hide();
        g.nextMove1.show(false);
        g.nextMove2.show(false);
        g.nextMove3.show(false);
        g.nextMove4.show(false);
        g.nextMove1.setCheck(false);
        g.nextMove2.setCheck(false);
        g.nextMove3.setCheck(false);
        g.nextMove4.setCheck(false) };
    bz.prototype.closeTable = function() { var cd, ce, g, cc;
        cd = this;
        cd.buttonsOff();
        ce = { Response: "CloseTable" };
        ce.Table = cd.id;
        ce.Type = cd.type;
        bU(ce);
        cd.infoClose(); while (cd.modalList.length > 1) { cd.modalList[cd.modalList.length - 1].close() } g = bm.tables.indexOf(cd); if (g >= 0) { bm.tables.splice(g, 1) } cd.dialog.close(); if (bm.tables.length == 0) { bm.lobby.$openTableBox.hide();
            bm.lobby.$openTableControls.hide(); if (!bm.lobby.showMenu) { bm.lobby.menuToggle(true) } bm.lobby.lobbyTabs.$contents.eq(4).css({ top: 40, left: 3, right: 3, bottom: 3 });
            $("#OpenBackground").show() } cc = bm.lang.LobbyCaptionOpen + ": " + bm.tables.length;
        bm.lobby.lobbyTabs.setCaption(4, cc);
        bm.lobby.lobbyOpenTables.$menu.text(cc); if (bm.tableCurrent >= bm.tables.length) { bm.tableCurrent = bm.tables.length - 1 } if (bm.tables.length > 0) { bm.tables[bm.tableCurrent].bringToFront() } else { if (bm.mobile) { bm.lobby.updateLobbyTitle() } } };
    bz.prototype.collectBets = function(cc) { var cn, g, cd, cm, cl, cg, ce, cf, ck, ci, ch;
        cn = this;
        cn.animating++;
        g = cc.Pot;
        cd = cn.seats;
        cl = "";
        cg = 0;
        ce = 300; if (cn.dialog == bm.focused && bm.soundOK) { bI("pot") } for (cf = 1; cf <= cd; cf++) { cm = bu(cc["Seat" + cf]); if (cm > 0) { cg++;
                ch = cn.seatPosition(cf);
                ck = cn.chipX[cd][ch];
                ci = cn.chipY[cd][ch];
                cn.potChips[g] = bu(cn.potChips[g]) + cm;
                cl = cl + (cf % 10).toString();
                cn.stackChips(cn.$bet[cf], cm);
                cn.$bet[cf].xytrans(0).css({ left: ck - cn.chxOfs, top: ci - cn.chyOfs }).show().redraw();
                cn.$betLabel[cf].text(bL(cm)).xytrans(0).css(cn.betLabelCSS(cf)).show().redraw();
                cn.$bet[cf].xytrans(ce).css({ left: cn.potX[g] - cn.chxOfs, top: cn.potY[g] - cn.chyOfs });
                cn.$betLabel[cf].xytrans(ce).css({ left: cn.potX[g] - cn.chxOfs, top: cn.potY[g] + cn.chyOfs }) } } setTimeout(cj, ce + 25);

        function cj() { var cp, cq, co;
            cp = cc.Pot;
            cq = cn.potChips[cp];
            cn.stackChips(cn.$pot[cp], cq);
            cn.potLabelSet(cp, cq); for (co = 1; co <= cn.seats; co++) { if (cl.indexOf(co % 10) >= 0) { cn.$bet[co].hide();
                    cn.$betLabel[co].hide() } } if (cn.animating > 0) { cn.animating-- } B(cn) } };
    bz.prototype.confirmFoldCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: cc.id });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.confirmFoldOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.confirmFold = cd };
    bz.prototype.confirmFoldOk = function() { var g, cc;
        g = this;
        g.confirmFold.close(); if (g.showOnFold.isVisible() && g.showOnFold.isChecked()) { cc = "Fold+" } else { cc = "Fold" } g.sendButton(cc, 0);
        g.buttonsOff() };
    bz.prototype.confirmLeave = function(ce) { var cd, cc, g, cf;
        cd = this;
        cc = cd.getPlayerSeat(); if (cc == 0) { cd.closeTable(); return } if (ce) { for (g = 1; g <= 7; g++) { cd.cardNum[g] = 0;
                cd.holeCard[g][cc] = 0;
                cd.card[g][cc].setCard(0) } cd.buttonsOff();
            cd.clearNextMoves();
            cf = { Response: "LeaveSeat" };
            cf.Table = cd.id;
            cf.Type = cd.type;
            bU(cf); return } if (cd.type == "R") { cd.closeTable() } else { cd.confirmLeaveDlg.showMessage(bm.lang.MessageConfirmLeave, true, bm.mobile) } };
    bz.prototype.confirmLeaveCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".yesno").clone().removeClass("yesno").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: cc.id });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.closeTable() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.confirmLeaveDlg = cd };
    bz.prototype.controlsCreate = function() { var g = this;
        g.$bannerleft = $(".bannerleft", g.$dialog);
        g.$bannerleft2 = $(".bannerleft2", g.$dialog);
        g.$bannermiddle = $(".bannermiddle", g.$dialog).css("color", bm.color.TableTop);
        g.$bannerright = $(".bannerright", g.$dialog).text(g.buyin).hide();
        g.$bannerright2 = $(".bannerright2", g.$dialog).hide();
        g.foldAnyBet = new b($(".foldanybet", g.$dialog), bm.lang.TableCaptionFoldAnyBet, function(cc) { g.foldAnyBetClick(cc) }).show(false);
        g.outNextHand = new b($(".outnexthand", g.$dialog), bm.lang.TableCaptionAwayHand, function(cc) { g.outNextHandClick(cc) }).show(false);
        g.outNextBlind = new b($(".outnextblind", g.$dialog), bm.lang.TableCaptionAwayBlind, function(cc) { g.outNextBlindClick(cc) }).show(false);
        g.straddle = new b($(".straddle", g.$dialog), bm.lang.TableCaptionStraddle, function(cc) { g.straddleClick(cc) }).show(false);
        g.showOnFold = new b($(".showonfold", g.$dialog), bm.lang.TableCaptionShowFold);
        g.showOnFold.show(false);
        g.$nextPanel = $(".nextPanel", g.$dialog).hide();
        g.nextMove1 = new b($(".nextmove1", g.$dialog), "", function(cc) { g.nextMove1Change(cc) }).show(false);
        g.nextMove2 = new b($(".nextmove2", g.$dialog), "", function(cc) { g.nextMove2Change(cc) }).show(false);
        g.nextMove3 = new b($(".nextmove3", g.$dialog), "", function(cc) { g.nextMove3Change(cc) }).show(false);
        g.nextMove4 = new b($(".nextmove4", g.$dialog), "", function(cc) { g.nextMove4Change(cc) }).show(false);
        g.$tablemessage = $(".tablemessage", g.$dialog);
        g.endBreak = new b($(".endbreak", g.$dialog), "", function(cc) { g.endBreakChange(cc) });
        g.endBreak.show(false);
        g.$raiseBox = $(".raisebox", g.$dialog).hide().css({ "background-color": bm.color.List, border: "1px outset " + bm.color.List }); if (bm.params.gradients) { g.$raiseBox.css("background-image", "url('Image?Name=Grad25')") } g.raiseInput = new aT($(".raiseinput", g.$raiseBox), { onEnterKey: function() { g.button3Click() }, onKeyUp: function() { g.raiseInputChange() } });
        g.raiseInput.$input.css("border", "1px solid " + bm.color.ButtonBorder);
        g.raiseSlider = new ad($(".raiseslider", g.$raiseBox), 0.01, function(cc) { g.raiseSliderChange(cc) });
        g.timeBankBtn = new C($(".timebankbtn", g.$dialog), bm.lang.TableButtonTime, 25, function() { g.timeBankBtn.show(false);
            g.sendButton("Time", 0) });
        g.timeBankBtn.show(false);
        g.button1 = new C($(".commandbtn1", g.$dialog), "", 30, function() { g.button1Click() });
        g.button1.show(false);
        g.button2 = new C($(".commandbtn2", g.$dialog), "", 30, function() { g.button2Click() });
        g.button2.show(false);
        g.button3 = new C($(".commandbtn3", g.$dialog), "", 30, function() { g.button3Click() });
        g.button3.show(false);
        g.button4 = new C($(".commandbtn4", g.$dialog), "", 30, function() { g.button4Click() });
        g.button4.show(false);
        g.betButton1 = new C($(".betbtn1", g.$dialog), "", 20, function() { g.betButtonClick(1) });
        g.betButton1.show(false);
        g.betButton2 = new C($(".betbtn2", g.$dialog), "", 20, function() { g.betButtonClick(2) });
        g.betButton2.show(false);
        g.betButton3 = new C($(".betbtn3", g.$dialog), "", 20, function() { g.betButtonClick(3) });
        g.betButton3.show(false);
        g.betButton4 = new C($(".betbtn4", g.$dialog), "", 20, function() { g.betButtonClick(4) });
        g.betButton4.show(false) };
    bz.prototype.createDialogs = function() { var g = this;
        g.addRingChipsCreate();
        g.addTourneyChipsCreate();
        g.buyInRingChipsCreate();
        g.confirmFoldCreate();
        g.confirmLeaveCreate();
        g.controlsCreate();
        g.getPasswordCreate();
        g.infoInit();
        g.initCoordinates();
        g.menuInit();
        g.mobileChatCreate();
        g.playerInfoCreate();
        g.rotateSeatsCreate();
        aM(g, true);
        L(g, true) };
    bz.prototype.dealCards = function(cn) { var cr, cf, cj, ci, cg, co, cl, ce, ck;
        cr = this;
        cr.ghosted = false;
        cr.animating++; if (cr.game == "omaha") { ck = 4 } else { if (cr.game == "omaha5") { ck = 5 } else { ck = 2 } } cf = cr.seats;
        co = 350 - cr.cxOfs;
        cl = 5; for (cj = 1; cj <= cf; cj++) { for (ci = 1; ci <= cr.holeCards; ci++) { cr.card[ci][cj].setCard(53).shade(false).moveTo(0, co, cl).clip(false).show(false) } } cg = 250; if (cr.dialog == bm.focused && bm.soundOK) { bI("card") } for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } ce = cr.seatPosition(cj);
            co = cr.seatX[cf][ce] - cr.holeX[1];
            cl = cr.seatY[cf][ce] - cr.holeY[1];
            cr.card[1][cj].show(true).redraw().moveTo(cg, co, cl) } setTimeout(cd, cg + 100);

        function cd() { if (cr.dialog == bm.focused && bm.soundOK) { bI("card2") } for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } ce = cr.seatPosition(cj);
                co = cr.seatX[cf][ce] - cr.holeX[2];
                cl = cr.seatY[cf][ce] - cr.holeY[2];
                cr.card[1][cj].clip(true);
                cr.card[2][cj].show(true).redraw().moveTo(cg, co, cl) } if (ck > 2) { setTimeout(ch, cg + 100) } else { setTimeout(cm, cg + 100) } }

        function ch() { if (cr.dialog == bm.focused && bm.soundOK) { bI("card3") } for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } ce = cr.seatPosition(cj);
                co = cr.seatX[cf][ce] - cr.holeX[3];
                cl = cr.seatY[cf][ce] - cr.holeY[3];
                cr.card[2][cj].clip(true);
                cr.card[3][cj].show(true).redraw().moveTo(cg, co, cl) } setTimeout(cp, cg + 100) }

        function cp() { if (cr.dialog == bm.focused && bm.soundOK) { bI("card4") } for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } ce = cr.seatPosition(cj);
                co = cr.seatX[cf][ce] - cr.holeX[4];
                cl = cr.seatY[cf][ce] - cr.holeY[4];
                cr.card[3][cj].clip(true);
                cr.card[4][cj].show(true).redraw().moveTo(cg, co, cl) } if (ck == 5) { setTimeout(cq, cg + 100) } else { setTimeout(cm, cg + 100) } }

        function cq() { if (cr.dialog == bm.focused && bm.soundOK) { bI("card5") } for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } ce = cr.seatPosition(cj);
                co = cr.seatX[cf][ce] - cr.holeX[5];
                cl = cr.seatY[cf][ce] - cr.holeY[5];
                cr.card[4][cj].clip(true);
                cr.card[5][cj].show(true).redraw().moveTo(cg, co, cl) } setTimeout(cm, cg + 100) }

        function cc() { for (cj = 1; cj <= cf; cj++) { if (cn.indexOf(cj % 10) < 0) { continue } cr.card[ck][cj].clip(true) } }

        function g() { cj = cr.getPlayerSeat(); if (cj == 0 || cn.indexOf(cj % 10) < 0) { return } ce = cr.seatPosition(cj); for (ci = 1; ci <= ck; ci++) { co = cr.seatX[cf][ce] - cr.holeX[ci];
                cl = cr.seatY[cf][ce] - cr.holeY[ci];
                cr.card[ci][cj].moveTo(0, co, cl).redraw() } }

        function cm() { cc();
            g();
            cr.showHoleCards();
            cr.updateHandHelper(); if (cr.animating > 0) { cr.animating-- } B(cr) } };
    bz.prototype.dealFlop = function() { var cd, ce, cc;
        cd = this;
        cd.animating++;
        ce = 250; if (cd.dialog == bm.focused && bm.soundOK) { bI("card") } for (cc = 1; cc <= 3; cc++) { cd.board[cc].setCard(53).shade(false);
            cd.board[cc].moveTo(0, 350 - cd.cxOfs, 5).show(true).redraw();
            cd.board[cc].moveTo(ce, cd.boardX[cc] - cd.cxOfs, cd.boardY - cd.cyOfs) } setTimeout(g, ce + 100);

        function g() { var cf; for (cf = 1; cf <= 3; cf++) { cd.board[cf].moveTo(0, cd.boardX[cf] - cd.cxOfs, cd.boardY - cd.cyOfs).redraw();
                cd.board[cf].setCard(cd.boardCard[cf]) } cd.updateHandHelper(); if (cd.animating > 0) { cd.animating-- } B(cd) } };
    bz.prototype.dealRiver = function() { var cc, ce, cd;
        cc = this;
        cc.animating++;
        ce = 250; if (cc.dialog == bm.focused && bm.soundOK) { bI("card") } if (cc.holeCards == 7) { cd = 3 } else { cd = 5 } cc.board[5].setCard(53).shade(false);
        cc.board[5].moveTo(0, 350 - cc.cxOfs, 5).show(true).redraw();
        cc.board[5].moveTo(ce, cc.boardX[cd] - cc.cxOfs, cc.boardY - cc.cyOfs);
        setTimeout(g, ce + 100);

        function g() { cc.board[5].moveTo(0, cc.boardX[cd] - cc.cxOfs, cc.boardY - cc.cyOfs).redraw();
            cc.board[5].setCard(cc.boardCard[5]);
            cc.updateHandHelper(); if (cc.animating > 0) { cc.animating-- } B(cc) } };
    bz.prototype.dealStreet = function(cd, g) { var ck, cf, cg, cj, ch, ce, cc;
        ck = this;
        ck.animating++;
        cg = ck.getPlayerSeat(); if (cg > 0 && cd < 7) { ck.cardNum[cd] = g[cg] } ce = ck.seats;
        cj = 350 - ck.cxOfs;
        ch = 5; for (cg = 1; cg <= ce; cg++) { if (g[cg] != 0) { ck.card[cd][cg].setCard(53).shade(false).moveTo(0, cj, ch).clip(false).show(false) } } cf = 250; if (ck.dialog == bm.focused && bm.soundOK) { bI("card") } for (cg = 1; cg <= ce; cg++) { if (g[cg] != 0) { cc = ck.seatPosition(cg);
                cj = ck.seatX[ce][cc] - ck.holeX[cd];
                ch = ck.seatY[ce][cc] - ck.holeY[cd];
                ck.card[cd][cg].show(true).redraw().moveTo(cf, cj, ch) } } setTimeout(ci, cf + 100);

        function ci() { for (cg = 1; cg <= ce; cg++) { if (g[cg] != 0) { cc = ck.seatPosition(cg);
                    cj = ck.seatX[ce][cc] - ck.holeX[cd];
                    ch = ck.seatY[ce][cc] - ck.holeY[cd];
                    ck.card[cd][cg].setCard(g[cg]).moveTo(0, cj, ch).clip(true).redraw() } } if (cd == 7 && !ck.isFaceDown) { ck.showHoleCards() } ck.updateHandHelper(); if (ck.animating > 0) { ck.animating-- } B(ck) } };
    bz.prototype.dealTurn = function() { var cc, cd;
        cc = this;
        cc.animating++;
        cd = 250; if (cc.dialog == bm.focused && bm.soundOK) { bI("card") } cc.board[4].setCard(53).shade(false);
        cc.board[4].moveTo(0, 350 - cc.cxOfs, 5).show(true).redraw();
        cc.board[4].moveTo(cd, cc.boardX[4] - cc.cxOfs, cc.boardY - cc.cyOfs);
        setTimeout(g, cd + 100);

        function g() { cc.board[4].moveTo(0, cc.boardX[4] - cc.cxOfs, cc.boardY - cc.cyOfs).redraw();
            cc.board[4].setCard(cc.boardCard[4]);
            cc.updateHandHelper(); if (cc.animating > 0) { cc.animating-- } B(cc) } };
    bz.prototype.deckChange = function() { var cd, cc, g;
        cd = this; for (cc = 1; cc <= 5; cc++) { cd.board[cc].setDeck() } for (cc = 1; cc <= cd.seats; cc++) { for (g = 1; g <= cd.holeCards; g++) { cd.card[g][cc].setDeck() } } };
    bz.prototype.defaultWindowSize = function() { var g = this;
        g.$dialog.width(706);
        g.resizeTable();
        g.resizeFinish() };
    bz.prototype.drawTable = function() { var cm, cc, cf, ce, ci, cd, cl, ch, g, ck, cj, cg;
        cm = this;
        cc = cm.seats; if (cc == 0) { return } if (cm.graphicsMade == false) { cm.makeGraphics() } ch = false; for (cf = 1; cf <= 5; cf++) { ci = bu(cm.boardCard[cf]);
            cm.board[cf].setCard(ci); if (ci != 0) { cm.board[cf].show(true) } } for (cf = 1; cf < cc; cf++) { ci = bu(cm.potChips[cf]); if (ci > 0) { cm.stackChips(cm.$pot[cf], ci);
                cm.potLabelSet(cf, ci) } else { cm.$pot[cf].hide();
                cm.$potLabel[cf].hide() } } cm.$dealer.hide(); for (cf = 1; cf <= cc; cf++) { g = cm.seatPosition(cf); for (ce = 1; ce <= cm.holeCards; ce++) { cm.card[ce][cf].show(false) } cm.seat[cf].clear();
            cm.$bet[cf].hide();
            cm.$betLabel[cf].hide(); if (cm.dealer == cf) { ck = cm.dealerX[cc][g];
                cj = cm.dealerY[cc][g];
                cm.$dealer.css({ left: ck - cm.dxOfs, top: cj - cm.dyOfs }); if (cm.holeCards < 7) { cm.$dealer.css("opacity", 1).show() } else { if (cm.mix.indexOf("h") > -1 || cm.mix.indexOf("o") > -1) { cm.$dealer.css("opacity", 0.35).show() } } } cm.seat[cf].setNoteColor("", 0);
            cd = aj(cm.playerName[cf]); if (cd != "") { cg = (cd == cm.player);
                cl = cm.playerAvatar[cf]; if (cl == 0) { cm.seat[cf].avatarSetCustom(cm.playerName[cf], cm.playerAvatarCrc[cf]) } else { cm.seat[cf].avatarSet(cl) } cm.seat[cf].chatBlockIcon(aw(cd));
                ce = bm.lobby.noteList.controls.noteGrid.getRow(cd, "player"); if (ce >= 0) { cm.seat[cf].setNoteColor(bm.data.Notes.rows[ce].noteText, bm.data.Notes.rows[ce].colorNum) } for (ce = 1; ce <= cm.holeCards; ce++) { ci = cm.holeCard[ce][cf];
                    cm.card[ce][cf].setCard(ci); if (ci != 0 && (!cm.ghosted || !cg)) { cm.card[ce][cf].show(true) } } if (cg) { cm.isFaceDown = (cm.holeCard[1][cf] == 53);
                    cm.updateHandHelper();
                    ch = true } cm.seat[cf].setGlow(cm.turn == cf);
                cm.seat[cf].setName(cd); if (cm.playerAction[cf] == "") { cm.seat[cf].setInfo(bL(cm.playerChips[cf])) } else { cm.seat[cf].setInfo(cm.playerAction[cf]) } ci = cm.playerBet[cf]; if (ci > 0) { ck = cm.chipX[cc][g];
                    cj = cm.chipY[cc][g];
                    cm.$bet[cf].css({ left: ck - cm.chxOfs, top: cj - cm.chyOfs });
                    cm.stackChips(cm.$bet[cf], ci);
                    cm.$betLabel[cf].text(bL(ci)).css(cm.betLabelCSS(cf)).show() } } cm.setHint(cf) } cm.updateTotal();
        cm.straddleShow(cm.sutg && ch);
        cm.straddleUpdate();
        cm.$closeBtn.toggle(!ch);
        cm.preferredSeatRotate() };
    bz.prototype.endBreakChange = function(cc) { var g, cd;
        g = this;
        cd = { Response: "EndBreakRequest" };
        cd.Table = g.id;
        cd.Type = g.type; if (cc) { cd.Checked = "Yes" } else { cd.Checked = "No" } bU(cd) };
    bz.prototype.endBreakUpdate = function(g) { var cc = this; if (g == "") { cc.endBreak.setCheck(false);
            cc.endBreak.show(false) } else { cc.endBreak.setCaption(g);
            cc.endBreak.show(true);
            cc.endBreak.enable(cc.getPlayerSeat() > 0) } };
    bz.prototype.foldAnyBetCheck = function(g) { this.foldAnyBet.setCheck(g) };
    bz.prototype.foldAnyBetClick = function(cc) { var g = this;
        g.foldAnyBetCheck(cc); if (bm.hasTouch == false) { g.chatFocus() } if (cc) { g.$nextPanel.hide();
            g.nextMove1.setCheck(false);
            g.nextMove2.setCheck(false);
            g.nextMove3.setCheck(false);
            g.nextMove4.setCheck(false);
            g.nextMove = ""; if (g.button2.command == "Check") { g.button2Click() } else { if (g.button1.command == "Fold") { g.button1Click() } } } };
    bz.prototype.foldAnyBetShow = function(g) { this.foldAnyBet.show(g) };
    bz.prototype.getPasswordCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".tablepassword").clone().removeClass("tablepassword").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.PasswordTitle });
        cd.controls.getPasswordInput = new aT($(".tp_input", g), { onEnterKey: function() { cc.getPasswordOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.getPasswordOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.getPassword = cd };
    bz.prototype.getPasswordOk = function() { var cc, g, cf, cd, ce;
        cc = this;
        ce = cc.getPassword;
        ce.close();
        g = ce.controls.getPasswordInput.getText();
        cf = ce.data.seat;
        bm.passwords["R" + cc.id] = g;
        cd = { Response: "RequestSeat" };
        cd.Table = cc.id;
        cd.Type = "R";
        cd.Seat = cf;
        cd.Password = g;
        bU(cd) };
    bz.prototype.getPasswordShow = function(ce) { var cc, g, cd;
        cc = this;
        cd = cc.getPassword;
        cd.data.seat = ce;
        cd.show(true, bm.mobile);
        g = bm.lang.PasswordPrompt.split("%1%").join(cc.id);
        $(".tp_label", cd.$dialog).text(g);
        cd.controls.getPasswordInput.setText(""); if (bm.hasTouch == false) { cd.controls.getPasswordInput.setFocus() } };
    bz.prototype.getPlayerSeat = function() { var cc, g;
        cc = this; if (cc.player == "") { return 0 } for (g = 1; g <= cc.seats; g++) { if (cc.player == cc.playerName[g]) { return g } } return 0 };
    bz.prototype.getRebuy = function() { var cc = this,
            cd, g; if (cc.getPlayerSeat() == 0) { cc.messageShow(bm.lang.MessageNotSeated); return } if (cc.type == "R") { cc.addRingChipsShow() } else { g = bg(bW(cc.rebuyfee), cc.primary);
            cd = bm.lang.ChipsRebuy.split("%1%").join(g);
            cc.addTourneyChips.showMessage(cd, true, bm.mobile) } };
    bz.prototype.ghostCards = function(g, cf) { var cd, cc, ce;
        cd = this; if (cd.getPlayerSeat() != cf || cd.cardNum[1] == 0 || !cd.ghosted) { return } for (cc = 1; cc <= cd.holeCards; cc++) { ce = cd.card[cc][cf].cardNum;
            cd.card[cc][cf].shade(true).show(g && ce > 0 && ce < 53) } };
    bz.prototype.guiChange = function() { var g;
        g = this;
        g.infoClose(); while (g.modalList.length > 1) { g.modalList[g.modalList.length - 1].close() } if (bm.mobile) { g.vertChrome = 6;
            g.$dialog.appendTo(bm.lobby.$openTableBox).css({ left: 0, top: 0, width: "100%", height: "100%", borderRadius: 0, boxShadow: "none" });
            $(".tablecontent", g.$dialog).css("top", 3) } else { g.vertChrome = 58;
            g.$dialog.appendTo(bm.$webClient).css({ left: bm.winOfsX, top: bm.winOfsY, width: 706, height: 568, borderRadius: "10px 10px 0px 0px", boxShadow: "3px 3px 10px 0px #404040" });
            aW();
            $(".tablecontent", g.$dialog).css("top", 55) } $(".header", g.$dialog).toggle(!bm.mobile);
        $(".menu", g.$dialog).toggle(!bm.mobile);
        $(".resize", g.$dialog).toggle(!bm.mobile);
        g.showChat(!bm.mobile);
        g.chatUpdate();
        g.setTitle(bK(g.id, g.type, g.sng));
        g.headerCaption(g.infotext);
        g.menuDWS.show(!bm.mobile);
        g.$bannerright.toggle(bm.mobile);
        g.$bannerright2.toggle(bm.mobile);
        g.resizeTable();
        g.resizeFinish();
        g.bringToFront();
        g.addRingChips.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.addTourneyChips.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.buyInRingChips.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.confirmFold.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.confirmLeaveDlg.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.getPassword.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.infoDialog.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.mobileChat.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.playerInfo.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.rotateDialog.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.colorLabel.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        g.playerNote.$dialog.appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient) };
    bz.prototype.headerCaption = function(g) { var cc = this;
        cc.infotext = g;
        $(".infobar", cc.$dialog).html(g) };
    bz.prototype.historyAdd = function(ci, ce) { var cd, cg, cc, cf, ch, g;
        cd = this;
        cg = cd.infoDialog;
        cc = cd.hhNumbers.length;
        g = cg.controls.historySlider.getValue();
        ch = g * (cc - 1); if (cc <= 1 || g == 1) { cg.controls.historyInfo.addTextLine(ce, 0) } if (cc > 0 && cd.hhNumbers[cc - 1] == ci) { cd.hhData[cc - 1] += ce + "<br>" } else { cd.hhNumbers[cc] = ci;
            cd.hhData[cc] = ce + "<br>";
            cf = cd.hhNumbers.length - 1; if (cf == 0) { cf = 1 } cg.controls.historySlider.increment = 1 / cf; if (g == 1) { cd.historyChange(g) } else { if (ch < 0 || cc < 1) { g = 0;
                    cg.controls.historySlider.setValue(g, false);
                    cd.historyChange(g) } else { g = ch / cc;
                    cg.controls.historySlider.setValue(g, false);
                    cd.historyLabel(g) } } } };
    bz.prototype.historyChange = function(cd) { var cc, ce, cf, g;
        cc = this;
        ce = cc.infoDialog; if (cc.hhNumbers.length == 0) { return } cc.historyLabel(cd);
        cf = cc.hhNumbers.length;
        g = Math.round(cd * (cf - 1));
        ce.controls.historyInfo.setText(cc.hhData[g]);
        ce.controls.historyInfo.topScroll() };
    bz.prototype.historyFirst = function() { var g, cc;
        g = this;
        cc = g.infoDialog;
        cc.controls.historySlider.setValue(0, true) };
    bz.prototype.historyLabel = function(ce) { var cd, cf, cg, cc, g;
        cd = this;
        cf = cd.infoDialog; if (cd.hhNumbers.length == 0) { return } cg = cd.hhNumbers.length;
        cc = Math.round(ce * (cg - 1));
        g = cc + 1;
        cf.controls.$historyNumber.text(cd.hhNumbers[cc] + "  (" + bm.lang.InfoHistoryOf.split("%1%").join(g).split("%2%").join(cg) + ")") };
    bz.prototype.historyLast = function() { var g, cc;
        g = this;
        cc = g.infoDialog;
        cc.controls.historySlider.setValue(1, true) };
    bz.prototype.historyNext = function() { var cc, cd, g;
        cc = this;
        cd = cc.infoDialog;
        g = cd.controls.historySlider.getValue() + cd.controls.historySlider.increment; if (g > 1) { g = 1 } cd.controls.historySlider.setValue(g, true) };
    bz.prototype.historyPrevious = function() { var cc, cd, g;
        cc = this;
        cd = cc.infoDialog;
        g = cd.controls.historySlider.getValue() - cd.controls.historySlider.increment; if (g < 0) { g = 0 } cd.controls.historySlider.setValue(g, true) };
    bz.prototype.infoClose = function() { var g, cc;
        g = this;
        cc = g.infoDialog; if (cc.controls.chatInfoMove.isChecked()) { cc.controls.chatInfoMove.setCheck(false);
            g.moveChat() } cc.close() };
    bz.prototype.infoInit = function() { var ce, cc, cf, g, cd;
        ce = this;
        cc = $(".tableinfo").clone().removeClass("tableinfo").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cf = new bp(cc, ce, { title: bm.lang.InfoTitle + " - " + ce.id, minwidth: 300, minheight: 250, onresize: function() { ce.resizeInfo() } });
        $(".infopanel", cc).css("background-color", bm.color.List);
        cf.controls.generalInfo = new bC($(".generalinfo", cc), false);
        cf.controls.statsInfo = new bC($(".statsinfo", cc), false);
        cf.controls.$historyNumber = $(".historynumber", cc);
        cf.controls.historySlider = new ad($(".historyslider", cc), 1, function(cg) { ce.historyChange(cg) });
        cf.controls.historySlider.setValue(1, false);
        cf.controls.historyInfo = new bC($(".historyinfo", cc), false);
        cf.controls.chatInfoText = new bC($(".chatinfotext", cc), false);
        cf.controls.chatInfoMove = new b($(".chatinfomove", cc), bm.lang.InfoMoveChat, function() { ce.moveChat() });
        new C($(".historyfirstbtn", cc), "|" + bm.arrowL, 30, function() { ce.historyFirst() });
        new C($(".historyprevbtn", cc), bm.arrowL, 30, function() { ce.historyPrevious() });
        new C($(".historynextbtn", cc), bm.arrowR, 30, function() { ce.historyNext() });
        new C($(".historylastbtn", cc), bm.arrowR + "|", 30, function() { ce.historyLast() });
        new C($(".ok", cc), bm.lang.DialogOK, 25, function() { ce.infoClose() });
        new C($(".save", cc), bm.lang.DialogSave, 25, function() { ce.infoSave() });
        cf.controls.chatInfoEdit = new aT($(".chatinfoedit", cc), { onEnterKey: function() { ce.chatInfoSend() } });
        new C($(".chatinfosendbtn", cc), "&#8595;", 25, function() { ce.chatInfoSend() }).$button.css("border-radius", "0px");
        $(".closebtn", cc).on("touchstart mousedown", function() { ce.infoClose(); return false });
        g = [bm.lang.InfoGeneral, bm.lang.InfoStats, bm.lang.InfoHistory, bm.lang.InfoChat];
        cd = [true, true, true, true];
        cf.controls.infoTabs = new aZ($(".infotabs", cc), g, cd, function(ch, cg) { ce.selectInfoTab(ch, cg) });
        ce.infoDialog = cf };
    bz.prototype.infoSave = function() { var cd, cc, g, cf, ce;
        cd = this;
        ce = cd.infoDialog; switch (ce.controls.infoTabs.getTab()) {
            case 0:
                a9(cd.title, ce.controls.generalInfo.getText(), false); break;
            case 1:
                a9(cd.title, ce.controls.statsInfo.getText(), false); break;
            case 2:
                cc = ""; for (g = 0; g < cd.hhData.length; g++) { cc = cc + cd.hhData[g] + "<br><br>" } a9(cd.title, cc, false); break;
            case 3:
                cf = ce.controls.chatInfoText.$memotext.clone();
                $("span", cf).each(function() { $(this).replaceWith($(this).text()) });
                $("font", cf).each(function() { $(this).replaceWith($(this).text()) });
                cc = ap(cf.html());
                a9(cd.title, cc, false); break } };
    bz.prototype.initCoordinates = function() { var g = this;
        g.boardX = [0, 252, 301, 350, 399, 448];
        g.boardY = 210;
        g.chipX = [];
        g.chipX[2] = [0, 544, 156];
        g.chipX[3] = [0, 527, 350, 173];
        g.chipX[4] = [0, 527, 527, 173, 173];
        g.chipX[5] = [0, 527, 527, 350, 173, 173];
        g.chipX[6] = [0, 422, 544, 422, 278, 156, 278];
        g.chipX[7] = [0, 527, 544, 527, 350, 173, 156, 173];
        g.chipX[8] = [0, 422, 527, 527, 422, 278, 173, 173, 278];
        g.chipX[9] = [0, 422, 527, 544, 527, 350, 173, 156, 173, 278];
        g.chipX[10] = [0, 422, 527, 544, 527, 422, 278, 173, 156, 173, 278];
        g.chipY = [];
        g.chipY[2] = [0, 200, 200];
        g.chipY[3] = [0, 125, 285, 125];
        g.chipY[4] = [0, 125, 264, 264, 125];
        g.chipY[5] = [0, 125, 264, 285, 264, 125];
        g.chipY[6] = [0, 112, 200, 285, 285, 200, 112];
        g.chipY[7] = [0, 125, 200, 264, 285, 264, 200, 125];
        g.chipY[8] = [0, 112, 125, 264, 285, 285, 264, 125, 112];
        g.chipY[9] = [0, 112, 125, 200, 264, 285, 264, 200, 125, 112];
        g.chipY[10] = [0, 112, 125, 200, 264, 285, 285, 264, 200, 125, 112];
        g.chxOfs = 11;
        g.chyOfs = 9;
        g.cxOfs = 23;
        g.cyOfs = 32;
        g.dealerX = [];
        g.dealerX[2] = [0, 544, 156];
        g.dealerX[3] = [0, 527, 271, 173];
        g.dealerX[4] = [0, 527, 527, 173, 173];
        g.dealerX[5] = [0, 527, 527, 271, 173, 173];
        g.dealerX[6] = [0, 386, 544, 386, 314, 156, 314];
        g.dealerX[7] = [0, 527, 544, 527, 271, 173, 156, 173];
        g.dealerX[8] = [0, 386, 527, 527, 386, 314, 173, 173, 314];
        g.dealerX[9] = [0, 386, 527, 544, 527, 271, 173, 156, 173, 314];
        g.dealerX[10] = [0, 386, 527, 544, 527, 386, 314, 173, 156, 173, 314];
        g.dealerY = [];
        g.dealerY[2] = [0, 221, 221];
        g.dealerY[3] = [0, 146, 323, 146];
        g.dealerY[4] = [0, 146, 285, 285, 146];
        g.dealerY[5] = [0, 146, 285, 323, 285, 146];
        g.dealerY[6] = [0, 83, 221, 332, 332, 221, 83];
        g.dealerY[7] = [0, 146, 221, 285, 323, 285, 221, 146];
        g.dealerY[8] = [0, 83, 146, 285, 332, 332, 285, 146, 83];
        g.dealerY[9] = [0, 83, 146, 221, 285, 323, 285, 221, 146, 83];
        g.dealerY[10] = [0, 83, 146, 221, 285, 333, 333, 285, 221, 146, 83];
        g.dxOfs = 11;
        g.dyOfs = 9; if (g.game == "holdem") { g.holeCards = 2;
            g.holeX = [0, 30, 16];
            g.holeY = [0, 40, 40] } else { if (g.game == "omaha") { g.holeCards = 4;
                g.holeX = [0, 44, 30, 16, 2];
                g.holeY = [0, 40, 40, 40, 40] } else { if (g.game == "omaha5") { g.holeCards = 5;
                    g.holeX = [0, 51, 37, 23, 9, -5];
                    g.holeY = [0, 40, 40, 40, 40, 40] } else { g.holeCards = 7;
                    g.holeX = [0, 65, 51, 37, 23, 9, -5, -19];
                    g.holeY = [0, 40, 40, 45, 45, 45, 45, 40] } } } g.seatX = [];
        g.seatX[2] = [0, 627, 72];
        g.seatX[3] = [0, 608, 350, 92];
        g.seatX[4] = [0, 608, 608, 92, 92];
        g.seatX[5] = [0, 608, 608, 350, 92, 92];
        g.seatX[6] = [0, 468, 627, 468, 231, 72, 231];
        g.seatX[7] = [0, 608, 627, 608, 350, 92, 72, 92];
        g.seatX[8] = [0, 468, 608, 608, 468, 231, 92, 92, 231];
        g.seatX[9] = [0, 468, 608, 627, 608, 350, 92, 72, 92, 231];
        g.seatX[10] = [0, 468, 608, 627, 608, 468, 231, 92, 72, 92, 231];
        g.seatY = [];
        g.seatY[2] = [0, 192, 192];
        g.seatY[3] = [0, 102, 341, 102];
        g.seatY[4] = [0, 102, 282, 282, 102];
        g.seatY[5] = [0, 102, 282, 341, 282, 102];
        g.seatY[6] = [0, 52, 192, 341, 341, 192, 52];
        g.seatY[7] = [0, 102, 192, 282, 341, 282, 192, 102];
        g.seatY[8] = [0, 52, 102, 282, 341, 341, 282, 102, 52];
        g.seatY[9] = [0, 52, 102, 192, 282, 341, 282, 192, 102, 52];
        g.seatY[10] = [0, 52, 102, 192, 282, 341, 341, 282, 192, 102, 52];
        g.sxOfs = 65;
        g.syOfs = 38;
        g.potX = [0, 350, 251, 448, 251, 448, 316, 384, 302, 398];
        g.potY = [0, 153, 153, 153, 255, 255, 255, 255, 153, 153] };
    bz.prototype.initLocalVariables = function() { var g = this;
        g.animating = 0;
        g.board = [];
        g.boardCard = [];
        g.card = [];
        g.card[1] = [];
        g.card[2] = [];
        g.card[3] = [];
        g.card[4] = [];
        g.card[5] = [];
        g.card[6] = [];
        g.card[7] = [];
        g.cardNum = [0, 0, 0, 0, 0, 0, 0, 0];
        g.dealer = 1;
        g.ghosted = false;
        g.graphicsMade = false;
        g.handHelper = "";
        g.hhData = [];
        g.hhNumbers = [];
        g.holeCard = [];
        g.holeCard[1] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[2] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[3] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[4] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[5] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[6] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.holeCard[7] = [0, 0, 0, 0, 0, 0, 0, 0];
        g.isFaceDown = false;
        g.liveStraddle = false;
        g.maxRaiseTo = 0;
        g.minRaiseTo = 0;
        g.modalList = [];
        g.seat = [];
        g.nextCommand1 = "";
        g.nextCommand2 = "";
        g.nextCommand3 = "";
        g.nextCommand4 = "";
        g.nextMove = "";
        g.packetQueue = [];
        g.password = false;
        g.playerAction = [];
        g.playerAvatar = [];
        g.playerAvatarCrc = [];
        g.playerBet = [];
        g.playerChips = [];
        g.playerCustom = [];
        g.playerGender = [];
        g.playerLevel = [];
        g.playerLocation = [];
        g.playerName = [];
        g.playerRealName = [];
        g.playerAway = [];
        g.playerTime = [];
        g.playerTitle = [];
        g.potChips = [];
        g.queued = false;
        g.raiseInc = 0;
        g.raiseMultiple = 1;
        g.raiseTo = 0;
        g.rotate = 0;
        g.seats = 0;
        g.suspendChat = false;
        g.totalPot = "";
        g.turn = 0;
        g.$bet = [];
        g.$betLabel = [];
        g.$dealer = null;
        g.$pot = [];
        g.$potLabel = [] };
    bz.prototype.leaveSeatCheck = function(cc) { var g = this;
        cc.enable(g.getPlayerSeat() > 0 && g.type == "R") };
    bz.prototype.makeGraphics = function() { var cj, cf, ce, cg, ci, ch, cd, g, cc;
        cj = this; for (cf = 1; cf <= 5; cf++) { ci = cj.boardX[cf] - cj.cxOfs;
            ch = cj.boardY - cj.cyOfs;
            cj.board[cf] = new bZ(cj, 64, ci, ch);
            cj.board[cf].$container.on("touchstart mousedown", function(ck) { cj.toggleBoard(); return false }) } cd = cj.seats; for (cf = 1; cf <= cd; cf++) { g = cj.seatPosition(cf);
            ci = cj.seatX[cd][g];
            ch = cj.seatY[cd][g];
            cc = (cj.game == "stud" || cj.game == "razz"); for (ce = 1; ce <= 7; ce++) { if (cc && ce > 2 && ce < 7) { cg = 45 } else { cg = 40 } cj.card[ce][cf] = new bZ(cj, cg, ci - cj.holeX[ce], ch - cj.holeY[ce]);
                cj.card[ce][cf].clip(true) } cj.seat[cf] = new by(cj, ci - cj.sxOfs, ch - cj.syOfs, cf);
            cj.seat[cf].show(true);
            ci = cj.chipX[cd][g];
            ch = cj.chipY[cd][g];
            cj.$bet[cf] = $("<div>").addClass("chipstack").css({ left: ci - cj.chxOfs, top: ch - cj.chyOfs }).appendTo(cj.$content);
            cj.$betLabel[cf] = $("<div>").css({ color: bm.color.TableTop }).appendTo(cj.$content) } for (cf = 1; cf < cd; cf++) { ci = cj.potX[cf];
            ch = cj.potY[cf] - cj.chyOfs;
            cj.$pot[cf] = $("<div>").addClass("chipstack").css({ left: ci - cj.chxOfs, top: ch }).appendTo(cj.$content);
            ch = cj.potY[cf] + cj.chyOfs;
            cj.$potLabel[cf] = $("<div>").css({ left: ci, top: ch, color: bm.color.TableTop }).appendTo(cj.$content) } g = cj.seatPosition(1);
        ci = cj.dealerX[cd][g] - cj.dxOfs;
        ch = cj.dealerY[cd][g] - cj.dyOfs;
        cj.$dealer = $("<div>").addClass("dealer").css({ left: ci, top: ch, background: "url('Image?Name=Chips&Crc=" + bm.crc.image + "') no-repeat 0px 0px" }).appendTo(cj.$content);
        cj.graphicsMade = true };
    bz.prototype.menuInit = function() { var g = this;
        $(".menu, .infobar", g.$dialog).css({ color: bm.color.ButtonText, "background-color": bm.color.Button });
        $(".menu ul", g.$dialog).css({ color: bm.color.ListText, "background-color": bm.color.List, "border-color": bm.color.ListText });
        $(".menu_sep", g.$dialog).css({ "background-color": bm.color.ListText });
        $(".menu ul li", g.$dialog).hover(bA, bS);
        $(".tablemenu", g.$dialog).text(bm.lang.TableMenuMenu);
        new b1($(".menuGeneralInfo", g.$dialog), bm.lang.TableMenuOptionsGeneral, function() { g.showInfo(0) }, true);
        new b1($(".menuStatistics", g.$dialog), bm.lang.TableMenuOptionsStats, function() { g.showInfo(1) }, true);
        new b1($(".menuHandHistory", g.$dialog), bm.lang.TableMenuOptionsHistory, function() { g.showInfo(2) }, true);
        new b1($(".menuExtendedChat", g.$dialog), bm.lang.TableMenuOptionsChat, function() { g.showInfo(3) }, true);
        new b1($(".menuAddMoreChips", g.$dialog), bm.lang.TableMenuOptionsAddChips, function() { g.getRebuy() }, true);
        g.menuDWS = new b1($(".menuDefaultWindowSize", g.$dialog), bm.lang.TableMenuOptionsWindowSize, function() { g.defaultWindowSize() }, true);
        g.menuDWS.show(!bm.mobile);
        new b1($(".menuRefreshTable", g.$dialog), bm.lang.TableMenuOptionsRefresh, function() { g.refreshTable() }, true);
        new b1($(".menuRotateSeats", g.$dialog), bm.lang.TableMenuOptionsRotate, function() { g.rotateSeatsShow(0) }, true);
        $(".leavemenu", g.$dialog).text(bm.lang.TableMenuLeave).on("touchstart mousedown", function(cc) { g.leaveSeatCheck(g.leaveSeatMenu);
            cc.preventDefault() });
        g.leaveSeatMenu = new b1($(".menuLeaveSeat", g.$dialog), bm.lang.TableMenuLeaveSeat, function() { g.confirmLeave(true) }, true);
        new b1($(".menuLeaveTable", g.$dialog), bm.lang.TableMenuLeaveTable, function() { g.confirmLeave(false) }, true) };
    bz.prototype.messageShow = function(cf, ce) { var cc, g, cd;
        cc = this;
        g = $(".message").clone().removeClass("message").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient); if (!ce || ce == "") { ce = bm.lang.DialogMessage } cd = new bp(g, cc, { title: ce, removeonclose: true });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cd.showMessage(cf, true, bm.mobile) };
    bz.prototype.mobileChatCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".mobilechat").clone().removeClass("mobilechat").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: cc.id });
        $(".mc_label", g).text(bm.lang.TableCaptionChatText);
        cd.controls.mobileChatInput = new aT($(".mc_input", g), { onEnterKey: function() { cc.mobileChatOk() }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { cc.mobileChatOk() });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.mobileChat = cd };
    bz.prototype.mobileChatOk = function() { var cc, cd, g;
        cc = this;
        cd = cc.mobileChat;
        g = cd.controls.mobileChatInput.getText();
        cc.chatEdit.setText(g);
        cd.close();
        cc.chatSend() };
    bz.prototype.mobileChatShow = function() { var cc, cd, g;
        cc = this;
        cd = cc.mobileChat;
        cd.show(true, bm.mobile);
        g = cc.chatEdit.getText();
        cd.controls.mobileChatInput.setText(g); if (bm.hasTouch == false) { cd.controls.mobileChatInput.setFocus() } };
    bz.prototype.moveChat = function() { var g, cc;
        g = this;
        cc = g.infoDialog; if (cc.controls.chatInfoMove.isChecked()) { if (bm.mobile) { cc.controls.chatInfoEdit.setText("");
                bm.lobby.mobileChatText.setText("") } else { cc.controls.chatInfoEdit.setText(g.chatEdit.getText());
                g.chatEdit.setText("");
                g.chatText.setText("");
                g.showChat(false) } } else { if (bm.mobile) { cc.controls.chatInfoEdit.setText("");
                cc.controls.chatInfoText.setText("") } else { g.chatEdit.setText(cc.controls.chatInfoEdit.getText());
                cc.controls.chatInfoEdit.setText("");
                cc.controls.chatInfoText.setText("");
                g.showChat(true) } } g.chatUpdate() };
    bz.prototype.moveDealer = function(cd) { var ce, g, ci, ch, cg, cf;
        ce = this;
        ce.animating++;
        ce.dealer = cd;
        ch = ce.seats;
        cg = ce.seatPosition(cd);
        g = ce.dealerX[ch][cg] - ce.dxOfs;
        ci = ce.dealerY[ch][cg] - ce.dyOfs;
        cf = 500;
        ce.$dealer.css("opacity", 1).show().redraw();
        ce.$dealer.xytrans(cf).css({ left: g, top: ci });
        setTimeout(cc, cf + 25);

        function cc() { if (ce.animating > 0) { ce.animating-- } B(ce) } };
    bz.prototype.nextMove1Change = function(cc) { var g = this;
        g.nextMove1.setCheck(cc); if (!cc) { g.nextMove = "" } else { g.nextMove2.setCheck(false);
            g.nextMove3.setCheck(false);
            g.nextMove4.setCheck(false);
            g.nextMove = g.nextCommand1;
            g.foldAnyBetCheck(false) } };
    bz.prototype.nextMove2Change = function(cc) { var g = this;
        g.nextMove2.setCheck(cc); if (!cc) { g.nextMove = "" } else { g.nextMove1.setCheck(false);
            g.nextMove3.setCheck(false);
            g.nextMove4.setCheck(false);
            g.nextMove = g.nextCommand2;
            g.foldAnyBetCheck(false) } };
    bz.prototype.nextMove3Change = function(cc) { var g = this;
        g.nextMove3.setCheck(cc); if (!cc) { g.nextMove = "" } else { g.nextMove1.setCheck(false);
            g.nextMove2.setCheck(false);
            g.nextMove4.setCheck(false);
            g.nextMove = g.nextCommand3;
            g.foldAnyBetCheck(false) } };
    bz.prototype.nextMove4Change = function(cc) { var g = this;
        g.nextMove4.setCheck(cc); if (!cc) { g.nextMove = "" } else { g.nextMove1.setCheck(false);
            g.nextMove2.setCheck(false);
            g.nextMove3.setCheck(false);
            g.nextMove = g.nextCommand4;
            g.foldAnyBetCheck(false) } };
    bz.prototype.outNextBlindCheck = function(g) { this.outNextBlind.setCheck(g) };
    bz.prototype.outNextBlindClick = function(g) { this.outNextBlindCheck(g);
        this.sendSitOut("SitBlind", g) };
    bz.prototype.outNextBlindShow = function(g) { this.outNextBlind.show(g) };
    bz.prototype.outNextHandCheck = function(g) { this.outNextHand.setCheck(g) };
    bz.prototype.outNextHandClick = function(g) { this.outNextHandCheck(g);
        this.sendSitOut("SitHand", g) };
    bz.prototype.outNextHandShow = function(g) { this.outNextHand.show(g) };
    bz.prototype.playerInfoCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".playerinfo").clone().removeClass("playerinfo").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, {});
        cd.data.piName = "";
        cd.controls.piProfile = new C($(".pi_profile", g), bm.lang.PlayerProfile, 25, function() { aP(cd.data.piName) });
        cd.controls.piNotes = new C($(".pi_notes", g), bm.lang.PlayerNotes, 25, function() { cd.close();
            z(cc, cd.data.piName) });
        cd.controls.piSearch = new C($(".pi_search", g), bm.lang.PlayerSearch, 25, function() { cc.playerInfoSearch() });
        cd.data.piHereValue = 0;
        cd.controls.piRotate = new C($(".pi_rotate", g), bm.lang.RotateHere, 25, function() { cc.rotateSeats(cd.data.piHereValue, true);
            cd.close() });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.playerInfo = cd };
    bz.prototype.playerInfoShow = function(ce) { var cc, cd, g;
        cc = this;
        cd = cc.playerInfo;
        cd.data.piSeat = ce;
        cd.data.piName = aj(cc.playerName[ce]);
        g = cc.getPlayerSeat(); if (cd.data.piName == "") { cd.setTitle(bm.lang.MouseOverSeat + " #" + ce);
            cd.controls.piProfile.enable(false);
            cd.controls.piNotes.enable(false);
            cd.controls.piSearch.enable(false) } else { cd.setTitle(cd.data.piName);
            cd.controls.piProfile.enable(bm.profileURL != "");
            cd.controls.piNotes.enable(true);
            cd.controls.piSearch.enable(true) } if (g != 0 && g != ce) { cd.controls.piRotate.enable(true);
            cd.data.piHereValue = ce - g } else { cd.controls.piRotate.enable(false) } cd.show(true, bm.mobile) };
    bz.prototype.playerInfoSearch = function() { var g, cc;
        g = this;
        cc = g.playerInfo;
        bU({ Response: "PlayerSearch", Player: cc.data.piName, Table: g.id, TT: g.type }) };
    bz.prototype.potAward = function(cc) { var cn, ce, ci, cm, co, cd, ch, cg, cf, g, cl, cj;
        cn = this;
        cn.animating++;
        ce = 300;
        ci = cc.Pot;
        cm;
        cn.potChips[ci] = 0;
        cn.$pot[ci].hide();
        cn.$potLabel[ci].hide();
        cd = cn.seats;
        ch = 0; if (cn.dialog == bm.focused && bm.soundOK) { bI("pot") } for (cg = 1; cg <= cd; cg++) { cm = bu(cc["Seat" + cg]); if (cm > 0) { ch++;
                g = cn.seatPosition(cg);
                cn.stackChips(cn.$bet[cg], cm);
                cn.$bet[cg].xytrans(0).css({ left: cn.potX[ci] - cn.chxOfs, top: cn.potY[ci] - cn.chyOfs }).show().redraw();
                cn.$betLabel[cg].xytrans(0).css({ left: cn.potX[ci] - cn.chxOfs, top: cn.potY[ci] + cn.chyOfs }).text(bL(cm)).show().redraw();
                cl = cn.chipX[cd][g];
                cj = cn.chipY[cd][g];
                cn.$bet[cg].xytrans(ce).css({ left: cl - cn.chxOfs, top: cj - cn.chyOfs });
                cn.$betLabel[cg].xytrans(ce).css(cn.betLabelCSS(cg));
                co = aj(cc["Mask" + cg]); if (co == "") { continue } for (cf = 1; cf <= 5; cf++) { cn.board[cf].shade(co.charAt(cf - 1) == "0") } for (cf = 1; cf <= cn.holeCards; cf++) { cn.card[cf][cg].shade(co.charAt(cf + 4) == "0") } } } setTimeout(ck, ce + 25);

        function ck() { if (cn.animating > 0) { cn.animating-- } B(cn) } };
    bz.prototype.potLabelSet = function(ce, cd) { var cc = this,
            g;
        cc.$potLabel[ce].text(bL(cd)).show();
        g = cc.$potLabel[ce].width();
        cc.$potLabel[ce].css({ left: cc.potX[ce] - (g / 2), top: cc.potY[ce] + cc.chyOfs }) };
    bz.prototype.potRake = function(ce, cd, cc) { var g = this;
        g.potChips[ce] = cd;
        g.stackChips(g.$pot[ce], cd);
        g.potLabelSet(ce, cd);
        g.totalPot = cc;
        g.updateTotal() };
    bz.prototype.preferredSeatRotate = function() { var cc, g, ce, cd, cf;
        cc = this; if (!bm.local.preferredSeat) { return } g = cc.getPlayerSeat(); if (g == 0) { return } ce = cc.seatPosition(g);
        cf = cc.seats - 2;
        cd = bu(bm.seatPosition[cf]); if (cd == 0 || ce == cd) { return } cc.rotateSeats(cd - ce, false) };
    bz.prototype.preferredSeatSave = function() { var cc, g, cd, ce;
        cc = this; if (!bm.local.preferredSeat) { return } g = cc.getPlayerSeat(); if (g == 0) { return } cd = cc.seatPosition(g);
        ce = cc.seats - 2;
        bm.seatPosition[ce] = cd;
        y("seatPosition", JSON.stringify(bm.seatPosition)) };
    bz.prototype.raiseInputChange = function() { var g, cc, cd;
        g = this;
        g.raiseTo = bN(g.raiseInput.getText());
        g.raiseTo = Math.round(g.raiseTo / g.raiseMultiple) * g.raiseMultiple; if (g.raiseTo < g.minRaiseTo) { g.raiseTo = g.minRaiseTo } if (g.raiseTo > g.maxRaiseTo) { g.raiseTo = g.maxRaiseTo } cc = (g.raiseTo - g.minRaiseTo) / (g.maxRaiseTo - g.minRaiseTo);
        g.raiseSlider.setValue(cc, false); if (g.button3.isVisible()) { cd = g.button3.command; if (cd == "Bet") { g.setCommand(g.button3, "Bet", g.raiseTo) } else { g.setCommand(g.button3, "Raise", g.raiseTo) } } };
    bz.prototype.raiseSliderChange = function(cd) { var cc, g;
        cc = this; if (cd == 0) { g = cc.minRaiseTo } else { if (cd == 1) { g = cc.maxRaiseTo } else { g = cd * (cc.maxRaiseTo - cc.minRaiseTo) + cc.minRaiseTo;
                g = Math.round(g / cc.raiseInc) * cc.raiseInc } } cc.raiseInput.setText(bW(g));
        cc.raiseInputChange() };
    bz.prototype.refreshTable = function() { var cd, g, ce, cc;
        cd = this; for (g = 1; g <= 5; g++) { if (cd.board[g]) { cd.board[g].$container.remove();
                delete cd.board[g] } } for (g = 1; g <= 10; g++) { if (cd.card[1][g]) { cd.card[1][g].$container.remove();
                delete cd.card[1][g] } if (cd.card[2][g]) { cd.card[2][g].$container.remove();
                delete cd.card[2][g] } if (cd.card[3][g]) { cd.card[3][g].$container.remove();
                delete cd.card[3][g] } if (cd.card[4][g]) { cd.card[4][g].$container.remove();
                delete cd.card[4][g] } if (cd.card[5][g]) { cd.card[5][g].$container.remove();
                delete cd.card[5][g] } if (cd.card[6][g]) { cd.card[6][g].$container.remove();
                delete cd.card[6][g] } if (cd.card[7][g]) { cd.card[7][g].$container.remove();
                delete cd.card[7][g] } if (cd.seat[g]) { cd.seat[g].$container.remove();
                delete cd.seat[g] } if (cd.$bet[g]) { cd.$bet[g].remove() } if (cd.$betLabel[g]) { cd.$betLabel[g].remove() } } for (g = 1; g <= 9; g++) { if (cd.$pot[g]) { cd.$pot[g].remove() } if (cd.$potLabel[g]) { cd.$potLabel[g].remove() } } if (cd.$dealer) { cd.$dealer.remove() } cd.graphicsMade = false;
        cd.cardNum[1] = 0;
        cd.cardNum[2] = 0;
        cd.cardNum[3] = 0;
        cd.cardNum[4] = 0;
        cd.cardNum[5] = 0;
        cd.cardNum[6] = 0;
        cd.cardNum[7] = 0;
        cd.animating = 0;
        cd.packetQueue.length = 0;
        ce = { Response: "OpenTable" };
        ce.Table = cd.id;
        ce.Type = cd.type;
        cc = bm.passwords[cd.type + cd.id]; if (cc) { ce.Password = cc } bU(ce) };
    bz.prototype.resizeInfo = function() { var cc, g, cd;
        cc = this;
        cd = cc.infoDialog;
        g = ($(".infotabs", cc.infoDialog.$dialog).width() - 20) / 4;
        cd.controls.infoTabs.setTabWidth(g);
        cd.controls.generalInfo.updateScrollPosition();
        cd.controls.statsInfo.updateScrollPosition();
        cd.controls.chatInfoText.updateScrollPosition();
        cd.controls.historySlider.updateThumb();
        cd.controls.historyInfo.updateScrollPosition() };
    bz.prototype.resizeFinish = function() { var g = this; if (!bm.mobile && (g.$dialog.height() > $(document).height())) { g.$dialog.width(706);
            g.resizeTable() } g.$content.hide().show(0) };
    bz.prototype.resizeTable = function() { var cn, ck, ch, cf, g, cd, cg, cj, ci, cl, ce, cm, cc;
        cn = this; if (bm.mobile) { $("#OpenBackground").hide();
            bm.lobby.lobbyTabs.$contents.eq(4).css({ top: 0, left: 3, right: 3, bottom: 3 });
            ck = bm.lobby.$openTableBox.parent().width();
            ch = bm.lobby.$openTableBox.parent().height();
            ce = 240;
            cl = (ce - 6) / 2;
            cf = ck - ce - cn.horzChrome;
            g = ch - cn.vertChrome;
            cd = 700 / 510; if (cf / g > cd) { cg = ch;
                cj = Math.round((cg - cn.vertChrome) * cd) + cn.horzChrome;
                ci = (ck - cj);
                bm.lobby.$openTableBox.css({ top: 0, right: ci, bottom: 0 });
                bm.lobby.$openTableControls.css({ top: 0, width: ci, bottom: 0 });
                cl = (ci - 6) / 2 } else { cj = ck - ce;
                cg = Math.round((cj - cn.horzChrome) / cd) + cn.vertChrome;
                cm = (ch - cg) / 2;
                bm.lobby.$openTableBox.css({ top: cm, right: ce, bottom: cm });
                bm.lobby.$openTableControls.css({ top: cm, width: ce, bottom: cm }) } bm.lobby.menuToggleBtn.$container.css("width", cl);
            bm.lobby.lobbyShowBtn.$container.css("width", cl);
            bm.lobby.nextTableBtn.$container.css("width", cl);
            bm.lobby.prevTableBtn.$container.css("width", cl);
            bm.lobby.nextTableBtn.$container.css("width", cl);
            bm.lobby.$openTableBox.show();
            bm.lobby.$openTableControls.show();
            cc = (cj - cn.horzChrome) / 700 } else { cc = (cn.$dialog.width() - cn.horzChrome) / 700;
            cg = Math.round(cc * 510) + cn.vertChrome;
            cn.$dialog.css("height", cg) } cn.$content.css("transform", "scale(" + cc + ")");
        cc = cc * bm.lobby.dialog.scale;
        cn.raiseSlider.setScale(cc);
        cn.chatText.setScale(cc);
        cn.dialog.scale = cc };
    bz.prototype.rotateSeats = function(cd, ch) { var cl, ce, ck, cg, cf, cj, ci, g, cc;
        cl = this;
        ce = cl.playerInfo;
        ck = cl.rotateDialog;
        cc = cl.seats;
        ce.data.piHereValue = ce.data.piHereValue - cd;
        ce.controls.piRotate.enable(ce.data.piHereValue != 0);
        cl.rotate = (cl.rotate + cd) % cc; if (cl.rotate < 0) { cl.rotate = cl.rotate + cc } ck.controls.$rsStatus.text(bm.lang.RotateStatus.split("%1%").join(cl.rotate)); for (cg = 1; cg <= cl.seats; cg++) { g = cl.seatPosition(cg);
            cj = cl.seatX[cc][g];
            ci = cl.seatY[cc][g]; for (cf = 1; cf <= cl.holeCards; cf++) { if (cl.card[cf][cg]) { cl.card[cf][cg].moveTo(500, cj - cl.holeX[cf], ci - cl.holeY[cf]) } } if (cl.seat[cg]) { cl.seat[cg].adjustSide();
                cl.seat[cg].$container.xytrans(500).css({ left: cj - cl.sxOfs, top: ci - cl.syOfs }) } cj = cl.chipX[cc][g];
            ci = cl.chipY[cc][g]; if (cl.$bet[cg]) { cl.$bet[cg].xytrans(500).css({ left: cj - cl.chxOfs, top: ci - cl.chyOfs }) } if (cl.$betLabel[cg]) { cl.$betLabel[cg].xytrans(500).css(cl.betLabelCSS(cg)) } } g = cl.seatPosition(cl.dealer);
        cj = cl.dealerX[cc][g];
        ci = cl.dealerY[cc][g]; if (cl.$dealer) { cl.$dealer.xytrans(500).css({ left: cj - cl.dxOfs, top: ci - cl.dyOfs }) } if (ch) { cl.preferredSeatSave() } };
    bz.prototype.rotateSeatsCreate = function() { var cc, g, cd;
        cc = this;
        g = $(".rotateseats").clone().removeClass("rotateseats").appendTo(bm.mobile ? bm.lobby.$openTableBox : bm.$webClient);
        cd = new bp(g, cc, { title: bm.lang.RotateTitle });
        cd.controls.$rsStatus = $(".rs_status", g);
        new C($(".rs_cw", g), bm.lang.RotateCW, 25, function() { cc.rotateSeats(1, true) });
        new C($(".rs_ccw", g), bm.lang.RotateCCW, 25, function() { cc.rotateSeats(-1, true) });
        new C($(".rs_reset", g), bm.lang.RotateReset, 25, function() { cc.rotateSeats(-cc.rotate, true) });
        new C($(".okbtn", g), bm.lang.DialogOK, 25, function() { cd.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cd.close(); return false });
        cc.rotateDialog = cd };
    bz.prototype.rotateSeatsShow = function(cc) { var g, cd;
        g = this;
        cd = g.rotateDialog;
        cd.controls.$rsStatus.text(bm.lang.RotateStatus.split("%1%").join(g.rotate));
        cd.show(true, bm.mobile) };
    bz.prototype.seatClick = function(cd) { var cc, ce, g;
        cc = this;
        ce = cd.data.seatNum;
        g = cc.getPlayerSeat(); if (g > 0 && g != ce) { cc.rotateSeatsShow(ce - g) } };
    bz.prototype.seatPosition = function(cd) { var g, cc;
        g = this;
        cc = cd + g.rotate; if (cc > g.seats) { cc = cc - g.seats } return cc };
    bz.prototype.seatRequest = function(cd) { var cc, g;
        cc = this; if (cc.type == "T") { return } if (bm.loggedIn == false) { cc.messageShow(bm.lang.MessageRingGameLogin); return } if (cc.getPlayerSeat() > 0) { return } if (cc.playerName[cd] != null && cc.playerName[cd] != "") { return } g = bm.passwords["R" + cc.id]; if (cc.password == true && g == null) { cc.getPasswordShow(cd) } else { packet = { Response: "RequestSeat", Table: cc.id, Type: "R", Seat: cd }; if (g != null) { packet.Password = g } bU(packet) } };
    bz.prototype.selectInfoTab = function(g, ce) { var cc, cd;
        cc = this;
        cd = cc.infoDialog; switch (g) {
            case 0:
                cd.controls.generalInfo.topScroll(); break;
            case 1:
                cd.controls.statsInfo.topScroll(); break;
            case 2:
                cd.controls.historyInfo.topScroll();
                cd.controls.historySlider.updateThumb(); break;
            case 3:
                cd.controls.chatInfoText.updateScrollPosition(); break } };
    bz.prototype.sendButton = function(ce, g) { var cc, cd;
        cc = this;
        cd = { Response: "Button" };
        cd.Table = cc.id;
        cd.Type = cc.type;
        cd.Button = ce;
        cd.Amount = g;
        bU(cd) };
    bz.prototype.sendSitOut = function(cd, cc) { var g, ce;
        g = this;
        ce = { Response: "SitOut" };
        ce.Table = g.id;
        ce.Type = g.type;
        ce.Box = cd; if (cc) { ce.Checked = "Yes" } else { ce.Checked = "No" } bU(ce) };
    bz.prototype.setCommand = function(cd, ce, cc) { var g = "Error"; switch (ce) {
            case "Pre1":
                g = bm.preFlopButtons[bm.local.preFlopButton1]; break;
            case "Pre2":
                g = bm.preFlopButtons[bm.local.preFlopButton2]; break;
            case "Pre3":
                g = bm.preFlopButtons[bm.local.preFlopButton3]; break;
            case "Pre4":
                g = bm.preFlopButtons[bm.local.preFlopButton4]; break;
            case "Post1":
                g = bm.postFlopButtons[bm.local.postFlopButton1]; break;
            case "Post2":
                g = bm.postFlopButtons[bm.local.postFlopButton2]; break;
            case "Post3":
                g = bm.postFlopButtons[bm.local.postFlopButton3]; break;
            case "Post4":
                g = bm.postFlopButtons[bm.local.postFlopButton4]; break;
            case "Fold":
                g = bm.lang.TableButtonFold; break;
            case "Check":
                g = bm.lang.TableButtonCheck; break;
            case "Bring":
                g = bm.lang.TableButtonBring.split("%1%").join(bL(cc)); break;
            case "Call":
                g = bm.lang.TableButtonCall.split("%1%").join(bL(cc)); break;
            case "Bet":
                g = bm.lang.TableButtonBet.split("%1%").join(bL(cc)); break;
            case "Raise":
                g = bm.lang.TableButtonRaise.split("%1%").join(bL(cc)); break;
            case "Wait":
                g = bm.lang.TableButtonWait; break;
            case "Ready":
                g = bm.lang.TableButtonReady; break;
            case "Start":
                g = bm.lang.TableButtonStart; break;
            case "Muck":
                g = bm.lang.TableButtonMuck; break;
            case "Show":
                g = bm.lang.TableButtonShow; break;
            case "Leave":
                g = bm.lang.TableButtonLeave; break;
            case "Rebuy":
                g = bm.lang.TableButtonRebuy; break;
            case "Double Rebuy":
                g = bm.lang.TableButtonDoubleRebuy; break;
            case "Off":
                g = "";
                cd.show(false); break } cd.command = ce;
        cd.amount = cc;
        cd.setCaption(g) };
    bz.prototype.setHint = function(cf) { var cp, cd, g, cc, ce, cl, cm, cg, ci, ch, co, ck, cj;
        cp = this;
        cd = aj(cp.playerName[cf]); if (cd == "") { cg = bm.lang.MouseOverSeat + " #" + cf } else { g = a6(cp.playerRealName[cf]);
            cc = a6(cp.playerTitle[cf]);
            ce = a6(cp.playerLevel[cf]);
            cl = a6(cp.playerCustom[cf]);
            cm = cp.playerAway[cf];
            cg = bm.lang.MouseOverSeat + " " + cf + ": " + cd + "  (" + g; if (g != "") { cg = cg + " " } cg = cg + bm.lang.MouseOverFrom + " " + a6(cp.playerLocation[cf]) + ")  " + cp.playerGender[cf] + "<br>" + bm.lang.MouseOverChips + ": " + bL(cp.playerChips[cf]) + ",  " + bm.lang.MouseOverTimeBank + ": " + cp.playerTime[cf]; if (cm != "") { cg = cg + "<br>" + bm.lang.MouseOverAway + ": " + cp.playerAway[cf] } ci = ""; if (cc != "") { ci = bm.lang.MouseOverTitle + ": " + cc } if (ce != "") { if (ci != "") { ci = ci + ",  " } ci = ci + bm.lang.MouseOverLevel + ": " + ce } if (ci != "") { cg = cg + "<br>" + ci } if (cl != "" && bm.customMouseOver == true) { ch = ""; if (bm.customCaption != "") { ch = bm.customCaption + ": " } ch = ch + cl;
                cg = cg + "<br>" + ch } ck = cp.seat[cf].colorNum;
            cj = cp.seat[cf].noteText; if (ck > 0 && bm.notelabel[ck] != "") { co = "[" + bm.notelabel[ck] + "] " } else { co = "" } co = co + cj; if (co != "") { cg = cg + "<br>" + bm.lang.NoteNote + ": " + a6(co).split("\n").join("<br>") } } cp.seat[cf].hint = cg };
    bz.prototype.setTableBanners = function(cd, cc, g) { this.$bannerleft.text(cd);
        this.$bannermiddle.text(cc);
        this.$bannerright2.text(g) };
    bz.prototype.setTableCapBanner = function(g) { this.$bannerleft2.text(g) };
    bz.prototype.setTableMessage = function(g) { this.$tablemessage.text(g) };
    bz.prototype.setTitle = function(cc) { var g = this;
        g.title = cc;
        $(".title", g.$dialog).text(cc) };
    bz.prototype.setupButtons = function(ch, cg, cf, ce, cd, cc, g, cj) { var ci = this;
        ci.button1.show(ch != "");
        ci.button2.show(cg != "");
        ci.button3.show(cf != "");
        ci.button4.show(ce != "");
        ci.setCommand(ci.button1, ch, cd);
        ci.setCommand(ci.button2, cg, cc);
        ci.setCommand(ci.button3, cf, g);
        ci.setCommand(ci.button4, ce, cj) };
    bz.prototype.setupRaiseBar = function(cc, ci, cg, ch, g) { var cf, cd, ce;
        cf = this;
        ce = cf.$raiseBox.is(":visible");
        cf.minRaiseTo = cc;
        cf.raiseTo = cc;
        cf.maxRaiseTo = ci;
        cf.raiseInc = cg;
        cf.raiseMultiple = ch;
        cd = (cf.minRaiseTo > 0 && cf.minRaiseTo < cf.maxRaiseTo && g == ""); if (cd && ce) { cf.raiseInputChange(); return } cf.$raiseBox.toggle(cd); if (!cd) { return } cf.raiseSlider.increment = cg / (ci - cc);
        cf.raiseSlider.setValue(0, true) };
    bz.prototype.calcPostFlopRaise = function(cc, g, cd, cf) { var ce, cg;
        ce = this;
        cg = bm.local["postFlopButton" + cc]; switch (cg) {
            case 0:
                return ce.minRaiseTo; break;
            case 1:
                return ac((cf + cd) * 0.2 + cd + g, ce.minchip); break;
            case 2:
                return ac((cf + cd) * 0.25 + cd + g, ce.minchip); break;
            case 3:
                return ac((cf + cd) * 0.3 + cd + g, ce.minchip); break;
            case 4:
                return ac((cf + cd) / 3 + cd + g, ce.minchip); break;
            case 5:
                return ac((cf + cd) * 0.35 + cd + g, ce.minchip); break;
            case 6:
                return ac((cf + cd) * 0.4 + cd + g, ce.minchip); break;
            case 7:
                return ac((cf + cd) * 0.45 + cd + g, ce.minchip); break;
            case 8:
                return ac((cf + cd) * 0.5 + cd + g, ce.minchip); break;
            case 9:
                return ac((cf + cd) * 0.55 + cd + g, ce.minchip); break;
            case 10:
                return ac((cf + cd) * 0.6 + cd + g, ce.minchip); break;
            case 11:
                return ac((cf + cd) * 0.65 + cd + g, ce.minchip); break;
            case 12:
                return ac((cf + cd) * 2 / 3 + cd + g, ce.minchip); break;
            case 13:
                return ac((cf + cd) * 0.7 + cd + g, ce.minchip); break;
            case 14:
                return ac((cf + cd) * 0.75 + cd + g, ce.minchip); break;
            case 15:
                return ac((cf + cd) * 0.8 + cd + g, ce.minchip); break;
            case 16:
                return cf + cd + cd + g; break;
            case 17:
                return ce.maxRaiseTo; break } };
    bz.prototype.calcPreFlopRaise = function(cc, cg, g, cd, cf) { var ce, ch;
        ce = this;
        ch = bm.local["preFlopButton" + cc]; switch (ch) {
            case 0:
                return ce.minRaiseTo; break;
            case 1:
                return ac(cg * 2.5, ce.minchip); break;
            case 2:
                return ac(cg * 3, ce.minchip); break;
            case 3:
                return ac(cg * 3.5, ce.minchip); break;
            case 4:
                return ac(cg * 4, ce.minchip); break;
            case 5:
                return ac(cg * 4.5, ce.minchip); break;
            case 6:
                return ac(cg * 5, ce.minchip); break;
            case 7:
                return ac(cg * 5.5, ce.minchip); break;
            case 8:
                return ac(cg * 6, ce.minchip); break;
            case 9:
                return cf + cd + cd + g; break;
            case 10:
                return ce.maxRaiseTo; break } };
    bz.prototype.setupRaiseButtons = function(cc, ce, g, cl, cg) { var ck, ci, cj, ch, cf, cd;
        ck = this;
        ci = (ck.$raiseBox.is(":visible") && ce > 0);
        ck.betButton1.show(ci);
        ck.betButton2.show(ci);
        ck.betButton3.show(ci);
        ck.betButton4.show(ci); if (!ci) { return } if (cc) { cj = ck.calcPreFlopRaise(1, ce, g, cl, cg);
            ch = ck.calcPreFlopRaise(2, ce, g, cl, cg);
            cf = ck.calcPreFlopRaise(3, ce, g, cl, cg);
            cd = ck.calcPreFlopRaise(4, ce, g, cl, cg);
            ck.setCommand(ck.betButton1, "Pre1", cj);
            ck.setCommand(ck.betButton2, "Pre2", ch);
            ck.setCommand(ck.betButton3, "Pre3", cf);
            ck.setCommand(ck.betButton4, "Pre4", cd) } else { cj = ck.calcPostFlopRaise(1, g, cl, cg);
            ch = ck.calcPostFlopRaise(2, g, cl, cg);
            cf = ck.calcPostFlopRaise(3, g, cl, cg);
            cd = ck.calcPostFlopRaise(4, g, cl, cg);
            ck.setCommand(ck.betButton1, "Post1", cj);
            ck.setCommand(ck.betButton2, "Post2", ch);
            ck.setCommand(ck.betButton3, "Post3", cf);
            ck.setCommand(ck.betButton4, "Post4", cd) } ck.betButton1.enable(cj >= ck.minRaiseTo);
        ck.betButton2.enable(ch >= ck.minRaiseTo);
        ck.betButton3.enable(cf >= ck.minRaiseTo);
        ck.betButton4.enable(cd >= ck.minRaiseTo) };
    bz.prototype.showChat = function(g) { var cc = this;
        $(".chatimage", cc.$dialog).toggle(g);
        cc.$chatSendBtn.toggle(g);
        cc.$chatEdit.toggle(g);
        cc.$chatText.toggle(g); if (g) { cc.chatText.updateScrollPosition();
            cc.straddle.$container.css({ top: 345, fontSize: "0.85em" });
            cc.showOnFold.$container.css({ top: 365, fontSize: "0.85em" });
            cc.foldAnyBet.$container.css({ top: 332, fontSize: "0.85em" });
            cc.outNextHand.$container.css({ top: 352, fontSize: "0.85em" });
            cc.outNextBlind.$container.css({ top: 372, fontSize: "0.85em" });
            cc.$tablemessage.css({ left: 365, width: 320, fontSize: "1em" });
            cc.endBreak.$container.css({ left: 475, top: 445, "font-size": "1em" });
            cc.$nextPanel.css({ left: 365, top: 440, width: 320, height: 64, "font-size": "1em" });
            cc.nextMove1.$container.css({ left: 5, top: 5 });
            cc.nextMove2.$container.css({ left: 130, top: 5 });
            cc.nextMove3.$container.css({ left: 5, top: 40 });
            cc.nextMove4.$container.css({ left: 130, top: 40 });
            cc.betButton1.move(498, 418).resize(45, 20, 20).fontSize("1em");
            cc.betButton2.move(545, 418).resize(45, 20, 20).fontSize("1em");
            cc.betButton3.move(592, 418).resize(45, 20, 20).fontSize("1em");
            cc.betButton4.move(639, 418).resize(45, 20, 20).fontSize("1em");
            cc.$raiseBox.css({ left: 498, top: 440, width: 185, height: 25 }); if (bm.params.gradients) { cc.$raiseBox.css("background-image", "url('Image?Name=Grad25')") } cc.raiseInput.$container.css({ left: 2, top: 2, width: 73, height: 21, "font-size": "1em" });
            cc.raiseSlider.$container.css({ left: 85, top: 2, width: 95, height: 21 });
            cc.raiseSlider.updateThumb();
            cc.timeBankBtn.move(365, 440).resize(125, 27, 25).lineHeight("25px").fontSize("1em");
            cc.button1.move(365, 472).resize(100, 32, 30).lineHeight("14px").fontSize("1em");
            cc.button2.move(475, 472).resize(100, 32, 30).lineHeight("14px").fontSize("1em");
            cc.button3.move(585, 472).resize(100, 32, 30).lineHeight("14px").fontSize("1em");
            cc.button4.move(585, 435).resize(100, 32, 30).lineHeight("14px").fontSize("1em") } else { cc.straddle.$container.css({ top: 335, fontSize: "1em" });
            cc.showOnFold.$container.css({ top: 365, fontSize: "1em" });
            cc.foldAnyBet.$container.css({ top: 365, fontSize: "1em" });
            cc.outNextHand.$container.css({ top: 395, fontSize: "1em" });
            cc.outNextBlind.$container.css({ top: 425, fontSize: "1em" });
            cc.$tablemessage.css({ left: 185, width: 500, fontSize: "1.2em" });
            cc.endBreak.$container.css({ left: 355, top: 425, "font-size": "1.2em" });
            cc.$nextPanel.css({ left: 185, top: 418, width: 500, height: 86, "font-size": "1.2em" });
            cc.nextMove1.$container.css({ left: 5, top: 5 });
            cc.nextMove2.$container.css({ left: 190, top: 5 });
            cc.nextMove3.$container.css({ left: 5, top: 57 });
            cc.nextMove4.$container.css({ left: 190, top: 57 });
            cc.betButton1.move(185, 418).resize(60, 37, 35).fontSize("1.2em");
            cc.betButton2.move(247, 418).resize(60, 37, 35).fontSize("1.2em");
            cc.betButton3.move(309, 418).resize(60, 37, 35).fontSize("1.2em");
            cc.betButton4.move(371, 418).resize(60, 37, 35).fontSize("1.2em");
            cc.$raiseBox.css({ left: 435, top: 418, width: 248, height: 35 }); if (bm.params.gradients) { cc.$raiseBox.css("background-image", "url('Image?Name=Grad35')") } cc.raiseInput.$container.css({ left: 2, top: 2, width: 83, height: 31, "font-size": "1.2em" });
            cc.raiseSlider.$container.css({ left: 95, top: 2, width: 148, height: 31 });
            cc.raiseSlider.updateThumb();
            cc.timeBankBtn.move(15, 462).resize(160, 42, 40).lineHeight("20px").fontSize("1.2em");
            cc.button1.move(185, 462).resize(160, 42, 40).lineHeight("20px").fontSize("1.2em");
            cc.button2.move(355, 462).resize(160, 42, 40).lineHeight("20px").fontSize("1.2em");
            cc.button3.move(525, 462).resize(160, 42, 40).lineHeight("20px").fontSize("1.2em");
            cc.button4.move(525, 418).resize(160, 37, 35).lineHeight("20px").fontSize("1.2em") } };
    bz.prototype.showHoleCards = function() { var cd, cc, g;
        cd = this;
        cc = cd.getPlayerSeat(); if (cc == 0 || cd.cardNum[1] == 0 || cd.ghosted) { return } if (bm.local.dealFaceDown) { for (g = 1; g <= 7; g++) { cd.holeCard[g][cc] = 53 } cd.isFaceDown = true } else { for (g = 1; g <= 7; g++) { cd.holeCard[g][cc] = cd.cardNum[g] } cd.isFaceDown = false; for (g = 1; g <= cd.holeCards; g++) { cd.card[g][cc].setCard(cd.cardNum[g]); if (cd.cardNum[g] != 0) { cd.card[g][cc].show(true) } } } cd.foldAnyBetShow(cd.cardNum[1] > 0) };
    bz.prototype.showInfo = function(cd) { var cg, ci, ce, cc, g, cf, ch;
        cg = this;
        ci = cg.infoDialog; if (bm.mobile) { ci.$dialog.css({ width: 500, height: cg.$dialog.height() });
            ci.show(true, true);
            ch = ci.scale } else { ce = cg.$dialog.position().top;
            cc = cg.$dialog.position().left + cg.$dialog.outerWidth() + 5;
            g = 350;
            cf = cg.$dialog.height();
            ci.$dialog.css({ top: ce, left: cc, width: g, height: cf });
            ci.$dialog.show().css("z-index", ++bm.zTop);
            aG(ci);
            ch = 1 } cg.resizeInfo();
        ci.controls.infoTabs.setTab(cd);
        ci.controls.generalInfo.setScale(ch);
        ci.controls.statsInfo.setScale(ch);
        ci.controls.historySlider.setScale(ch);
        ci.controls.historyInfo.setScale(ch);
        ci.controls.chatInfoText.setScale(ch) };
    bz.prototype.stackChips = function(ch, cd) { var cg, cc, ci, cf, g;
        cg = this;

        function ce(ck, cj) { while (Math.round(cd * 100) >= Math.round(ck * 100)) { cc.push(cj);
                cd = cd - ck } } if (!ch) { return } ch.empty(); if (cd == 0) { return } cc = [];
        ce(1000000000, 19);
        ce(500000000, 18);
        ce(100000000, 17);
        ce(25000000, 16);
        ce(5000000, 15);
        ce(1000000, 14);
        ce(500000, 13);
        ce(100000, 12);
        ce(25000, 11);
        ce(5000, 10);
        ce(1000, 9);
        ce(500, 8);
        ce(100, 7);
        ce(25, 6);
        ce(5, 5);
        ce(1, 4);
        ce(0.25, 3);
        ce(0.05, 2);
        ce(0.01, 1);
        ci = cc.length - 10; if (ci < 0) { ci = 0 } cf;
        g = 0; while (ci < cc.length) { cf = (cc[ci] * -23) + "px 0px";
            $("<div>").addClass("chip").css({ bottom: g, background: "url('Image?Name=Chips&Crc=" + bm.crc.image + "') no-repeat " + cf }).appendTo(ch);
            g = g + 3;
            ci++ } ch.show() };
    bz.prototype.statsHintOff = function() { this.$tooltip.hide() };
    bz.prototype.statsHintOn = function(g, ch) { var cc, cd, cg, cf, ce;
        cc = this; if (cc.$tooltip.html() == "") { return } ce = cc.dialog.scale;
        cd = 0;
        cg = (g - cc.$tooltip.parent().offset().left) / ce;
        cf = (ch + 20 - cc.$tooltip.parent().offset().top) / ce;
        cc.$tooltip.css({ left: cg - cd, top: cf }).show().redraw() };
    bz.prototype.straddleCheck = function(g) { this.straddle.setCheck(g) };
    bz.prototype.straddleClick = function(cc) { var g, cd;
        g = this;
        g.straddleCheck(cc);
        cd = { Response: "Straddle" };
        cd.Table = g.id;
        cd.Type = g.type; if (cc) { cd.Checked = "Yes" } else { cd.Checked = "No" } bU(cd); if (bm.hasTouch == false) { g.chatFocus() } };
    bz.prototype.straddleShow = function(g) { this.straddle.show(g) };
    bz.prototype.straddleUpdate = function() { var cc, g;
        cc = this;
        g = bm.lang.TableCaptionStraddle; if (cc.liveStraddle) { g = g + " *" } cc.straddle.setCaption(g) };
    bz.prototype.toggleBoard = function() { var cc, cd;
        cd = this; for (cc = 1; cc <= 5; cc++) { if (cd.boardCard[cc] != 0) { cd.board[cc].setCard(53) } } setTimeout(g, 100);

        function g() { for (cc = 1; cc <= 5; cc++) { if (cd.boardCard[cc] != 0) { cd.board[cc].setCard(cd.boardCard[cc]) } } } };
    bz.prototype.toggleCards = function(cc) { var cd, g;
        cd = this; if (cd.getPlayerSeat() != cc || cd.cardNum[1] == 0 || cd.ghosted) { return } cd.isFaceDown = !cd.isFaceDown; if (cd.isFaceDown) { for (g = 1; g <= 7; g++) { if (cd.holeCards == 7 && g > 2 && g < 7) { cd.holeCard[g][cc] = cd.cardNum[g] } else { cd.holeCard[g][cc] = 53 } } } else { for (g = 1; g <= 7; g++) { cd.holeCard[g][cc] = cd.cardNum[g] } } for (g = 1; g <= cd.holeCards; g++) { cd.card[g][cc].setCard(cd.holeCard[g][cc]) } cd.updateHandHelper() };
    bz.prototype.totalPlateSetup = function() { var cc, g, ce, cd;
        cc = this;
        cc.$totalPlate = $(".totalplate", cc.$content);
        cc.$tooltip = $("<div>").appendTo(cc.$content).addClass("tooltip").hide();
        cc.$totalPlate.hover(function(cf) { cc.statsHintOn(cf.pageX, cf.pageY) }, function() { cc.statsHintOff() });
        cd = false;
        cc.$totalPlate.on("touchstart mousedown", function(cf) { if (bP(cf)) { return } if (cf.type == "touchstart") { g = cf.originalEvent.touches[0];
                ce = setTimeout(function() { cc.statsHintOn(g.pageX, g.pageY) }, 500) } cd = true;
            cf.preventDefault() });
        cc.$totalPlate.on("touchend mouseup", function(cf) { if (aQ(cf)) { return } clearTimeout(ce);
            cc.statsHintOff();
            cd = false;
            cf.preventDefault() }) };
    bz.prototype.updateHandHelper = function() { var cd, g, cc;
        cd = this;
        g = cd.getPlayerSeat(); if (g == 0) { return } cc = ""; if (bm.local.handHelper) { cc = cd.handHelper } if (cd.card[1][g].isVisible() && cd.isFaceDown) { cc = bm.lang.TableCaptionFlipCards } cd.setTableMessage(cc) };
    bz.prototype.updateTotal = function() { var g = this; if (g.totalPot == "") { g.$totalPlate.html("").hide() } else { g.$totalPlate.html(bm.lang.TableCaptionTotal + "<br>" + bL(g.totalPot)).show() } };

    function bp(ce, cd, g) { var cc = this;
        cc.$dialog = ce;
        cc.parent = cd;
        cc.shadeparent = g.shadeparent;
        cc.title = aj(g.title);
        cc.minwidth = bu(g.minwidth);
        cc.minheight = bu(g.minheight);
        cc.onresize = g.onresize;
        cc.onresized = g.onresized;
        cc.removeonclose = (g.removeonclose == true);
        cc.modal = false;
        cc.$dialog.css({ color: bm.color.WindowText, "background-color": bm.color.Window });
        $(".header > .title", cc.$dialog).css("color", bm.color.WindowText).text(cc.title);
        $(".dialogcontent, .infocontent", cc.$dialog).css({ color: bm.color.ListText, "background-color": bm.color.List });
        $(".tablecontent", cc.$dialog).css("color", bm.color.TableBackground);
        $("<div>").addClass("shader").appendTo(cc.$dialog);
        cc.dragging = false;
        cc.resizing = false;
        cc.ofx = 0;
        cc.ofy = 0;
        cc.xmax = 0;
        cc.ymax = 0;
        cc.rxmax = 0;
        cc.rymax = 0;
        cc.xdown = 0;
        cc.ydown = 0;
        cc.wdialog = 0;
        cc.hdialog = 0;
        cc.scale = 1;
        cc.controls = {};
        cc.data = {};
        cc.mouseEvents() } bp.prototype.close = function() { var g, cc;
        g = this; if (g.isVisible() == false) { return } $("button", g.$dialog).first().focus();
        g.$dialog.hide(); if (g.removeonclose) { g.$dialog.remove() } if (g.parent == null || g.modal == false) { return } g.parent.modalList.pop();
        cc = g.parent.modalList.length; if (cc > 0) { g.parent.modalList[cc - 1].shadeModal(false) } };
    bp.prototype.isVisible = function() { return this.$dialog.is(":visible") };
    bp.prototype.mouseEvents = function() { var g;
        g = this;
        $(".menu", g.$dialog).on("touchstart mousedown", function(cc) { if (bP(cc) || aQ(cc)) { return } if (bm.doc.$menu) { bm.doc.$menu.hide() } if (bm.doc.$menu && bm.doc.$menu.parent().get(0) == this) { bm.doc.$menu = null } else { bm.doc.$menu = $("ul", $(this)) } });
        $(".menu", g.$dialog).on("touchend mouseup", function(cc) { if (aQ(cc)) { return } if (bm.doc.debug) { bm.doc.debug = false;
                clearTimeout(bm.debugTimer) } if (bm.doc.$menu) { bm.doc.$menu.show() } return false });
        $(".header", g.$dialog).on("touchstart mousedown", function(cc) { if (bm.mobile || bP(cc) || aQ(cc)) { return } g.dragging = true;
            bm.doc.dialog = g });
        $(".resize", g.$dialog).on("touchstart mousedown", function(cd) { var ce, cc; if (bP(cd) || aQ(cd)) { return } g.resizing = true;
            ce = bm.$webRight.is(":visible") ? bm.$webRight.width() : 0;
            cc = bm.$webBottom.is(":visible") ? bm.$webBottom.height() : 0;
            g.rxmax = $(document).width() - ce - 5;
            g.rymax = $(document).height() - cc - 5;
            bm.doc.dialog = g;
            bm.$webClient.css("cursor", "se-resize");
            cd.preventDefault() });
        g.$dialog.on("touchstart mousedown", function(cf) { if (bm.mobile || bP(cf) || aQ(cf)) { return } var cc, cd, ce, cg;
            cg = $(".shader", g.$dialog).is(":visible"); if (g.$dialog.css("z-index") < bm.zTop) { if (g.modal) { for (cc = 0; cc < g.parent.modalList.length; cc++) { g.parent.modalList[cc].$dialog.css("z-index", ++bm.zTop) } aG(g.parent.dialog) } else { if (cg) { for (cc = 0; cc < g.shadeparent.modalList.length; cc++) { g.shadeparent.modalList[cc].$dialog.css("z-index", ++bm.zTop) } aG(g.shadeparent.dialog) } else { g.$dialog.css("z-index", ++bm.zTop);
                        aG(g) } } } if (cg) { return false } cd = (cf.type == "touchstart") ? cf.originalEvent.touches[0] : cf;
            g.xdown = cd.pageX;
            g.ydown = cd.pageY;
            g.wdialog = g.$dialog.width();
            g.hdialog = g.$dialog.height();
            ce = g.$dialog.offset();
            g.ofx = g.xdown - ce.left;
            g.ofy = g.ydown - ce.top;
            g.xmax = bm.$webClient.width() - g.wdialog - 5;
            g.ymax = bm.$webClient.height() - g.hdialog - 5 }) };
    bp.prototype.offDialog = function() { var g, cc;
        g = this;
        cc = g.resizing;
        g.resizing = false;
        g.dragging = false;
        bm.doc.dialog = null; if (cc) { bm.$webClient.css("cursor", "default"); if (g.onresized) { g.onresized() } } };
    bp.prototype.onDialog = function(ch) { var cc, ce, g, cd, cg, cf;
        cc = this;
        ce = (ch.type == "touchmove") ? ch.originalEvent.touches[0] : ch; if (cc.resizing) { if (ce.pageX > cc.rxmax || ce.pageY > cc.rymax) { return } g = cc.wdialog + ce.pageX - cc.xdown; if (g < cc.minwidth) { g = cc.minwidth } cd = cc.hdialog + ce.pageY - cc.ydown; if (cd < cc.minheight) { cd = cc.minheight } cc.$dialog.width(g);
            cc.$dialog.height(cd); if (cc.onresize) { cc.onresize() } } else { if (cc.dragging) { g = bm.$webLeft.is(":visible") ? bm.$webLeft.width() : 0;
                cd = bm.$webTop.is(":visible") ? bm.$webTop.height() : 0;
                cg = ce.pageX - g - cc.ofx;
                cf = ce.pageY - cd - cc.ofy; if (cg < 0) { cg = 0 } if (cg > cc.xmax) { cg = cc.xmax } if (cf < 0) { cf = 0 } if (cf > cc.ymax) { cf = cc.ymax } cc.$dialog.css({ left: cg, top: cf }) } } };
    bp.prototype.setModal = function() { var g, cc;
        g = this;
        cc = g.parent.modalList.length; if (cc > 0) { g.parent.modalList[cc - 1].shadeModal(true) } g.parent.modalList.push(g) };
    bp.prototype.setTitle = function(cc) { var g = this;
        g.title = cc;
        $(".header > .title", g.$dialog).text(g.title) };
    bp.prototype.shadeModal = function(g) { var cc = this;
        $(".shader", cc.$dialog).toggle(g);
        $("input, button", cc.$dialog).attr("tabindex", g ? -1 : 1) };
    bp.prototype.show = function(ci, cj) { var cg, g, cl, ck, cf, cc, ch, cn, cd, cm, ce;
        cg = this;
        $(".resize", cg.$dialog).toggle(!bm.mobile); if (cg.isVisible() == false) { cg.modal = ci; if (cg.modal) { cg.setModal() } } g = cg.$dialog.width();
        cl = cg.$dialog.height(); if (cj) { cd = window.innerWidth / bm.viewPort; if (cg.parent) { ce = cg.$dialog.parents().is(bm.lobby.$dialog); if (ce) { cg.scale = cd;
                    cd = 1 } ck = cg.parent.$dialog.width();
                cf = cg.parent.$dialog.height() } else { ce = false;
                ck = bm.lobby.$dialog.width();
                cf = bm.lobby.$dialog.height() } if (ck / cf > g / cl) { cn = cf / cl } else { cn = ck / g } if (cn > 1.5) { cn = 1.5 } cm = cn * cd;
            ch = ((cf * cd) - (cl * cm)) / 2; if (ch > 5) { ch = 5 } cc = ((ck * cd) - (g * cm)) / 2;
            cg.$dialog.show().css({ "z-index": ++bm.zTop, left: cc, top: ch, "transform-origin": "left top", transform: "scale(" + cm + ")" }); if (!ce) { cg.scale = cm } } else { if (cg.parent == null) { if (cg.scale == 1) { cg.$dialog.show().css({ "z-index": ++bm.zTop }) } else { cg.$dialog.show().css({ "z-index": ++bm.zTop, transform: "scale(1)" });
                    cg.scale = 1 } } else { cc = cg.parent.$dialog.position().left + (cg.parent.$dialog.width() - g) / 2;
                ch = cg.parent.$dialog.position().top + (cg.parent.$dialog.height() - cl) / 2; if (cg.scale == 1) { cg.$dialog.show().css({ "z-index": ++bm.zTop, left: cc, top: ch }) } else { cg.$dialog.show().css({ "z-index": ++bm.zTop, left: cc, top: ch, transform: "scale(1)" });
                    cg.scale = 1 } } } };
    bp.prototype.showMessage = function(cc, ck, cl) { var ch, g, cm, cg, cd, ci, ce, co, cj, cf, cn;
        ch = this; if (ch.isVisible() == false) { ch.modal = ck; if (ch.modal) { ch.setModal() } } g = 300;
        cm = 130;
        $(".msgtext", ch.$dialog).html("");
        ch.$dialog.show().css({ width: g, height: cm, "z-index": ++bm.zTop });
        $(".msgtext", ch.$dialog).html(cc);
        cg = $(".msgtext", ch.$dialog).height();
        cm = cm + cg;
        ch.$dialog.css("height", cm); if (cl) { if (ch.parent.$dialog.parent().is(bm.lobby.$openTableBox)) { ce = 1 } else { ce = window.innerWidth / bm.viewPort } cj = ch.parent.$dialog.width();
            cf = ch.parent.$dialog.height(); if (cj / cf > g / cm) { cn = cf / cm } else { cn = cj / g } if (cn > 1.5) { cn = 1.5 } co = cn * ce;
            ci = ((cf * ce) - (cm * co)) / 2; if (ci > 5) { ci = 5 } cd = ((cj * ce) - (g * co)) / 2;
            ch.$dialog.show().css({ left: cd, top: ci, "transform-origin": "left top", transform: "scale(" + co + ")" });
            ch.scale = co } else { cd = ch.parent.$dialog.position().left + (ch.parent.$dialog.width() - g) / 2;
            ci = ch.parent.$dialog.position().top + (ch.parent.$dialog.height() - cm) / 2;
            ch.$dialog.css({ left: cd, top: ci, "transform-origin": "left top", transform: "scale(1)" });
            ch.scale = 1 } };

    function aM(cc, cd) { var g, ce;
        g = $(".colorlabel").clone().removeClass("colorlabel").appendTo(bm.mobile && cd ? bm.lobby.$openTableBox : bm.$webClient);
        ce = new bp(g, cc, { title: bm.lang.NoteEditLabel });
        $(".cl_label", g).text(bm.lang.NoteLabel + ":");
        ce.controls.labelInput = new aT($(".cl_input", g), { onEnterKey: function() { bR(cc) }, border: true });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { bR(cc) });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { ce.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { ce.close(); return false });
        cc.colorLabel = ce }

    function bR(g) { var ce, cc, cd;
        ce = g.colorLabel;
        cd = ce.data.labelNum;
        cc = ce.controls.labelInput.getText().trim().substring(0, 20);
        bm.notelabel[cd] = cc;
        g.playerNote.data.Colors.rows[cd].label = cc;
        g.playerNote.controls.colorGrid.update();
        bi();
        bU({ Response: "PlayerNote", Subject: "*labels*", Color: 0, Chat: "Yes", Note: JSON.stringify(bm.notelabel) });
        ce.close() }

    function E(g, cc) { var cd;
        cd = g.colorLabel;
        cd.data.labelNum = cc;
        cd.controls.labelInput.setText(bm.notelabel[cc]);
        cd.show(true, bm.mobile); if (bm.hasTouch == false) { cd.controls.labelInput.setFocus() } }

    function L(cc, ce) { var g, cf, cd;
        g = $(".playernote").clone().removeClass("playernote").appendTo(bm.mobile && ce ? bm.lobby.$openTableBox : bm.$webClient);
        cf = new bp(g, cc, {});
        cf.controls.BlockChat = new b($(".pn_blockchat", g), bm.lang.NoteBlockChat);
        cf.controls.NoteSize = $(".pn_size", g);
        cf.data.Colors = {};
        cf.data.Colors.cols = 2;
        cf.data.Colors.widths = [0.3, 0.7];
        cf.data.Colors.headers = [bm.lang.NoteColor, bm.lang.NoteLabel];
        cf.data.Colors.fields = ["color", "label"];
        cf.data.Colors.fieldsShow = ["color", "label"];
        cf.data.Colors.fieldsSort = ["color", "label"];
        cf.data.Colors.fieldsNum = [false, false];
        cf.data.Colors.fieldsHTML = [true, false];
        cf.data.Colors.sortCol = 0;
        cf.data.Colors.sortAscend = true;
        cf.data.Colors.sortable = false;
        cf.data.Colors.rows = [];
        cf.data.Colors.rows[0] = { color: bm.lang.NoteNone, label: "" }; for (cd = 1; cd <= 10; cd++) { cf.data.Colors.rows[cd] = { color: J(cd), label: "" } } cf.data.Colors.rowHeight = 16;
        $(".pn_color", g).text(bm.lang.NoteColor);
        cf.controls.colorGrid = new b3($(".pn_colorgrid", g), cf.data.Colors, null, function() { K(cc) }, null);
        $(".pn_note", g).text(bm.lang.NoteNote);
        cf.controls.NoteText = new a8($(".pn_memo", g), { border: true, maxlength: 250, onInput: function() { a4(cc) } });
        new C($(".pn_labelbtn", g), bm.lang.NoteEditLabel, 20, function() { K(cc) });
        new C($(".ok", g), bm.lang.DialogOK, 25, function() { aR(cc) });
        new C($(".cancel", g), bm.lang.DialogCancel, 25, function() { cf.close() });
        $(".closebtn", g).on("touchstart mousedown", function() { cf.close(); return false });
        cc.playerNote = cf }

    function a4(g) { var cc, cd;
        cc = g.playerNote;
        cd = cc.controls.NoteText.getText().length;
        cc.controls.NoteSize.text(cd + "/250") }

    function K(g) { var cd, cc;
        cd = g.playerNote;
        cc = cd.controls.colorGrid.selrow; if (cc > 0) { E(g, cc) } }

    function aR(cc) { var cf, ce, cd, cj, cg, ci, ch, g;
        cf = cc.playerNote;
        ci = cf.data.player;
        cj = cf.controls.BlockChat.isChecked() ? "No" : "Yes"; if (cj == "No" && ci == bm.loginData.player) { cc.messageShow(bm.lang.MessageChatBlock); return } cd = cf.controls.colorGrid.selrow;
        cg = cf.controls.NoteText.getText().trim().substring(0, 250); if (cj == cf.data.oldChat && cd == cf.data.oldColor && cg == cf.data.oldNote) { cf.close(); return } ch = {};
        ch.player = ci;
        ch.colorNum = cd;
        ch.color = J(cd);
        ch.noteText = cg;
        ch.note = cg == "" ? "" : "&#10004;";
        ch.chatBool = cj;
        ch.block = cj == "Yes" ? "" : "&#10004;";
        g = bm.lobby.noteList.controls.noteGrid;
        ce = g.getRow(ci, "player"); if (ce >= 0) { bm.data.Notes.rows[ce] = ch; if (ce = g.selrow) { bm.lobby.noteListSelect(ce) } g.sort() } else { bm.data.Notes.rows.push(ch);
            g.sort() } bO(ci, cg, cd, cj);
        bU({ Response: "PlayerNote", Subject: ci, Color: cd, Chat: cj, Note: cg });
        cf.close() }

    function z(g, cd) { var cf, cc, ce;
        cf = g.playerNote;
        cf.data.player = cd;
        cf.setTitle(cd); for (cc = 0; cc <= 10; cc++) { cf.data.Colors.rows[cc].label = bm.notelabel[cc] } cc = bm.lobby.noteList.controls.noteGrid.getRow(cd, "player"); if (cc >= 0) { ce = bm.data.Notes.rows[cc];
            cf.data.oldColor = ce.colorNum;
            cf.data.oldChat = ce.chatBool;
            cf.data.oldNote = ce.noteText } else { cf.data.oldColor = 0;
            cf.data.oldChat = "Yes";
            cf.data.oldNote = "" } cf.controls.colorGrid.selrow = cf.data.oldColor;
        cf.controls.BlockChat.setCheck(cf.data.oldChat == "No");
        cf.controls.NoteText.setText(cf.data.oldNote);
        a4(g);
        cf.show(true, bm.mobile);
        cf.controls.colorGrid.setScale(cf.scale);
        cf.controls.colorGrid.resize() }

    function m(co) {
        function ck(cp, cs) { var cr, cq;
            cr = (cp & 65535) + (cs & 65535);
            cq = (cp >> 16) + (cs >> 16) + (cr >> 16); return (cq << 16) | (cr & 65535) }

        function cg(cq, cp) { return (cq >>> cp) | (cq << (32 - cp)) }

        function ch(cq, cp) { return (cq >>> cp) }

        function g(cp, cr, cq) { return ((cp & cr) ^ ((~cp) & cq)) }

        function cf(cp, cr, cq) { return ((cp & cr) ^ (cp & cq) ^ (cr & cq)) }

        function ci(cp) { return (cg(cp, 2) ^ cg(cp, 13) ^ cg(cp, 22)) }

        function cd(cp) { return (cg(cp, 6) ^ cg(cp, 11) ^ cg(cp, 25)) }

        function cn(cp) { return (cg(cp, 7) ^ cg(cp, 18) ^ ch(cp, 3)) }

        function cl(cp) { return (cg(cp, 17) ^ cg(cp, 19) ^ ch(cp, 10)) }

        function ce(cq, cr) { var cs, cD, cp, cF, cE, cC, cB, cz, cx, cw, cv, cu, ct, cA, cy;
            cs = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
            cD = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
            cp = new Array(64);
            cq[cr >> 5] |= 128 << (24 - cr % 32);
            cq[((cr + 64 >> 9) << 4) + 15] = cr; for (cu = 0; cu < cq.length; cu += 16) { cF = cs[0];
                cE = cs[1];
                cC = cs[2];
                cB = cs[3];
                cz = cs[4];
                cx = cs[5];
                cw = cs[6];
                cv = cs[7]; for (ct = 0; ct < 64; ct++) { if (ct < 16) { cp[ct] = cq[ct + cu] } else { cp[ct] = ck(ck(ck(cl(cp[ct - 2]), cp[ct - 7]), cn(cp[ct - 15])), cp[ct - 16]) } cA = ck(ck(ck(ck(cv, cd(cz)), g(cz, cx, cw)), cD[ct]), cp[ct]);
                    cy = ck(ci(cF), cf(cF, cE, cC));
                    cv = cw;
                    cw = cx;
                    cx = cz;
                    cz = ck(cB, cA);
                    cB = cC;
                    cC = cE;
                    cE = cF;
                    cF = ck(cA, cy) } cs[0] = ck(cF, cs[0]);
                cs[1] = ck(cE, cs[1]);
                cs[2] = ck(cC, cs[2]);
                cs[3] = ck(cB, cs[3]);
                cs[4] = ck(cz, cs[4]);
                cs[5] = ck(cx, cs[5]);
                cs[6] = ck(cw, cs[6]);
                cs[7] = ck(cv, cs[7]) } return cs }

        function cc(cr) { var cp, cq, cs;
            cp = ""; for (cq = 0; cq < cr.length; cq++) { cs = cr.charCodeAt(cq); if (cs < 128) { cp += String.fromCharCode(cs) } else { if (cs < 2048) { cp += String.fromCharCode((cs >> 6) | 192);
                        cp += String.fromCharCode((cs & 63) | 128) } else { cp += String.fromCharCode((cs >> 12) | 224);
                        cp += String.fromCharCode(((cs >> 6) & 63) | 128);
                        cp += String.fromCharCode((cs & 63) | 128) } } } return cp }

        function cj(cs) { var cr, cp, cq;
            cr = new Array();
            cp = 255; for (cq = 0; cq < cs.length * 8; cq += 8) { cr[cq >> 5] |= (cs.charCodeAt(cq / 8) & cp) << (24 - cq % 32) } return cr }

        function cm(cr) { var cq, cs, cp;
            cq = "0123456789ABCDEF";
            cs = ""; for (cp = 0; cp < cr.length * 4; cp++) { cs += cq.charAt((cr[cp >> 2] >> ((3 - cp % 4) * 8 + 4)) & 15) + cq.charAt((cr[cp >> 2] >> ((3 - cp % 4) * 8)) & 15) } return cs } co = cc(co); return cm(ce(cj(co), co.length * 8)) } au() };