document.addEventListener('DOMContentLoaded', () => {
    const eventDetailsContainer = document.getElementById('event-details');
    const registerButton = document.getElementById('register-btn');
    const googleSignInContainer = document.getElementById('google-signin-container');
    const themeSwitch = document.getElementById('checkbox');
    const eventId = '69b69679c34207e691c1f576';
    // IMPORTANT: Replace with your actual Google Client ID
    let CLIENT_ID="{}"

    // --- Theme Switcher ---
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    function loadTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }


    // --- Event & Auth Logic ---
    async function displayEvent() {
        try {
            const event = await FidaAPI.events.getOne(eventId);
            let eventHtml = `
                <p>${event.description}</p>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            `;
            if (event.cost > 0) {
                eventHtml += `<p><strong>Cost:</strong> $${event.cost}</p>`;
            } else {
                eventHtml += `<p><strong>Cost:</strong> Free</p>`;
            }
            eventDetailsContainer.innerHTML = eventHtml;
        } catch (error) {
            console.error('Error fetching event:', error);
            eventDetailsContainer.innerHTML = '<p>Could not load event details. Please try again later.</p>';
        }
    }

    async function handleCredentialResponse(response) {
        try {
            const authResponse = await FidaAPI.auth.googleLogin(response.credential);
            if (authResponse.token) {
                localStorage.setItem('fida_token', authResponse.token);
                updateLoginUI();
            } else {
                alert('Sign-in failed. Please try again.');
            }
        } catch (error) {
            alert('Sign-in failed. Please try again.');
            console.error('Sign-in error:', error);
        }
    }

    function updateLoginUI() {
        const token = localStorage.getItem('fida_token');
        googleSignInContainer.innerHTML = ''; // Clear the container

        if (token) {
            // User is logged in
            FidaAPI.auth.getMe().then(user => {
                const welcomeEl = document.createElement('div');
                welcomeEl.innerHTML = `
                    <span>Welcome, ${user.name}!</span>
                    <button id="logout-btn">Logout</button>
                `;
                googleSignInContainer.appendChild(welcomeEl);
                document.getElementById('logout-btn').addEventListener('click', logout);
            }).catch(() => {
                // If getMe fails, the token is likely invalid
                logout();
            });
        } else {
            // User is not logged in
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                googleSignInContainer,
                { theme: "outline", size: "large" }
            );
        }
    }
    
    function logout() {
        localStorage.removeItem('fida_token');
        updateLoginUI();
    }


    async function registerForEvent() {
        const token = localStorage.getItem('fida_token');
        if (!token) {
            alert('Please sign in to register for the event.');
            return;
        }

        try {
            const event = await FidaAPI.events.getOne(eventId);
            if (event.cost > 0) {
                // Paid event
                const order = await FidaAPI.events.createOrder(eventId);
                if (order && order.id) {
                    alert('Order created! Please complete the payment.');
                    // In a real app, you would redirect to a payment gateway.
                    // For this hackathon, we'll simulate a successful payment.
                    const paymentData = {
                        razorpay_order_id: order.id,
                        razorpay_payment_id: 'simulated_payment_id',
                        razorpay_signature: 'simulated_signature'
                    };
                    const verification = await FidaAPI.events.verifyPayment(paymentData);
                    if (verification.success) {
                        alert('Payment successful! You are now registered for the event.');
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                } else {
                    alert('Could not create order. Please try again.');
                }
            } else {
                // Free event
                const joinResponse = await FidaAPI.events.join(eventId);
                if (joinResponse.success) {
                    alert('You are now registered for this free event!');
                } else {
                    alert('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    }

    // --- Initializations ---
    FidaAPI.auth.ax001().then(() => {
        CLIENT_ID = window.googleClientId;
        loadTheme();
        displayEvent();
        updateLoginUI();
    }).catch(error => {
        console.error('Failed to load config:', error);
        // Fallback or error handling
        loadTheme();
        displayEvent();
        // Don't try to initialize Google Sign-In if CLIENT_ID is not set
    });
    
    registerButton.addEventListener('click', registerForEvent);
});

