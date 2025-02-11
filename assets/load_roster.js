async function loadRoster() {
    try {
        const response = await fetch('/assets/roster.txt'); // Fetch roster data
        const text = await response.text(); // Read as text
        const lines = text.split('\n').filter(line => line.trim() !== ""); // Split into lines and remove empty ones

        const tableBody = document.getElementById('roster-body');
        let row;

        lines.forEach((line, index) => {
            setTimeout(() => { // Delay each row
                const [jersey, name, role] = line.split(',').map(item => item.trim()); // Split by comma
                const playerString = `#${jersey} ${name}`;
                
                // Create a new table row every two players
                if (index % 2 === 0) {
                    row = document.createElement('tr');
                }
                
                // Create a new cell
                const cell = document.createElement('td');
                cell.textContent = playerString;
                cell.classList.add('fade-in'); // Apply fade-in effect
                cell.style.borderLeft = "1px solid #ddd"; // Add line between columns
                cell.style.borderRight = "1px solid #ddd"; // Add line between columns
                cell.style.paddingRight = "2.5%"; // Ensure spacing for balance
                cell.style.paddingLeft = "2.5%"; // Ensure spacing for balance
                
                // Apply styles based on role
                cell.classList.add(role);
                
                // Append cell to the row
                row.appendChild(cell);
                
                // Append row to table body after every second player or at the last entry
                if (index % 2 === 1 || index === lines.length - 1) {
                    tableBody.appendChild(row);
                }
            }, index * 50); // Delay each row by x ms
        });
    } catch (error) {
        console.error("Error loading roster:", error);
        document.getElementById('roster-body').innerHTML = "<tr><td colspan='2'>Failed to load roster.</td></tr>";
    }
}

// Load roster when page loads
loadRoster();
