var app = angular.module('test', []);


  app.directive('creditcard', function(){
  	return{
  		scope: true,
  		transclude: true,
  		templateUrl: 'templates/creditcardform.html',
  		controller: function($scope, $http){
  			var braintree = Braintree.create(BRAINTREE_KEY);

   			$scope.click = function(){

  				var param = new Object();
  				param.number = $('#number').val();

  				console.log (param.number);

  				param.number = braintree.encrypt(param.number);
  				param.amount = $('#amount').val();
  				param.month = $('#month').val();
  				param.year = $('#year').val();
  				param.cvv = braintree.encrypt($('#cvv').val())

  				send = new Object();
				send.params = param;	//make an object of the object

  				console.log (param.number);

  				event.preventDefault();
  				form = $('#braintree-payment-form');
  				var amount = $('#amount').val();

  				if ( (!$.isNumeric(amount) ) || (parseInt(amount) < 5)) {
  					$("#erroramount").html("Invalid Amount");
  					return;
  				}

  				$("#submit").attr("disabled", "disabled");

  				$http.get(form.attr('action'), send).success(function (data) {
  					form.parent().replaceWith(data);
  				});


  			};
  		}
  	}
  });