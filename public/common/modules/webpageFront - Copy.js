var webpagesModule = angular.module('ghangout.webPage', ['pascalprecht.translate', 'ngSanitize']);
webpagesModule.config(function ($translateProvider) {
	$translateProvider.useSanitizeValueStrategy("sanitizeParameters");
	 
app.config(['$translateProvider', function ($translateProvider) {
  // add translation table
  $translateProvider
    .preferredLanguage('en')
	.translations('ar', {
		'Our Mission': 'مهمتنا',
		'Our Vision': 'رؤيتنا',
		'Upload Image': 'تحميل الصور',
		'About Gathering': 'حول جمع',
		'Edit WebPages': 'تعديل ص�?حات الويب',
		'Home': 'الص�?حة الرئيسية',
		'About Us': 'معلومات عنا',
		'Join Gathering Family': 'تاريخ جمع الأسرة',
		'Our Clients': 'عملائنا',
		'Contact Us': 'اتصل بنا',
		'FAQs': '�?اقس',
		'GATHERING': 'جمع',
		'Behind every gathering is a great story': 'وراء كل تجمع قصة عظيمة',
		'Know About Us': 'تعر�? عنا',
		'Our': 'لنا',
		'Mission': 'مهمة',
		'Vision': 'رؤية',
		'about': 'حول',
		'Who We Are': 'من نحن',
		'Gathering': 'جمع',
		'Join': 'انضم',
		'Creative': 'خلاق',
		'Join our Creative Community': 'انضم إلى مجتمعنا الإبداعي',
		'Registration form': 'إستمارة تسجيل',
		'Service Provider Registration': 'تسجيل مقدم الخدمة',
		'Service': 'الخدمات',
		'Provider': 'مزود',
		'Us': 'لنا',
		'Join Gathering': 'الانضمام إلى التجمع',
		'Service Provider Questions': 'أسئلة مقدم الخدمة',
		'&copy; 2017 - All rights reserved.': '&نسخ؛ 2017 - جميع الحقوق مح�?وظة.',
		'Close': 'قريب',
		'Frequently asked Instead of what we write about' : 'كثيرا ما يطلب بدلا من ما نكتب عنه',
		'See more Clients' : 'عرض المزيد من العملاء',
		'Number of Stores and Event planner companies' : 'عدد من المتاجر وشركات مخطط الحدث',
		'Happy Customers' : 'الزبائن سعداء',
		'Say Hello!' : 'قل مرحبا!',
		'Recommendation, Complaint, Question or Thought' : 'توصية، شكوى، سؤال أو �?كر',
		'Recommendation, Complaint, Question' : 'توصية، شكوى، سؤال',
		'Technical Problem' : 'مشكلة �?نية',
		'Have a comment or question? We love to hear form our customers!' : 'هل لديك تعليق أو سؤال؟ نحن نحب أن نسمع شكل عملائنا!',
		'Our Showcase' : 'لدينا معرض',
		'ABOUT' : 'حول',
		'Join Us' : 'انضم إلينا',
		'Contact' : 'اتصل',
		'Customers Questions':'أسئلة العملاء',
		'copy; 2017 - All rights reserved.' : 'نسخ؛ 2017 - جميع الحقوق مح�?وظة.'
			
	})
	}]);
});
webpagesModule.service('webPages', function ($http) {

	return {
		all: function () {
			return $http.get('/api/webPages').then(function (webList) {
				return webList.data;
			});
		}
        };
        });



