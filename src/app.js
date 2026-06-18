const dropdown = document.querySelector(".dropdown");
const toggle = dropdown?.querySelector(".dropdown-toggle");

function closeDropdown() {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
}

if (dropdown && toggle) {
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // clicking a user row closes the dropdown (no load logic yet)
    dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", closeDropdown);
    });

    // clicking outside closes it
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) closeDropdown();
    });
}
