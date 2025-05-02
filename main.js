var themeButton = document.querySelector('.theme-button');

// themeButton.onclick = function() {
//   themeButton.classList.toggle('active');
//   document.body.classList.toggle("dark-mode");


//   // Find the image element within the theme button
//   const themeIcon = themeButton.querySelector('img');
  

//   // Check if the button has the 'active' class and update the image source
//   if (themeButton.classList.contains('active')) {
//     themeIcon.src = 'static/images/sun.png';  // Path to the sun image when active (light mode)
//   } else {
//     themeIcon.src = 'static/images/moon.png';  // Path to the moon image when inactive (dark mode)
//   }

//   // Optional: Debugging console log
//   console.log(themeButton.classList.contains('active'));
// };



document.addEventListener('DOMContentLoaded', function () {
  // Get all sections and menu items
  const sections = document.querySelectorAll('.cv-section');
  const menuItems = document.querySelectorAll('.nav-item');

  // Function to remove 'selected' class from all menu items
  function removeSelectedClasses() {
      menuItems.forEach((item) =>
          item.classList.remove('active')
      );
  }

  // Intersection Observer options
  const observerOptions = {
      root: null, // Viewport is the root
      rootMargin: '-10% -20% -80% -40%', // Offset for detecting top intersection
      threshold: 0.01, // Trigger when any part of the section overlaps with #top-page
  };

  // Callback function for Intersection Observer
  const observerCallback = (entries) => {
      // Sort entries by their boundingClientRect.top to ensure we process the topmost section first
      const sortedEntries = Array.from(entries).sort(
          (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
      );

      for (const entry of sortedEntries) {
          if (entry.isIntersecting) {
              // Remove 'selected' class from all menu items
              removeSelectedClasses();

              // Add 'selected' class to the corresponding menu item
              const activeSectionId =
                  entry.target.getAttribute('id');
              const activeLink = document.querySelector(
                  `.nav-item a[href="#${activeSectionId}"]`
              ).parentElement;
              activeLink.classList.add('active');

              break; // Exit loop after handling the topmost intersecting section
          }
      }
  };

  // Create an Intersection Observer instance
  const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
  );

  // Observe the intersection of each section with the viewport
  sections.forEach((section) => observer.observe(section));
});


// Add scroll event listener to adjust the transparency of the #down-arrow element
document.addEventListener('scroll', function () {
    const downArrow = document.getElementById('down-arrow');
    if (downArrow) {
        const scrollPosition = window.scrollY;
        const maxScroll = window.innerHeight * 0.2; // Adjusted to make it transparent faster
        const opacity = Math.max(0, 1 - scrollPosition / maxScroll);
        downArrow.style.opacity = opacity;
    }
});