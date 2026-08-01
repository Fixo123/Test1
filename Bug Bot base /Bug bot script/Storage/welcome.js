require("../Config");
const { WA_DEFAULT_EPHEMERAL } = require(global.baileys)

const getJid = (u) => {
  if (!u) return null
  if (typeof u === "string") return u
  if (typeof u === "object") return u.id || u.lid || u.jid || null
  return null
}

function GroupParticipants(client, { id, participants, action, author }) {
  client.groupMetadata(id).then(gcdata => {
    const subject = gcdata.subject
    const authorJid = getJid(author)

    for (const user of participants) {
      const jid = getJid(user)
      if (!jid) continue

      switch (action) {
        case "add":
          client.sendMessage(id, {
            image: { url: "https://files.catbox.moe/t9qqf4.jpg" },
            caption: `Hai @${jid.split("@")[0]} 👋\n\nSelamat Datang Di *${subject}*!`,
            contextInfo: { mentionedJid: [jid] }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break

        case "remove":
          client.sendMessage(id, {
            image: { url: "https://files.catbox.moe/6oh97e.jpg" },
            caption: `Selamat Tinggal @${jid.split("@")[0]} 👋`,
            contextInfo: { mentionedJid: [jid] }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break

        case "promote":
          if (!authorJid) break
          client.sendMessage(id, {
            image: { url: "https://files.catbox.moe/eeassy.jpg" },
            caption: `🎉 *@${authorJid.split("@")[0]} Menjadikan @${jid.split("@")[0]} Admin!*`,
            contextInfo: { mentionedJid: [authorJid, jid] }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break

        case "demote":
          if (!authorJid) break
          client.sendMessage(id, {
            image: { url: "https://files.catbox.moe/ewhlvr.jpg" },
            caption: `😔 *@${authorJid.split("@")[0]} Menghapus Admin @${jid.split("@")[0]}*`,
            contextInfo: { mentionedJid: [authorJid, jid] }
          }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
        break
      }
    }
  }).catch(console.error)
}

module.exports = GroupParticipants