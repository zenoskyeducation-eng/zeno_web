async function testWeb3Forms() {
  console.log('Testing Web3Forms Access Key: 75ae936f-08d2-4c25-ae13-547c064707dc...');
  try {
    const formData = new URLSearchParams();
    formData.append('access_key', '75ae936f-08d2-4c25-ae13-547c064707dc');
    formData.append('name', 'Raj - Zeno-Sky Mission Control');
    formData.append('email', 'ravirajrtelkar008@gmail.com');
    formData.append('subject', 'New Signal Received - Zeno-Sky Website');
    formData.append('message', 'Testing Web3Forms submission to contact@zenosky.in.');

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: formData
    });

    const data = await res.json();
    console.log('Web3Forms Status:', res.status);
    console.log('Web3Forms Response:', data);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testWeb3Forms();
