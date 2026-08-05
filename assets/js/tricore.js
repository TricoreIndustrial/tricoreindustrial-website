document.addEventListener("DOMContentLoaded", () => {
	/* ==================================================
	   NAVBAR GLASS STATE
	================================================== */

	const updateNavbar = () => {
		document.body.classList.toggle(
			"scrolled",
			window.scrollY > 50
		);
	};

	updateNavbar();

	window.addEventListener("scroll", updateNavbar, {
		passive: true
	});

	/* ==================================================
	   SCROLL REVEAL
	================================================== */

	const revealElements = document.querySelectorAll(".reveal");

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -50px 0px"
			}
		);

		revealElements.forEach((element) => {
			revealObserver.observe(element);
		});
	} else {
		revealElements.forEach((element) => {
			element.classList.add("is-visible");
		});
	}

	/* ==================================================
	   ACTIVE NAVIGATION LINK
	================================================== */

	const navLinks = document.querySelectorAll(
		"#nav ul.links a[href^='#']"
	);

	const sections = Array.from(navLinks)
		.map((link) => {
			const target = document.querySelector(
				link.getAttribute("href")
			);

			return target
				? {
					link,
					item: link.closest("li"),
					target
				}
				: null;
		})
		.filter(Boolean);

	const setActiveLink = (activeSection) => {
		sections.forEach((section) => {
			section.item.classList.toggle(
				"active",
				section === activeSection
			);
		});
	};

	const updateActiveNavigation = () => {
		const referencePoint = window.scrollY + 180;

		let currentSection = sections[0];

		sections.forEach((section) => {
			if (section.target.offsetTop <= referencePoint) {
				currentSection = section;
			}
		});

		setActiveLink(currentSection);
	};

	updateActiveNavigation();

	window.addEventListener(
		"scroll",
		updateActiveNavigation,
		{
			passive: true
		}
	);
});