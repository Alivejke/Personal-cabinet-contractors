module.exports = function () {
	return {
		restrict : 'A',
		link : function($scope, $iElement, $iAttrs) {
			var isActive = false;
			$iElement.on('click', function () {
				isActive = !isActive;
				$iElement.toggleClass('active', isActive);
			})
		}
	}
}