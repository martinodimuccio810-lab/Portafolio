const DISCORD_ID = '1024480301998690304'; 

async function updateDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await response.json();
        
        if (!json.success) return;

        const { discord_status, activities, discord_user } = json.data;

        // 1. Actualizar Foto
        const avatarImg = document.getElementById('discord-avatar');
        if (avatarImg) {
            avatarImg.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discord_user.avatar}.webp`;
        }

        // 2. Actualizar Color del Punto
        const statusDot = document.getElementById('status-dot');
        if (statusDot) {
            const colors = {
                online: '#23a55a', // Verde
                idle: '#f0b232',   // Amarillo (Ausente)
                dnd: '#f23f43',    // Rojo (No molestar)
                offline: '#80848e' // Gris (Desconectado)
            };
            statusDot.style.backgroundColor = colors[discord_status] || colors.offline;
        }

        // 3. Traducción de estados y prioridad de texto
        const statusText = document.getElementById('status-text');
        if (statusText) {
            // Diccionario de traducción
            const statusNames = {
                online: 'En línea',
                idle: 'Ausente',
                dnd: 'No molestar',
                offline: 'Desconectado'
            };

            // Buscamos si tienes un "Estado personalizado" escrito por ti
            const customStatus = activities.find(a => a.type === 4);

            if (customStatus && customStatus.state) {
                // Si tienes un mensaje escrito (como el de tu imagen), muestra ese
                statusText.innerText = customStatus.state;
            } else {
                // Si no tienes mensaje, muestra "No molestar", "En línea", etc.
                statusText.innerText = statusNames[discord_status] || 'Desconectado';
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDiscordStatus();
    setInterval(updateDiscordStatus, 15000);
});

