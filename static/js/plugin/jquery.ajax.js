'use strict';
/*class UserException {
	constructor(code = "10", msg = "Error") {
		this.code = code;
		this.msg = msg;
	}
}*/
function UserException(code, msg, result) {
	this.code = code || "10";
	this.message = msg || "Error";
	this.result = result || "";
}

var ajax = (function($) {
	'use strict';
	
	function loading() {
		console.log('ajax loading');
		$('body').addClass("loading");
		//$('.loadingWrap').css('display', '');
	}
	
	function unloading() {
		console.log('ajax unloading');
		$('body').removeClass("loading");
		//$('.loadingWrap').css('display', 'none');
	}
	
	function errorCodeCheck(xhr) {
    	if (xhr.status == '403') {
    		alert('로그인 후 이용가능한 메뉴입니다.');
    		location.href='/member/login.do';
    		return true;
    	}
    	
    	return false;
	}
	
	return {
		/**
		 * ajax get 요청
		 * @param url
		 * @param params
		 * @param dataType
		 * @returns Promise
		 */
		get: function(url, params, isLoading) {
			if (isLoading == true) {
				loading();
			}
			if (_.isEmpty(params)) params = {};
			return new Promise(function(resolve, reject) {
	        	$.ajax({
	                type: "get",
	                dataType: "json",
	                contentType: "application/json",
	                data: params,
	                url: url,
	                cache: false,
	                success: function(data) {
	                	if (data.resultCode == "00")
	                		resolve(data);
	                	else
	                		reject(new UserException(data.resultCode, data.resultMsg, data.result));
	                },
	                error: function(xhr, textStatus, errorThrown) {
	                	if (errorCodeCheck(xhr)) return;
	                	reject(new UserException(xhr.status, errorThrown));
	                },
	            });
			}).finally(function() {
				if (isLoading == true) {
					unloading();
				}
			});
		},
		/**
		 * ajax post 요청
		 * @param url
		 * @param params
		 * @param dataType
		 * @returns Promise
		 */
		post: function(url, params, isLoading) {
			if (isLoading == true) {
				loading();
			}
			if (_.isEmpty(params)) params = {};
			return new Promise(function(resolve, reject) {
	        	$.ajax({
	                type: "post",
	                dataType: "json",
	                data: JSON.stringify(params),
	                contentType: "application/json",
	                url: url,
	                cache: false,
	                success: function(data) {
	                	if (data.resultCode == "00")
	                		resolve(data);
	                	else
	                		reject(new UserException(data.resultCode, data.resultMsg, data.result));
	                },
	                error: function(xhr, textStatus, errorThrown) {
	                	if (errorCodeCheck(xhr)) return;
	                	reject(new UserException(textStatus, errorThrown));
	                },
	            });
			}).finally(function() {
				if (isLoading == true) {
					unloading();
				}
			});
		},
		/**
		 * ajax post form 요청
		 * @param url
		 * @param params
		 * @param dataType
		 * @returns Promise
		 */
		postForm: function(url, params, isLoading) {
			if (isLoading == true) {
				loading();
			}
			if (_.isEmpty(params)) params = {};
			return new Promise(function(resolve, reject) {
	        	$.ajax({
	                type: "post",
	                data: params,
	                url: url,
	                cache: false,
	                success: function(data) {
	                	if (data.resultCode == "00")
	                		resolve(data);
	                	else
	                		reject(new UserException(data.resultCode, data.resultMsg));
	                },
	                error: function(xhr, textStatus, errorThrown) {
	                	if (errorCodeCheck(xhr)) return;
	                	reject(new UserException(textStatus, errorThrown));
	                },
	            });
			}).finally(function() {
				if (isLoading == true) {
					unloading();
				}
			});
		},
		
		/**
		 * ajax post formData
		 * @param url
		 * @param params
		 * @param dataType
		 * @returns Promise
		 */
		postFormData: function(url, formData, isLoading) {
			if (isLoading == true) {
				loading();
			}
			return new Promise(function(resolve, reject) {
	        	$.ajax({
	                type: "post",
	                data: formData,
	                enctype: "multipart/form-data",
	                url: url,
	                cache: false,
	                success: function(data) {
	                	if (data.resultCode == "00")
	                		resolve(data);
	                	else
	                		reject(new UserException(data.resultCode, data.resultMsg));
	                },
	                error: function(xhr, textStatus, errorThrown) {
	                	if (errorCodeCheck(xhr)) return;
	                	reject(new UserException(textStatus, errorThrown));
	                },
	            });
			}).finally(function() {
				if (isLoading == true) {
					unloading();
				}
			});
		},
		/**
		 * ajax 동시 요청
		 * @param promises
		 * @returns Promise
		 */
		all: function(promises) {
			return Promise.all(arguments);
		},
		/**
		 * ajax post 요청(form 데이터 전송)
		 * @param url
		 * @param formId
		 * @param type
		 * @param dataType
		 * @returns Promise
		 */
		submit: function(url, formId, type, dataType) {
			return new Promise(function(resolve, reject) {
				var options = {
					type: type || "post",
					dataType: dataType || "json",
					url: url,
	                cache: false,
					success: function (data) {
						if (data.resultCode == "00")
							resolve(data);
						else
							reject(new UserException(data.resultCode, data.resultMsg));
	                },
					error: function(xhr, textStatus, errorThrown) {
						reject(new UserException(textStatus, errorThrown));
	                },
			    };
			    $("#"+formId).ajaxSubmit(options);
			});
		},
		/**
		 * ajax file upload 요청(form 데이터 전송)
		 * @param url
		 * @param formId
		 * @param progressEvent
		 * @returns Promise
		 */
		upload: function(url, formId, progressEvent) {
			return new Promise(function(resolve, reject) {
				var options = {
			        type: "post",
			        dataType: "json",
			        url: url,
	                cache: false,
			        xhr: function() {
			        	// change xhr
			        	var xhr = $.ajaxSettings.xhr();
			        	// progress event listener
			        	xhr.upload.onprogress = progress;
			        	return xhr;
			        },
					success: function (data) {
						if (data.resultCode == "00")
							resolve(data);
						else
							reject(new UserException(data.resultCode, data.resultMsg));
	                },
					error: function(xhr, textStatus, errorThrown) {
						reject(new UserException(textStatus, errorThrown));
	                },
			    };
			    $("#"+formId).ajaxSubmit(options);
			});
		},
		
		loading: loading,
		unloading: unloading
	}
}(jQuery));

