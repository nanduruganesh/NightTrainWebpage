async function loadRoster() {
    try {
        const response = await fetch('assets/roster.txt'); // Fetch roster data
        const text = await response.text(); // Read as text
        let lines = text.split('\n').filter(line => line.trim() !== ""); // Split into lines and remove empty ones

        // Sort lines by jersey number (convert to integer before comparing)
        lines.sort((a, b) => {
            const numA = parseInt(a.split(',')[0].trim(), 10);
            const numB = parseInt(b.split(',')[0].trim(), 10);
            return numA - numB;
        });

        const tableBody = document.getElementById('roster-body');
        const midPoint = Math.ceil(lines.length / 2); // Find the middle index
        const leftColumn = lines.slice(0, midPoint); // First half for left column
        const rightColumn = lines.slice(midPoint); // Second half for right column

        for (let i = 0; i < midPoint; i++) {
            setTimeout(() => { // Delay each row for animation effect
                const row = document.createElement('tr');

                // Left column (always exists)
                const leftCell = document.createElement('td');
                const [jerseyL, nameL, roleL] = leftColumn[i].split(',').map(item => item.trim());
                
                leftCell.style.borderLeft = "1px solid #ddd";
                leftCell.style.borderRight = "1px solid #ddd";
                leftCell.style.paddingRight = "2.5%";
                leftCell.style.paddingLeft = "2.5%";

                const leftNumberSpan = document.createElement('span');
                leftNumberSpan.textContent = `${jerseyL} `;
                leftNumberSpan.classList.add('fade-in') // Keep number in default color

                const leftNameSpan = document.createElement('span');
                leftNameSpan.textContent = nameL;
                leftNameSpan.classList.add('fade-in', roleL); // Apply role-specific color to name only

                // Append both spans to cell
                leftCell.appendChild(leftNumberSpan);
                leftCell.appendChild(leftNameSpan);
                row.appendChild(leftCell);

                // Right column (only exists if there are enough players)
                const rightCell = document.createElement('td');
                if (i < rightColumn.length) {
                    const [jerseyR, nameR, roleR] = rightColumn[i].split(',').map(item => item.trim());
                    const rightNumberSpan = document.createElement('span');
                    rightNumberSpan.textContent = `${jerseyR} `;
                    rightNumberSpan.classList.add('fade-in') // Keep number in default color

                    const rightNameSpan = document.createElement('span');
                    rightNameSpan.textContent = nameR;
                    rightNameSpan.classList.add('fade-in', roleR); // Apply role-specific color to name only
                    rightCell.appendChild(rightNumberSpan);
                    rightCell.appendChild(rightNameSpan);
                }
                rightCell.style.borderLeft = "1px solid #ddd";
                rightCell.style.borderRight = "1px solid #ddd";
                rightCell.style.paddingRight = "2.5%";
                rightCell.style.paddingLeft = "2.5%";
                row.appendChild(rightCell);

                tableBody.appendChild(row);
            }, i * 50); // Delay each row for effect
        }
    } catch (error) {
        console.error("Error loading roster:", error);
        document.getElementById('roster-body').innerHTML = "<tr><td colspan='2'>Failed to load roster.</td></tr>";
    }
}

// Load roster when page loads
loadRoster();
