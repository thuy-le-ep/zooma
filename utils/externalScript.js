export function loadScript(src, element, className) {
	return new Promise(resolve => {
		var scriptElement = document.createElement('script');
		scriptElement.type = "text/javascript";

		if (scriptElement.readyState) {
			//IE
			scriptElement.onreadystatechange = function () {
				if (scriptElement.readyState === "loaded" || scriptElement.readyState === "complete") {
					scriptElement.onreadystatechange = null;
					resolve('loaded');
				}
			};
		} else {
			//Other browsers: Chrome, Firefox, Edge, Safari...
			scriptElement.onload = function () {
				resolve('loaded');
			};
		}

		scriptElement.src = src;
		if (className)
			scriptElement.className = className
		element.appendChild(scriptElement);
	});
}

export async function loadExternalScript(element) {
	await loadScript("/static/js/jquery-3.1.1.min.js", element)
	await loadScript("/static/js/jquery-ui.min.js", element)
	await loadScript("/static/js/bootstrap.min.js", element)
	await loadScript("/static/js/material.min.js", element)
	await loadScript("/static/js/perfect-scrollbar.jquery.min.js", element)
	// <!-- Forms Validations Plugin -->
	await loadScript("/static/js/jquery.validate.min.js", element)
	// <!-- Select Plugin -->
	await loadScript("/static/js/jquery.select-bootstrap.js", element)
	// <!--  Notifications Plugin -->
	await loadScript("/static/js/bootstrap-notify.js", element)
	// < !--Material Dashboard javascript methods-- >
	await loadScript("/static/js/material-dashboard.js", element)
	// < !--Material Dashboard DEMO methods, don't include it in your project! -->
	await loadScript("/static/js/demo.js", element)
}