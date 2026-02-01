document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase config is set
    if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
        return; // Wait for user to configure
    } else {
        document.getElementById('setup-warning').style.display = 'none';
    }

    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const uploadForm = document.getElementById('upload-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const uploadStatus = document.getElementById('upload-status');
    const galleryList = document.getElementById('admin-gallery-list');
    const adminNameSpan = document.getElementById('admin-name');

    // Auth State Observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            showDashboard(user.email);
        } else {
            showLogin();
        }
    });

    function showLogin() {
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        galleryList.innerHTML = ''; // Clear sensitive data
    }

    function showDashboard(email) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        if (email) adminNameSpan.textContent = email;
        loadImages();
    }

    // Login Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loginError.textContent = '';
                loginForm.reset();
            })
            .catch((error) => {
                console.error(error);
                loginError.textContent = error.message;
            });
    });

    // Logout Handler
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // Upload Handler
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        uploadStatus.textContent = 'Uploading...';

        const fileInput = document.getElementById('image-file');
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const file = fileInput.files[0];

        if (!file) return;

        // 1. Upload to Firebase Storage
        const storageRef = storage.ref(`images/${Date.now()}_${file.name}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress monitoring if needed
            },
            (error) => {
                console.error(error);
                uploadStatus.textContent = 'Upload failed: ' + error.message;
                uploadStatus.style.color = 'red';
            },
            () => {
                // 2. Get URL and Save to Firestore
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection("images").add({
                        filename: file.name, // Keeping original name ref if needed
                        url: downloadURL,
                        category: category,
                        description: description,
                        uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        .then(() => {
                            uploadStatus.textContent = 'Upload Successful!';
                            uploadStatus.style.color = 'green';
                            uploadForm.reset();
                            loadImages();
                            setTimeout(() => uploadStatus.textContent = '', 3000);
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                            uploadStatus.textContent = 'Database error: ' + error.message;
                        });
                });
            }
        );
    });

    // Load Images from Firestore
    function loadImages() {
        db.collection("images").orderBy("uploadDate", "desc").get()
            .then((querySnapshot) => {
                galleryList.innerHTML = '';
                querySnapshot.forEach((doc) => {
                    const img = doc.data();
                    const item = document.createElement('div');
                    item.className = 'image-item';
                    item.innerHTML = `
                    <img src="${img.url}" alt="${img.category}">
                    <div class="image-info">
                        <strong>${img.category}</strong><br>
                        <small>${img.description || 'No description'}</small>
                    </div>
                    <button class="delete-btn" data-id="${doc.id}" data-url="${img.url}">Delete</button>
                `;
                    galleryList.appendChild(item);
                });

                // Add delete listeners
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', deleteImage);
                });
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }

    function deleteImage(e) {
        if (!confirm('Are you sure you want to delete this image?')) return;

        const docId = e.target.getAttribute('data-id');
        const fileUrl = e.target.getAttribute('data-url');

        // 1. Delete from Firestore
        db.collection("images").doc(docId).delete().then(() => {
            // 2. Delete from Storage (Optional but recommended)
            // Extract path from URL roughly or store specific path reference is better
            // Ideally we store storageRef path in DB. For now, we skip strict storage cleanup or try to parse
            try {
                const fileRef = storage.refFromURL(fileUrl);
                fileRef.delete().catch(err => console.log('Storage delete error', err));
            } catch (err) {
                console.log('Could not get ref from url', err);
            }

            loadImages();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
});
