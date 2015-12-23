jQuery(function (t) {
    "use strict";
    function i(t, i) {
        var a = !0;
        for (var e in t) {
            var r = t[e].toLowerCase();
            if ("undefined" == typeof i[e])var o = "undefined"; else var o = i[e].toLowerCase();
            0 != r.length && 0 != o.length && r != o && (a = !1)
        }
        return a
    }

    function a(t) {
        for (var a = [], e = 0; e < product_variations.length; e++) {
            var r = product_variations[e];
            i(r.attributes, t) && a.push(r)
        }
        return a
    }

    function e(i) {
        t(".variations select").each(function (a, e) {
            var r = t(e);
            r.find("option:gt(0)").hide().prop("disabled", true);
            var o = r.attr("name");
            for (var n in i) {
                var s = i[n].attributes;
                for (var l in s) {
                    var h = s[l];
                    l == o && (h ? r.find('option[value="' + h + '"]').show().prop("disabled", false) : r.find("option").show().prop("disabled", false))
                }
            }
        }), t(".variations select").first().find("option:gt(0)").show().prop("disabled", false)
    }

    function r(i) {
        var a, e = t("div.images img:eq(0)"), r = t("div.images a.zoom:eq(0)"), o = t(e).attr("original-src"), n = t(r).attr("original-href"), s = i.image_src, l = i.image_link;
        a = i.same_prices ? i.availability_html : i.price_html + i.availability_html, t(".single_variation").html(a), o || t(e).attr("original-src", t(e).attr("src")), n || t(r).attr("original-href", t(r).attr("href")), s && s.length > 1 ? (t(e).attr("src", s), t(r).attr("href", l)) : (t(e).attr("src", o), t(r).attr("href", n)), t(".product_meta .sku").remove(), t(".product_meta").append(i.sku), t(".shop_attributes").find(".weight").remove(), i.a_weight && t(".shop_attributes").append(i.a_weight), t(".shop_attributes").find(".length").remove(), i.a_length && t(".shop_attributes").append(i.a_length), t(".shop_attributes").find(".width").remove(), i.a_width && t(".shop_attributes").append(i.a_width), t(".shop_attributes").find(".height").remove(), i.a_height && t(".shop_attributes").append(i.a_height), i.in_stock ? i.no_price ? t(".single_variation").slideDown() : t(".variations_button, .single_variation").slideDown() : t(".single_variation").slideDown(), t(".single_variation").trigger("jigoshop.variation.show", [i.variation_id])
    }

    function o() {
        t("form input[name=variation_id]").val(""), t(".single_variation").text(""), t(".variations_button, .single_variation").slideUp(), t(".product_meta .sku").remove(), t(".shop_attributes").find(".weight").remove(), t(".shop_attributes").find(".length").remove(), t(".shop_attributes").find(".width").remove(), t(".shop_attributes").find(".height").remove();
        var i = !0, o = {};
        t(".variations select").each(function () {
            0 == t(this).val().length && (i = !1), o[t(this).attr("name")] = t(this).val()
        });
        var n = a(o);
        if (i) {
            var s = n.pop();
            t("form input[name=variation_id]").val(s.variation_id), r(s)
        } else e(n)
    }

    jigoshop_params.message_hide_time > 0 && setTimeout(function () {
        t(".jigoshop_message").slideUp("normal", function () {
            t(this).remove()
        })
    }, jigoshop_params.message_hide_time), jigoshop_params.error_hide_time > 0 && setTimeout(function () {
        t(".jigoshop_error").slideUp("normal", function () {
            t(this).remove()
        })
    }, jigoshop_params.error_hide_time), jigoshop_params.load_fancybox && t("a.zoom").prettyPhoto({
        animation_speed: "normal",
        slideshow: 5e3,
        autoplay_slideshow: !1,
        show_title: !1,
        theme: "pp_default",
        horizontal_padding: 50,
        opacity: .7,
        overlay_gallery: !1,
        deeplinking: !1,
        social_tools: !1
    }), t("div.quantity, td.quantity").append('<input type="button" value="+" id="add1" class="plus" />').prepend('<input type="button" value="-" id="minus1" class="minus" />'), t(".plus").click(function () {
        var i = parseInt(t(this).prev(".qty").val());
        i && "" != i && "NaN" != i || (i = 0), t(this).prev(".qty").val(i + 1)
    }), t(".minus").click(function () {
        var i = parseInt(t(this).next(".qty").val());
        "NaN" == i && (i = 0), i > 0 && t(this).next(".qty").val(i - 1)
    }), t(".variations select").change(function () {
        var i = t(this).data("num");
        t(this).val().length > 0 && (i += 1);
        var a = t(".variations select");
        a.filter(":lt(" + i + ")").removeAttr("disabled"), a.filter(":eq(" + i + ")").removeAttr("disabled").val(""), a.filter(":gt(" + i + ")").attr("disabled", "disabled").val(""), o(t(this))
    }), t(".variations select:gt(0)").attr("disabled", "disabled"), t.each(t(".variations select"), function (i, a) {
        t(a).data("num", i)
    });
    var n = null, s = {}, l = t("form.variations_form .variations select").length;
    t("form.variations_form .variations select").each(function (i) {
        return s[t(this).attr("name")] = t(this).val(), "" == t(this).val() ? !1 : i == l - 1 && 0 == a(s).length ? !1 : void(n = t(this))
    }), n && n.change()
});