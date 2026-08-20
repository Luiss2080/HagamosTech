const os = require('os');

const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    const candidates = [];
    for (const name of Object.keys(interfaces)) {
        if (name.toLowerCase().includes('vbox') || name.toLowerCase().includes('vmware') || name.toLowerCase().includes('virtual')) continue;
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                if (iface.address === '192.168.85.1') continue;
                candidates.push({ name, address: iface.address });
            }
        }
    }
    const wifi = candidates.find(c => c.name.toLowerCase().includes('wi-fi') || c.name.toLowerCase().includes('wireless') || c.name.toLowerCase().includes('wlan'));
    if (wifi) return wifi.address;
    const lan = candidates.find(c => c.address.startsWith('192.168'));
    return lan ? lan.address : (candidates[0]?.address || 'localhost');
};

const LOCAL_IP = getLocalIp();
const PORT = process.env.PORT || 3000;

const SystemController = {
    getConfig: (req, res) => {
        res.json({ localIp: LOCAL_IP, port: PORT });
    },

    getStatus: (req, res) => {
        res.json({ status: 'ok', localIp: LOCAL_IP, port: PORT });
    }
};

module.exports = { SystemController, LOCAL_IP, PORT };
