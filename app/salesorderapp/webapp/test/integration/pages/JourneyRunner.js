sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"salesorderapp/test/integration/pages/SalesorderList",
	"salesorderapp/test/integration/pages/SalesorderObjectPage"
], function (JourneyRunner, SalesorderList, SalesorderObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('salesorderapp') + '/test/flp.html#app-preview',
        pages: {
			onTheSalesorderList: SalesorderList,
			onTheSalesorderObjectPage: SalesorderObjectPage
        },
        async: true
    });

    return runner;
});

