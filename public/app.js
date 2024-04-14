const axios=require('axios');
document.addEventListener('DOMContentLoaded', () => {
    const healthForm = document.getElementById('healthForm');
    const healthRecords = document.getElementById('healthRecords');
    
    healthForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(healthForm);
        const data = {
            name: formData.get('name'),
            weight: formData.get('weight'),
            age:formData.get('age')
        };

        try {
            const response = await axios.post('/api/health', data);
            console.log(response.data);
            fetchHealthRecords();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function fetchHealthRecords() {
        try {
            const response = await axios.get('/api/health');
            const records = response.data;
            healthRecords.innerHTML = '';
            records.forEach(record => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>Name:</strong> ${record.name}, <strong>Weight:</strong> ${record.weight} kg`;
                healthRecords.appendChild(div);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchHealthRecords();
});
