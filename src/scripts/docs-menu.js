document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.folder > a');

    // Load saved menu state from localStorage
    loadMenuState();

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior

            const submenu = menuItem.parentElement.querySelector('ul');
            if (submenu) {
                const isExpanded = menuItem.parentElement.classList.toggle('expanded');
                submenu.style.display = isExpanded ? 'block' : 'none';

                // Save menu state to localStorage
                saveMenuState();

                // Navigate to the URL only if expanding
                if (isExpanded) {
                    const href = menuItem.getAttribute('href');
                    if (href) {
                        // Use setTimeout to ensure that the submenu is displayed before navigation
                        setTimeout(function () {
                            window.location.href = href;
                        }, 0);
                    }
                }
            }
        });
    });

    function saveMenuState() {
        const expandedItems = [];
        document.querySelectorAll('.folder.expanded').forEach(folder => {
            expandedItems.push(folder.querySelector('a').getAttribute('href'));
        });
        localStorage.setItem('expandedMenuItems', JSON.stringify(expandedItems));
    }

    function loadMenuState() {
        const expandedItems = JSON.parse(localStorage.getItem('expandedMenuItems')) || [];
        expandedItems.forEach(href => {
            const menuItem = Array.from(document.querySelectorAll('.folder > a')).find(a => a.getAttribute('href') === href);
            if (menuItem) {
                const submenu = menuItem.parentElement.querySelector('ul');
                if (submenu) {
                    menuItem.parentElement.classList.add('expanded');
                    submenu.style.display = 'block';
                }
            }
        });
    }
});


// document.addEventListener("DOMContentLoaded", function () {
//     const menuItems = document.querySelectorAll('.folder > a');

//     menuItems.forEach(function (menuItem) {
//         menuItem.addEventListener('click', function (e) {
//             e.preventDefault(); // Prevent default link behavior

//             const submenu = menuItem.parentElement.querySelector('ul');
//             if (submenu) {
//                 const isExpanded = menuItem.parentElement.classList.toggle('expanded');
//                 submenu.style.display = isExpanded ? 'block' : 'none';
//             }
//         });
//     });
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const menuItems = document.querySelectorAll('.folder > a');

//     menuItems.forEach(function (menuItem) {
//         menuItem.addEventListener('click', function (e) {
//             console.log('Menu click')
//             e.preventDefault(); // Prevent default link behavior

//             const submenu = menuItem.parentElement.querySelector('ul');

//             if (submenu) {
//                 submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
//             }
//         });
//     });
// });