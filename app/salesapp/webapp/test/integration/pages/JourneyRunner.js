sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"salesapp/test/integration/pages/SalesNumberList",
	"salesapp/test/integration/pages/SalesNumberObjectPage",
	"salesapp/test/integration/pages/salesitemsObjectPage"
], function (JourneyRunner, SalesNumberList, SalesNumberObjectPage, salesitemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('salesapp') + '/test/flp.html#app-preview',
        pages: {
			onTheSalesNumberList: SalesNumberList,
			onTheSalesNumberObjectPage: SalesNumberObjectPage,
			onThesalesitemsObjectPage: salesitemsObjectPage
        },
        async: true
    });

    return runner;
});

