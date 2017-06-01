var SimpleUpload = function() {
    function e(e) {
        if (e = e.data, /\.bmp$/.test(e.name)) {
            var t = e.image,
            a = document.createElement("canvas");
            a.width = t.width,
            a.height = t.height,
            a.getContext("2d").drawImage(t, 0, 0),
            e.file = a.toDataURL("image/png"),
            e.name = e.name.replace(/\.bmp$/, ".png")
        }
    }
    function t(e) {
        var t = e.editor,
        a = t.config.simpleuploads_maximumDimensions,
        n = e.data.image;
        a.width && n.width > a.width ? (alert(t.lang.simpleuploads.imageTooWide), e.cancel()) : a.height && n.height > a.height && (alert(t.lang.simpleuploads.imageTooTall), e.cancel())
    }
    function a(e) {
        var t = "span.SimpleUploadsTmpWrapper>span { top: 50%; margin-top: -0.5em; width: 100%; text-align: center; color: #fff; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-size: 50px; font-family: Calibri,Arial,Sans-serif; pointer-events: none; position: absolute; display: inline-block;}";
        return e.simpleuploads_hideImageProgress && (t = "span.SimpleUploadsTmpWrapper { color:#333; background-color:#fff; padding:4px; border:1px solid #EEE;}"),
        ".SimpleUploadsOverEditor { " + (e.simpleuploads_editorover || "box-shadow: 0 0 10px 1px #999999 inset !important;") + " }a.SimpleUploadsTmpWrapper { color:#333; background-color:#fff; padding:4px; border:1px solid #EEE;}.SimpleUploadsTmpWrapper { display: inline-block; position: relative; pointer-events: none;}" + t + ".uploadRect {display: inline-block;height: 0.9em;vertical-align: middle;width: 20px;}.uploadRect span {background-color: #999;display: inline-block;height: 100%;vertical-align: top;}.SimpleUploadsTmpWrapper .uploadCancel { background-color: #333333;border-radius: 0.5em;color: #FFFFFF;cursor: pointer !important;display: inline-block;height: 1em;line-height: 0.8em;margin-left: 4px;padding-left: 0.18em;pointer-events: auto;position: relative; text-decoration:none; top: -2px;width: 0.7em;}.SimpleUploadsTmpWrapper span uploadCancel { width:1em; padding-left:0}"
    }
    function n(e, t, a, n) {
        if (x) alert("Please, wait to finish the current upload");
        else if (I = !t, T = e, "undefined" == typeof FormData) {
            var r = document.getElementById("simpleUploadsTarget");
            r || (r = document.createElement("iframe"), r.style.display = "none", r.id = "simpleUploadsTarget", document.body.appendChild(r)),
            y = a,
            D = n,
            R = t,
            a = e._.simpleuploadsFormUploadFn,
            n = e._.simpleuploadsFormInitFn,
            a || (e._.simpleuploadsFormUploadFn = a = CKEDITOR.tools.addFunction(o, e), e._.simpleuploadsFormInitFn = n = CKEDITOR.tools.addFunction(function() {
                window.setTimeout(function() {
                    var e = document.getElementById("simpleUploadsTarget").contentWindow.document.getElementById("upload");
                    e.onchange = function() {
                        var e = {
                            name: this.value,
                            url: this.form.action,
                            context: y,
                            id: "IEUpload",
                            requiresImage: R
                        },
                        t = e.name.match(/\\([^\\]*)$/);
                        if (t && (e.name = t[1]), "boolean" != typeof T.fire("simpleuploads.startUpload", e)) if (e.requiresImage && !CKEDITOR.plugins.simpleuploads.isImageExtension(T, e.name)) alert(T.lang.simpleuploads.nonImageExtension);
                        else {
                            if (D && D.start && D.start(e), x = this.value, this.form.action = e.url, e.extraFields) {
                                var a, e = e.extraFields,
                                t = this.ownerDocument;
                                for (a in e) if (e.hasOwnProperty(a)) {
                                    var n = t.createElement("input");
                                    n.type = "hidden",
                                    n.name = a,
                                    n.value = e[a],
                                    this.form.appendChild(n)
                                }
                            }
                            this.form.submit()
                        }
                    },
                    e.click()
                },
                100)
            },
            e), e.on("destroy",
            function() {
                CKEDITOR.tools.removeFunction(this._.simpleuploadsFormUploadFn),
                CKEDITOR.tools.removeFunction(this._.simpleuploadsFormInitFn)
            })),
            e = 'document.open(); document.write("' + ("<form method='post' enctype='multipart/form-data' action='" + i(e, a, t) + "'><input type='file' name='upload' id='upload'></form>") + '");document.close();window.parent.CKEDITOR.tools.callFunction(' + n + ");",
            r.src = "javascript:void(function(){" + encodeURIComponent(e) + "}())",
            r.onreadystatechange = function() {
                "complete" == r.readyState && window.setTimeout(function() {
                    x && (alert("The file upload has failed"), x = null)
                },
                100)
            },
            E = null
        } else {
            if (t = {
                context: a,
                callback: n,
                requiresImage: t
            },
            E || (E = document.createElement("input"), E.type = "file", E.style.overflow = "hidden", E.style.width = "1px", E.style.height = "1px", E.style.opacity = .1, E.multiple = "multiple", E.position = "absolute", E.zIndex = 1e3, document.body.appendChild(E), E.addEventListener("change",
            function() {
                var e = E.files.length;
                if (e) {
                    T.fire("saveSnapshot");
                    for (var t = 0; e > t; t++) {
                        var a = E.files[t],
                        n = CKEDITOR.tools.extend({},
                        E.simpleUploadData);
                        n.file = a,
                        n.name = a.name,
                        n.id = CKEDITOR.plugins.simpleuploads.getTimeStampId(),
                        n.forceLink = I,
                        n.mode = {
                            type: "selectedFile",
                            i: t,
                            count: e
                        },
                        CKEDITOR.plugins.simpleuploads.insertSelectedFile(T, n)
                    }
                }
            })), E.value = "", E.simpleUploadData = t, CKEDITOR.env.webkit) {
                var l = e.focusManager;
                l && l.lock && (l.lock(), setTimeout(function() {
                    l.unlock()
                },
                500))
            }
            E.click()
        }
    }
    function i(e, t, a) {
        if (a = a ? e.config.filebrowserImageUploadUrl: e.config.filebrowserUploadUrl, "base64" == a) return a;
        var n = {};
        return n.CKEditor = e.name,
        n.CKEditorFuncNum = t,
        n.langCode = e.langCode,
        r(a, n)
    }
    function o(e, t) {
        "string" == typeof t && t && !e && alert(t);
        var a = T;
        if (a.fire("simpleuploads.endUpload", {
            name: x,
            ok: !!e
        }), D) D.upload(e, t, {
            context: y
        }),
        D = x = null;
        else {
            if (e) {
                var n, i;
                I ? (n = new CKEDITOR.dom.element("a", a.document), n.setText(e.match(/\/([^\/]+)$/)[1]), i = "href") : (n = new CKEDITOR.dom.element("img", a.document), i = "src", n.on("load",
                function(e) {
                    e.removeListener(),
                    n.removeListener("error", d),
                    n.setAttribute("width", n.$.width),
                    n.setAttribute("height", n.$.height),
                    a.fire("simpleuploads.finishedUpload", {
                        name: x,
                        element: n
                    })
                }), n.on("error", d, null, n)),
                n.setAttribute(i, e),
                n.data("cke-saved-" + i, e),
                a.insertElement(n),
                I && T.fire("simpleuploads.finishedUpload", {
                    name: x,
                    element: n
                })
            }
            x = null
        }
        y = null
    }
    function r(e, t) {
        var a = [];
        if (!t) return e;
        for (var n in t) a.push(n + "=" + encodeURIComponent(t[n]));
        return e + ( - 1 != e.indexOf("?") ? "&": "?") + a.join("&")
    }
    function l(e) {
        return e = e.data.$.dataTransfer,
        e && e.types && (e.types.contains && e.types.contains("Files") && !e.types.contains("text/html") || e.types.indexOf && -1 != e.types.indexOf("Files")) ? !0 : !1
    }
    function s(e, t, a, n, i) {
        if ("span" == n.$.nodeName.toLowerCase()) {
            var o;
            t.originalNode ? (o = t.originalNode.cloneNode(!0), o.removeAttribute("width"), o.removeAttribute("height"), o.style.width = "", o.style.height = "", o = new CKEDITOR.dom.element(o)) : o = new CKEDITOR.dom.element("img", a.document),
            o.data("cke-saved-src", e),
            o.setAttribute("src", e),
            o.on("load",
            function(e) {
                e.removeListener(),
                o.removeListener("error", d),
                p(o, a, n, t.name)
            }),
            o.on("error", d, null, n),
            n.data("cke-real-element-type", "img"),
            n.data("cke-realelement", encodeURIComponent(o.getOuterHtml())),
            n.data("cke-real-node-type", CKEDITOR.NODE_ELEMENT)
        } else {
            if (t.originalNode) {
                var r = t.originalNode.cloneNode(!0);
                n.$.parentNode.replaceChild(r, n.$),
                n = new CKEDITOR.dom.element(r)
            } else n.removeAttribute("id"),
            n.removeAttribute("class"),
            n.removeAttribute("contentEditable"),
            n.setHtml(n.getFirst().getHtml());
            n.data("cke-saved-" + i, e),
            n.setAttribute(i, e),
            a.fire("simpleuploads.finishedUpload", {
                name: t.name,
                element: n
            })
        }
    }
    function d(e) {
        e.removeListener(),
        alert("Failed to load the image with the provided URL: '" + e.sender.data("cke-saved-src") + "'"),
        e.listenerData.remove()
    }
    function p(e, t, a, n) {
        0 === e.$.naturalWidth ? window.setTimeout(function() {
            p(e, t, a, n)
        },
        50) : (e.replace(a), e.setAttribute("width", e.$.width), e.setAttribute("height", e.$.height), t.fire("simpleuploads.finishedUpload", {
            name: n,
            element: e
        }), t.fire("updateSnapshot"))
    }
    function c(e, t) {
        var a = CKEDITOR.plugins.simpleuploads.isImageExtension(e, t.name),
        n = "href",
        o = !1;
        if (!t.forceLink && a && (n = "src", o = !0), t.callback && t.callback.setup(t), t.url || (t.url = i(e, 2, o)), t.requiresImage && !a) return alert(e.lang.simpleuploads.nonImageExtension),
        null;
        if ("boolean" == typeof e.fire("simpleuploads.startUpload", t)) return null;
        if ("base64" == t.url) {
            if ("string" == typeof t.file) setTimeout(function() {
                s(fileUrl, t, e, el, n)
            },
            100);
            else {
                var r = new FileReader;
                r.onload = function() {
                    var a = r.result,
                    i = e.document.getById(t.id);
                    setTimeout(function() {
                        s(a, t, e, i, n)
                    },
                    100)
                },
                r.readAsDataURL(t.file)
            }
            return {}
        }
        var l = new XMLHttpRequest;
        return (a = l.upload) && (a.onprogress = function(a) {
            u(e, t.id, a)
        }),
        t.xhr = l,
        l.open("POST", t.url),
        l.onload = function() {
            var a = l.responseText.match(/\((?:"|')?\d+(?:"|')?,\s*("|')(.*?[^\\]?)\1(?:,\s*(.*?))?\s*\)\s*;?/),
            i = a && a[2],
            o = a && a[3],
            r = t.id,
            d = e.document.getById(r);
            if (o) {
                var p = o.match(/function\(\)\s*\{(.*)\}/);
                p ? o = new Function(p[1]) : (p = o.substring(0, 1), ("'" == p || '"' == p) && (o = o.substring(1, o.length - 1)))
            }
            if (u(e, r, null), e.fire("updateSnapshot"), e.fire("simpleuploads.endUpload", {
                name: t.name,
                ok: !!i,
                xhr: l,
                data: t
            }), 200 != l.status) alert(413 == l.status ? e.lang.simpleuploads.fileTooBig: "Error posting the file to " + t.url + "\r\nResponse status: " + l.status),
            window.console && console.log(l);
            else {
                if (i) {
                    i = i.replace(/\\'/g, "'");
                    try {
                        var c = JSON.parse('{"url":"' + i + '"}');
                        c && c.url && (i = c.url)
                    } catch(m) {}
                }
                a || (o = "Error posting the file to " + t.url + "\r\nInvalid data returned (check console)", window.console && console.log(l.responseText))
            }
            t.callback ? (!i && o && alert(o), t.callback.upload(i, o, t)) : d && (i ? s(i, t, e, d, n) : (t.originalNode ? d.$.parentNode.replaceChild(t.originalNode, d.$) : d.remove(), o && alert(o)), e.fire("updateSnapshot"))
        },
        l.onerror = function(a) {
            alert("Error posting the file to " + t.url),
            window.console && console.log(a),
            (a = e.document.getById(t.id)) && (t.originalNode ? a.$.parentNode.replaceChild(t.originalNode, a.$) : a.remove()),
            e.fire("updateSnapshot")
        },
        l.onabort = function() {
            if (t.callback) t.callback.upload(null);
            else {
                var a = e.document.getById(t.id);
                a && (t.originalNode ? a.$.parentNode.replaceChild(t.originalNode, a.$) : a.remove()),
                e.fire("updateSnapshot")
            }
        },
        l.withCredentials = !0,
        l
    }
    function m(e, t) {
        if (!t.callback) {
            var a = CKEDITOR.plugins.simpleuploads.isImageExtension(e, t.name),
            n = !e.config.simpleuploads_hideImageProgress; ! t.forceLink && a && n ? a = f(t.file, t.id, e) : (a = a && !t.forceLink ? new CKEDITOR.dom.element("span", e.document) : new CKEDITOR.dom.element("a", e.document), a.setAttribute("id", t.id), a.setAttribute("class", "SimpleUploadsTmpWrapper"), a.setHtml("<span class='uploadName'>" + t.name + "</span> <span class='uploadRect'><span id='rect" + t.id + "'></span></span> <span id='text" + t.id + "' class='uploadText'></span><span class='uploadCancel'>x</span>")),
            a.setAttribute("contentEditable", !1),
            t.element = a
        }
        if (a = c(e, t), !a) return t.result = t.result || "",
        !1;
        if (!a.send) return ! 0;
        if (t.callback && t.callback.start && t.callback.start(t), "string" == typeof t.file) {
            var i = "-----------------------------1966284435497298061834782736",
            o = t.name.match(/\.(\w+)$/)[1],
            i = i + ('\r\nContent-Disposition: form-data; name="upload"; filename="' + t.name + '"'),
            i = i + ("\r\nContent-type: image/" + o) + ("\r\n\r\n" + window.atob(t.file.split(",")[1])),
            i = i + "\r\n-----------------------------1966284435497298061834782736";
            if (t.extraFields) {
                var r, o = t.extraFields;
                for (r in o) i += '\r\nContent-Disposition: form-data; name="' + unescape(encodeURIComponent(r)).replace(/=/g, "\\=") + '"',
                i += "\r\n\r\n" + unescape(encodeURIComponent(o[r])),
                i += "\r\n-----------------------------1966284435497298061834782736"
            }
            for (i += "--", a.setRequestHeader("Content-Type", "multipart/form-data; boundary=---------------------------1966284435497298061834782736"), r = new ArrayBuffer(i.length), r = new Uint8Array(r, 0), o = 0; o < i.length; o++) r[o] = 255 & i.charCodeAt(o)
        } else {
            if (r = new FormData, r.append("upload", t.file, t.name), t.extraFields) {
                n = t.extraFields;
                for (o in n) n.hasOwnProperty(o) && r.append(o, n[o])
            }
            if (t.extraHeaders) {
                o = t.extraHeaders;
                for (i in o) o.hasOwnProperty(i) && a.setRequestHeader(i, o[i])
            }
        }
        return a.send(r),
        !0
    }
    function u(e, t, a) {
        if (e.document && e.document.$) {
            var n = (CKEDITOR.dialog.getCurrent() ? CKEDITOR: e).document.$,
            i = n.getElementById("rect" + t),
            t = n.getElementById("text" + t);
            if (a) {
                if (!a.lengthComputable) return;
                n = (100 * a.loaded / a.total).toFixed(2) + "%",
                e = (100 * a.loaded / a.total).toFixed() + "%"
            } else e = e.lang.simpleuploads.processing,
            n = "100%";
            i && (i.setAttribute("width", n), i.style.width = n, a || (i = i.parentNode) && "uploadRect" == i.className && i.parentNode.removeChild(i)),
            t && (t.firstChild.nodeValue = e, a || (a = t.nextSibling) && "a" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a))
        }
    }
    function f(e, t, a) {
        var n, i = new CKEDITOR.dom.element("span", a.document),
        o = i.$,
        r = a.document.$,
        a = r.createElement("span");
        i.setAttribute("id", t),
        i.setAttribute("class", "SimpleUploadsTmpWrapper");
        var l = r.createElement("span");
        if (l.setAttribute("id", "text" + t), l.appendChild(r.createTextNode("0 %")), o.appendChild(a), a.appendChild(l), l = r.createElement("span"), l.appendChild(r.createTextNode("x")), a.appendChild(l), "string" != typeof e && (n = window.URL || window.webkitURL, !n || !n.revokeObjectURL)) return i;
        a = r.createElementNS("http://www.w3.org/2000/svg", "svg"),
        a.setAttribute("id", "svg" + t),
        l = r.createElement("img"),
        n ? (l.onload = function() {
            this.onload && (n.revokeObjectURL(this.src), this.onload = null);
            var e = r.getElementById("svg" + t);
            e && (e.setAttribute("width", this.width + "px"), e.setAttribute("height", this.height + "px")),
            (e = r.getElementById(t)) && (e.style.width = this.width + "px")
        },
        l.src = n.createObjectURL(e)) : (l.src = e, l.onload = function() {
            this.onload = null;
            var e = r.getElementById("svg" + t);
            e && (e.setAttribute("width", this.width + "px"), e.setAttribute("height", this.height + "px"))
        },
        a.setAttribute("width", l.width + "px"), a.setAttribute("height", l.height + "px")),
        o.appendChild(a),
        o = r.createElementNS("http://www.w3.org/2000/svg", "filter"),
        o.setAttribute("id", "SVGdesaturate"),
        a.appendChild(o),
        l = r.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix"),
        l.setAttribute("type", "saturate"),
        l.setAttribute("values", "0"),
        o.appendChild(l),
        o = r.createElementNS("http://www.w3.org/2000/svg", "clipPath"),
        o.setAttribute("id", "SVGprogress" + t),
        a.appendChild(o),
        l = r.createElementNS("http://www.w3.org/2000/svg", "rect"),
        l.setAttribute("id", "rect" + t),
        l.setAttribute("width", "0"),
        l.setAttribute("height", "100%"),
        o.appendChild(l);
        var s = r.createElementNS("http://www.w3.org/2000/svg", "image");
        if (s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), n) {
            s.setAttributeNS("http://www.w3.org/1999/xlink", "href", n.createObjectURL(e));
            var d = function() {
                n.revokeObjectURL(s.getAttributeNS("http://www.w3.org/1999/xlink", "href")),
                s.removeEventListener("load", d, !1)
            };
            s.addEventListener("load", d, !1)
        } else s.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
        return e = s.cloneNode(!0),
        s.setAttribute("filter", "url(#SVGdesaturate)"),
        s.style.opacity = "0.5",
        a.appendChild(s),
        e.setAttribute("clip-path", "url(#SVGprogress" + t + ")"),
        a.appendChild(e),
        i
    }
    function g(e, t, a, i) {
        if ("file" != i.type) {
            var o = "image" == t.substr(0, 5),
            l = i.filebrowser.target.split(":"),
            s = {
                setup: function(t) {
                    if (a.uploadUrl) {
                        o && (t.requiresImage = !0);
                        var n = {};
                        n.CKEditor = e.name,
                        n.CKEditorFuncNum = 2,
                        n.langCode = e.langCode,
                        t.url = r(a.uploadUrl, n)
                    }
                },
                start: function(e) {
                    var t = CKEDITOR.dialog.getCurrent();
                    t.showThrobber();
                    var a = t.throbber;
                    if (e.xhr) {
                        a.throbberTitle.setHtml("<span class='uploadName'>" + e.name + "</span> <span class='uploadRect'><span id='rect" + e.id + "'></span></span> <span id='text" + e.id + "' class='uploadText'></span><a>x</a>");
                        var n = a.throbberCover,
                        i = e.xhr;
                        n.timer && (clearInterval(n.timer), n.timer = null),
                        a.throbberParent.setStyle("display", "none"),
                        a.throbberTitle.getLast().on("click",
                        function() {
                            i.abort()
                        }),
                        t.on("hide",
                        function() {
                            1 == i.readyState && i.abort()
                        })
                    }
                    a.center()
                },
                upload: function(e, t, n) {
                    var i = CKEDITOR.dialog.getCurrent();
                    i.throbber.hide(),
                    "function" == typeof t && t.call(n.context.sender) === !1 || a.onFileSelect && a.onFileSelect.call(n.context.sender, e, t) === !1 || !e || (i.getContentElement(l[0], l[1]).setValue(e), i.selectPage(l[0]))
                }
            };
            if ("QuickUpload" == i.filebrowser.action) a.hasQuickUpload = !0,
            a.onFileSelect = null,
            e.config.simpleuploads_respectDialogUploads || (i.label = o ? e.lang.simpleuploads.addImage: e.lang.simpleuploads.addFile, i.onClick = function(t) {
                return n(e, o, t, s),
                !1
            },
            a.getContents(i["for"][0]).get(i["for"][1]).hidden = !0);
            else {
                if (a.hasQuickUpload) return;
                i.filebrowser.onSelect && (a.onFileSelect = i.filebrowser.onSelect)
            }
            e.plugins.fileDropHandler && ("QuickUpload" == i.filebrowser.action && (a.uploadUrl = i.filebrowser.url), a.onShow = CKEDITOR.tools.override(a.onShow ||
            function() {},
            function(e) {
                return function() {
                    "function" == typeof e && e.call(this),
                    "QuickUpload" != i.filebrowser.action && a.hasQuickUpload || this.handleFileDrop || (this.handleFileDrop = !0, this.getParentEditor().plugins.fileDropHandler.addTarget(this.parts.contents, s))
                }
            }))
        }
    }
    function h(e, t, a, n) {
        for (var i in n) {
            var o = n[i];
            o && (("hbox" == o.type || "vbox" == o.type || "fieldset" == o.type) && h(e, t, a, o.children), o.filebrowser && o.filebrowser.url && g(e, t, a, o))
        }
    }
    function b(e, t) {
        var a = e.document.getById(t.id);
        if (a) {
            var n = a.$.getElementsByTagName("a");
            if (! (n && n.length || (n = a.$.getElementsByTagName("span"), n && n.length))) return;
            for (a = 0; a < n.length; a++) {
                var i = n[a];
                "x" == i.innerHTML && (i.className = "uploadCancel", i.onclick = function() {
                    t.xhr && t.xhr.abort()
                })
            }
        }
    }
    function v(e) {
        var t, a, n = e.listenerData.editor,
        i = e.listenerData.dialog;
        if (t = e.data && e.data.$.clipboardData || n.config.forcePasteAsPlainText && window.clipboardData) if (CKEDITOR.env.gecko && n.config.forcePasteAsPlainText && 0 === t.types.length) n.on("beforePaste",
        function(e) {
            e.removeListener(),
            e.data.type = "html"
        });
        else {
            var o = t.items || t.files;
            if (o && o.length) {
                if (o[0].kind) for (t = 0; t < o.length; t++) if (a = o[t], "string" == a.kind && ("text/html" == a.type || "text/plain" == a.type)) return;
                for (t = 0; t < o.length; t++) if (a = o[t], !a.kind || "file" == a.kind) {
                    e.data.preventDefault();
                    var r = a.getAsFile ? a.getAsFile() : a;
                    CKEDITOR.env.ie || n.config.forcePasteAsPlainText ? setTimeout(function() {
                        C(r, e)
                    },
                    100) : C(r, e)
                }
                i && e.data.$.defaultPrevented && i.hide()
            }
        }
    }
    function C(e, t) {
        var a = t.listenerData.editor,
        n = t.listenerData.dialog,
        i = CKEDITOR.plugins.simpleuploads.getTimeStampId();
        CKEDITOR.plugins.simpleuploads.insertPastedFile(a, {
            context: t.data.$,
            name: e.name || i + ".png",
            file: e,
            forceLink: !1,
            id: i,
            mode: {
                type: "pastedFile",
                dialog: n
            }
        })
    }
    function w(e) {
        var t = e.getFrameDocument(),
        a = t.getBody(); ! a || !a.$ || "true" != a.$.contentEditable && "on" != t.$.designMode ? setTimeout(function() {
            w(e)
        },
        100) : (a = CKEDITOR.dialog.getCurrent(), t.on("paste", v, null, {
            dialog: a,
            editor: a.getParentEditor()
        }))
    }
    var E, T, I, x, y, D, R, O = {
        elements: {
            $: function(e) {
                return e = e.attributes,
                "SimpleUploadsTmpWrapper" == (e && e["class"]) ? !1 : void 0
            }
        }
    };
    CKEDITOR.plugins.add("simpleuploads", {
        icons: "addimage,addfile",
        lang: ["en", "zh-cn"],
        onLoad: function() {
            CKEDITOR.addCss && CKEDITOR.addCss(a(CKEDITOR.config));
            var e = CKEDITOR.document.getHead().append("style");
            e.setAttribute("type", "text/css");
            var t = ".SimpleUploadsOverContainer {" + (CKEDITOR.config.simpleuploads_containerover || "box-shadow: 0 0 10px 1px #99DD99 !important;") + "} .SimpleUploadsOverDialog {" + (CKEDITOR.config.simpleuploads_dialogover || "box-shadow: 0 0 10px 4px #999999 inset !important;") + "} .SimpleUploadsOverCover {" + (CKEDITOR.config.simpleuploads_coverover || "box-shadow: 0 0 10px 4px #99DD99 !important;") + "} ",
            t = t + ".cke_throbber {margin: 0 auto; width: 100px;} .cke_throbber div {float: left; width: 8px; height: 9px; margin-left: 2px; margin-right: 2px; font-size: 1px;} .cke_throbber .cke_throbber_1 {background-color: #737357;} .cke_throbber .cke_throbber_2 {background-color: #8f8f73;} .cke_throbber .cke_throbber_3 {background-color: #abab8f;} .cke_throbber .cke_throbber_4 {background-color: #c7c7ab;} .cke_throbber .cke_throbber_5 {background-color: #e3e3c7;} .uploadRect {display: inline-block;height: 11px;vertical-align: middle;width: 50px;} .uploadRect span {background-color: #999;display: inline-block;height: 100%;vertical-align: top;} .uploadName {display: inline-block;max-width: 180px;overflow: hidden;text-overflow: ellipsis;vertical-align: top;white-space: pre;} .uploadText {font-size:80%;} .cke_throbberMain a {cursor: pointer; font-size: 14px; font-weight:bold; padding: 4px 5px;position: absolute;right:0; text-decoration:none; top: -2px;} .cke_throbberMain {background-color: #FFF; border:1px solid #e5e5e5; padding:4px 14px 4px 4px; min-width:250px; position:absolute;}";
            CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? e.$.styleSheet.cssText = t: e.$.innerHTML = t
        },
        init: function(i) {
            var o = i.config;
            if ("undefined" == typeof o.simpleuploads_imageExtensions && (o.simpleuploads_imageExtensions = "jpe?g|gif|png"), i.addCss && i.addCss(a(o)), o.filebrowserImageUploadUrl || (o.filebrowserImageUploadUrl = o.filebrowserUploadUrl), o.filebrowserUploadUrl || o.filebrowserImageUploadUrl) {
                if ("base64" != o.filebrowserImageUploadUrl || "undefined" != typeof FormData) {
                    i.addFeature && i.addFeature({
                        allowedContent: "img[!src,width,height];a[!href];span[id](SimpleUploadsTmpWrapper);"
                    }),
                    CKEDITOR.dialog.prototype.showThrobber = function() {
                        this.throbber || (this.throbber = {
                            update: function() {
                                for (var e = this.throbberParent.$,
                                t = e.childNodes,
                                e = e.lastChild.className,
                                a = t.length - 1; a > 0; a--) t[a].className = t[a - 1].className;
                                t[0].className = e
                            },
                            create: function(e) {
                                if (!this.throbberCover) {
                                    var t = CKEDITOR.dom.element.createFromHtml('<div style="background-color:rgba(255,255,255,0.95);width:100%;height:100%;top:0;left:0; position:absolute; visibility:none;z-index:100;"></div>');
                                    e.parts.close.setStyle("z-index", 101),
                                    CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (t.setStyle("zoom", 1), t.setStyle("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#EEFFFFFF,endColorstr=#EEFFFFFF)")),
                                    t.appendTo(e.parts.dialog),
                                    this.throbberCover = t;
                                    var a = new CKEDITOR.dom.element("div");
                                    this.mainThrobber = a;
                                    var n = new CKEDITOR.dom.element("div");
                                    this.throbberParent = n;
                                    var i = new CKEDITOR.dom.element("div");
                                    for (this.throbberTitle = i, t.append(a).addClass("cke_throbberMain"), a.append(i).addClass("cke_throbberTitle"), a.append(n).addClass("cke_throbber"), t = [1, 2, 3, 4, 5, 4, 3, 2]; t.length > 0;) n.append(new CKEDITOR.dom.element("div")).addClass("cke_throbber_" + t.shift());
                                    this.center(),
                                    e.on("hide", this.hide, this)
                                }
                            },
                            center: function() {
                                var e = this.mainThrobber,
                                t = this.throbberCover,
                                a = (t.$.offsetHeight - e.$.offsetHeight) / 2;
                                e.setStyle("left", ((t.$.offsetWidth - e.$.offsetWidth) / 2).toFixed() + "px"),
                                e.setStyle("top", a.toFixed() + "px")
                            },
                            show: function() {
                                this.create(CKEDITOR.dialog.getCurrent()),
                                this.throbberCover.setStyle("visibility", ""),
                                this.timer = setInterval(CKEDITOR.tools.bind(this.update, this), 100)
                            },
                            hide: function() {
                                this.timer && (clearInterval(this.timer), this.timer = null),
                                this.throbberCover && this.throbberCover.setStyle("visibility", "hidden")
                            }
                        }),
                        this.throbber.show()
                    },
                    i.on("simpleuploads.startUpload",
                    function(e) {
                        var t = e.editor,
                        a = t.config,
                        n = e.data && e.data.file;
                        a.simpleuploads_maxFileSize && n && n.size && n.size > a.simpleuploads_maxFileSize && (alert(t.lang.simpleuploads.fileTooBig), e.cancel()),
                        n = e.data.name,
                        a.simpleuploads_invalidExtensions && RegExp(".(?:" + a.simpleuploads_invalidExtensions + ")$", "i").test(n) && (alert(t.lang.simpleuploads.invalidExtension), e.cancel()),
                        a.simpleuploads_acceptedExtensions && !RegExp(".(?:" + a.simpleuploads_acceptedExtensions + ")$", "i").test(n) && (alert(t.lang.simpleuploads.nonAcceptedExtension.replace("%0", a.simpleuploads_acceptedExtensions)), e.cancel())
                    }),
                    i.on("simpleuploads.startUpload",
                    function(e) {
                        var t = e.data,
                        a = e.editor;
                        if (!t.image && !t.forceLink && CKEDITOR.plugins.simpleuploads.isImageExtension(a, t.name) && t.mode && t.mode.type && a.hasListeners("simpleuploads.localImageReady")) {
                            if (e.cancel(), "base64paste" == t.mode.type) {
                                var n = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                                t.result = "<span id='" + n + "' class='SimpleUploadsTmpWrapper' style='display:none'>&nbsp;</span>",
                                t.mode.id = n
                            }
                            var i = new Image;
                            i.onload = function() {
                                var n = CKEDITOR.tools.extend({},
                                t);
                                n.image = i,
                                "boolean" != typeof a.fire("simpleuploads.localImageReady", n) && CKEDITOR.plugins.simpleuploads.insertProcessedFile(e.editor, n)
                            },
                            i.src = "string" == typeof t.file ? t.file: URL.createObjectURL(t.file)
                        }
                    }),
                    o.simpleuploads_convertBmp && i.on("simpleuploads.localImageReady", e),
                    o.simpleuploads_maximumDimensions && i.on("simpleuploads.localImageReady", t),
                    i.on("simpleuploads.finishedUpload",
                    function(e) {
                        if (i.widgets && i.plugins.image2 && (e = e.data.element, "img" == e.getName())) {
                            var t = i.widgets.getByElement(e);
                            t ? (t.data.src = e.data("cke-saved-src"), t.data.width = e.$.width, t.data.height = e.$.height) : (i.widgets.initOn(e, "image2"), i.widgets.initOn(e, "image"))
                        }
                    }),
                    i.on("paste",
                    function(e) {
                        var t = e.data; (t = t.html || t.type && "html" == t.type && t.dataValue) && (CKEDITOR.env.webkit && t.indexOf("webkit-fake-url") > 0 && (alert("Sorry, the images pasted with Safari aren't usable"), window.open("https://bugs.webkit.org/show_bug.cgi?id=49141"), t = t.replace(/<img src="webkit-fake-url:.*?">/g, "")), "base64" != o.filebrowserImageUploadUrl && (t = t.replace(/<img(.*?) src="data:image\/.{3,4};base64,.*?"(.*?)>/g,
                        function(e) {
                            if (!i.config.filebrowserImageUploadUrl) return "";
                            var t = e.match(/"(data:image\/(.{3,4});base64,.*?)"/),
                            a = t[1],
                            t = t[2].toLowerCase(),
                            n = CKEDITOR.plugins.simpleuploads.getTimeStampId();
                            if (a.length < 128) return e;
                            "jpeg" == t && (t = "jpg");
                            var o = {
                                context: "pastedimage",
                                name: n + "." + t,
                                id: n,
                                forceLink: !1,
                                file: a,
                                mode: {
                                    type: "base64paste"
                                }
                            };
                            if (!m(i, o)) return o.result;
                            var e = o.element,
                            r = e.$.innerHTML;
                            return e.$.innerHTML = "&nbsp;",
                            i.on("afterPaste",
                            function(e) {
                                e.removeListener(),
                                (e = i.document.$.getElementById(n)) && (e.innerHTML = r, b(i, o))
                            }),
                            e.getOuterHtml()
                        })), e.data.html ? e.data.html = t: e.data.dataValue = t)
                    });
                    var r = function(e) {
                        if ("wysiwyg" == i.mode) {
                            var t = i.document;
                            i.editable && (t = i.editable()),
                            t.$.querySelector(".SimpleUploadsTmpWrapper") && (e = e.name.substr(5).toLowerCase(), "redo" == e && i.getCommand(e).state == CKEDITOR.TRISTATE_DISABLED && (e = "undo"), i.execCommand(e))
                        }
                    },
                    s = i.getCommand("undo");
                    if (s && s.on("afterUndo", r), (s = i.getCommand("redo")) && i.getCommand("redo").on("afterRedo", r), i.on("afterUndo", r), i.on("afterRedo", r), i.addCommand("addFile", {
                        exec: function(e) {
                            n(e, !1, this)
                        }
                    }), i.ui.addButton("addFile", {
                        label: i.lang.simpleuploads.addFile,
                        command: "addFile",
                        toolbar: "upload",
                        allowedContent: "a[!href];span[id](SimpleUploadsTmpWrapper);",
                        requiredContent: "a[!href]"
                    }), i.addCommand("addImage", {
                        exec: function(e) {
                            n(e, !0, this)
                        }
                    }), i.ui.addButton && i.ui.addButton("addImage", {
                        label: i.lang.simpleuploads.addImage,
                        command: "addImage",
                        toolbar: "upload",
                        allowedContent: "img[!src,width,height];span[id](SimpleUploadsTmpWrapper);",
                        requiredContent: "img[!src]"
                    }), "undefined" != typeof FormData) {
                        var d, p, c, u, f, g, h, C, w, E = -1,
                        T = -1,
                        I = function() {
                            var e = CKEDITOR.dialog.getCurrent();
                            e ? e.parts.title.getParent().removeClass("SimpleUploadsOverCover") : i.container.removeClass("SimpleUploadsOverContainer")
                        };
                        i.on("destroy",
                        function() {
                            CKEDITOR.removeListener("simpleuploads.droppedFile", I),
                            CKEDITOR.document.removeListener("dragenter", y),
                            CKEDITOR.document.removeListener("dragleave", D),
                            x()
                        });
                        var x = function() {
                            d && d.removeListener && (c.removeListener("paste", v), d.removeListener("dragenter", O), d.removeListener("dragleave", k), d.removeListener("dragover", F), d.removeListener("drop", R), p = d = c = null)
                        };
                        CKEDITOR.on("simpleuploads.droppedFile", I);
                        var y = function(e) {
                            if ( - 1 == T && l(e)) {
                                if (e = CKEDITOR.dialog.getCurrent()) {
                                    if (!e.handleFileDrop) return;
                                    e.parts.title.getParent().addClass("SimpleUploadsOverCover")
                                } else i.readOnly || i.container.addClass("SimpleUploadsOverContainer");
                                h = T = 0,
                                C = CKEDITOR.document.$.body.parentNode.clientWidth,
                                w = CKEDITOR.document.$.body.parentNode.clientHeight
                            }
                        },
                        D = function(e) { - 1 != T && (e = e.data.$, (e.clientX <= T || e.clientY <= h || e.clientX >= C || e.clientY >= w) && (I(), T = -1))
                        };
                        CKEDITOR.document.on("dragenter", y),
                        CKEDITOR.document.on("dragleave", D);
                        var R = function(e) {
                            if (p.removeClass("SimpleUploadsOverEditor"), E = -1, CKEDITOR.fire("simpleuploads.droppedFile"), T = -1, i.readOnly) return e.data.preventDefault(),
                            !1;
                            var t = e.data.$,
                            a = t.dataTransfer;
                            if (a && a.files && a.files.length > 0) {
                                i.fire("saveSnapshot"),
                                e.data.preventDefault();
                                for (var e = {
                                    ev: t,
                                    range: !1,
                                    count: a.files.length,
                                    rangeParent: t.rangeParent,
                                    rangeOffset: t.rangeOffset
                                },
                                n = 0; n < a.files.length; n++) {
                                    var o = a.files[n],
                                    r = CKEDITOR.tools.getNextId();
                                    CKEDITOR.plugins.simpleuploads.insertDroppedFile(i, {
                                        context: t,
                                        name: o.name,
                                        file: o,
                                        forceLink: t.shiftKey,
                                        id: r,
                                        mode: {
                                            type: "droppedFile",
                                            dropLocation: e
                                        }
                                    })
                                }
                            }
                        },
                        O = function(e) { - 1 == E && l(e) && (i.readOnly || p.addClass("SimpleUploadsOverEditor"), e = p.$.getBoundingClientRect(), E = e.left, u = e.top, f = E + p.$.clientWidth, g = u + p.$.clientHeight)
                        },
                        k = function(e) { - 1 != E && (e = e.data.$, (e.clientX <= E || e.clientY <= u || e.clientX >= f || e.clientY >= g) && (p.removeClass("SimpleUploadsOverEditor"), E = -1))
                        },
                        F = function(e) {
                            if ( - 1 != E) {
                                if (i.readOnly) return e.data.$.dataTransfer.dropEffect = "none",
                                e.data.preventDefault(),
                                !1;
                                e.data.$.dataTransfer.dropEffect = "copy",
                                CKEDITOR.env.gecko || e.data.preventDefault()
                            }
                        };
                        i.on("contentDom",
                        function() {
                            d = i.document,
                            p = d.getBody().getParent(),
                            3 == i.elementMode && (p = d = i.element),
                            1 == i.elementMode && "divarea" in i.plugins && (p = d = i.editable()),
                            c = i.editable ? i.editable() : d,
                            CKEDITOR.env.ie && CKEDITOR.env.version >= 11 && i.config.forcePasteAsPlainText && i.editable().isInline() ? c.attachListener(c, "beforepaste",
                            function() {
                                i.document.on("paste",
                                function(e) {
                                    e.removeListener(),
                                    v(e)
                                },
                                null, {
                                    editor: i
                                })
                            }) : c.on("paste", v, null, {
                                editor: i
                            },
                            8),
                            d.on("dragenter", O),
                            d.on("dragleave", k),
                            CKEDITOR.env.gecko || d.on("dragover", F),
                            d.on("drop", R)
                        }),
                        i.on("contentDomUnload", x),
                        i.plugins.fileDropHandler = {
                            addTarget: function(e, t) {
                                e.on("dragenter",
                                function(t) { - 1 == E && l(t) && (e.addClass("SimpleUploadsOverDialog"), t = e.$.getBoundingClientRect(), E = t.left, u = t.top, f = E + e.$.clientWidth, g = u + e.$.clientHeight)
                                }),
                                e.on("dragleave",
                                function(t) { - 1 != E && (t = t.data.$, (t.clientX <= E || t.clientY <= u || t.clientX >= f || t.clientY >= g) && (e.removeClass("SimpleUploadsOverDialog"), E = -1))
                                }),
                                e.on("dragover",
                                function(e) { - 1 != E && (e.data.$.dataTransfer.dropEffect = "copy", e.data.preventDefault())
                                }),
                                e.on("drop",
                                function(a) {
                                    e.removeClass("SimpleUploadsOverDialog"),
                                    E = -1,
                                    CKEDITOR.fire("simpleuploads.droppedFile"),
                                    T = -1;
                                    var n = a.data.$,
                                    o = n.dataTransfer;
                                    if (o && o.files && o.files.length > 0) for (a.data.preventDefault(), a = 0; 1 > a; a++) {
                                        var r = o.files[a],
                                        r = {
                                            context: n,
                                            name: r.name,
                                            file: r,
                                            id: CKEDITOR.tools.getNextId(),
                                            forceLink: !1,
                                            callback: t,
                                            mode: {
                                                type: "callback"
                                            }
                                        };
                                        CKEDITOR.plugins.simpleuploads.processFileWithCallback(i, r)
                                    }
                                })
                            }
                        }
                    }
                }
            } else window.console && console.log && (console.log("The editor is missing the 'config.filebrowserUploadUrl' entry to know the url that will handle uploaded files.\r\nIt should handle the posted file as shown in Example 3: http://docs.cksource.com/CKEditor_3.x/Developers_Guide/File_Browser_%28Uploader%29/Custom_File_Browser#Example_3\r\nMore info: http://alfonsoml.blogspot.com/2009/12/using-your-own-uploader-in-ckeditor.html"), console[console.warn ? "warn": "log"]("The 'SimpleUploads' plugin now is disabled."))
        },
        afterInit: function(e) { (e = (e = e.dataProcessor) && e.htmlFilter) && e.addRules(O, {
                applyToAll: !0
            })
        }
    }),
    CKEDITOR.plugins.simpleuploads = {
        getTimeStampId: function() {
            var e = 0;
            return function() {
                return e++,
                (new Date).toISOString().replace(/\..*/, "").replace(/\D/g, "_") + e
            }
        } (),
        isImageExtension: function(e, t) {
            return e.config.simpleuploads_imageExtensions ? RegExp(".(?:" + e.config.simpleuploads_imageExtensions + ")$", "i").test(t) : !1
        },
        insertProcessedFile: function(e, t) {
            switch (t.element = null, t.id = this.getTimeStampId(), t.mode.type) {
            case "selectedFile":
                var a = this;
                window.setTimeout(function() {
                    a.insertSelectedFile(e, t)
                },
                50);
                break;
            case "pastedFile":
                this.insertPastedFile(e, t);
                break;
            case "callback":
                a = this,
                window.setTimeout(function() {
                    a.processFileWithCallback(e, t)
                },
                50);
                break;
            case "droppedFile":
                this.insertDroppedFile(e, t);
                break;
            case "base64paste":
                this.insertBase64File(e, t);
                break;
            default:
                alert("Error, no valid type", t.mode)
            }
        },
        insertSelectedFile: function(e, t) {
            var a = t.mode,
            n = a.i,
            i = a.count;
            if (m(e, t) && (a = t.element)) {
                if (1 == i) {
                    var o, r = e.getSelection(),
                    i = r.getSelectedElement();
                    if (i && "img" == i.getName() && "span" == a.getName() && (o = i.$), "a" == a.getName()) {
                        var l = i,
                        s = r.getRanges(),
                        r = s && s[0];
                        for (!l && s && 1 == s.length && (l = r.startContainer.$, l.nodeType == document.TEXT_NODE && (l = l.parentNode)); l && l.nodeType == document.ELEMENT_NODE && "a" != l.nodeName.toLowerCase();) l = l.parentNode;
                        l && l.nodeName && "a" == l.nodeName.toLowerCase() && (o = l),
                        o || !r || !i && r.collapsed || (o = new CKEDITOR.style({
                            element: "a",
                            attributes: {
                                href: "#"
                            }
                        }), o.type = CKEDITOR.STYLE_INLINE, o.applyToRange(r), l = r.startContainer.$, l.nodeType == document.TEXT_NODE && (l = l.parentNode), o = l)
                    }
                    if (o) return o.parentNode.replaceChild(a.$, o),
                    t.originalNode = o,
                    void e.fire("saveSnapshot")
                }
                n > 0 && "a" == a.getName() && e.insertHtml("&nbsp;"),
                e.insertElement(a),
                b(e, t)
            }
        },
        insertPastedFile: function(e, t) {
            if (m(e, t)) {
                var a = t.element;
                if (t.mode.dialog) e.fire("updateSnapshot"),
                e.insertElement(a),
                e.fire("updateSnapshot");
                else {
                    var n = function() {
                        e.getSelection().getRanges().length ? e.editable().$.querySelector("#cke_pastebin") ? window.setTimeout(n, 0) : (e.fire("updateSnapshot"), e.insertElement(a), e.fire("updateSnapshot"), b(e, t)) : window.setTimeout(n, 0)
                    };
                    window.setTimeout(n, 0)
                }
            }
        },
        processFileWithCallback: function(e, t) {
            m(e, t)
        },
        insertDroppedFile: function(e, t) {
            if (m(e, t)) {
                var a = t.element,
                n = t.mode.dropLocation,
                i = n.range,
                o = n.ev,
                r = n.count;
                i && "a" == a.getName() && (i.pasteHTML ? i.pasteHTML("&nbsp;") : i.insertNode(e.document.$.createTextNode(" ")));
                var l = o.target;
                if (!i) {
                    var s = e.document.$;
                    if (n.rangeParent) {
                        var o = n.rangeParent,
                        d = n.rangeOffset,
                        i = s.createRange();
                        i.setStart(o, d),
                        i.collapse(!0)
                    } else if (document.caretRangeFromPoint) i = s.caretRangeFromPoint(o.clientX, o.clientY);
                    else if ("img" == l.nodeName.toLowerCase()) i = s.createRange(),
                    i.selectNode(l);
                    else if (document.body.createTextRange) {
                        d = s.body.createTextRange();
                        try {
                            d.moveToPoint(o.clientX, o.clientY),
                            i = d
                        } catch(p) {
                            i = s.createRange(),
                            i.setStartAfter(s.body.lastChild),
                            i.collapse(!0)
                        }
                    }
                    n.range = i
                }
                if (s = a.getName(), n = !1, 1 == r && ("img" == l.nodeName.toLowerCase() && "span" == s && (l.parentNode.replaceChild(a.$, l), t.originalNode = l, n = !0), "a" == s)) {
                    for (i.startContainer ? (r = i.startContainer, r.nodeType == document.TEXT_NODE ? r = r.parentNode: i.startOffset < r.childNodes.length && (r = r.childNodes[i.startOffset])) : r = i.parentElement(), r && "img" != l.nodeName.toLowerCase() || (r = l), l = r; l && l.nodeType == document.ELEMENT_NODE && "a" != l.nodeName.toLowerCase();) l = l.parentNode;
                    l && l.nodeName && "a" == l.nodeName.toLowerCase() && (l.parentNode.replaceChild(a.$, l), t.originalNode = l, n = !0),
                    n || "img" != r.nodeName.toLowerCase() || (l = r.ownerDocument.createElement("a"), l.href = "#", r.parentNode.replaceChild(l, r), l.appendChild(r), l.parentNode.replaceChild(a.$, l), t.originalNode = l, n = !0)
                }
                n || (i ? i.pasteHTML ? i.pasteHTML(a.$.outerHTML) : i.insertNode(a.$) : e.insertElement(a)),
                b(e, t),
                e.fire("saveSnapshot")
            }
        },
        insertBase64File: function(e, t) {
            delete t.result;
            var a = e.document.getById(t.mode.id);
            m(e, t) ? (e.getSelection().selectElement(a), e.insertElement(t.element), b(e, t)) : (a.remove(), t.result && e.insertHTML(t.result))
        }
    },
    CKEDITOR.skins && (CKEDITOR.plugins.setLang = CKEDITOR.tools.override(CKEDITOR.plugins.setLang,
    function(e) {
        return function(t, a, n) {
            if ("devtools" != t && "object" != typeof n[t]) {
                var i = {};
                i[t] = n,
                n = i
            }
            e.call(this, t, a, n)
        }
    })),
    CKEDITOR.on("dialogDefinition",
    function(e) {
        if (e.editor.plugins.simpleuploads) {
            var t, a = e.data.definition;
            for (t in a.contents) {
                var n = a.contents[t];
                n && h(e.editor, e.data.name, a, n.elements)
            }
            "paste" == e.data.name && (a.onShow = CKEDITOR.tools.override(a.onShow,
            function(e) {
                return function() {
                    "function" == typeof e && e.call(this),
                    w(this.getContentElement("general", "editing_area").getInputElement())
                }
            }))
        }
    },
    null, null, 30)
} ();