const DISCORD_ID = "1024480301998690304";

const avatar = document.getElementById("discord-avatar");
const dot = document.getElementById("status-dot");
const text = document.getElementById("status-text");

const statusColor = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f43",
  offline: "#80848e"
};

const statusName = {
  online: "En línea",
  idle: "Ausente",
  dnd: "No molestar",
  offline: "Desconectado"
};

async function loadDiscord(){
  try{
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
    const data = await res.json();

    if(!data.success) return;

    const user = data.data.discord_user;
    const status = data.data.discord_status;
    const activities = data.data.activities || [];

    if(avatar && user.avatar){
      avatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${user.avatar}.webp`;
    }

    if(dot){
      dot.style.backgroundColor = statusColor[status] || statusColor.offline;
    }

    if(text){
      const custom = activities.find(item => item.type === 4 && item.state);
      text.textContent = custom ? custom.state : statusName[status] || "Desconectado";
    }

  }catch(e){
    if(text){
      text.textContent = "No disponible";
    }
  }
}

loadDiscord();
setInterval(loadDiscord, 15000);