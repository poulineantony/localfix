/**
 * Quick API Connection Test
 * Run this to verify backend connectivity
 */

const API_BASE_URL = 'http://localhost:5000';

async function testConnection() {
    console.log('🔍 Testing API Connection...');
    console.log('📡 Backend URL:', API_BASE_URL);

    try {
        console.log('\n1️⃣ Testing Health Endpoint...');
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData);

        console.log('\n2️⃣ Testing Send OTP Endpoint...');
        const otpResponse = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: '1234567890' })
        });
        const otpData = await otpResponse.json();
        console.log('✅ Send OTP:', otpData);

        if (otpData.success && otpData.data?.otp) {
            console.log('\n🔑 OTP (Development Mode):', otpData.data.otp);
        }

        console.log('\n✅ All tests passed! Backend is reachable.');

    } catch (error) {
        console.error('\n❌ Connection Failed:', error.message);
        console.error('\n🔧 Troubleshooting:');
        console.error('1. Make sure backend is running: npm start (in localfixBE)');
        console.error('2. Make sure MongoDB is running');
        console.error('3. Run: adb reverse tcp:5000 tcp:5000');
        console.error('4. Check if backend is on http://localhost:5000');
    }
}

testConnection();
