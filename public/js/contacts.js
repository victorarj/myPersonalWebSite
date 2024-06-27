document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/contacts');
        const contacts = await response.json();
        
        const tableBody = document.querySelector('#contacts-table tbody');
        contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.message}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching contacts:', err);
    }
});

function toggleSidebarOutSide() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');

    if (!sidebar.classList.contains('hidden')) {
        sidebar.classList.add('hidden');
        toggleIcon.classList.add('fa-bars');
        toggleIcon.classList.remove('fa-xmark');
        //toggleIcon.innerHTML = '&#10005;'; // Hamburger button
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');

    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-xmark');
    } else {
        sidebar.classList.add('hidden');
        toggleIcon.classList.add('fa-bars');
        toggleIcon.classList.remove('fa-xmark');
        //toggleIcon.innerHTML = '&#10005;'; // Hamburger button
    }
}