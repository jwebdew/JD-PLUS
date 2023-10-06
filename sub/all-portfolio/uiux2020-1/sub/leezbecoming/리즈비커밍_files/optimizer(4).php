var SHOP_PRICE_UTIL = {
    /**
     * iShopNo 쇼핑몰의 결제화폐 금액 입력폼으로 만듭니다.
     * @param Element elem 입력폼
     * @param bool bUseMinus 마이너스 입력 사용 여부
     */
    toShopPriceInput: function(elem, iShopNo, bUseMinus)
    {
        iShopNo = parseInt(iShopNo) || EC_SDE_SHOP_NUM;

        var iDecimalPlace = SHOP_CURRENCY_INFO[iShopNo].aShopCurrencyInfo.decimal_place;
        bUseMinus ? SHOP_PRICE_UTIL._toPriceInput(elem, iDecimalPlace, bUseMinus) : SHOP_PRICE_UTIL._toPriceInput(elem, iDecimalPlace);
    },

    /**
     * iShopNo 쇼핑몰의 참조화폐 금액 입력폼으로 만듭니다.
     * @param Element elem 입력폼
     */
    toShopSubPriceInput: function(elem, iShopNo)
    {
        iShopNo = parseInt(iShopNo) || EC_SDE_SHOP_NUM;

        var iDecimalPlace = SHOP_CURRENCY_INFO[iShopNo].aShopSubCurrencyInfo.decimal_place;
        SHOP_PRICE_UTIL._toPriceInput(elem, iDecimalPlace);
    },

    /**
     * iShopNo 쇼핑몰의 기준화폐 금액 입력폼으로 만듭니다.
     * @param Element elem 입력폼
     */
    toBasePriceInput: function(elem, iShopNo)
    {
        iShopNo = parseInt(iShopNo) || EC_SDE_SHOP_NUM;

        var iDecimalPlace = SHOP_CURRENCY_INFO[iShopNo].aBaseCurrencyInfo.decimal_place;
        SHOP_PRICE_UTIL._toPriceInput(elem, iDecimalPlace);
    },

    /**
     * 소수점 iDecimalPlace까지만 입력 가능하도록 처리
     * @param Element elem 입력폼
     * @param int iDecimalPlace 허용 소수점
     * @param bool bUseMinus 마이너스 입력 사용 여부
     */
    _toPriceInput: function(elem, iDecimalPlace, bUseMinus)
    {
        attachEvent(elem, 'keyup', function(e) {
            e = e || window.event;
            bUseMinus ? replaceToMinusPrice(e.srcElement) : replaceToPrice(e.srcElement);
        });
        attachEvent(elem, 'blur', function(e) {
            e = e || window.event;
            bUseMinus ? replaceToMinusPrice(e.srcElement) : replaceToPrice(e.srcElement);
        });

        // 추가금액에서 마이너스를 입력받기 위해 사용
        function replaceToMinusPrice(target) {
            var value = target.value;

            var regExpTest = new RegExp('^[0-9]*' + (iDecimalPlace ? '' : '\\.[0-9]{0, ' + iDecimalPlace + '}') + '$');

            if (regExpTest.test(value) === false) {
                value = value.replace(/[^0-9.|\-]/g, '');
                if (parseInt(iDecimalPlace)) {
                    value = value.replace(/^([0-9]+\.[0-9]+)\.+.*$/, '$1');
                    value = value.replace(new RegExp('(\\.[0-9]{' + iDecimalPlace + '})[0-9]*$'), '$1');
                } else {
                    value = value.replace(/[^(0-9|\-)]/g, '');
                }
                target.value = value;
            }
        }

        function replaceToPrice(target)
        {
            var value = target.value;

            var regExpTest = new RegExp('^[0-9]*' + (iDecimalPlace ? '' : '\\.[0-9]{0, ' + iDecimalPlace + '}') + '$');
            if (regExpTest.test(value) === false) {
                value = value.replace(/[^0-9.]/g, '');
                if (parseInt(iDecimalPlace)) {
                    value = value.replace(/^([0-9]+\.[0-9]+)\.+.*$/, '$1');
                    value = value.replace(new RegExp('(\\.[0-9]{' + iDecimalPlace + '})[0-9]*$'), '$1');
                } else {
                    value = value.replace(/\.+[0-9]*$/, '');
                }
                target.value = value;
            }
        }

        function attachEvent(elem, sEventName, fn)
        {
            if (elem.addEventListener) {
                elem.addEventListener(sEventName, fn, false);

            } else if (elem.attachEvent) {
                elem.attachEvent("on" + sEventName, fn);
            }
        }

    }
};

if (window.jQuery !== undefined) {
    $.fn.extend({
        toShopPriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = $(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toShopPriceInput(this, iElementShopNo);
            });
        },
        toShopSubPriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = $(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toShopSubPriceInput(this, iElementShopNo);
            });
        },
        toBasePriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = $(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toBasePriceInput(this, iElementShopNo);
            });
        }
    });
}

// EC$ 별칭용
if (typeof window.EC$ === 'function') {
    EC$.fn.extend({
        toShopPriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = EC$(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toShopPriceInput(this, iElementShopNo);
            });
        },
        toShopSubPriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = EC$(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toShopSubPriceInput(this, iElementShopNo);
            });
        },
        toBasePriceInput: function(iShopNo)
        {
            return this.each(function() {
                var iElementShopNo = EC$(this).data('shop_no') || iShopNo;
                SHOP_PRICE_UTIL.toBasePriceInput(this, iElementShopNo);
            });
        }
    });
}

var categoryOddColor = new Object();
var categoryEvenColor = new Object();

EC$(function()
{
    // 카테고리타입
    var aCategoryType = new Array('normal', 'reco', 'new', 'project', 'main');
    // 상품 ID prefix
    var sProductIdPrefix = 'product_';
    // 옵션 미리보기 아이콘 ID prefix
    var sOptPreviewIconId = 'opt_prv_id_';
    // 옵션 미리보기 레이어 ID prefix
    var sOptPreviewLayerId = 'opt_prv_layer_id_';
    // 옵션 미리보기 닫기 버튼 ID prefix
    var sOptPreviewCloseId = 'opt_prv_close_id_';

    // 상품요약정보 (툴팁)
    if (EC$('.tooltip').length > 0 && EC$.fn.Tooltip) {
        EC$('.tooltip').Tooltip({
            'name': 'toolTipStyle',
            'delay': '0',
            'top': '-200',
            'left': '10',
            'fade': false,
            'opacity': 1
        });
    }

    /**
     * 카테고리 타입별로 홀짝수 라인색상 설정
     */
    var iCategoryTypeLen = aCategoryType.length;
    for (var i = 0; i < iCategoryTypeLen; i++) {
        var iBeforeOffsetTop = -1;
        var sCategoryType = aCategoryType[i];
        var sBgColor = categoryOddColor[sCategoryType];
        EC$('[id^="' + sProductIdPrefix + aCategoryType[i] + '_"]').each(function(idx)
        {
            if ((idx > 0) && EC$(this).attr('offsetTop') != iBeforeOffsetTop) {
                sBgColor = (sBgColor == categoryOddColor[sCategoryType]) ? categoryEvenColor[sCategoryType] : categoryOddColor[sCategoryType];
            }
            iBeforeOffsetTop = EC$(this).attr('offsetTop');
            EC$(this).css('background-color',sBgColor);
        });
    }

    EC$('#selArray').change(function() {
        location.href = EC$(this).val();
    });

    var sSortName = CAPP_SHOP_FRONT_COMMON_UTIL.getParameterByName('sort_method');

    if (sSortName !== '') {

        if (sSortName.indexOf('#Product_ListMenu') < 0) {
            sSortName = sSortName + '#Product_ListMenu';
        }

        EC$('#selArray>option').each(function() {
            if (EC$(this).val().indexOf(sSortName) > 0) {
                EC$(this).prop('selected', true);
            }
        });
    }


    /**
     * 옵션아이콘 onmouseover 핸들러
     */
    EC$('[id^="' + sOptPreviewIconId + '"]').mouseover(function()
    {
        if (sOptionPreviewMethod.indexOf('mouseover') > -1)
            setOptLayerDisplay(EC$(this));
    });

    /**
     * 옵션아이콘 onmouseclick 핸들러
     */
    EC$('[id^="' + sOptPreviewIconId + '"]').click(function()
    {
        if (sOptionPreviewMethod.indexOf('mouseclick') > -1)
            setOptLayerDisplay(EC$(this));
    });

    /**
     * 옵션 하나만 선택가능 옵션 동작
     */
    try {
        EC$(document).on('click', 'input[name="item_code[]"]', function() {
            if (EC$.data(document, 'sUseOptionOne_class') === 'T') {
                if (EC$('input[name="item_code[]"][option_name="' + EC$(this).attr('option_name') + '"]:checked').length > 1) {
                    alert(__('옵션별로 1개 씩만 선택 가능한 상품입니다.'));
                    EC$(this).prop('checked', false);
                }

            }
        });
    } catch (e) {}
    /**
     * 옵션 레이어 display 조절
     *
     * @param object optIcon 옵션 아이콘 JQuery 객체
     * @param string sPopupMethod 팝업 method (mouseover|mouseclick)
     */
    function setOptLayerDisplay(optIcon, sPopupMethod)
    {
        var aParam = getOptionParams(optIcon.attr('id'),sOptPreviewIconId);
        // 모든 옵션미리보기창 닫기
        EC$('[id^="' + sOptPreviewLayerId + '"]').each(function()
        {
            EC$(this).css('display','none');
        });

        // 선택된 옵션미리보기창 출력
        var sLayerId = '#' + sOptPreviewLayerId + aParam['product_no'];
        var aPos = findPos(optIcon.get(0));
        EC$(sLayerId).css('position','absolute');
        EC$(sLayerId).css('left',aPos['left']);
        EC$(sLayerId).css('top',(aPos['top'] + optIcon.attr('offsetHeight')) + 'px');
        EC$(sLayerId).css('display','');
        EC$(sLayerId).css('z-index','9999');
    }

    /**
     * 옵션아이콘 onmouseout 핸들러
     */
    EC$('[id^="' + sOptPreviewIconId + '"]').mouseout(function()
    {
        var aParam = getOptionParams(EC$(this).attr('id'),sOptPreviewIconId);
        if (sOptionLayerCloseMethod != 'use_close_button')
            EC$('#' + sOptPreviewLayerId + aParam['product_no']).css('display','none');
    });

    /**
     * 옵션 레이어 onmouseover 핸들러
     */
    EC$('[id^="' + sOptPreviewLayerId + '"]').mouseover(function()
    {
        EC$(this).css('display','');
    });

    /**
     * 옵션 레이어 onmouseout 핸들러
     */
    EC$('[id^="' + sOptPreviewLayerId + '"]').mouseout(function()
    {
        if (sOptionLayerCloseMethod != 'use_close_button')
            EC$(this).css('display','none');
    });

    /**
     * 옵션 레이어 닫기버튼 클릭 핸들러
     */
    EC$('[id^="' + sOptPreviewCloseId + '"]').click(function()
    {
        var aParam = getOptionParams(EC$(this).attr('id'),sOptPreviewCloseId);
        EC$('#' + sOptPreviewLayerId + aParam['product_no']).css('display','none');
    });

    /**
     * HTML 오브젝트의 위치값 계산
     *
     * @param object obj 위치를 알고자 하는 오브젝트
     * @return object left, top 값
     */
    function findPos(obj)
    {
        var iCurLeft = iCurTop = 0;

        if (obj.offsetParent) {
            do {
                iCurLeft += obj.offsetLeft;
                iCurTop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }

        return {
            'left': iCurLeft,
            'top': iCurTop
        };
    }

    /**
     * 옵션관련 ID를 파싱해서 파라메터 추출, 반환
     *
     * @param string sId ID
     * @param string sPrefix 파싱할 때 삭제할 prefix
     * @return array 상품번호+팝업method
     */
    function getOptionParams(sId, sPrefix)
    {
        var aTmp = sId.replace(sPrefix,'').split('_');
        return {
            'product_no': aTmp[0],
            'popup_method': aTmp[1]
        };
    }

    // 할인기간 레이어 열기
    EC$('.shippingFee').on('click', '.deliveryBenefitDetailInfo', function() {
        var oLayerDiscountDelivery = EC$(this).parent();

        if (oLayerDiscountDelivery.attr('benefitinfoLoaded') === undefined) {

            var iProductNo = EC$(this).attr("productno");
            var sBenefitType = EC$(this).attr("benefit_type");

            var oHtml = EC$('<div>');
            oHtml.addClass('ec-base-tooltip');
            oHtml.addClass('wrap');
            EC$(this).parent().append(oHtml);

            EC$.post('/exec/front/Product/Benefitinfo', 'benefit_type='+sBenefitType+'&product_no=' + iProductNo, function(sHtml) {
                oHtml.html(sHtml);
                oLayerDiscountDelivery.attr('benefitinfoLoaded', true);
            });
        }

        oLayerDiscountDelivery.find('div.ec-base-tooltip').show();
        oLayerDiscountDelivery.find('span.arrow').show();

        return false;
    });


    // 할인기간 레이어 열기
    EC$('.discountPeriod > a').mouseover(function() {
        EC$('.layerDiscountPeriod').hide();
        EC$(this).parent().find('.layerDiscountPeriod').show();
    }).mouseout(function() {
        EC$('.layerDiscountPeriod').hide();
    });

    // 차등 배송비 사용시 ToolTip 열기
    try {
        EC$(document).on('click', '.btnTooltip > a', function() {
           EC$('.btnTooltip > .differentialShipping').show();
        });
    } catch (e) {}
    // 차등 배송비 사용시 ToolTip 닫기
    EC$('.btnTooltip > .differentialShipping a').off().click(function() {
        EC$('.btnTooltip > .differentialShipping').hide();
    });


    // 배송비정보 레이어 닫기
    try {
        EC$(document).on('click', '.ec-base-tooltip > .close', function() {
            EC$(this).parents('.ec-base-tooltip').hide();
            EC$(this).parents('.differentialShipping').hide();
            return false;
        });
    } catch (e) {}

    // 배송비정보 레이어 닫기
    try {
        EC$(document).on('click', '.differentialShipping > .close > a', function() {
            EC$(this).parents('.differentialShipping').hide();
        });
    } catch (e) {}

    COLORCHIPLIST.init();
    CAPP_PRODUCT_LIST_WISHICON.init();

});

var CAPP_PRODUCT_LIST_WISHICON = {
    iDuplicateSecond: 2000, //중복 클릭 제한시간
    iClickCount: 0,
    iRecentClickProductNo: 0,
    iTimeoutId: 0, // 중복방지 대기시간 실행 시퀀스 번호
    init: function()
    {
        var iProductNo = 0;
        var iCategoryNo = 0;
        var oObj = null;
        var sLogin = '';
        var bIsIndividualSetProduct = false;
        try {
            EC$(document).on('click', '.ec-product-listwishicon', function () {
                oObj = EC$(this);
                iProductNo = parseInt(oObj.attr('productno'));
                iCategoryNo = oObj.attr('categoryno');
                sLogin = oObj.attr('login_status');
                bIsIndividualSetProduct = oObj.attr('individual-set') === 'T';

                if (sLogin !== 'T') {
                    alert(__('로그인 후 관심상품 등록을 해주세요.'));
                    location.href = '/member/login.html?returnUrl=' + encodeURIComponent(location.href);
                    return;
                }


                if (CAPP_PRODUCT_LIST_WISHICON.iRecentClickProductNo === iProductNo) {
                    if (CAPP_PRODUCT_LIST_WISHICON.iClickCount === 1) {
                        CAPP_PRODUCT_LIST_WISHICON.iClickCount++;
                        CAPP_PRODUCT_LIST_WISHICON.initCount();
                    } else if (CAPP_PRODUCT_LIST_WISHICON.iClickCount > 1) {
                        return;
                    }
                } else {
                    CAPP_PRODUCT_LIST_WISHICON.iClickCount = 0;
                    CAPP_PRODUCT_LIST_WISHICON.iRecentClickProductNo = iProductNo;
                    if (CAPP_PRODUCT_LIST_WISHICON.iTimeoutId > 0) {
                        clearTimeout(CAPP_PRODUCT_LIST_WISHICON.iTimeoutId);
                    }
                }

                // DB 처리전 카운트를 해야 정확히 중복체크가능
                CAPP_PRODUCT_LIST_WISHICON.iClickCount++;

                if (oObj.attr('icon_status') === 'on') {
                    sCommand = 'del';
                } else {
                    sCommand = 'add';
                }

                var sUrl = '/exec/front/Product/Wishlist/';
                var sParam = 'command=' + sCommand + '&from=wish_icon';
                sParam += '&referer=' + encodeURIComponent('//' + location.hostname + location.pathname + location.search);
                sParam += '&product_no=' + iProductNo + '&cate_no=' + iCategoryNo;
                if (bIsIndividualSetProduct === true) {
                    sParam += '&set_product=T';
                }

                EC$.post(
                    sUrl,
                    sParam,
                    function (data) {
                        CAPP_PRODUCT_LIST_WISHICON.getResultWishIconAjax(data, oObj);
                    },
                    'json');
            });
        } catch (e) {}
    },

    /**
     * 클릭후 시간체크
     */
    initCount: function()
    {
        CAPP_PRODUCT_LIST_WISHICON.iTimeoutId = setTimeout(function() {
            CAPP_PRODUCT_LIST_WISHICON.iClickCount = 0;
        }, CAPP_PRODUCT_LIST_WISHICON.iDuplicateSecond);
    },

    getResultWishIconAjax: function(aData, oObj)
    {
        var STORAGE_KEY = 'localWishList' + EC_SDE_SHOP_NUM;
        if (aData == null) return;
        if (aData.result == 'SUCCESS') {
            var iProductNo = EC$(oObj).attr('productno');

            EC$('.ec-product-listwishicon[productno="'+iProductNo+'"]').each(function() {
                var oStorageData = EC_UTIL.parseJSON(sessionStorage.getItem(STORAGE_KEY));
                if (EC$(this).attr('icon_status') === 'off') {
                    var src = aData.data.wish_icon.on;
                    var alt = aData.data.wish_alt.on;
                    if (oStorageData !== null && oStorageData.hasOwnProperty('on_tags') === true) {
                        src = oStorageData.on_tags.src;
                        alt = oStorageData.on_tags.alt;
                    }
                    EC$(this).attr('src', src);
                    EC$(this).attr('alt', alt);
                    EC$(this).attr('icon_status', 'on');
                } else {
                    var src = aData.data.wish_icon.off;
                    var alt = aData.data.wish_alt.off;
                    if (oStorageData !== null && oStorageData.hasOwnProperty('off_tags') === true) {
                        src = oStorageData.off_tags.src;
                        alt = oStorageData.off_tags.alt;
                    }
                    EC$(this).attr('src', src);
                    EC$(this).attr('alt', alt);
                    EC$(this).attr('icon_status', 'off');
                }
            });

            if (CAPP_ASYNC_METHODS.hasOwnProperty('WishList') === true) {
                // 관심상품 추가/삭제시 sessionStorage 추가/삭제 처리
                CAPP_ASYNC_METHODS.WishList.setSessionStorageItem(iProductNo, sCommand);
            }

            if (CAPP_ASYNC_METHODS.hasOwnProperty('Wishcount') === true) {
                CAPP_ASYNC_METHODS.Wishcount.restoreCache();
                CAPP_ASYNC_METHODS.Wishcount.execute();
            }

            if (sCommand === 'add') { // 위시리스트 등록시에만 실행
                EC_PlusAppBridge.addWishList(iProductNo);
            }

        } else if (aData.result == 'ERROR') {
            alert(__('실패하였습니다.'));
        } else if (aData.result == 'NOT_LOGIN') {
            alert(__('회원 로그인 후 이용하실 수 있습니다.'));
        } else if (aData.result == 'INVALID_REQUEST') {
            alert(__('파라미터가 잘못되었습니다.'));
        }
    }
};

//컬러칩 이미지 변경(상품리스트)
var COLORCHIPLIST = {
    init: function() {
        var sSelector = '';
        if (mobileWeb === false) {
            sSelector = 'div.color > .chips';
        } else {
            sSelector = '.xans-product-colorchip .chips';
        }
        try {
            EC$(document).on('mouseover click touchstart', sSelector, function() {
                var iColorNo = EC$(this).attr('color_no');
                var iDisplayGroup = EC$(this).attr('displayGroup');

                if (iColorNo != '') {
                    EC$(this).css('cursor', 'pointer');
                    COLORCHIPLIST.getImage(this, iColorNo, iDisplayGroup);
                }
            });
        } catch (e) {}
    },

    getImage: function(oObj, iColorNo, iDisplayGroup) {
        var sImageUrl = EC$.data(EC$(oObj)[0], 'image');

        if (sImageUrl == undefined) {
            COLORCHIPLIST.getAjax(oObj, iColorNo, iDisplayGroup);
        } else {
            COLORCHIPLIST.setDisplayImage(oObj);
        }
    },

    getAjax: function(oObj, iColorNo, iDisplayGroup)
    {
        EC$.get(
            '/exec/front/Product/Colorimage',
            'iColorNo=' + iColorNo + '&iDisplayGroup=' + iDisplayGroup,
            function(sResponse) {
                if (sResponse != '') {
                    var oJson = EC_UTIL.parseJSON(sResponse);
                    EC$.data(EC$(oObj)[0], 'image', oJson.sImageUrl);
                    EC$.data(EC$(oObj)[0], 'displayGroup', oJson.iDisplayGroup);
                    EC$.data(EC$(oObj)[0], 'product_no', oJson.iProductNo);
                    COLORCHIPLIST.setDisplayImage(oObj);
                }
            }
        );
    },

    setDisplayImage: function(oObj)
    {
        var iDisplayGroup = EC$.data(EC$(oObj)[0], 'displayGroup');
        var iProductNo = EC$.data(EC$(oObj)[0], 'product_no');
        var sImageUrl = EC$.data(EC$(oObj)[0], 'image');

        var oEl = EC$('#eListPrdImage' + iProductNo + '_' + iDisplayGroup);
        oEl.attr('src', sImageUrl);


    }
};

// 상품 확대보기 아이콘 ID prefix
var sProductZoomIdPrefix = 'product_zoom_';

/**
 * 상품 확대보기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sLink 팝업창 URL
 * @param string sOption 팝업 옵션
 */
function zoom(iProductNo, iCategoryNo, iDisplayGroup, sLink, sOption)
{
    // 팝업창 링크
    var sLink = sLink ? sLink : '/product/image_zoom.html';
    sLink += '?product_no=' + iProductNo + '&cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup;
    // 팝업창 옵션
    var sOptions = sOption ? sOption : 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0';
    // 팝업창 이름
    var sWinName = 'image_zoom';

    window.open(sLink,sWinName,sOptions);
}

/**
 * 상품상세 확대보기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sLink 팝업창 URL
 * @param string sOption 팝업 옵션
 */
function zoom2(iProductNo, iCategoryNo, iDisplayGroup, sLink, sOption)
{
    // 팝업창 링크
    var sLink = sLink ? sLink : '/product/image_zoom2.html';
    sLink += '?product_no=' + iProductNo + '&cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup;
    // 팝업창 옵션
    var sOptions = sOption ? sOption : 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0';
    // 팝업창 이름
    var sWinName = 'image_zoom2';

    window.open(sLink,sWinName,sOptions);
}

/**
 * 상품 진열시 높이가 달라서 li가 깨지는 현상이 나타날때 이를 진열된 상품의 기준으로 높이를 다시 재설정해주는 스크립트입니다.
 * 이 스크립트는 반드시 고정폭에서 사용되어야 합니다.
 * 해당스크립트 실행문은 각각 모듈의 js에서 합니다.
 */
$.fn.productResize = function(nodeName) {
    nodeName = nodeName || 'li';

    return $(this).each(function() {
        var iTargetHeight = 0;
        var aTargetElement = new Array();
        var nodes = $(this).find(nodeName);
        var iFirstChildDepth = $(nodes[0]).parents().length; // 타겟 depth
        for (var x = 0; x < nodes.length; x++) {
            if ($(nodes[x]).parents().length == iFirstChildDepth) {
                aTargetElement.push(x);
                if (iTargetHeight < $(nodes[x]).height()) {
                    iTargetHeight = $(nodes[x]).height();
                }
            }
        }
        for (var x in aTargetElement) {
            $(nodes[aTargetElement[x]]).height(iTargetHeight);
        }
    });
};
EC$.fn.productResize = function(nodeName) {
    nodeName = nodeName || 'li';

    return EC$(this).each(function() {
        var iTargetHeight = 0;
        var aTargetElement = new Array();
        var nodes = EC$(this).find(nodeName);
        var iFirstChildDepth = EC$(nodes[0]).parents().length; // 타겟 depth
        for (var x = 0; x < nodes.length; x++) {
            if (EC$(nodes[x]).parents().length == iFirstChildDepth) {
                aTargetElement.push(x);
                if (iTargetHeight < EC$(nodes[x]).height()) {
                    iTargetHeight = EC$(nodes[x]).height();
                }
            }
        }
        for (var x in aTargetElement) {
            EC$(nodes[aTargetElement[x]]).height(iTargetHeight);
        }
    });
};
/**
 * 상품 리스트에서 쓰이는 기능 모음 1. 옵션 미리보기 2. 장바구니 넣기 3. 이미지 줌 4. 요약정보
 */
var EC_ListAction = {
    getOptionSelect: function(iProductNo, iCategoryNo, iDisplayGroup, sBasketType)
    {
        element = document;
        EC$('div.xans-product-basketoption').remove();
        EC$.get(basket_option,{
            'product_no': iProductNo,
            'cate_no': iCategoryNo,
            'display_group': iDisplayGroup,
            'basket_type': sBasketType
        },function(sHtml)
        {
            EC$('body').append(EC$(sHtml.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g,"")));
        });
    },
    getOptionSelectValidate: function(sType)
    {
        var iCheckCount = 0;
        var bReturn = true;
        var bFirst = true;
        var eLists = EC$('.xans-product-optionlist');
        var iProductMin = parseInt(EC$.data(document,'ProductMin_class'),10);

        // 뉴상품인 경우에만 있는 데이터
        var iProductMax = parseInt(EC$.data(document,'ProductMax_class'),10);
        var iBuyUnit = parseInt(EC$.data(document,'ProductBuyUnit_class'),10);

        if (isNaN(iBuyUnit) === true) iBuyUnit = 1;
        if (isNaN(iProductMax) === true) iProductMax = 0;

        if (EC$.data(document,'BundlePromotion') === true) {
            iBuyUnit = 1;
            iProductMin = 1;
            iProductMax = 0;
        }

        var sOptionType = EC$.data(document, 'sOptionType_class');
        var aOptionName = EC_UTIL.parseJSON(EC$.data(document, 'aOptionName_class'));
        if (sOptionType === 'F') {
            EC$(aOptionName).each(function(i) {
                if (EC$('input[option_name="'+aOptionName[i]+'"]:checked').length == 0 && EC$('input[option_name="'+aOptionName[i]+'"]').attr('require') === 'T') {
                    alert(__('필수옵션은 반드시 1개 이상 선택하셔야 구매 또는 장바구니 담기가 가능합니다.'));
                    eOptionName.focus();
                    bReturn = false;
                    bFirst = false;
                    return false;
                }
            });
            if (bReturn === false) {
                bFirst = false;
                return false;
            }
        }

        var aQuantity = new Array();
        for (var x = 0; x < eLists.length; x++) {
            var eList = EC$(eLists[x]);
            eList.find('.' + EC$.data(document,'Check_class')).each(function() {
                if (EC$(this).prop('checked') === true) {
                    iCheckCount++;
                    eList.find('.' + EC$.data(document,'Quantity_class')).each(function() {
                        var iQuantity = parseInt(EC$(this).val(), 10);
                        aQuantity.push(iQuantity);
                        if (bFirst === true) {
                            if (iQuantity < 1) {
                                alert(__('구매하실 수량을 입력해주세요'));
                                EC$(this).focus();
                                bReturn = false;
                                return false;
                            }

                            if ((EC$(this).attr('stock') > 0 || EC$(this).attr('is_soldout') === 'T') && iQuantity > EC$(this).attr('stock')) {
                                alert(__('선택하신 옵션에 해당하는 상품의 재고 수량이 구매하실 수량보다 적습니다.'));
                                EC$(this).focus();
                                bReturn = false;
                                return false;
                            }

                            if (iQuantity % iBuyUnit !== 0) {
                                alert(sprintf(__('선택하신 상품은 %s개 단위로 구매 하실 수 있습니다.'), iBuyUnit));
                                EC$(this).focus();
                                bReturn = false;
                                return false;
                            }

                            if (iQuantity < iProductMin) {
                                alert(sprintf(__('최소 주문수량은 %s개 입니다.'), iProductMin));
                                EC$(this).focus();
                                bReturn = false;
                                return false;
                            }
                            if (iProductMax > 1 && iQuantity > iProductMax) {
                                alert(sprintf(__('최대 주문수량은 %s개 입니다.'), iProductMax));
                                EC$(this).focus();
                                bReturn = false;
                                return false;
                            }
                        }

                        if (bReturn === false) {
                            bFirst = false;
                        }
                    });
                    if (bReturn === false) {
                        bFirst = false;
                    }
                }
            });
        }
        if (iCheckCount < 1) {
            alert(__('구매 또는 장바구니에 담을 상품을 선택해주세요.'));
            return false;
        }
        if (bReturn === true) {
            if (typeof (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE) === 'object') {
                var iProductNum = EC$.data(document,'iProductNo_class');
                if (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.oBundleConfig.hasOwnProperty(iProductNum) === true) {
                    if (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.oBundleConfig[iProductNum] !== null) {
                        if (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.isValidQuantity(aQuantity, iProductNum) === false) {
                            return false;
                        }
                    }
                }
            }

            this.setBasketPrepare(sType);
        } else {
            return false;
        }
    },
    setBasketPrepare: function(sType)
    {
        var frm = this.getBasketForm();
        this.getHiddenElement('product_no',EC$.data(document,'iProductNo_class')).appendTo(frm);
        this.getHiddenElement('main_cate_no',EC$.data(document,'iCategoryNo_class')).appendTo(frm);
        this.getHiddenElement('display_group',EC$.data(document,'iDisplayGroup_class')).appendTo(frm);
        this.getHiddenElement('basket_type',EC$.data(document,'sBasketType_class')).appendTo(frm);
        this.getHiddenElement('product_min',EC$.data(document,'ProductMin_class')).appendTo(frm);
        this.getHiddenElement('delvtype',EC$('input[name="delvtype"]').val()).appendTo(frm);
        this.getHiddenElement('option_type','T').appendTo(frm);
        this.getHiddenElement('command','add').appendTo(frm);
        this.getHiddenElement('has_option','T').appendTo(frm);
        var eLists = EC$('.xans-product-optionlist');
        var bAddProduct = false;
        var sOptionParam = '';
        for (var x = 0; x < eLists.length; x++) {
            var eList = EC$(eLists[x]);
            eList.find('.' + EC$.data(document,'Check_class') + ':checked').each(function()
            {
                var sOptionId = EC$(this).val();
                var iQuantity = eList.find('.' + EC$.data(document,'Quantity_class')).val();
                if (bAddProduct === false) {
                    var aOption = sOptionId.split('-');
                    var k = 0;
                    for (var z = 0; z < aOption.length; z++) {
                        key = z + 1;
                        EC_ListAction.getHiddenElement('option' + key,aOption[z]).appendTo(frm);
                    }

                    eList.find('.' + EC$.data(document,'Quantity_class')).each(function()
                    {
                        EC_ListAction.getHiddenElement('quantity',iQuantity).appendTo(frm);
                        bAddProduct = true;
                    });
                } else {
                    var aBasketInfo = new Array();
                    aBasketInfo.push(EC$.data(document,'iProductNo_class'));
                    aBasketInfo.push(EC$.data(document,'iCategoryNo_class'));
                    aBasketInfo.push(EC$.data(document,'iDisplayGroup_class'));
                    aBasketInfo.push(EC$.data(document,'ProductMin_class'));
                    aBasketInfo.push('product_name');
                    aBasketInfo.push('product_price');
                    aBasketInfo.push('T');
                    aBasketInfo.push(iQuantity);
                    aBasketInfo.push(EC$.data(document,'iOptionSize_class'));
                    var aOption = sOptionId.split('-');
                    var k = 0;
                    for (var z = 0; z < aOption.length; z++) {
                        if (aOption[z] != '0') {
                            aBasketInfo.push(aOption[z]);
                        }
                    }
                    EC_ListAction.getHiddenElement('basket_info[]',aBasketInfo.join('|')).appendTo(frm);
                }

                if (iQuantity > 0) {
                    frm.append(getInputHidden('selected_item[]',iQuantity+'||'+sOptionId));
                }
            });
        }
        // 선택한상품만 주문하기
        if (sType == 1 || sType == 'naver_checkout') {
            // 이미 장바구니에 들어있는지 체크
            this.selectbuy_action(EC$.data(document,'iProductNo_class'));
            EC_ListAction.getHiddenElement('quantity_override_flag', sIsPrdOverride).appendTo(frm);
        }

        var sAction = '/exec/front/order/basket/';
        action_basket(sType,'category',sAction,frm.serialize(),EC$.data(document,'sBasketType_class'));
        // 장바구니옵션창 자동으로 닫기게 처리-요거 처리 안하믄 레이어장바구니쪽에서 오류남 ECHOSTING-68196
        EC$('.xans-product-basketoption').remove();
    },
    getHiddenElement: function(sName, sValue)
    {
        return EC$('<input />').attr({
            'type': 'hidden',
            'name': sName,
            'value': sValue
        });
    },
    getBasketForm: function()
    {
        return EC$('<form>').attr({
            'method': 'POST',
            'name': 'CategoryBasket'
        });
    },
    /**
     * 리스트에서 상품 비교로 값을 넘긴다.
     */
    setProductCompare: function()
    {
        if (EC$('.ProductCompareClass:checked').length < 1) {
            alert(__('비교할 상품을 선택해 주세요.'));
            return false;
        } else {
            var aProductNo = new Array();
            EC$('.ProductCompareClass:checked').each(function()
            {
                var aClass = EC$(this).attr('class').split(' ');

                var iSize = aClass.length;
                for (var x = 0; x < iSize; x++) {
                    var iProductNo = parseInt(aClass[x].split('_')[1],10);
                    if (aClass != '' && aClass[x].indexOf('ECPCNO_') == 1 && EC$.inArray(iProductNo,aProductNo) < 0) {
                        aProductNo.push(iProductNo);
                    }
                }
            });
            if (aProductNo.length > 1) {
                if (aProductNo.length > max_comp_number) {
                    alert(sprintf(__('%s개까지 비교 가능합니다.'), max_comp_number));
                } else {
                    var eForm = EC$('<form>').attr({
                        'method': 'get',
                        'action': sComparePageUrl
                    });
                    var iSize = aProductNo.length;
                    for (var x = 0; x < iSize; x++) {
                        EC$('<input />').attr({
                            'type': 'hidden',
                            'name': 'product_no[]'
                        }).val(aProductNo[x]).appendTo(eForm);
                    }
                    eForm.appendTo(EC$('body')).submit();
                }
            } else {
                alert(__('두개 이상의 상품을 선택하세요.'));
            }
        }
    },
    /**
     * 선택한상품만 주문하기
     *
     * @param string sOptionParam 옵션 파람값
     * @param int iProductNo 상품번호
     */
    selectbuy_action: function(iProductNo)
    {
        // ECHOSTING-95935 장바구니 상품 INSERT 실패 log방지
        if (typeof iProductNo === 'undefined') return;

        var aOptionId = new Array();
        var aTargetElement = EC$('.' + EC$.data(document,'Check_class')+':checked');
        for (var x = 0; x < aTargetElement.length; x++) {
            var sOptionId = EC$(aTargetElement[x]).val();
            aOptionId.push("item_code[]=" + sOptionId);
        }

        var sUrl = '/exec/front/order/basket/?command=select_prdcnt&product_no=' + iProductNo + '&option_type=T&' + aOptionId.join("&");
        EC$.ajax({
            url: sUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                if (data.result > 0 && !confirm(sprintf(__('동일상품이 장바구니에 %s개 있습니다.'), data.result) +'\n'+ __('함께 구매하시겠습니까?'))) {
                    sIsPrdOverride = 'T';
                }
            }
        });
    }
};

/**
 * 기존에 product_submit함수에 있던 내용들을 메소드 단위로 리펙토링한 객체
 */
var PRODUCTSUBMIT = {
    oConfig: {
        'sFormSelector': '#frm_image_zoom'
    },
    /**
     * 1 : 바로 구매, 2 : 장바구니 넣기
     */
    sType: null,
    sAction: null,
    oObject: null,
    oValidate: null,
    oForm: null,
    oDebug: null,
    bIsDebugConsoleOut: false,
    sPaymethod: null,
    aInfo: null,

    /**
     * 초기화
     */
    initialize: function(sType, sAction, oObject, aInfo)
    {
        this.oDebug = this.DEBUG.initialize(this);
        this.oDebug.setInfo('PRODUCTSUBMIT.initialize 시작');
        this.oDebug.setInfo('sType : ', sType);
        this.oDebug.setInfo('sAction : ', sAction);
        this.oDebug.setInfo('oObject : ', oObject);
        this.oDebug.setInfo('aInfo : ', aInfo);

        if (typeof(sType) === 'undefined' || ((sType !== 'sms_restock' && sType !== 'email_restock') && typeof(sAction) === 'undefined')) {
            this.oDebug.setMessage('PRODUCTSUBMIT.initialize fail');
            return false;
        }
        this.sType = sType;
        this.sAction = sAction;
        this.oObject = oObject;
        this.sPaymethod = $(oObject).data('paymethod');
        this.oValidate = this.VALIDATION.initialize(this);
        this.UTIL.initialize(this);
        this.oForm = EC$(this.oConfig.sFormSelector);
        this.oForm.find(':hidden').remove();
        this.aInfo = aInfo;
        NEWPRD_ADD_OPTION.initCustomData();
    },
    /**
     * 데이터 검증
     */
    isValidRequest: function()
    {
        try {
            this.oDebug.setInfo('PRODUCTSUBMIT.isValidRequest 시작');

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isValidFunding');
            if (this.oValidate.isValidFunding() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isValidFunding fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isRequireLogin');
            if (this.oValidate.isRequireLogin() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isRequireLogin fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isPriceContent');
            if (this.oValidate.isPriceContent() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isPriceContent fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isOptionDisplay');
            if (this.oValidate.isOptionDisplay() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isOptionDisplay fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isItemInStock');
            if (this.oValidate.isItemInStock() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isItemInStock fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isValidRegularDelivery');
            if (this.oValidate.isValidRegularDelivery() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isValidRegularDelivery fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isValidOption');
            if (this.oValidate.isValidOption() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isValidOption fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.oValidate.isValidAddproduct');
            if (this.oValidate.isValidAddproduct() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.oValidate.isValidAddproduct fail');
            }
            this.oDebug.setInfo('PRODUCTSUBMIT.setDynamicCheckoutAppData');
            if (this.setDynamicCheckoutAppData() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setDynamicCheckoutAppDatafail');
            }

        } catch (mError) {
            return this.DEBUG.messageOut(mError);
        }
        return true;
    },
    /**
     * 전송폼 생성
     */
    setBasketForm: function()
    {
        try {
            this.oDebug.setInfo('PRODUCTSUBMIT.setBasketForm 시작');
            // 예약 주문 체크
            STOCKTAKINGCHECKRESERVE.checkReserve();

            this.oForm.attr('method', 'POST');
            this.oForm.attr('action', '/' + this.sAction);

            this.oDebug.setInfo('PRODUCTSUBMIT.setCommonInput');
            if (this.setCommonInput() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setCommonInput fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.setOptionId');
            if (this.setOptionId() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setOptionId fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.setAddOption');
            if (this.setAddOption() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setAddOption fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.setQuantityOveride');
            if (this.setQuantityOveride() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setQuantityOveride fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.setSelectedItem');
            if (this.setSelectedItemHasOptionT() === false || this.setSelectedItemHasOptionF() === false) {
//                if (this.setSelectedItemHasOptionT() === false || this.setSelectedItemHasOptionF() === false || this.setSingleSelectedItem() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setSelectedItem fail');
            }

            this.oDebug.setInfo('PRODUCTSUBMIT.setFundingData');
            if (this.setFundingData() === false) {
                this.oDebug.setMessage('PRODUCTSUBMIT.setFundingData fail');
            }


        } catch (mError) {
            return this.DEBUG.messageOut(mError);
        }

        return true;
    },
    setBasketAjax : function(defer)
    {
        this.oDebug.setInfo('PRODUCTSUBMIT.setBasketAjax 시작');
        if (typeof(ACEWrap) !== 'undefined') {
            // 에이스카운터
            ACEWrap.addBasket();
        }

        if (typeof(PRODUCTSUBMIT.sPaymethod) !== 'undefined') {
            this.oForm.prepend(getInputHidden('paymethod', this.sPaymethod));
        }

        // 파일첨부 옵션의 파일업로드가 없을 경우 바로 장바구니에 넣기
        if (FileOptionManager.existsFileUpload() === false) {
            NEWPRD_ADD_OPTION.setItemPerAddOptionForm(this.oForm);
            action_basket(this.sType, 'detail', this.sAction, this.oForm.serialize(), this.UTIL.getData('sBasketType'), null, defer);
        } else {
            // 파일첨부 옵션의 파일업로드가 있으면
            FileOptionManager.upload(function(mResult) {
                // 파일업로드 실패
                if (mResult === false) {
                    PRODUCTSUBMIT.DEBUG.setMessage('PRODUCTSUBMIT.setBasketAjax fail - 파일업로드 실패');
                    return false;
                }

                // 파일업로드 성공
                for (var sId in mResult) {
                    // 해당 품목에 파일 첨부 옵션 항목 추가
                    NEWPRD_ADD_OPTION.pushFileList(sId, mResult);
                    PRODUCTSUBMIT.UTIL.appendHidden(sId, FileOptionManager.encode(mResult[sId]));
                }

                NEWPRD_ADD_OPTION.setItemPerAddOptionForm(PRODUCTSUBMIT.oForm);
                action_basket(PRODUCTSUBMIT.sType, 'detail', PRODUCTSUBMIT.sAction, PRODUCTSUBMIT.oForm.serialize(), PRODUCTSUBMIT.UTIL.getData('sBasketType'), null, defer);
            });
        }
    },
    setSelectedItem: function(sItemCode, iQuantity, sParameterName, sAdditionalData)
    {
        iQuantity = parseInt(iQuantity, 10);
        if (isNaN(iQuantity) === true || iQuantity < 1) {
            this.oDebug.setMessage('PRODUCTSUBMIT.setSelectedItem fail - iQuantity Fault');
            return false;
        }

        if (typeof(sItemCode) !== 'string') {
            this.oDebug.setMessage('PRODUCTSUBMIT.setSelectedItem fail - sItemCode Fault');
            return false;
        }

        if (typeof(sParameterName) === 'undefined') {
            sParameterName = 'selected_item[]';
        }

        if (typeof(sAdditionalData) === 'undefined') {
            sAdditionalData = '';
        } else {
            sAdditionalData = '||' + sAdditionalData;
        }

        this.UTIL.prependHidden(sParameterName, iQuantity+'||'+sItemCode+sAdditionalData);
        return true;
    },
    getQuantity: function(oQuantityElement)
    {
        if (typeof(quantity_id) === 'undefined') {
            var quantity_id = '#quantity';
        }
        var $oQuantityElement = EC$(quantity_id);
        if (typeof(oQuantityElement) === 'object') {
            $oQuantityElement = oQuantityElement;
        }
        return parseInt($oQuantityElement.val(),10);
    },
    setSelectedItemHasOptionF: function()
    {
        if (has_option !== 'F') {
            return true;
        }

        if (item_code === undefined) {
            var sItemCode = product_code+'000A';
        } else {
            var sItemCode = item_code;
        }
        if (this.sType === 'funding') {
            EC_SHOP_FRONT_PRODUCT_FUNDING.setStandaloneProductItem(sItemCode);
        } else {
            if (NEWPRD_ADD_OPTION.checkSoldOutProductValid(this.oObject) === false && EC_SHOP_FRONT_PRODUCT_RESTOCK.isRestock(this.sType) === false) {
                this.setSelectedItem(sItemCode, this.getQuantity());
            }
        }

        return true;
    },
    setEtypeSelectedItem: function(bFormAppend)
    {
        var _sItemCode = sProductCode + '000A';
        var iQuantity = 0;
        var sSelectedItemByEtype = '';
        var _aItemValueNo = '';
        if (isNewProductSkin() === false) {
            iQuantity = this.getQuantity();

            // 수량이 없는 경우에는 최소 구매 수량으로 던진다!!
            if (iQuantity === undefined) {
                iQuantity = product_min;
            }
            var _aItemValueNo = Olnk.getSelectedItemForBasketOldSkin(sProductCode, EC$('[id^="product_option_id"]'), iQuantity);

            if (_aItemValueNo.bCheckNum === false) {
                _aItemValueNo = Olnk.getProductAllSelected(sProductCode , EC$('[id^="product_option_id"]') , iQuantity);
                if (_aItemValueNo === false) {
                    this.oDebug.setMessage('etype error');
                }
            }
            sSelectedItemByEtype = 'selected_item_by_etype[]='+EC$.toJSON(_aItemValueNo) + '&';
            if (bFormAppend === true) {
                this.setSelectedItem(_sItemCode, iQuantity);
                this.UTIL.appendHidden('selected_item_by_etype[]', EC$.toJSON(_aItemValueNo));
            }
        } else {
            var bIsProductEmptyOption = this.UTIL.getData('bIsProductEmptyOption');
            // 메인상품 선택여부 확인 false : 선택함 || true : 선택안함
            if (bIsProductEmptyOption === false && NEWPRD_ADD_OPTION.checkSoldOutProductValid(this.oObject) === false) {
                var iOptionBoxLength = EC$('.option_box_id').length - 1;
                EC$('.option_box_id').each(function (i) {
                    var sQuantityElement = EC$('#' + EC$(this).attr('id').replace('id', 'quantity'));
                    if (typeof(EC_SHOP_FRONT_PRODUCT_FUNDING) === 'object' && EC_SHOP_FRONT_PRODUCT_FUNDING.isFundingProduct() === true) {
                        sQuantityElement = EC$('#quantity_'+EC$(this).attr('composition-code'));
                    }
                    iQuantity = PRODUCTSUBMIT.getQuantity(sQuantityElement);
                    _aItemValueNo = Olnk.getSelectedItemForBasket(sProductCode, EC$(this), iQuantity);

                    if (_aItemValueNo.bCheckNum === false) { // 옵션박스는 있지만 값이 선택이 안된경우
                        _aItemValueNo = Olnk.getProductAllSelected(sProductCode, EC$(this), iQuantity);
                    }
                    if (bFormAppend === true) {
                        PRODUCTSUBMIT.setSelectedItem(_sItemCode, iQuantity);
                        PRODUCTSUBMIT.UTIL.prependHidden('selected_item_by_etype[]', EC$.toJSON(_aItemValueNo));
                    }
                    sSelectedItemByEtype += 'selected_item_by_etype[]='+EC$.toJSON(_aItemValueNo) + '&';
                    var oItem = EC$('[name="item_code[]"]').eq(i);
                    var sItemCode = _sItemCode + '_' + i;

                    //품목별 추가옵션 셋팅
                    if (bFormAppend === true) {
                        var ePerAddOption = EC$('.option_products .option').eq(i).find(".input_addoption:visible");
                        if (ePerAddOption.length > 0) { // 옵션 박스안에서 개별 입력시
                            sItemCode = Olnk.getCustomOptionItemCode(sProductCode, iOptionBoxLength, i);
                            NEWPRD_ADD_OPTION.setItemPerAddOptionData(sItemCode, ePerAddOption, PRODUCTSUBMIT.oForm);
                        } else {
                            //품목별 추가옵션 셋팅
                            var sItemAddOption = NEWPRD_ADD_OPTION.getAddOptionValue(oItem.attr('data-item-add-option'));
                            NEWPRD_ADD_OPTION.setItemAddOption(sItemCode, sItemAddOption, PRODUCTSUBMIT.oForm);
                        }
                    }
                });

                // 전부 선택인 경우 필요값 생성한다.
                if (_aItemValueNo === '') {
                    iQuantity = this.getQuantity();
                    _aItemValueNo = Olnk.getProductAllSelected(sProductCode, EC$('[id^="product_option_id"]'), iQuantity);
                    if (_aItemValueNo !== false) {
                        if (bFormAppend === true) {
                            this.setSelectedItem(_sItemCode, iQuantity);
                            this.UTIL.prependHidden('selected_item_by_etype[]', EC$.toJSON(_aItemValueNo));
                        }
                        sSelectedItemByEtype += 'selected_item_by_etype[]='+EC$.toJSON(_aItemValueNo) + '&';
                    }
                }
            }
        }
        this.UTIL.setData('sSelectedItemByEtype', sSelectedItemByEtype);
    },
    setSelectedItemHasOptionT: function()
    {
        if (has_option !== 'T') {
            return true;
        }

        if (Olnk.isLinkageType(sOptionType) === true) {
            this.setEtypeSelectedItem(true);
        } else {
            if (isNewProductSkin() === true && NEWPRD_ADD_OPTION.checkSoldOutProductValid(this.oObject) === false) {
                if (this.sType === 'funding') {
                    EC$('.xans-product-funding').each(function(i) {
                        if (EC$(this).find('.EC-funding-checkbox:checked').length !== 1) {
                            return;
                        }
                        var iQuantity = EC$(this).find('input.quantity').val();
                        var sItemCode = EC$(this).find('input.selected-funding-item').val();
                        PRODUCTSUBMIT.setSelectedItem(sItemCode, iQuantity);
                    });

                } else {
                    if (EC$('[name="quantity_opt[]"][id^="option_box"]').length > 0 && EC$('[name="quantity_opt[]"][id^="option_box"]').length == EC$('[name="item_code[]"]').length) {

                        EC$('[name="quantity_opt[]"][id^="option_box"]').each(function(i) {

                            var oItem = EC$('[name="item_code[]"]').eq(i);
                            var sItemCode = oItem.val();
                            PRODUCTSUBMIT.setSelectedItem(sItemCode, PRODUCTSUBMIT.getQuantity(EC$(this)));

                            //품목별 추가옵션 셋팅
                            var ePerAddOption = EC$('.option_products .option').eq(i).find(".input_addoption:visible");
                            if (ePerAddOption.length > 0) { // 옵션 박스안에서 개별 입력시
                                NEWPRD_ADD_OPTION.setItemPerAddOptionData(sItemCode, ePerAddOption, PRODUCTSUBMIT.oForm);
                            } else {
                                var sItemAddOption = NEWPRD_ADD_OPTION.getAddOptionValue(oItem.attr('data-item-add-option'));
                                NEWPRD_ADD_OPTION.setItemAddOption(sItemCode, sItemAddOption, PRODUCTSUBMIT.oForm);
                            }
                        });
                    }
                }

            } else {
                // 뉴 상품 + 구스디 스킨
                var aItemCode = ITEM.getItemCode();
                for (var i = 0; i < aItemCode.length; i++) {
                    var sItemCode = aItemCode[i];
                    this.setSelectedItem(sItemCode, this.getQuantity(i));
                }
            }
        }
        return true;
    },
    setQuantityOveride: function()
    {
        if (this.sType !== 1 && this.sType !== 'naver_checkout' && this.sType !== 'direct_buy' && this.sType !== 'simple_pay' && this.sType !== 'app') {
            return true;
        }

        // 전역변수임
        sIsPrdOverride = 'F';
        if (this.sType === 1 || this.sType == 'simple_pay') {
            var aItemParams = [];
            var aItemCode = ITEM.getItemCode();
            for (var i = 0, length = aItemCode.length; i < length; i++) {
                aItemParams.push("item_code[]=" + aItemCode[i]);
            }
            var sOptionParam = this.UTIL.getData('sOptionParam');
            sOptionParam = sOptionParam + '&delvtype=' + delvtype + '&' + aItemParams.join("&");
            if (Olnk.isLinkageType(sOptionType) === true) {
                this.setEtypeSelectedItem();
                var sSelectedItemByEtype = this.UTIL.getData('sSelectedItemByEtype', sSelectedItemByEtype);
            }
            selectbuy_action(sOptionParam, iProductNo, sSelectedItemByEtype);
        }

        if (this.sType === 'naver_checkout' || this.sType === 'direct_buy' || this.sType === 'app') {
            sIsPrdOverride = 'T';
        }
        this.UTIL.appendHidden('quantity_override_flag', sIsPrdOverride);
    },
    /**
     * 실제 옵션에 대한 검증이 아니라 구상품과의 호환을 위해 존재하는 파라미터들을 세팅해주는 메소드
     */
    setOptionId: function()
    {
        var count = 1;
        var sOptionParam = '';
        EC$('select[id^="' + product_option_id + '"]').each(function()
        {
            PRODUCTSUBMIT.UTIL.appendHidden('optionids[]', EC$(this).attr('name'));
            if (EC$(this).prop('required') === true || EC$(this).attr('required') === 'required') {
                PRODUCTSUBMIT.UTIL.appendHidden('needed[]', EC$(this).attr('name'));
            }
            var iSelectedIndex = EC$(this).get(0).selectedIndex;
            if (EC$(this).prop('required') && iSelectedIndex > 0) iSelectedIndex -= 1;

            if (iSelectedIndex > 0) {
                sOptionParam += '&option' + count + '=' + iSelectedIndex;
                var sValue = EC$(this).val();
                var aValue = sValue.split("|");
                PRODUCTSUBMIT.UTIL.appendHidden(EC$(this).attr('name'), aValue[0]);
                ++count;
            }
        });
        this.UTIL.setData('sOptionParam', sOptionParam);
    },
    setAddOption: function()
    {
        if (add_option_name.length === 0) {
            return;
        }
        if (this.sType === 'funding') {
            // EC_SHOP_FRONT_PRODUCT_FUNDING.getFundingBasketData를 참조하세요.
            return;
        }

        var iAddOptionNo = 0;
        var aAddOptionName = [];
        if (has_option === 'F') {
            NEWPRD_ADD_OPTION.addItem(item_code);
            var iAddOptionIndex = NEWPRD_ADD_OPTION.getLastIndex();
        }
        for (var i = 0, iAddOptionNameLength = add_option_name.length; i < iAddOptionNameLength; i++) {
            var sValue = EC$('#' + add_option_id + i).val();
            if (sValue === '' || typeof sValue === 'undefined') {
                continue;
            }
            this.UTIL.appendHidden('option_add[]', sValue);
            aAddOptionName[iAddOptionNo++] = add_option_name[i];
            if (has_option === 'F') {
                NEWPRD_ADD_OPTION.addCustomOption(iAddOptionIndex, {
                    type: 'text',
                    value: sValue,
                    info: add_option_name[i]
                }, 'input');
            }
        }
        this.UTIL.appendHidden('add_option_name', aAddOptionName.join(';'));
        NEWPRD_ADD_OPTION.setItemAddOptionName(this.oForm); // 품목별 추가옵션명인데 왜 상품단위로 도는지 확인이 필요함
    },
    setFundingData: function()
    {
        if (this.sType !== 'funding') {
            return true;
        }
        if (typeof EC_SHOP_FRONT_PRODUCT_FUNDING.getFundingBasketData !== 'function') {
            this.oDebug.setMessage('EC_SHOP_FRONT_PRODUCT_FUNDING.getFundingBasketData error');
            return false;
        }

        var oFundingBasketData = EC_SHOP_FRONT_PRODUCT_FUNDING.getFundingBasketData();
        if (typeof(oFundingBasketData) !== 'object') {
            this.oDebug.setMessage(oFundingBasketData.sMessage);
            return false;
        }

        delete oFundingBasketData.sMessage;
        delete oFundingBasketData.bIsResult;
        this.UTIL.appendHidden(oFundingBasketData);


    },
    setDynamicCheckoutAppData : function()
    {
        if (this.sType !== 'app') {
            return true;
        }

        this.UTIL.appendHidden(this.aInfo);
    },

    setCommonInput : function()
    {
        var sBasketType = (typeof(basket_type) === 'undefined') ? 'A0000' : basket_type;
        this.UTIL.setData('sBasketType', sBasketType);

        var oCommon = {
            'product_no': iProductNo,
            'product_name': product_name,
            'main_cate_no': iCategoryNo,
            'display_group': iDisplayGroup,
            'option_type': option_type,
            'product_min': product_min,
            'command': 'add',
            'has_option': has_option,
            'product_price': product_price,
            'multi_option_schema': EC$('#multi_option').html(),
            'multi_option_data': '',
            'delvType': delvtype,
            'redirect': this.sType,
            'product_max_type': product_max_type,
            'product_max': product_max,
            'basket_type': sBasketType
        };
        this.UTIL.appendHidden(oCommon);

        if (typeof(CAPP_FRONT_OPTION_SELECT_BASKETACTION) !== 'undefined' && CAPP_FRONT_OPTION_SELECT_BASKETACTION === true) {
            this.UTIL.appendHidden('basket_page_flag', 'T');
        } else {
            this.UTIL.appendHidden('prd_detail_ship_type', EC$('#delivery_cost_prepaid').val());
        }
        if (this.sType !== 'funding') {
            // 수량 체크
            var iQuantity = 1;
            if (EC_SHOP_FRONT_PRODUCT_RESTOCK.isRestock(this.sType) === false) {
                iQuantity = checkQuantity();
                if (iQuantity == false) {
                    // 현재 관련상품 선택 했는지 여부 확인
                    // 관련 상품 자체가 없을때는 뒤에 저 로직을 탈 필요가 없음(basket_info 관련상품 체크박스)
                    if (EC$('input[name="basket_info[]"]').length <= 0 || NEWPRD_ADD_OPTION.checkRelationProduct(this.oObject, this.sType) === false) {
                        return false;
                    }
                }
            }

            // 폼 세팅
            if (iQuantity == undefined || isNaN(iQuantity) === true || iQuantity < 1) {
                iQuantity = 1;
            }
            this.UTIL.appendHidden('quantity', iQuantity);
        }

        // 바로구매 주문서 여부
        if (this.sType == 'direct_buy') {
            this.UTIL.appendHidden('is_direct_buy', 'T');
        } else {
            this.UTIL.appendHidden('is_direct_buy', 'F');
        }
    },
    VALIDATION: {
        initialize: function(oParent)
        {
            this.parent = oParent;
            return this;
        },
        isRequireLogin: function()
        {
            // ECHOSTING-58174
            if (sIsDisplayNonmemberPrice !== 'T') {
                return true;
            }
            switch (this.parent.sType) {
                case 1 :
                case 'simple_pay' : // 간편결제
                    alert(__('로그인후 상품을 구매해주세요.'));
                    break;
                case 2 :
                    alert(__('로그인후 장바구니 담기를 해주세요.'));
                     break;
                case 'direct_buy' :
                    alert(__('회원만 구매 가능합니다. 비회원인 경우 회원가입 후 이용하여 주세요.'));
                    break;
                default :
                    break;
            }
            btn_action_move_url('/member/login.html');
            return false;
        },
        isPriceContent: function()
        {
            if (typeof(product_price_content) === 'undefined') {
                return true;
            }

            var sProductcontent = product_price_content.replace(/\s/g, '').toString();
            if (sProductcontent === '1') {
                alert(sprintf(__('%s 상품은 구매할 수 있는 상품이 아닙니다.'), product_name));
                return false;
            }

            return true;
        },
        isOptionDisplay: function()
        {
            if (typeof(EC_SHOP_FRONT_NEW_OPTION_COMMON) !== 'undefined'
                && has_option === 'T'
                && Olnk.isLinkageType(sOptionType) === false
                && EC_SHOP_FRONT_NEW_OPTION_COMMON.isValidOptionDisplay(product_option_id) === false) {

                alert(sprintf(__('%s 상품은 구매할 수 있는 상품이 아닙니다.'), product_name));
                return false;
            }
            return true;
        },
        isItemInStock: function()
        {
            if (EC_SHOP_FRONT_PRODUCT_RESTOCK.isRestock(this.parent.sType) === false && (EC$('.option_box_id').length == 0 && EC$('.soldout_option_box_id').length > 0) === true) {
                alert(__('품절된 상품은 구매가 불가능합니다.'));
                return false;
            }

            return true;
        },
        isValidOption: function()
        {
            // 필수옵션 체크
            var bIsProductEmptyOption = EC_SHOP_FRONT_PRODUCT_RESTOCK.isRestock(this.parent.sType) === false && checkOptionRequired() == false;
            this.parent.UTIL.setData('bIsProductEmptyOption', bIsProductEmptyOption);

            //추가구성상품 옵션 체크
            var oValidAddProductCount = NEWPRD_ADD_OPTION.isValidAddOptionSelect(this.parent.oForm);

            //관련상품 옵션 체크
            var oValidRelationProductCount = NEWPRD_ADD_OPTION.isValidRelationProductSelect(this.parent.oForm, this.parent.oObject, bIsProductEmptyOption);

            // 개별 구매 관련 검증된 데이터
            var oIndividualValidData = NEWPRD_ADD_OPTION.getIndividualValidCheckData(oValidRelationProductCount, oValidAddProductCount, bIsProductEmptyOption, this.parent.oForm);

            // 옵션 체크
            if (bIsProductEmptyOption === true) {
                // 실패 타입 존재 할 경우
                if (oIndividualValidData.sFailType !== '') {
                    return false;
                }
                //관련상품 및 추가구성상품 단독구매시 유효성 메시지 노출여부 결정(순차 검증진행 추가 or 관련 + 본상품)
                if (NEWPRD_ADD_OPTION.checkIndividualValidAction(oValidRelationProductCount, oValidAddProductCount) === false) {
                    return false;
                }
                // 독립형 일때
                var oExistRequiredSelect = (option_type === 'F') ? EC$('select[id^="' + product_option_id + '"][required="true"]') : false;
                var sMsg = __('필수 옵션을 선택해주세요.');
                try {
                    // 관련상품 체크 확인 유무
                    if (NEWPRD_ADD_OPTION.checkRelationProduct(this.parent.oObject, this.parent.sType) === false) {
                        return false;
                    }

                    if (oIndividualValidData.isValidInidual === false && EC_SHOP_FRONT_PRODUCT_OPTIONLAYER.setLayer(iProductNo, iCategoryNo, 'normal') === true) {
                        return false;
                    }

                    if (Olnk.getOptionPushbutton(EC$('#option_push_button')) === true) {
                        var bCheckOption = false;
                        EC$('select[id^="' + product_option_id + '"]').each(function() {
                            if (EC$(this).prop('required') === true && Olnk.getCheckValue(EC$(this).val(),'') === false) {
                                bCheckOption = true;
                                return false;
                            }
                        });
                        if (bCheckOption === false) {
                            sMsg = __('품목을 선택해 주세요.');
                        }
                    }
                } catch (e) {
                }

                // 메인상품 품목데이터 확인
                var isEmptyItemData = ITEM.getItemCode().length == false || ITEM.getItemCode() === false;
                // 추가구성상품 및 관련상품의 개별적 구매
                if (isEmptyItemData === true && oIndividualValidData.isValidInidual === true) {
                    if (NEWPRD_ADD_OPTION.checkVaildIndividualMsg(oIndividualValidData, this.parent.sType, this.parent.oObject) === false) {
                        return false;
                    }

                } else {
                    // 기존 유효성 검증 메세지
                    var sOrginalValidMsg = NEWPRD_ADD_OPTION.checkExistingValidMessage(this.parent.oObject, oValidAddProductCount);
                    //추가구성상품의 선택되어있으면서 본상품의 옵션이 선택 안되었을때
                    sMsg = (sOrginalValidMsg === false) ? sMsg : sOrginalValidMsg;

                    alert(sMsg);
                    if (oExistRequiredSelect !== false) {
                        oExistRequiredSelect.focus();
                    }
                    return false;
                }
            } else {
                // 관련상품 체크 확인
                if (NEWPRD_ADD_OPTION.checkRelationProduct(this.parent.oObject, this.parent.sType) === false) {
                    return false;
                }

                // 단독구매시 메인상품 품절된 상품일때 메시지 처리
                if (NEWPRD_ADD_OPTION.checkSoldOutProductValid(this.parent.oObject) === true) {
                    this.parent.UTIL.appendHidden('is_product_sold_out', 'T');
                    if (NEWPRD_ADD_OPTION.checkVaildIndividualMsg(oIndividualValidData, this.parent.sType, this.parent.oObject) === false) {
                        return false;
                    }
                }
                if (FileOptionManager.checkValidation() === false) {
                    return false;
                }
            }
            if (oValidAddProductCount.result === false) {
                if (oValidAddProductCount.message !== '') {
                    alert(oValidAddProductCount.message);
                    oValidAddProductCount.object.focus();
                }
                return false;
            }
            if (oValidRelationProductCount.result === false) {
                if (oValidRelationProductCount.message !== '') {
                    alert(oValidRelationProductCount.message);
                    oValidRelationProductCount.object.focus();
                }
                return false;
            }
            if (oIndividualValidData.isValidInidual === false) {
                // 추가 옵션 체크 (품목기반 추가옵션일때는 폼제출때 검증 불필요)
                var oParent = (this.parent.sType === 'funding') ? EC$('.EC-funding-checkbox:checked').parents('.xans-product-funding') : null;
                if (NEWPRD_ADD_OPTION.isItemBasedAddOptionType() !== true && checkAddOption(null, oParent) === false) {
                    this.parent.oDebug.setMessage('checkAddOption Fail');
                    return false;
                }
            }

            if (NEWPRD_ADD_OPTION.checkPerAddInputOption() === false) {
                // 품목별 추가 옵션 입력시 체크
                return false;
            }
            return true;
        },
        isValidAddproduct: function()
        {
            if (EC$('.add-product-checked:checked').length === 0) {
                return true;
            }

            var aAddProduct = EC_UTIL.parseJSON(add_option_data);
            var aItemCode = new Array();
            var bCheckValidate = true;
            EC$('.add-product-checked:checked').each(function() {
                if (bCheckValidate === false) {
                    return false;
                }
                var iProductNum = EC$(this).attr('product-no');
                var iQuantity = EC$('#add-product-quantity-'+iProductNum).val();
                var aData = aAddProduct[iProductNum];
                if (aData.item_code === undefined) {
                    if (aData.option_type === 'T') {
                        if (aData.item_listing_type === 'S') {
                            var aOptionValue = new Array();
                            EC$('[id^="addproduct_option_id_'+iProductNum+'"]').each(function() {
                                aOptionValue.push(EC$(this).val());
                            });
                            if (ITEM.isOptionSelected(aOptionValue) === true) {
                                sOptionValue = aOptionValue.join('#$%');
                                aItemCode.push([EC_UTIL.parseJSON(aData.option_value_mapper)[sOptionValue],iQuantity]);
                            } else {
                                bCheckValidate = false;
                                alert(__('필수 옵션을 선택해주세요.'));
                                return false;
                            }
                        } else {
                            var $eItemSelectbox = EC$('[name="addproduct_option_name_'+iProductNum+'"]');

                            if (ITEM.isOptionSelected($eItemSelectbox.val()) === true) {
                                aItemCode.push([$eItemSelectbox.val(),iQuantity]);
                            } else {
                                bCheckValidate = false;
                                $eItemSelectbox.focus();
                                alert(__('필수 옵션을 선택해주세요.'));
                                return false;
                            }
                        }
                    } else if (Olnk.isLinkageType(sOptionType) === true) {
                        EC$('[id^="addproduct_option_id_'+iProductNum+'"]').each(function() {
                            alert(EC$(this).val());
                            if (EC$(this).prop('required') === true && ITEM.isOptionSelected(EC$(this).val()) === false) {
                                bCheckValidate = false;
                                EC$(this).focus();
                                alert(__('필수 옵션을 선택해주세요.'));
                                return false;
                            }

                            if (ITEM.isOptionSelected(EC$(this).val()) === true) {
                                aItemCode.push([EC$(this).val(),iQuantity]);
                            }
                        });
                    } else {
                        EC$('[id^="addproduct_option_id_'+iProductNum+'"]').each(function() {
                            if (EC$(this).prop('required') === true && ITEM.isOptionSelected(EC$(this).val()) === false) {
                                bCheckValidate = false;
                                EC$(this).focus();
                                alert(__('필수 옵션을 선택해주세요.'));
                                return false;
                            }
                            if (ITEM.isOptionSelected(EC$(this).val()) === true) {
                                aItemCode.push([EC$(this).val(),iQuantity]);
                            }
                        });
                    }
                } else {
                    aItemCode.push([aData.item_code,iQuantity]);
                }
            });
            if (bCheckValidate === false) {
                return false;
            }
            for (var x = 0; x < aItemCode.length; x++) {
                this.UTIL.appendHidden('relation_item[]', aItemCode[x][1]+'||'+aItemCode[x][0]);
            }
        },
        isValidRegularDelivery: function() // 정기 배송
        {
            if (EC_FRONT_JS_CONFIG_SHOP.bRegularConfig === false) {
                return true;
            }
            if (EC$('.EC_regular_delivery:checked').length === 0 || EC$('.EC_regular_cycle_count').length === 0) {
                return true;
            }

            if (EC$('.EC_regular_delivery:checked').val() === 'F') {
                return true;
            }


            if (EC_FRONT_JS_CONFIG_SHOP.bIsLogin === false) {
                alert(__('AVAILABLE.AFTER.LOGIN', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                return false;
            }

            var sSubscriptionCycleValue = EC$('.EC_regular_cycle_count').val();

            if (EC$('.EC_regular_cycle_count').prop('type') === 'select-one') {
                sSubscriptionCycleValue = EC$('.EC_regular_cycle_count > option:selected').val();
                if (sSubscriptionCycleValue === '') {
                    alert(__('REGULAR.SHIPPING.CYCLE', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                    return false;
                }
            } else if (EC$('.EC_regular_cycle_count').prop('type') === 'hidden') {
                if (sSubscriptionCycleValue === '') {
                    alert(__('REGULAR.SHIPPING.CYCLE', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                    return false;
                }
            } else {
                sSubscriptionCycleValue = EC$('.EC_regular_cycle_count:checked').val();
                if (EC$('.EC_regular_cycle_count:checked').length === 0) {
                    alert(__('REGULAR.SHIPPING.CYCLE', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                    return false;
                }
            }

            // 기존 하드코딩용
            var regex = /[W|M|Y]$/g;
            if (regex.test(sSubscriptionCycleValue) === false) {
                sSubscriptionCycleValue = sSubscriptionCycleValue + 'W';
            }

            var sSubscriptionCycleCount = sSubscriptionCycleValue.substring(sSubscriptionCycleValue.length-1, -1);
            var sSubscriptionCycle = sSubscriptionCycleValue.slice(-1);

            PRODUCTSUBMIT.UTIL.appendHidden('is_subscription', EC$('.EC_regular_delivery:checked').val());
            PRODUCTSUBMIT.UTIL.appendHidden('subscription_cycle', sSubscriptionCycle); // 주단위 현재는 고정
            PRODUCTSUBMIT.UTIL.appendHidden('subscription_cycle_count', sSubscriptionCycleCount);

            return true;
        },
        isValidFunding: function()
        {
            if (PRODUCTSUBMIT.sType !== 'funding') {
                return true;
            }

            if (EC_SHOP_FRONT_PRODUCT_FUNDING.isSelectComposition() === false) {
                alert(__('PRODUCT.CONFIGURATION', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                return false;
            }

            if (EC_SHOP_FRONT_PRODUCT_FUNDING.isItemSelected() === false) {
                alert(__('SELECT.REQUIRED.OPTION.001', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                return false;
            }

            // 최소 주문 수량
            if (EC_SHOP_FRONT_PRODUCT_FUNDING.isValidQuantity() === false) {
                alert(__('APPLY.RESERVATION', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
                return false;
            }

            return true;
        }
    },
    UTIL: {
        oData: {},
        initialize: function(oParent)
        {
            this.parent = oParent;
            return this;
        },
        appendHidden: function(mParam)
        {
            if (typeof(mParam) === 'string' && arguments.length === 2) {
                this.setHidden(arguments[0], arguments[1]);
            }
            if (typeof(mParam) === 'object') {
                for (var sName in mParam) {
                    if (Array.isArray(mParam[sName]) === true) {
                        EC$.each(mParam[sName], function(iIndex, mValue) {
                            PRODUCTSUBMIT.UTIL.setHidden(sName+'[]', mValue);
                        });
                        continue;
                    }
                    this.setHidden(sName, mParam[sName]);
                }
            }
        },
        prependHidden: function(mParam)
        {
            if (typeof(mParam) === 'string' && arguments.length === 2) {
                this.setHidden(arguments[0], arguments[1], 'prepend');
            }
            if (typeof(mParam) === 'object') {
                for (var sName in mParam) {
                    if (Array.isArray(mParam[sName]) === true) {
                        EC$.each(mParam[sName], function(iIndex, mValue) {
                            PRODUCTSUBMIT.UTIL.setHidden(sName+'[]', mValue, 'prepend');
                        });
                        continue;
                    }
                    this.setHidden(sName, mParam[sName], 'prepend');
                }
            }
        },
        setHidden: function(sName, sValue, sAppendType)
        {
            //ECHOSTING-9736
            if (typeof(sValue) === "string" && (sName == "option_add[]" || sName.indexOf("item_option_add") === 0)) {
                 sValue = sValue.replace(/'/g, '\\&#039;');
            }

            // 타입이 string 일때 연산시 단일 따움표 " ' " 문자를 " ` " 액센트 문자로 치환하여 깨짐을 방지
            var oAttribute = {
                'name': sName,
                'type': 'hidden',
                'class': 'basket-hidden'
            };
            if (sAppendType === 'prepend') {
                this.parent.oForm.prepend(EC$('<input>').attr(oAttribute).val(sValue));

            } else {
                this.parent.oForm.append(EC$('<input>').attr(oAttribute).val(sValue));

            }
        },
        setData: function(sKey, mValue)
        {
            this.oData[sKey] = mValue;
            return true;
        },
        getData: function(sKey)
        {
            return this.oData[sKey];
        }
    },
    DEBUG: {
        aMessage: [],
        initialize: function(oParent)
        {
            this.aMessage = [];
            this.parent = oParent;
            this.bIsDebugConsoleOut = this.parent.bIsDebugConsoleOut;
            return this;
        },
        setInfo: function()
        {
            if (this.bIsDebugConsoleOut === false) {
                return;
            }
            if (window.console) {
                var aMessage = [];
                for (var i = 0; i < arguments.length; i++) {
                    aMessage.push(arguments[i]);
                }
                console.info(aMessage.join(''));
            }
        },
        setMessage: function(sMessage)
        {
            this.aMessage.push(sMessage);
            this.setConsoleDebug();
            throw 'USER_DEFINED_ERROR';
        },
        setConsoleDebug: function()
        {
            if (this.bIsDebugConsoleOut === false) {
                return;
            }
            if (window.console) {
                console.warn(this.aMessage.join('\n'));
            }
        },
        messageOut: function(mError)
        {
            if (this.bIsDebugConsoleOut === true && mError !== 'USER_DEFINED_ERROR') {
                console.error(mError);
            }
            return false;
        }
    },
    setLoginMovePage: function(sUrl , sMessage)
    {
        if (sMessage !== '') {
            alert(sMessage);
        }
        if (typeof(sUrl) === 'undefined') {
            sUrl = '/member/login.html';
        }
        var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
        sUrl += '?returnUrl=' + encodeURIComponent(oTarget.location.pathname + oTarget.location.search);
        oTarget.location.href = sUrl;
    }
};


// 상품 옵션 id
var product_option_id = 'product_option_id';

// 추가옵션 id
var add_option_id = 'add_option_';

// 선택된 상품만 주문하기
var sIsPrdOverride = 'F';

//모바일로 접속했는지
var bIsMobile = false;

//분리형 세트상품의 구성상품(품절)에서 SMS 재입고 알림 팝업 호출
function set_sms_restock(iProductNo) {
    if (typeof(iProductNo) === 'undefined') {
        return;
    }

    // 모바일 접속 및 레이어 팝업 여부 확인
    if (typeof(EC_SHOP_FRONT_PRODUCT_SMS_RESTOCK_LAYER) !== 'undefined') {
        var sParam = 'product_no=' + iProductNo;
        if (EC_SHOP_FRONT_PRODUCT_SMS_RESTOCK_LAYER.createSmsRestockLayerDisplayResult(sParam) === true) {
            return;
        }
    }

    window.open('/product/sms_restock.html?product_no=' + iProductNo, 'sms_restock', 200, 100, 459, 490);
}

// 예약 주문 체크
var STOCKTAKINGCHECKRESERVE = {
    checkReserve: function()
    {
        var bIsReserveStatus = EC$('.option_box_id').filter('[data-item-reserved="R"]').length > 0;
        // 예약 주문이 있는경우
        if (bIsReserveStatus === true) {
            alert(__('ITEMS.MAY.SHIPPED', 'SHOP.JS.FRONT.NEW.PRODUCT.ACTION'));
        }
        return false;
    }
};


/**
 * sType - 1:바로구매, 2:장바구니,naver_checkout:네이버 페이 form.submit - 바로구매, 장바구니, 관심상품
 *         app: app 에서 필요한 장바구니데이터 "aAppBasketInsertItem" return
 * TODO 바로구매 - 장바구니에 넣으면서 주문한 상품 하나만 주문하기
 *
 * @param string sAction action url
 */
function product_submit(sType, sAction, oObj, aInfo, defer)
{
    PRODUCTSUBMIT.initialize(sType, sAction, oObj, aInfo);
    if (PRODUCTSUBMIT.isValidRequest() === true && PRODUCTSUBMIT.setBasketForm() === true) {
        PRODUCTSUBMIT.setBasketAjax(defer);
    }
    return;
}

/**
 * 선택한상품만 주문하기
 *
 * @param string sOptionParam 옵션 파람값
 * @param int iProductNo 상품번호
 * @param string sSelectedItemByEtype 상품연동형의 경우 입력되는 선택된옵션 json 데이터
 */
function selectbuy_action(sOptionParam, iProductNo, sSelectedItemByEtype)
{
    var sAddParam = '';
    if (typeof sSelectedItemByEtype !== 'undefined' && sSelectedItemByEtype != '') {
        sAddParam = '&' + sSelectedItemByEtype;
    }

    var sUrl = '/exec/front/order/basket/?command=select_prdcnt&product_no=' + iProductNo + '&option_type=' + (window['option_type'] || '') + sOptionParam + sAddParam;

    EC$.ajax(
    {
        url: sUrl,
        dataType: 'json',
        async: false,
        success: function(data)
        {
            if (data.result > 0) {
                //1+N상품이라면
                if (typeof(EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE) !== 'undefined' && EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.oBundleConfig.hasOwnProperty(iProductNo) === true) {
                    sIsPrdOverride = 'F';
                } else {
                    if (!confirm(sprintf(__('동일상품이 장바구니에 %s개 있습니다.'), data.result) +'\n'+ __('함께 구매하시겠습니까?'))) {
                        sIsPrdOverride = 'T';
                    }
                }
            }
        }
    });
}

/**
 * 장바구니 담기(카테고리)
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sBasketType 무이자 설정(A0000:일반, A0001:무이자)
 * @param string iQuantity 주문수량
 * @param string sItemCode 아이템코드
 * @param string sDelvType 배송타입
 */
function category_add_basket(iProductNo, iCategoryNo, iDisplayGroup, sBasketType, bList, iQuantity, sItemCode, sDelvType, sProductMaxType, sProductMax)
{
    if (iQuantity == undefined) {
        iQuantity = 1;
    }

    if (bList == true) {
        try {
            if (EC$.type(EC_ListAction) == 'object') {
                EC_ListAction.getOptionSelect(iProductNo, iCategoryNo, iDisplayGroup, sBasketType);
            }
        } catch (e) {
            alert(__('장바구니에 담을 수 없습니다.'));
            return false;
        }
    } else {
        var sAction = '/exec/front/order/basket/';
        var sData = 'command=add&quantity=' + iQuantity + '&product_no=' + iProductNo + '&main_cate_no=' + iCategoryNo + '&display_group='
                + iDisplayGroup + '&basket_type=' + sBasketType + '&delvtype=' + sDelvType + '&product_max_type=' + sProductMaxType + '&product_max=' + sProductMax;
        // 장바구니 위시리스트인지 여부
        if (typeof (basket_page_flag) !== 'undefined' && basket_page_flag == 'T') {
            sData = sData + '&basket_page_flag=' + basket_page_flag;
        }

        // 뉴상품 옵션 선택 구매
        sData = sData + '&selected_item[]='+iQuantity+'||' + sItemCode + '000A';

        action_basket(2, 'category', sAction, sData, sBasketType);
    }
}

/**
 * 구매하기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sBasketType 무이자 설정(A0000:일반, A0001:무이자)
 * @param string iQuantity 주문수량
 */
function add_order(iProductNo, iCategoryNo, iDisplayGroup, sBasketType, iQuantity)
{
    if (iQuantity == undefined) {
        iQuantity = 1;
    }

    var sAction = '/exec/front/order/basket/';
    var sData = 'command=add&quantity=' + iQuantity + '&product_no=' + iProductNo + '&main_cate_no=' + iCategoryNo + '&display_group='
            + iDisplayGroup + '&basket_type=' + sBasketType;

    action_basket(1, 'wishlist', sAction, sData, sBasketType);
}

/**
 * 레이어 생성
 *
 * @param layerId
 * @param sHtml
 */
function create_layer(layerId, sHtml, oTarget)
{
    //아이프레임일때만 상위객체에 레이어생성
    if (oTarget === parent) {
        oTarget.EC$('#' + layerId).remove();
        oTarget.EC$('body').append(EC$('<div id="' + layerId + '" style="position:absolute; z-index:10001;"></div>'));
        oTarget.EC$('#' + layerId).html(sHtml);
        oTarget.EC$('#' + layerId).show();

        //옵션선택 레이어 프레임일 경우 그대로 둘경우 영역에대해 클릭이 안되는부분때문에 삭제처리
        if (typeof(bIsOptionSelectFrame) !== 'undefined' && bIsOptionSelectFrame === true) {
            parent.CAPP_SHOP_NEW_PRODUCT_OPTIONSELECT.closeOptionCommon();
        }
    } else {
        EC$('#' + layerId).remove();
        EC$('<div id="' + layerId + '"></div>').appendTo('body');
        EC$('#' + layerId).html(sHtml);
        EC$('#' + layerId).show();
    }
    // set delvtype to basket
    try {
        EC$(".xans-product-basketadd").find("a[href='/order/basket.html']").attr("href", "/order/basket.html?delvtype=" + delvtype);
    } catch (e) {}
    try {
        EC$(".xans-order-layerbasket").find("a[href='/order/basket.html']").attr("href", "/order/basket.html?delvtype=" + delvtype);
    } catch (e) {}
}

/**
 * 레이어 위치 조정
 *
 * @param layerId
 */
function position_layer(layerId)
{
    var obj = EC$('#' + layerId);

    var x = 0;
    var y = 0;
    try {
        var hWd = parseInt(document.body.clientWidth / 2 + EC$(window).scrollLeft());
        var hHt = parseInt(document.body.clientHeight / 2 + EC$(window).scrollTop() / 2);
        var hBW = parseInt(obj.width()) / 2;
        var hBH = parseInt(hHt - EC$(window).scrollTop());

        x = hWd - hBW;
        if (x < 0) x = 0;
        y = hHt - hBH;
        if (y < 0) y = 0;

    } catch (e) {}

    obj.css(
    {
        position: 'absolute',
        display: 'block',
        top: y + "px",
        left: x + "px"
    });

}


// 장바구니 담기 처리중인지 체크 - (ECHOSTING-85853, 2013.05.21 by wcchoi)
var bIsRunningAddBasket = false;
var aAppBasketInsertItem = null; // 장바구니 insert 동작 후, 해당 장바구니 데이터

/**
 * 장바구니/구매 호출
 *
 * @param sType
 * @param sGroup
 * @param sAction
 * @param sParam
 * @param aBasketType
 * @param bNonDuplicateChk
 */
function action_basket(sType, sGroup, sAction, sParam, sBasketType, bNonDuplicateChk, defer)
{
    // 장바구니 담기에 대해서만 처리
    // 중복 체크 안함 이 true가 아닐경우(false나 null)에만 중복체크
    if (sType == 2 && bNonDuplicateChk != true) {
        if (bIsRunningAddBasket) {
            alert(__('처리중입니다. 잠시만 기다려주세요.'));
            return;
        } else {
            bIsRunningAddBasket = true;
        }
    }

    if (sType == 'sms_restock') {
        action_sms_restock(sParam);
        return;
    }

    if (sType == 'email_restock') {
        action_email_restock();
        return;
    }

    if (sType == 2 && EC_SHOP_FRONT_BASKET_VALIID.isBasketProductDuplicateValid(sParam) === false) {
        bIsRunningAddBasket = false;
        return false;
    }

    EC$.post(sAction, sParam, function(data)
    {
        Basket.isInProgressMigrationCartData(data);

        basket_result_action(sType, sGroup, data, sBasketType, sParam, defer);

        bIsRunningAddBasket = false; // 장바구니 담기 처리 완료

    }, 'json');

    // 관신상품 > 전체상품 주문 ==> 장바구니에 들어가기도 전에 /exec/front/order/order/ 호출하게 되어 오류남
    // async : false - by wcchoi
    // 다시 async모드로 원복하기로 함 - ECQAINT-7857
    /*
    EC$.ajax({
        type: "POST",
        url: sAction,
        data: sParam,
        async: false,
        success: function(data) {
            basket_result_action(sType, sGroup, data, sBasketType);
            bIsRunningAddBasket = false; // 장바구니 담기 처리 완료
        },
        dataType: 'json'
    });
    */
}

/**
 * 리스트나 상세에서 장바구니 이후의 액션을 처리하고 싶을 경우 이변수를 파라미터로 지정해줌
 */
var sProductLink = null;
/**
 * 장바구니 결과 처리
 *
 * @param sType
 * @param sGroup
 * @param aData
 * @param sBasketType
 * @param sParam
 */
function basket_result_action(sType, sGroup, aData, sBasketType, sParam, defer)
{
    if (aData == null) {
        return;
    }

    var sHtml = '';
    var bOpener = false;
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
    var bIsProgressLink = true;

    var oCheckZoomPopUp = {
        isPopUp: function()
        {
            var bIsPopup = false;
            if (bIsProgressLink === true || (typeof(sIsPopUpWindow) !== "undefined" && sIsPopUpWindow === "T")) {
                if (CAPP_SHOP_FRONT_COMMON_UTIL.isPopupFromThisShopFront() === true) {
                    bIsPopup = true;
                }
            }
            return bIsPopup;
        }
    };

    //var oOpener = findMainFrame();
    //var sLocation = location;
    var bBuyLayer = false;

    // 쿠폰적용 가능상품 팝업 -> 상품명 클릭하여 상품상세 진입 -> 바로 구매 시,
    // 쿠폰적용 가능상품 팝업이 열려있으면 주문서 페이지로 이동되지 않고, 창이 닫이는 이슈 처리(ECHOSTING-266906)
    if (sType == 1 && window.opener !== null && oTarget.couponPopupClose !== undefined) {
        bOpener = true;
    }

    if (aData.result >= 0) {
        try {
            bBuyLayer = ITEM.setBodyOverFlow(true);
        } catch (e) {}

        // - insert 된 장바구니 데이터 : aAppBasketInsertItem
        if (sType == 'app') {
            aAppBasketInsertItem = aData['aBasketProduct'];
            defer(aAppBasketInsertItem);
            return ;

        }

        // 네이버 페이
        if (sType == 'naver_checkout') {
            var sUrl = '/exec/front/order/navercheckout';

            // inflow param from naver common JS to Checkout Service
            try {
                if (typeof(wcs) === 'object') {
                    var inflowParam = wcs.getMileageInfo();
                    if (inflowParam != false) {
                        sUrl = sUrl + '?naver_inflow_param=' + inflowParam;
                    }
                }
            } catch (e) {}

            if (is_order_page == 'N' && bIsMobile == false) {
                window.open(sUrl);
                return false;
            } else {
                oTarget.location.href = sUrl;
                return false;
            }
        }

        // 배송유형
        var sDelvType = '';
        if (typeof(delvtype) !== 'undefined') {
            if (typeof(delvtype) === 'object') {
                sDelvType = EC$(delvtype).val();
            } else {
                sDelvType = delvtype;
            }
        } else if (aData.sDelvType != null) {
            sDelvType = aData.sDelvType;
        }

        if (sType == 1 || sType === 'funding' || sType === 'simple_pay') { // 바로구매하기
            var sSimplePayType = '';
            if (sType === 'simple_pay' && aData.sPaymethod.length > 0) {
                sSimplePayType = '&paymethod=' + aData.sPaymethod;
            }

            if (aData.isLogin == 'T') { // 회원
                if (bOpener === true) {
                    // 쿠폰적용 가능상품 팝업이 열려있을 때, 팝업이 아닌 현재 페이지(상품상세)가 주문서 페이지로 이동되도록 처리(ECHOSTING-266906)
                    self.location.href = "/order/orderform.html?basket_type=" + sBasketType + "&delvtype=" + sDelvType + sSimplePayType;
                } else {
                    oTarget.location.href = "/order/orderform.html?basket_type=" + sBasketType + "&delvtype=" + sDelvType + sSimplePayType;
                }
            } else { // 비회원
                sUrl = '/member/login.html?noMember=1&returnUrl=' + encodeURIComponent('/order/orderform.html?basket_type=' + sBasketType + "&delvtype=" + sDelvType + sSimplePayType);
                sUrl += '&delvtype=' + sDelvType;

                oTarget.location.href = sUrl;
            }
        } else if (sType === 'direct_buy') {
            EC_SHOP_FRONT_ORDERFORM_DIRECTBUY.proc.setOrderForm(TotalAddSale.getDirectBuyParam());
            return;
        } else { // 장바구니담기
            var oData = EC_PlusAppBridge.unserialize(sParam);
            EC_PlusAppBridge.addBasket(oData);

            if (sGroup == 'detail') {
                if (mobileWeb === true) {
                    if (typeof (basket_page_flag) !== 'undefined' && basket_page_flag == 'T') {
                        oTarget.reload();
                        return;
                    }
                }

                var oSearch = /basket.html/g;
                //레이어가 뜨는 설정이라면 페이지이동을 하지 않지만
                //레이어가 뜨어라고 확대보기팝업이라면 페이지 이동

                if (typeof(aData.isDisplayBasket) !== "undefined" && aData.isDisplayBasket == 'T' && oSearch.test(window.location.pathname) == false) {
                    if ((typeof(aData.isDisplayLayerBasket) !== "undefined" && aData.isDisplayLayerBasket == 'T') && (typeof(aData.isBasketPopup) !== "undefined" && aData.isBasketPopup == 'T')) {
                        layer_basket2(sDelvType, oTarget);
                    } else {
                        //ECQAINT-14010 Merge이슈 : oTarget이 정상
                        layer_basket(sDelvType, oTarget);
                    }

                    bIsProgressLink = false;
                }

                //확인 레이어설정이 아니거나 확대보기 팝업페이지라면 페이지이동
                if (oCheckZoomPopUp.isPopUp() === true || bIsProgressLink === true) {
                    oTarget.location.href = "/order/basket.html?" + "&delvtype=" + sDelvType;
                }
            } else {
                // from으로 위시리스트에서 요청한건지 판단.
                var bIsFromWishlist = false;
                if (typeof(aData.from) !== "undefined" && aData.from == "wishlist") {
                    bIsFromWishlist = true;
                }

                // 장바구니 위시리스트인지 여부
                if (typeof (basket_page_flag) !== 'undefined' && basket_page_flag == 'T' || bIsFromWishlist == true) {
                    oTarget.reload();
                    return;
                }
                if (typeof(aData.isDisplayBasket) !== "undefined" && aData.isDisplayBasket === 'T') {
                    if ((typeof(aData.isDisplayLayerBasket) !== "undefined" && aData.isDisplayLayerBasket == 'T') && (typeof(aData.isBasketPopup) !== "undefined" && aData.isBasketPopup == 'T')) {
                        layer_basket2(sDelvType, oTarget);
                    } else {
                        layer_basket(sDelvType, oTarget);
                    }
                } else {
                    location.href = "/order/basket.html?" + "&delvtype=" + sDelvType;
                }
            }
        }
    } else {
        var msg = aData.alertMSG.replace('\\n', '\n');

        // 디코딩 하기전에 이미 인코딩 된 '\n' 문자를 실제 개행문자로 변환
        // 목록에서 호출될 경우에는 인코딩 되지 않은 '\n' 문자 그대로 넘어오므로 추가 처리
        msg = msg.replace(/%5Cn|\\n/g, '%0A');

        try {
            msg = decodeURIComponent(msg);
        } catch (err) {
            msg = unescape(msg);
        }

        alert(msg);

        if (aData.result == -111 && sProductLink !== null) {
            oTarget.href = '/product/detail.html?' + sProductLink;
        }
        if (aData.result == -101 || aData.result == -103) {
            sUrl = '/member/login.html?noMember=1&returnUrl=' + encodeURIComponent(oTarget.location.href);
            oTarget.location.href = sUrl;
        }

        if (aData.result == -113) {
            if (typeof(delvtype) !== 'undefined') {
                if (typeof(delvtype) === 'object') {
                    sDelvTypeForMove = EC$(delvtype).val();
                } else {
                    sDelvTypeForMove = delvtype;
                }
                oTarget.location.href = "/order/basket.html?" + "&delvtype=" + sDelvTypeForMove;
            } else {
                oTarget.location.href = "/order/basket.html";
            }
        }
    }

    // ECHOSTING-130826 대응, 쿠폰적용상품 리스트에서 옵션상품(뉴옵션)담기 처리시, 화면이 자동으로 닫히지 않아 예외처리 추가
    if (oTarget.couponPopupClose !== undefined) {
        oTarget.couponPopupClose();
    }
    if (oCheckZoomPopUp.isPopUp() === true && bOpener === false) {
        self.close();
    } else {
        // ECHOSTING-130826 대응, 특정 화면에서 장바구니에 상품 담기 시 async 가 동작하지 않아,
        // 장바구니 담기처리 후처리 구간에 async 강제 실행추가
        // 쿠폰 적용 가능상품 리스트 에서 장바구니 담기시, 여기서 실행할 경우 js 오류가 발생하여, 함수 상단에 별도 처리 추가
        if (typeof(oTarget) !== 'undefined' && typeof(oTarget.CAPP_ASYNC_METHODS) !== 'undefined') {
            oTarget.CAPP_ASYNC_METHODS.init();
        } else {
            CAPP_ASYNC_METHODS.init();
        }
    }
}

function layer_basket(sDelvType, oTarget)
{
    var oProductName = null;
    if (typeof(product_name) !== 'undefined') {
        oProductName = {'product_name': product_name};
    }
    EC$('.xans-product-basketoption').remove();
    EC$.get('/product/add_basket.html?delvtype='+sDelvType, oProductName, function(sHtml)
        {
            sHtml = sHtml.replace(/<script.*?ind-script\/optimizer.php.*?<\/script>/g, '');
            // scirpt를 제거하면서 document.ready의 Async 모듈이 실행안되서 강제로 실행함
            CAPP_ASYNC_METHODS.init();
            create_layer('confirmLayer', sHtml, oTarget);
        });
}

function layer_basket2(sDelvType, oTarget)
{
    EC$('.xans-order-layerbasket').remove();
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
    EC$.get('/product/add_basket2.html?delvtype=' + sDelvType + '&layerbasket=T', '', function(sHtml)
    {
        sHtml = sHtml.replace(/<script.*?ind-script\/optimizer.php.*?<\/script>/g, '');

        //scirpt를 제거하면서 document.ready의 Async 모듈이 실행안되서 강제로 실행함
        CAPP_ASYNC_METHODS.init();
        create_layer('confirmLayer', sHtml, oTarget);
    });
}

function layer_wishlist(oTarget)
{
    EC$('.layerWish').remove();
    EC$.get('/product/layer_wish.html','' ,function(sHtml)
    {
        sHtml = sHtml.replace(/<script.*?ind-script\/optimizer.php.*?<\/script>/g, '');
        create_layer('confirmLayer', sHtml, oTarget);
    });
}

function go_basket()
{
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
    oTarget.location.href = '/order/basket.html';
    if (CAPP_SHOP_FRONT_COMMON_UTIL.isPopupFromThisShopFront() === true) {
        self.close();
    }
}

function move_basket_page()
{
    var sLocation = location;
    try {

        sLocation = ITEM.setBodyOverFlow(location);
    } catch (e) {}

    sLocation.href = '/order/basket.html';
}

/**
 * 이미지 확대보기 (상품상세 버튼)
 */
function go_detail()
{
    var sUrl = '/product/detail.html?product_no=' + iProductNo;
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();

    if (typeof(iCategoryNo) !== 'undefined') {
        sUrl += '&cate_no='+iCategoryNo;
    }

    if (typeof(iDisplayGroup) !== 'undefined') {
        sUrl += '&display_group='+iDisplayGroup;
    }

    oTarget.location.href = sUrl;
    if (CAPP_SHOP_FRONT_COMMON_UTIL.isPopupFromThisShopFront() === true) {
        self.close();
    }
}

/**
 * 바로구매하기/장바구니담기 Action  - 판매정보 > 구매제한
 */
function check_action_nologin()
{
    alert(__('CAN.PURCHASE.GROUP', 'GLOBAL.BUY.LIMIT'));
    return false;
}

/**
 * 바로구매하기 Action  - 불량회원 구매제한
 */
function check_action_block(sMsg)
{
    if (sMsg == '') {
        sMsg = __('쇼핑몰 관리자가 구매 제한을 설정하여 구매하실 수 없습니다.');
    }
    alert(sMsg);
}

/**
 * 관심상품 등록 - 로그인하지 않았을 경우
 */
function add_wishlist_nologin(sUrl)
{
    PRODUCTSUBMIT.setLoginMovePage(sUrl , __('로그인 후 관심상품 등록을 해주세요.'));

}

/**
 * 바로구매하기 / 장바구니 담기 / 관심상품 등록 시 url 이동에 사용하는 메소드
 * @param sUrl 이동할 주소
 */
function btn_action_move_url(sUrl)
{
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();

    sLocation = ITEM.setBodyOverFlow(location);

    sUrl += '?returnUrl=' + encodeURIComponent(oTarget.location.pathname + oTarget.location.search);
    oTarget.location.replace(sUrl);
}

/**
 * return_url 없이 url 이동에 사용하는 메소드
 * @param sUrl 이동할 주소
 */
function btn_action_move_no_return_url(sUrl)
{
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
    oTarget.location.replace(sUrl);
}

/**
 * 관심상품 등록 - 파라미터 생성
 * @param bIsUseOptionSelect 장바구니옵션선택 새모듈 사용여부(basket_option.html, Product_OptionSelectLayer)
 */
function add_wishlist(sMode, bIsUseOptionSelect)
{
    var sUrl = '//' + location.hostname;
    sUrl += '/exec/front/Product/Wishlist/';
    var param = location.search.substring(location.search.indexOf('?') + 1);
    sParam = param + '&command=add';
    sParam += '&referer=' + encodeURIComponent('//' + location.hostname + location.pathname + location.search);

    add_wishlist_action(sUrl, sParam, sMode, bIsUseOptionSelect);
}

var bWishlistSave = false;
/**
 * @param bIsUseOptionSelect 장바구니옵션선택 새모듈 사용여부(basket_option.html, Product_OptionSelectLayer)
 */
function add_wishlist_action(sAction, sParam, sMode, bIsUseOptionSelect)
{
    //연동형 옵션 여부
    var bIsOlinkOption = Olnk.isLinkageType(sOptionType);
    if (bWishlistSave === true) {
        return false;
    }
    var required_msg = __('품목을 선택해 주세요.');
    if (sOptionType !== 'F') {
        var aItemCode = ITEM.getWishItemCode();
    } else {
        var aItemCode = null;
    }
    var sSelectedItemByEtype = '';

    var frm = EC$('#frm_image_zoom');
    frm.find(":hidden").remove();
    frm.attr('method', 'POST');
    frm.attr('action', '/' + sAction);

    if (bIsOlinkOption === true) {
        if (isNewProductSkin() === false) {
            sItemCode = Olnk.getSelectedItemForWishOldSkin(sProductCode, EC$('[id^="product_option_id"]'));

            if (sItemCode !== false) {
                frm.append(getInputHidden('selected_item_by_etype[]', EC$.toJSON(sItemCode)));
                //sSelectedItemByEtype += 'selected_item_by_etype[]='+EC$.toJSON(sItemCode) + '&';
                aItemCode.push(sItemCode);
            }

        } else {
            EC$('.soldout_option_box_id,.option_box_id').each(function(i) {
                sItemCode = Olnk.getSelectedItemForWish(sProductCode, EC$(this));
                if (sItemCode.bCheckNum === false) {
                    sItemCode = Olnk.getProductAllSelected(sProductCode , EC$(this) , 1);
                }
                frm.append(getInputHidden('selected_item_by_etype[]', EC$.toJSON(sItemCode)));
                //sSelectedItemByEtype += 'selected_item_by_etype[]='+EC$.toJSON(sItemCode) + '&';
                aItemCode.push(sItemCode);
            });

            // 전부 선택인 경우 필요값 생성한다.
            if (sSelectedItemByEtype === '') {
                iQuantity = (buy_unit >= product_min ? buy_unit : product_min);
                aItemValueNo = Olnk.getProductAllSelected(sProductCode , EC$('[id^="product_option_id"]') , 1);
                if (aItemValueNo !== false) {
                    frm.append(getInputHidden('selected_item_by_etype[]', EC$.toJSON(aItemValueNo)));
                    //sSelectedItemByEtype += 'selected_item_by_etype[]='+EC$.toJSON(aItemValueNo) + '&';
                    aItemCode.push(aItemValueNo);
                }
            }

            NEWPRD_ADD_OPTION.setItemAddOptionName(frm);
            var iOptionBoxLength = EC$('.option_box_id').length - 1;
            EC$('.option_box_id').each(function(i) {

                iQuantity = EC$('#' + EC$(this).attr('id').replace('id','quantity')).val();
                _aItemValueNo = Olnk.getSelectedItemForBasket(sProductCode, EC$(this), iQuantity);

                if (_aItemValueNo.bCheckNum === false) { // 옵션박스는 있지만 값이 선택이 안된경우
                    _aItemValueNo = Olnk.getProductAllSelected(sProductCode , EC$(this) , iQuantity);
                }

                var oItem = EC$('[name="item_code[]"]').eq(i);
                var sItemCode = sProductCode + '000A_' + i;

                //품목별 추가옵션 셋팅
                var ePerAddOption = EC$('.option_products .option').eq(i).find(".input_addoption:visible");
                if (ePerAddOption.length > 0) { // 옵션 박스안에서 개별 입력시
                    sItemCode = Olnk.getCustomOptionItemCode(sProductCode, iOptionBoxLength, i);
                    NEWPRD_ADD_OPTION.setItemPerAddOptionData(sItemCode, ePerAddOption, frm);
                } else {
                    var sItemAddOption = NEWPRD_ADD_OPTION.getAddOptionValue(oItem.attr('data-item-add-option'));
                    NEWPRD_ADD_OPTION.setItemAddOption(sItemCode, sItemAddOption, frm);
                }
            });


        }

        if (bIsUseOptionSelect !== true && (/^\*+$/.test(aItemCode) === true || aItemCode == '')) {
            alert(required_msg);
            return false;
        }
    } else {
        if (isNewProductSkin() === true) {
            //품목별 추가옵션 이름 셋팅
            NEWPRD_ADD_OPTION.setItemAddOptionName(frm);

            EC$('[name="quantity_opt[]"][id^="option_box"]').each(function(i) {

                var oItem = EC$('[name="item_code[]"]').eq(i);
                var sItemCode = oItem.val();

                //품목별 추가옵션 셋팅
                var ePerAddOption = EC$('.option_product').eq(i).find(".input_addoption:visible");
                if (ePerAddOption.length > 0) { // 옵션 박스안에서 개별 입력시
                    NEWPRD_ADD_OPTION.setItemPerAddOptionData(sItemCode, ePerAddOption, frm);
                } else {
                    var sItemAddOption = NEWPRD_ADD_OPTION.getAddOptionValue(oItem.attr('data-item-add-option'));
                    NEWPRD_ADD_OPTION.setItemAddOption(sItemCode, sItemAddOption, frm);
                }

            });

        }
    }

    if (aItemCode === false && bIsUseOptionSelect !== true) {
        if (EC_SHOP_FRONT_PRODUCT_OPTIONLAYER.setLayer(iProductNo, iCategoryNo, 'normal') === true) {
            return;
        }
        alert(required_msg);
        return false;
    }


    if (aItemCode !== null) {
        var sItemCode = '';
        var aTemp = [];

        if (Olnk.isLinkageType(sOptionType) === true) {
            frm.append(getInputHidden('selected_item[]', '000A'));
            //sParam = sParam + '&' + 'selected_item[]=000A&' + sSelectedItemByEtype;
        } else {
            for (var x in aItemCode) {
                try {
                    var opt_id = aItemCode[x].substr(aItemCode[x].length-4, aItemCode[x].length);
                    frm.append(getInputHidden('selected_item[]', opt_id));
                    //aTemp.push('selected_item[]='+opt_id);
                } catch (e) {}
            }
        }
    }

    if (typeof(iProductNo) !== undefined && iProductNo !== '' && iProductNo !== null) {
        frm.append(getInputHidden('product_no', iProductNo));
    }
    frm.append(getInputHidden('option_type', sOptionType));
    //sParam = sParam + '&product_no='+iProductNo;


    // 추가 옵션 체크 (품목기반 추가옵션일때는 폼제출때 검증 불필요)
    //뉴모듈사용시에는 체크안함
    if (bIsUseOptionSelect !== true && (NEWPRD_ADD_OPTION.isItemBasedAddOptionType() !== true && checkAddOption() === false)) {
        return false;
    }

    // 추가옵션
    var aAddOptionStr = new Array();
    var aAddOptionRow = new Array();
    if (add_option_name) {
        for (var i=0; i<add_option_name.length; i++) {
            if (add_option_name[i] !== '' && EC$('#' + add_option_id + i).length > 0) {
                aAddOptionRow.push(add_option_name[i] + '*' + EC$('#' + add_option_id + i).val());
            }
        }
    }
    aAddOptionStr.push(aAddOptionRow);

    // 단일 상품의 개별 추가 입력 옵션 처리
    if (has_option === 'F' && typeof add_option_input !== 'undefined') {
        NEWPRD_ADD_OPTION.addItem(ITEM.getItemCode()[0]);
        var iAddOptionIndex = NEWPRD_ADD_OPTION.getLastIndex();
        for (var x in add_option_input) {
            if (add_option_input.hasOwnProperty(x) === true) {
                NEWPRD_ADD_OPTION.addCustomOption(iAddOptionIndex, {
                    type: 'text',
                    value: EC$('#' + add_option_input[x].id).val(),
                    info: add_option_input[x].info
                }, 'input');
            }
        }
    }

    frm.append(getInputHidden('add_option', aAddOptionStr.join('|')));
    //sParam += '&add_option=' + encodeURIComponent(aAddOptionStr.join('|'));

    // 파일첨부 옵션 유효성 체크
    if (bIsUseOptionSelect !== true && FileOptionManager.checkValidation() === false) return;

    bWishlistSave = true;

    // 파일첨부 옵션의 파일업로드가 없을 경우 바로 관심상품 넣기
    if (FileOptionManager.existsFileUpload() === false) {
        NEWPRD_ADD_OPTION.setItemPerAddOptionForm(frm);
        sParam = sParam + '&' + frm.serialize();
        add_wishlist_request(sParam, sMode);
    // 파일첨부 옵션의 파일업로드가 있으면
    } else {
        FileOptionManager.upload(function(mResult) {
            // 파일업로드 실패
            if (mResult===false) {
                bWishlistSave = false;
                return false;
            }

            // 파일업로드 성공
            for (var sId in mResult) {
                // 해당 품목에 파일 첨부 옵션 항목 추가
                NEWPRD_ADD_OPTION.pushFileList(sId, mResult);
                frm.append(getInputHidden(sId, FileOptionManager.encode(mResult[sId])));
                //sParam += '&'+sId+'='+FileOptionManager.encode(mResult[sId]);
            }


            NEWPRD_ADD_OPTION.setItemPerAddOptionForm(frm);

            sParam = sParam + '&' + frm.serialize();
            add_wishlist_request(sParam, sMode);
        });
    }
}

function add_wishlist_request(sParam, sMode)
{
    var sUrl = '/exec/front/Product/Wishlist/';

    EC$.post(
        sUrl,
        sParam,
        function(data) {
            if (sMode != 'back') {
                add_wishlist_result(data);
            }
            bWishlistSave = false;
        },
        'json');
}

function add_wishlist_result(aData, aPrdData)
{
    var oTarget = CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame();
    var agent = navigator.userAgent.toLowerCase();

    if (aData == null) return;
    //새로운 모듈 사용시에는 중복되어있어도 처리된것으로 간주함.. 왜 그렇게하는지는 이해불가
    if (aData.result == 'SUCCESS' || (aData.bIsUseOptionSelect === true && aData.result === 'NO_TARGET')) {

        bBuyLayer = ITEM.setBodyOverFlow(true);

        if (typeof iProductNo !== 'undefined') {
            var iSendProductNo = iProductNo;
        } else if (typeof aPrdData !== 'undefined') {
            var iSendProductNo = aPrdData.product_no;
        }

        if (iSendProductNo) {
            EC_PlusAppBridge.addWishList(iSendProductNo);
        }

        if (CAPP_ASYNC_METHODS.hasOwnProperty('WishList') === true && typeof iProductNo !== 'undefined') {
            // 관심상품 추가시 sessionStorage 추가
            CAPP_ASYNC_METHODS.WishList.setSessionStorageItem(iProductNo, aData.command);
        }

        if (CAPP_ASYNC_METHODS.hasOwnProperty('Wishcount') === true) {
            CAPP_ASYNC_METHODS.Wishcount.restoreCache();
            CAPP_ASYNC_METHODS.Wishcount.execute();
        }

        if (aData.confirm == 'T') {
            layer_wishlist(CAPP_SHOP_FRONT_COMMON_UTIL.findTargetFrame());
            return;
        }

        alert(__('관심상품으로 등록되었습니다.'));
    } else if (aData.result == 'ERROR') {
        alert(__('실패하였습니다.'));
    } else if (aData.result == 'NOT_LOGIN') {
        alert(__('회원 로그인 후 이용하실 수 있습니다.'));
    } else if (aData.result == 'INVALID_REQUEST') {
        alert(__('파라미터가 잘못되었습니다.'));
    } else if (aData.result == 'NO_TARGET') {
        alert(__('이미 등록되어 있습니다.'));
    } else if (aData.result == 'INVALID_PRODUCT') {
        alert(__('파라미터가 잘못되었습니다.'));
    }
}

/**
* 추가된 함수
* 해당 value값을 받아 replace 처리
* @param string sValue value
* @return string replace된 sValue
*/
function replaceCheck(sName,sValue)
{
   //ECHOSTING-9736
   if (typeof(sValue) === "string" && (sName == "option_add[]" || sName.indexOf("item_option_add") === 0)) {
        sValue = sValue.replace(/'/g, '\\&#039;');
   }
   // 타입이 string 일때 연산시 단일 따움표 " ' " 문자를 " ` " 액센트 문자로 치환하여 깨짐을 방지
   return sValue;
}


/**
 * name, value값을 받아 input hidden 태그 반환
 *
 * @param string sName name
 * @param string sValue value
 * @return string input hidden 태그
 */
function getInputHidden(sName, sValue)
{
    sValue = replaceCheck(sName,sValue); // 추가된 부분 (replaceCheck 함수 호출)
    return EC$('<input>').attr({'type': 'hidden', 'name': sName}).val(sValue);
}


/**
 * 필수옵션이 선택되었는지 체크
 *
 * @return bool 필수옵션이 선택되었다면 true, 아니면 false 반환
 */
function checkOptionRequired(sReq)
{
    var bResult = true;
    // 옵션이 없다면 필수값 체크는 필요없음.
    if (has_option === 'F') {
        return bResult;
    }
    var sTargetOptionId = product_option_id;
    if (sReq != null) {
        sTargetOptionId = sReq;
    }

    if (option_type === 'F') {
        // 단독구성
        var iOptionCount = EC$('select[id^="' + sTargetOptionId + '"][required="true"]').length;
        if (iOptionCount > 0) {
            if (ITEM.getItemCode() === false) {
                bResult = false;
                return false;
            }

            var aRequiredOption = new Object();
            var aItemCodeList = ITEM.getItemCode();
            // 필수 옵션정보와 선택한 옵션 정보 비교
            for (var i=0; i<aItemCodeList.length; i++) {
                var sTargetItemCode = aItemCodeList[i];
                EC$('select[id^="' + sTargetOptionId + '"][required="true"] option').each(function() {
                    if (EC$(this).val() == sTargetItemCode) {
                        var sProductOptionId = EC$(this).parent().attr('id');
                        aRequiredOption[sProductOptionId] = true;
                    }
                });

            }
            // 필수옵션별 개수보다 선택한 옵션개수가 적을경우 리턴
            if (iOptionCount > Object.size(aRequiredOption)) {
                bResult = false;
                return bResult;
            }
        }
    } else {
        if (Olnk.isLinkageType(sOptionType) === true) {
            if (isNewProductSkin() === false) {
                EC$('select[id^="' + product_option_id + '"][required="true"]').each(function() {
                    var sel = parseInt(EC$(this).val());

                    if (isNaN(sel) === true) {
                        EC$(this).focus();
                        bResult = false;
                        return false;
                    }
                });
                // 추가 구매 check
                EC$('.' + EC$.data(document, 'multiple_option_select_class')).each(function(i)
                {
                    if (EC$(this).prop('required') === true) {
                        var sel = parseInt(EC$(this).val());

                        if (isNaN(sel) === true) {
                            EC$(this).focus();
                            bResult = false;
                            return false;
                        }
                    }
                });
            } else { // 연동형 사용중이면서 뉴스킨
                var aItemCodeList = ITEM.getItemCode();
                if (aItemCodeList === false) {
                    bResult = false;
                    return false;
                }
                // 연동형 옵션의 버튼 사용중이지만 선택된 품목이 없는 경우 , 뉴스킨에서만 동작해야 함.
                if (Olnk.getOptionPushbutton(EC$('#option_push_button')) === true && EC$('.option_box_id').length === 0) {
                    bResult = false;
                    return false;
                }
            }
            return bResult;
        }
        if (ITEM.getItemCode() === false) {
            bResult = false;
            return false;
        }
        // 조합구성
        if (item_listing_type == 'S') {
            // 분리선택형
            var eTarget = EC_UTIL.parseJSON(option_value_mapper);
            for (var x in eTarget) {
                if (ITEM.getItemCode().indexOf(eTarget[x]) > -1) {
                    bResult = true;
                    break;
                } else {
                    bResult = false;
                }
            }
            if (bResult === false) {
                bResult = false;
                return false;
            }
        } else {
            EC$('select[id^="' + product_option_id + '"][required="true"]').each(function() {
                var eTarget = EC$(this).find('option[value!="*"][value!="**"]');
                bResult = false;
                eTarget.each(function() {
                    if (ITEM.getItemCode().indexOf(EC$(this).val()) > -1) {
                        bResult = true;
                        return false;
                    }
                });
                if (bResult === false) {
                    return false;
                }
            });
        }
    }

    return bResult;
}

/**
 * 추가 옵션 입력값 체크
 *
 * @return bool 모든 추가옵션에 값이 입력되었다면 true, 아니면 false
 *
 */
/**
 * 추가 입력 옵션의 값 체크
 * @param string sReq 셀렉터를 기본값 이외로 사용할 경우
 * @param object oParent 전체 인풋이 아닌 특정 객체 하위의 엘리먼트만 검사할경우
 * @returns {boolean}
 */
function checkAddOption(sReq, oParent)
{
    var sAddOptionField = add_option_id;

    var sAddOptionSelector = '[id^="' + sAddOptionField + '"]:not(.input_peraddoption)';
    if (sReq != null) {
        sAddOptionField = sReq;
        sAddOptionSelector = '[id="' + sAddOptionField + '"]:not(.input_peraddoption)';
    }
    var oTargetElement = EC$(sAddOptionSelector);
    if (oParent !== null && typeof(oParent) !== 'undefined') {
        oTargetElement = oParent.find(sAddOptionSelector);
    }

    return NEWPRD_ADD_OPTION.validateAddOptionForm(oTargetElement);
}

/**
 * 수량 가져오기
 *
 * @return mixed 정상적인 수량이면 수량(integer) 반환, 아니면 false 반환
 */
function getQuantity()
{
    // 뉴상품인데 디자인이 수정안됐을 수 있다.
    if (isNewProductSkin() === false) {
        iQuantity = parseInt(EC$(quantity_id).val(),10);
    } else {
        if (has_option == 'T') {
            var iQuantity = 0;

            if (Olnk.isLinkageType(sOptionType) === true) {
                iQuantity = parseInt(EC$(quantity_id).val(),10);
                return iQuantity;
            }

            EC$('[name="quantity_opt[]"]').each(function() {
                iQuantity = iQuantity + parseInt(EC$(this).val(),10);
            });
        } else {
            var iQuantity = parseInt(EC$(quantity_id).val().replace(/^[\s]+|[\s]+$/g,'').match(/[\d\-]+/),10);
            if (isNaN(iQuantity) === true || EC$(quantity_id).val() == '' || EC$(quantity_id).val().indexOf('.') > 0) {
                return false;
            }
        }

    }

    return iQuantity;
}

/**
 * 수량 체크
 *
 * @return mixed 올바른 수량이면 수량을, 아니면 false
 */
function checkQuantity()
{
    // 수량 가져오기
    var iQuantity = getQuantity();

    if (isNewProductSkin() === false) {
        if (iQuantity === false) return false;

        // 구스킨의 옵션 추가인 경우 수량을 모두 합쳐야 함..하는수 없이 each추가
        // 재고 관련도 여기서 하나?
        if (Olnk.isLinkageType(option_type) === true) {
            var sOptionIdTmp = '';
            EC$('select[id^="' + product_option_id + '"]').each(function() {
                if (/^\*+$/.test(EC$(this).val()) === false) {
                    sOptionIdTmp = EC$(this).val();
                    return false;
                }
            });

            EC$('.EC_MultipleOption').each(function(i) {
                iQuantity += parseInt(EC$(this).find('.' + EC$.data(document,'multiple_option_quantity_class')).val(),10);
            });

            if (Olnk.getStockValidate(sOptionIdTmp , iQuantity) === true) {
                alert(__('상품의 수량이 재고수량 보다 많습니다.'));
                EC$(quantity_id).focus();
                return false;
            }
        }

        if (iQuantity < product_min) {
            alert(sprintf(__('최소 주문수량은 %s개 입니다.'), product_min));
            EC$(quantity_id).focus();
            return false;
        }
        if (iQuantity > product_max && product_max > 0) {
            alert(sprintf(__('최대 주문수량은 %s개 입니다.'), product_max));
            EC$(quantity_id).focus();
            return false;
        }

    } else {
        var bResult = true;
        var bSaleMainProduct = false;
        var aQuantity = new Array();
        var iTotalOuantity = 0;
        var iProductMin = product_min;
        var iProductMax = product_max;
        EC$('#totalProducts > table > tbody').not('.add_products').find('[name="quantity_opt[]"]').each(function() {
            // 본상품 구매여부
            bSaleMainProduct = true;
            iQuantity = parseInt(EC$(this).val());

            var iProductNum = iProductNo;
            // 추가 구성상품인 경우 product_min ,  product_max 값은 다른값을 비교해야 함..
            if (EC$(this).attr('id').indexOf('add_') > -1) {
                iProductMin = EC$('#'+EC$(this).attr('id').replace('quantity','productmin')).val();
                iProductMax = EC$('#'+EC$(this).attr('id').replace('quantity','productmax')).val();
                var iProductNum = EC$('#'+EC$(this).attr('id').replace('quantity','id')).attr('class').replace('option_add_box_','');
            }
            if (typeof(aQuantity[iProductNum]) === 'undefined') {
                aQuantity[iProductNum] = new Array();
            }
            aQuantity[iProductNum].push(iQuantity);

            // 상품기준의 경우 품목 총합으로 판단
            if (order_limit_type !== 'P') {
                if (iQuantity < iProductMin) {
                    alert(sprintf(__('상품별 최소 주문수량은 %s 입니다.'), iProductMin));
                    EC$(quantity_id).focus();
                    bResult = false;
                    return false;
                }
                if (iQuantity > iProductMax && iProductMax > 0) {
                    alert(sprintf(__('상품별 최대 주문수량은 %s 입니다.'), iProductMax));
                    EC$(quantity_id).focus();
                    bResult = false;
                    return false;
                }
            }
            iTotalOuantity = iTotalOuantity + iQuantity;
        });

        if (bResult == false) {
            return bResult;
        }
        if (typeof(EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE) === 'object') {
            for (var iProductNum in aQuantity) {
                if (aQuantity.hasOwnProperty(iProductNum) === false) {
                    continue;
                }
                if (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.oBundleConfig.hasOwnProperty(iProductNum) === false) {
                    continue;
                }

                if (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.isValidQuantity(aQuantity[iProductNum], iProductNum) === false) {
                    return false;
                }
            }
        }
        // 본상품 없이 구매가능하기때문에 본상품있을떄만 체크
        if (bSaleMainProduct === true) {
            if (order_limit_type === 'P') {
                if (iTotalOuantity < iProductMin) {
                    alert(sprintf(__('최소 주문수량은 %s개 입니다.'), iProductMin));
                    bResult = false;
                    return false;
                }
                if (iTotalOuantity > iProductMax && iProductMax > 0) {
                    alert(sprintf(__('최대 주문수량은 %s개 입니다.'), iProductMax));
                    bResult = false;
                    return false;
                }
            }
            if (buy_unit_type === 'P') {
                if (iTotalOuantity % parseInt(buy_unit, 10) !== 0) {
                    alert(sprintf(__('구매 주문단위는 %s개 입니다.'), parseInt(buy_unit, 10)));
                    bResult = false;
                    return false;
                }
            }
        }
        if (EC$('.add_products').find('[name="quantity_opt[]"]').length > 0) {
            var aTotalQuantity = {};
            EC$('.add_products').find('[name="quantity_opt[]"]').each(function () {
                    iQuantity = parseInt(EC$(this).val());
                    if (typeof(aTotalQuantity[EC$(this).attr('product-no')]) === 'undefined' || aTotalQuantity[EC$(this).attr('product-no')] < 1) {
                        aTotalQuantity[EC$(this).attr('product-no')] = 0;
                    }
                    aTotalQuantity[EC$(this).attr('product-no')] += parseInt(EC$(this).val(), 10);

                }
            );

            for (var iProductNo in aTotalQuantity) {
                var aProductQuantityInfo = ProductAdd.getProductQuantityInfo(iProductNo);

                if (aProductQuantityInfo.order_limit_type === 'P') {
                    if (aTotalQuantity[iProductNo] < aProductQuantityInfo.product_min) {
                        alert(sprintf(__('최소 주문수량은 %s개 입니다.'), aProductQuantityInfo.product_min));
                        bResult = false;
                        return false;
                    }
                    if (aTotalQuantity[iProductNo] > aProductQuantityInfo.product_max && aProductQuantityInfo.product_max > 0) {
                        alert(sprintf(__('최대 주문수량은 %s개 입니다.'), aProductQuantityInfo.product_max));
                        bResult = false;
                        return false;
                    }
                }
                if (aProductQuantityInfo.buy_unit_type === 'P') {
                    if (aTotalQuantity[iProductNo] % parseInt(aProductQuantityInfo.buy_unit, 10) !== 0) {
                        alert(sprintf(__('구매주문단위는 %s개 입니다.'), parseInt(aProductQuantityInfo.buy_unit, 10)));
                        bResult = false;
                        return false;
                    }
                }
            }
        }
        if (bResult == false) {
            return bResult;
        }
    }

    return iQuantity;
}

function commify(n)
{
    var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
    n += ''; // 숫자를 문자열로 변환
    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }
    return n;
}

var isClose = 'T';
function optionPreview(obj, sAction, sProductNo, closeType)
{
    var sPreviewId = 'btn_preview_';
    var sUrl = '/product/option_preview.html';
    var layerId = EC$('#opt_preview_' + sAction + '_' + sProductNo);

    // layerId = action명 + product_no 로 이루어짐 (한 페이지에 다른 종류의 상품리스트가 노출될때 구분 필요)
    if (EC$(layerId).length > 0) {
        EC$(layerId).show();
    } else if (sProductNo != '') {
        EC$.post(sUrl, 'product_no=' + sProductNo + '&action=' + sAction, function(result)
        {
            EC$(obj).after(result.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g,""));
        });
    }
}

function closeOptionPreview(sAction, sProductNo)
{
    isClose = 'T';
    setTimeout("checkOptionPreview('" + sAction + "','" + sProductNo + "')", 150);
}

function checkOptionPreview(sAction, sProductNo)
{
    var layerId = EC$('#opt_preview_' + sAction + '_' + sProductNo);
    if (isClose == 'T') EC$(layerId).hide();
}

function openOptionPreview(sAction, sProductNo)
{
    isClose = 'F';
    var layerId = EC$('#opt_preview_' + sAction + '_' + sProductNo);
    EC$(layerId).show();

    EC$(layerId).mousemouseenter(function()
    {
        EC$(layerId).show();
    }).mouseleave(function()
    {
        EC$(layerId).hide();
    });

}

/**
 * 네이버 페이 주문하기
 */
function nv_add_basket_1_product()
{
    bIsMobile = false;

    if (_isProc == 'F') {
        alert(__("네이버 페이 입점상태를 확인하십시오."));
        return;
    }

    if (typeof(set_option_data) !== 'undefined') {
        alert(__('세트상품은 네이버 페이 구매가 불가하오니, 쇼핑몰 바로구매를 이용해주세요. 감사합니다.'));
        return;
    }

    product_submit('naver_checkout', '/exec/front/order/basket/');
}

/**
 * 네이버 페이 찜하기
 */
function nv_add_basket_2_product()
{
    if (_isProc == 'F') {
        alert(__("네이버 페이 입점상태를 확인하십시오."));
        return;
    }

    window.open("/exec/front/order/navercheckoutwish?product_no=" + iProductNo, "navercheckout_basket",
            'scrollbars=yes,status=no,toolbar=no,width=450,height=300');
}

/**
 * 네이버 페이 주문하기
 */
function nv_add_basket_1_m_product()
{
    bIsMobile = true;

    if (_isProc == 'F') {
        alert(__("네이버 페이 입점상태를 확인하십시오."));
        return;
    }

    if (typeof(set_option_data) !== 'undefined') {
        alert(__('세트상품은 네이버 페이 구매가 불가하오니, 쇼핑몰 바로구매를 이용해주세요. 감사합니다.'));
        return;
    }

    product_submit('naver_checkout', '/exec/front/order/basket/');
}

/**
 * 네이버 페이 찜하기
 */
function nv_add_basket_2_m_product()
{
    if (_isProc == 'F') {
        alert(__("네이버 페이 입점상태를 확인하십시오."));
        return;
    }

    window.location.href = "/exec/front/order/navercheckoutwish?product_no=" + iProductNo;
    //window.open("/exec/front/order/navercheckoutwish?product_no=" + iProductNo, "navercheckout_basket", 'scrollbars=yes,status=no,toolbar=no,width=450,height=300');
}

/**
 * 옵션 추가 구매시에 같은 옵션을 검사하는 함수
 *
 * @returns Boolean
 */
function duplicateOptionCheck()
{
    var bOptionDuplicate = getOptionDuplicate();
    //var bAddOptionDuplicate = getAddOptionDuplicate();

    if (bOptionDuplicate !== true) { //}&& bAddOptionDuplicate !== true) {
        alert(__('동일한 옵션의 상품이 있습니다.'));
        return false;
    }

    return true;
}

/**
 * 텍스트 인풋 옵션 중복 체크
 *
 * @returns {Boolean}
 */
function getAddOptionDuplicate()
{
    var aOptionRow = new Array();
    var iOptionLength = 0;
    var aOptionValue = new Array();
    var bReturn = true;
    // 기본 옵션
    EC$('[id^="' + add_option_id + '"]').each(function()
    {
        aOptionRow.push(EC$(this).val());
    });
    aOptionValue.push(aOptionRow.join(',@,'));
    EC$('.EC_MultipleOption').each(function()
    {
        aOptionRow = new Array();
        EC$(EC$(this).find('.' + EC$.data(document, 'multiple_option_input_class'))).each(function()
        {
            aOptionRow.push(EC$(this).val());
        });
        var sOptionRow = aOptionRow.join(',@,');
        if (EC$.inArray(sOptionRow, aOptionValue) > -1) {
            bReturn = false;
            return false;
        } else {
            aOptionValue.push(sOptionRow);
        }
    });
    return bReturn;
}
/**
 * 일반 셀렉트박스형 옵션 체크 함수
 *
 * @returns {Boolean}
 */
function getOptionDuplicate() {
    // 선택여부는 이미 선택이 되어 있음
    var aOptionId = new Array();
    var aOptionValue = new Array();
    var aOptionRow = new Array();
    var iOptionLength = 0;
    // 기본 옵션
    EC$('select[id^="' + product_option_id + '"]').each(function (i) {
        aOptionValue.push(EC$(this).val());
        iOptionLength++;
    });
    // 추가 구매
    EC$('.' + EC$.data(document, 'multiple_option_select_class')).each(function (i) {
        aOptionValue.push(EC$(this).val());
    });

    var aOptionRow = new Array();
    for (var x in aOptionValue) {
        var sOptionValue = aOptionValue[x];
        aOptionRow.push(sOptionValue);
        if (x % iOptionLength == iOptionLength - 1) {
            var sOptionId = aOptionRow.join('-');

            if (EC$.inArray(sOptionId, aOptionId) > -1) {
                return false;
            }
            aOptionId.push(sOptionId);
            aOptionRow = new Array();
        }
    }

    return true;
}

//sms 재입고
function action_sms_restock(sParam)
{
    // 모바일 접속 및 레이어 팝업 여부 확인
    if (typeof(EC_SHOP_FRONT_PRODUCT_SMS_RESTOCK_LAYER) !== 'undefined') {
        if (EC_SHOP_FRONT_PRODUCT_SMS_RESTOCK_LAYER.createSmsRestockLayerDisplayResult(sParam) === true) {
            return;
        }
    }

    window.open('#none', 'sms_restock' ,'width=459, height=490, scrollbars=yes');
    EC$('#frm_image_zoom').attr('target', 'sms_restock');
    EC$('#frm_image_zoom').attr('action', '/product/sms_restock.html');
    EC$('#frm_image_zoom').submit();
}

//email 재입고
function action_email_restock(iProductNo)
{
    if (typeof(iProductNo) === 'undefined') {
        iProductNo = '';
    }
    if ((window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)) === true) {
        window.open('/product/email_restock.html?' + EC$('#frm_image_zoom').serialize(), 'email_restock' ,'width=459, height=490, scrollbars=yes');
    } else {
        window.open('#none', 'email_restock' ,'width=459, height=490, scrollbars=yes');
        EC$('#frm_image_zoom').attr('target', 'email_restock');
        EC$('#frm_image_zoom').attr('action', '/product/email_restock.html?product_no' + iProductNo);
        EC$('#frm_image_zoom').submit();
    }
}

// 최대 할인쿠폰 다운받기 팝업
function popupDcCoupon(product_no, coupon_no, cate_no, opener_url, location)
{
    var Url = '/';
    if (location === 'Front' || typeof location === 'undefined') {
        Url += 'product/';
    }
    Url += '/coupon_popup.html';
    window.open(Url + "?product_no=" + product_no + "&coupon_no=" + coupon_no + "&cate_no=" + cate_no + "&opener_url=" + opener_url, "popupDcCoupon", "toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0");
}

/**
 * 관련상품 열고 닫기
 */
function ShowAndHideRelation()
{
    try {
        var sRelation = EC$('ul.mSetPrd').parent();
        var sRelationDisp = sRelation.css('display');
        if (sRelationDisp === 'none') {
            EC$('#setTitle').removeClass('show');
            sRelation.show();
        } else {
            EC$('#setTitle').addClass('show');
            sRelation.hide();
        }
    } catch (e) { }
 }

var ITEM = {
    getItemCode: function()
    {
        var chk_has_opt = '';
        try {
            chk_has_opt = has_option;
        } catch (e) {chk_has_opt = 'T';}

        if (chk_has_opt == 'F') {
            return [item_code];
        } else {
            // 필수값 체크
            var bRequire = false;
            // 옵션이 없음
            if (EC$('[id^="product_option_id"]').length < 1) {
                return false;
            }
            EC$('[id^="product_option_id"]').each(function() {
                if (EC$(this).prop('required') === true || EC$(this).attr('required') === 'required') {
                    bRequire = true;
                    return false;
                }
            });

            var aItemCode = new Array();
            if (bRequire === true) {
                if (EC$('#totalProducts').length === 0 || (typeof(EC_SHOP_FRONT_PRODUCT_FUNDING) === 'object' && EC_SHOP_FRONT_PRODUCT_FUNDING.isFundingProduct() === false)) {
                    sItemCode = this.getOldProductItemCode();
                    if (sItemCode !== false) {
                        if (typeof(sItemCode) === 'string') {
                            aItemCode.push(sItemCode);
                        } else {
                            aItemCode = sItemCode;
                        }
                    } else {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                } else {
                    if (EC$('.option_box_id').length == 0) {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                    EC$('.option_box_id').each(function() {
                        aItemCode.push(EC$(this).val());
                    });
                }
            }


            return aItemCode;
        }
    },
    getWishItemCode: function()
    {
        var chk_has_opt = '';
        try {
            chk_has_opt = has_option;
        } catch (e) {chk_has_opt = 'T';}

        if (chk_has_opt == 'F') {
            return [item_code];
        } else {
            // 필수값 체크
            var bRequire = false;
            EC$('[id^="product_option_id"]').each(function() {
                if (EC$(this).prop('required') === true || EC$(this).attr('required') === 'required') {
                    bRequire = true;
                    return false;
                }
            });

            var aItemCode = new Array();
            if (bRequire === true) {
                if (EC$('#totalProducts').length === 0) {
                    sItemCode = this.getOldProductItemCode();
                    if (sItemCode !== false) {
                        if (typeof(sItemCode) === 'string') {
                            aItemCode.push(sItemCode);
                        } else {
                            aItemCode = sItemCode;
                        }
                    } else {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                } else {
                    if (EC$('.soldout_option_box_id,.option_box_id').length == 0) {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                    EC$('.soldout_option_box_id,.option_box_id').each(function() {
                        aItemCode.push(EC$(this).val());
                    });
                }
            }

            return aItemCode;
        }
    },
    getOldProductItemCode: function(sSelector)
    {
        if (sSelector === undefined) {
            sSelector = '[id^="product_option_id"]';
        }
        var sItemCode = null;
        // 뉴상품 옵션 선택 구매
        if (has_option === 'F') {
            // 화면에 있음
            sItemCode = item_code;
        } else {
            if (item_listing_type == 'S') {
                var aOptionValue = new Array();
                EC$(sSelector).each(function() {
                    if (ITEM.isOptionSelected(EC$(this).val()) === true) {
                        aOptionValue.push(EC$(this).val());
                    }
                });

                if (option_type === 'T') {
                    var aCodeMap = EC_UTIL.parseJSON(option_value_mapper);
                    sItemCode = aCodeMap[aOptionValue.join('#$%')];
                } else {
                    sItemCode = aOptionValue;
                }
            } else {
                sItemCode = EC$(sSelector).val();
            }
        }

        if (sItemCode === undefined) {
            return false;
        }

        return sItemCode;
    },
    isOptionSelected: function(aOption)
    {
        var sOptionValue = null;
        if (typeof aOption === 'string') {
            sOptionValue = aOption;
        } else {
            if (aOption.length === 0) return false;
            sOptionValue = aOption.join('-|');
        }

        sOptionValue = '-|'+sOptionValue+'-|';
        return !(/-\|\*{1,2}-\|/g).test(sOptionValue);
    },
    setBodyOverFlow: function(sType)
    {
        var sLocation = location;
        var bBuyLayer = false;

        //var oReturnData = new Object();
        if (EC_SHOP_FRONT_PRODUCT_OPTIONLAYER.isExistLayer(true) === true) {
            //parent.EC$('html, body').css('overflowY', 'auto');
            closeBuyLayer(false);
            sLocation = parent.location;
            bBuyLayer = true;
        }

        //프레임으로 선언된 페이지일경우
        if (typeof(bIsOptionSelectFrame) !== 'undefined' && bIsOptionSelectFrame === true) {
            sLocation = parent.location;
            bBuyLayer = true;
        }
        /*
        oReturnData['sLocation'] = sLocation;
        oReturnData['bBuyLayer'] = bBuyLayer;
        */

        oReturnData = sLocation;

        if (typeof(sType) === 'boolean') {
            oReturnData = bBuyLayer;
        }
        return oReturnData;
    }
};

var EC_SHOP_FRONT_PRODUCT_RESTOCK = (function() {

    return {
        isRestock: function(sType) {

            if (sType === 'sms_restock') {
                return true;
            }

            if (sType === 'email_restock') {
                return true;
            }

            return false;
        },
        openRestockEmailPopup: function()
        {
            product_submit('email_restock');
        },
        bindOpenRestockEmailPopup: function(product_no)
        {
            action_email_restock(product_no);

        }
    };
})();

//상세 장바구니 담기확인창에서 스크립트를 중목으로 볼러오는부분을 제거하기위해서 추가
//사용자 디자인에서도 basket.js에 있는 함수에 의존적이라서 추가가 안되어있다면 아래 함수들을 실행하도록 함
if (typeof(layer_basket_paging) !== 'function') {
  //레이어 장바구니 페이징
  function layer_basket_paging(page_no)
  {
      var sUrl = '/product/add_basket2.html?page=' + page_no + '&layerbasket=T';
      if (typeof(sBasketDelvType) !== 'undefined') {
          sUrl += sUrl + '&delvtype=' + sBasketDelvType;
      }
      EC$.get(sUrl, '', function(sHtml)
      {
          sHtml = sHtml.replace(/<script.*?ind-script\/optimizer.php.*?<\/script>/g, '');
          EC$('#confirmLayer').html(sHtml);
          EC$('#confirmLayer').show();

          // set delvtype to basket
          try {
              EC$(".xans-order-layerbasket").find("a[href='/order/basket.html']").attr("href", "/order/basket.html?delvtype=" + delvtype);
          } catch (e) {}
      });
  }
}

if (typeof(Basket) === 'undefined') {
  var Basket = {
      orderLayerAll: function(oElem) {
          var aParam = {basket_type: 'all_buy'};
          var sOrderUrl = EC$(oElem).attr('link-order') || '/order/orderform.html?basket_type='+ aParam.basket_type;

          if (sBasketDelvType != "") {
              sOrderUrl += '&delvtype=' + sBasketDelvType;
          }
          var sLoginUrl = EC$(oElem).attr('link-login') || '/member/login.html';

          EC$.post('/exec/front/order/order/', aParam, function(data) {
              if (data.result < 0) {
                  alert(data.alertMSG);
                  return;
              }

              if (data.isLogin == 'F') { // 비로그인 주문 > 로그인페이지로 이동
                  location.href = sLoginUrl + '?noMember=1&returnUrl=' + escape(sOrderUrl);
              } else {
                  location.href = sOrderUrl;
              }
          }, 'json');
      },

      isInProgressMigrationCartData: function(aData) {
          if (aData['isInProgressMigrationCartData'] === true) {
              alert(__('SYSTEM.IS.BUSY.PLEASE.TRY', 'SHOP.FRONT.BASKET.JS'));
              window.location.reload();
          }
      }

  };
}

/**
 * 장바구니 유효성 검증 validation
 */
var EC_SHOP_FRONT_BASKET_VALIID = {
    // 장바구니 상품 중복여부 확인
    isBasketProductDuplicateValid: function (sParam)
    {
        var bReturn = true;

        EC$.ajax({
            url: '/exec/front/order/Basketduplicate/',
            type: 'post',
            data: sParam,
            async: false,
            dataType: 'json',
            success: function(data) {
                if (data.result === true) {
                    if (confirm(__('장바구니에 동일한 상품이 있습니다. ' + '\n' + '장바구니에 추가하시겠습니까?')) === false) {
                        bReturn = false;
                        return false;
                    }
                }
            }
        });

        return (bReturn === false) ? false : true;
    }
};

var STOCKLAYER = (function() {

    var sUrl = '/product/stocklayer.html';

    //세트 상품 여부
    function isSetProdct()
    {
        if (typeof(set_option_data) === 'undefined') {
            return false;
        }

        return true;
    }

    //모든 재고 레이어 Element Get
    function getAllStockLayer()
    {
        return EC$('.ec-shop-detail-stock-layer');
    }

    return {
        init: function() {
            try {
                EC$(document).on('click', 'a[name="EC-stockdesign"]', function(e) {
                    e.preventDefault();
                    var iProductNo = EC$(this).attr('product_no');
                    var sPageType = EC$(this).attr('page_type');
                    STOCKLAYER.closeStockLayer();

                    if (EC$(this).parent().find('.ec-shop-detail-stock-layer').length == 0) {
                        var oParam = {};

                        oParam['product_no'] = iProductNo;
                        oParam['page_type'] = sPageType;


                        if (sPageType === 'detail') {
                            if (isSetProdct() === true) {
                                oParam['stockData'] = EC_UTIL.parseJSON(set_option_data);
                                oParam['is_set_product'] = 'T';
                            } else {
                                oParam['stockData'] = EC_UTIL.parseJSON(option_stock_data);
                                oParam['is_set_product'] = 'F';
                            }
                        }
                        var oHtml = EC$('<div>');
                        oHtml.addClass('ec-shop-detail-stock-layer');
                        EC$(this).parent().append(oHtml);
                        EC$.ajax({
                            type: 'POST',
                            url: sUrl,
                            data: oParam,
                            success: function (sHtml) {
                                sHtml = sHtml.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g, "");
                                oHtml.html(sHtml);
                            },
                            error: function (e) {
                                __('오류발생');
                            }
                        });
                    } else {
                        EC$(this).parent().find('.ec-shop-detail-stock-layer').show();
                    }

                    e.preventDefault();
                });
            } catch (e) {}
        },

        closeStockLayer: function() {
            var $oAllStockLayer = getAllStockLayer();
            $oAllStockLayer.hide();
        }
    };
})();

EC$(function() {
    STOCKLAYER.init();
});

var EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE = {
    /**
     * 로컬 스토리지 지원 여부
     * @return bool 지원하면 true, 지원하지 않으면 false
     */
    isSupport: function() {
        if (window.localStorage) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 로컬 스토리지에 데이터 셋팅
     * @param string sKey 키
     * @param mixed mData 저장할 데이터
     * @param int iLifeTime 살아있는 시간(초) (기본 1일)
     * @return bool 정상 저장 여부
     */
    setItem: function(sKey, mData, iLifeTime) {
        if (this.isSupport() === false) {
            return false;
        }

        iLifeTime = iLifeTime || 86400;

        try {
            window.localStorage.setItem(sKey, JSON.stringify({
                iExpireTime: Math.floor(new Date().getTime() / 1000) + iLifeTime,
                mContent: mData
            }));
        } catch (e) {
            return false;
        }

        return true;
    },

    /**
     * 로컬 스토리지에서 데이터 리턴
     * @param string sKey 키
     * @return mixed 데이터
     */
    getItem: function(sKey) {
        if (this.isSupport() === false) {
            return null;
        }

        var sData = window.localStorage.getItem(sKey);
        try {
            if (sData) {
                var aData = JSON.parse(sData);
                if (aData.iExpireTime > Math.floor(new Date().getTime() / 1000)) {
                    return aData.mContent;
                } else {
                    window.localStorage.removeItem(sKey);
                }
            }
        } catch (e) { }

        return null;
    },

    /**
     * 로컬 스토리지에서 데이터 삭제
     * @param string sKey 키
     */
    removeItem: function(sKey) {
        if (this.isSupport() === false) {
            return;
        }

        window.localStorage.removeItem(sKey);
    }
};

/**
 * 좋아요 관련 공통
 */
var EC_SHOP_FRONT_NEW_LIKE_COMMON = {
    CACHE_LIFE_TIME: 3600,
    CACHE_KEY_MY_LIKE_CATEGORY: 'localMyLikeCategoryNoList',
    CACHE_KEY_MY_LIKE_PRODUCT: 'localMyLikeProductNoList',

    aConfig: {
        bIsUseLikeProduct: false,
        bIsUseLikeCategory: false
    },

    init: function(aConfig)
    {
        this.aConfig = aConfig;
    },

    /**
     * 내 분류 좋아요 번호 리스트를 가져와서 successCallbackFn 콜백 함수를 실행합니다.
     * @param function successCallbackFn 성공시 실행할 콜백 함수
     * @param function completeCallbackFn ajax 호출 완료 후 실행할 콜백 함수
     */
    getMyLikeCategoryNoInList: function(successCallbackFn, completeCallbackFn)
    {
        var self = this;

        var aData = EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.getItem(self.CACHE_KEY_MY_LIKE_CATEGORY);
        if (aData !== null) {
            successCallbackFn(aData);
            if (typeof completeCallbackFn === 'function') {
                completeCallbackFn();
            }
        } else {
            EC$.ajax({
                url: '/exec/front/shop/LikeCommon',
                type: 'get',
                data: {
                    'mode': 'getMyLikeCategoryNoInList'
                },
                dataType: 'json',
                success: function(oReturn) {
                    if (oReturn.bResult === true) {
                        aData = oReturn.aData;
                        EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.setItem(self.CACHE_KEY_MY_LIKE_CATEGORY, aData, self.CACHE_LIFE_TIME);
                        successCallbackFn(aData);
                    }
                },
                complete: function() {
                    completeCallbackFn();
                }
            });
        }
    },

    /**
     * 내 분류 좋아요 번호 리스트 캐시를 퍼지합니다.
     */
    purgeMyLikeCategoryNoInList: function()
    {
        EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.removeItem(this.CACHE_KEY_MY_LIKE_CATEGORY);
    },

    /**
     * 내 상품 좋아요 번호 리스트를 가져와서 successCallbackFn 콜백 함수를 실행합니다.
     * @param function successCallbackFn 성공시 실행할 콜백 함수
     * @param function completeCallbackFn ajax 호출 완료 후 실행할 콜백 함수
     */
    getMyLikeProductNoInList: function(successCallbackFn, completeCallbackFn)
    {
        var self = this;

        var aData = EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.getItem(self.CACHE_KEY_MY_LIKE_PRODUCT);
        if (aData !== null) {
            successCallbackFn(aData);
            if (typeof completeCallbackFn === 'function') {
                completeCallbackFn();
            }
        } else {
            EC$.ajax({
                url: '/exec/front/shop/LikeCommon',
                type: 'get',
                data: {
                    'mode': 'getMyLikeProductNoInList'
                },
                dataType: 'json',
                success: function(oReturn) {
                    if (oReturn.bResult === true) {
                        aData = oReturn.aData;
                        EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.setItem(self.CACHE_KEY_MY_LIKE_PRODUCT, aData, self.CACHE_LIFE_TIME);
                        successCallbackFn(aData);
                    }
                },
                complete: function() {
                    completeCallbackFn();
                }
            });
        }
    },

    /**
     * 내 상품 좋아요 번호 리스트 캐시를 퍼지합니다.
     */
    purgeMyLikeProductNoInList: function()
    {
        EC_SHOP_FRONT_NEW_LIKE_BROWSER_CACHE.removeItem(this.CACHE_KEY_MY_LIKE_PRODUCT);
    },
    // 숫자 관련 콤마 제거 처리(ECHOSTING-260504)
    getNumericRemoveCommas: function(mText) {
        var sSearchCommas = ',';
        var sReplaceEmpty = '';

        if (EC$.inArray(typeof(mText), ['number', 'undefined']) > -1) {
            return mText;
        }

        while (mText.indexOf(sSearchCommas) > -1) {
            mText = mText.replace(sSearchCommas, sReplaceEmpty);
        }

        return mText;
    },
    // 숫자 관련 콤마 처리 (ECHOSTING-260504)
    getNumberFormat: function(iNumber)
    {
        iNumber += '';

        var objRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
        while (objRegExp.test(iNumber)) {
            iNumber = iNumber.replace(objRegExp, '$1,$2');
        }

        return iNumber;
    }
};

/**
 * 목록 > 상품 좋아요.
 */
var EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT = {
    bIsReady: false, // 좋아요 클릭준비완료 여부.
    bIsSetEvent: false, // 좋아요 버튼 이벤트 지정 여부.
    aImgSrc: [], // 좋아요(On/Off) 아이콘 경로.
    aImgAlt: [], // 좋아요(On/Off) 아이콘 Alt태그
    aMyLikePrdNo: [], // 유저가 이미 좋아요 선택한 상품번호
    oMyshopLikeCntNode: null, // layout_shopingInfo 좋아요 span 노드

    // 상품 좋아요 초기화
    init: function() {
        // 상품 좋아요 사용안함시
        if (EC_SHOP_FRONT_NEW_LIKE_COMMON.aConfig.bIsUseLikeProduct !== true) {
            return;
        }

        // ajax 유저가 이미 좋아요 선택한 상품번호 얻기 + 아이콘세팅
        this.setLoadData();
    },

    // 유저가 이미 좋아요 선택한 상품번호 얻기 + 아이콘세팅
    setLoadData: function() {
        if (EC$('.likePrdIcon').count < 1) {
            return;
        }

        var self = this;

        EC_SHOP_FRONT_NEW_LIKE_COMMON.getMyLikeProductNoInList(function(aData) {
            self.aImgSrc = aData.imgSrc;
            self.aImgAlt = aData.imgAlt;
            self.aMyLikePrdNo = aData.rows;

            // 아이콘(on) 세팅
            self.setMyLikeProductIconOn();

            // 좋아요 클릭 이벤트핸들러 지정
            if (self.bIsSetEvent === false) {
                self.setEventHandler();
                self.bIsSetEvent = true;
            }
        }, function() {
            self.bIsReady = true;
        });
    },

    // 페이지 로드시 유저가 좋아요한 상품 On.아이콘으로 변경
    setMyLikeProductIconOn: function() {
        var aData = this.aMyLikePrdNo;

        for (var i=0; i < aData.length; i++) {
            // selected 스타일 적용
            EC$(".likePrd_" + aData[i].product_no).each(function() {
                EC$(this).addClass('selected');
            });

            // 아이콘 이미지경로 변경
            EC$(".likePrdIcon[product_no='" + aData[i].product_no + "']").each(function() {
                EC$(this).attr({'src': EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgSrc.on, 'icon_status': 'on', 'alt': EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgAlt.on});
            });
        }
    },

    // 이벤트핸들러 지정
    setEventHandler: function() {
        // 좋아요 아이콘 클릭 이벤트
        try {
            EC$(document).on('click', '.likePrd', EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.clickLikeIcon);
        } catch (e) {}

        var sContext = '';
        if (typeof(PREVIEWPRDOUCT) === 'undefined') {
            sContext = window.parent.document;
        }
        // 마이쇼핑 > 상품좋아요 페이지
        if (EC$(".xans-myshop-likeproductlist", sContext).length > 0) {
            // 팝업 확대보기창 닫기 이벤트
            if (EC$(".xans-product-zoompackage").length > 0) {
                EC$('.xans-product-zoompackage div.close').on('click', EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.closeZoomReload);
            }
        }
    },

    // 좋아요 아이콘 클릭 이벤트핸들러
    clickLikeIcon: function() {
        if (EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.bIsReady === false) {
            return;
        }

        // 클릭한 상품의 좋아요수, 아이콘 정보얻기
        var iPrdNo = EC$('.likePrdIcon', this).attr('product_no');
        var iCateNo = EC$('.likePrdIcon', this).attr('category_no');
        var sIconStatus= EC$('.likePrdIcon', this).attr('icon_status');
        // 카운트 string > int 형으로 변환 (ECHOSTING-260504)
        var iLikeCount = EC_SHOP_FRONT_NEW_LIKE_COMMON.getNumericRemoveCommas(EC$('.likePrdCount', this).text());

        // 아이콘경로 및 좋아요수 증감처리
        var sNewImgSrc = sNewIconStatus = "";
        var iNewLikeCount = 0;
        var oLikeWrapNode = EC$(".likePrd_" + iPrdNo);

        if (sIconStatus === 'on') {
            sNewIconStatus = 'off';
            sNewImgSrc = EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgSrc.off;
            sNewImgAlt = EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgAlt.off;
            if (iLikeCount > 0) {
                iNewLikeCount = --iLikeCount;
            }

            oLikeWrapNode.each(function() {
                EC$(this).removeClass('selected');
            });
        } else {
            sNewIconStatus = 'on';
            sNewImgSrc = EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgSrc.on;
            sNewImgAlt = EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.aImgAlt.on;
            iNewLikeCount = ++iLikeCount;

            // 동일상품 selected 스타일적용
            oLikeWrapNode.each(function() {
                EC$(this).addClass('selected');
            });
        }
        // 좋아요 카운트 number_format (ECHOSTING-260504)
        iNewLikeCount = EC_SHOP_FRONT_NEW_LIKE_COMMON.getNumberFormat(iNewLikeCount);
        // 상단.layout_shopingInfo 좋아요수 업데이트
        EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.updateShopInfoCount(sNewIconStatus);

        // 좋아요 아이콘이미지 + 좋아요수 업데이트
        EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.updateLikeIconCount(iPrdNo, sNewImgSrc, sNewIconStatus, iNewLikeCount, sNewImgAlt);

        // ajax 호출 좋아요수(상품) + 마이쇼핑 좋아요 저장
        EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.submitMyLikeProduct(iPrdNo, iCateNo, sNewIconStatus);

        // 확대보기 팝업에서 좋아요 클릭시, 부모프레임 좋아요 업데이트
        if (EC$(".xans-product-zoompackage").length > 0) {
            window.parent.EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.updateShopInfoCount(sNewIconStatus);
            window.parent.EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.updateLikeIconCount(iPrdNo, sNewImgSrc, sNewIconStatus, iNewLikeCount);
        }
    },

    // 마이쇼핑 > 상품좋아요 목록 > 팝업 확대보기창 닫기 이벤트핸들러
    closeZoomReload: function() {
        var sIconsStatus = EC$('.xans-product-zoompackage .likePrdIcon').attr('icon_status');

        // 팝업에서 좋아요를 취소했으면 좋아요 목록 새로고침
        if (sIconsStatus === 'off') {
            window.parent.location.reload();
        }
    },

    // 좋아요 아이콘이미지 + 좋아요수 업데이트
    updateLikeIconCount: function(iPrdNo, sImgSrc, sIconStatus, iLikeCount, sNewImgAlt) {
        // 클릭한 동일상품 아이콘 변경
        EC$(".likePrdIcon[product_no='" + iPrdNo + "']").each(function() {
            EC$(this).attr({'src': sImgSrc, 'icon_status': sIconStatus, 'alt': sNewImgAlt});
        });

        // 클릭한 동일상품 좋아요수 변경
        EC$('.likePrdCount_' + iPrdNo).each(function() {
            EC$(this).text(iLikeCount);
        });
    },

    // 상단.layout_shopingInfo 좋아요수 업데이트
    updateShopInfoCount: function(sIconStatus) {
        if (EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.oMyshopLikeCntNode === null) {
            EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.oMyshopLikeCntNode = EC$('#xans_myshop_like_prd_cnt');
        }

        var iMyshopLikeCnt;
        if (EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.oMyshopLikeCntNode !== null) {
            iMyshopLikeCnt = parseInt(EC$(EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.oMyshopLikeCntNode).text());
            iMyshopLikeCnt = (sIconStatus === 'on') ? iMyshopLikeCnt + 1 : iMyshopLikeCnt - 1;
            iMyshopLikeCnt = (iMyshopLikeCnt < 0 || isNaN(iMyshopLikeCnt)) ? 0 : iMyshopLikeCnt;
            EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.oMyshopLikeCntNode.text(iMyshopLikeCnt + '개');
        }

        if (EC$('#xans_myshop_main_like_prd_cnt').length > 0 && iMyshopLikeCnt >= 0) {
            EC$('#xans_myshop_main_like_prd_cnt').text(iMyshopLikeCnt);
        }
    },

    // 상품 좋아요수 + 마이쇼핑 좋아요 저장
    submitMyLikeProduct: function(iPrdNo, iCateNo, sIconStatus) {
        if (sIconStatus === 'on') {
            this.aMyLikePrdNo.push(iPrdNo);
        } else {
            this.aMyLikePrdNo.pop(iPrdNo);
        }

        EC$.ajax({
            url: '/exec/front/shop/LikeCommon',
            type: 'get',
            data: {
                'mode': 'saveMyLikeProduct',
                'iPrdNo': iPrdNo,
                'iCateNo': iCateNo,
                'sIconStatus': sIconStatus
            },
            dataType: 'json',
            success: function(oReturn) {
                if (oReturn.bResult === true) {
                    EC_SHOP_FRONT_NEW_LIKE_COMMON.purgeMyLikeProductNoInList();
                }
            },
            complete: function() {
                EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.bIsReady = true;
            }
        });
    }
};

EC$(function() {
    EC_SHOP_FRONT_NEW_LIKE_COMMON_PRODUCT.init(); // 상품 좋아요.
});

var EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE = {
    oBundleConfig: {},

    iProductQuantity: 0,

    init: function(oInit)
    {
        if (typeof(oInit) === 'object') {
            this.oBundleConfig = oInit;
        } else {
            if (sBundlePromotion === '' || typeof(sBundlePromotion) === 'undefined') {
                return;
            }
            this.oBundleConfig = EC_UTIL.parseJSON(sBundlePromotion);
        }
        // 강제로 후킹
        buy_unit = 1;
        product_min = 1;
        product_max = 0;

        EC$.data(document,'BundlePromotion', true);
    },
    getQuantityStep: function(iProductNum)
    {
        return this.oBundleConfig[iProductNum].bundle_quantity + 1;
    },
    /**
     * 실제 UI의 수량대신 1+N 이벤트로 인해 후킹된 상품 수량을 리턴
     */
    getQuantity: function(iQuantity, iProductNum)
    {
        var iReturn = iQuantity;
        if (typeof(this.oBundleConfig[iProductNum]) === 'undefined') {
            return iReturn;
        }

        iReturn = Math.ceil(iQuantity / this.getQuantityStep(iProductNum));

        return iReturn;
    },
    /**
     * 정확한 구매 수량이 맞는지 검증
     */
    isValidQuantity: function(aQuantity, iProductNum)
    {
        var bReturn = true;
        if (typeof(this.oBundleConfig[iProductNum]) === 'undefined') {
            return bReturn;
        }

        if (this.isValidQuantityCheck(aQuantity, iProductNum) === false) {
            alert(this.getAlertMessage([iProductNum]));
            return false;
        }
        return bReturn;
    },
    isValidQuantityCheck: function(aQuantity, iProductNum)
    {
        var iQuantityStep = this.getQuantityStep(iProductNum);

        if (this.oBundleConfig[iProductNum].bundle_apply_type === 'P') {
            EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.iProductQuantity = 0;
            EC$.map(aQuantity, function(pv, cv) {
                EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.iProductQuantity += pv;
            });
            return (EC_SHOP_FRONT_PRODUCT_DEATAIL_BUNDLE.iProductQuantity % iQuantityStep) === 0;
        }

        if (this.oBundleConfig[iProductNum].bundle_apply_type === 'I') {
            for (var i in aQuantity) {
                if (aQuantity.hasOwnProperty(i) === false) {
                    continue;
                }
                if (aQuantity[i] % iQuantityStep !== 0) {
                    return false;
                }
            }
        }
        return true;
    },
    getAlertMessage: function(iProductNum)
    {
        var sSubject = this.oBundleConfig[iProductNum].bundle_apply_type === 'P' ? '옵션에 상관없이' : '동일한 옵션으로';
        var sReturn = '1+%s 이벤트상품입니다.\n'+sSubject+' 수량을 %s개 단위로 구매해주세요.';
        return sprintf(__(sReturn), this.oBundleConfig[iProductNum].bundle_quantity, this.getQuantityStep(iProductNum));
    }
};

var EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT = {
    aProductNo: [], bIsReviewTalk: 'F', setReviewTalkCnt: function () {
        var bIsUse = this.checkUseReviewTalk();

        if (bIsUse === true) {
            this.setDataProductNo();
            this.setResponseCountData();
        }
    },

    checkUseReviewTalk: function () {
        return (this.bIsReviewTalk === 'T' && EC$('.reviewtalk_review_count').length > 0) ? true : false;
    },

    setDataProductNo: function () {
        var aAllProductNo = [];
        EC$('.reviewtalk_review_count').each(function () {
            aAllProductNo.push(EC$(this).attr('data-product-no'));
        });

        EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT.aProductNo = EC$.uniqueSort(aAllProductNo);
    },

    setResponseCountData: function () {
        if (this.aProductNo.length < 1) {
            return;
        }

        EC$.ajax({
            url: '/exec/front/shop/ApiReviewtalkReviewcnt', type: 'get', data: {
                'product_no': this.aProductNo.join('_')
            }, dataType: 'json', success: function (oResponse) {
                if (oResponse.result === true) {
                    EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT.setResponseData(oResponse.data);
                }
            }
        });
    },

    //천단위 콤마 표시
    number_format: function(str)
    {
        // 3자리씩 ,로 끊어서 리턴
        str = String(parseInt(str));
        var regexp = /^(-?[0-9]+)([0-9]{3})($|\.|,)/;
        while (regexp.test(str)) {
            str = str.replace(regexp, "$1,$2$3");
        }
        return str;
    },

    setResponseData: function (oResponseData) {
        var oProductReviewCnt = oResponseData;

        if (this.checkUseReviewTalk() === true) {
            EC$('.reviewtalk_review_count').each(function () {
                var iProductNo = EC$(this).attr('data-product-no');
                var sFormat = EC$(this).attr('data-format');
                var iReviewCount = 0;

                if (oProductReviewCnt.hasOwnProperty(iProductNo) === true && oProductReviewCnt[iProductNo].hasOwnProperty('review_count') === true) {
                    iReviewCount = oProductReviewCnt[iProductNo].review_count;
                }

                EC$(this).text(sFormat.replace('REVIEWTALKCOUNT', EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT.number_format(iReviewCount)));

                var sAddClass = 'reviewtalk_count_display_' + iReviewCount;
                EC$(this).parent().addClass(sAddClass);
                EC$(this).parent().siblings('.title').addClass(sAddClass);
            });
        }
    }
};

EC$(function () {
    EC_SHOP_FRONT_REVIEW_TALK_REVIEW_COUNT.setReviewTalkCnt();
});


/**
 * 접속통계 & 실시간접속통계
 */
EC$(function() {
    // 이미 weblog.js 실행 되었을 경우 종료 
    if (EC$('#log_realtime').length > 0) {
        return;
    }
    /*
     * QueryString에서 디버그 표시 제거
     */
    function stripDebug(sLocation)
    {
        if (typeof sLocation !== 'string') return '';

        sLocation = sLocation.replace(/^d[=]*[\d]*[&]*$/, '');
        sLocation = sLocation.replace(/^d[=]*[\d]*[&]/, '');
        sLocation = sLocation.replace(/(&d&|&d[=]*[\d]*[&]*)/, '&');

        return sLocation;
    }

    // 벤트 몰이 아닐 경우에만 V3(IFrame)을 로드합니다.
    // @date 190117
    // @date 191217 - 이벤트에도 V3 상시 적재로 변경.
    //if (EC_FRONT_JS_CONFIG_MANAGE.sWebLogEventFlag == "F")
    //{
    // T 일 경우 IFRAME 을 노출하지 않는다.
    if (EC_FRONT_JS_CONFIG_MANAGE.sWebLogOffFlag == "F")
    {
        var frame_print = null;
        if (window.self == window.top) {
            var rloc = escape(document.location);
            var rref = escape(document.referrer);
            var frame_print = 1;
        } else if (aLogData.hash != '') {
            var rloc = (document.location).pathname;
            var rref = '';
            var frame_print = 1;
        }

        // 광고 랜딩에서 iframe 일 경우 window.top 을 제외하고 노출하지 않는다.
        if (frame_print != null) {
            // realconn & Ad aggregation
            var _aPrs = new Array();
            _sUserQs = window.location.search.substring(1);
            _sUserQs = stripDebug(_sUserQs);
            _aPrs[0] = 'rloc=' + rloc;
            _aPrs[1] = 'rref=' + rref;
            _aPrs[2] = 'udim=' + window.screen.width + '*' + window.screen.height;
            _aPrs[3] = 'rserv=' + aLogData.log_server2;
            _aPrs[4] = 'cid=' + eclog.getCid();
            _aPrs[5] = 'role_path=' + EC$('meta[name="path_role"]').attr('content');
            _aPrs[6] = 'stype=' + aLogData.stype;
            _aPrs[7] = 'shop_no=' + aLogData.shop_no;
            _aPrs[8] = 'lang=' + aLogData.lang;
            _aPrs[9] = 'ver=' + aLogData.ver;

            // 모바일웹일 경우 추가 파라미터 생성
            var _sMobilePrs = '';
            if (mobileWeb === true) _sMobilePrs = '&mobile=T&mobile_ver=new';

            _sUrlQs = _sUserQs + '&' + _aPrs.join('&') + _sMobilePrs;

            var _sUrlFull = '/exec/front/eclog/main/?' + _sUrlQs;

            var node = document.createElement('iframe');
            node.setAttribute('src', _sUrlFull);
            node.setAttribute('id', 'log_realtime');
            document.body.appendChild(node);

            EC$('#log_realtime').hide();
        }
    }

    // eclog2.0, eclog1.9
    var sTime = new Date().getTime();//ECHOSTING-54575

    // 접속통계 서버값이 있다면 weblog.js 호출
    if (aLogData.log_server1 != null && aLogData.log_server1 != '') {
        var sScriptSrc = '//' + aLogData.log_server1 + '/weblog.js?uid=' + aLogData.mid + '&uname=' + aLogData.mid + '&r_ref=' + document.referrer + '&shop_no=' + aLogData.shop_no;
        if (mobileWeb === true) sScriptSrc += '&cafe_ec=mobile';
        sScriptSrc += '&t=' + sTime;//ECHOSTING-54575
        var node = document.createElement('script');
        node.setAttribute('type', 'text/javascript');
        node.setAttribute('src', sScriptSrc);
        node.setAttribute('id', 'log_script');
        document.body.appendChild(node);
    }

    // CA (Cafe24 Analytics
    if (aLogData.ca != null) {
        (function (i, s, o, g, r, a, m, n, d) {
            i['cfaObject'] = g;
            i['cfaUid'] = r;
            i['cfaStype'] = a;
            i['cfaDomain'] = m;
            i['cfaSno'] = n;
            i['cfaEtc'] = d;
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//' + aLogData.ca +'?v=' + sTime, aLogData.mid, aLogData.stype, aLogData.domain, aLogData.shop_no, aLogData.etc);
    }
});

(function(window) {
    window.htmlentities = {
        /**
         * Converts a string to its html characters completely.
         *
         * @param {String} str String with unescaped HTML characters
         **/
        encode: function(str) {
            var buf = [];

            for (var i=str.length-1; i>=0; i--) {
                buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
            }

            return buf.join('');
        },
        /**
         * Converts an html characterSet into its original character.
         *
         * @param {String} str htmlSet entities
         **/
        decode: function(str) {
            return str.replace(/&#(\d+);/g, function(match, dec) {
                return String.fromCharCode(dec);
            });
        }
    };
})(window);
/**
 * 비동기식 데이터
 */
var CAPP_ASYNC_METHODS = {
    STATUS: 'unready',
    DEBUG: false,
    IS_LOGIN: (document.cookie.match(/(?:^| |;)iscache=F/) ? true : false),
    EC_PATH_ROLE: EC$('meta[name="path_role"]').attr('content') || '',
    aDatasetList: [],
    $xansMyshopMain: EC$('.xans-myshop-main'),
    init: function()
    {
        CAPP_ASYNC_METHODS.STATUS = 'ready';
    	var bDebug = CAPP_ASYNC_METHODS.DEBUG;

        var aUseModules = [];
        var aNoCachedModules = [];

        EC$(CAPP_ASYNC_METHODS.aDatasetList).each(function() {
            var sKey = this;

            var oTarget = CAPP_ASYNC_METHODS[sKey];

            if (bDebug) {
                console.log(sKey);
            }
            var bIsUse = oTarget.isUse();
            if (bDebug) {
                console.log('   isUse() : ' + bIsUse);
            }

            if (bIsUse === true) {
                aUseModules.push(sKey);

                if (oTarget.restoreCache === undefined || oTarget.restoreCache() === false) {
                    if (bDebug) {
                        console.log('   restoreCache() : true');
                    }
                    aNoCachedModules.push(sKey);
                }
            }
        });

        if (aNoCachedModules.length > 0) {
            var sEditor = '';
            try {
                if (bEditor === true) {
                    // 에디터에서 접근했을 경우 임의의 상품 지정
                    sEditor = '&PREVIEW_SDE=1';
                }
            } catch (e) { }

            var sPathRole = '&path_role=' + CAPP_ASYNC_METHODS.EC_PATH_ROLE;

            EC$.ajax(
            {
                url: '/exec/front/manage/async?module=' + aNoCachedModules.join(',') + sEditor + sPathRole,
                dataType: 'json',
                success: function(aData)
                {
                	CAPP_ASYNC_METHODS.setData(aData, aUseModules);
                }
            });

        } else {
        	CAPP_ASYNC_METHODS.setData({}, aUseModules);

        }
    },
    setData: function(aData, aUseModules)
    {
        aData = aData || {};

        EC$(aUseModules).each(function() {
            var sKey = this;

            var oTarget = CAPP_ASYNC_METHODS[sKey];

            if (oTarget.setData !== undefined && aData.hasOwnProperty(sKey) === true) {
                oTarget.setData(aData[sKey]);
            }

            if (oTarget.execute !== undefined) {
                oTarget.execute();
            }
        });

        CAPP_ASYNC_METHODS.STATUS = 'complete';
    },

    _getCookie: function(sCookieName)
    {
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        return aCookieValue ? aCookieValue[1] : null;
    }
};
/**
 * 비동기식 데이터 - 회원 정보
 */
CAPP_ASYNC_METHODS.aDatasetList.push('member');
CAPP_ASYNC_METHODS.member = {
    __sEncryptedString: null,
    __isAdult: 'F',

    // 회원 데이터
    __sMemberId: null,
    __sName: null,
    __sNickName: null,
    __sGroupName: null,
    __sEmail: null,
    __sPhone: null,
    __sCellphone: null,
    __sBirthday: null,
    __sGroupNo: null,
    __sBoardWriteName: null,
    __sAdditionalInformation: null,
    __sCreatedDate: null,

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (EC$('.xans-layout-statelogon, .xans-layout-logon').length > 0) {
                return true;
            }

            if (CAPP_ASYNC_METHODS.recent.isUse() === true
                && typeof(EC_FRONT_JS_CONFIG_SHOP) !== 'undefined'
                && EC_FRONT_JS_CONFIG_SHOP.adult19Warning === 'T') {
                return true;
            }

            if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('customer', EC_APPSCRIPT_SDK_DATA) > -1) {
                return true;
            }

        } else {
            // 비 로그인 상태에서 삭제처리
            this.removeCache();
        }

        return false;
    },

    restoreCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return false;
        }

        // 데이터 복구 유무
        var bRestored = false;

        try {
            // 데이터 복구
            var oCache = JSON.parse(window.sessionStorage.getItem('member_' + EC_SDE_SHOP_NUM));

            // expire 체크
            if (oCache.exp < Date.now()) {
                throw 'cache has expired.';
            }

            // 데이터 체크
            if (typeof oCache.data.member_id === 'undefined'
                || oCache.data.member_id === ''
                || typeof oCache.data.name === 'undefined'
                || typeof oCache.data.nick_name === 'undefined'
                || typeof oCache.data.group_name === 'undefined'
                || typeof oCache.data.group_no === 'undefined'
                || typeof oCache.data.email === 'undefined'
                || typeof oCache.data.phone === 'undefined'
                || typeof oCache.data.cellphone === 'undefined'
                || typeof oCache.data.birthday === 'undefined'
                || typeof oCache.data.board_write_name === 'undefined'
                || typeof oCache.data.additional_information === 'undefined'
                || typeof oCache.data.created_date === 'undefined'
            ) {
                throw 'Invalid cache data.';
            }

            // 데이터 복구
            this.__sMemberId = oCache.data.member_id;
            this.__sName = oCache.data.name;
            this.__sNickName = oCache.data.nick_name;
            this.__sGroupName = oCache.data.group_name;
            this.__sGroupNo = oCache.data.group_no;
            this.__sEmail = oCache.data.email;
            this.__sPhone = oCache.data.phone;
            this.__sCellphone = oCache.data.cellphone;
            this.__sBirthday = oCache.data.birthday;
            this.__sBoardWriteName = oCache.data.board_write_name;
            this.__sAdditionalInformation = oCache.data.additional_information;
            this.__sCreatedDate = oCache.data.created_date;

            bRestored = true;
        } catch (e) {
            // 복구 실패시 캐시 삭제
            this.removeCache();
        }

        return bRestored;
    },

    cache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        // 캐시
        window.sessionStorage.setItem('member_' + EC_SDE_SHOP_NUM, JSON.stringify({
            exp: Date.now() + (1000 * 60 * 10),
            data: this.getData()
        }));
    },

    removeCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        // 캐시 삭제
        window.sessionStorage.removeItem('member_' + EC_SDE_SHOP_NUM);
    },

    setData: function(oData)
    {
        this.__sEncryptedString = oData.memberData;
        this.__isAdult = oData.memberIsAdult;
    },

    execute: function()
    {
        if (this.__sMemberId === null) {
            if (this.__sEncryptedString.id) {
                this.setDataCallback(this.__sEncryptedString);
            } else {
                AuthSSLManager.weave({
                    'auth_mode': 'decryptClient',
                    'auth_string': this.__sEncryptedString,
                    'auth_callbackName': 'CAPP_ASYNC_METHODS.member.setDataCallback'
                });
            }
        } else {
            this.render();
        }
    },

    setDataCallback: function(sData)
    {
        try {
            if (sData.id) {
                var oData = sData;
            } else {
                var sDecodedData = decodeURIComponent(sData);
                if (AuthSSLManager.isError(sDecodedData) == true) {
                    console.log(sDecodedData);
                    return;
                }
                var oData = AuthSSLManager.unserialize(sDecodedData);
            }

            this.__sMemberId = oData.id || '';
            this.__sName = oData.name || '';
            this.__sNickName = oData.nick || '';
            this.__sGroupName = oData.group_name || '';
            this.__sGroupNo = oData.group_no || '';
            this.__sEmail = oData.email || '';
            this.__sPhone = oData.phone || '';
            this.__sCellphone = oData.cellphone || '';
            this.__sBirthday = oData.birthday || 'F';
            this.__sBoardWriteName = oData.board_write_name || '';
            this.__sAdditionalInformation = oData.additional_information || '';
            this.__sCreatedDate = oData.created_date || '';

            // 데이터 랜더링
            this.render();

            // 데이터 캐시
            this.cache();
        } catch (e) {}
    },

    render: function()
    {
        // 친구초대
        if (EC$('.xans-myshop-asyncbenefit').length > 0) {
            EC$('#reco_url').attr({value: EC$('#reco_url').val() + this.__sMemberId});
        }

        EC$('.authssl_member_name').html(this.__sName);
        EC$('.xans-member-var-id').html(this.__sMemberId);
        EC$('.xans-member-var-name').html(this.__sName);
        EC$('.xans-member-var-nick').html(this.__sNickName);
        EC$('.xans-member-var-group_name').html(this.__sGroupName);
        EC$('.xans-member-var-group_no').html(this.__sGroupNo);
        EC$('.xans-member-var-email').html(this.__sEmail);
        EC$('.xans-member-var-phone').html(this.__sPhone);

        if (EC$('.xans-board-commentwrite').length > 0 && typeof BOARD_COMMENT !== 'undefined') {
            BOARD_COMMENT.setCmtData();
        }
    },

    getMemberIsAdult: function()
    {
        if (CAPP_ASYNC_METHODS.STATUS == 'unready') {
            CAPP_ASYNC_METHODS.init();
        }
        return this.__isAdult;
    },

    getData: function()
    {
        if (CAPP_ASYNC_METHODS.STATUS == 'unready') {
            CAPP_ASYNC_METHODS.init();
        }
        return {
            member_id: this.__sMemberId,
            name: this.__sName,
            nick_name: this.__sNickName,
            group_name: this.__sGroupName,
            group_no: this.__sGroupNo,
            email: this.__sEmail,
            phone: this.__sPhone,
            cellphone: this.__sCellphone,
            birthday: this.__sBirthday,
            board_write_name: this.__sBoardWriteName,
            additional_information: this.__sAdditionalInformation,
            created_date: this.__sCreatedDate
        };
    }
};

/**
 * 비동기식 데이터 - 예치금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Ordercnt');
CAPP_ASYNC_METHODS.Ordercnt = {
    __iOrderShppiedBeforeCount: null,
    __iOrderShppiedStandbyCount: null,
    __iOrderShppiedBeginCount: null,
    __iOrderShppiedComplateCount: null,
    __iOrderShppiedCancelCount: null,
    __iOrderShppiedExchangeCount: null,
    __iOrderShppiedReturnCount: null,

    __$target: EC$('#xans_myshop_orderstate_shppied_before_count'),
    __$target2: EC$('#xans_myshop_orderstate_shppied_standby_count'),
    __$target3: EC$('#xans_myshop_orderstate_shppied_begin_count'),
    __$target4: EC$('#xans_myshop_orderstate_shppied_complate_count'),
    __$target5: EC$('#xans_myshop_orderstate_order_cancel_count'),
    __$target6: EC$('#xans_myshop_orderstate_order_exchange_count'),
    __$target7: EC$('#xans_myshop_orderstate_order_return_count'),

    isUse: function()
    {
        if (EC$('.xans-myshop-orderstate').length > 0) {
            return true; 
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'ordercnt_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            var aData = EC_UTIL.parseJSON(decodeURIComponent(aCookieValue[1]));
            this.__iOrderShppiedBeforeCount = aData.shipped_before_count;
            this.__iOrderShppiedStandbyCount = aData.shipped_standby_count;
            this.__iOrderShppiedBeginCount = aData.shipped_begin_count;
            this.__iOrderShppiedComplateCount = aData.shipped_complate_count;
            this.__iOrderShppiedCancelCount = aData.order_cancel_count;
            this.__iOrderShppiedExchangeCount = aData.order_exchange_count;
            this.__iOrderShppiedReturnCount = aData.order_return_count;
            return true;
        }

        return false;
    },

    setData: function(aData)
    {
        this.__iOrderShppiedBeforeCount = aData['shipped_before_count'];
        this.__iOrderShppiedStandbyCount = aData['shipped_standby_count'];
        this.__iOrderShppiedBeginCount = aData['shipped_begin_count'];
        this.__iOrderShppiedComplateCount = aData['shipped_complate_count'];
        this.__iOrderShppiedCancelCount = aData['order_cancel_count'];
        this.__iOrderShppiedExchangeCount = aData['order_exchange_count'];
        this.__iOrderShppiedReturnCount = aData['order_return_count'];
    },

    execute: function()
    {
        this.__$target.html(this.__iOrderShppiedBeforeCount);
        this.__$target2.html(this.__iOrderShppiedStandbyCount);
        this.__$target3.html(this.__iOrderShppiedBeginCount);
        this.__$target4.html(this.__iOrderShppiedComplateCount);
        this.__$target5.html(this.__iOrderShppiedCancelCount);
        this.__$target6.html(this.__iOrderShppiedExchangeCount);
        this.__$target7.html(this.__iOrderShppiedReturnCount);
    },

    getData: function()
    {
        return {
            shipped_before_count: this.__iOrderShppiedBeforeCount,
            shipped_standby_count: this.__iOrderShppiedStandbyCount,
            shipped_begin_count: this.__iOrderShppiedBeginCount,
            shipped_complate_count: this.__iOrderShppiedComplateCount,
            order_cancel_count: this.__iOrderShppiedCancelCount,
            order_exchange_count: this.__iOrderShppiedExchangeCount,
            order_return_count: this.__iOrderShppiedReturnCount
        };
    }
};
/**
 * 비동기식 데이터 - 장바구니 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Basketcnt');
CAPP_ASYNC_METHODS.Basketcnt = {
    __iBasketCount: null,

    __$target: EC$('.xans-layout-orderbasketcount span a'),
    __$target2: EC$('#xans_myshop_basket_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_basket_cnt'),
    __$target4: EC$('.EC-Layout-Basket-count'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }
        if (this.__$target3.length > 0) {
            return true;
        }
        if (this.__$target4.length > 0) {
            return true;
        }

        if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('personal', EC_APPSCRIPT_SDK_DATA) > -1) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'basketcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iBasketCount = parseInt(aCookieValue[1], 10);
            return true;
        }
        
        return false;
    },

    setData: function(sData)
    {
        this.__iBasketCount = Number(sData);
    },

    execute: function()
    {
        this.__$target.html(this.__iBasketCount);

        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target2.html(this.__iBasketCount + '개');
        } else {
            this.__$target2.html(this.__iBasketCount);
        }

        this.__$target3.html(this.__iBasketCount);
        
        this.__$target4.html(this.__iBasketCount);
        
        if (this.__iBasketCount > 0 && this.__$target4.length > 0) {
            var $oCountDisplay = EC$('.EC-Layout_Basket-count-display');

            if ($oCountDisplay.length > 0) {
                $oCountDisplay.removeClass('displaynone');
            }
        }
    },

    getData: function()
    {
        return {
            count: this.__iBasketCount
        };
    }
};
/**
 * 비동기식 데이터 - 장바구니 금액
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Basketprice');
CAPP_ASYNC_METHODS.Basketprice = {
    __sBasketPrice: null,

    __$target: EC$('#xans_myshop_basket_price'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }

        if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('personal', EC_APPSCRIPT_SDK_DATA) > -1) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'basketprice_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__sBasketPrice = decodeURIComponent((aCookieValue[1]+ '').replace(/\+/g, '%20'));
            return true;
        }
        
        return false;
    },

    setData: function(sData)
    {
        this.__sBasketPrice = sData;
    },

    execute: function()
    {
        this.__$target.html(this.__sBasketPrice);
    },

    getData: function()
    {
        // 데이터 없는경우 0
        var sBasketPrice = (this.__sBasketPrice || 0) + '';

        return {
            basket_price: parseFloat(SHOP_PRICE_FORMAT.detachFormat(htmlentities.decode(sBasketPrice))).toFixed(2)
        };
    }
};
/*
 * 비동기식 데이터 - 장바구니 상품리스트
 */
CAPP_ASYNC_METHODS.aDatasetList.push('BasketProduct');
CAPP_ASYNC_METHODS.BasketProduct = {

    STORAGE_KEY: 'BasketProduct_' + EC_SDE_SHOP_NUM,

    __aData: null,

    __$target: EC$('.xans-layout-orderbasketcount span a'),
    __$target2: EC$('#xans_myshop_basket_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_basket_cnt'),
    __$target4: EC$('.EC-Layout-Basket-count'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }
        if (this.__$target3.length > 0) {
            return true;
        }
        if (this.__$target4.length > 0) {
            return true;
        }

        if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('personal', EC_APPSCRIPT_SDK_DATA) > -1) {
            return true;
        }
    },

    restoreCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return false;
        }

        var sSessionStorageData = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (sSessionStorageData === null) {
            return false;
        }

        try {
            this.__aData = [];
            var aStorageData = JSON.parse(sSessionStorageData);

            for (var iKey in aStorageData) {
                this.__aData.push(aStorageData[iKey]);
            }

            return true;
        } catch (e) {

            // 복구 실패시 캐시 삭제
            this.removeCache();

            return false;
        }
    },

    removeCache: function()
    {
        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }
        // 캐시 삭제
        window.sessionStorage.removeItem(this.STORAGE_KEY);
    },

    setData: function(oData)
    {
        this.__aData = oData;

        // sessionStorage 지원 여부 확인
        if (!window.sessionStorage) {
            return;
        }

        try {
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.getData()));
        } catch (error) {
        }
    },

    execute: function()
    {

    },

    getData: function()
    {
        var aStorageData = this.__aData;

        if (aStorageData != null) {
            var oNewStorageData = [];

            for (var iKey in aStorageData) {
                oNewStorageData.push(aStorageData[iKey]);
            }

            return oNewStorageData;
        } else {
            return false;
        }
    }
};
/**
 * 비동기식 데이터 - 쿠폰 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Couponcnt');
CAPP_ASYNC_METHODS.Couponcnt = {
    __iCouponCount: null,

    __$target: EC$('.xans-layout-myshopcouponcount'),
    __$target2: EC$('#xans_myshop_coupon_cnt'),
    __$target3: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_coupon_cnt'),
    __$target4: EC$('#xans_myshop_bankbook_coupon_cnt'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('promotion', EC_APPSCRIPT_SDK_DATA) > -1) {
                return true;
            }
        }

        return false;
    },
    
    restoreCache: function()
    {
        var sCookieName = 'couponcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iCouponCount = parseInt(aCookieValue[1], 10);
            return true;
        }
        
        return false;
    },
    setData: function(sData)
    {
        this.__iCouponCount = Number(sData);
    },

    execute: function()
    {
        this.__$target.html(this.__iCouponCount);

        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target2.html(this.__iCouponCount + '개');
        } else {
            this.__$target2.html(this.__iCouponCount);
        }

        this.__$target3.html(this.__iCouponCount);
        this.__$target4.html(this.__iCouponCount);
    },

    getData: function()
    {
        return {
            count: this.__iCouponCount
        };
    }
};
/**
 * 비동기식 데이터 - 적립금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Mileage');
CAPP_ASYNC_METHODS.Mileage = {
    __sAvailMileage: null,
    __sUsedMileage: null,
    __sTotalMileage: null,
    __sUnavailMileage: null,
    __sReturnedMileage: null,

    __$target: EC$('#xans_myshop_mileage'),
    __$target2: EC$('#xans_myshop_bankbook_avail_mileage, #xans_myshop_summary_avail_mileage'),
    __$target3: EC$('#xans_myshop_bankbook_used_mileage, #xans_myshop_summary_used_mileage'),
    __$target4: EC$('#xans_myshop_bankbook_total_mileage, #xans_myshop_summary_total_mileage'),
    __$target5: EC$('#xans_myshop_summary_unavail_mileage'),
    __$target6: EC$('#xans_myshop_summary_returned_mileage'),
    __$target7: EC$('#xans_myshop_avail_mileage'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if (this.__$target5.length > 0) {
                return true;
            }

            if (this.__$target6.length > 0) {
                return true;
            }

            if (this.__$target7.length > 0) {
                return true;
            }

            if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('customer', EC_APPSCRIPT_SDK_DATA) > -1) {
                return true;
            }
        }

        return false;
    },

    restoreCache: function()
    {
        // 특정 경로 룰의 경우 복구 취소
        if (PathRoleValidator.isInvalidPathRole()) {
            return false;
        }

        // 쿠키로부터 데이터 획득
        var sAvailMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_avail_mileage_' + EC_SDE_SHOP_NUM);
        var sReturnedMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_returned_mileage_' + EC_SDE_SHOP_NUM);
        var sUnavailMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_unavail_mileage_' + EC_SDE_SHOP_NUM);
        var sUsedMileage = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_used_mileage_' + EC_SDE_SHOP_NUM);

        // 데이터가 하나라도 없는경우 복구 실패
        if (sAvailMileage === null
            || sReturnedMileage === null
            || sUnavailMileage === null
            || sUsedMileage === null
        ) {
            return false;
        }

        // 전체 마일리지 계산
        var sTotalMileage = (parseFloat(sAvailMileage) +
            parseFloat(sUnavailMileage) +
            parseFloat(sUsedMileage)).toString();

        // 단위정보를 계산하여 필드에 셋
        this.__sAvailMileage = parseFloat(sAvailMileage).toFixed(2);
        this.__sReturnedMileage = parseFloat(sReturnedMileage).toFixed(2);
        this.__sUnavailMileage = parseFloat(sUnavailMileage).toFixed(2);
        this.__sUsedMileage = parseFloat(sUsedMileage).toFixed(2);
        this.__sTotalMileage = parseFloat(sTotalMileage).toFixed(2);

        return true;
    },

    setData: function(aData)
    {
        this.__sAvailMileage = parseFloat(aData['avail_mileage'] || 0).toFixed(2);
        this.__sUsedMileage = parseFloat(aData['used_mileage'] || 0).toFixed(2);
        this.__sTotalMileage = parseFloat(aData['total_mileage'] || 0).toFixed(2);
        this.__sUnavailMileage = parseFloat(aData['unavail_mileage'] || 0).toFixed(2);
        this.__sReturnedMileage = parseFloat(aData['returned_mileage'] || 0).toFixed(2);
    },

    execute: function()
    {
        this.__$target.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
        this.__$target2.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
        this.__$target3.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sUsedMileage));
        this.__$target4.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sTotalMileage));
        this.__$target5.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sUnavailMileage));
        this.__$target6.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sReturnedMileage));
        this.__$target7.html(SHOP_PRICE_FORMAT.toShopMileagePrice(this.__sAvailMileage));
    },

    getData: function()
    {
        return {
            available_mileage: this.__sAvailMileage,
            used_mileage: this.__sUsedMileage,
            total_mileage: this.__sTotalMileage,
            returned_mileage: this.__sReturnedMileage,
            unavailable_mileage: this.__sUnavailMileage
        };
    }
};
/**
 * 비동기식 데이터 - 예치금
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Deposit');
CAPP_ASYNC_METHODS.Deposit = {
    __sTotalDeposit: null,
    __sAllDeposit: null,
    __sUsedDeposit: null,
    __sRefundWaitDeposit: null,
    __sMemberTotalDeposit: null,

    __$target: EC$('#xans_myshop_deposit'),
    __$target2: EC$('#xans_myshop_bankbook_deposit'),
    __$target3: EC$('#xans_myshop_summary_deposit'),
    __$target4: EC$('#xans_myshop_summary_all_deposit'),
    __$target5: EC$('#xans_myshop_summary_used_deposit'),
    __$target6: EC$('#xans_myshop_summary_refund_wait_deposit'),
    __$target7: EC$('#xans_myshop_total_deposit'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }

            if (this.__$target4.length > 0) {
                return true;
            }

            if (this.__$target5.length > 0) {
                return true;
            }

            if (this.__$target6.length > 0) {
                return true;
            }

            if (this.__$target7.length > 0) {
                return true;
            }

            if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('customer', EC_APPSCRIPT_SDK_DATA) > -1) {
                return true;
            }
        }

        return false;
    },

    restoreCache: function()
    {
        // 특정 경로 룰의 경우 복구 취소
        if (PathRoleValidator.isInvalidPathRole()) {
            return false;
        }

        // 쿠키로부터 데이터 획득
        var sAllDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_all_deposit_' + EC_SDE_SHOP_NUM);
        var sUsedDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_used_deposit_' + EC_SDE_SHOP_NUM);
        var sRefundWaitDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_deposit_refund_wait_' + EC_SDE_SHOP_NUM);
        var sMemberTotalDeposit = CAPP_ASYNC_METHODS._getCookie('ec_async_cache_member_total_deposit_' + EC_SDE_SHOP_NUM);

        // 데이터가 하나라도 없는경우 복구 실패
        if (sAllDeposit === null
            || sUsedDeposit === null
            || sRefundWaitDeposit === null
            || sMemberTotalDeposit === null
        ) {
            return false;
        }

        // 사용 가능한 예치금 계산
        var sTotalDeposit = (parseFloat(sAllDeposit) -
            parseFloat(sUsedDeposit) -
            parseFloat(sRefundWaitDeposit)).toString();

        // 단위정보를 계산하여 필드에 셋
        this.__sTotalDeposit = parseFloat(sTotalDeposit).toFixed(2);
        this.__sAllDeposit = parseFloat(sAllDeposit).toFixed(2);
        this.__sUsedDeposit = parseFloat(sUsedDeposit).toFixed(2);
        this.__sRefundWaitDeposit = parseFloat(sRefundWaitDeposit).toFixed(2);
        this.__sMemberTotalDeposit = parseFloat(sMemberTotalDeposit).toFixed(2);

        return true;
    },

    setData: function(aData)
    {
        this.__sTotalDeposit = parseFloat(aData['total_deposit'] || 0).toFixed(2);
        this.__sAllDeposit = parseFloat(aData['all_deposit'] || 0).toFixed(2);
        this.__sUsedDeposit = parseFloat(aData['used_deposit'] || 0).toFixed(2);
        this.__sRefundWaitDeposit = parseFloat(aData['deposit_refund_wait'] || 0).toFixed(2);
        this.__sMemberTotalDeposit = parseFloat(aData['member_total_deposit'] || 0).toFixed(2);
    },

    execute: function()
    {
        this.__$target.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target2.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target3.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sTotalDeposit));
        this.__$target4.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sAllDeposit));
        this.__$target5.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sUsedDeposit));
        this.__$target6.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sRefundWaitDeposit));
        this.__$target7.html(SHOP_PRICE_FORMAT.toShopDepositPrice(this.__sMemberTotalDeposit));
    },

    getData: function()
    {
        return {
            total_deposit: this.__sTotalDeposit,
            used_deposit: this.__sUsedDeposit,
            refund_wait_deposit: this.__sRefundWaitDeposit,
            all_deposit: this.__sAllDeposit,
            member_total_deposit: this.__sMemberTotalDeposit
        };
    }
};
/**
 * 비동기식 데이터 - 위시리스트
 */
CAPP_ASYNC_METHODS.aDatasetList.push('WishList');
CAPP_ASYNC_METHODS.WishList = {
    STORAGE_KEY: 'localWishList' + EC_SDE_SHOP_NUM,
    __$targetWishIcon: EC$('.icon_img.ec-product-listwishicon'),
    __$targetWishList: EC$('.xans-myshop-wishlist'),
    __aWishList: null,
    __aTags_on: null,
    __aTags_off: null,

    isUse: function()
    {
        if (this.__$targetWishIcon.length > 0 || this.__$targetWishList.length > 0
        || CAPP_ASYNC_METHODS.EC_PATH_ROLE === 'PRODUCT_DETAIL') {
            return true;
        }
        return false;
    },

    restoreCache: function()
    {
        if (!window.sessionStorage) {
            return false;
        }

        var sSessionStorageData = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (sSessionStorageData === null) {
            return false;
        }

        var aStorageData = EC_UTIL.parseJSON(sSessionStorageData);
        if (this.__$targetWishList.length > 0 || aStorageData['isLogin'] !== CAPP_ASYNC_METHODS.IS_LOGIN) {
            this.clearStorage();
            return false;
        }

        var aWishList = aStorageData['wishList'];
        this.__aTags_on = aStorageData['on_tags'];
        this.__aTags_off = aStorageData['off_tags'];
        this.__aWishList = [];
        for (var i = 0; i < aWishList.length; i++) {
            var aTempWishList = [];
            aTempWishList.product_no = aWishList[i];
            this.__aWishList.push(aTempWishList);
        }
        return true;
    },

    setData: function(aData)
    {
        if (aData.hasOwnProperty('wishList') === false || aData.hasOwnProperty('on_tags') === false) {
            return;
        }

        this.__aWishList = aData.wishList;
        this.__aTags_on = aData.on_tags;
        this.__aTags_off = aData.off_tags;

        if (window.sessionStorage) {
            var aWishList = [];

            for (var i = 0; i < aData.wishList.length; i++) {
                aWishList.push(aData.wishList[i].product_no);
            }

            var oNewStorageData = {
                'wishList': aWishList,
                'on_tags': aData.on_tags,
                'off_tags': aData.off_tags,
                'isLogin': CAPP_ASYNC_METHODS.IS_LOGIN
            };

            if (typeof oNewStorageData !== 'undefined') {
                sessionStorage.setItem(this.STORAGE_KEY , JSON.stringify(oNewStorageData));
            }
        }
    },

    execute: function()
    {
        var aWishList = this.__aWishList;
        var aTagsOn = this.__aTags_on;
        var aTagsOff = this.__aTags_off;

        if (aWishList === null || typeof aWishList === 'undefined') {
            aWishList = [];
        }

        var oTarget = EC$('.ec-product-listwishicon');
        for (var sKey in aTagsOff) {
            oTarget.attr(sKey, aTagsOff[sKey]);
        }

        for (var i = 0; i < aWishList.length; i++) {
            assignAttribute(aWishList[i]);
        }

        /**
         * oTarget 엘레먼트에 aData의 정보를 어싸인함.
         * @param array aData 위시리스트 정보
         */
        function assignAttribute(aData)
        {
            var iProductNo = aData['product_no'];
            var oTarget = EC$('.ec-product-listwishicon[productno="'+iProductNo+'"]');

            // oTarget의 src, alt, icon_status attribute의 값을 할당
            for (var sKey in aTagsOn) {
                oTarget.attr(sKey, aTagsOn[sKey]);
            }
        }

    },

    /**
     * 세션스토리지 삭제
     */
    clearStorage: function()
    {
        if (!window.sessionStorage) {
            return;
        }
        window.sessionStorage.removeItem(this.STORAGE_KEY);
    },

    /**
     * sCommand에 따른 sessionStorage Set
     * @param iProductNo
     * @param sCommand 추가(add)/삭제(del) sCommand
     */
    setSessionStorageItem: function(iProductNo, sCommand)
    {
        if (this.isUse() === false) {
            return;
        }

        var oStorageData = EC_UTIL.parseJSON(sessionStorage.getItem(this.STORAGE_KEY));
        var aWishList = oStorageData['wishList'];
        var iLimit = 200;

        if (aWishList === null) {
            aWishList = [];
        }

        var iProductNo = parseInt(iProductNo, 10);
        var iIndex = aWishList.indexOf(iProductNo);

        if (sCommand === 'add') {
            if (aWishList.length >= iLimit) {
                aWishList.splice(aWishList.length - 1, 1);
            }
            if (iIndex < 0) {
                aWishList.unshift(iProductNo);
            }
        } else {
            if (iIndex > -1) {
                aWishList.splice(iIndex, 1);
            }
        }

        oStorageData['wishList'] = aWishList;
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(oStorageData));
    }
};

/**
 * 비동기식 데이터 - 관심상품 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Wishcount');
CAPP_ASYNC_METHODS.Wishcount = {
    __iWishCount: null,

    __$target: EC$('#xans_myshop_interest_prd_cnt'),
    __$target2: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_interest_prd_cnt'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        if (this.__$target2.length > 0) {
            return true;
        }

        if (typeof EC_APPSCRIPT_SDK_DATA !== "undefined" && EC$.inArray('personal', EC_APPSCRIPT_SDK_DATA) > -1) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'wishcount_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iWishCount = parseInt(aCookieValue[1], 10);
            return true;
        }

        return false;
    },

    setData: function(sData)
    {
        this.__iWishCount = Number(sData);
    },

    execute: function()
    {
        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target.html(this.__iWishCount + '개');
        } else {
            this.__$target.html(this.__iWishCount);
        }

        this.__$target2.html(this.__iWishCount);
    },

    getData: function()
    {
        return {
            count: this.__iWishCount
        };
    }
};
/**
 * 비동기식 데이터 - 최근 본 상품
 */
CAPP_ASYNC_METHODS.aDatasetList.push('recent');
CAPP_ASYNC_METHODS.recent = {
    STORAGE_KEY: 'localRecentProduct' + EC_SDE_SHOP_NUM,

    __$target: EC$('.xans-layout-productrecent'),

    __aData: null,

    isUse: function()
    {
        this.__$target.hide();

        if (this.__$target.find('.xans-record-').length > 0) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        this.__aData = [];

        var iTotalCount = CAPP_ASYNC_METHODS.RecentTotalCount.getData();
        if (iTotalCount == 0) {
            // 총 갯수가 없는 경우 복구할 것이 없으므로 복구한 것으로 리턴
            return true;
        }

        var sAdultImage = '';

        if (window.sessionStorage === undefined) {
            return false;
        }

        var sSessionStorageData = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (sSessionStorageData === null) {
            return false;
        }

        var iViewCount = EC_FRONT_JS_CONFIG_SHOP.recent_count;

        this.__aData = [];
        var aStorageData = EC_UTIL.parseJSON(sSessionStorageData);
        var iCount = 1;
        var bDispRecent = true;
        for (var iKey in aStorageData) {
            var sProductImgSrc = aStorageData[iKey].sImgSrc;

            if (isFinite(iKey) === false) {
                continue;
            }

            var aDataTmp = [];
            aDataTmp.recent_img = getImageUrl(sProductImgSrc);
            aDataTmp.name = aStorageData[iKey].sProductName;
            aDataTmp.disp_recent = true;
            aDataTmp.is_adult_product = aStorageData[iKey].isAdultProduct;
            aDataTmp.link_product_detail = aStorageData[iKey].link_product_detail;

            //aDataTmp.param = '?product_no=' + aStorageData[iKey].iProductNo + '&cate_no=' + aStorageData[iKey].iCateNum + '&display_group=' + aStorageData[iKey].iDisplayGroup;
            aDataTmp.param = filterXssUrlParameter(aStorageData[iKey].sParam);
            if (iViewCount < iCount) {
                bDispRecent = false;
            }
            aDataTmp.disp_recent = bDispRecent;

            iCount++;
            this.__aData.push(aDataTmp);
        }

        return true;

        /**
         * get SessionStorage image url
         * @param sNewImgUrl DB에 저장되어 있는 tiny값
         */
        function getImageUrl(sImgUrl)
        {
            if (typeof(sImgUrl) === 'undefined' || sImgUrl === null) {
                return;
            }
            var sNewImgUrl = '';

            if (sImgUrl.indexOf('http://') >= 0 || sImgUrl.indexOf('https://') >= 0 || sImgUrl.substr(0, 2) === '//') {
                sNewImgUrl = sImgUrl;
            } else {
                sNewImgUrl = EC_FRONT_JS_CONFIG_SHOP.cdnUrl + '/web/product/tiny/' + sImgUrl;
            }

            return sNewImgUrl;
        }

        /**
         * 파라미터 URL에서 XSS 공격 관련 파라미터를 필터링합니다. ECHOSTING-162977
         * @param string sParam 파라미터
         * @return string 필터링된 파라미터
         */
        function filterXssUrlParameter(sParam)
        {
            sParam = sParam || '';

            var sPrefix = '';
            if (sParam.substr(0, 1) === '?') {
                sPrefix = '?';
                sParam = sParam.substr(1);
            }

            var aParam = {};

            var aParamList = (sParam).split('&');
            EC$.each(aParamList, function() {
                var aMatch = this.match(/^([^=]+)=(.*)$/);
                if (aMatch) {
                    aParam[aMatch[1]] = aMatch[2];
                }
            });

            return sPrefix + EC$.param(aParam);
        }

    },

    setData: function(aData)
    {
        this.__aData = aData;

        // 쿠키엔 있지만 sessionStorage에 없는 데이터 복구
        if (window.sessionStorage) {

            var oNewStorageData = [];

            for (var i = 0; i < aData.length; i++) {
                if (aData[i].bNewProduct !== true) {
                    continue;
                }

                var aNewStorageData = {
                    'iProductNo': aData[i].product_no,
                    'sProductName': aData[i].name,
                    'sImgSrc': aData[i].recent_img,
                    'sParam': aData[i].param,
                    'link_product_detail': aData[i].link_product_detail
                };

                oNewStorageData.push(aNewStorageData);
            }

            if (oNewStorageData.length > 0) {
                sessionStorage.setItem(this.STORAGE_KEY , JSON.stringify(oNewStorageData));
            }
        }
    },

    execute: function()
    {
        var sAdult19Warning = EC_FRONT_JS_CONFIG_SHOP.adult19Warning;

        var aData = this.__aData;

        var aNodes = this.__$target.find('.xans-record-');
        var iRecordCnt = aNodes.length;
        var iAddedElementCount = 0;

        var aNodesParent = EC$(aNodes[0]).parent();
        for (var i = 0; i < aData.length; i++) {
            if (!aNodes[i]) {
                EC$(aNodes[iRecordCnt - 1]).clone().appendTo(aNodesParent);
                iAddedElementCount++;
            }
        }

        if (iAddedElementCount > 0) {
            aNodes = this.__$target.find('.xans-record-');
        }

        if (aData.length > 0) {
            this.__$target.show();
        }

        for (var i = 0; i < aData.length; i++) {
            assignVariables(aNodes[i], aData[i]);
        }

        // 종료 카운트 지정
        if (aData.length < aNodes.length) {
            iLength = aData.length;
            deleteNode();
        }

        recentBntInit(this.__$target);

        /**
         * 패치되지 않은 노드를 제거
         */
        function deleteNode()
        {
            for (var i = iLength; i < aNodes.length; i++) {
                EC$(aNodes[i]).remove();
            }
        }

        /**
         * oTarget 엘레먼트에 aData의 변수를 어싸인합니다.
         * @param Element oTarget 변수를 어싸인할 엘레먼트
         * @param array aData 변수 데이터
         */
        function assignVariables(oTarget, aData)
        {
            var recentImage = aData.recent_img;

            if (sAdult19Warning === 'T' && CAPP_ASYNC_METHODS.member.getMemberIsAdult() === 'F' && aData.is_adult_product === 'T') {
                    recentImage = EC_FRONT_JS_CONFIG_SHOP.adult19BaseTinyImage;
            }

            var $oTarget = EC$(oTarget);

            var sHtml = $oTarget.html();

            sHtml = sHtml.replace('about:blank', recentImage)
                         .replace('##param##', aData.param)
                         .replace('##name##',aData.name)
                         .replace('##link_product_detail##', aData.link_product_detail);
            $oTarget.html(sHtml);

            if (aData.disp_recent === true) {
                $oTarget.removeClass('displaynone');
            }
        }

        function recentBntInit($target)
        {
            // 화면에 뿌려진 갯수
            var iDisplayCount = 0;
            // 보여지는 style
            var sDisplay = '';
            var iIdx = 0;
            //
            var iDisplayNoneIdx = 0;

            var nodes = $target.find('.xans-record-').each(function()
            {
                sDisplay = EC$(this).css('display');
                if (sDisplay != 'none') {
                    iDisplayCount++;
                } else {
                    if (iDisplayNoneIdx == 0) {
                        iDisplayNoneIdx = iIdx;
                    }

                }
                iIdx++;
            });

            var iRecentCount = nodes.length;
            var bBtnActive = iDisplayCount > 0;
            EC$('.xans-layout-productrecent .prev').off('click').click(function()
            {
                if (bBtnActive !== true) return;
                var iFirstNode = iDisplayNoneIdx - iDisplayCount;
                if (iFirstNode == 0 || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 첫번째 상품입니다.'));
                    return;
                } else {
                    iDisplayNoneIdx--;
                    EC$(nodes[iDisplayNoneIdx]).hide();
                    EC$(nodes[iFirstNode - 1]).removeClass('displaynone');
                    EC$(nodes[iFirstNode - 1]).fadeIn('fast');

                }
            }).css(
            {
                cursor: 'pointer'
            });

            EC$('.xans-layout-productrecent .next').off('click').click(function()
            {
                if (bBtnActive !== true) return;
                if ((iRecentCount) == iDisplayNoneIdx || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 마지막 상품입니다.'));
                } else {
                    EC$(nodes[iDisplayNoneIdx]).fadeIn('fast');
                    EC$(nodes[iDisplayNoneIdx]).removeClass('displaynone');
                    EC$(nodes[ (iDisplayNoneIdx - iDisplayCount)]).hide();
                    iDisplayNoneIdx++;
                }
            }).css(
            {
                cursor: 'pointer'
            });

        }

    }
};

/**
 * 비동기식 데이터 - 최근본상품 총 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('RecentTotalCount');
CAPP_ASYNC_METHODS.RecentTotalCount = {
    __iRecentCount: null,

    __$target: CAPP_ASYNC_METHODS.$xansMyshopMain.find('.xans_myshop_main_recent_cnt'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }

        return false;
    },

    restoreCache: function()
    {
        var sCookieName = 'recent_plist';
        if (EC_SDE_SHOP_NUM > 1) {
            sCookieName = 'recent_plist' + EC_SDE_SHOP_NUM;
        }
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iRecentCount = decodeURI(aCookieValue[1]).split('|').length;
        } else {
            this.__iRecentCount = 0;
        }
    },

    execute: function()
    {
        this.__$target.html(this.__iRecentCount);
    },

    getData: function()
    {
        if (this.__iRecentCount === null) {
            // this.isUse값이 false라서 복구되지 않았는데 이 값이 필요한 경우 복구
            this.restoreCache();
        }

        return this.__iRecentCount;
    }
};
/**
 * 비동기식 데이터 - 주문정보
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Order');
CAPP_ASYNC_METHODS.Order = {
    __iOrderCount: null,
    __iOrderTotalPrice: null,
    __iGradeIncreaseValue: null,

    __$target: EC$('#xans_myshop_bankbook_order_count'),
    __$target2: EC$('#xans_myshop_bankbook_order_price'),
    __$target3: EC$('#xans_myshop_bankbook_grade_increase_value'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }

            if (this.__$target2.length > 0) {
                return true;
            }

            if (this.__$target3.length > 0) {
                return true;
            }
        }
        
        return false;        
    },

    restoreCache: function()
    {
        var sCookieName = 'order_' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            var aData = EC_UTIL.parseJSON(decodeURIComponent(aCookieValue[1]));
            this.__iOrderCount = aData.total_order_count;
            this.__iOrderTotalPrice = aData.total_order_price;
            this.__iGradeIncreaseValue = Number(aData.grade_increase_value);
            return true;
        }

        return false;
    },

    setData: function(aData)
    {
        this.__iOrderCount = aData['total_order_count'];
        this.__iOrderTotalPrice = aData['total_order_price'];
        this.__iGradeIncreaseValue = Number(aData['grade_increase_value']);
    },

    execute: function()
    {
        this.__$target.html(this.__iOrderCount);
        this.__$target2.html(this.__iOrderTotalPrice);
        this.__$target3.html(this.__iGradeIncreaseValue);
    },

    getData: function()
    {
        return {
            total_order_count: this.__iOrderCount,
            total_order_price: this.__iOrderTotalPrice,
            grade_increase_value: this.__iGradeIncreaseValue
        };
    }
};
/**
 * 비동기식 데이터 - Benefit
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Benefit');
CAPP_ASYNC_METHODS.Benefit = {
    __aBenefit: null,
    __$target: EC$('.xans-myshop-asyncbenefit'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }
        }

        return false;
    },

    setData: function(aData)
    {
        this.__aBenefit = aData;
    },

    execute: function()
    {
        var aFilter = ['group_image_tag', 'group_icon_tag', 'display_no_benefit', 'display_with_all', 'display_mobile_use_dc', 'display_mobile_use_mileage'];
        var __aData = this.__aBenefit;
        
        // 그룹이미지
        EC$('.myshop_benefit_group_image_tag').attr({alt: __aData['group_name'], src: __aData['group_image']});

        // 그룹아이콘
        EC$('.myshop_benefit_group_icon_tag').attr({alt: __aData['group_name'], src: __aData['group_icon']});

        if (__aData['display_no_benefit'] === true) {
            EC$('.myshop_benefit_display_no_benefit').removeClass('displaynone').show();
        }
        
        if (__aData['display_with_all'] === true) {
            EC$('.myshop_benefit_display_with_all').removeClass('displaynone').show();
        }
        
        if (__aData['display_mobile_use_dc'] === true) {
            EC$('.myshop_benefit_display_mobile_use_dc').removeClass('displaynone').show();
        } 
        
        if (__aData['display_mobile_use_mileage'] === true) {
            EC$('.myshop_benefit_display_mobile_use_mileage').removeClass('displaynone').show();
        }

        EC$.each(__aData, function(key, val) {
            if (EC$.inArray(key, aFilter) === -1) {
                EC$('.myshop_benefit_' + key).html(val);
            }
        });
    }    
};
/**
 * 비동기식 데이터 - 비동기장바구니 레이어
 */
CAPP_ASYNC_METHODS.aDatasetList.push('BasketLayer');
CAPP_ASYNC_METHODS.BasketLayer = {
    __sBasketLayerHtml: null,
    __$target: document.getElementById('ec_async_basket_layer_container'),

    isUse: function()
    {
        if (this.__$target !== null) {
            return true;
        }
        return false;
    },

    execute: function()
    {
        EC$.ajax({
            url: '/order/async_basket_layer.html?__popupPage=T',
            async: false,
            success: function(data) {
                var sBasketLayerHtml = data;
                var sBasketLayerStyle = '';
                var sBasketLayerBody = '';

                sBasketLayerHtml = sBasketLayerHtml.replace(/<script([\s\S]*?)<\/script>/gi,''); // 스크립트 제거
                sBasketLayerHtml = sBasketLayerHtml.replace(/<link([\s\S]*?)\/>/gi,''); // 옵티마이져 제거

                var regexStyle = /<style([\s\S]*?)<\/style>/; // Style 추출
                if (regexStyle.exec(sBasketLayerHtml) != null) sBasketLayerStyle = regexStyle.exec(sBasketLayerHtml)[0];

                var regexBody = /<body[\s\S]*?>([\s\S]*?)<\/body>/; // Body 추출
                if (regexBody.exec(sBasketLayerHtml) != null) sBasketLayerBody = regexBody.exec(sBasketLayerHtml)[1];

                CAPP_ASYNC_METHODS.BasketLayer.__sBasketLayerHtml = sBasketLayerStyle + sBasketLayerBody;
            }
        });
        this.__$target.innerHTML = this.__sBasketLayerHtml;
    }
};
/**
 * 비동기식 데이터 - Benefit
 */
CAPP_ASYNC_METHODS.aDatasetList.push('Grade');
CAPP_ASYNC_METHODS.Grade = {
    __aGrade: null,
    __$target: EC$('#sGradeAutoDisplayArea'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }
        }

        return false;
    },

    setData: function(aData)
    {
        this.__aGrade = aData;
    },

    execute: function()
    {
        var __aData = this.__aGrade;
        var aFilter = ['bChangeMaxTypePrice', 'bChangeMaxTypePriceAndCount', 'bChangeMaxTypePriceOrCount', 'bChangeMaxTypeCount'];

        var aMaxDisplayJson = {
            "bChangeMaxTypePrice": [
                {"sId": "sChangeMaxTypePriceArea"}
            ],
            "bChangeMaxTypePriceAndCount": [
                {"sId": "sChangeMaxTypePriceAndCountArea"}
            ],
            "bChangeMaxTypePriceOrCount": [
                {"sId": "sChangeMaxTypePriceOrCountArea"}
            ],
            "bChangeMaxTypeCount": [
                {"sId": "sChangeMaxTypeCountArea"}
            ]
        };

        if (EC$('.sNextGroupIconArea').length > 0) {
            if (__aData['bDisplayNextGroupIcon'] === true) {
                EC$('.sNextGroupIconArea').removeClass('displaynone').show();
                EC$('.myshop_benefit_next_group_icon_tag').attr({alt: __aData['sNextGrade'], src: __aData['sNextGroupIcon']});
            } else {
                EC$('.sNextGroupIconArea').addClass('displaynone');
            }
        }

        var sIsAutoGradeDisplay = "F";
        EC$.each(__aData, function(key, val) {
            if (EC$.inArray(key, aFilter) === -1) {
                return true;
            }
            if (val === true) {
                if (EC$('#'+aMaxDisplayJson[key][0].sId).length > 0) {
                    EC$('#' + aMaxDisplayJson[key][0].sId).removeClass('displaynone').show();
                }
                sIsAutoGradeDisplay = "T";
            }
        });
        if (sIsAutoGradeDisplay == "T" && EC$('#sGradeAutoDisplayArea .sAutoGradeDisplay').length > 0) {
            EC$('#sGradeAutoDisplayArea .sAutoGradeDisplay').addClass('displaynone');
        }

        EC$.each(__aData, function(key, val) {
            if (EC$.inArray(key, aFilter) === -1) {
                if (EC$('.xans-member-var-' + key).length > 0) {
                    EC$('.xans-member-var-' + key).html(val);
                }
            }
        });
    }    
};
/**
 * 비동기식 데이터 - Benefit
 */
CAPP_ASYNC_METHODS.aDatasetList.push('AutomaticGradeShow');
CAPP_ASYNC_METHODS.AutomaticGradeShow = {
    __aGrade: null,
    __$target: EC$('#sAutomaticGradeShowArea'),

    isUse: function()
    {
        if (CAPP_ASYNC_METHODS.IS_LOGIN === true) {
            if (this.__$target.length > 0) {
                return true;
            }
        }
        return false;
    },

    setData: function(aData)
    {
        this.__aGrade = aData;
    },

    execute: function()
    {
        var __aData = this.__aGrade;

        /**
         * 아이콘 표기 제외
        if (EC$('.sNextGroupIconArea').length > 0) {
            if (__aData['bDisplayNextGroupIcon'] === true) {
                EC$('.sNextGroupIconArea').removeClass('displaynone').show();
                EC$('.myshop_benefit_next_group_icon_tag').attr({alt: __aData['sNextGrade'], src: __aData['sNextGroupIcon']});
            } else {
                EC$('.sNextGroupIconArea').addClass('displaynone');
            }
        }
         */

        var sIsAutoGradeDisplay = "F";
        EC$.each(__aData, function(key, val) {
            if (val === true) {
                sIsAutoGradeDisplay = "T";
                return false;
            }
        });
        if (sIsAutoGradeDisplay == "T" && EC$('#sAutomaticGradeShowArea .sAutoGradeDisplay').length > 0) {
            EC$('#sAutomaticGradeShowArea .sAutoGradeDisplay').addClass('displaynone');
        }

        EC$.each(__aData, function(key, val) {
            if (EC$('.xans-member-var-' + key).length > 0) {
                EC$('.xans-member-var-' + key).html(val);
            }
        });
    }    
};
/**
 * 비동기식 데이터 - 비동기장바구니 레이어
 */
CAPP_ASYNC_METHODS.aDatasetList.push('MobileMutiPopup');
CAPP_ASYNC_METHODS.MobileMutiPopup = {
    __$target: EC$('div[class^="ec-async-multi-popup-layer-container"]'),

    isUse: function()
    {
        if (this.__$target.length > 0) {
            return true;
        }
        return false;
    },

    execute: function()
    {
        for (var i=0; i < this.__$target.length; i++) {
            EC$.ajax({
                url: '/exec/front/popup/AjaxMultiPopup?index='+i,
                data: EC_ASYNC_MULTI_POPUP_OPTION[i],
                dataType: "json",
                success: function (oResult) {
                    switch (oResult.code) {
                        case '0000' :
                            if (oResult.data.length < 1) {
                                break;
                            }
                            EC$('.ec-async-multi-popup-layer-container-' + oResult.data.html_index).html(oResult.data.html_text);
                            if (oResult.data.type == 'P') {
                                BANNER_POPUP_OPEN.setPopupSetting();
                                BANNER_POPUP_OPEN.setPopupWidth();
                                BANNER_POPUP_OPEN.setPopupClose();
                            } else {
                                /**
                                 * 이중 스크롤 방지 클래스 추가(비동기) 
                                 *
                                 */
                                EC$('body').addClass('eMobilePopup');
                                EC$('body').width('100%');

                                BANNER_POPUP_OPEN.setFullPopupSetting();
                                BANNER_POPUP_OPEN.setFullPopupClose();
                            }
                            break;
                        default :
                            break;
                    }
                },
                error: function () {
                }
            });
        }
    }
};
/**
 * 비동기식 데이터 - 좋아요 상품 갯수
 */
CAPP_ASYNC_METHODS.aDatasetList.push('MyLikeProductCount');
CAPP_ASYNC_METHODS.MyLikeProductCount = {
    __iMyLikeCount: null,

    __$target: EC$('#xans_myshop_like_prd_cnt'),
    __$target_main: EC$('#xans_myshop_main_like_prd_cnt'),
    isUse: function()
    {
        if (this.__$target.length > 0 && SHOP.getLanguage() === 'ko_KR') {
            return true;
        }

        if (this.__$target_main.length > 0 && SHOP.getLanguage() === 'ko_KR') {
            return true;
        }

        return false;
    },
    restoreCache: function()
    {
        var sCookieName = 'like_product_cnt' + EC_SDE_SHOP_NUM;
        var re = new RegExp('(?:^| |;)' + sCookieName + '=([^;]+)');
        var aCookieValue = document.cookie.match(re);
        if (aCookieValue) {
            this.__iMyLikeCount = parseInt(aCookieValue[1], 10);
            return true;
        }

        return false;
    },

    setData: function(sData)
    {
        this.__iMyLikeCount = Number(sData);
    },

    execute: function()
    {
        if (SHOP.getLanguage() === 'ko_KR') {
            this.__$target.html(this.__iMyLikeCount + '개');
            this.__$target_main.html(this.__iMyLikeCount);
        }
    }
};
