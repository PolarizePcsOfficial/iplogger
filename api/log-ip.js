const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Fetch the public IP from an external service
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;

        // Read the current IPs from ips.json
        fs.readFile(path.join(__dirname, '../ips.json'), 'utf8', (err, data) => {
            let ips = [];
            if (!err && data) {
                ips = JSON.parse(data);
            }
            ips.push({ ip: ipAddress, date: new Date() }); // Append the new IP

            // Write the updated IPs back to ips.json
            fs.writeFile(path.join(__dirname, '../ips.json'), JSON.stringify(ips, null, 2), (err) => {
                if (err) {
                    console.error('Error saving IP address:', err);
                    return res.status(500).send('Error saving IP address.');
                }
                res.json({ ip: ipAddress }); // Send it back as a JSON response
            });
        });
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        res.status(500).send('Error fetching IP address.');
    }
};
